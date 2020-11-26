import React, { Fragment, useEffect, useState } from 'react';
import { contractAddress, orchestratorAbi, debasePolicyAbi, uniAbi, toaster, fetcher } from '../utils/index';
import { useWeb3React } from '@web3-react/core';
import { DateTime } from 'luxon';
import { formatEther } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import { request, gql } from 'graphql-request';
import useSWR from 'swr';
import dai from '../assets/dai.png';

const query = gql`
	{
		rebases(orderBy: epoch, orderDirection: desc) {
			epoch
			exchangeRate
			supplyAdjustment
			rebaseLag
			timestamp
		}
	}
`;

export default function Rebaser() {
	const { library } = useWeb3React();
	const [ loading, setLoading ] = useState(false);
	const [ pastRebases, setPastRebases ] = useState([]);

	const { data: getMaximumRebaseTime } = useSWR([ contractAddress.orchestrator, 'maximumRebaseTime' ], {
		fetcher: fetcher(library, orchestratorAbi)
	});

	const { data: priceTargetRate } = useSWR([ contractAddress.debasePolicy, 'priceTargetRate' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: upperDeviationThreshold } = useSWR([ contractAddress.debasePolicy, 'upperDeviationThreshold' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: lowerDeviationThreshold } = useSWR([ contractAddress.debasePolicy, 'lowerDeviationThreshold' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: useDefaultRebaseLag } = useSWR([ contractAddress.debasePolicy, 'useDefaultRebaseLag' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: defaultPositiveRebaseLag } = useSWR([ contractAddress.debasePolicy, 'defaultPositiveRebaseLag' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: defaultNegativeRebaseLag } = useSWR([ contractAddress.debasePolicy, 'defaultNegativeRebaseLag' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: minRebaseTimeIntervalSec } = useSWR([ contractAddress.debasePolicy, 'minRebaseTimeIntervalSec' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: lastRebaseTimestampSec } = useSWR([ contractAddress.debasePolicy, 'lastRebaseTimestampSec' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: rebaseWindowOffsetSec } = useSWR([ contractAddress.debasePolicy, 'rebaseWindowOffsetSec' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: rebaseWindowLengthSec } = useSWR([ contractAddress.debasePolicy, 'rebaseWindowLengthSec' ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: reserves } = useSWR([ contractAddress.debaseDaiLp, 'getReserves' ], {
		fetcher: fetcher(library, uniAbi)
	});

	useEffect(() => {
		async function rebase() {
			let res = await request('https://api.thegraph.com/subgraphs/name/debaseonomics/subgraph', query);
			if (res.length) {
				setPastRebases([ ...res ]);
			}
		}
		rebase();
	}, []);

	async function handleRebase() {
		setLoading(true);
		const orchestratorContract = new Contract(contractAddress.orchestrator, orchestratorAbi, library.getSigner());
		try {
			await orchestratorContract.rebase();
			toaster('Rebase successfully executed', 'is-success');
		} catch (error) {
			toaster('Rebase failed, please try again', 'is-danger');
		}
		setLoading(false);
	}

	const paramsData = [
		{
			label: 'Target Price',
			value: priceTargetRate ? parseFloat(formatEther(priceTargetRate)) : '...',
			toolTip: 'The target price in dai debase must meet',
			image: dai
		},
		{
			label: 'Price Upper Deviation',
			value:
				upperDeviationThreshold && priceTargetRate
					? parseFloat(formatEther(upperDeviationThreshold)) + parseFloat(formatEther(priceTargetRate))
					: '...',
			toolTip: 'The positive deviation from the target price within not to rebase',
			image: dai
		},
		{
			label: 'Price Lower Deviation',
			value: lowerDeviationThreshold
				? parseFloat(formatEther(priceTargetRate)) - parseFloat(formatEther(lowerDeviationThreshold))
				: '...',
			toolTip: 'The negative deviation from the target price within not to rebase',
			image: dai
		},
		{
			label: 'Rebase Time Period',
			value: minRebaseTimeIntervalSec
				? (minRebaseTimeIntervalSec.toNumber() / (60 * 60)).toString() + ' Hours'
				: '...',
			toolTip: 'Time period after which a rebase can occur'
		},
		{
			label: 'Rebase Offset',
			value: rebaseWindowOffsetSec ? rebaseWindowOffsetSec.toNumber() : '...',
			toolTip: 'The number of seconds from the beginning of the rebase interval, where the rebase window begins'
		},
		{
			label: 'Rebase Window',
			value: rebaseWindowLengthSec ? rebaseWindowLengthSec.toNumber() : '...',
			toolTip: 'The length of time within which a rebase can occur'
		},
		{
			label: 'Use default Lag',
			value: useDefaultRebaseLag !== undefined ? (useDefaultRebaseLag ? 'True' : 'False') : '...',
			toolTip: 'Flag to allow usage of default supply smoothing'
		},
		{
			label: 'Default Upper lag',
			value: defaultPositiveRebaseLag ? defaultPositiveRebaseLag.toNumber() : '...',
			toolTip: 'Default supply smoothing to use for positive supply changes'
		},
		{
			label: 'Default Lower lag',
			value: defaultNegativeRebaseLag ? defaultNegativeRebaseLag.toNumber() : '...',
			toolTip: 'Default supply smoothing to use for negative supply changes'
		}
	];

	const liveData = [
		{
			label: 'Current Price',
			value: reserves
				? parseFloat(parseFloat(formatEther(reserves[0])) / parseFloat(formatEther(reserves[1]))).toFixed(2)
				: '...',
			toolTip: 'Current market price of debase in relation to dai',
			image: dai
		},
		{
			label: 'Time to first rebase',
			value: getMaximumRebaseTime
				? DateTime.fromSeconds(getMaximumRebaseTime.toNumber()).toRelative({ round: false })
				: '...',
			toolTip: 'Time to first rebase of debase'
		},
		{
			label: 'Last Rebase',
			value: lastRebaseTimestampSec
				? lastRebaseTimestampSec.toNumber() == 0
					? "Hasn't Happened"
					: DateTime.fromSeconds(lastRebaseTimestampSec.toNumber()).toRelative({ round: false })
				: '...',
			toolTip: 'Time since the last rebase happened'
		}
	];

	return (
		<div className="columns is-centered">
			<div className="column is-7">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">rebase</h2>
					</div>
					<div className="divider">Rebasing Variables</div>
					<div className="columns is-multiline is-mobile is-centered">
						{paramsData.map((ele, index) => (
							<div key={index} className="column is-4 has-text-centered">
								{ele.image ? (
									<Fragment>
										<h5
											data-tooltip={ele.toolTip}
											style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
											className="title mb-2 is-size-5-tablet is-size-6-mobile has-tooltip-arrow"
										>
											{ele.label}
										</h5>
										<div
											style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
										>
											<h5 className="subtitle m-0 is-size-5-tablet is-size-6-mobile">
												{ele.value}
											</h5>
											<figure className="image is-24x24 ml-1 ">
												<img src={ele.image} />
											</figure>
										</div>
									</Fragment>
								) : (
									<Fragment>
										<h5
											data-tooltip={ele.toolTip}
											style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
											className="title is-size-5-tablet is-size-6-mobile has-tooltip-arrow"
										>
											{ele.label}
										</h5>
										<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{ele.value}</h5>
									</Fragment>
								)}
							</div>
						))}
					</div>
					<div className="divider">Live Variables</div>
					<div className="columns is-multiline is-mobile is-centered">
						{liveData.map((ele, index) => (
							<div key={index} className="column is-4 has-text-centered">
								{ele.image ? (
									<Fragment>
										<h5
											data-tooltip={ele.toolTip}
											style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
											className="title mb-2 is-size-5-tablet is-size-6-mobile has-tooltip-arrow"
										>
											{ele.label}
										</h5>
										<div
											style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
										>
											<h5 className="subtitle m-0 is-size-5-tablet is-size-6-mobile">
												{ele.value}
											</h5>
											<figure className="image is-24x24 ml-1 ">
												<img src={ele.image} />
											</figure>
										</div>
									</Fragment>
								) : (
									<Fragment>
										<h5
											data-tooltip={ele.toolTip}
											style={{ textDecoration: 'underline', textDecorationStyle: 'dashed' }}
											className="title is-size-5-tablet is-size-6-mobile has-tooltip-arrow"
										>
											{ele.label}
										</h5>
										<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{ele.value}</h5>
									</Fragment>
								)}
							</div>
						))}
					</div>
					<div className="block">
						<button
							onClick={handleRebase}
							className={
								loading ? (
									'button is-edged is-fullwidth is-primary is-loading'
								) : (
									'button is-edged is-fullwidth is-primary'
								)
							}
						>
							Fire Rebase
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
