import React from 'react';

export default function ParametersCard({ heading, value }) {
	return (
		<div className="column is-3-tablet is-half-mobile has-text-left-tablet has-text-centered-mobile">
			<div className="box ">
				<h6 className="title is-6">{heading}</h6>
				<h6 className="subtitle is-6">{value}</h6>
			</div>
		</div>
	);
}
