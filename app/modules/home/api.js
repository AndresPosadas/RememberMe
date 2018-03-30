import firebase from '../../config/firebase';

auth = firebase.auth();
database = firebase.database();

export function authenticateUser(password) {
	user = auth.currentUser;
	email = user.email;
	
	credential = firebase.auth.EmailAuthProvider.credential(
		email,
		password
	);

	return user.reauthenticateWithCredential(credential);
}

export function signOut(successCB, errorCB) {
	auth.signOut()
		.then(() => successCB())
		.catch((error) => errorCB(error)
	);
}

export function updateEmail(email) {
	user = auth.currentUser;
	return user.updateEmail(email);
}

export function updateProfile(data, successCB, errorCB) {
	
	if(data.displayName) {
		exists('users', 'username', data.displayName)
		.then((snapshot) => {
			if (snapshot.val() == null) {
				user.updateProfile(data)
					.then(() => successCB(data))
					.catch((error) => errorCB(error));
			} else {
				errorCB({ message: 'That username is already in use.' });
			}
		})
		.catch((error) => errorCB(error)
		);
	} 
	
	else {
		user.updateProfile(data)
			.then(() => successCB(data))
			.catch((error) => errorCB(error));
	}
}

export function appendToList(ref, toAppend, data, successCB, errorCB) {
	insertReference = database.ref(ref + '/' + toAppend).push();
	insertReference.set(data)
		.then(() => successCB())
		.catch((error) => errorCB(error)
	);
}
export function update(ref, child, data, successCB, errorCB) {
	database.ref(ref).child(child).update(data)
		.then(() => successCB())
		.catch((error) => {
			errorCB(error);
		});
}

export function exists(ref, child, item) {
	return database.ref(ref).orderByChild(child).equalTo(item).once('value');
}

export function getTimed(ref, child) {
	return database.ref(ref).orderByChild(child);
}
