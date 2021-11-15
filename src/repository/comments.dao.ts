import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase';

import { db } from './firestore.config';
import * as interfaces from '../interfaces';

export const get = (postId: string): Observable<interfaces.comments.IComment[]> => {
	return new Observable((observer: interfaces.fire.Observer) => db.collection('comments')
		.where('postId', '==', postId)
		.orderBy('created_at', 'asc')
		.onSnapshot(observer))
		.pipe(
			map((data: firebase.firestore.QuerySnapshot<interfaces.comments.IComment>) => {
				return data.docs.map((d) => {
					return { ...d.data(), _id: d.id };
				});
			}),
		);
};

export const save = (comment: interfaces.comments.ICreate) => {
	db.collection('comments').add({
		...comment,
		created_at: new Date(),
		updated_at: new Date(),
	});
};
