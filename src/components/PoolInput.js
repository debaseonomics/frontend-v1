import { formatEther } from 'ethers/lib/utils';
import React, { useState } from 'react';

const PoolInput = React.forwardRef(({ placeholderText, balance }, ref) => {
	const [ value, setValue ] = useState('');

	return (
		<div className="field has-addons">
			<div className="control is-expanded">
				<input
					ref={ref}
					className="input"
					type="text"
					value={value}
					placeholder={placeholderText}
					onChange={(event) => setValue(event.target.value)}
				/>
			</div>
			<div className="control">
				<button className="button is-warning" onClick={() => setValue(formatEther(balance))}>
					Max
				</button>
			</div>
		</div>
	);
});

export default PoolInput;
