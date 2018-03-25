import React from 'react';
import { Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';

import firebase from '../../../../config/firebase';

import { appendToList } from '../../api';

import Form from "../../components/Form";
import AuthContainer from "../../components/AuthContainer";

import styles from './styles';

// These are the editable text the form will display and validate
const fields = [
	{
		key: 'title',
		label: "Title",
		placeholder: "Enter Title (required)",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "title"
	},
	{
		key: 'description',
		label: "Description",
		placeholder: "Enter Description (optional)",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "description"
	},
	{
		key: 'proxAddress',
		label: "Address",
		placeholder: "Enter address (required)",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "proxAddress"
	},
	{
		key: 'radius',
		label: "Radius",
		placeholder: "Enter radius in meters (required)",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "radius"
	},
	{
		key: 'recurring',
		label: "Recurring",
		placeholder: "Recurring? (yes/no)",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "recurring"
	}
];

// Every section fo the form must have an entry in the error object
const error = {
	general: "",
	title: "",
	description: "",
	address: "",
	radius: "",
	recurring: ""
};

// This scene will allow users to add a proximity reminder
class AddProximity extends React.Component {

	constructor(props) {
		
		super(props);
		
		this.state = {
			error: error
		};
		
		this.user = firebase.auth().currentUser;
	}

	// This is the callback called when reminder was succesfully set
	onSuccess() {
		Alert.alert('Success!', 'Reminder set.');
		Actions.Main();
	}

	// This is the callback called when there was an error trying to add the reminder to firebase
	onError(error) {
		Alert.alert('Something went wrong!', error.message);
	}

	// Ansychronous function called when "ADD REMINDER" button is clicked
	async onPress(data) {
		
		this.setState({ error: error }); //clear out error messages
		
		// TODO: Replace latlon with geocoding result
		var updateObj = {
			title: data.title,
			description: data.description,
			address: data.proxAddress,
			latlon: [80, -30],
			radius: data.radius,
			recurring: data.recurring
		};
		
		// Adds the reminder to the list of proximity reminders in the database
		appendToList('users/' + this.user.uid, 'reminders/proximity', updateObj, this.onSuccess, this.onError);
	}

	// Renders the form for the user
	render() {

		return (
			<AuthContainer>
				<Form fields={fields}
					showLabel={false}
					onSubmit={this.onPress.bind(this)}
					buttonTitle={"ADD REMINDER"}
					error={this.state.error} />
			</AuthContainer>
		);
	}
}

export default AddProximity;