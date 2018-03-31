import BackgroundTimer from 'react-native-background-timer';
import { pushNotifications } from '../../../../services';
import moment from 'moment';
import { exists } from '../api';
import firebase from "../../../config/firebase";

const database = firebase.database();

export function setTimer() {
	
	BackgroundTimer.setInterval(() => {
			
		// Gets current day
		this.currentdate = new Date(); 
		this.dateString = this.currentdate.getFullYear() + "-"
						+ (this.currentdate.getMonth()+1)  + "-" 
						+ this.currentdate.getDate();
							
		console.log(this.dateString);
	
		exists('users/' + firebase.auth().currentUser.uid + '/reminders/timed', 'date', this.dateString)
		.then((snapshot) => {
		
			if (snapshot.val() !== null) {
	
				// Gets the current time
				this.timeString = this.currentdate.getHours() + ":"  
								+ this.currentdate.getMinutes() + ":" 
								+ this.currentdate.getSeconds();
							
				console.log(this.timeString);
			
				snapshot.forEach((childSnapshot) => {
				
					var value = childSnapshot.val();
				
					var reminderTime = moment(value.date + ' ' + value.time, 'YYYY-MM-DD HH:mm:ss');
					var curTime = moment(this.dateString + ' ' + this.timeString, 'YYYY-MM-DD HH:mm:ss');
				
					console.log("Cur Time: " + curTime + "\n");
					console.log("Reminder Time: " + reminderTime + "\n");
				
					var diff = reminderTime.diff(curTime, 'seconds');
				
					console.log("DIFF: " + diff + "\n");
				
					if(diff <= 30 && diff > 0){
						pushNotifications.localNotification({reminderTitle: value.title, description: value.description, reminderType: 'timed'});
					}
				
				});
			
			} 
				
		}).catch((error) => Alert.alert('Uh-oh!', error.message));
			
	}, 10000);
}

export function clearTimer(timerID) {
	BackgroundTimer.clearInterval(timerID);
}