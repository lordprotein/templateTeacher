import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogInContainer from '../../../container/LogIn/LogInContainer';

export const Content = ({ allRoutes }) => {
	return (
		<section className="content">
			<Switch>
				<Route
					path='/authorization'
					render={
						() => <LogInContainer />
					}
				/>
				{allRoutes()}
			</Switch>
		</section>
	);
}

