import userReducer, {
	IUser,
	setCurrentUser,
} from './userSlice';

describe('user reducer', () => {
	const initialState: IUser = {
		value: '',
	};
	it('should handle initial state', () => {
		expect(userReducer(undefined, { type: 'unknown' })).toEqual({
			value: '',
		});
	});

	it('should set user', () => {
		const actual = userReducer(initialState, setCurrentUser('andreszl.devcode@gmail.com'));
		expect(actual.value).toEqual('andreszl.devcode@gmail.com');
	});
});
