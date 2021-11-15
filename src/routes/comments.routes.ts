import { CommentForm } from '../components/pages';

import * as interfaces from '../interfaces';
import * as constants from '../constants';

export default [
	{
		path: `${constants.routes.comments.CREATE}/:id`,
		component: CommentForm,
		useLayout: true,
	},
] as interfaces.routes.IRoutes[];
