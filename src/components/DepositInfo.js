import React, { useEffect, Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { lpAbi, fetcher, mph88Abi } from '../utils/index';
import useSWR from 'swr';
import { DateTime } from 'luxon';
import { formatEther, parseEther } from 'ethers/lib/utils';
import TextInfo from './TextInfo.js';

export default function DepositInfo({
	rewardTokenAddress,
	poolAddress,
	rewardText,
	rewardTokenImage,
	deposit,
	isMobile,
	dai,
	mph88
}) {
	const { library } = useWeb3React();

	const { data: debaseSupply, mutate: getDebaseSupply } = useSWR([ rewardTokenAddress, 'totalSupply' ], {
		fetcher: fetcher(library, lpAbi)
	});

	const { data: debaseAccrued, mutate: getDebaseAccrued } = useSWR([ poolAddress, 'earned', deposit.id ], {
		fetcher: fetcher(library, mph88Abi)
	});

	useEffect(
		() => {
			library.on('block', () => {
				getDebaseSupply(undefined, true);
				getDebaseAccrued(undefined, true);
			});
			return () => {
				library.removeAllListeners('block');
			};
		},
		[ library, getDebaseSupply, getDebaseAccrued ]
	);

	return (
		<Fragment>
			<TextInfo
				isMobile={isMobile}
				label="Deposit unlocks in"
				value={DateTime.fromSeconds(deposit.maturationTimestamp.toNumber()).toRelative({ round: false })}
				token={rewardText}
				isTime={true}
				img={rewardTokenImage}
			/>
			<TextInfo
				isMobile={isMobile}
				label="Deposit Lp Staked"
				value={formatEther(deposit.amount)}
				token="Debase/Dai Lp"
				img={rewardTokenImage}
			/>

			<TextInfo
				isMobile={isMobile}
				label="Dai Unlocked From Lp"
				value={parseFloat(formatEther(deposit.daiAmount)).toFixed(4)}
				token="Dai"
				img={dai}
			/>

			{/* <TextInfo
				isMobile={isMobile}
				label="Debase Unlocked From Lp"
				value={formatEther(deposit.debaseReward)}
				token={rewardText}
				img={rewardTokenImage}
			/> */}

			<TextInfo
				isMobile={isMobile}
				label="88Mph Reward"
				value={parseFloat(formatEther(deposit.mphReward)).toFixed(isMobile ? 4 : 8) * 1}
				token="88MPH"
				img={mph88}
			/>

			<TextInfo
				isMobile={isMobile}
				label="Debase Accrued"
				value={
					debaseAccrued !== undefined && debaseSupply !== undefined ? (
						parseFloat(formatEther(debaseAccrued.mul(debaseSupply).div(parseEther('1')))).toFixed(
							isMobile ? 4 : 8
						) * 1
					) : (
						'0'
					)
				}
				token={rewardText}
				img={rewardTokenImage}
			/>
		</Fragment>
	);
}
