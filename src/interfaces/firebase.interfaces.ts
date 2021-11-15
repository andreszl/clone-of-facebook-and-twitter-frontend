/* eslint-disable no-unused-vars */
import firebase from 'firebase';

export namespace fire {
	export interface Observer<T = any> {
		next?: (snapshot: firebase.firestore.QuerySnapshot<T>) => void;
		error?: (error: Error) => void;
		complete?: () => void;
	}

	export type DocumentData = firebase.firestore
		.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
}
