import firebase from 'firebase';

export namespace comments {
	export interface IComment {
		_id: string,
		postId: string,
		user: string,
		description: string,
		created_at : firebase.firestore.Timestamp,
		updated_at : firebase.firestore.Timestamp,
	}

	export interface ICreate {
		user: string,
		description: string,
		postId: string,
	}
}
