import firebase from '../../config/firebase';

auth = firebase.auth();
database = firebase.database();

export function createUser(data, successCB, errorCB) {
	database.ref('users').orderByChild('username').equalTo(data.username).once('value', (snapshot) => {
		if (snapshot.val() == null) {
			const currentUser = auth.currentUser;

			currentUser.updateProfile({ username: data.username, photoURL: data.photo })
				.then(() => {
					database.ref('users').child(data.uid).update({ ...data })
						.then(() => successCB())
						.catch((error) => errorCB(error));
				})
				.catch((error) => errorCB(error));
		} else {
			errorCB({ message: 'Username is already in use. Choose again.'});
		}
	});
}

export function login(data, successCB, errorCB) {
	const { email, password } = data;
	auth.signInWithEmailAndPassword(email, password)
		.then((user) => successCB())
		.catch((error) => errorCB(error));
}

export function register(data, successCB, errorCB) {
	const { email, password } = data;
	auth.createUserWithEmailAndPassword(email, password)
		.then((user) => successCB(user))
		.catch((error) => errorCB(error));
}

export function resetPassword(data, successCB, errorCB) {
	const { email } = data;
	auth.sendPasswordResetEmail(email)
		.then((user) => successCB())
		.catch((error) => errorCB(error));
}