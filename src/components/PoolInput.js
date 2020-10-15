import { formatUnits } from 'ethers/lib/utils';
import React, { useState } from 'react';

const PoolInput = React.forwardRef(({ placeholderText, balance, unit }, ref) => {
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
				<button className="button is-warning" onClick={() => setValue(formatUnits(balance, unit))}>
					Max
				</button>
			</div>
		</div>
	);
});

export default PoolInput;
