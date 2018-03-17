import React from 'react';
import { View, StyleSheet, Alert, Text, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

import firebase from '../../../../config/firebase';

import { authenticateUser, updateEmail, updateProfile, update } from '../../api';
import { strcmp } from '../../utils/utils';
import { validateEmail } from '../../utils/validate';

import styles from './styles';

import { placeholderURL } from '../../constants';

class EditProfile extends React.Component {
	state = {
		email: '',
		username: '',
		photoURL: placeholderURL,
	};

	constructor(props) {
		super(props);
		this.user = firebase.auth().currentUser;
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

	onSuccess() {
		Alert.alert('Profile updated.');
		Actions.Profile();
	}

	onError(error) {
		Alert.alert('Something went wrong!', error.message);
	}

	async onPress() {
		if (!validateEmail(this.state.email)) {
			this.onError({ message: 'Invalid email address' });
			return;
		}

		try {
			const authenticated = await authenticateUser(this.state.password);
		} catch (e) {
			this.onError(e);
			return;
		}

		const { email, username, photoURL } = this.state;

		newEmail = strcmp(this.user.email, email);
		
		if (newEmail != 0) {
			try {
				const updatedEmail = await updateEmail(email);
			} catch (e) {
				this.onError(e);
				return;
			}
		}

		newUsername = strcmp(username, this.user.displayName);

		if (newUsername != 0) {
			this.updateDatabase = this.updateDatabase.bind(this);
			updateProfile({ displayName: username, photoURL }, this.updateDatabase, this.onError);
		} else {
			this.updateDatabase();
		}
	}

	updateDatabase() {
		const { email, username, photoURL } = this.state;

		update('users', 
				this.user.uid, 
				{ email, username, photoURL }, 
				this.onSuccess,
				this.onError
			);
	}

	// Renders the user's profile
	render() {
		const { container, 
				topContainer, 
				titleText, 
				passwordContainer, 
				passwordText, 
				bottomContainer,
				buttonContainer,
				containerView,
				button,
				buttonText 
			} = styles;

		return (
			<View style={container}>
				<View style={topContainer}>
					<Text style={titleText}>Email:</Text>
					<TextInput placeholder={this.state.email} underlineColorAndroid="transparent" onChangeText={(email) => this.setState({email})} />
					<Text style={titleText}>Username:</Text>
					<TextInput placeholder={this.state.username} underlineColorAndroid="transparent" onChangeText={(username) => this.setState({username})} />
					<Text style={titleText}>Photo URL:</Text>
					<TextInput placeholder={this.state.photoURL} underlineColorAndroid="transparent" onChangeText={(photoURL) => this.setState({photoURL})} />
				</View>

				<View style={passwordContainer}>
					<Text style={passwordText}>Note: Re-enter password to authorize change(s).</Text>
					<TextInput placeholder='Re-enter password here' underlineColorAndroid="transparent" onChangeText={(password) => this.setState({password})} />
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
							onPress={this.onPress.bind(this)} 
						/>
					</View>
				</View>
			</View>

		);
	}
}

export default EditProfile;