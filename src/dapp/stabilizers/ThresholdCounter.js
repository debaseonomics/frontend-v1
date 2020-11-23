import React, { Fragment, useState } from 'react';
import Pool from '../Pool';
import debase from '../../assets/debase.png';
import empty from '../../assets/empty.png';
import { useHistory } from 'react-router-dom';
import { contractAddress, etherScanAddress, turncate } from '../../utils/index';

export default function ThresholdCounter() {
	let history = useHistory();
	const contract = contractAddress.stabilizerPool;

	const [ hideStake, setHideStake ] = useState(true);

	return (
		<div className="columns is-centered">
			<div className="box column is-6">
				<div className=" has-text-centered">
					<h3 className="title is-inline is-size-4-tablet is-size-5-mobile  is-family-secondary">
						Threshold Counter
					</h3>
					<span className="delete is-pulled-right" onClick={() => history.goBack()} />
				</div>
				<h5 className="pr-1 pl-1 pt-2 subtitle is-size-5-tablet is-size-6-mobile">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada magna et est gravida
					faucibus. Aenean hendrerit dui at magna euismod.
				</h5>
				<div className="is-block">
					<span className="is-inline title is-size-5-tablet is-size-6-mobile mb-0">Contract:</span>
					<span className="is-inline subtitle is-size-5-tablet is-size-6-mobile mb-0">
						{' '}
						<a href={etherScanAddress + contract}>{turncate(contract, 18, '...')}</a>
					</span>
				</div>
				<div className="divider">Stabilizer Variables</div>
				<div className="columns is-multiline is-mobile">
					<div className="column is-4 has-text-centered ">
						<h5
							data-tooltip="Reward given to pool upon hitting count threshold"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile has-tooltip-arrow"
						>
							Reward Amount
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">10,000 Debase</h5>
					</div>
					<div className="column is-4 has-text-centered">
						<h5
							data-tooltip="Count threshold upon which reward is given to pool"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile"
						>
							Count Threshold
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">20</h5>
					</div>
					<div className="column is-4 has-text-centered">
						<h5
							data-tooltip="Count of the number of times a neutral rebase has happened"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile"
						>
							Current Count
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">2</h5>
					</div>
					<div className="column is-4 has-text-centered">
						<h5
							data-tooltip="Pool can be given reward before last reward has been given out"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile"
						>
							Before Period Finish
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile"> True</h5>
					</div>
					<div className="column is-4 has-text-centered">
						<h5
							data-tooltip="Period within which pool reward is distributed"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile"
						>
							Reward Period
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">1 week</h5>
					</div>
					<div className="column is-4 has-text-centered">
						<h5
							data-tooltip="Pool enabled to receive rewards from stabilizer fund"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile"
						>
							Pool Enabled
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">False</h5>
					</div>
				</div>
				<div className="divider">Pool Variables</div>
				<div className="columns">
					<div className="column is-4 has-text-centered">
						<h5
							data-tooltip="Pool enabled to receive rewards from stabilizer fund"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile"
						>
							Staking Enabled
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">False</h5>
					</div>
					<div className="column is-4 has-text-centered">
						<h5
							data-tooltip="Pool enabled to receive rewards from stabilizer fund"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile"
						>
							2123
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">False</h5>
					</div>
					<div className="column is-4 has-text-centered">
						<h5
							data-tooltip="Pool enabled to receive rewards from stabilizer fund"
							style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
							className="title is-size-5-tablet is-size-6-mobile"
						>
							Pool Distribution End
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">False</h5>
					</div>
				</div>
				{hideStake ? (
					<button className="button is-edged is-fullwidth is-primary" onClick={() => setHideStake(false)}>
						Stake Into Pool
					</button>
				) : (
					<Fragment>
						<div className="divider">Staking</div>
						<Pool
							showName={false}
							tokenText="Dai-lp"
							rewardText="Debase"
							poolName="Debase/Dai-lp"
							unit={18}
							rewardTokenImage={debase}
							stakeTokenImage={empty}
							tokenAddress={contractAddress.debaseDaiLp}
							rewardTokenAddress={contractAddress.debase}
							poolAddress={contractAddress.stabilizerPool}
						/>
					</Fragment>
				)}
			</div>
		</div>
	);
}
