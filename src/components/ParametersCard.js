import React from 'react';

export default function ParametersCard({ heading, value }) {
	return (
		<div className="column is-3-tablet">
			<div className="box ">
				<h6 className="title is-6 is-family-secondary">{heading}</h6>
				<h6 className="subtitle is-6">{value}</h6>
			</div>
		</div>
	);
}
