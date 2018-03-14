import React from 'react';
var { View, StyleSheet, Alert, ScrollView, Text, ListView, TextInput } = require('react-native');

import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from "../../../../config/firebase";

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

const { color } = theme;
const database = firebase.database();

class Timed extends React.Component {
    constructor() {
		
        super();
        this.state = {}

    }

    render() {
		
		return (
		
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.title}>Please fill out the following information.</Text>
				</View>
				<Text style={styles.title}>Name:</Text>
				<TextInput placeholder='Enter the name here.' underlineColorAndroid="transparent" />
				<Text style={styles.title}>Description:</Text>
				<TextInput placeholder='Enter the description here.' underlineColorAndroid="transparent" />
				<Text style={styles.title}>Address:</Text>
				<TextInput placeholder='Enter the address here.' underlineColorAndroid="transparent" />
				<Text style={styles.title}>Date:</Text>
				<TextInput placeholder='Enter the date here.' underlineColorAndroid="transparent" />
				<Text style={styles.title}>Time:</Text>
				<TextInput placeholder='Enter the time here.' underlineColorAndroid="transparent" />
			</View>
		
		);		
    }
}

export default connect(null, null)(Timed);