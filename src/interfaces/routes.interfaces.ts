import { RouteProps } from 'react-router';

export namespace routes {
	export interface IRoutes extends RouteProps {
		useLayout?: boolean,
		layout?: any,
		requireLogin?: boolean,
	}
}
