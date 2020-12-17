import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { debasePolicyAbi, fetcher, contractAddress } from '../../utils/index';

export default function Stabilizers() {
	const { library } = useWeb3React();

	const { data: thresholdCounter } = useSWR([ contractAddress.debasePolicy, 'stabilizerPools', 0 ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const data = [
		{
			name: 'Threshold Counter',
			type: 'Passive Pool',
			description:
				'This stabilizer counts the number of positive rebases until a random threshold, sampled from a normal distribution, is hit. Once the threshold is hit, counter is reset and the pool starts to reward DEBASE for staked DEBASE/DAI LPs, as per parameters decided by governance.',
			status: 'Inactive',
			link: 'thresholdCounter'
		}
	];

	return (
		<div className="columns is-multiline is-centered is-vcentered">
			{data.map((ele, index) => (
				<div key={index} className="column is-4">
					<div className="block box">
						<h3 className="title is-size-5-tablet is-size-6-mobile has-text-centered is-family-secondary">
							{ele.name}
						</h3>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile has-text-centered">{ele.type}</h5>
						<div className="content">
							<p>{ele.description}</p>
						</div>
						<h5 className="title is-5 has-text-centered">
							Status:{' '}
							{thresholdCounter !== undefined ? thresholdCounter[0] ? 'Disabled' : 'Enabled' : '...'}
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
