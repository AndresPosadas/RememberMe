import React, { Component } from 'react';
import Router from './app/config/routes'
import { pushNotifications } from './services';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

pushNotifications.configure();
console.disableYellowBox = true;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {RobotoBold: require('./app/assets/fonts/Roboto-Bold.ttf')},
            {RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf')},
            {RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf')},
            {RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf')}
        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        return (
            <Router/>
        );
    }
}