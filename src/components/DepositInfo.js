import React, { useState, useEffect, Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { poolAbi, lpAbi, fetcher, contractAddress } from '../utils/index';
import useSWR from 'swr';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import TextInfo from './TextInfo.js';
import { request, gql } from 'graphql-request';

export default function DepositInfo({
	rewardTokenAddress,
	poolAddress,
	rewardText,
	rewardTokenImage,
	depositID,
	isMobile,
	dai,
	mph88
}) {
	const { library } = useWeb3React();

	const { data: debaseSupply, mutate: getDebaseSupply } = useSWR([ rewardTokenAddress, 'totalSupply' ], {
		fetcher: fetcher(library, lpAbi)
	});

	const { data: debaseAccrued, mutate: getDebaseAccrued } = useSWR([ poolAddress, 'earned', depositID ], {
		fetcher: fetcher(library, poolAbi)
	});

	const [ depositsAndFundingData, setDepositsAndFundingData ] = useState('');

	useEffect(
		() => {
			findDepositID();
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

	const depositsQuery = gql`
		query getDeposit($nftID: Int!, $user: String!) {
			deposit(nftID: $nftID, user: $user) {
				active
				fundingID
			}
		}
	`;

	async function findDepositID() {
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		let depositInfo = await poolContract.deposits(depositID);

		let fundingInfo = await request(
			'https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph',
			depositsQuery,
			{
				nftID: depositInfo[6],
				user: contractAddress.mph88Pool
			}
		);

		let depositData = {
			owner: depositInfo[0],
			amount: depositInfo[1],
			daiAmount: depositInfo[2],
			debaseReward: depositInfo[4],
			daiDepositId: depositInfo[6],
			mphReward: depositInfo[7],
			maturationTimestamp: depositInfo[9],
			withdrawed: depositInfo[10],
			active: fundingInfo.deposit.active,
			fundingID: fundingInfo.deposit.fundingID
		};

		setDepositsAndFundingData(depositData);
	}

	return (
		<Fragment>
			<TextInfo
				isMobile={isMobile}
				label="Deposit Lp Staked"
				value={formatEther(depositsAndFundingData.amount)}
				token={rewardText}
				img={rewardTokenImage}
			/>

			<TextInfo
				isMobile={isMobile}
				label="Dai Unlocked From Lp"
				value={formatEther(depositsAndFundingData.daiAmount)}
				token={rewardText}
				img={dai}
			/>

			<TextInfo
				isMobile={isMobile}
				label="Debase Unlocked From Lp"
				value={formatEther(depositsAndFundingData.debaseReward)}
				token={rewardText}
				img={rewardTokenImage}
			/>

			<TextInfo
				isMobile={isMobile}
				label="Deposit Maturation Time"
				value={formatEther(depositsAndFundingData.maturationTimestamp)}
				token={rewardText}
				img={rewardTokenImage}
			/>

			<TextInfo
				isMobile={isMobile}
				label="Mph88 Reward Earned"
				value={formatEther(depositsAndFundingData.mphReward)}
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
