import React from 'react';

export default function InfoCard({ name, info, link }) {
	return (
		<div className="column is-3-tablet has-text-left-tablet has-text-centered-mobile ">
			<div className="box">
				<h6 className="title is-6 is-family-secondary">
					<a href={link}>{name}</a>
				</h6>
				<h6 className="subtitle is-6">{info}</h6>
			</div>
		</div>
	);
}
