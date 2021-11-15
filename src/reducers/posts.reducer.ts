import _ from 'lodash';
import * as constants from '../constants';
import * as interfaces from '../interfaces'; // eslint-disable-line no-unused-vars
import { IActions } from '../actions/posts.actions'; // eslint-disable-line no-unused-vars

export default (
	state: interfaces.posts.IReducer = interfaces.posts.initialState,
	action: IActions,
) => {
	switch (action.type) {
		case constants.posts.actions.PUSH_POSTS:
			return {
				...state,
				records: [
					...state.records,
					...action.payload,
				],
			};

		case constants.posts.actions.SET_SKIP:
			return {
				...state,
				skip: action.payload,
			};

		case constants.posts.actions.UNSHIFT_POSTS:
			state.records.unshift(action.payload);

			return {
				...state,
				records: state.records,
			};

		case constants.posts.actions.UPDATE_POST:
			state.records[_.findIndex(state.records, { _id: action.payload.id })] = action.payload.post;
			return {
				...state,
				records: state.records,
			};

		default:
			return state;
	}
};
