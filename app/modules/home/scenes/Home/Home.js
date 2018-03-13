import React from 'react';
var { View, StyleSheet, Alert, ScrollView, Text, ListView } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import firebase from "../../../../config/firebase";

const ListItem = require("../../components/ListItem");

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;

const database = firebase.database();

class Home extends React.Component {
    constructor(){
        super();
        this.state = { }
        
        this.onSignOut = this.onSignOut.bind(this);
		this.viewProfile = this.viewProfile.bind(this);
    }
	
	viewProfile() {
		Actions.Profile();
	}

	// Communicates with Firebase API...calls onSuccess if signout worked
    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this));
    }

	// Return to login screen
    onSuccess() {
        Actions.Auth();
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>	
                <View style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            raised
                            borderRadius={4}
                            title={'VIEW PROFILE'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={this.viewProfile}/>
                        <Button
                            raised
                            borderRadius={4}
                            title={'LOG OUT'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={this.onSignOut}/>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(null, { signOut })(Home);