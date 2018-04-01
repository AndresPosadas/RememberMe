import {
    Dimensions,
} from 'react-native';

/**
 * Map-related constants
 */
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_GEOCODE_ENDPOINT } from '../../config/constants';

export const GEOLOCATION_OPTIONS = { 
    enableHighAccuracy: true, 
    timeout: 20000, 
    maximumAge: 20000,
};

export const DEFAULT_POSITION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922 * ASPECT_RATIO,
};

/**
 * Miscellaneous constants
 */
export const placeholderURL = 'https://thumbs.dreamstime.com/b/default-placeholder-profile-icon-avatar-gray-man-90197971.jpg';