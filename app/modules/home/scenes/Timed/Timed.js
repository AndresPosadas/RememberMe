import React from "react";
import { Text, Alert, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "../../../../config/firebase";
import Form from "../../components/Form";
import AuthContainer from "../../components/AuthContainer";
import { appendToList } from "../../api";
import styles from "./styles";

const fields = [
	{
		key: "title",
		label: "Reminder Title",
		placeholder: "",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "title"
	},
	{
		key: "description",
		label: "Description",
		placeholder: "",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "description"
	},
	{
		key: "address",
		label: "Address",
		placeholder: "",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "address"
	},
	{
		key: "date",
		label: "Date",
		placeholder: "",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "date"
	}
];

const error = {
	general: "",
	title: "",
	description: "",
	address: "",
	date: "",
	time: "",
	recurring: "",
	hour: "",
	minute: "",
	amPm: ""
}

class Timed extends React.Component {
	constructor() {
		super();
		this.state = {
			error: error
		}

		this.user = firebase.auth().currentUser;
	}

	onSubmit(data) {
		this.setState({ error: error }); //clear out error messages
		data.type = 'timed';
		appendToList("users/" + this.user.uid, "reminders/timed", data, this.onSuccess, this.onError);
	}

	// Return to home screen if reminder was created successfully
	onSuccess() {
		Alert.alert("Reminder set");
		Actions.Main();
	}

	// Display errors
	onError(error) {
		let errObj = this.state.error;

		if (error.hasOwnProperty("message")) {
			errObj["general"] = error.message;
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
			<ScrollView>
				<AuthContainer>
					<Form fields={fields}
						showLabel={true}
						onSubmit={this.onSubmit.bind(this)}
						buttonTitle={"ADD REMINDER"}
						error={this.state.error}
						showRecurring={true}
					/>
				</AuthContainer>
			</ScrollView>
		);
	}
}

export default Timed;