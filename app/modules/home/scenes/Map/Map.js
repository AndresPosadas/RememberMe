import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import MapView, { ProviderPropType } from 'react-native-maps';
import isEqual from 'lodash';

import { styles, customStyle } from './styles';
import { GEOLOCATION_OPTIONS, DEFAULT_POSITION } from '../../constants';

const { container, map } = styles;

/**
 * May need to initiate watchLocation() for tracking user movement.
 */

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPosition: DEFAULT_POSITION,
    };
  }
  componentDidMount() {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        'title': 'RemindMe App Location Permission',
        'message': 'RemindMe needs access to your location so that you can use the map',
      })
      .then((granted) => {
        if (granted) {
          navigator.geolocation.getCurrentPosition((position) => {
            userPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: this.state.userPosition.latitudeDelta,
              longitudeDelta: this.state.userPosition.longitudeDelta,
            };
            this.setState({ userPosition });
          }, null, this.props.geolocationOptions);
        }
      });
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        userPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: this.state.userPosition.latitudeDelta,
          longitudeDelta: this.state.userPosition.longitudeDelta,
        };
        this.setState({ userPosition });
      }, null, this.props.geolocationOptions);
    }
  }
  onPress(location) {
    try {
      console.log (location);
      Actions.Proximity({ 
        latitude: location.coordinate.latitude,
        longitude: location.coordinate.longitude,
      });
    } catch (e) {
      alert(e);
      console.log(Actions);
    }
  }
  render() {
    console.log('Running render');
    return (
      <View style={container}>
        <MapView
          provider={this.props.provider}
          style={map}
          region={this.state.userPosition}
          customMapStyle={customStyle}
          showsUserLocation
          showsCompass
          onLongPress={(e) => this.onPress(e.nativeEvent)}
        />
      </View>
    );
  }
}

Map.defaulProps = {
  geolocationOptions: GEOLOCATION_OPTIONS,
};

export default Map;