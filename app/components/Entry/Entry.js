import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import LoginForm from './Log-In/LoginForm';
import styles from './styles';

export default class login extends Component {
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
				<View style={styles.logoContainerStyle}>
					<Image
						style={styles.logoStyle}
						source={require('../../images/ic_alarm_3x.png')}
					/>
					<Text style={styles.titleStyle}>Welcome to RemindMe!</Text>
					<Text style={styles.subtextStyle}>An app by Team 10.</Text>
				</View>
				<View style={styles.formContainerStyle}>
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