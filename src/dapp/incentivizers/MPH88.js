import React, { Fragment, useState, useEffect, useRef } from 'react';
import DepositPool from '../../components/DepositInfo';
import debase from '../../assets/debase.png';
import empty from '../../assets/empty.png';
import dai from '../../assets/dai.png';
import mph88 from '../../assets/88mph.png';
import { Contract } from 'ethers';
import { useHistory } from 'react-router-dom';
import { contractAddress, etherScanAddress, turncate, fetcher, mph88Abi, lpAbi, toaster } from '../../utils/index';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { useMediaQuery } from 'react-responsive';
import { formatEther, formatUnits, parseUnits } from 'ethers/lib/utils';
import PoolInput from '../../components/PoolInput';
import TextInfo from '../../components/TextInfo';
import { request, gql } from 'graphql-request';

export default function MPH88() {
	let history = useHistory();
	const { library, account } = useWeb3React();
	const [ hideStake, setHideStake ] = useState(true);
	const [ stakingLoading, setStakingLoading ] = useState(false);
	const [ withdrawLoading, setWithdrawLoading ] = useState(false);
	const [ claimUnstakeLoading, setClaimUnstakeLoading ] = useState(false);
	const [ selectedDepositIndex, setSelectedDepositIndex ] = useState(0);
	const [ depositIds, setDepositIds ] = useState([]);

	const stakeRef = useRef();

	const { data: lockPeriod } = useSWR([ contractAddress.mph88Pool, 'lockPeriod' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: debaseRewardPercentage } = useSWR([ contractAddress.mph88Pool, 'debaseRewardPercentage' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: daiFee } = useSWR([ contractAddress.mph88Pool, 'daiFee' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: mphFee } = useSWR([ contractAddress.mph88Pool, 'mphFee' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: debaseRewardDistributed } = useSWR([ contractAddress.mph88Pool, 'debaseRewardDistributed' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: allowEmergencyWithdraw } = useSWR([ contractAddress.mph88Pool, 'allowEmergencyWithdraw' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: maxDepositLimit } = useSWR([ contractAddress.mph88Pool, 'maxDepositLimit' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: totalLpLimit } = useSWR([ contractAddress.mph88Pool, 'totalLpLimit' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: totalLpLimitEnabled } = useSWR([ contractAddress.mph88Pool, 'totalLpLimitEnabled' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: maxDepositLimitEnabled } = useSWR([ contractAddress.mph88Pool, 'maxDepositLimitEnabled' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: totalLpLocked } = useSWR([ contractAddress.mph88Pool, 'totalLpLocked' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: blockDuration } = useSWR([ contractAddress.mph88Pool, 'blockDuration' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: poolEnabled } = useSWR([ contractAddress.mph88Pool, 'poolEnabled' ], {
		fetcher: fetcher(library, mph88Abi)
	});

	const { data: stakedBalance, mutate: getStakedBalance } = useSWR(
		[ contractAddress.mph88Pool, 'lpDeposits', account ],
		{
			fetcher: fetcher(library, mph88Abi)
		}
	);

	const { data: debaseBalance, mutate: getDebaseBalance } = useSWR([ contractAddress.debase, 'balanceOf', account ], {
		fetcher: fetcher(library, lpAbi)
	});

	const { data: lpBalance, mutate: getLPBalance } = useSWR([ contractAddress.debaseDaiLp, 'balanceOf', account ], {
		fetcher: fetcher(library, lpAbi)
	});

	useEffect(
		() => {
			library.on('block', () => {
				getDebaseBalance(undefined, true);
				getStakedBalance(undefined, true);
				getLPBalance(undefined, true);
			});
			return () => {
				library.removeAllListeners('block');
			};
		},
		[ library, getDebaseBalance, getLPBalance, getStakedBalance ]
	);

	const depositsQuery = gql`
		query getDeposit($nftID: Int!) {
			deposits(
				where: {
					pool: "0xdc86ac6140026267e0873b27c8629efe748e7146"
					user: "0x36f1f4125b4066ca4b768f9f5f9a737bd4fa8f62"
					nftID: $nftID
				}
			) {
				fundingID
				interestEarned
				mintMPHAmount
			}
		}
	`;

	async function handleStake() {
		setStakingLoading(true);
		const tokenContract = new Contract(contractAddress.debaseDaiLp, lpAbi, library.getSigner());
		const poolContract = new Contract(contractAddress.mph88Pool, mph88Abi, library.getSigner());
		try {
			const toStake = parseUnits(stakeRef.current.value, 18);
			let allowance = await tokenContract.allowance(account, contractAddress.mph88Pool);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(contractAddress.mph88Pool, toStake);
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
		const poolContract = new Contract(contractAddress.mph88Pool, mph88Abi, library.getSigner());

		if (depositIds[selectedDepositIndex].withdrawed === false) {
			try {
				let transaction = await poolContract.withdraw(
					depositIds[selectedDepositIndex].id.toNumber(),
					parseInt(depositIds[selectedDepositIndex].fundingId)
				);
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

	async function findDepositID() {
		const poolContract = new Contract(contractAddress.mph88Pool, mph88Abi, library.getSigner());

		let arr = [];
		let x = 0;

		while (true) {
			try {
				let depositId = await poolContract.depositIds(account, x);
				let depositInfo = await poolContract.deposits(depositId);
				let fundingInfo = await request(
					'https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph',
					depositsQuery,
					{
						nftID: depositInfo[6].toNumber()
					}
				);

				let data = {
					id: depositId,
					fundingId: fundingInfo.deposits[0].fundingID,
					amount: depositInfo[1],
					daiAmount: depositInfo[2],
					interestEarnedOnDai: fundingInfo.deposits[0].interestEarned,
					debaseReward: depositInfo[3],
					mphReward: fundingInfo.deposits[0].mintMPHAmount,
					maturationTimestamp: depositInfo[9],
					withdrawed: depositInfo[10]
				};

				arr.push(data);
			} catch (error) {
				console.log(error);
				break;
			}
			x++;
		}
		setDepositIds(arr);
	}

	async function handleWithdrawAll() {
		setClaimUnstakeLoading(true);
		const poolContract = new Contract(contractAddress.mph88Pool, mph88Abi, library.getSigner());

		if (depositIds.length) {
			let allDepositIds = depositIds.map((ele) => {
				if (ele.withdrawed === false) {
					return ele.id.toNumber();
				}
				return null;
			});

			let allFundingIds = depositIds.map((ele) => {
				if (ele.withdrawed === false) {
					return parseInt(ele.fundingId);
				}
				return null;
			});

			try {
				const transaction = await poolContract.multiWithdraw(allDepositIds, allFundingIds);
				await transaction.wait(1);

				toaster('Withdraw all deposits successfully executed', 'is-success');
			} catch (error) {
				toaster('Withdraw all deposits failed, please try again', 'is-danger');
			}
		} else {
			toaster('No deposits remaining to withdraw', 'is-danger');
		}

		setClaimUnstakeLoading(false);
	}

	const paramsData = [
		{
			label: 'Debase Reward Percentage',
			value: debaseRewardPercentage ? formatEther(debaseRewardPercentage) + ' %' : '...',
			toolTip: 'Percentage of stabilizer rewards contract requested as reward per reward duration'
		},
		{
			label: 'Deposit Length',
			value: lockPeriod ? lockPeriod + ' Blocks (30 Days)' : '...',
			toolTip: 'Percentage of stabilizer rewards contract requested as reward per reward duration'
		},
		{
			label: 'Dai Yield Fee',
			value: daiFee ? formatUnits(daiFee, 1) + ' %' : '...',
			toolTip: 'Percentage of DAI yield sent to treasury'
		},
		{
			label: 'Mph Yield Fee',
			value: mphFee ? formatUnits(mphFee, 1) + ' %' : '...',
			toolTip: 'Percentage of MPH yield sent to treaury'
		},
		{
			label: 'Reward Duration',
			value: blockDuration ? blockDuration + ' Blocks' : '...',
			toolTip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Debase Reward Distributed',
			value: debaseRewardDistributed ? formatEther(debaseRewardDistributed) : '...',
			toolTip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Allow Emergency Withdraw',
			value: allowEmergencyWithdraw !== undefined ? (allowEmergencyWithdraw ? 'True' : 'False') : '...',
			toolTip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Pool Enabled',
			value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : '...',
			toolTip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'Pool Lp Limit Enabled',
			value: maxDepositLimitEnabled !== undefined ? (maxDepositLimitEnabled ? 'True' : 'False') : '...',
			toolTip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'User Lp Limit Enabled',
			value: totalLpLimitEnabled !== undefined ? (totalLpLimitEnabled ? 'True' : 'False') : '...',
			toolTip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'User Lp Limit',
			value: maxDepositLimit ? formatEther(maxDepositLimit) + ' LP' : '...',
			toolTip: 'LP limit per wallet'
		},
		{
			label: 'Total Pool Limit',
			value:
				totalLpLimit && totalLpLocked
					? parseFloat(formatEther(totalLpLocked)).toFixed(2) + ' / ' + formatEther(totalLpLimit) + ' LP'
					: '...',
			toolTip: 'Total LP limit per pool'
		},
		{
			label: 'APR',
			value: '330% DEBASE, 40% MPH, 4.8% DAI',
			toolTip: 'POOL APY'
		}
	];

	const isMobile = useMediaQuery({ query: `(max-width: 482px)` });

	return (
		<div className="columns is-centered">
			<div className="box boxs column is-6">
				<div className=" has-text-centered">
					<h3 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">
						DM88 Debase/Dai-Lp Incentivizer
					</h3>
					<span className="delete is-pulled-right" onClick={() => history.goBack()} />
				</div>
				<div className="infowrapper">
					<div className="contractinfo">
						<div className="desc">
							<h5 className="pt-2 pl-1 pr-1 subtitle is-size-5-tablet is-size-6-mobile">
								This contract is audited, but DeFi vault strategies are subject to various risks. The
								Debaseonomics protocol bears no responsibility if your assets are lost. Invest only what
								you can afford to lose. Please read all the parameters in the staking page and keep in
								mind the following:<br />
								<br /> 1. Your assets are locked for 30 days from time of deposit, with all rewards paid
								out at the end of 30 days.<br />
								<br /> 2. You get your principal back not in LP, but in Dai + Debase in your LP at time
								of deposit.
								<br />
								<br /> 3. There should be a mininum of 100 DAI in your LP to be able to stake.
							</h5>
							<span className="mb-0 subtitle is-size-5-tablet is-size-6-mobile">
								<a
									className="is-primary"
									target="_blank"
									rel="noopener noreferrer"
									href={etherScanAddress + contractAddress.mph88Pool}
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 18H17V16H7V18Z" fill="currentColor" />
										<path d="M17 14H7V12H17V14Z" fill="currentColor" />
										<path d="M7 10H11V8H7V10Z" fill="currentColor" />
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
											fill="currentColor"
										/>
									</svg>
									{turncate(contractAddress.mph88Pool, 18, '...')}
								</a>
								<a
									className="is-primary"
									target="_blank"
									rel="noopener noreferrer"
									href="https://app.uniswap.org/#/add/ETH/0xE98f89a2B3AeCDBE2118202826478Eb02434459A"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M4.99255 12.9841C4.44027 12.9841 3.99255 13.4318 3.99255 13.9841C3.99255 14.3415 4.18004 14.6551 4.46202 14.8319L7.14964 17.5195C7.54016 17.9101 8.17333 17.9101 8.56385 17.5195C8.95438 17.129 8.95438 16.4958 8.56385 16.1053L7.44263 14.9841H14.9926C15.5448 14.9841 15.9926 14.5364 15.9926 13.9841C15.9926 13.4318 15.5448 12.9841 14.9926 12.9841L5.042 12.9841C5.03288 12.984 5.02376 12.984 5.01464 12.9841H4.99255Z"
											fill="currentColor"
										/>
										<path
											d="M19.0074 11.0159C19.5597 11.0159 20.0074 10.5682 20.0074 10.0159C20.0074 9.6585 19.82 9.3449 19.538 9.16807L16.8504 6.48045C16.4598 6.08993 15.8267 6.08993 15.4361 6.48045C15.0456 6.87098 15.0456 7.50414 15.4361 7.89467L16.5574 9.01589L9.00745 9.01589C8.45516 9.01589 8.00745 9.46361 8.00745 10.0159C8.00745 10.5682 8.45516 11.0159 9.00745 11.0159L18.958 11.0159C18.9671 11.016 18.9762 11.016 18.9854 11.0159H19.0074Z"
											fill="currentColor"
										/>
									</svg>
									Debase / DAI LP
								</a>
							</span>
						</div>
					</div>
					<div className="params columns is-mobile">
						{paramsData.map((ele, index) => (
							<div key={index} className="para">
								<h5
									data-tooltip={ele.toolTip}
									className="title is-size-5-tablet is-size-6-mobile has-tooltip-arrow"
								>
									{ele.label}
								</h5>
								<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{ele.value}</h5>
							</div>
						))}
					</div>
				</div>
				{hideStake ? (
					<button
						className="button is-edged is-fullwidth is-primary"
						onClick={() => {
							findDepositID();
							setHideStake(false);
						}}
					>
						Stake Into Pool
					</button>
				) : (
					<Fragment>
						<div className="boxs has-text-centered">
							<table className="table is-fullwidth">
								<tbody>
									<TextInfo
										isMobile={isMobile}
										label="Balance"
										value={
											debaseBalance !== undefined ? (
												parseFloat(formatEther(debaseBalance)).toFixed(isMobile ? 4 : 8) * 1
											) : (
												'0'
											)
										}
										token="Debase"
										img={debase}
									/>
									<TextInfo
										isMobile={isMobile}
										label="To Deposit"
										value={
											lpBalance !== undefined ? (
												parseFloat(formatEther(lpBalance)).toFixed(isMobile ? 4 : 8) * 1
											) : (
												'0'
											)
										}
										token="Debase/Dai Lp"
										img={empty}
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
										token="Debase/Dai Lp"
										img={empty}
									/>
									{depositIds.length ? (
										<Fragment>
											<TextInfo
												isMobile={isMobile}
												label="Deposit Id"
												value={depositIds}
												isDropDown={true}
												setSelectedDepositIndex={setSelectedDepositIndex}
											/>
											<DepositPool
												isMobile={isMobile}
												tokenText="Debase/Dai-Lp"
												rewardText="Debase"
												unit={18}
												deposit={depositIds[0]}
												rewardTokenImage={debase}
												stakeTokenImage={empty}
												tokenAddress={contractAddress.debaseDaiLp}
												rewardTokenAddress={contractAddress.debase}
												poolAddress={contractAddress.mph88Pool}
												dai={dai}
												mph88={mph88}
											/>
										</Fragment>
									) : null}
								</tbody>
							</table>
						</div>
						{depositIds.length ? (
							<Fragment>
								<PoolInput
									action={handleStake}
									loading={stakingLoading}
									buttonText="Deposit Amount"
									ref={stakeRef}
									balance={lpBalance}
									placeholderText="Enter deposit amount"
									unit={18}
								/>

								<button
									className={
										withdrawLoading ? (
											'mt-2 button is-loading is-link is-fullwidth is-edged'
										) : (
											'mt-2 button is-link is-fullwidth is-edged'
										)
									}
									onClick={handleWithdraw}
								>
									Withdraw Selected Deposit
								</button>
								<button
									className={
										claimUnstakeLoading ? (
											'mt-2 button is-loading is-info is-fullwidth is-edged'
										) : (
											'mt-2 button is-info is-fullwidth is-edged'
										)
									}
									onClick={handleWithdrawAll}
								>
									Withdraw All Deposits
								</button>
							</Fragment>
						) : (
							<PoolInput
								action={handleStake}
								loading={stakingLoading}
								buttonText="Deposit Amount"
								ref={stakeRef}
								balance={lpBalance}
								placeholderText="Enter deposit amount"
								unit={18}
							/>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
}
