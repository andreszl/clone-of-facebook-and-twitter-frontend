import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderResult, cleanup } from '@testing-library/react';
import { Posts, Props } from '../../components/pages/posts.page';

let component: RenderResult;

const pushPosts: any = jest.fn((posts) => {
	postProps.posts.push(...posts);
});

const postProps: Props = {
	scrollPosition: 0,
	posts: [
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
	],
	skip: 0,
	limit: 10,
	date: new Date().toString(),
	user: 'test@test.com',
	history: jest.fn() as any,
	location: jest.fn() as any,
	match: jest.fn() as any,
	setScrollPosition: jest.fn(),
	pushPosts,
	setSkip: jest.fn(),
	toogleLike: jest.fn(),
};

describe('posts card tests', () => {

	beforeEach(() => {
		component = render(
			<Router>
				<Posts
					{...postProps}
				/>,
			</Router>,
		);
	});

	it('should show all posts', async () => {
		expect(component.getAllByTestId('post-item').length).toBe(postProps.posts.length);
	});

	it('there should be a publish button', async () => {
		component.getByText('publicar post');
	});

	it('It should to increment counter likes', async () => {
		cleanup();
		postProps.pushPosts([
			{
				_id: 'test_id_3',
				title: 'test title 3',
				email: 'test email 3',
				description: 'test description 3',
				likes: ['test likes 3'],
				dislikes: ['test dislikes 3'],
				comments: 0,
				timestamp: {
					created_at: new Date().toString(),
					updated_at: new Date().toString(),
				},
			},
		]);

		const { getAllByTestId } = render(
			<Router>
				<Posts
					{...postProps}
				/>,
			</Router>,
		);

		expect(getAllByTestId('post-item').length).toBe(postProps.posts.length);
	});
});
