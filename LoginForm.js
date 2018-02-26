import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

export default class LoginForm extends Component {
	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					barStyle="light-content"
				/>
				<Text style={styles.title}>Login to your account, or sign up to make a new one.</Text>
				<TextInput 
					placeholder="username or email address"
					style={styles.input}
					returnKeyType="next"
					onSubmitEditing={() => this.passwordInput.focus()}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<TextInput
					placeholder="password"
					style={styles.input} 
					secureTextEntry
					returnKeyType="go"
					ref={(input) => this.passwordInput = input}
				/>
				
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={this._onPressLogin}
				>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>
				
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={this._onPressSignUp}
				>
					<Text style={styles.buttonText}>SIGNUP</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

// TODO: Verify personal info with database
_onPressLogin = () => {
	console.log("Login pressed!");
}

// TODO: Open sign up form
_onPressSignUp = () => {
	console.log("Signup pressed!");
}

const styles = StyleSheet.create({
	container: {
		padding: 20,	
	},
	input: {
		height: 40,
		backgroundColor: '#82ccdd',
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	title: {
		marginBottom: 20,
		justifyContent: 'center',
		alignContent: 'center',
		textAlign: 'center',
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontWeight: '700',
	},
	buttonContainer: {
		paddingVertical: 10,
		backgroundColor: '#2980b9',
		marginBottom: 10,
	}
});