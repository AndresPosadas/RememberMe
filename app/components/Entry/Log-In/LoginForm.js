import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import styles from './styles'

export default class LoginForm extends Component {
	render() {
		return (
			<View style={styles.containerStyle}>
				<StatusBar
					barStyle="light-content"
				/>
				<Text style={styles.titleStyle}>Login to your account, or sign up to make a new one.</Text>
				<TextInput 
					placeholder="username or email address"
					style={styles.inputStyle}
					returnKeyType="next"
					onSubmitEditing={() => this.passwordInput.focus()}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<TextInput
					placeholder="password"
					style={styles.inputStyle} 
					secureTextEntry
					returnKeyType="go"
					ref={(input) => this.passwordInput = input}
				/>
				
				<TouchableOpacity
					style={styles.buttonContainerStyle}
					onPress={this._onPressLogin}
				>
					<Text style={styles.buttonTextStyle}>LOGIN</Text>
				</TouchableOpacity>
				
				<TouchableOpacity
					style={styles.buttonContainerStyle}
					onPress={this._onPressSignUp}
				>
					<Text style={styles.buttonTextStyle}>SIGNUP</Text>
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