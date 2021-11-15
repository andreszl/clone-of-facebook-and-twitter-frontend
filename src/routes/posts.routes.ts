import { PostForm, Posts, Post } from '../components/pages';
import ModalLayout from '../components/organisms/modalLayout.orgnanism';

import * as interfaces from '../interfaces';
import * as constants from '../constants';

export default [
	{
		path: `${constants.routes.posts.SHOW}/:id`,
		component: Post,
		useLayout: true,
		layout: ModalLayout,
		requireLogin: true,
	},
	{
		path: constants.routes.posts.CREATE,
		component: PostForm,
		useLayout: true,
		requireLogin: true,
	},
	{
		exact: true,
		path: constants.routes.posts.LIST,
		component: Posts,
		useLayout: true,
		requireLogin: true,
	},
] as interfaces.routes.IRoutes[];
