import firebase from "../../config/firebase";
var { Alert } = require('react-native');

const auth = firebase.auth();
const database = firebase.database();
//const provider = firebase.auth.FacebookAuthProvider;

//Register the user using email and password
export function register(data, callback) {
    const { email, password } = data;
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => callback(true, user, null))
        .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser (user, callback) {
    database.ref('users').orderByChild("username").equalTo(user.username).once("value", (snapshot) => {
        if(snapshot.val() == null){
            var current = auth.currentUser;

            current.updateProfile({ displayName: user.username, photoURL: user.photo })
                .then(() => {
                    database.ref('users').child(user.uid).update({ ...user })
                        .then(() => callback(true, null, null))
                        .catch((error) => callback(false, null, {message: error}));
                }).catch((error) => callback(false, null, {message: error}));
        }
        else {
            callback(false, null, {message: 'Username is already in use. Choose again.'});
        }
    });
}

//Sign the user in with their email and password
export function login(data, callback) {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => getUser(user, callback))
        .catch((error) => callback(false, null, error));
}

//Get the user object from the realtime database
export function getUser(user, callback) {

    var current = auth.currentUser;

    const exists = ( current !== null );

    const data = { exists, user };

    callback( true, data, null );
}

//Send Password Reset Email
export function resetPassword(data, callback) {
    const { email } = data;
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut (callback) {
    auth.signOut()
        .then(() => {
            if (callback) callback(true, null, null)
        })
        .catch((error) => {
            if (callback) callback(false, null, error)
        });
}