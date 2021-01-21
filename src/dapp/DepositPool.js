import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { poolAbi, lpAbi, toaster, fetcher } from '../utils/index';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';
import { formatEther, formatUnits, parseEther, parseUnits } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import TextInfo from '../components/TextInfo.js';
import PoolInput from '../components/PoolInput';
import { useMediaQuery } from 'react-responsive';
import { request, gql } from 'graphql-request';

export default function DepositPool({
	poolName,
	stakeTokenAddress,
	rewardTokenAddress,
	poolAddress,
	tokenText,
	rewardText,
	rewardTokenImage,
	stakeTokenImage,
	depositLength,
	unit,
	showName
}) {
	let history = useHistory();
	const stakeRef = useRef();
	const withdrawRef = useRef();

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

	const { data: rewardBalance, mutate: getRewardBalance } = useSWR([ poolAddress, 'earned', account ], {
		fetcher: fetcher(library, poolAbi)
	});

	const { data: stakedBalance, mutate: getStakedBalance } = useSWR([ poolAddress, 'lpDeposits', account ], {
		fetcher: fetcher(library, poolAbi)
	});

	const { data: depositIds, mutate: getDepositIds } = useSWR([ poolAddress, 'depositIds', account ], {
		fetcher: fetcher(library, poolAbi)
	});

	const isMobile = useMediaQuery({ query: `(max-width: 482px)` });

	const [ stakingLoading, setStakingLoading ] = useState(false);
	const [ withdrawLoading, setWithdrawLoading ] = useState(false);
	const [ claimLoading, setClaimLoading ] = useState(false);
	const [ claimUnstakeLoading, setClaimUnstakeLoading ] = useState(false);
	const [ selectedDepositID, setSelectedDepositID ] = useState(0);
	const [ depositsAndFundingData, setDepositsAndFundingData ] = useState([]);

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
		query getDeposit($id: ID!) {
			deposit(id: $id) {
				fundingID
			}
		}
	`;

	async function findDepositID() {
		if (depositLength != 0) {
			const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
			for (let index = 0; index < depositIds.length; index++) {
				let depositInfo = await poolContract.deposits(index);
				let fundingInfo = await request('https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph', {
					id: depositInfo[6]
				});
				setDepositsAndFundingData((arr) => [
					...arr,
					{
						depositInfo: [ ...depositInfo ],
						fundingInfo: [ ...fundingInfo ]
					}
				]);
			}
		}
	}

	async function handleStake() {
		setStakingLoading(true);
		const tokenContract = new Contract(stakeTokenAddress, lpAbi, library.getSigner());
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		try {
			const toStake = parseUnits(stakeRef.current.value, unit);
			let allowance = await tokenContract.allowance(account, poolAddress);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(poolAddress, toStake);
				await transaction.wait(1);
			}
			transaction = await poolContract.deposit(toStake);
			await transaction.wait(1);
			await getStakedBalance();

			toaster('Staking successfully executed', 'is-success');
		} catch (error) {
			toaster('Staking failed, please try again', 'is-danger');
		}
		setStakingLoading(false);
	}

	async function handleWithdraw() {
		setWithdrawLoading(true);
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		try {
			let transaction = await poolContract.withdraw(selectedDepositID);
			await transaction.wait(1);

			toaster('Withdraw successfully executed', 'is-success');
		} catch (error) {
			console.log(error);
			toaster('Withdraw failed, please try again', 'is-danger');
		}
		setWithdrawLoading(false);
	}

	async function handleWithdrawAll() {
		setClaimUnstakeLoading(true);
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());

		try {
			const transaction = await poolContract.multiWithdraw();
			await transaction.wait(1);

			toaster('Claim and unstake successfully executed', 'is-success');
		} catch (error) {
			toaster('Claim and unstake failed, please try again', 'is-danger');
		}
		setClaimUnstakeLoading(false);
	}

	const data = (
		<div className="boxs has-text-centered">
			{showName ? (
				<div>
					<h2 className=" title is-size-4-tablet is-size-5-mobile is-family-secondary">{poolName}</h2>
					<button className="delete is-pulled-right" onClick={() => history.goBack()} />
				</div>
			) : null}
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
						label="Staked"
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

					{depositIds !== undefined && depositIds.length !== 0 ? (
						<Fragment>
							<TextInfo isMobile={isMobile} label="Deposit Id" value={1} isDropDown={true} />

							<TextInfo
								isMobile={isMobile}
								label="Claimable"
								value={
									rewardBalance !== undefined && tokenSupply !== undefined ? (
										parseFloat(
											formatEther(rewardBalance.mul(tokenSupply).div(parseEther('1')))
										).toFixed(isMobile ? 4 : 8) * 1
									) : (
										'0'
									)
								}
								token={rewardText}
								img={rewardTokenImage}
							/>
						</Fragment>
					) : null}
				</tbody>
			</table>
			<div className="columns">
				<div className="column">
					<PoolInput
						action={handleStake}
						loading={stakingLoading}
						buttonText="Stake Amount"
						ref={stakeRef}
						balance={tokenBalance}
						placeholderText="Stake Amount"
						unit={unit}
					/>
					<button
						className={
							claimLoading ? (
								'mt-2 button is-loading is-link is-fullwidth is-edged'
							) : (
								'mt-2 button is-link is-fullwidth is-edged'
							)
						}
					>
						Claim Reward
					</button>
				</div>
				<div className="column">
					<PoolInput
						action={handleWithdraw}
						loading={withdrawLoading}
						buttonText="Withdraw Deposit"
						ref={withdrawRef}
						balance={0}
						placeholderText="Withdraw Deposit"
						unit={unit}
					/>
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
						Withdraw All Deposits
					</button>
				</div>
			</div>
		</div>
	);

	if (showName) {
		return (
			<div className="columns is-centered">
				<div className="column is-6">{data}</div>
			</div>
		);
	} else {
		return data;
	}
}
