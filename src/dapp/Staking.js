import React from 'react';
import StakeCard from '../components/StakeCard';
import { contractAddress, etherScanAddress, uniAddress } from '../utils';

export default function Staking() {
	return (
		<div className="columns is-multiline is-vcentered">

			<div className="column is-4-desktop is-12-tablet ">
				<StakeCard
					title="Debase/Dai-lp Pool"
					link="degov-dai-lp"
					tokenTag=" Degov"
					rewardToken={contractAddress.degov}
					contract={contractAddress.degovDaiLpPool}
					contractLink={etherScanAddress + contractAddress.degovDaiLpPool}
					website="info.uniswap"
					websiteLink="https://info.uniswap.org/pair/0xE98f89a2B3AeCDBE2118202826478Eb02434459A"
					supply="25,000 Degov"
					initial="12,500 Degov"
					infoText="Seeds initial supply of degov"
					duration="1 week"
					enabled={true}
					battery={<div className='part' style={{ animationName: 'highBattery' }}></div>}
					button="Stake"
				/>
			</div>
			<div className="inactive column is-4-desktop is-12-tablet ">
				<StakeCard
					title="Dai Pool"
					link="debase-dai"
					tokenTag=" Debase"
					rewardToken={contractAddress.debase}
					debaseDaiLp={contractAddress.debaseDaiLp}
					contract={contractAddress.debaseDaiPool}
					contractLink={etherScanAddress + contractAddress.debaseDaiPool}
					website="app.uniswap"
					websiteLink="https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=ETH"
					supply="10,000 Debase"
					initial="5,000 Debase"
					infoText="Seeds initial supply of debase"
					duration="1 day"
					enabled={true}
					battery={<div className='part' style={{ animationName: 'lowBattery' }}></div>}
					button="Withdraw"
				/>
			</div>
			<div className="inactive column is-4-desktop is-12-tablet ">
				<StakeCard
					title="Debase/Dai-lp Pool"
					link="debase-dai-lp"
					tokenTag=" Debase"
					rewardToken={contractAddress.debase}
					debaseDaiLp={contractAddress.debaseDaiLp}
					contract={contractAddress.debaseDaiLpPool}
					contractLink={etherScanAddress + contractAddress.debaseDaiLpPool}
					website="info.uniswap"
					websiteLink={uniAddress['debase-DAI-POOL']}
					supply="20,000 Debase"
					initial="12,500 Debase"
					infoText="Incentivizes debase liquidity"
					duration="1 days"
					enabled={true}
					battery={<div className='part' style={{ animationName: 'lowBattery' }}></div>}
					button="Withdraw"
				/>
			</div>
		</div>
	);
}
