import { formatUnits } from 'ethers/lib/utils';
import React, { Fragment, useState } from 'react';

const PoolInput = React.forwardRef(
	({ placeholderText, balance, unit, loading, action, buttonText, noMax, setSelectedDepositIndex }, ref) => {
		const [ value, setValue ] = useState('');

		return (
			<Fragment>
				<div className="field has-addons">
					<div className="control is-expanded">
						{noMax ? (
							<input
								ref={ref}
								className="input"
								type="text"
								value={value}
								placeholder={placeholderText}
								onChange={(event) => setSelectedDepositIndex(event.target.value)}
							/>
						) : (
							<input
								ref={ref}
								className="input"
								type="text"
								value={value}
								placeholder={placeholderText}
								onChange={(event) => setValue(event.target.value)}
							/>
						)}
						onChange={(event) => setValue(event.target.value)}
						/>
					</div>
					{noMax ? null : (
						<div className="control">
							<button className="button is-warning" onClick={() => setValue(formatUnits(balance, unit))}>
								Max
							</button>
						</div>
					)}
				</div>
				<div
					className={
						loading ? (
							'button is-loading is-primary is-fullwidth is-edged'
						) : (
							'button is-primary is-fullwidth is-edged'
						)
					}
					onClick={action}
				>
					{buttonText}
				</div>
			</Fragment>
		);
	}
);

export default PoolInput;
