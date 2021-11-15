import * as constants from '../constants';
import * as interfaces from '../interfaces'; // eslint-disable-line no-unused-vars

export const setScrollPosition = (position: number) => {
	return {
		type: constants.scroll.actions.SET_POSITION,
		payload: position,
	} as const;
};

const actions = {
	setScrollPosition,
};

export type IActions = interfaces.redux.IActionUnion<typeof actions>;
