import postReducer from '../../reducers/posts.reducer';
import * as interfaces from '../../interfaces';
import { pushPosts, setSkip, unshiftPost } from '../../actions/posts.actions';

describe('user reducer', () => {
	const initialState: interfaces.posts.IReducer = {
		records: [],
		date: '',
		skip: 0,
		limit: 10,
	};

	it('should set posts', () => {
		const reducer = postReducer(initialState, pushPosts([
			{
				_id: 'test_id_1',
				title: 'test title 1',
				email: 'test email 1',
				description: 'test description 1',
				likes: ['test likes 1'],
				dislikes: ['test dislikes 1'],
				comments: 0,
				timestamp: {
					created_at: new Date().toString(),
					updated_at: new Date().toString(),
				},
			},
		]));
		expect(reducer.records.length).toEqual(1);
	});

	it('should set skip property', () => {
		const reducer = postReducer(initialState, setSkip(1));
		expect(reducer.skip).toEqual(1);
	});

	it('you should insert a post at the beginning of the array', () => {
		postReducer(initialState, unshiftPost(
			{
				_id: 'test_id_1',
				title: 'test title 1',
				email: 'test email 1',
				description: 'test description 1',
				likes: ['test likes 1'],
				dislikes: ['test dislikes 1'],
				comments: 0,
				timestamp: {
					created_at: new Date().toString(),
					updated_at: new Date().toString(),
				},
			},
		));

		const reducer = postReducer(initialState, unshiftPost(
			{
				_id: 'test_id_2',
				title: 'test title 2',
				email: 'test email 2',
				description: 'test description 2',
				likes: ['test likes 2'],
				dislikes: ['test dislikes 2'],
				comments: 0,
				timestamp: {
					created_at: new Date().toString(),
					updated_at: new Date().toString(),
				},
			},
		));
		expect(reducer.records.length).toEqual(2);
		expect(reducer.records[0].description).toEqual('test description 2');
	});
});
