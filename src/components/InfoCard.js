import React from 'react';

export default function InfoCard({ name, info, link }) {
	return (
		<div className="column is-3-tablet is-half-mobile has-text-left-tablet has-text-centered-mobile ">
			<div className="box">
				<h6 className="title is-5">
					<a href={link}>{name}</a>
				</h6>
				<h6 className="subtitle is-6">{info}</h6>
			</div>
		</div>
	);
}
