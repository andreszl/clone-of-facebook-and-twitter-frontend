import * as interfaces from '../interfaces';
import postsRoutes from './posts.routes';
import commentsRoutes from './comments.routes';

export default [
	...commentsRoutes,
	...postsRoutes,
] as interfaces.routes.IRoutes[];
