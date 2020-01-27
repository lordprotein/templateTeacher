import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthorizationContainer from '../../../container/Authorization/AuthorizationContainer';

export const Content = ({ allRoutes }) => {
	return (
		<section className="content">
			<Switch>
				<Route
					path='/authorization'
					render={
						() => <AuthorizationContainer />
					}
				/>
				{allRoutes()}
			</Switch>
		</section>
	);
}

