import { combineReducers } from 'redux';

import scroll from './scroll.reducer';
import posts from './posts.reducer';
import user from '../features/user/userSlice';

const reducers = combineReducers({
	scroll,
	posts,
	user,
});

export default reducers;
