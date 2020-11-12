import React from 'react';
import StakeCard from '../components/StakeCard';
import { contractAddress, etherScanAddress, uniAddress } from '../utils';

export default function Staking() {
	return (
		<div className=" block">
			<div className="columns is-multiline is-vcentered">
				<div className="column is-4">
					<StakeCard
						title="Debase/Dai Pool"
						link="debase-dai"
						tokenTag=" Debase"
						rewardToken={contractAddress.debase}
						debaseDaiLp={contractAddress.debaseDaiLp}
						contract={contractAddress.debaseDaiPool}
						contractLink={etherScanAddress + contractAddress.debaseDaiPool}
						website="unisawp.com"
						websiteLink="https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=ETH"
						supply="10,000 Debase"
						initial="5,000 Debase"
						infoText="Seeds initial supply of debase"
						duration="1 day"
						enabled={true}
					/>
				</div>
				<div className="column is-4">
					<StakeCard
						title="Debase/Dai-lp Pool"
						link="debase-dai-lp"
						tokenTag=" Debase"
						rewardToken={contractAddress.debase}
						debaseDaiLp={contractAddress.debaseDaiLp}
						contract={contractAddress.debaseDaiLpPool}
						contractLink={etherScanAddress + contractAddress.debaseDaiLpPool}
						website="uniswap.com"
						websiteLink={uniAddress['debase-DAI-POOL']}
						supply="25,000 Debase"
						initial="12,500 Debase"
						infoText="Incentives debase liquidity"
						duration="1 days"
						enabled={true}
					/>
				</div>
				<div className="column is-4">
					<StakeCard
						title="Degov/Dai-lp Pool"
						link="degov-dai-lp"
						tokenTag=" Degov"
						rewardToken={contractAddress.degov}
						contract={contractAddress.degovDaiLpPool}
						contractLink={etherScanAddress + contractAddress.degovDaiLpPool}
						website="Will launch after rebase"
						websiteLink="#"
						supply="25,000 Degov"
						initial="12,500 Degov"
						infoText="Seeds initial supply of degov"
						warningText="Staking only available after debase starts rebasing"
						duration="1 week"
						enabled={false}
					/>
				</div>
			</div>
		</div>
	);
}
