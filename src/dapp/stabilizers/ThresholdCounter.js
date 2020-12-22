import React, { Fragment, useState } from 'react';
import Pool from '../Pool';
import debase from '../../assets/debase.png';
import empty from '../../assets/empty.png';
import { useHistory } from 'react-router-dom';
import {
	contractAddress,
	etherScanAddress,
	turncate,
	fetcher,
	randomNumberAbi,
	thresholdCounterAbi
} from '../../utils/index';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther, formatUnits } from 'ethers/lib/utils';

export default function ThresholdCounter() {
	let history = useHistory();
	const { library } = useWeb3React();
	const [ hideStake, setHideStake ] = useState(true);

	const { data: rewardPercentage } = useSWR([ contractAddress.stabilizerPool, 'rewardPercentage' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: countInSequence } = useSWR([ contractAddress.stabilizerPool, 'countInSequence' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: beforePeriodFinish } = useSWR([ contractAddress.stabilizerPool, 'beforePeriodFinish' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: duration } = useSWR([ contractAddress.stabilizerPool, 'duration' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: poolEnabled } = useSWR([ contractAddress.stabilizerPool, 'poolEnabled' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: poolLpLimit } = useSWR([ contractAddress.stabilizerPool, 'poolLpLimit' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: enablePoolLpLimit } = useSWR([ contractAddress.stabilizerPool, 'enablePoolLpLimit' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: balance } = useSWR([ contractAddress.stabilizerPool, 'balanceOf', contractAddress.stabilizerPool ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: userLpLimit } = useSWR([ contractAddress.stabilizerPool, 'userLpLimit' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: enableUserLpLimit } = useSWR([ contractAddress.stabilizerPool, 'enableUserLpLimit' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: revokeRewardPrecentage } = useSWR([ contractAddress.stabilizerPool, 'revokeRewardPrecentage' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: revokeReward } = useSWR([ contractAddress.stabilizerPool, 'revokeReward' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: count } = useSWR([ contractAddress.stabilizerPool, 'count' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: noramlDistributionMean } = useSWR([ contractAddress.stabilizerPool, 'noramlDistributionMean' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: normalDistributionDeviation } = useSWR(
		[ contractAddress.stabilizerPool, 'normalDistributionDeviation' ],
		{
			fetcher: fetcher(library, thresholdCounterAbi)
		}
	);

	const { data: totalSupply } = useSWR([ contractAddress.stabilizerPool, 'totalSupply' ], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});
	const { data: randomNumber } = useSWR([ contractAddress.randomNumber, 'randomResult' ], {
		fetcher: fetcher(library, randomNumberAbi)
	});

	const { data: randomThreshold } = useSWR(
		[
			contractAddress.stabilizerPool,
			'normalDistribution',
			randomNumber ? parseInt(formatEther(randomNumber)) % 100 : 0
		],
		{
			fetcher: fetcher(library, thresholdCounterAbi)
		}
	);

	console.log(randomNumber ? parseInt(formatEther(randomNumber)) % 100 : 0);
	console.log(randomNumber ? formatEther(randomNumber) : 0);

	const paramsData = [
		{
			label: 'Reward Percentage',
			value: rewardPercentage ? formatEther(rewardPercentage) + '%' : '...',
			toolTip: 'Percentage of stabilizer rewards contract requested as reward per reward duration'
		},
		{
			label: 'Threshold Condition',
			value: 'Indicator (y ≥ X), X ~ N(5,2)',
			toolTip:
				'Condition to check if threshold is hit for rewards period to start. y is number of positive rebases since last reward period start'
		},
		{
			label: 'Count In Sequence',
			value: countInSequence !== undefined ? (countInSequence ? 'True' : 'False') : '...',
			toolTip: 'Count positive rebases in sequence'
		},
		{
			label: 'Before Period Finish',
			value: beforePeriodFinish !== undefined ? (beforePeriodFinish ? 'True' : 'False') : '...',
			toolTip: 'Award rewards before previous rewards have been distributed'
		},
		{
			label: 'Reward Period',
			value: duration ? (duration.toNumber() / (60 * 60)).toString() + ' Hours' : '...',
			toolTip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Pool Enabled',
			value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : '...',
			toolTip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'User Pool Limit',
			value: userLpLimit ? formatEther(userLpLimit) + ' LP' : '...',
			toolTip: 'LP limit per wallet'
		},
		{
			label: 'Revoke Reward',
			value: revokeRewardPrecentage
				? parseFloat(formatEther(revokeRewardPrecentage) * 100).toFixed(2) + '%'
				: '...',
			toolTip: 'Percentage of rewards that will be revoked if positive rebases stop'
		},
		{
			label: 'Current Pool LP',
			value: totalSupply ? parseFloat(formatEther(totalSupply)).toFixed(2) + ' LP' : '...',
			toolTip: 'Current LP in pool'
		},
		{
			label: 'Total Pool Limit',
			value: poolLpLimit ? formatEther(poolLpLimit) + ' LP' : '...',
			toolTip: 'Total LP limit per pool'
		},
		{
			label: 'Current Count',
			value: count ? parseInt(formatUnits(count, 0)) : '...',
			toolTip: 'Percentage of rewards that will be revoked if positive rebases stop'
		},
		{
			label: 'Last Random Threshold',
			value: randomThreshold ? 3 : '...',
			toolTip: 'Percentage of rewards that will be revoked if positive rebases stop'
		},
		{
			label: 'Current Pool Reward',
			value: randomThreshold ? balance : '...',
			toolTip: 'Current pool rewards available'
		}
	];

	const sPoolData = [
		{
			label: 'Total Pool Limit',
			value: poolLpLimit ? formatEther(poolLpLimit) + ' LP' : '...',
			toolTip: 'Total LP limit per pool'
		}
	];

	return (
		<div className="columns is-centered">
			<div className="box boxs column is-6">
				<div className=" has-text-centered">
					<h3 className="title is-size-4-tablet is-size-5-mobile  is-family-secondary">Threshold Counter</h3>
					<span className="delete is-pulled-right" onClick={() => history.goBack()} />
				</div>
				<div className="infowrapper">
					<div className="contractinfo">
						<div className="desc">
							<h5 className="pr-1 pl-1 pt-2 subtitle is-size-5-tablet is-size-6-mobile">
								This stabilizer counts the number of positive rebases until a random thresholdis hit,
								sampled from a normal distribution. Once the threshold is hit, counter is reset and the
								pool starts to reward DEBASE for staked DEBASE/DAI LPs, as per the parameters mentioned.
							</h5>
							<span className="is-inline subtitle is-size-5-tablet is-size-6-mobile mb-0">
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
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={etherScanAddress + contractAddress.stabilizerPool}
								>
									{turncate(contractAddress.stabilizerPool, 18, '...')}
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
						<div className="divider">Staking</div>
						<Pool
							showName={false}
							tokenText="Dai-lp"
							rewardText="Debase"
							poolName="Debase/Dai-lp"
							unit={18}
							rewardTokenImage={debase}
							stakeTokenImage={empty}
							tokenAddress={contractAddress.debaseDaiLp}
							rewardTokenAddress={contractAddress.debase}
							poolAddress={contractAddress.stabilizerPool}
						/>
					</Fragment>
				)}
			</div>
		</div>
	);
}
