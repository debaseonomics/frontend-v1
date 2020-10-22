import React, { useState, useEffect, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import { poolAbi, lpAbi, toaster } from '../utils/index';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';
import { formatEther, formatUnits, isAddress, parseUnits } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import TextInfo from '../components/TextInfo.js';
import PoolInput from '../components/PoolInput';

const fetcher = (library, abi) => (...args) => {
	const [ arg1, arg2, ...params ] = args;
	if (isAddress(arg1)) {
		const address = arg1;
		const method = arg2;
		const contract = new Contract(address, abi, library.getSigner());
		return contract[method](...params);
	}
	const method = arg1;
	return library[method](arg2, ...params);
};

export default function Pool({
	poolName,
	tokenAddress,
	poolAddress,
	rewardTokenAddress,
	tokenText,
	rewardText,
	rewardTokenImage,
	stakeTokenImage,
	unit
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

	const { data: tokenBalance, mutate: getTokenBalance } = useSWR([ tokenAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, lpAbi)
	});

	const { data: stakeBalance, mutate: getStakeBalance } = useSWR([ poolAddress, 'balanceOf', account ], {
		fetcher: fetcher(library, poolAbi)
	});

	const { data: rewardBalance, mutate: getRewardBalance } = useSWR([ poolAddress, 'earned', account ], {
		fetcher: fetcher(library, poolAbi)
	});

	const [ stakingLoading, setStakingLoading ] = useState(false);
	const [ withdrawLoading, setWithdrawLoading ] = useState(false);
	const [ claimLoading, setClaimLoading ] = useState(false);
	const [ claimUnstakeLoading, setClaimUnstakeLoading ] = useState(false);

	useEffect(() => {
		library.on('block', () => {
			getRewardTokenBalance(undefined, true);
			getTokenBalance(undefined, true);
			getRewardBalance(undefined, true);
			getStakeBalance(undefined, true);
		});
		return () => {
			library.removeAllListeners('block');
		};
	}, []);

	async function handleStake() {
		setStakingLoading(true);
		const tokenContract = new Contract(tokenAddress, lpAbi, library.getSigner());
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		try {
			const toStake = parseUnits(stakeRef.current.value, unit);
			let allowance = await tokenContract.allowance(account, poolAddress);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(poolAddress, toStake);
				await transaction.wait(1);
			}
			transaction = await poolContract.stake(toStake);
			await transaction.wait(1);

			let newTokenBal = await tokenContract.balanceOf(account);
			let newStakeBal = await poolContract.balanceOf(account);

			await getStakeBalance(newStakeBal);
			await getTokenBalance(newTokenBal);

			toaster('Staking successfully executed', 'is-success');
		} catch (error) {
			toaster('Staking failed, please try again', 'is-danger');
		}
		setStakingLoading(false);
	}

	async function handleWithdraw() {
		setWithdrawLoading(true);
		const tokenContract = new Contract(tokenAddress, lpAbi, library.getSigner());
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		try {
			const toWithdraw = parseUnits(withdrawRef.current.value, unit);
			let transaction = await poolContract.withdraw(toWithdraw);
			await transaction.wait(1);

			let newTokenBal = await tokenContract.balanceOf(account);
			let newStakeBal = await poolContract.balanceOf(account);
			await getTokenBalance(newTokenBal);
			await getStakeBalance(newStakeBal);

			toaster('Withdraw successfully executed', 'is-success');
		} catch (error) {
			console.log(error);
			toaster('Withdraw failed, please try again', 'is-danger');
		}
		setWithdrawLoading(false);
	}

	async function claimReward() {
		setClaimLoading(true);
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		try {
			const transaction = await poolContract.getReward();
			await transaction.wait(1);

			let newRewardBal = await poolContract.earned(account);
			await getRewardBalance(newRewardBal);

			toaster('Claim reward successful', 'is-success');
		} catch (error) {
			toaster('Claim reward failed, please try again', 'is-danger');
		}
		setClaimLoading(false);
	}

	async function claimRewardThenUnstake() {
		setClaimUnstakeLoading(true);
		const poolContract = new Contract(poolAddress, poolAbi, library.getSigner());
		const tokenContract = new Contract(tokenAddress, lpAbi, library.getSigner());

		try {
			const transaction = await poolContract.exit();
			await transaction.wait(1);

			let newTokenBal = await tokenContract.balanceOf(account);
			let newStakeBal = await poolContract.balanceOf(account);
			let newRewardBal = await poolContract.earned(account);

			await getStakeBalance(newStakeBal);
			await getTokenBalance(newTokenBal);
			await getRewardBalance(newRewardBal);

			toaster('Claim and unstake successfully executed', 'is-success');
		} catch (error) {
			toaster('Claim and unstake failed, please try again', 'is-danger');
		}
		setClaimUnstakeLoading(false);
	}

	return (
		<div className="container is-fluid">
			<div className="columns is-centered is-mobile">
				<div className="box column is-6-tablet is-11-mobile">
					<nav className="level is-mobile">
						<div className="level-left">
							<div className="level-item">
								<button class="button is-warning is-outlined" onClick={() => history.goBack()}>
									<span class="icon">
										<i class="fas fa-arrow-left" />
									</span>
								</button>
							</div>
						</div>
						<div className="level-item">
							<h2 className="title is-size-3-tablet is-size-4-mobile">{poolName}</h2>
						</div>
						<div className="level-right">
							<button className="button is-invisible">
								<span className="icon is-small">
									<i className="fas fa-arrow-circle-left" />
								</span>
							</button>
						</div>
					</nav>
					<table className="table is-fullwidth" style={{ backgroundColor: '#363636' }}>
						<tbody>
							<TextInfo
								label="Farmed"
								value={
									rewardBalance !== undefined ? (
										parseFloat(formatEther(rewardTokenBalance)).toFixed(8) * 1
									) : (
										'0'
									)
								}
								token={rewardText}
								img={rewardTokenImage}
							/>
							<TextInfo
								label="Claimable"
								value={
									rewardBalance !== undefined ? (
										parseFloat(formatEther(rewardBalance)).toFixed(8) * 1
									) : (
										'0'
									)
								}
								token={rewardText}
								img={rewardTokenImage}
							/>
							<TextInfo
								label="To Stake"
								value={
									tokenBalance !== undefined ? (
										parseFloat(formatUnits(tokenBalance, unit)).toFixed(8) * 1
									) : (
										'0'
									)
								}
								token={tokenText}
								img={stakeTokenImage}
							/>
							<TextInfo
								label="Staked"
								value={
									stakeBalance !== undefined ? (
										parseFloat(formatUnits(stakeBalance, unit)).toFixed(8) * 1
									) : (
										'0'
									)
								}
								token={tokenText}
								img={stakeTokenImage}
							/>
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
						</div>
						<div className="column">
							<PoolInput
								action={handleWithdraw}
								loading={withdrawLoading}
								buttonText="Withdraw Amount"
								ref={withdrawRef}
								balance={stakeBalance}
								placeholderText="Withdraw Amount"
								unit={unit}
							/>
						</div>
					</div>

					<div className="columns">
						<div className="column">
							<button
								className={
									claimLoading ? (
										'button is-loading is-link is-fullwidth is-outlined'
									) : (
										'button is-link is-fullwidth is-outlined'
									)
								}
								onClick={claimReward}
							>
								Claim Reward
							</button>
						</div>
						<div className="column">
							<button
								className={
									claimUnstakeLoading ? (
										'button is-loading is-success is-fullwidth is-outlined'
									) : (
										'button is-success is-fullwidth is-outlined'
									)
								}
								onClick={claimRewardThenUnstake}
							>
								Claim Reward & Unstake
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
