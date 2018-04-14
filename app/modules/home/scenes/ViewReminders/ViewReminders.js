import React from "react";
import { Text, Alert, ScrollView, View } from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "../../../../config/firebase";
import { Button } from 'react-native-elements';
import { getAll } from "../../api";
import styles from "./styles";
import Reminder from "../../components/Reminder";

class ViewReminders extends React.Component {
	constructor() {
		super();
		
		this.state = {};
		this.state.showExpired = false;
		
		this.proxReminders = [];
		this.timedReminders = [];
		this.expiredReminders = [];
		
		//this.timedReminders.push({title: "test", description: "", address: "", date: "3/27/2018", time: "8:00 pm", recurring: "no"});

		this.user = firebase.auth().currentUser;
		this.timeRef = 'users/' + this.user.uid + '/reminders/timed';
		this.proxRef = 'users/' + this.user.uid + '/reminders/proximity';
		this.expiredRef = 'users/' + this.user.uid + '/reminders/expired';
	}
	
	componentDidMount() {
		getAll(this.timeRef, this.addTimedData.bind(this), this.onError);
		getAll(this.proxRef, this.addProxData.bind(this), this.onError);
		getAll(this.expiredRef, this.addExpiredData.bind(this), this.onError);
	}

	addTimedData(dataSnapshot) {
		this.timedReminders = [];
		dataSnapshot.forEach((childSnapshot) => {
			this.timedReminders.push(childSnapshot);
		});
		this.setState({timedReminders: this.timedReminders}, () => this.update(this.state));
	}
	
	addProxData(dataSnapshot) {
		this.proxReminders = [];
		dataSnapshot.forEach((childSnapshot) => {
			this.proxReminders.push(childSnapshot);
		});
		this.setState({proxReminders: this.proxReminders}, () => this.update(this.state));
	}
	
	addExpiredData(dataSnapshot) {
		this.expiredReminders = [];
		dataSnapshot.forEach((childSnapshot) => {
			this.expiredReminders.push(childSnapshot);
		});
		this.setState({expiredReminders: this.expiredReminders}, () => this.update(this.state));
	}
	
	update(state) {
		this.setState(state);		
	}

	// Display errors
	onError(error) {
		Alert.alert('Uh-oh!', error.message);
	}
	
	onSubmit() {
		if(this.state.showExpired === true) {
			this.setState({showExpired: false}, () => this.update(this.state));
		} else {
			this.setState({showExpired: true}, () => this.update(this.state));
		}		
	}

	render() {
			
			var proxReminders = this.state.proxReminders;
			var timedReminders = this.state.timedReminders;
			var expiredReminders = this.state.expiredReminders;

			return(
			<View>
				<ScrollView style={styles.topContainer}>
					{
						(timedReminders) &&
						<View>
						{
							timedReminders.map((data, idx) => {
								return (
									<Reminder item={data} type={data.type} />
								)
							})
						}						
						</View>
					}
					{
						(proxReminders) &&
						<View>
						{
							proxReminders.map((data, idx) => {
								return (
									<Reminder item={data} type={data.type} />
								)
							})
						}						
						</View>
					}
					{
						(expiredReminders && this.state.showExpired) &&
						<View>
						{
							expiredReminders.map((data, idx) => {
								return (
									<Reminder item={data} type={data.type} />
								)
							})
						}						
						</View>
					}
				</ScrollView>
				<View style={styles.bottomContainer}>
					<Button
						raised
						title="TOGGLE EXPIRED"
						borderRadius={4}
						containerViewStyle={styles.containerView}
						buttonStyle={styles.button}
						textStyle={styles.buttonText}
						onPress={this.onSubmit.bind(this)}/>
				</View>
			</View>
			);		
	}
}

export default ViewReminders;