import React from "react";
import { Text, Alert, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "../../../../config/firebase";
import { getAll } from "../../api";
import styles from "./styles";
import Reminder from "../../components/Reminder";

class ViewReminders extends React.Component {
	constructor() {
		super();
		
		this.reminders = [];

		this.user = firebase.auth().currentUser;
		this.dbRef = 'users/' + this.user.uid + '/reminders/timed';
	}
	
	componentDidMount() {
		getAll(this.dbRef, this.addData.bind(this), this.onError);
	}

	addData(dataSnapshot) {
		this.setState({reminders: dataSnapshot}, () => this.update(this.state));
	}
	
	update(state) {
		this.setState(state);
		
	}

	// Display errors
	onError(error) {
		Alert.alert('Uh-oh!', error.message);
	}

	render() {
		
		if(this.state && this.state.reminders){
			
			this.reminders = [];
			this.state.reminders.forEach((snapshot) => {
				this.reminders.push(snapshot);
			});
			
			var reminders = this.reminders;

			return(
			<ScrollView style={{backgroundColor: "white"}}>
				{
                    reminders.map((data, idx) => {
                        return (
                            <Reminder item={data} />
                        )
                    })
                }
			</ScrollView>
			);
		}	

	return(
			<ScrollView>
				
			</ScrollView>
		);
		
	}
}

export default ViewReminders;