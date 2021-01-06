import React, { Fragment, useState } from 'react';
import Pool from '../Pool';
import debase from '../../assets/debase.png';
import empty from '../../assets/empty.png';
import { useHistory } from 'react-router-dom';
import { contractAddress, etherScanAddress, turncate, fetcher, incentivizerAbi, lpAbi } from '../../utils/index';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';

export default function DegovEth() {
	let history = useHistory();
	const { library } = useWeb3React();
	const [ hideStake, setHideStake ] = useState(true);

	const { data: rewardPercentage } = useSWR([ contractAddress.degovEthPool, 'rewardPercentage' ], {
		fetcher: fetcher(library, incentivizerAbi)
	});

	const { data: blockDuration } = useSWR([ contractAddress.degovEthPool, 'blockDuration' ], {
		fetcher: fetcher(library, incentivizerAbi)
	});
	const { data: poolEnabled } = useSWR([ contractAddress.degovEthPool, 'poolEnabled' ], {
		fetcher: fetcher(library, incentivizerAbi)
	});
	const { data: poolLpLimit } = useSWR([ contractAddress.degovEthPool, 'poolLpLimit' ], {
		fetcher: fetcher(library, incentivizerAbi)
	});
	const { data: enablePoolLpLimit } = useSWR([ contractAddress.degovEthPool, 'enablePoolLpLimit' ], {
		fetcher: fetcher(library, incentivizerAbi)
	});

	const { data: userLpLimit } = useSWR([ contractAddress.degovEthPool, 'userLpLimit' ], {
		fetcher: fetcher(library, incentivizerAbi)
	});
	const { data: enableUserLpLimit } = useSWR([ contractAddress.degovEthPool, 'enableUserLpLimit' ], {
		fetcher: fetcher(library, incentivizerAbi)
	});

	const { data: totalSupply } = useSWR([ contractAddress.degovEthPool, 'totalSupply' ], {
		fetcher: fetcher(library, incentivizerAbi)
	});

	const { data: balance } = useSWR([ contractAddress.debase, 'balanceOf', contractAddress.degovEthPool ], {
		fetcher: fetcher(library, lpAbi)
	});

	const paramsData = [
		{
			label: 'Reward',
			value: rewardPercentage ? formatEther(rewardPercentage) + '%' : '...',
			toolTip: 'Percentage of stabilizer rewards contract requested as reward per reward duration'
		},
		{
			label: 'Block Duration',
			value: blockDuration ? blockDuration + ' Blocks' : '...',
			toolTip: 'Period within which pool reward is distributed'
		},
		{
			label: 'Pool Enabled',
			value: poolEnabled !== undefined ? (poolEnabled ? 'True' : 'False') : '...',
			toolTip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'Pool Lp Limit Enabled',
			value: enablePoolLpLimit !== undefined ? (enablePoolLpLimit ? 'True' : 'False') : '...',
			toolTip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'User Lp Limit Enabled',
			value: enableUserLpLimit !== undefined ? (enableUserLpLimit ? 'True' : 'False') : '...',
			toolTip: 'Pool staking/withdraw usage status'
		},
		{
			label: 'User Lp Limit',
			value: userLpLimit ? formatEther(userLpLimit) + ' LP' : '...',
			toolTip: 'LP limit per wallet'
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
		}
	];

	return (
		<div className="columns is-centered">
			<div className="box boxs column is-6">
				<div className=" has-text-centered">
					<h3 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">
						Degov Eth Incentivizer
					</h3>
					<span className="delete is-pulled-right" onClick={() => history.goBack()} />
				</div>
				<div className="infowrapper">
					<div className="contractinfo">
						<div className="desc">
							<h5 className="pt-2 pl-1 pr-1 subtitle is-size-5-tablet is-size-6-mobile">
								Incentivizes holding Degov Eth LP by giving debase as a continuous reward
							</h5>
							<span className="mb-0 subtitle is-size-5-tablet is-size-6-mobile">
								<a
									className="is-primary"
									target="_blank"
									rel="noopener noreferrer"
									href={etherScanAddress + contractAddress.degovEthPool}
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
									{turncate(contractAddress.degovEthPool, 18, '...')}
								</a>
								<a
									className="is-primary"
									target="_blank"
									rel="noopener noreferrer"
									href="https://app.uniswap.org/#/add/ETH/0x469E66e06fEc34839E5eB1273ba85A119B8D702F"
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
									DEGOV / ETH LP
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
							tokenText="Degov/Eth-Lp"
							rewardText="Debase"
							poolName="Degov/Eth-Lp"
							unit={18}
							percents={true}
							rewardTokenImage={debase}
							stakeTokenImage={empty}
							tokenAddress={contractAddress.degovEthLp}
							rewardTokenAddress={contractAddress.debase}
							poolAddress={contractAddress.degovEthPool}
						/>
					</Fragment>
				)}
			</div>
		</div>
	);
}
