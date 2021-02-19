import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { debasePolicyAbi, fetcher, contractAddress } from '../../utils/index';

export default function Stabilizers() {
	const { library } = useWeb3React();

	const { data: thresholdCounter } = useSWR([ contractAddress.debasePolicy, 'stabilizerPools', 1 ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: thresholdCounterV2Eth } = useSWR([ contractAddress.debasePolicy, 'stabilizerPools', 5 ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: expansionRewarder } = useSWR([ contractAddress.debasePolicy, 'stabilizerPools', 7 ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const { data: burnPool } = useSWR([ contractAddress.debasePolicy, 'stabilizerPools', 6 ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const data = [
		{
			name: 'SP1 V1 Dai/Debase',
			type: 'Passive Pool',
			description:
				'This stabilizer counts the number of positive rebases until a random threshold, sampled from a normal distribution, is hit. Once the threshold is hit, counter is reset and the pool starts to reward DEBASE for staked DEBASE/DAI LPs, as per parameters decided by governance.',
			status: thresholdCounter,
			link: 'thresholdCounter'
		},
		{
			name: 'SP1 V2 Eth/Debase',
			type: 'Passive Pool',
			description:
				'This stabilizer counts the number of positive rebases until a random threshold, sampled from a normal distribution, is hit. Once the threshold is hit, counter is reset and the pool starts to reward DEBASE for staked DEBASE/ETH LPs, as per parameters decided by governance.',
			status: thresholdCounterV2Eth,
			link: 'thresholdCounter-v2-eth-debase'
		},
		{
			name: 'SP1 V3 Dai/Debase',
			type: 'Passive Pool',
			description:
				'This stabilizer rewards Debase when the last rebase was in expansion or stability. It stops rewarding when Debase goes into a contraction',
			status: expansionRewarder,
			link: 'expansion-rewarder-dai-debase'
		},
		{
			name: 'SP2 V1',
			type: 'Active Pool',
			description:
				'SP2: Issues and redeems d-bills. Users compete to get d-bills and disallow others from getting d-bills by shutting the door on buying them.',
			status: burnPool,
			link: 'burnPool'
		}
	];

	return (
		<div className="columns is-multiline is-centered is-vcentered">
			{data.map((ele, index) => (
				<div key={index} className="column is-4">
					<div className="block boxs">
						<h3 className="title is-size-5-tablet is-size-6-mobile has-text-centered is-family-secondary">
							{ele.name}
						</h3>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile has-text-centered">{ele.type}</h5>
						<div className="content">
							<p>{ele.description}</p>
						</div>
						<h5 className="title is-5 has-text-centered">
							Status: {ele.status !== undefined ? ele.status[0] ? 'Enabled' : 'Disabled' : '...'}
						</h5>
						<div className="block">
							<Link to={'/dapp/stabilizers/' + ele.link}>
								<button className="button is-edged is-fullwidth is-primary">Access</button>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
