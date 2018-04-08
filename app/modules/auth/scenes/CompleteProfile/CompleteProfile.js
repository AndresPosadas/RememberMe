import React from 'react';
import { Actions } from 'react-native-router-flux';

import { createUser } from '../../api';

import Form from '../../components/Form';
import AuthContainer from '../../components/AuthContainer';

const fields = [
    {
        key: 'username',
        label: "Username",
        placeholder: "",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
	{
        key: 'photo',
        label: "Photo URL",
        placeholder: "",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    }
];

const error = {
    general: "",
    username: ""
}

class CompleteProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        //attach user id
        const { user } = this.props;
        data['uid'] = user.uid;

        createUser(data, this.onSuccess, this.onError)
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
                      buttonTitle={"CONTINUE"}
                      error={this.state.error}/>
            </AuthContainer>
        );
    }
}

export default CompleteProfile;