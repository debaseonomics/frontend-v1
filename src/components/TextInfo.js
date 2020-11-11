import React from 'react';

export default function TextInfo({ label, value, token, img }) {
	return (
		<tr>
			<th>
				<span className="subtitle is-size-5-tablet is-size-6-mobile">{label}</span>
			</th>
			<td>
				<nav className="level is-mobile">
					<div className="level-left">
						<div />
					</div>
					<div className="level-right">
						<div className="level-item">
							<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{value}</h5>
						</div>
						<div className="level-item">
							<figure className="image is-24x24 is-inline-block">
								<img src={img} alt="" />
							</figure>
						</div>
						<div className="level-item">
							<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{token}</h5>
						</div>
					</div>
				</nav>
			</td>
		</tr>
	);
}
