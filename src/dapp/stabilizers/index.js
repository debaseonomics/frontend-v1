import React from 'react';
import { Link } from 'react-router-dom';

export default function Stabilizers() {
	const data = [
		{
			name: 'Lorem Ipsum',
			type: 'Ipsum',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur enim sit amet justo elementum convallis a a tortor. Nam non congue dolor, at accumsan dui.'
		},
		{
			name: 'Lorem Ipsum',
			type: 'Amet',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur enim sit amet justo elementum convallis a a tortor. Nam non congue dolor, at accumsan dui.'
		},
		{
			name: 'Lorem Ipsum',
			type: 'Lorem',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur enim sit amet justo elementum convallis a a tortor. Nam non congue dolor, at accumsan dui.'
		},
		{
			name: 'Lorem Ipsum',
			type: 'Lorem',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur enim sit amet justo elementum convallis a a tortor. Nam non congue dolor, at accumsan dui.'
		}
	];

	return (
		<div className="columns is-multiline is-vcentered">
			{data.map((ele, index) => (
				<div key={index} className="column is-4">
					<div className="block box">
						<h3 className="title is-size-4-tablet is-size-5-mobile has-text-centered is-family-secondary">
							{ele.name}
						</h3>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile has-text-centered">{ele.type}</h5>
						<div className="content">
							<p>{ele.description}</p>
						</div>
						<div className="block">
							<Link to={'dapp/stabilizers/' + index}>
								<button className="button is-edged is-fullwidth is-primary">Access</button>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
