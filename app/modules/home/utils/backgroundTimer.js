import BackgroundTimer from 'react-native-background-timer';
import { pushNotifications } from '../../../../services';
import moment from 'moment';
import { exists, deleteItem, addToExpired, appendToList } from '../api';
import firebase from "../../../config/firebase";
import { Platform, Alert } from 'react-native';

const database = firebase.database();
var flag = true;

export function setTimer() {
		
		BackgroundTimer.setInterval(() => {
			
			if(firebase.auth().currentUser === null){
				if(flag === true) {
					pushNotifications.localNotification({reminderTitle: "Login required.", description: "Please sign in again to continue using RemindMe services.", reminderType: 'RemindMe'});
				}
				flag = false;
			} else {
				
			flag = true;
					
			this.timedRef = 'users/' + firebase.auth().currentUser.uid + '/reminders/timed';
			this.expiredRef = 'users/' + firebase.auth().currentUser.uid, 'reminders/expired';
			
			// Gets current day
			this.currentdate = new Date(); 
			this.dateString = this.currentdate.getFullYear() + "-"
							+ (this.currentdate.getMonth()+1)  + "-" 
							+ this.currentdate.getDate();
							
			this.dateString = moment(this.dateString, 'YYYY-MM-DD').format('MM/DD/YYYY');
	
			exists(timedRef, 'date', this.dateString)
			.then((snapshot) => {
		
				if (snapshot.val() !== null) {
	
					// Gets the current time
					this.timeString = this.currentdate.getHours() + ":"  
									+ this.currentdate.getMinutes() + ":" 
									+ this.currentdate.getSeconds();
							
					this.key = Object.keys(snapshot.val())[0];
			
					snapshot.forEach((childSnapshot) => {
				
						var value = childSnapshot.val();
						var potentialDate = moment(value.date, 'MM/DD/YYYY').add(7, 'days');
						var potentialValue = value;
						potentialValue.date = potentialDate.format('MM/DD/YYYY');
				
						var reminderTime = moment(value.time, 'hh:mm a');
						var curTime = moment(this.timeString, 'HH:mm:ss');
				
						var diff = reminderTime.diff(curTime, 'seconds');
				
						if(diff <= 30 && diff >= -30){
							pushNotifications.localNotification({reminderTitle: value.title, description: value.description, reminderType: 'timed'});
							childSnapshot.ref.remove()
							.then( () => {
								addToExpired(expiredRef, value, (data) => {
									if(value.recurring === 'yes') {
										appendToList(timedRef, potentialValue, () => {
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

export function setTimerIOS() {
	
	BackgroundTimer.runBackgroundTimer(() => { 
			
			if(firebase.auth().currentUser === null){
				if(flag === true) {
					pushNotifications.localNotification({reminderTitle: "Login required.", description: "Please sign in again to continue using RemindMe services.", reminderType: 'RemindMe'});
				}
				flag = false;
			} else {
				
			flag = true;
					
			this.timedRef = 'users/' + firebase.auth().currentUser.uid + '/reminders/timed';
			this.expiredRef = 'users/' + firebase.auth().currentUser.uid, 'reminders/expired';
			
			// Gets current day
			this.currentdate = new Date(); 
			this.dateString = this.currentdate.getFullYear() + "-"
							+ (this.currentdate.getMonth()+1)  + "-" 
							+ this.currentdate.getDate();
							
			this.dateString = moment(this.dateString, 'YYYY-MM-DD').format('MM/DD/YYYY');
	
			exists(timedRef, 'date', this.dateString)
			.then((snapshot) => {
		
				if (snapshot.val() !== null) {
	
					// Gets the current time
					this.timeString = this.currentdate.getHours() + ":"  
									+ this.currentdate.getMinutes() + ":" 
									+ this.currentdate.getSeconds();
							
					this.key = Object.keys(snapshot.val())[0];
			
					snapshot.forEach((childSnapshot) => {
				
						var value = childSnapshot.val();
						var potentialDate = moment(value.date, 'MM/DD/YYYY').add(7, 'days');
						var potentialValue = value;
						potentialValue.date = potentialDate.format('MM/DD/YYYY');
				
						var reminderTime = moment(value.time, 'hh:mm a');
						var curTime = moment(this.timeString, 'HH:mm:ss');
				
						var diff = reminderTime.diff(curTime, 'seconds');
				
						if(diff <= 30 && diff >= -30){
							pushNotifications.localNotification({reminderTitle: value.title, description: value.description, reminderType: 'timed'});
							childSnapshot.ref.remove()
							.then( () => {
								addToExpired(expiredRef, value, (data) => {
									if(value.recurring === 'yes') {
										appendToList(timedRef, potentialValue, () => {
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
}