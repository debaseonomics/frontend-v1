import React from 'react';
import StakeCard from '../components/StakeCard';
import { contractAddress, etherScanAddress, uniAddress } from '../utils';

export default function Staking() {
	return (
		<div className="container block is-fluid">
			<div className="columns is-multiline is-vcentered">
				<div className="column is-4">
					<StakeCard
						title="Debase/Dai Pool"
						link="debase-dai"
						contract={contractAddress.debaseDaiPool}
						contractLink={etherScanAddress + contractAddress.debaseDaiPool}
						website="uniswap.info"
						websiteLink={uniAddress['debase-DAI-POOL']}
						supply="25,000 Debase"
						initial="12,500 Debase"
						infoText="Seeds initial supply of debase"
						warningText="Max deposit of 10,000 DAI/account for the first 24 hours"
						duration="1 day"
					/>
				</div>
				<div className="column is-4">
					<StakeCard
						title="Debase/Dai-Lp Pool"
						link="debase-dai-lp"
						contract={contractAddress.debaseDaiLpPool}
						contractLink={etherScanAddress + contractAddress.debaseDaiLpPool}
						website="uniswap.info"
						websiteLink={uniAddress['debase-DAI-LP-POOL']}
						supply="75,000 Debase"
						initial="37,500 Debase"
						infoText="Incentives debase liquidity"
						duration="3 days"
					/>
				</div>
				<div className="column is-4">
					<StakeCard
						title="Degov/Dai-Lp Pool"
						link="degov-dai-lp"
						contract={contractAddress.degovDaiLpPool}
						contractLink={etherScanAddress + contractAddress.degovDaiLpPool}
						website="uniswap.info"
						websiteLink="https://app.uniswap.org/#/Debase"
						supply="6,250 Degov"
						initial="3,125 Degov"
						infoText="Seeds initial supply of degov"
						warningText="Staking only available after debase starts rebasing"
						duration="2 days"
					/>
				</div>
			</div>
		</div>
	);
}
