import React, { Fragment, useState, useEffect, useRef } from 'react';
import debase from '../../assets/debase.png';
import empty from '../../assets/empty.png';
import dai from '../../assets/dai.png';

import { useHistory } from 'react-router-dom';
import {
	contractAddress,
	etherScanAddress,
	turncate,
	fetcher,
	lpAbi,
	burnPoolAbi,
	toaster,
	burnPoolOracleAbi,
	debasePolicyAbi
} from '../../utils/index';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther, parseEther, parseUnits } from 'ethers/lib/utils';
import CouponInfo from '../../components/CouponInfo';
import PoolInput from '../../components/PoolInput';
import { useMediaQuery } from 'react-responsive';
import { Contract } from 'ethers';
import TextInfo from '../../components/TextInfo';
import { useSubscription } from 'urql';
import Curve from '../../components/Curve';
import RewardCurve from '../../components/RewardCurve';

const settingsSub = `
	subscription {
		setting(id:"0") {
			epochs
			rewardBlockPeriod
			oracleBlockPeriod
			curveShifter
			initialRewardShare
			multiSigRewardShare
			mean
			deviation
			oneDivDeviationSqrtTwoPi
			twoDeviationSquare
			rewardCycleLength
			peakScaler
			lastRebase
		}
	}
`;

const expansionCycleSub = `
	subscription {
		expansionCycles(orderBy:id,orderDirection:desc) {
			id
			rewardAccrued
			exchangeRate
			cycleExpansion
			curveValue
			mean
			deviation
			peakScaler
		}
	}
`;

const rewardCycleSub = `
	subscription ($address: String!) {
		rewardCycles(orderBy:id,orderDirection:desc){
			id
			rewardShare
			debasePerEpoch
			rewardBlockPeriod
			oracleBlockPeriod
			oracleLastPrices
			oracleNextUpdates
			epochsToReward
			epochsRewarded
			couponsIssued
			rewardDistributionDisabled
			rewardDistributed
			distributions(orderBy:blockNumber,orderDirection:desc)  {
				exchangeRate
				poolTotalShare
				periodFinish
				curveValue
				mean
				deviation
				peakScaler
			}
			users(where:{address: $address}){
				couponBalance
			}
		}
	}
`;

const handleSettingSubscription = (messages = [], response) => {
	return response.setting;
};

const handleExpansionSubscription = (messages = [], response) => {
	return response.expansionCycles;
};

const handleRewardCycleSubscription = (messages = [], response) => {
	return response.rewardCycles;
};

export default function BurnPool() {
	let history = useHistory();
	const { library, account } = useWeb3React();
	const [ setting ] = useSubscription({ query: settingsSub }, handleSettingSubscription);
	const [ expansionCycles ] = useSubscription({ query: expansionCycleSub }, handleExpansionSubscription);
	const [ rewardCycles ] = useSubscription(
		{ query: rewardCycleSub, variables: { address: account.toLowerCase() } },
		handleRewardCycleSubscription
	);

	const isMobile = useMediaQuery({ query: `(max-width: 482px)` });

	const [ stakingLoading, setStakingLoading ] = useState(false);
	const [ claimLoading, setClaimLoading ] = useState(false);
	const [ hideStake, setHideStake ] = useState(true);
	const [ hideDistribution, setHideDistribution ] = useState(true);

	const [ selectedRewardCycle, setSelectedRewardCycle ] = useState(0);
	const [ selectedDistributionCycle, setSelectedDistributionCycle ] = useState(0);
	const [ selectedExpansionCycle, setSelectedExpansionCycle ] = useState(0);
	const [ selectedExpansionData, setSelectedExpansionData ] = useState(0);

	const couponRef = useRef();

	const numberFormat = (value) =>
		new Intl.NumberFormat('en-US', {
			style: 'decimal'
		}).format(value);

	const { data: debaseSupply } = useSWR([ contractAddress.debase, 'totalSupply' ], {
		fetcher: fetcher(library, lpAbi)
	});

	const { data: debaseBalance } = useSWR([ contractAddress.debase, 'balanceOf', account ], {
		fetcher: fetcher(library, lpAbi)
	});

	const { data: blockNumber, mutate: getBlockNumber } = useSWR([ 'getBlockNumber' ], {
		fetcher: fetcher(library)
	});

	const { data: circBalance, mutate: getCircBalance } = useSWR([ contractAddress.burnPool, 'circBalance' ], {
		fetcher: fetcher(library, burnPoolAbi)
	});

	const { data: couponOraclePrice, mutate: getCouponOraclePrice } = useSWR(
		[ contractAddress.burnPoolOracle, 'currentAveragePrice' ],
		{
			fetcher: fetcher(library, burnPoolOracleAbi)
		}
	);

	const { data: lowerDeviationThreshold, mutate: getLowerDeviationThreshold } = useSWR(
		[ contractAddress.debasePolicy, 'lowerDeviationThreshold' ],
		{
			fetcher: fetcher(library, debasePolicyAbi)
		}
	);

	useEffect(
		() => {
			library.on('block', () => {
				getBlockNumber(undefined, true);
				getCircBalance(undefined, true);
				getCouponOraclePrice(undefined, true);
				getLowerDeviationThreshold(undefined, true);
			});
			return () => {
				library.removeAllListeners('block');
			};
		},
		[ library, getBlockNumber, getCircBalance, getCouponOraclePrice, getLowerDeviationThreshold ]
	);

	const paramsData = [
		{
			label: 'Epochs',
			value: setting.data ? setting.data.epochs : '...',
			toolTip: 'Current pool rewards available'
		},
		{
			label: 'Oracle Block Period',
			value: setting.data ? setting.data.oracleBlockPeriod : '...',
			toolTip: 'Current pool rewards available'
		},
		{
			label: 'Reward Block Duration',
			value: setting.data ? setting.data.rewardBlockPeriod : '...',
			toolTip: 'Current pool rewards available'
		},
		{
			label: 'Initial Reward Share',
			value: setting.data ? setting.data.initialRewardShare : '...',
			toolTip: 'Current pool rewards available'
		},
		{
			label: 'Multi Sig Reward Share',
			value: setting.data ? setting.data.multiSigRewardShare : '...',
			toolTip: 'Current pool rewards available'
		},
		{
			label: 'Last Rebase',
			value: setting.data ? setting.data.lastRebase : '...',
			toolTip: 'Current pool rewards available'
		}
	];

	async function handleBuyCoupons() {
		setStakingLoading(false);
		const tokenContract = new Contract(contractAddress.debase, lpAbi, library.getSigner());
		const burnPoolContract = new Contract(contractAddress.burnPool, burnPoolAbi, library.getSigner());
		try {
			const toStake = parseUnits(couponRef.current.value, 18);
			let allowance = await tokenContract.allowance(account, contractAddress.burnPool);
			let transaction;
			if (allowance.lt(toStake)) {
				transaction = await tokenContract.approve(contractAddress.burnPool, toStake);
				await transaction.wait(1);
			}
			transaction = await burnPoolContract.buyCoupons(toStake);
			await transaction.wait(1);

			toaster('Coupon successfully bought', 'is-success');
		} catch (error) {
			toaster('Coupon buying failing, please try again', 'is-danger');
		}
		setStakingLoading(true);
	}

	async function handleClaim() {
		setClaimLoading(true);
		const burnPoolContract = new Contract(contractAddress.burnPool, burnPoolAbi, library.getSigner());
		try {
			const transaction = await burnPoolContract.getReward(selectedRewardCycle);
			await transaction.wait(1);

			toaster('Claim reward successful', 'is-success');
		} catch (error) {
			toaster('Claim reward failed, please try again', 'is-danger');
		}
		setClaimLoading(false);
	}

	console.log(rewardCycles.data ? rewardCycles.data[selectedRewardCycle] : 'null');

	function generateDistributionCurve() {}

	return (
		<div className="columns is-centered">
			<div className="box boxs column is-6">
				<div className=" has-text-centered">
					<h3 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">Debase burn Pool</h3>
					<span className="delete is-pulled-right" onClick={() => history.goBack()} />
				</div>
				<div className="infowrapper">
					<div className="contractinfo">
						<div className="desc">
							<h5 className="pt-2 pl-1 pr-1 subtitle is-size-5-tablet is-size-6-mobile">
								This stabilizer counts the number of positive rebases until a random threshold is hit,
								sampled from a normal distribution. Once the threshold is hit, counter is reset and the
								pool starts to reward DEBASE for staked DEBASE/DAI LPs, as per the parameters mentioned.
							</h5>
							<span className="mb-0 subtitle is-size-5-tablet is-size-6-mobile">
								<a
									className="is-primary"
									target="_blank"
									rel="noopener noreferrer"
									href={etherScanAddress + contractAddress.thresholdCounterV2Eth}
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
									{turncate(contractAddress.thresholdCounterV2Eth, 18, '...')}
								</a>
								<a
									className="is-primary"
									target="_blank"
									rel="noopener noreferrer"
									href="https://debaseonomics.medium.com/randomness-in-debaseonomics-mainnet-integration-with-chainlink-vrf-523e45ab5571"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M4 5.5H9C10.1046 5.5 11 6.39543 11 7.5V16.5C11 17.0523 10.5523 17.5 10 17.5H4C3.44772 17.5 3 17.0523 3 16.5V6.5C3 5.94772 3.44772 5.5 4 5.5ZM14 19.5C13.6494 19.5 13.3128 19.4398 13 19.3293V19.5C13 20.0523 12.5523 20.5 12 20.5C11.4477 20.5 11 20.0523 11 19.5V19.3293C10.6872 19.4398 10.3506 19.5 10 19.5H4C2.34315 19.5 1 18.1569 1 16.5V6.5C1 4.84315 2.34315 3.5 4 3.5H9C10.1947 3.5 11.2671 4.02376 12 4.85418C12.7329 4.02376 13.8053 3.5 15 3.5H20C21.6569 3.5 23 4.84315 23 6.5V16.5C23 18.1569 21.6569 19.5 20 19.5H14ZM13 7.5V16.5C13 17.0523 13.4477 17.5 14 17.5H20C20.5523 17.5 21 17.0523 21 16.5V6.5C21 5.94772 20.5523 5.5 20 5.5H15C13.8954 5.5 13 6.39543 13 7.5ZM5 7.5H9V9.5H5V7.5ZM15 7.5H19V9.5H15V7.5ZM19 10.5H15V12.5H19V10.5ZM5 10.5H9V12.5H5V10.5ZM19 13.5H15V15.5H19V13.5ZM5 13.5H9V15.5H5V13.5Z"
											fill="currentColor"
										/>
									</svg>
									S-Pools
								</a>
								<a
									className="is-primary"
									target="_blank"
									rel="noopener noreferrer"
									href="https://app.uniswap.org/#/add/0x9248c485b0B80f76DA451f167A8db30F33C70907/0x6B175474E89094C44Da98b954EedeAC495271d0F"
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
									DEBASE / Eth LP
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
					<button className="button is-edged is-fullwidth is-primary" onClick={() => setHideStake(false)}>
						Stake Into Pool
					</button>
				) : (
					<Fragment>
						<div className="boxs has-text-centered">
							{expansionCycles.data && expansionCycles.data.length !== 0 ? (
								<Fragment>
									<Curve
										mean={expansionCycles.data[selectedExpansionCycle].mean[selectedExpansionData]}
										deviation={
											expansionCycles.data[selectedExpansionCycle].deviation[
												selectedExpansionData
											]
										}
										peakScaler={
											expansionCycles.data[selectedExpansionCycle].peakScaler[
												selectedExpansionData
											]
										}
									/>
									<table className="table is-fullwidth">
										<tbody>
											<Fragment>
												<TextInfo
													isMobile={isMobile}
													label="Expansion Cycle Id"
													value={expansionCycles.data}
													isDropDown={true}
													setSelectedDepositIndex={setSelectedExpansionCycle}
												/>
												<TextInfo
													isMobile={isMobile}
													label="Total Rewards Accrued"
													value={parseFloat(
														expansionCycles.data[selectedExpansionCycle].rewardAccrued - 1
													).toFixed(6)}
													token="Debase"
													img={debase}
												/>
												<TextInfo
													isMobile={isMobile}
													label="Cycle Id"
													value={expansionCycles.data[selectedExpansionCycle].cycleExpansion}
													isDropDown={true}
													setSelectedDepositIndex={setSelectedExpansionData}
												/>
												<TextInfo
													isMobile={isMobile}
													label="Exchange Rate"
													value={
														expansionCycles.data[selectedExpansionCycle].exchangeRate[
															selectedExpansionData
														]
													}
													token="Debase"
													img={dai}
												/>
												<TextInfo
													isMobile={isMobile}
													label="Expansion"
													value={
														parseFloat(
															(expansionCycles.data[selectedExpansionCycle]
																.cycleExpansion[selectedExpansionData] -
																1) /
																expansionCycles.data[selectedExpansionCycle].curveValue[
																	selectedExpansionData
																]
														).toFixed(6) * 1
													}
													token="Debase"
													img={debase}
												/>
												<TextInfo
													isMobile={isMobile}
													label="Curve Value"
													value={parseFloat(
														expansionCycles.data[selectedExpansionCycle].curveValue[
															selectedExpansionData
														]
													).toFixed(6)}
													noImage={true}
												/>
												<TextInfo
													isMobile={isMobile}
													label="Expansion Scaled"
													value={parseFloat(
														expansionCycles.data[selectedExpansionCycle].cycleExpansion[
															selectedExpansionData
														] - 1
													).toFixed(6)}
													token="Debase"
													img={debase}
												/>
											</Fragment>
										</tbody>
									</table>
								</Fragment>
							) : null}
							<div className="divider">Reward Cycles Information</div>

							<table className="table is-fullwidth">
								<tbody>
									{rewardCycles.data && rewardCycles.data.length !== 0 ? (
										<Fragment>
											<TextInfo
												isMobile={isMobile}
												label="Reward Cycle Id"
												value={rewardCycles.data}
												isDropDown={true}
												setSelectedDepositIndex={setSelectedRewardCycle}
											/>
											<TextInfo
												isMobile={isMobile}
												label="Balance"
												value={
													debaseBalance !== undefined ? (
														parseFloat(formatEther(debaseBalance)).toFixed(4) * 1
													) : (
														'0'
													)
												}
												token="Debase"
												img={debase}
											/>
											<TextInfo
												isMobile={isMobile}
												label="Epochs"
												value={rewardCycles.data[selectedRewardCycle].epochsToReward}
												noImage={true}
											/>

											<TextInfo
												isMobile={isMobile}
												label="Reward Block Period"
												value={rewardCycles.data[selectedRewardCycle].rewardBlockPeriod}
												noImage={true}
											/>
											<TextInfo
												isMobile={isMobile}
												label="Oracle Block Period"
												value={rewardCycles.data[selectedRewardCycle].oracleBlockPeriod}
												noImage={true}
											/>
											<TextInfo
												isMobile={isMobile}
												label="Reward Accrued Before Scaling"
												value={
													parseFloat(
														parseFloat(formatEther(debaseSupply)) *
															rewardCycles.data[selectedRewardCycle].rewardShare
													).toFixed(4) * 1
												}
												token="Debase"
												img={debase}
											/>

											<TextInfo
												isMobile={isMobile}
												label="Epochs Rewarded"
												value={rewardCycles.data[selectedRewardCycle].epochsRewarded}
												noImage={true}
											/>
											<TextInfo
												isMobile={isMobile}
												label="Total Coupons Issued"
												value={rewardCycles.data[selectedRewardCycle].couponsIssued}
												token="Coupons"
												img={empty}
											/>
											{rewardCycles.data[selectedRewardCycle].users.length !== 0 &&
											debaseSupply ? (
												<Fragment>
													<TextInfo
														isMobile={isMobile}
														label="Coupons Balance"
														value={
															rewardCycles.data[selectedRewardCycle].users[0]
																.couponBalance
														}
														token="Coupons"
														img={empty}
													/>
													<CouponInfo
														id={rewardCycles.data[selectedRewardCycle].id}
														debaseSupply={debaseSupply}
													/>
												</Fragment>
											) : null}
										</Fragment>
									) : null}
								</tbody>
							</table>
							{rewardCycles.data &&
							rewardCycles.data[selectedRewardCycle].users.length &&
							rewardCycles.data[selectedRewardCycle].users[0].couponBalance != 0 ? (
								<button
									className={
										claimLoading ? (
											'mt-2 mb-2 button is-loading is-link is-fullwidth  is-edged'
										) : (
											'mt-2 mb-2 button is-link is-fullwidth is-edged'
										)
									}
									onClick={handleClaim}
								>
									Claim Selected Cycle Reward
								</button>
							) : null}

							{rewardCycles.data && rewardCycles.data[selectedRewardCycle].distributions.length ? (
								<button
									className="mt-2 mb-2 button is-info is-fullwidth is-edged"
									onClick={() => setHideDistribution(!hideDistribution)}
								>
									Show Distribution Cycles
								</button>
							) : null}

							{!hideDistribution ? (
								<Fragment>
									<div className="divider">Distribution Cycles Information</div>
									<Curve
										mean={
											rewardCycles.data[selectedRewardCycle].distributions[
												selectedDistributionCycle
											].mean
										}
										deviation={
											rewardCycles.data[selectedRewardCycle].distributions[
												selectedDistributionCycle
											].deviation
										}
										peakScaler={
											rewardCycles.data[selectedRewardCycle].distributions[
												selectedDistributionCycle
											].peakScaler
										}
									/>
									<table className="table is-fullwidth">
										<tbody>
											<TextInfo
												isMobile={isMobile}
												label="Distribution Cycle Id"
												value={rewardCycles.data[selectedRewardCycle].distributions}
												isDropDown={true}
												setSelectedDepositIndex={setSelectedDistributionCycle}
											/>
											<TextInfo
												isMobile={isMobile}
												label="Cycle Reward"
												value={
													parseFloat(formatEther(debaseSupply)) *
													rewardCycles.data[selectedRewardCycle].debasePerEpoch
												}
												token="Debase"
												img={debase}
											/>
											<TextInfo
												isMobile={isMobile}
												label="Price"
												value={parseFloat(
													rewardCycles.data[selectedRewardCycle].distributions[
														selectedDistributionCycle
													].exchangeRate
												)}
												token="Dai"
												img={dai}
											/>
											<TextInfo
												isMobile={isMobile}
												label="Curve Multiplier"
												value={
													rewardCycles.data[selectedRewardCycle].distributions[
														selectedDistributionCycle
													].curveValue
												}
												token="Debase"
												img={debase}
											/>

											<TextInfo
												isMobile={isMobile}
												label="Max Reward to Distribute"
												value={
													parseFloat(formatEther(debaseSupply)) *
													rewardCycles.data[selectedRewardCycle].distributions[
														selectedDistributionCycle
													].poolTotalShare
												}
												token="Debase"
												img={debase}
											/>
										</tbody>
									</table>
								</Fragment>
							) : null}
						</div>

						{rewardCycles.data && setting.data && setting.data.lastRebase === 'NEGATIVE' ? (
							<Fragment>
								<div className="divider">Coupon Buying Information</div>
								<table className="table is-fullwidth">
									<tbody>
										<TextInfo
											isMobile={isMobile}
											label="Coupon Buy Threshold"
											value={0.95}
											token="Debase"
											img={debase}
										/>
										<TextInfo
											isMobile={isMobile}
											label="Last Oracle TWAP"
											value={
												parseFloat(
													rewardCycles.data[selectedRewardCycle].oracleLastPrices[
														rewardCycles.data[selectedRewardCycle].oracleLastPrices.length -
															1
													]
												).toFixed(4) * 1
											}
											token="Debase"
											img={debase}
										/>
										<TextInfo
											isMobile={isMobile}
											label="Current Coupon Oracle TWAP"
											value={parseFloat(formatEther(couponOraclePrice[1])).toFixed(4) * 1}
											token="Debase"
											img={debase}
										/>

										<TextInfo
											isMobile={isMobile}
											label="Coupon TWAP Updates In"
											value={
												rewardCycles.data[selectedRewardCycle].oracleNextUpdates[
													rewardCycles.data[selectedRewardCycle].oracleNextUpdates.length - 1
												] -
													blockNumber >=
												0 ? (
													rewardCycles.data[selectedRewardCycle].oracleNextUpdates[
														rewardCycles.data[selectedRewardCycle].oracleNextUpdates
															.length - 1
													]
												) : (
													0
												)
											}
											token="Debase"
											img={debase}
										/>
									</tbody>
								</table>
								<PoolInput
									couponBalance={parseFloat(
										rewardCycles.data[selectedRewardCycle].users.length
											? rewardCycles.data[selectedRewardCycle].users[0].couponBalance
											: 0
									)}
									couponIssued={parseFloat(rewardCycles.data[selectedRewardCycle].couponsIssued)}
									rewardAccrued={parseFloat(rewardCycles.data[selectedRewardCycle].rewardShare)}
									debaseSupply={parseFloat(formatEther(debaseSupply))}
									showDepositReward={true}
									action={handleBuyCoupons}
									loading={stakingLoading}
									buttonText="Buy Coupons"
									ref={couponRef}
									balance={debaseBalance}
									placeholderText="Enter deposit amount"
									unit={18}
								/>
							</Fragment>
						) : null}
					</Fragment>
				)}
			</div>
		</div>
	);
}
