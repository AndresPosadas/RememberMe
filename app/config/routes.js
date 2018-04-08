import React from 'react';
import { StyleSheet, View } from "react-native";
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';
import firebase from './firebase';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';

//Home Scenes
import Home from '../modules/home/scenes/Home';
import Profile from '../modules/home/scenes/Profile';
import EditProfile from '../modules/home/scenes/EditProfile';
import Timed from '../modules/home/scenes/Timed';
import ViewReminders from '../modules/home/scenes/ViewReminders';
import EditReminder from '../modules/home/scenes/EditReminder';
import Map from '../modules/home/scenes/Map';
import Proximity from '../modules/home/scenes/Proximity';

import { fontFamily, normalize } from "../styles/theme";

export default class extends React.Component {
    constructor() {
        super();
		user = firebase.auth().currentUser;
		
        this.state = {
            isReady: false,
			isLoggedIn: user ? true : false,
        }
    }

    componentDidMount() {
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar
                       navigationBarStyle={styles.navBar}
                       titleStyle={styles.title}
                       backButtonTintColor={"rgba(0,0,0,.84)"}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username"
                                   back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="ForgotPassword"/>
                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Home" initial={true} type={ActionConst.REPLACE}/>
                        <Scene key="Profile" component={Profile} title="My Profile" back/>
                        <Scene key="EditProfile" component={EditProfile} title="Edit Profile" back/>
                        <Scene key="Timed" component={Timed} title="Add Timed Reminder" back/>
						<Scene key="ViewReminders" component={ViewReminders} title="My Reminders" back/>
						<Scene key="EditReminder" component={EditReminder} title="Edit Reminder" back/>
						<Scene key="Map" component={Map} title="View Map" back/>
                        <Scene key="Proximity" component={Proximity} title="Add Proximity Reminder" back/>
                    </Stack>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    navBar:{
        backgroundColor:"#fff",
        borderBottomWidth:0
    },

    title:{
        fontSize: normalize(16),
        lineHeight: normalize(19),
        fontFamily: fontFamily.bold,
        color: "rgba(0,0,0,.84)"
    }
});