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

const fieldsProx = [
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

class EditReminder extends React.Component {
	constructor() {
		super();
		this.state = {
			error: error
		}

		this.user = firebase.auth().currentUser;
	}

	onSubmit(data) {
		this.props.reminder.ref.update(data)
		.then(() => this.onSuccess())
		.catch(() => this.onError);
	}

	// Return to home screen if reminder was created successfully
	onSuccess() {
		Alert.alert("Reminder Updated");
		Actions.pop();
	}

	// Display errors
	onError(error) {
		Alert.alert("Uh-oh!", error.message);
	}

	render() {
		
		if(this.props.type === 'timed'){
			return (
			<ScrollView style={{backgroundColor: "white"}}>
				<AuthContainer>
					<Form fields={fields}
						showLabel={true}
						onSubmit={this.onSubmit.bind(this)}
						buttonTitle={"EDIT REMINDER"}
						error={this.state.error}
						showRecurring={true}
						isEditing={true}
						original={this.props.reminder.val()}
					/>
				</AuthContainer>
			</ScrollView>
		);
		} else {
			return (
			<ScrollView style={{backgroundColor: "white"}}>
				<AuthContainer>
					<Form fields={fieldsProx}
						showLabel={true}
						onSubmit={this.onSubmit.bind(this)}
						buttonTitle={"EDIT REMINDER"}
						error={this.state.error}
						showRecurring={false}
						isEditing={true}
						original={this.props.reminder.val()}
					/>
				</AuthContainer>
			</ScrollView>
		);
		}
	}
}

export default EditReminder;