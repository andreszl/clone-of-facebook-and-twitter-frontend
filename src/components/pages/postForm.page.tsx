import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, RouteComponentProps } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import * as constants from '../../constants';
import * as utils from '../../utils/functions.util';
import api from '../../api';
import * as interfaces from '../../interfaces';
import actions from '../../actions';

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		user: state.user.value,
	};
}
const { unshiftPost } = actions.posts;

const mapDispatchToProps = {
	unshiftPost,
};

type MapDispatchToProps = typeof mapDispatchToProps;
type MapStateToProps = ReturnType<typeof mapStateToProps>;

interface Props extends RouteComponentProps, MapDispatchToProps, MapStateToProps { }

export default connect(mapStateToProps, mapDispatchToProps)((props: Props) => {
	const { unshiftPost, history, user } = props;
	const [titleError, setTitleError] = useState('');
	const [title, setTitle] = useState('');
	const [descriptionError, setDescriptionError] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const save = async () => {
		try {
			const post = await api.posts.store<interfaces.posts.IPost>({
				title,
				email: user,
				description,
			});

			unshiftPost(post);
			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-100p h-100p d-flex justify-content-center vh-100">
			<div className="h-100p w-100p max-width-600">

				<h2>Crear publicación</h2>
				<div className="w-100p mt-12">
					<TextField
						className="w-100p mt-12 bg-white"
						label="Titulo"
						placeholder="Titulo"
						onChange={(e) => {
							setTitle(e.target.value);
							utils.handleOnChange(
								e.target.value,
								setTitleError,
								{
									required: { value: true },
									minLength: { value: 3 },
								},
								'titulo',
							);
						}}
						error={!isEmpty(titleError)}
					/>
					<span className="error">{titleError}</span>
					<TextField
						className="w-100p mt-12 bg-white"
						label="Descripcion"
						placeholder="descripcion"
						multiline
						minRows={4}
						onChange={(e) => {
							setDescription(e.target.value);
							utils.handleOnChange(
								e.target.value,
								setDescriptionError,
								{
									required: { value: true },
									minLength: { value: 3 },
								},
								'descripcion',
							);
						}}
						error={!isEmpty(descriptionError)}
					/>
					<span className="error">{descriptionError}</span>
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
						disabled={
							(isEmpty(title) && isEmpty(description))
							|| !isEmpty(titleError) || !isEmpty(descriptionError)
						}
						onClick={save}
					>
						Publicar
					</Button>
				</div>
			</div>
		</div>
	);
});
