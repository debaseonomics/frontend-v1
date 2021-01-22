import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { poolAbi, lpAbi, toaster, fetcher, contractAddress } from '../utils/index';
import useSWR from 'swr';
import { formatEther, formatUnits, parseEther, parseUnits } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import TextInfo from '../components/TextInfo.js';
import { useMediaQuery } from 'react-responsive';
import { request, gql } from 'graphql-request';

export default function DepositPool({
	stakeTokenAddress,
	rewardTokenAddress,
	poolAddress,
	tokenText,
	rewardText,
	rewardTokenImage,
	depositID,
	stakeTokenImage,
	unit
}) {
	const { account, library } = useWeb3React();

	const { data: rewardTokenBalance, mutate: getRewardTokenBalance } = useSWR(
		[ rewardTokenAddress, 'balanceOf', account ],
		{
			fetcher: fetcher(library, lpAbi)
		}
	);

	const { data: tokenSupply, mutate: getTokenSupply } = useSWR([ rewardTokenAddress, 'totalSupply' ], {
		fetcher: fetcher(library, lpAbi)
	});

	const { data: tokenBalance, mutate: getTokenBalance } = useSWR([ stakeTokenAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, lpAbi)
	});

	const { data: rewardBalance, mutate: getRewardBalance } = useSWR([ poolAddress, 'earned', depositID ], {
		fetcher: fetcher(library, poolAbi)
	});

	const isMobile = useMediaQuery({ query: `(max-width: 482px)` });

	const [ withdrawLoading, setWithdrawLoading ] = useState(false);
	const [ depositsAndFundingData, setDepositsAndFundingData ] = useState('');

	useEffect(
		() => {
			library.on('block', () => {
				getRewardTokenBalance(undefined, true);
				getTokenBalance(undefined, true);
				getRewardBalance(undefined, true);
				getTokenSupply(undefined, true);
			});
			return () => {
				library.removeAllListeners('block');
			};
		},
		[ library, getRewardBalance, getTokenBalance, getRewardTokenBalance, getTokenSupply ]
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

	async function handleWithdraw() {
		setWithdrawLoading(true);
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());

		const data = depositsAndFundingData[selectedDepositIndex];
		if (data.withdrawed == false) {
			try {
				let transaction = await poolContract.withdraw(data.daiDepositId, data.fundingID);
				await transaction.wait(1);

				toaster('Deposit withdraw successfully', 'is-success');
			} catch (error) {
				console.log(error);
				toaster('Deposit withdraw failed, please try again', 'is-danger');
			}
		} else {
			toaster('Deposit already withdrawn', 'is-danger');
		}
		setWithdrawLoading(false);
	}

	return (
		<div className="boxs has-text-centered">
			<table className="table is-fullwidth">
				<tbody>
					<TextInfo
						isMobile={isMobile}
						label="Balance"
						value={
							rewardBalance !== undefined ? (
								parseFloat(formatEther(rewardTokenBalance)).toFixed(isMobile ? 4 : 8) * 1
							) : (
								'0'
							)
						}
						token={rewardText}
						img={rewardTokenImage}
					/>
					<TextInfo
						isMobile={isMobile}
						label="To Stake"
						value={
							tokenBalance !== undefined ? (
								parseFloat(formatUnits(tokenBalance, unit)).toFixed(isMobile ? 4 : 8) * 1
							) : (
								'0'
							)
						}
						token={tokenText}
						img={stakeTokenImage}
					/>
					<TextInfo
						isMobile={isMobile}
						label="Total Lp Deposited"
						value={
							stakedBalance !== undefined ? (
								parseFloat(formatEther(stakedBalance)).toFixed(isMobile ? 4 : 8) * 1
							) : (
								'0'
							)
						}
						token={tokenText}
						img={stakeTokenImage}
					/>

					<TextInfo
						isMobile={isMobile}
						label="Deposit Id"
						value={depositIds}
						isDropDown={true}
						setSelectedDepositIndex={setSelectedDepositIndex}
					/>

					<TextInfo
						isMobile={isMobile}
						label="Deposit Lp Staked"
						value={formatEther(depositsAndFundingData[selectedDepositIndex].amount)}
						token={rewardText}
						img={rewardTokenImage}
					/>

					<TextInfo
						isMobile={isMobile}
						label="Dai Unlocked From Lp"
						value={formatEther(depositsAndFundingData[selectedDepositIndex].daiAmount)}
						token={rewardText}
						img={rewardTokenImage}
					/>

					<TextInfo
						isMobile={isMobile}
						label="Debase Unlocked From Lp"
						value={formatEther(depositsAndFundingData[selectedDepositIndex].debaseReward)}
						token={rewardText}
						img={rewardTokenImage}
					/>

					<TextInfo
						isMobile={isMobile}
						rewardBalance
						label="Deposit Maturation Time"
						value={formatEther(depositsAndFundingData[selectedDepositIndex].maturationTimestamp)}
						token={rewardText}
						img={rewardTokenImage}
					/>

					<TextInfo
						isMobile={isMobile}
						label="Mph88 Reward Earned"
						value={formatEther(depositsAndFundingData[selectedDepositIndex].mphReward)}
						token={rewardText}
						img={rewardTokenImage}
					/>

					<TextInfo
						isMobile={isMobile}
						label="Debase Accured"
						value={
							rewardBalance !== undefined && tokenSupply !== undefined ? (
								parseFloat(formatEther(rewardBalance.mul(tokenSupply).div(parseEther('1')))).toFixed(
									isMobile ? 4 : 8
								) * 1
							) : (
								'0'
							)
						}
						token={rewardText}
						img={rewardTokenImage}
					/>
				</tbody>
			</table>
			<div className="columns">
				<div className="column">
					<button
						className={
							claimUnstakeLoading ? (
								'mt-2 button is-loading is-link is-fullwidth is-edged'
							) : (
								'mt-2 button is-link is-fullwidth is-edged'
							)
						}
						onClick={handleWithdrawAll}
					>
						Withdraw Deposit
					</button>
				</div>
			</div>
		</div>
	);
}
