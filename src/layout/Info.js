import React from 'react';
import Valley from '../assets/Valley.svg';

export default function Layout({ children }) {
	return (
		<div
			className="hero is-fullheight"
			style={{
				backgroundImage: `url(${Valley})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundAttachment: 'fixed'
			}}
		>
			<div class="">{children}</div>
		</div>
	);
}
