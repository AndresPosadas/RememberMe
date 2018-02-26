import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import LoginForm from './LoginForm';

export default class login extends Component {
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						source={require('./images/ic_alarm_3x.png')}
					/>
					<Text style={styles.title}>Welcome to RemindMe!</Text>
					<Text style={styles.subtext}>An app by Team 10.</Text>
				</View>
				<View style={styles.formContainer}>
					<LoginForm />
				</View>
			</KeyboardAvoidingView>
		);
	}
}

onPress = () => {
	this.setState({
		count: this.state.count+1
	})
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#60a3bc',		
	},
	logoContainer: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 150,
		height: 150,
	},
	title: {
		color: '#2d3436',
		marginTop: 10,
	},
	subtext: {
		color: '#2d3436',
		marginTop: 10,
		opacity: 0.6,
	},
	formContainer: {
		
	}
});