import React from 'react';
var { View, Alert, Platform } = require('react-native');
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { setTimer, clearTimer, setTimerIOS, clearTimerIOS } from '../../utils/backgroundTimer';
import styles from "./styles";
import { signOut, exists } from '../../api';
import { theme } from '../../../auth/index';

const { color } = theme;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.onSignOut = this.onSignOut.bind(this);
    }
	
	componentDidMount() {		
		if(Platform.OS === 'ios') {
			setTimerIOS();
		} else {
			this.intervalId = setTimer();
		}		
	}
	
	componentWillUnmount() {	
		if(Platform.OS === 'ios') {
			clearTimerIOS();
		} else {
			clearTimer(this.intervalId);
		}
	}
	
	viewMap() {
        Actions.Map();
    }

    viewProfile() {
        Actions.Profile();
    }

    viewReminders() {
        Actions.ViewReminders();
    }

    // Navigates to the timed reminder screen.
    timedReminder() {
        Actions.Timed();
    }

    proximityReminder() {
        Alert.alert('You tried to set a proximity reminder.');
    }

    importReminders() {
        Alert.alert('You tried to import reminders.');
    }

    // Communicates with Firebase API...calls onSuccess if signout worked
    onSignOut() {
        signOut(this.onSuccess.bind(this), this.onError.bind(this));
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
                <View style={styles.buttonContainer}>
                    <Button
                        raised
                        borderRadius={4}
                        title={'IMPORT REMINDERS'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        textStyle={styles.buttonText}
                        onPress={this.importReminders} />
                    <Button
                        raised
                        borderRadius={4}
                        title={'ADD PROXIMITY REMINDER'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        textStyle={styles.buttonText}
                        onPress={this.proximityReminder} />
                    <Button
                        raised
                        borderRadius={4}
                        title={'ADD TIMED REMINDER'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        textStyle={styles.buttonText}
                        onPress={this.timedReminder} />
                    <Button
                        raised
                        borderRadius={4}
                        title={'MY REMINDERS'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        textStyle={styles.buttonText}
                        onPress={this.viewReminders} />
                    <Button
                        raised
                        borderRadius={4}
                        title={'MY PROFILE'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        textStyle={styles.buttonText}
                        onPress={this.viewProfile} />
					<Button
                        raised
                        borderRadius={4}
                        title={'VIEW MAP'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        textStyle={styles.buttonText}
                        onPress={this.viewMap} />
                    <Button
                        raised
                        borderRadius={4}
                        title={'LOG OUT'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        textStyle={styles.buttonText}
                        onPress={this.onSignOut} />
                </View>
            </View>
        );
    }
}

export default Home;