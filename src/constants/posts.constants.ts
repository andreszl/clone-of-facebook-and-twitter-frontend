/* eslint-disable no-unused-vars */

export namespace posts {
	export enum actions {
		SET_POSTS = 'SET_POSTS/POSTS',
		UPDATE_POST = 'UPDATE_POST/POSTS',
		PUSH_POSTS = 'PUSH/POSTS',
		UNSHIFT_POSTS = 'UNSHIFT/POSTS',
		SET_DATE= 'SET_DATE/POSTS',
		SET_SKIP = 'SET_SKIP/POSTS',
		SET_LIMIT = 'SET_LIMIT/POSTS',
		SET = 'SET/POSTS',
		ADD_LIKE = 'ADD_LIKE/POSTS',
		ADD_DISLIKE = 'ADD_DISLIKE/POSTS',
	}
}

export default posts;
