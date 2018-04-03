import React from 'react';
import PropTypes from 'prop-types'

import { View, Text, Alert, Picker } from 'react-native';
import { Button, FormValidationMessage } from 'react-native-elements'

import { validate, isEmpty } from '../../utils/validate'

import styles from "./styles"

import AuthTextInput from "../AuthTextInput"
import { theme } from "../../index"

const { windowWidth, fontSize, normalize, fontFamily } = theme;

class Form extends React.Component {
    constructor(props) {
        super(props);

        const fields = props.fields;
        const error = props.error;

        const state = {};

        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            let {key, type, value} = field;
            state[key] = {type: type, value: value};
        }

        state["error"] = error;
		state["recurring"] = {type: "recurring", value: ""};
		state["hour"] = {type: "hour", value: ""};
		state["minute"] = {type: "minute", value: ""};
		state["amPm"] = {type: "amPm", value: ""};

        this.state = state;

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        const data = this.state;
        const result = validate(data);

        if (!result.success) this.setState({error: result.error});
        else this.props.onSubmit(this.extractData(data));
    }

    extractData(data){
        const retData = {};

        Object.keys(data).forEach(function(key) {
            if (key !== "error" && key !== "recurring" && key !== "hour" && key !== "minute" && key !== "amPm"){
                let { value } = data[key];
                retData[key] = value;
            }
        });
		
		retData["time"] = data.hour + ":" + data.minute + " " + data.amPm;
		retData["recurring"] = data.recurring;

        return retData;
    }

    onChange(key, text) {
        const state = this.state;
        state[key]['value'] = text;
        this.setState(state);
    }

    render() {
        const { fields, showLabel, buttonTitle, showRecurring } = this.props;
		
		if(this.props.showRecurring==true) {
			        return (
				<View style={styles.wrapper}>
                {
                    (!isEmpty(this.state.error['general'])) &&
                    <Text style={styles.errorText}>{this.state.error['general']}</Text>
                }

                {
                    fields.map((data, idx) => {
                        let {key, label, placeholder, autoFocus, secureTextEntry} = data;
                        return (
                            <AuthTextInput key={key}
                                           label={label}
                                           showLabel={showLabel}
                                           placeholder={placeholder}
                                           autoFocus={autoFocus}
                                           onChangeText={(text) => this.onChange(key, text)}
                                           secureTextEntry={secureTextEntry}
                                           value={this.state[key]['value']}
                                           error={this.state.error[key]}/>
                        )
                    })
                }
				
				<View style={styles.timeContainer}>
					<Text style={styles.recurringText}>Time </Text>
					<View style={styles.pickerRows}>
						<View style={styles.pickerWrapper}>
							<Picker
								style={styles.timeStyle}
								selectedValue={this.state.hour}
								onValueChange={(itemValue, itemIndex) => this.setState({hour: itemValue})}>
								<Picker.Item label="---" color="gray" value="" />
								<Picker.Item label="1" color="gray" value="1" />
								<Picker.Item label="2" color="gray" value="2" />
								<Picker.Item label="3" color="gray" value="3" />
								<Picker.Item label="4" color="gray" value="4" />
								<Picker.Item label="5" color="gray" value="5" />
								<Picker.Item label="6" color="gray" value="6" />
								<Picker.Item label="7" color="gray" value="7" />
								<Picker.Item label="8" color="gray" value="8" />
								<Picker.Item label="9" color="gray" value="9" />
								<Picker.Item label="10" color="gray" value="10" />
								<Picker.Item label="11" color="gray" value="11" />
								<Picker.Item label="12" color="gray" value="12" />
							</Picker>
						</View>
						<View style={styles.pickerWrapper}>
							<Picker
								style={styles.timeStyle}
								selectedValue={this.state.minute}
								onValueChange={(itemValue, itemIndex) => this.setState({minute: itemValue})}>
								<Picker.Item label="---" color="gray" value="" />
								<Picker.Item label="00" color="gray" value="00" />
								<Picker.Item label="05" color="gray" value="05" />
								<Picker.Item label="10" color="gray" value="10" />
								<Picker.Item label="15" color="gray" value="15" />
								<Picker.Item label="20" color="gray" value="20" />
								<Picker.Item label="25" color="gray" value="25" />
								<Picker.Item label="30" color="gray" value="30" />
								<Picker.Item label="35" color="gray" value="35" />
								<Picker.Item label="40" color="gray" value="40" />
								<Picker.Item label="45" color="gray" value="45" />
								<Picker.Item label="50" color="gray" value="50" />
								<Picker.Item label="55" color="gray" value="55" />
							</Picker>
						</View>
						<View style={styles.pickerWrapper}>
							<Picker
								style={styles.timeStyle}
								selectedValue={this.state.amPm}
								onValueChange={(itemValue, itemIndex) => this.setState({amPm: itemValue})}>
								<Picker.Item label="---" color="gray" value="" />
								<Picker.Item label="am" color="gray" value="am" />
								<Picker.Item label="pm" color="gray" value="pm" />
							</Picker>
						</View>
					</View>
					{
						(!isEmpty(this.state.error.hour) || !isEmpty(this.state.error.minute) || !isEmpty(this.state.error.amPm)) &&
							<FormValidationMessage>
								{"Time is required."}
							</FormValidationMessage>
					}	
				</View>
				
				<View style={styles.pickerContainer}>
					<Text style={styles.recurringText}>Recurring? </Text>
					<View style={styles.pickerWrapper}>
						<Picker
							style={styles.pickerStyle}
							selectedValue={this.state.recurring}
							onValueChange={(itemValue, itemIndex) => this.setState({recurring: itemValue})}>
							<Picker.Item label="--select--" color="gray" value="" />
							<Picker.Item label="Yes" color="gray" value="yes" />
							<Picker.Item label="No" color="gray" value="no" />
						</Picker>
					</View>
					{
						(!isEmpty(this.state.error.recurring)) &&
							<FormValidationMessage>
								{this.state.error.recurring}
							</FormValidationMessage>
					}	
				</View>

                <Button
                    raised
                    title={buttonTitle}
                    borderRadius={4}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={this.onSubmit}/>
            </View>
        );
		} else {
			return (
            <View style={styles.wrapper}>
                {
                    (!isEmpty(this.state.error['general'])) &&
                    <Text style={styles.errorText}>{this.state.error['general']}</Text>
                }

                {
                    fields.map((data, idx) => {
                        let {key, label, placeholder, autoFocus, secureTextEntry} = data;
                        return (
                            <AuthTextInput key={key}
                                           label={label}
                                           showLabel={showLabel}
                                           placeholder={placeholder}
                                           autoFocus={autoFocus}
                                           onChangeText={(text) => this.onChange(key, text)}
                                           secureTextEntry={secureTextEntry}
                                           value={this.state[key]['value']}
                                           error={this.state.error[key]}/>
                        )
                    })
                }

                <Button
                    raised
                    title={buttonTitle}
                    borderRadius={4}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={this.onSubmit}/>
            </View>
        );
		}

    }
}

Form.propTypes = {
    // fields: PropTypes.object,
    showLabel: PropTypes.bool,
    buttonTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.object
}

export default Form;