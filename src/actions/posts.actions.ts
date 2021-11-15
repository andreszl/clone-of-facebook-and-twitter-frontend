import api from '../api';
import * as constants from '../constants';
import * as interfaces from '../interfaces'; // eslint-disable-line no-unused-vars

export const setPosts = (payload: interfaces.posts.IPost[]) => {
	return {
		type: constants.posts.actions.SET_POSTS,
		payload,
	} as const;
};

export const updatePost = (id: string, post: interfaces.posts.IPost) => {
	return {
		type: constants.posts.actions.UPDATE_POST,
		payload: { id, post },
	} as const;
};

export const pushPosts = (payload: interfaces.posts.IPost[]) => {
	return {
		type: constants.posts.actions.PUSH_POSTS,
		payload,
	} as const;
};

export const unshiftPost = (payload: interfaces.posts.IPost) => {
	return {
		type: constants.posts.actions.UNSHIFT_POSTS,
		payload,
	} as const;
};

export const setSkip = (payload: number) => {
	return {
		type: constants.posts.actions.SET_SKIP,
		payload,
	} as const;
};

export function toogleLike(id: string, type: 'like'|'dislike') {
	return (async (dispatch: interfaces.redux.IDistpatch, getState: interfaces.redux.IGetState) => {
		try {
			const { user } = getState();
			const post = await api.posts.toogleLike<interfaces.posts.IPost>(id, user.value, type);
			dispatch(updatePost(id, post));
			return { likes: post.likes, dislikes: post.dislikes };
		} catch (err) {
			console.log(err);
			return { likes: [], dislikes: [] };
		}
	}) as unknown as Promise<{ likes: string[], dislikes: string[] }>;
}

const actions = {
	setPosts,
	setSkip,
	pushPosts,
	unshiftPost,
	updatePost,
};

export type IActions = interfaces.redux.IActionUnion<typeof actions>;
