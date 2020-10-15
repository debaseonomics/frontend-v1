import React, { useState, useEffect, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import { poolAbi, lpAbi, toaster } from '../utils/index';
import useSWR from 'swr';
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
	tokenText,
	rewardText,
	rewardTokenImage,
	stakeTokenImage,
	unit
}) {
	const stakeRef = useRef();
	const withdrawRef = useRef();

	const { account, library } = useWeb3React();

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
			<div className="columns is-centered">
				<div className="box column is-6">
					<h2 className="title is-size-3-tablet is-size-4-mobile has-text-centered">{poolName}</h2>
					<TextInfo
						label="Reward"
						value={
							rewardBalance !== undefined ? parseFloat(formatEther(rewardBalance)).toFixed(8) * 1 : '0'
						}
						token={rewardText}
						img={rewardTokenImage}
					/>
					<TextInfo
						label="Balance"
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
					<PoolInput ref={stakeRef} balance={tokenBalance} placeholderText="Stake Amount" unit={unit} />
					<PoolInput ref={withdrawRef} balance={stakeBalance} placeholderText="Withdraw Amount" unit={unit} />

					<div className="buttons has-addons is-centered">
						<button
							className={stakingLoading ? 'button is-loading is-primary' : 'button is-primary'}
							onClick={handleStake}
						>
							Stake
						</button>
						<button
							className={withdrawLoading ? 'button is-loading is-info' : 'button is-info'}
							onClick={handleWithdraw}
						>
							Withdraw
						</button>
						<button
							className={claimLoading ? 'button is-loading is-link' : 'button is-link'}
							onClick={claimReward}
						>
							Claim Reward
						</button>
						<button
							className={claimUnstakeLoading ? 'button is-loading is-success' : 'button is-success'}
							onClick={claimRewardThenUnstake}
						>
							Claim & Unstake
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
