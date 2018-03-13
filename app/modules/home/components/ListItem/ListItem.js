import React, { Component } from 'react';
import { View, Text } from 'react-native';

const styles = require('./styles');

class ListItem extends Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{this.props.task.name}</Text>
      </View>
    );
  }
}

module.exports = ListItem;