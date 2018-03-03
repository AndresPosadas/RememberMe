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
import Entry from '../Entry';
import styles from './styles';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Entry />
    );
  }
}