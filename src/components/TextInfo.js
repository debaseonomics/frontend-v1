import React from 'react';

export default function TextInfo({ label, value, token, img }) {
	return (
		<nav className="level is-mobile">
			<div className="level-left">
				<div className="level-item">
					<h4 className="title is-4 ">{label}:</h4>
				</div>
			</div>
			<div className="level-right">
				<div className="level-item">
					<h4 className="subtitle is-4 is-clipped">{value}</h4>
				</div>
				<div className="level-item">
					<figure className="image is-32x32">
						<img src={img} alt="" />
					</figure>
				</div>
				<div className="level-item">
					<h4 className="subtitle is-4">{token}</h4>
				</div>
			</div>
		</nav>
	);
}
