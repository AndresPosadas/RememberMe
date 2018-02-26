/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './login';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Login />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
  },
  welcome: {
	flex: 1,
    fontSize: 20,
    alignContent: 'flex-start',
	justifyContent: 'flex-start',
    margin: 15,
	backgroundColor: '#dfe6e9',
  },
});
