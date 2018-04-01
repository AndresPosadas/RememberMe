import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import isEqual from 'lodash/isEqual';

import Form from '../../components/Form';
import AuthContainer from '../../components/AuthContainer';

import { appendToList, retrieve } from '../../api';
import { GOOGLE_MAPS_GEOCODE_ENDPOINT, GOOGLE_MAPS_API_KEY } from '../../constants';
import { strcmp } from '../../utils/utils';
import firebase from '../../../../config/firebase';

const fields = [
	{
		key: 'title',
		label: 'Title',
		placeholder: 'Title',
		autoFocus: false,
		secureTextEntry: false,
		value: '',
		type: 'title'
	},
	{
		key: 'description',
		label: 'Description',
		placeholder: 'Description',
		autoFocus: false,
		secureTextEntry: false,
		value: '',
		type: 'description'
	},
	{
		key: 'address',
		label: 'Address',
		placeholder: 'Address',
		autoFocus: false,
		secureTextEntry: false,
		value: '',
		type: 'address'
	}
];

const error = {
	general: '',
	title: '',
	description: '',
	address: '',
	date: '',
	time: ''
}

class Proximity extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            error,
            loading: false,
            address: '',
        };

        this.user = firebase.auth().currentUser;
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount() {
        if (!(this.props.longitude || this.props.latitude)) return;

        this.setState({ loading: true });

        headers = {
            Accept: 'application/json',
        }

        body = {
            latlng: `${this.props.latitude},${this.props.longitude}`,
            key: GOOGLE_MAPS_API_KEY,
        }

        retrieve(GOOGLE_MAPS_GEOCODE_ENDPOINT, 'GET', body, headers)
        .then((res) => {
            results = JSON.parse(res._bodyInit).results;
            this.setState({
                loading: false,
                address: results[0].formatted_address,
            });
        })
        .catch((err) => {
            alert('Error retrieving address information');
            Actions.pop();
        });
    }
    onSubmit(data) {
        console.log('state ' + this.state);
        console.log('data ' + data.address);
        if (strcmp(this.state.address, data.address) != 0) {
            headers = {
                Accept: 'json/applicaton',
            }

            body = {
                address: data.address,
                key: GOOGLE_MAPS_API_KEY,
            }

            retrieve(GOOGLE_MAPS_GEOCODE_ENDPOINT, 'GET', body, headers)
            .then((res) => {
                results = JSON.parse(res._bodyInit).results;
                data.latitude = results[0].geometry.location.lat;
                data.longitude = results[0].geometry.location.lng;
                
                appendToList('users/' + this.user.uid, 'reminders/proximity', data, this.onSuccess, this.onError);
            }).catch((err) => {
                alert('Error saving reminder');
            });
        } else {
            data.latitude = this.props.latitude;
            data.longitude = this.props.longitude;
            appendToList('users/' + this.user.uid, 'reminders/proximity', data, this.onSuccess, this.onError);
        }
    }
    onSuccess() {
        alert('Reminder saved!');
        Actions.pop();
    }
    onError(error) {
		let errObj = this.state.error;

		if (error.hasOwnProperty('message')) {
			errObj['general'] = error.message;
		} else {
			let keys = Object.keys(error);
			keys.map((key, index) => {
				errObj[key] = error[key];
			})
		}
		this.setState({ error: errObj });
	}
    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text> Loading Address... </Text>
                </View>
            );
        }

        fields[2].value = this.state.address;

        return (
            <AuthContainer>
				<Form fields={fields}
					showLabel={false}
					onSubmit={this.onSubmit}
					buttonTitle={'ADD REMINDER'}
					error={this.state.error} />
			</AuthContainer>
        )
    }
}

export default Proximity;