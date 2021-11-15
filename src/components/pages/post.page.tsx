import _, { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Card, TextField, Typography, Button, Grid } from '@mui/material';
import moment from 'moment';

import * as interfaces from '../../interfaces';
import PostCard from '../molecules/postCard.molecule';
import api from '../../api';
import actions from '../../actions';
import repository from '../../repository';
import * as utils from '../../utils/functions.util';

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		posts: state.posts.records,
		user: state.user.value,
	};
}

const { toogleLike, updatePost } = actions.posts;

const mapDispatchToProps = {
	toogleLike,
	updatePost,
};

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = typeof mapDispatchToProps;

interface Props extends RouteComponentProps<{ id: string }>, MapStateToProps, MapDispatchToProps { }

export default connect(mapStateToProps, mapDispatchToProps)((props: Props) => {
	const { posts, match, user, toogleLike, updatePost } = props;
	const [post, setPost] = useState<interfaces.posts.IPost>();
	const [comments, setComments] = useState<interfaces.comments.IComment[]>([]);
	const [comment, setComment] = useState('');
	const [commentError, setCommentError] = useState('');

	useEffect(() => {

		repository.comments.get(match.params.id).subscribe((r) => {
			setComments(r);
		});

		if (posts.length > 0) {
			const result = _.find(posts, { _id: match.params.id });
			if (result) {
				setPost(result);
			}
		} else {
			getPost();
		}
	}, []);

	const saveComment = async () => {
		try {
			repository.comments.save({
				description: comment,
				user,
				postId: match.params.id,
			});

			const result = await api.posts.addComment<interfaces.posts.IPost>(match.params.id);
			updatePost(match.params.id, result);
			setPost(result);
		} catch (error) {
			console.log(error);
		} finally {
			setComment('');
		}
	};

	const getPost = async () => {
		const data = await api.index.query<{ post: interfaces.posts.IPost }>(`
			{
				post(id: "${match.params.id}") {
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

		setPost(data.post);
	};

	return (
		<div>
			{
				post ? (
					<PostCard
						id={post?._id || ''}
						title={post?.title || ''}
						description={post?.description || ''}
						likes={post?.likes || []}
						dislikes={post?.dislikes || []}
						created_at={post?.timestamp.created_at || ''}
						user={user || ''}
						email={post?.email || ''}
						onToogleLike={toogleLike}
						noUseLink
						comments={post?.comments || 0}
					/>
				) : (<p>Cargando...</p>)
			}
			<Card className="w-100p mt-12">
				{/* <div className="d-flex align-items-center"> */}
				<Grid container className="align-items-center">
					<Grid item lg={9} xl={9} md={9} xs={12} sm={12} className="p-12">
						<TextField
							className="w-100p bg-white"
							label="Comentario"
							placeholder="Deja un comentario"
							multiline
							value={comment}
							onChange={(e) => {
								setComment(e.target.value);
								utils.handleOnChange(
									e.target.value,
									setCommentError,
									{
										required: { value: true },
										maxLength: { value: 240 },
									},
									' ',
								);
							}}
							error={!isEmpty(commentError)}
						/>
						<span className="error">{commentError}</span>
					</Grid>
					<Grid item lg={3} xl={3} md={3} xs={12} sm={12} className="p-12">
						<Button
							className="w-100p h-50 m-0 p-0"
							variant="contained"
							color="primary"
							disabled={isEmpty(comment) || !isEmpty(commentError)}
							onClick={saveComment}
						>
							Enviar
						</Button>
					</Grid>
				</Grid>
				{
					comments.map((c) => {
						return (
							<div key={c._id} className="p-12">
								<div className="w-100p chip mt-12">
									<div className="p-12">
										<Typography sx={{ fontSize: 12 }} fontStyle="normal" color="white" gutterBottom>
											<b>{`Por ${c.user} ${moment(c.created_at.toDate()).locale('es').fromNow()}`}</b>
										</Typography>
										<Typography sx={{ fontSize: 14 }} fontStyle="normal" color="white" gutterBottom>
											{c.description}
										</Typography>
									</div>
								</div>
							</div>
						);
					})
				}
			</Card>
		</div>
	);
});
