import React, { useState, useEffect, Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { poolAbi, lpAbi, fetcher, mph88Abi } from '../utils/index';
import useSWR from 'swr';
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

	const { data: debaseAccrued, mutate: getDebaseAccrued } = useSWR([ poolAddress, 'earned', 9 ], {
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
				label="Deposit Lp Staked"
				value={formatEther(deposit.amount)}
				token={rewardText}
				img={rewardTokenImage}
			/>

			<TextInfo
				isMobile={isMobile}
				label="Dai Unlocked From Lp"
				value={parseFloat(formatEther(deposit.daiAmount)).toFixed(4)}
				token={rewardText}
				img={dai}
			/>

			{/* <TextInfo
				isMobile={isMobile}
				label="Debase Unlocked From Lp"
				value={formatEther(deposit.debaseReward)}
				token={rewardText}
				img={rewardTokenImage}
			/> */}

			{/* <TextInfo
				isMobile={isMobile}
				label="Deposit Maturation Time"
				value={formatEther(deposit.maturationTimestamp)}
				token={rewardText}
				img={rewardTokenImage}
			/> */}

			<TextInfo
				isMobile={isMobile}
				label="Mph88 Reward Earned"
				value={formatEther(deposit.mphReward)}
				token={rewardText}
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
