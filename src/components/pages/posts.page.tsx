import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import PostCard from '../molecules/postCard.molecule';
import * as interfaces from '../../interfaces';
import actions from '../../actions';
import api from '../../api';
import * as constants from '../../constants';

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = typeof mapDispatchToProps;

export interface Props extends RouteComponentProps, MapStateToProps, MapDispatchToProps { }

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		scrollPosition: state.scroll.position,
		posts: state.posts.records,
		skip: state.posts.skip,
		limit: state.posts.limit,
		date: state.posts.date,
		user: state.user.value,
	};
}

const { setScrollPosition } = actions.scroll;
const { pushPosts, setSkip, toogleLike } = actions.posts;

const mapDispatchToProps = {
	setScrollPosition,
	pushPosts,
	setSkip,
	toogleLike,
};

const Posts = (props: Props) => {
	const { toogleLike, posts, user } = props;
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		try {
			if (posts.length === 0) {
				getPosts();
			}
		} catch (err) {
			console.log(err);
		}

		window.scrollTo(0, props.scrollPosition);
	}, []);

	useEffect(() => {
		return () => {
			props.setScrollPosition(scrollPosition);
		};
	});

	useScrollPosition(({ currPos }) => {
		setScrollPosition(currPos.y === 0 ? 0 : currPos.y * -1);
	});

	const getPosts = async () => {
		const data = await api.index.query<{ posts: interfaces.posts.IPost[]}>(`
			{
				posts(limit: ${props.limit}, skip: ${props.skip}, date: "${props.date}" ) {
					_id
					title
					email
					likes
					dislikes
					description
					comments
					timestamp {
						created_at
					}
				}
			}
		`);
		props.pushPosts(data.posts);
		props.setSkip(props.skip + 10);
	};

	return (
		<div className="w-100p d-flex justify-content-center">
			<div className="w-100p max-width-600">
				<Link className="text-decoration-none" to={constants.routes.posts.CREATE}>
					<Button variant="contained" className="w-100p">
						publicar post
					</Button>
				</Link>
				<InfiniteScroll
					dataLength={posts.length}
					next={getPosts}
					hasMore
					loader={<h4>Cargando...</h4>}
				>
					{
						posts.map((post) => {
							return (
								<div key={post._id} data-testid="post-item">
									<PostCard
										id={post._id}
										email={post.email}
										title={post.title}
										description={post.description}
										likes={post.likes}
										dislikes={post.dislikes}
										created_at={post.timestamp.created_at}
										onToogleLike={toogleLike}
										comments={post?.comments || 0}
										user={user}
									/>
								</div>
							);
						})
					}
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
export { Posts };
