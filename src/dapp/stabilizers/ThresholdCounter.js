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
	thresholdCounterAbi,
	lpAbi
} from '../../utils/index';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther, formatUnits } from 'ethers/lib/utils';

export default function ThresholdCounter() {
	let history = useHistory();
	const { library } = useWeb3React();
	const [ hideStake, setHideStake ] = useState(true);

	const numberFormat = (value) =>
		new Intl.NumberFormat('en-US', {
			style: 'decimal'
		}).format(value);

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
	const { data: balance } = useSWR([ contractAddress.debase, 'balanceOf', contractAddress.stabilizerPool ], {
		fetcher: fetcher(library, lpAbi)
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

	const paramsData = [
		{
			label: 'Reward',
			value: rewardPercentage ? formatEther(rewardPercentage) * 100 + '%' : '...',
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
			label: 'Current Count',
			value: count ? parseInt(formatUnits(count, 0)) : '...',
			toolTip: 'The number of positive rebases since start of last rewards period'
		},
		{
			label: 'Last Random Threshold',
			value: randomThreshold ? 5 : '...',
			toolTip:
				'A number drawn every rebase from a normal distribution. If Count>= Random number, a reward period begins'
		},
		{
			label: 'Total Pool Limit',
			value:
				poolLpLimit && totalSupply
					? parseFloat(formatEther(totalSupply)).toFixed(2) + ' / ' + formatEther(poolLpLimit) + ' LP'
					: '...',
			toolTip: 'Total LP limit per pool'
		},
		{
			label: 'Current Pool Reward',
			value: balance ? parseFloat(formatEther(balance)) : '...',
			toolTip: 'Current pool rewards available'
		},
		{
			label: 'TVL',
			value: '$' + numberFormat('752037.01057')
		},
		{
			label: 'APR',
			value: '340%'
		}
	];

	const sPoolData = [
		{
			label: 'Total Pool Limit',
			value:
				poolLpLimit && totalSupply
					? parseFloat(formatEther(totalSupply)).toFixed(2) + ' / ' + formatEther(poolLpLimit) + ' LP'
					: '...',
			toolTip: 'Total LP limit per pool'
		}
	];

	return (
		<div className="columns is-centered">
			<div className="box boxs column is-6">
				<div className=" has-text-centered">
					<h3 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">Threshold Counter</h3>
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
									href={etherScanAddress + contractAddress.stabilizerPool}
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
									{turncate(contractAddress.stabilizerPool, 18, '...')}
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
											fill-rule="evenodd"
											clip-rule="evenodd"
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
									DEBASE / DAI LP
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
