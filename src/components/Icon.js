import React from 'react';

export default function Icon({ iconName }) {
	return (
		<p className="control">
			<span className="icon">
				<i className={iconName} />
			</span>
		</p>
	);
}
