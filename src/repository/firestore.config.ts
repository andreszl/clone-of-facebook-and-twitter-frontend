import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBOD65yiUbo_pkOiRRhk3jHsF1n46QmVl0',
	authDomain: 'clone-of-facebook-and-twitter.firebaseapp.com',
	projectId: 'clone-of-facebook-and-twitter',
	storageBucket: 'clone-of-facebook-and-twitter.appspot.com',
	messagingSenderId: '497945618388',
	appId: '1:497945618388:web:9854aa127cc8e4f5d7d841',
};

firebase.initializeApp(firebaseConfig);
export const firebaseAdmin = firebase;
export const db = firebase.firestore();
export const storage = firebase.storage();
