import React from 'react';
import StakeCard from '../components/StakeCard';
import { contractAddress, etherScanAddress, uniAddress } from '../utils';

export default function Staking() {
	return (
		<div className="container block is-fluid">
			<div className="columns is-multiline is-vcentered">
				<div className="column is-4 ">
					<StakeCard
						title="Debase/YCurve Pool"
						link="debase-yCurve"
						contract={contractAddress.debaseYCurvePool}
						contractLink={etherScanAddress + contractAddress.debaseYCurvePool}
						website="curve.fi/iearn"
						websiteLink="https://www.curve.fi/iearn/deposit"
						supply="25,000 DEBASE"
						initial="12,500 DEBASE"
						infoText="Seeds initial supply of debase"
						warningText="Max deposit of 10,000 yCurve/account for first 24 hours"
						duration="1 day"
					/>
				</div>
				<div className="column is-4">
					<StakeCard
						title="Debase/USDC-LP Pool"
						link="debase-usdc"
						contract={contractAddress.debaseUSDCPool}
						contractLink={etherScanAddress + contractAddress.debaseUSDCPool}
						website="uniswap.info"
						websiteLink={uniAddress['debase-USDC-POOL']}
						supply="75,000 DEBASE"
						initial="37,500 DEBASE"
						infoText="Incentives debase liquidity"
						duration="3 days"
					/>
				</div>
				<div className="column is-4">
					<StakeCard
						title="Degov/UNI Pool"
						link="degov-uni"
						contract={contractAddress.degovUNIPool}
						contractLink={etherScanAddress + contractAddress.degovUNIPool}
						website="uniswap.info"
						websiteLink={uniAddress['degov-UNI-POOL']}
						supply="25,000 DEGOV"
						initial="12,500 DEGOV"
						infoText="Seeds initial supply of degov"
						warningText="Staking only available after debase starts rebasing"
						warningText2="Max deposit of 5,000 yCurve/account for first 48 hours"
						duration="4 days"
					/>
				</div>
			</div>
		</div>
	);
}
