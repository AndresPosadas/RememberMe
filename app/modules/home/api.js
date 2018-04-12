import firebase from '../../config/firebase';
import { isEmpty, stringObjectTogether, strcmp } from './utils/utils';

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

export function deleteItem(ref, key) {
	return ref.child(key).remove(() => {
		console.log("Removed " + ref + "/" + key);
	});
}

export function addToExpired(ref, data, successCB, errorCB) {
	insertReference = database.ref(ref).push();
	insertReference.set(data)
		.then((data) => successCB(data))
		.catch((error) => errorCB(error)
	);
}

export function getAll(ref, successCB, errorCB) {
	database.ref(ref).on('value', (snapshot) => successCB(snapshot), (error) => errorCB(error));
}

export function getProxReminders(ref, successCB, errorCB, curLat, curLon) {
	database.ref(ref).once('value', (snapshot) => successCB(snapshot, curLat, curLon), (error) => errorCB(error));
}

export function retrieve(url, method = 'GET', body: {}, headers: {}) {
	config = { method: method };

	if (strcmp(method, 'GET') == 0 || strcmp(method, 'HEAD')) {
        url = url += '?' + stringObjectTogether(body, '=', '&');
    } else {
		if (!isEmpty(body)) {
			config.body = body;
		}
	}

	if (!isEmpty(headers)) {
		config.headers = headers;
	}

	return fetch(url, config);
}