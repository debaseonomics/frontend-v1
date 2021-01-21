import React from 'react';
import StakeCard from '../components/StakeCard';
import { contractAddress, etherScanAddress, uniAddress } from '../utils';

/* import token logos */
import degov from '../assets/degov.png';
import debase from '../assets/debase.png';

export default function Staking() {
	return (
		<div className="columns stakecards is-multiline is-vcentered">
			<div className="column inactive is-12">
				<StakeCard
					title="Pools"
					supply="Total Reward"
					infoText="Seeds initial supply of degov"
					duration="Halving period"
					enabled={true}
					tvlProp="TVL"
					apy="APY"
				/>
			</div>
			<div className="column is-12">
				<StakeCard
					title="Pool 1"
					subtitle="Debase/Dai-lp"
					link="degov-dai-lp"
					tokenTag={degov}
					rewardToken={contractAddress.degov}
					contract={contractAddress.degovDaiLpPool}
					contractLink={etherScanAddress + contractAddress.degovDaiLpPool}
					website="info.uniswap"
					websiteLink="https://info.uniswap.org/pair/0xE98f89a2B3AeCDBE2118202826478Eb02434459A"
					supply="25,000"
					initial="12,500"
					infoText="Seeds initial supply of degov"
					duration="1 week"
					enabled={true}
					battery={<div className="part" style={{ animationName: 'highBattery' }} />}
					button="Stake"
					tvl="894241"
					apy="80%"
				/>
			</div>
			<div className="column is-12">
				<StakeCard
					title="Pool 2"
					subtitle="Dai"
					link="debase-dai"
					tokenTag={debase}
					rewardToken={contractAddress.debase}
					debaseDaiLp={contractAddress.debaseDaiLp}
					contract={contractAddress.debaseDaiPool}
					contractLink={etherScanAddress + contractAddress.debaseDaiPool}
					website="app.uniswap"
					websiteLink="https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=ETH"
					supply="10,000"
					initial="5,000"
					infoText="Seeds initial supply of debase"
					duration="1 day"
					enabled={true}
					battery={<div className="part" style={{ animationName: 'lowBattery' }} />}
					button="Withdraw"
					tvl="0"
					apy="0%"
				/>
			</div>
			<div className="column is-12">
				<StakeCard
					title="Pool 3"
					subtitle="Debase/Dai-lp"
					link="debase-dai-lp"
					tokenTag={debase}
					rewardToken={contractAddress.debase}
					debaseDaiLp={contractAddress.debaseDaiLp}
					contract={contractAddress.debaseDaiLpPool}
					contractLink={etherScanAddress + contractAddress.debaseDaiLpPool}
					website="info.uniswap"
					websiteLink={uniAddress['debase-DAI-POOL']}
					supply="20,000"
					initial="12,500"
					infoText="Incentivizes debase liquidity"
					duration="1 days"
					enabled={true}
					battery={<div className="part" style={{ animationName: 'lowBattery' }} />}
					button="Withdraw"
					tvl="0"
					apy="0%"
				/>
			</div>
		</div>
	);
}
