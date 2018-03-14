import React from 'react';
import { Text, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as stuff } from "../../index"
const { login } = stuff;

import styles from "./styles"

import Form from "../../components/Form"
import AuthContainer from "../../components/AuthContainer"
import firebase from '../../../../config/firebase';

const database = firebase.database();
const auth = firebase.auth();

const fields = [
	{
		key: 'title',
		label: "Title",
		placeholder: "Title",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "title"
	},
	{
		key: 'description',
		label: "Description",
		placeholder: "Description",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "description"
	},
	{
		key: 'address',
		label: "Address",
		placeholder: "Address",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "address"
	},
	{
		key: 'date',
		label: "Date",
		placeholder: "Date",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "date"
	},
	{
		key: 'time',
		label: "Time",
		placeholder: "Time",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "time"
	}
];

const error = {
	general: "",
	title: "",
	description: "",
	address: "",
	date: "",
	time: ""
}

class Timed extends React.Component {
	constructor() {
		super();
		this.state = {
			error: error
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
		this.onError = this.onError.bind(this);

		this.user = firebase.auth().currentUser;
	}

	onSubmit(data) {
		this.setState({ error: error }); //clear out error messages

		database.ref('users/' + this.user.uid).child('reminders').push(data)
			.then(() => {
				this.onSuccess();
			})
			.catch((error) => {
				this.onError(error);
			});
	}

	// Return to home screen if reminder was created successfully
	onSuccess() {
		Actions.Main();
	}

	// Display errors
	onError(error) {
		let errObj = this.state.error;

		if (error.hasOwnProperty("message")) {
			errObj['general'] = error.message;
		} else {
			let keys = Object.keys(error);
			keys.map((key, index) => {
				errObj[key] = error[key];
			})
		}
		this.setState({ error: errObj });
	}

	render() {
		return (
			<AuthContainer>
				<Form fields={fields}
					showLabel={false}
					onSubmit={this.onSubmit}
					buttonTitle={"ADD REMINDER"}
					error={this.state.error} />
			</AuthContainer>
		);
	}
}

export default connect(null, null)(Timed);