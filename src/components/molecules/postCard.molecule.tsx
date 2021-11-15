import * as React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { ThumbUp, ThumbDown, QuestionAnswer } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import * as constants from '../../constants';
import { toogleLike } from '../../actions/posts.actions';

export interface Props {
	id: string,
	title: string,
	description: string,
	likes: string[],
	dislikes: string[],
	created_at: string,
	user: string,
	email: string,
	onToogleLike: typeof toogleLike|undefined,
	noUseLink?: boolean;
	comments: number;
}

moment.locale('es');

const CardBody = ({ email, created_at, title, description }: {
	email: string, created_at: string, title: string, description: string
}) => {
	return (
		<CardContent>
			<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
				{`Por ${email} ${moment(created_at).locale('es').fromNow()}`}
			</Typography>
			<Typography gutterBottom variant="h5" component="div">
				{title}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{description}
			</Typography>
		</CardContent>
	);
};

export default (props: Props) => {
	const { title, description, created_at, id,
		onToogleLike, user, email, noUseLink, comments } = props;

	const [likes, setLikes] = React.useState<string[]>([]);
	const [dislikes, setDislikes] = React.useState<string[]>([]);

	React.useEffect(() => {
		setLikes(props.likes);
		setDislikes(props.dislikes);
	}, []);

	return (
		<Card className="w-100p mt-12">
			{
				noUseLink && noUseLink === true ? (
					<CardBody
						email={email}
						created_at={created_at}
						title={title}
						description={description}
					/>
				) : (
					<Link data-testid="link-to-post-detail" className="text-decoration-none text-black" to={`${constants.routes.posts.SHOW}/${id}`}>
						<CardBody
							email={email}
							created_at={created_at}
							title={title}
							description={description}
						/>
					</Link>
				)
			}
			<CardActions className="d-flex align-items-center justify-content-between">
				<div>
					<Button
						data-testid="number-of-likes"
						onClick={async () => {
							if (onToogleLike) {
								const result = await onToogleLike(id, 'like');
								setLikes(result.likes);
								setDislikes(result.dislikes);
							}
						}}
						size="small"
						color={`${likes.find((l) => user === l) ? 'success' : 'primary'}`}
					>
						{likes.length}<ThumbUp className="ml-4" color={`${likes.find((l) => user === l) ? 'success' : 'primary'}`} />
					</Button>
					<Button
						data-testid="number-of-dislikes"
						onClick={async () => {
							if (onToogleLike) {
								const result = await onToogleLike(id, 'dislike');
								setDislikes(result.dislikes);
								setLikes(result.likes);
							}
						}}
						size="small"
						color={`${dislikes.find((l) => user === l) ? 'warning' : 'primary'}`}
					>
						{dislikes.length}<ThumbDown className="ml-4" color={`${dislikes.find((l) => user === l) ? 'warning' : 'primary'}`} />
					</Button>
					{
						noUseLink && noUseLink === true ? (
							<Button data-testid="number-of-comments" size="small" color="inherit">
								{comments} <QuestionAnswer className="ml-4" color="action" />
							</Button>
						) : (
							<Link className="text-decoration-none text-black" to={`${constants.routes.posts.SHOW}/${id}`}>
								<Button data-testid="number-of-comments" size="small" color="inherit">
									{comments} <QuestionAnswer className="ml-4" color="action" />
								</Button>
							</Link>
						)
					}
				</div>
				{
					noUseLink && noUseLink === true ? null : (
						<Link className="text-decoration-none" to={`${constants.routes.comments.CREATE}/${id}`}>
							<Button variant="contained" size="small" color="primary">
								Comentar
							</Button>
						</Link>
					)
				}
			</CardActions>
		</Card>
	);
};
