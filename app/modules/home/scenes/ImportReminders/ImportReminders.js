import React from "react";
import { Text, Alert, ScrollView, View } from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "../../../../config/firebase";
import { Button } from 'react-native-elements';
import { appendToList } from "../../api";
import styles from "./styles";
import Reminder from "../../components/Reminder";
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

class ViewReminders extends React.Component {
	constructor() {
		super();
		
		this.state = {};
		this.index;

		this.user = firebase.auth().currentUser;
		this.timeRef = 'users/' + this.user.uid + '/reminders/timed';
	}
	
	componentDidMount() {
		var currentDate = new Date();
		var futureDate = new Date();
		futureDate.setFullYear(futureDate.getFullYear() + 3);
		currentDate = currentDate.toISOString();
		futureDate.toISOString();
		RNCalendarEvents.fetchAllEvents(currentDate, futureDate)
		.then((result) => this.setState({eventList: result}))
		.catch((error) => console.log(error.message));
	}

	// Display errors
	onError(error) {
		Alert.alert('Uh-oh!', error.message);
	}
	
	onSubmit(data, index) {	
		this.index = index;
		appendToList("users/" + this.user.uid, "reminders/timed", data, this.onSuccess.bind(this), this.onError);		
	}
	
	onSuccess() {
		Alert.alert("Reminder imported.");
		var list = this.state.eventList;
		if(this.index && this.index > -1){
			list.splice(this.index, 1);
		this.setState({eventList: list});
		}		
	}

	render() {
			
			var events = this.state.eventList;
			
			//Alert.alert("Something", JSON.stringify(events));

			return(
			<View>
				<ScrollView style={styles.topContainer}>
					{
						(events) &&
						<View>
						{
							events.map((data, idx) => {
								var newObj = {};
								var date = new Date(data.startDate);
								var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
								dateString = moment(dateString, 'YYYY-MM-DD').format('MM/DD/YYYY');
								newObj.type = 'timed';
								newObj.title = data.title;
								newObj.description = "";
								newObj.date = dateString;
								newObj.time = date.getHours() + ":" + date.getMinutes();
								newObj.time = moment(newObj.time, 'HH:mm').format('hh:mm a');
								if(newObj.time.charAt(0) == '0'){
									newObj.time = newObj.time.substring(1);
								}
								newObj.recurring = "no";
								return (
									<Reminder item={newObj} type={newObj.type} stat="import" onAdd={this.onSubmit.bind(this)} index={idx} />
								)
								/*return (
									<Text>{JSON.stringify(newObj.time)}</Text>
								)*/
							})
						}						
						</View>
					}
					{
						(!events) &&
						<View>
							<Text>Loading events from your calendars...</Text>
						</View>
					}
				</ScrollView>
			</View>
			);		
	}
}

export default ViewReminders;