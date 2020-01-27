import React from 'react';

export const Content = ({ allRoutes }) => {
	return (
		<section className="content">
			{allRoutes()}
		</section>
	);
}

