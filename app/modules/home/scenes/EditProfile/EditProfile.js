import React from 'react';
import { View, StyleSheet, Alert, Text, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

import firebase from '../../../../config/firebase';

import { authenticateUser, updateEmail, updateProfile, update } from '../../api';
import { strcmp } from '../../utils/utils';
import { validateEmail } from '../../utils/validate';

import Form from "../../components/Form";
import AuthContainer from "../../components/AuthContainer";

import styles from './styles';

import { placeholderURL } from '../../constants';

const fields = [
	{
		key: 'email',
		label: "Email",
		placeholder: "new value or leave blank",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "Email"
	},
	{
		key: 'username',
		label: "Username",
		placeholder: "new value or leave blank",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "username"
	},
	{
		key: 'photoURL',
		label: "Photo URL",
		placeholder: "new value or leave blank.",
		autoFocus: false,
		secureTextEntry: false,
		value: "",
		type: "photoURL"
	},
	{
		key: 'password',
		label: "Password",
		placeholder: "authorize change with password",
		autoFocus: false,
		secureTextEntry: true,
		value: "",
		type: "password"
	}
];

const error = {
	general: "",
	email: "",
	username: "",
	photoURL: "",
	password: ""
};

class EditProfile extends React.Component {

	constructor(props) {
		
		super(props);
		
		this.state = {
			error: error
		};
		
		this.user = firebase.auth().currentUser;
	}
	
	onSubmit(data) {
		this.setState({ error: error }); //clear out error messages

		this.reauthenticate(data);
	}

	onSuccess() {
		Alert.alert('Profile updated.');
		Actions.Profile();
	}

	onError(error) {
		Alert.alert('Something went wrong!', error.message);
	}

	async onPress(data) {

		try {
			const authenticated = await authenticateUser(data.password);
		} catch (e) {
			this.onError(e);
			return;
		}

		newEmail = strcmp(this.user.email, data.email);
		
		if (newEmail !== 0 && data.email !== "") {
			try {
				const updatedEmail = await updateEmail(data.email);
			} catch (e) {
				this.onError(e);
				return;
			}
		}
		
		var updateObj = {};
		
		if (data.username !== "") {
			updateObj.displayName = data.username;
		}
		
		if(data.photoURL !== "") {
			updateObj.photoURL = data.photoURL;
		}
		
		if(updateObj !== {}) {
			this.updateDatabase = this.updateDatabase.bind(this);
			updateProfile(updateObj, this.updateDatabase, this.onError);			
		}		
	}

	updateDatabase(updateObj) {
		
		var newUpdateObj = {};
		
		if(updateObj.displayName) {
			newUpdateObj.username = updateObj.displayName;
		}
		if(updateObj.photoURL) {
			newUpdateObj.photoURL = updateObj.photoURL;
		}
		
		if(newUpdateObj !== {}) {
			update('users', 
				this.user.uid, 
				newUpdateObj, 
				this.onSuccess,
				this.onError
			);
		}
	}

	// Renders the user's profile
	render() {

		return (
			<AuthContainer>
				<Form fields={fields}
					showLabel={true}
					onSubmit={this.onPress.bind(this)}
					buttonTitle={"SAVE CHANGES"}
					error={this.state.error} />
			</AuthContainer>
		);
	}
}

export default EditProfile;