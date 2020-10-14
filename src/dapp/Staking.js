import React from 'react';
import StakeCard from '../components/StakeCard';
import { contractAddress, etherScanAddress } from '../utils';

export default function Staking() {
	return (
		<div className="container block is-fluid">
			<div className="columns is-multiline is-centered">
				<div className="column is-10">
					<div className="columns is-vcentered">
						<div className="column">
							<StakeCard
								title="Debase/DAI Pool"
								link="debase-dai"
								contract={contractAddress.debaseDaiPool}
								contractLink={etherScanAddress + contractAddress.debaseDaiPool}
								website="uniswap.info"
								websiteLink={uniAddress['debase-DAI-POOL']}
								supply="25,000 DEBASE"
								initial="12,500 DEBASE"
								infoText="Seeds initial supply of debase"
								warningText="Max deposit of 10,000 DAI/account for the first 24 hours"
								duration="1 day"
							/>
						</div>
						<div className="column">
							<StakeCard
								title="Debase/DAI-LP Pool"
								link="debase-dai-lp"
								contract={contractAddress.debaseDaiLpPool}
								contractLink={etherScanAddress + contractAddress.debaseDaiLpPool}
								website="uniswap.info"
								websiteLink={uniAddress['debase-DAI-LP-POOL']}
								supply="75,000 DEBASE"
								initial="37,500 DEBASE"
								infoText="Incentives debase liquidity"
								duration="3 days"
							/>
						</div>
					</div>
				</div>
				<div className="column is-10">
					<div className="columns is-vcentered">
						<div className="column">
							<StakeCard
								title="Degov/USDC Pool"
								link="degov-usdc"
								contract={contractAddress.degovUsdcPool}
								contractLink={etherScanAddress + contractAddress.degovUsdcPool}
								website="uniswap.info"
								websiteLink="https://app.uniswap.org/#/usdc"
								supply="6,250 DEGOV"
								initial="3,125 DEGOV"
								infoText="Seeds initial supply of degov"
								warningText="Staking only available after debase starts rebasing"
								warningText2="Max deposit of 5,000 USDC/account for the first 48 hours"
								duration="2 days"
							/>
						</div>
						<div className="column">
							<StakeCard
								title="Degov/USDC-LP Pool"
								link="degov-usdc-lp"
								contract={contractAddress.degovUsdcLpPool}
								contractLink={etherScanAddress + contractAddress.degovUsdcLpPool}
								website="uniswap.info"
								websiteLink="https://app.uniswap.org/#/usdc"
								supply="18,750 DEGOV"
								initial="9,375 DEGOV"
								infoText="Incentives degov liquidity"
								warningText="Staking only available after debase starts rebasing"
								duration="4 days"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
