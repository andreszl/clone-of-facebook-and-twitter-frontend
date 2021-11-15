import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import routes from './routes';
import { Layout } from './components/organisms';

import * as interfaces from './interfaces';
import Login from './components/molecules/login.molecule';

export default () => {
	return (
		<div className="bg-blue-light z-index-1001">
			<Router>
				<div>
					{
						routes.map((
							route: interfaces.routes.IRoutes,
							index,
						) => {
							const key = `${route.path}-${index}`;
							const RouteComponent = route.component;

							if (!RouteComponent) return null;

							return (
								<Route
									exact={route.exact}
									key={key}
									path={route.path}
									render={(props) => {
										let CustomLayout = Layout;

										if (route.useLayout && route.layout) {
											CustomLayout = route.layout;
										}

										if (route.useLayout) {
											return (
												<CustomLayout>
													<>
														{route.requireLogin ? (<Login />) : null}
														<RouteComponent {...props} />
													</>
												</CustomLayout>
											);
										}

										return (
											<>
												{route.requireLogin ? (<Login />) : null}
												<RouteComponent {...props} />
											</>
										);
									}}
								/>
							);
						})
					}
				</div>
			</Router>
		</div>
	);
};
