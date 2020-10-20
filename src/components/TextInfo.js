import React from 'react';

export default function TextInfo({ label, value, token, img }) {
	return (
		<nav className="level is-mobile">
			<div className="level-left">
				<div className="level-item">
					<h4 className="title is-size-4-tablet is-size-5-mobile ">{label}:</h4>
				</div>
			</div>
			<div className="level-right">
				<div className="level-item">
					<h4 className="subtitle is-size-4-tablet is-size-5-mobile is-clipped">{value}</h4>
				</div>
				<div className="level-item">
					<figure className="image is-32x32">
						<img src={img} alt="" />
					</figure>
				</div>
				<div className="level-item">
					<h4 className="subtitle is-size-4-tablet is-size-5-mobile">{token}</h4>
				</div>
			</div>
		</nav>
	);
}
