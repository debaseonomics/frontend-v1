import React, { Fragment, useState } from 'react';
import Pool from '../Pool';
import debase from '../../assets/debase.png';
import empty from '../../assets/empty.png';
import { useHistory } from 'react-router-dom';
import { contractAddress, etherScanAddress, turncate, fetcher, thresholdCounterAbi } from '../../utils/index';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';

export default function ThresholdCounter() {
	let history = useHistory();
	const { library } = useWeb3React();
	const [hideStake, setHideStake] = useState(true);

	const { data: rewardAmount } = useSWR([contractAddress.stabilizerPool, 'rewardAmount'], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});

	const { data: countInSequence } = useSWR([contractAddress.stabilizerPool, 'countInSequence'], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});

	const { data: countThreshold } = useSWR([contractAddress.stabilizerPool, 'countThreshold'], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});

	const { data: beforePeriodFinish } = useSWR([contractAddress.stabilizerPool, 'beforePeriodFinish'], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});

	const { data: duration } = useSWR([contractAddress.stabilizerPool, 'duration'], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});

	const { data: poolEnabled } = useSWR([contractAddress.stabilizerPool, 'poolEnabled'], {
		fetcher: fetcher(library, thresholdCounterAbi)
	});

	console.log(countThreshold, countInSequence);

	const paramsData = [
		{
			label: 'Reward %',
			//value: rewardAmount ? formatEther(rewardAmount) : '...',
			value: '0.0055',
			toolTip: 'Rewards requested by the the stabilizers'
		},
		{
			label: 'Threshold Condition',
			value: 'Indicator (y ≥ X), X ~ N(5,2)',
			//value: countThreshold ? countThreshold.toNumber() : '...',
			toolTip: 'Condition to check if threshold is hit for rewards period to start. y is number of positive rebases since last reward period start'
		},
		{
			label: 'Count In Sequence',
			value: countInSequence !== undefined ? (countInSequence ? 'True' : 'False') : '...',
			toolTip: 'Count positive rebases in sequence'
		},
		{
			label: 'Before Period Finish',
			value: 'True',
			//value: beforePeriodFinish !== undefined ? (beforePeriodFinish ? 'True' : 'False') : '...',
			toolTip: 'Award rewards before previous rewards have been distributed'
		},
		{
			label: 'Reward Period',
			value: '168h',
			//value: duration ? (duration.toNumber() / (60 * 60)).toString() + ' Hours' : '...',
			toolTip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Pool Enabled',
			value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : '...',
			toolTip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'Total Pool Limit',
			value: '30K LP',
			//value: duration ? (duration.toNumber() / (60 * 60)).toString() + ' Hours' : '...',
			toolTip: 'Total LP limit per pool'
		},
		{
			label: 'Pool Limit Wallet',
			value: '1K LP',
			//value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : '...',
			toolTip: 'LP limit per wallet'
		}
		,
		{
			label: 'Revoke Reward %',
			value: '28',
			//value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : '...',
			toolTip: 'Percentage of rewards that will be revoked'
		}
	];

	return (
		<div className="columns is-centered">
			<div className="box column is-6">
				<div className=" has-text-centered">
					<h3 className="title is-inline is-size-4-tablet is-size-5-mobile  is-family-secondary">
						Threshold Counter
					</h3>
					<span className="delete is-pulled-right" onClick={() => history.goBack()} />
				</div>
				<h5 className="pr-1 pl-1 pt-2 subtitle is-size-5-tablet is-size-6-mobile">
					This stabilizer counts the number of positive rebases until a random threshold, sampled from a normal distribution, is hit. Once the threshold is hit, counter is reset and the pool starts to reward DEBASE for staked DEBASE/DAI LPs, as per the parameters mentioned below.
				</h5>
				<div className="is-block">
					<span className="is-inline title is-size-5-tablet is-size-6-mobile mb-0">Contract:</span>
					<span className="is-inline subtitle is-size-5-tablet is-size-6-mobile mb-0">
						{' '}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={etherScanAddress + contractAddress.stabilizerPool}
						>
							{turncate(contractAddress.stabilizerPool, 18, '...')}
						</a>
					</span>
				</div>
				<div className="divider">Stabilizer Variables</div>
				<div className="columns is-multiline is-mobile">
					{paramsData.map((ele, index) => (
						<div key={index} className="column is-4 has-text-centered ">
							<h5
								data-tooltip={ele.toolTip}
								style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
								className="title is-size-5-tablet is-size-6-mobile has-tooltip-arrow"
							>
								{ele.label}
							</h5>
							<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{ele.value}</h5>
						</div>
					))}
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
