import React from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { login } from '../../api';
import styles from "./styles";
import Form from "../../components/Form";
import AuthContainer from "../../components/AuthContainer";

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password"
    }
];

const error = {
    general: "",
    email: "",
    password: ""
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onForgotPassword() {
        Actions.ForgotPassword()
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        login(data, this.onSuccess, this.onError);
    }

    onSuccess() {
        Actions.Main()
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }

    render() {
        return (
            <AuthContainer>
                <Form fields={fields}
                      showLabel={true}
                      onSubmit={this.onSubmit}
                      buttonTitle={"LOG IN"}
                      error={this.state.error}/>
                <Text style={styles.forgotText} onPress={this.onForgotPassword}>Forgot password?</Text>
            </AuthContainer>
        );
    }
}

export default Login;
