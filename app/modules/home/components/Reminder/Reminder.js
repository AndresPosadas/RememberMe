import React from "react";
import { Text, Alert, View } from "react-native";
import styles from "./styles";
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";

class Reminder extends React.Component {
	constructor() {
		super();
	}
	
	onEdit() {
		Actions.EditReminder({reminder: this.props.item, isProximity: false});
	}
	
	onDelete() {
		Alert.alert(
			'Are you sure?',
			'This action cannot be undone.',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Confirm', onPress: () => this.props.item.ref.remove()},
			],
			{ cancelable: false }
		);
	}
	
	onSuccess() {
		Alert.alert("Success!", "Reminder was ");
	}
	
	onError(error) {
		Alert.alert("Uh-oh!", error.message);
	}

	render() {
		var reminder = this.props.item.val();
		
		if(reminder.type === 'expired') {
			
			return (
			<View style={styles.container}>
				<View style={styles.expiredTextContainer}>
					<View style={{flexDirection: "row"}}>
						<Text style={styles.reminderText}>Title: </Text>
						<Text style={styles.reminderText}>{reminder.title}</Text>
					</View>
					<View style={{flexDirection: "row"}}>
						<Text style={styles.reminderText}>Body: </Text>
						<Text style={styles.reminderText}>{reminder.description}</Text>
					</View>
					{
						(!!reminder.date) &&
						<View style={{flexDirection: "row"}}>
							<Text style={styles.reminderText}>Date: </Text>
							<Text style={styles.reminderText}>{reminder.date}</Text>
						</View>
					}
					{
						(!!reminder.time) &&
						<View style={{flexDirection: "row"}}>
							<Text style={styles.reminderText}>Time: </Text>
							<Text style={styles.reminderText}>{reminder.time}</Text>
						</View>
					}
					{
						(!!reminder.recurring) &&
						<View style={{flexDirection: "row"}}>
							<Text style={styles.reminderText}>Recurring: </Text>
							<Text style={styles.reminderText}>{reminder.recurring}</Text>
						</View>
					}
				</View>
				<View style={styles.expiredButtonContainer}>
					<Button
						raised
						title={"EDIT"}
						borderRadius={4}
						containerViewStyle={styles.containerView}
						buttonStyle={styles.button}
						textStyle={styles.buttonText}
						onPress={this.onEdit.bind(this)}/>
					<Button
						raised
						title={"DELETE"}
						borderRadius={4}
						containerViewStyle={styles.containerView}
						buttonStyle={styles.button}
						textStyle={styles.buttonText}
						onPress={this.onDelete.bind(this)}/>
				</View>
			</View>
			);
			
		} else {
			
			return (
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<View style={{flexDirection: "row"}}>
						<Text style={styles.reminderText}>Title: </Text>
						<Text style={styles.reminderText}>{reminder.title}</Text>
					</View>
					<View style={{flexDirection: "row"}}>
						<Text style={styles.reminderText}>Body: </Text>
						<Text style={styles.reminderText}>{reminder.description}</Text>
					</View>
					{
						(!!reminder.date) &&
						<View style={{flexDirection: "row"}}>
							<Text style={styles.reminderText}>Date: </Text>
							<Text style={styles.reminderText}>{reminder.date}</Text>
						</View>
					}
					{
						(!!reminder.time) &&
						<View style={{flexDirection: "row"}}>
							<Text style={styles.reminderText}>Time: </Text>
							<Text style={styles.reminderText}>{reminder.time}</Text>
						</View>
					}
					{
						(!!reminder.recurring) &&
						<View style={{flexDirection: "row"}}>
							<Text style={styles.reminderText}>Recurring: </Text>
							<Text style={styles.reminderText}>{reminder.recurring}</Text>
						</View>
					}
				</View>
				<View style={styles.buttonContainer}>
					<Button
						raised
						title={"EDIT"}
						borderRadius={4}
						containerViewStyle={styles.containerView}
						buttonStyle={styles.button}
						textStyle={styles.buttonText}
						onPress={this.onEdit.bind(this)}/>
					<Button
						raised
						title={"DELETE"}
						borderRadius={4}
						containerViewStyle={styles.containerView}
						buttonStyle={styles.button}
						textStyle={styles.buttonText}
						onPress={this.onDelete.bind(this)}/>
				</View>
			</View>
		);
		}
	}
}

export default Reminder;