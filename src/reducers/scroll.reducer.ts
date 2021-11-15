import * as constants from '../constants';
import * as interfaces from '../interfaces'; // eslint-disable-line no-unused-vars
import { IActions } from '../actions/scroll.actions'; // eslint-disable-line no-unused-vars

export default (
	state: interfaces.scroll.IScroll = interfaces.scroll.initialState,
	action: IActions,
) => {
	switch (action.type) {
		case constants.scroll.actions.SET_POSITION:
			return {
				...state,
				position: action.payload,
			};

		default:
			return state;
	}
};
