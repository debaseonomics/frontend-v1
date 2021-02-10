import { formatUnits } from 'ethers/lib/utils';
import React, { Fragment, useState } from 'react';

const PoolInput = React.forwardRef(
	(
		{
			placeholderText,
			balance,
			unit,
			loading,
			action,
			buttonText,
			showDepositReward,
			couponBalance,
			couponIssued,
			rewardAccrued,
			debaseSupply,
			currentBalance
		},
		ref
	) => {
		const [ value, setValue ] = useState('');

		return (
			<Fragment>
				{showDepositReward ? (
					<div>
						Potential Total Deposit Reward :{' '}
						{value === '' ? (
							0
						) : (
							parseFloat(
								debaseSupply *
									rewardAccrued *
									((parseFloat(value) + couponBalance) / (parseFloat(value) + couponIssued))
							).toFixed(4) *
								1 -
							currentBalance +
							' Debase'
						)}
					</div>
				) : null}
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
