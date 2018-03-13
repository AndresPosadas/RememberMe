import React from 'react';
var { View, StyleSheet, Alert, ScrollView, Text, ListView, TextInput, Image } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import firebase from '../../../../config/firebase';

const styles = require('./styles');
const placeholderURL = 'https://thumbs.dreamstime.com/b/default-placeholder-profile-icon-avatar-gray-man-90197971.jpg';

class Profile extends React.Component {
	
	constructor(props) {
		
		super(props);

		this.auth = firebase.auth();
		this.user = this.auth.currentUser;
		
		this.state = { email: '', username: '', photoURL: placeholderURL };
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

	editProfile(){
		Actions.EditProfile();
	}
	
	// Renders the user's profile
	render() {		
		return (
			<View style={styles.container}>

				<View style={styles.imageContainer}>
					<Image
          				style={styles.image}
						source={{uri: this.state.photoURL }}
					/>
				</View>
			
				<View style={styles.textContainer}>
					<Text style={styles.titleText}>Email:</Text>
					<Text style={styles.otherText}>{this.state.email}</Text>
					<Text style={styles.titleText}>Username:</Text>
					<Text style={styles.otherText}>{this.state.username}</Text>
				</View>
				
				<View style={styles.bottomContainer}>
                        <View style={[styles.buttonContainer]}>
                            <Button
                                raised
                                borderRadius={4}
                                title={'EDIT PROFILE'}
                                containerViewStyle={[styles.containerView]}
                                buttonStyle={[styles.button]}
                                textStyle={styles.buttonText}
                                onPress={this.editProfile}/>
                        </View>
				</View>
				
			</View>
		);
	}
}

export default connect(null, null)(Profile);