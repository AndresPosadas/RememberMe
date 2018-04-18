import BackgroundTimer from 'react-native-background-timer';
import { pushNotifications } from '../../../../services';
import moment from 'moment';
import { exists, deleteItem, addToExpired, appendToList, getProxReminders } from '../api';
import firebase from "../../../config/firebase";
import { Platform, Alert, PermissionsAndroid } from 'react-native';

const database = firebase.database();
var flag = true;

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function calculateAndHandleDistance(snapshot, curLat, curLon) {
	
	if (snapshot.val() !== null) {
			
		snapshot.forEach((childSnapshot) => {
				
			var value = childSnapshot.val();
				
			var diff = getDistanceFromLatLonInKm(curLat, curLon, value.latitude, value.longitude) * 1000.00;
						
			console.log("DIFF: " + diff);
				
			if(diff <= 100.00){
				pushNotifications.localNotification({reminderTitle: value.title, description: value.description, reminderType: 'proximity'});
				value.type = 'expired';
				childSnapshot.ref.remove()
				.then( () => {
					addToExpired('users/' + firebase.auth().currentUser.uid + '/reminders/expired', value, (data) => {
						console.log('Reminder expired.');
					}, (error) => Alert.alert( 'Uh-oh!', error.message ) );
				}).catch( ( error ) => Alert.alert( 'Uh-oh!', error.message ) );
			}				
		});			
	}	
}

function onError(error) {
	Alert.alert('Database Error', error.message);
}

export function setTimer() {
	
	console.log("Timer set.");
		
		BackgroundTimer.setInterval(() => {
			
			if(firebase.auth().currentUser === null){
				if(flag === true) {
					pushNotifications.localNotification({reminderTitle: "Login required.", description: "RemindMe services suspended until login.", reminderType: 'RemindMe'});
				}
				flag = false;
			} else {
				
			flag = true;
			
			PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
				'title': 'RemindMe App Location Permission',
				'message': 'RemindMe needs access to your location so that you can use proximity reminders.',
			})
			.then((granted) => {
				if (granted) {
					navigator.geolocation.getCurrentPosition((position) => {
						
						console.log('LAT: ' + position.coords.latitude);
						console.log('LON: ' + position.coords.longitude);
						console.log("GRANTED: " + granted);
					
						getProxReminders('users/' + firebase.auth().currentUser.uid + '/reminders/proximity', calculateAndHandleDistance, onError, position.coords.latitude, position.coords.longitude);
					}, 
					(error) => console.log('Geolocation Error', error.message),
					{ enableHighAccuracy: false, timeout: 50000, maximumAge: 20000 });
				}
			});
					
			this.timedRef = 'users/' + firebase.auth().currentUser.uid;
			this.expiredRef = 'users/' + firebase.auth().currentUser.uid + '/reminders/expired';
			
			// Gets current day
			this.currentdate = new Date(); 
			this.dateString = this.currentdate.getFullYear() + "-"
							+ (this.currentdate.getMonth()+1)  + "-" 
							+ this.currentdate.getDate();
							
			this.dateString = moment(this.dateString, 'YYYY-MM-DD').format('MM/DD/YYYY');
			
			console.log("DATE: " + this.dateString);
	
			exists(timedRef + '/reminders/timed', 'date', this.dateString)
			.then((snapshot) => {
		
				if (snapshot.val() !== null) {
	
					// Gets the current time
					this.timeString = this.currentdate.getHours() + ":"  
									+ this.currentdate.getMinutes() + ":" 
									+ this.currentdate.getSeconds();
							
					this.key = Object.keys(snapshot.val())[0];
			
					snapshot.forEach((childSnapshot) => {
				
						var value = childSnapshot.val();
						var potentialDate = moment(value.date, 'MM/DD/YYYY');
						potentialDate = moment(potentialDate, 'MM/DD/YYYY').add(7, 'days');
						var potentialValue = Object.assign({}, value);
						potentialValue.date = potentialDate.format('MM/DD/YYYY');
						potentialValue.type = 'timed';
				
						var reminderTime = moment(value.time, 'hh:mm a');
						var curTime = moment(this.timeString, 'HH:mm:ss');
				
						var diff = reminderTime.diff(curTime, 'seconds');
						
						console.log("DIFF: " + diff);
				
						if(diff <= 1 && diff >= -1){
							pushNotifications.localNotification({reminderTitle: value.title, description: value.description, reminderType: 'timed'});
							childSnapshot.ref.remove()
							.then( () => {
								value.type = 'expired';
								addToExpired(this.expiredRef, value, (data) => {
									potentialValue.type = 'timed';
									if(value.recurring === 'yes') {
										appendToList(this.timedRef, 'reminders/timed', potentialValue, () => {
											console.log("Recurring reminder set.");
										}, (error) => Alert.alert( 'Uh-oh!', error.message ))
									} else {
										console.log('Reminder expired.');
									}
								}, (error) => Alert.alert( 'Uh-oh!', error.message ) );
							}).catch( ( error ) => Alert.alert( 'Uh-oh!', error.message ) );
						}
				
					});
			
				} 
				
			}).catch((error) => Alert.alert('Uh-oh!', error.message));
			
			}
		}, 2000);
}

export function setTimerIOS() {
	
	BackgroundTimer.runBackgroundTimer(() => { 
			
			if(firebase.auth().currentUser === null){
				if(flag === true) {
					pushNotifications.localNotification({reminderTitle: "Login required.", description: "RemindMe services suspended until login.", reminderType: 'RemindMe'});
				}
				flag = false;
			} else {
				
			flag = true;
			
			navigator.geolocation.getCurrentPosition(
				(position) => {
					
					console.log('LAT: ' + position.coords.latitude);
					console.log('LON: ' + position.coords.longitude);
					
					getProxReminders('users/' + firebase.auth().currentUser.uid + '/reminders/proximity', calculateAndHandleDistance, onError, position.coords.latitude, position.coords.longitude);
				},
				(error) => Alert.alert('Geolocation Error', error.message),
				{ enableHighAccuracy: true, timeout: 20000 },
			);
					
			this.timedRef = 'users/' + firebase.auth().currentUser.uid;
			this.expiredRef = 'users/' + firebase.auth().currentUser.uid + '/reminders/expired';
			
			// Gets current day
			this.currentdate = new Date(); 
			this.dateString = this.currentdate.getFullYear() + "-"
							+ (this.currentdate.getMonth()+1)  + "-" 
							+ this.currentdate.getDate();
							
			this.dateString = moment(this.dateString, 'YYYY-MM-DD').format('MM/DD/YYYY');
			
			console.log("DATE: " + this.dateString);
	
			exists(timedRef + '/reminders/timed', 'date', this.dateString)
			.then((snapshot) => {
		
				if (snapshot.val() !== null) {
	
					// Gets the current time
					this.timeString = this.currentdate.getHours() + ":"  
									+ this.currentdate.getMinutes() + ":" 
									+ this.currentdate.getSeconds();
							
					this.key = Object.keys(snapshot.val())[0];
			
					snapshot.forEach((childSnapshot) => {
				
						var value = childSnapshot.val();
						var potentialDate = moment(value.date, 'MM/DD/YYYY');
						potentialDate = moment(potentialDate, 'MM/DD/YYYY').add(7, 'days');
						var potentialValue = value;
						potentialValue.date = potentialDate.format('MM/DD/YYYY');
						potentialValue.type = 'timed';
				
						var reminderTime = moment(value.time, 'hh:mm a');
						var curTime = moment(this.timeString, 'HH:mm:ss');
				
						var diff = reminderTime.diff(curTime, 'seconds');
						
						console.log("DIFF: " + diff);
				
						if(diff <= 30 && diff >= -30){
							pushNotifications.localNotification({reminderTitle: value.title, description: value.description, reminderType: 'timed'});
							childSnapshot.ref.remove()
							.then( () => {
								value.type = 'expired';
								addToExpired(this.expiredRef, value, (data) => {
									if(value.recurring === 'yes') {
										potentialValue.type = 'timed';
										appendToList(this.timedRef, 'reminders/timed', potentialValue, () => {
											console.log("Recurring reminder set.");
										}, (error) => Alert.alert( 'Uh-oh!', error.message ))
									} else {
										console.log('Reminder expired.');
									}
								}, (error) => Alert.alert( 'Uh-oh!', error.message ) );
							}).catch( ( error ) => Alert.alert( 'Uh-oh!', error.message ) );
						}
				
					});
			
				} 
				
			}).catch((error) => Alert.alert('Uh-oh!', error.message));
			
			}
		}, 15000);
}

export function clearTimerIOS() {	
	BackgroundTimer.stopBackgroundTimer();
}

export function clearTimer(timerID) {	
	BackgroundTimer.clearInterval(timerID);
	console.log("Timer cleared.");
}