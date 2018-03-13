import React from 'react';
var { View, StyleSheet, Alert, Text, TextInput, Image } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
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
		if ( this.user != null ) {
			this.setState({
				email: this.user.email,
				username: this.user.displayName,
				photoURL: this.user.photoURL
			});	
		}
	}

	// Updates the rest of the profile if anything changed
	updateProfile(){
		// Nothing was changed...
		if( this.newData.username == '' && this.newData.photoURL == placeholderURL ){
			//Alert.alert('Nothing changed');
			return;
		}

		// Only the photo changed
		else if( this.newData.username == '' && this.newData.photoURL != placeholderURL ){
			this.user.updateProfile({
				photoURL: this.newData.photoURL
			  }).then(() => {
				Alert.alert('Profile updated');
				Actions.Profile();
			  }).catch((error) => {
				Alert.alert('Uh-oh!', error.message);
			  });
		}

		// Only the username changed
		else if( this.newData.username != '' && this.newData.photoURL == placeholderURL ){

			this.database.ref('users').orderByChild("username").equalTo(this.newData.username).once("value", (snapshot) => {
				if(snapshot.val() == null){
					this.user.updateProfile({
						displayName: this.newData.username
					  }).then(() => {
						Alert.alert('Profile updated');
						Actions.Profile();
					  }).catch((error) => {
						Alert.alert('Uh-oh!', error.message);
					  });
				}
				else {
					Alert.alert('Uh-oh!', 'Username already in use. Please select another.');
				}
			});
		}

		// Both changed
		else{

			this.database.ref('users').orderByChild("username").equalTo(this.newData.username).once("value", (snapshot) => {
				if(snapshot.val() == null){
					this.user.updateProfile({
						displayName: this.newData.username,
						photoURL: this.newData.photoURL
					  }).then(() => {
						Alert.alert('Profile updated');
						Actions.Profile();
					  }).catch((error) => {
						Alert.alert('Uh-oh!', error.message);
					  });
				}
				else {

					Alert.alert('Uh-oh!', 'Username already in use. Please select another.');

					this.user.updateProfile({
						photoURL: this.newData.photoURL
					  }).then(() => {
						Alert.alert('Profile updated');
						//Actions.Profile();
					  }).catch((error) => {
						Alert.alert('Uh-oh!', error.message);
					  });
				}
			});
		}
	}

	// Updates the email if it changed
	updateEmail(){
		// If no changes were made to the email try to update the rest
		if( this.newData.email == '' ){
			//Alert.alert('Email was not changed...');
			this.updateProfile();
		}
		else {
			this.user.updateEmail( this.newData.email ).then(() => {
				//Alert.alert('Email updated');
				this.updateProfile();
			}).catch((error) => {
				Alert.alert('Uh-oh!', error.message);
			});			
		}
	}
	
	// Validates user credentials
	reauthenticate(){		
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
					<TextInput placeholder={this.state.email} underlineColorAndroid="transparent" onChangeText={(text) => {this.newData.email = text}}/>
					<Text style={styles.titleText}>Username:</Text>
					<TextInput placeholder={this.state.username} underlineColorAndroid="transparent" onChangeText={(text) => {this.newData.username = text}}/>
					<Text style={styles.titleText}>Photo URL:</Text>
					<TextInput placeholder={this.state.photoURL} underlineColorAndroid="transparent" onChangeText={(text) => {this.newData.photoURL = text}}/>
				</View>

				<View style={styles.passwordContainer}>
					<Text style={styles.passwordText}>Note: Re-enter password to authorize change(s).</Text>
					<TextInput placeholder='Re-enter password here' underlineColorAndroid="transparent" onChangeText={(text) => {this.password = text}}/>
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
                                onPress={this.reauthenticate}/>
                        </View>
				</View>				
			</View>
		);
	}
}

export default connect(null, null)(EditProfile);