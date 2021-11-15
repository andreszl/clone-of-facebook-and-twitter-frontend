import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react';
import PostCard, { Props } from '../../components/molecules/postCard.molecule';

let component: RenderResult;

const onToogleLike: any = jest.fn(() => {
	postCardProps.likes = ['test like', 'test like 2'];
	postCardProps.dislikes = ['test dislike', 'test dislike 2'];
});

const postCardProps: Props = {
	id: 'test_id',
	title: 'test title',
	description: 'test description',
	likes: ['test like'],
	dislikes: ['test dislike'],
	created_at: new Date().toString(),
	user: 'test user',
	email: 'test@test.com',
	onToogleLike,
	comments: 0,
};

describe('posts card tests', () => {

	beforeEach(() => {
		component = render(
			<Router>
				<PostCard
					{...postCardProps}
				/>,
			</Router>,
		);
	});

	afterEach(cleanup);

	it('it should show the post title', async () => {
		component.getByText('test title');
	});

	it('it should show the post description', async () => {
		component.getByText('test description');
	});

	it('it should show the post email', async () => {
		component.getByText(/test@test.com/);
	});

	it('it should show the comment number of the post', async () => {
		expect(component.getByTestId('number-of-comments')).toHaveTextContent(postCardProps.comments.toString());
	});

	it('it should show the likes number of the post', async () => {
		expect(component.getByTestId('number-of-likes')).toHaveTextContent(postCardProps.likes.length.toString());
	});

	it('it should show the dislikes number of the post', async () => {
		expect(component.getByTestId('number-of-dislikes')).toHaveTextContent(postCardProps.dislikes.length.toString());
	});

	it('It should show a link to go to the detail of the post by default', async () => {
		expect(component.getByTestId('link-to-post-detail')).toBeInTheDocument();
	});

	it('It should to increment counter likes', async () => {
		const buttonLike = component.getByTestId('number-of-likes');
		const resultEvent = fireEvent.click(buttonLike);
		expect(resultEvent).toBe(true);
		expect(onToogleLike).toHaveBeenCalledTimes(1);

		const { getAllByTestId } = render(
			<Router>
				<PostCard
					{...postCardProps}
				/>,
			</Router>,
		);

		expect(getAllByTestId('number-of-likes')[1]).toHaveTextContent(postCardProps.likes.length.toString());
	});

	it('It should to increment counter dislikes', async () => {
		const buttonLike = component.getByTestId('number-of-dislikes');
		const resultEvent = fireEvent.click(buttonLike);
		expect(resultEvent).toBe(true);
		expect(onToogleLike).toHaveBeenCalledTimes(1);

		const { getAllByTestId } = render(
			<Router>
				<PostCard
					{...postCardProps}
				/>,
			</Router>,
		);

		expect(getAllByTestId('number-of-dislikes')[1]).toHaveTextContent(postCardProps.dislikes.length.toString());
	});
});
