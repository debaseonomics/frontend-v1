import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { debasePolicyAbi, fetcher, contractAddress } from '../../utils/index';

export default function Incentivizers() {
	const { library } = useWeb3React();

	const { data: degovEthPoolStatus } = useSWR([ contractAddress.debasePolicy, 'stabilizerPools', 2 ], {
		fetcher: fetcher(library, debasePolicyAbi)
	});

	const data = [
		{
			name: 'Degov Eth',
			description:
				'Incentivizes DEGOV/ETH LP with continous DEBASE rewards, calculated in percentage of total supply of Debase for robustness',
			link: 'degov-eth'
		}
	];

	console.log(degovEthPoolStatus);

	return (
		<div className="columns is-multiline is-centered is-vcentered">
			{data.map((ele, index) => (
				<div key={index} className="column is-4">
					<div className="block boxs">
						<h3 className="title is-size-5-tablet is-size-6-mobile has-text-centered is-family-secondary">
							{ele.name}
						</h3>
						<div className="content">
							<p>{ele.description}</p>
						</div>
						<h5 className="title is-5 has-text-centered">
							Status:{' '}
							{degovEthPoolStatus !== undefined ? degovEthPoolStatus[0] ? 'Enabled' : 'Disabled' : '...'}
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
