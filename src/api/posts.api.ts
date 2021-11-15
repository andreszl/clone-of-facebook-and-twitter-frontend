import request from '../utils/request.util';
import * as interfaces from '../interfaces';

export async function store<T extends any>(
	post: interfaces.posts.ICreate,
) : Promise<T> {
	return request({
		url: 'posts/store',
		method: 'POST',
		body: post,
	});
}

export async function toogleLike<T extends any>(
	id: string,
	user: string,
	type: 'like'|'dislike',
) : Promise<T> {
	return request({
		url: 'posts/toogleLike',
		method: 'POST',
		body: { id, user, type },
	});
}

export async function addComment<T extends any>(
	postId: string,
) : Promise<T> {
	return request({
		url: 'posts/addComment',
		method: 'POST',
		body: { postId },
	});
}
