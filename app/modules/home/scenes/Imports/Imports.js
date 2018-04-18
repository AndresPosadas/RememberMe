import React from 'react';
import RNCalendarEvents from 'react-native-calendar-events';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import firebase from '../../../../config/firebase';
import { TextInput, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class Imports extends React.Component {
    constructor(props) {
        super(props);

        user = firebase.auth().currentUser;
        uid = user.uid;
        db = firebase.database();
        remindersRef = db.ref('users/' + uid + '/reminders/timed');

        this.state = {
            fromDate: moment().format('YYYY-MM-DD'),
            toDate: moment().add(1, 'days').format('YYYY-MM-DD'),
            calendarid: '',
            remindersRef: remindersRef,
        };

        this.import = this.import.bind(this);
    }

    import() {
        RNCalendarEvents.findCalendars()
        .then((calendars) => {
            fromDate = new Date(this.state.fromDate);
            toDate = new Date(this.state.toDate);
            
            RNCalendarEvents.fetchAllEvents(fromDate, toDate, [calendars[0].id])
            .then((events) => {
                console.log('These are what the events look !like:');
                console.log(events);

                console.log('The event starts at: ');
                console.log(moment(events[0].startDate).format('hh:mm a'));
                
                remindersRef = this.state.remindersRef;

                events.forEach((event) => {
                    remindersRef.push().set({
                        address: '',
                        date: moment(event.startDate).format('YYYY/MM/DD'),
                        description: event.description,
                        recurring: 'no',
                        time: moment(event.startDate).format('hh:mm a'),
                        title: event.title,
                        type: 'timed',
                    })
                })
            })
        });
        console.log('from date is: ', new Date(this.state.fromDate));
        console.log('to date is: ', new Date(this.state.toDate));
        console.log('calendar id is: ', this.state.calendarid);
    }

    render() {
        return (
            <View>
                <Text> Start: </Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.fromDate}
                    mode='date'
                    placeholder='select date'
                    format='YYYY-MM-DD'
                    minDate='2016-05-01'
                    maxDate='2019-06-01'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(fromDate) => {this.setState({fromDate})}}
                />

                <Text> End: </Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.toDate}
                    mode='date'
                    placeholder='select date'
                    format='YYYY-MM-DD'
                    minDate='2016-05-01'
                    maxDate='2019-06-01'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(toDate) => {this.setState({toDate})}}
                />
                
                <Button
                    title={'Import'}
                    onPress={this.import}
                />
            </View>
        );
    }
}

export default Imports;