import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { debasePolicyAbi, fetcher, contractAddress } from '../../utils/index';

export default function Incentivizers() {
	const { library } = useWeb3React();

	const { data: thresholdCounter } = useSWR([contractAddress.debasePolicy, 'stabilizerPools', 0], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const data = [
		{
			name: 'Degov Eth',
			description:
				'Incentivizes degov eth lp with debase as a reward',
			status: 'Inactive',
			link: 'degovEth'
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
							Status:{' '}
							{thresholdCounter !== undefined ? thresholdCounter[0] ? 'Disabled' : 'Enabled' : '...'}
						</h5>
						<div className="block">
							<Link to={'/dapp/incentivizers/' + ele.link}>
								<button className="button is-edged is-fullwidth is-primary">Access</button>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
