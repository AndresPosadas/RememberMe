import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { Button, SocialIcon, Divider } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';

import {actions as auth} from "../../index"
const {} = auth;

import styles from "./styles"
import AuthContainer from "../../components/AuthContainer"

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        return (
            <AuthContainer>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image style={styles.image} source={{uri: ""}}/>
                        <Text style={styles.title}>RemindMe</Text>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={[styles.buttonContainer]}>
                            <Button
                                raised
                                borderRadius={4}
                                title={'SIGN UP WITH E-MAIL'}
                                containerViewStyle={[styles.containerView]}
                                buttonStyle={[styles.button]}
                                textStyle={styles.buttonText}
                                onPress={Actions.Register}/>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.bottomText}>
                                Already have an account?
                            </Text>

                            <TouchableOpacity onPress={Actions.Login}>
                                <Text style={styles.signInText}>
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </AuthContainer>
        );
    }
}


export default connect(null, {})(Welcome);