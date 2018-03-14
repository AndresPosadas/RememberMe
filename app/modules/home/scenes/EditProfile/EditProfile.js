import React from 'react';
var { View, StyleSheet, Alert, Text, TextInput, Image } = require('react-native');

import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from '../../../../config/firebase';

const styles = require('./styles');
const placeholderURL = 'https://thumbs.dreamstime.com/b/default-placeholder-profile-icon-avatar-gray-man-90197971.jpg';

class EditProfile extends React.Component {

	constructor(props) {

		super(props);

		this.database = firebase.database();
		this.auth = firebase.auth();

		this.user = this.auth.currentUser;

		this.newEmail = '';
		this.newUsername = '';

		this.state = {
			email: '',
			username: '',
			photoURL: placeholderURL
		};

		this.newData = this.state;
		this.password = '';

		this.reauthenticate = this.reauthenticate.bind(this);
	}

	// Note: this is fired after render has been called once
	componentDidMount() {
		this.loadProfile();
	}

	loadProfile() {
		if (this.user != null) {
			this.setState({
				email: this.user.email,
				username: this.user.displayName,
				photoURL: this.user.photoURL
			});
		}
	}

	updateAuthTable(updateObj, successCB, errorCB) {
		this.user.updateProfile(updateObj)
			.then(() => {
					this.updateUsersTable(updateObj, successCB, errorCB);
			}).catch((error) => {
				if (errorCB) {
					errorCB(error.message);
				}
			});
	}

	updateUsersTable(updateObj, successCB, errorCB) {
		var newUpdateObj = {};
		if (updateObj.displayName) {
			newUpdateObj['/username'] = updateObj.displayName;
		}
		if (updateObj.photoURL) {
			newUpdateObj['/photoURL'] = updateObj.photoURL;
		}
		if (newUpdateObj !== {}) {
			this.database.ref('users').child(this.user.uid).update(newUpdateObj)
			.then(() => {
				if (successCB){
					successCB();
				}
			})
			.catch((error) => {
				if (errorCB){
					errorCB(error.message);
				}
			});
		}
		return;
	}

	buildUpdateObj(isUsernameUpdated, successCB) {
		var updateObj = {};
		if (isUsernameUpdated) {
			updateObj.displayName = this.newData.username;
		}
		if (this.newData.photoURL !== placeholderURL) {
			updateObj.photoURL = this.newData.photoURL;
		}

		if (updateObj !== {}) {
			this.updateAuthTable(updateObj, successCB, this.alertErrorMessage);
		}
	}

	checkAndUpdateProfile() {
		if (this.newData.username != '') {
			this.database.ref('users').orderByChild("username").equalTo(this.newData.username).once("value", (snapshot) => {
				if (snapshot.val() == null) {
					this.buildUpdateObj(true, this.successfulUpdateWithNavigation);
				} else {
					Alert.alert('Uh-oh!', 'Username already in use. Please select another.');
					this.buildUpdateObj(false, this.successfulUpdate);
				}
			});
		} else {
			this.buildUpdateObj(false, this.successfulUpdateWithNavigation);
		}
	}

	successfulUpdate() {

		Alert.alert('Profile updated');
	}

	successfulUpdateWithNavigation() {

		Alert.alert('Profile updated');
		Actions.Profile();
	}

	alertErrorMessage(message) {
		Alert.alert('Uh-oh!', message);
	}

	// Updates the email if it changed
	updateEmail() {
		// If no changes were made to the email try to update the rest
		if (this.newData.email == '') {
			//Alert.alert('Email was not changed...');
			this.checkAndUpdateProfile();
		}
		else {
			this.user.updateEmail(this.newData.email).then(() => {
				//Alert.alert('Email updated');
				this.checkAndUpdateProfile();
			}).catch((error) => {
				Alert.alert('Uh-oh!', error.message);
			});
		}
	}

	// Validates user credentials
	reauthenticate() {
		var credentials = firebase.auth.EmailAuthProvider.credential(
			this.user.email,
			this.password
		);

		this.user.reauthenticateWithCredential(credentials)
			.then(() => {
				this.updateEmail();
			}).catch((error) => {
				Alert.alert('Uh-oh!', error.message);
			});
	}

	// Renders the user's profile
	render() {

		return (
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<Text style={styles.titleText}>Email:</Text>
					<TextInput placeholder={this.state.email} underlineColorAndroid="transparent" onChangeText={(text) => { this.newData.email = text }} />
					<Text style={styles.titleText}>Username:</Text>
					<TextInput placeholder={this.state.username} underlineColorAndroid="transparent" onChangeText={(text) => { this.newData.username = text }} />
					<Text style={styles.titleText}>Photo URL:</Text>
					<TextInput placeholder={this.state.photoURL} underlineColorAndroid="transparent" onChangeText={(text) => { this.newData.photoURL = text }} />
				</View>

				<View style={styles.passwordContainer}>
					<Text style={styles.passwordText}>Note: Re-enter password to authorize change(s).</Text>
					<TextInput placeholder='Re-enter password here' underlineColorAndroid="transparent" onChangeText={(text) => { this.password = text }} />
				</View>

				<View style={styles.bottomContainer}>
					<View style={[styles.buttonContainer]}>
						<Button
							raised
							borderRadius={4}
							title={'SAVE CHANGES'}
							containerViewStyle={[styles.containerView]}
							buttonStyle={[styles.button]}
							textStyle={styles.buttonText}
							onPress={this.reauthenticate} />
					</View>
				</View>
			</View>
		);
	}
}

export default connect(null, null)(EditProfile);