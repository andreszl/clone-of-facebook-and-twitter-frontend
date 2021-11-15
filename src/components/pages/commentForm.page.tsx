import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, RouteComponentProps } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import * as constants from '../../constants';
import * as utils from '../../utils/functions.util';
import * as interfaces from '../../interfaces';
import actions from '../../actions';
import repository from '../../repository';
import api from '../../api';

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		user: state.user.value,
	};
}

const { unshiftPost, updatePost } = actions.posts;

const mapDispatchToProps = {
	unshiftPost,
	updatePost,
};

type MapDispatchToProps = typeof mapDispatchToProps;
type MapStateToProps = ReturnType<typeof mapStateToProps>;

interface Props extends RouteComponentProps<{ id: string }>, MapDispatchToProps, MapStateToProps { }

export default connect(mapStateToProps, mapDispatchToProps)((props: Props) => {
	const { history, match, user, updatePost } = props;
	const [commentError, setCommentError] = useState('');
	const [comment, setComment] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const save = async () => {
		try {
			repository.comments.save({
				user,
				description: comment,
				postId: match.params.id,
			});

			const result = await api.posts.addComment<interfaces.posts.IPost>(match.params.id);
			updatePost(match.params.id, result);

			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-100p h-100p d-flex justify-content-center vh-100">
			<div className="h-100p w-100p max-width-600">

				<h2>Crear comentario</h2>
				<div className="w-100p mt-12">
					<TextField
						className="w-100p mt-12 bg-white"
						label="Comentario"
						placeholder="Deja tu comentario"
						multiline
						minRows={4}
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
				</div>
				<div className="d-flex justify-content-end align-items-center mt-12">
					<Link
						className="text-decoration-none"
						to={constants.routes.posts.LIST}
					>
						<Button className="" variant="contained">
							Cancelar
						</Button>
					</Link>
					<Button
						className="ml-4"
						variant="contained"
						disabled={isEmpty(comment) || !isEmpty(commentError)}
						onClick={save}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
});
