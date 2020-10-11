import React from 'react';
import InfoCard from '../components/InfoCard';
import { contractAddress, etherScanAddress } from '../utils/index.js';

export default function Contracts() {
	let list = [
		{
			address: contractAddress.debase,
			name: 'Debase',
			link: etherScanAddress + contractAddress.debase,
			info: 'Flexible supply ERC-20 token'
		},
		{
			address: contractAddress.degov,
			name: 'Degov',
			link: etherScanAddress + contractAddress.degov,
			info: 'Governance ERC-20 token'
		},
		{
			address: contractAddress.debasePolicy,
			name: 'Debase Policy',
			link: etherScanAddress + contractAddress.debasePolicy,
			info: 'Handles debase rebase and degov minting'
		},
		{
			address: contractAddress.orchestrator,
			name: 'Orchestrator',
			link: etherScanAddress + contractAddress.orchestrator,
			info: 'Handles pool setup and rebase entry point'
		},
		{
			address: contractAddress.governanceAlpha,
			name: 'GovernorAlpha',
			link: etherScanAddress + contractAddress.governanceAlpha,
			info: 'Handles voting and proposals'
		},
		{
			address: contractAddress.timelock,
			name: 'Timelock',
			link: etherScanAddress + contractAddress.timelock,
			info: 'Handles executing proposal'
		},
		{
			address: contractAddress.YCurvePool,
			name: 'Debase/YCurve Pool',
			link: etherScanAddress + contractAddress.YCurvePool,
			info: 'Handles initial debase seeding'
		},
		{
			address: contractAddress.USDCPool,
			name: 'Debase/USDC Pool',
			link: etherScanAddress + contractAddress.USDCPool,
			info: 'Handles incentivising debase liquidity '
		},
		{
			address: contractAddress.degovUNIPool,
			name: 'Degov Debase Pool',
			link: etherScanAddress + contractAddress.degovUNIPool,
			info: 'Handles degov distribution'
		}
	];
	return (
		<div className="section">
			<div className="container block is-fluid">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Contracts</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">List of Contracts and their addresses</h4>
			</div>
			<div className="container block is-fluid">
				<div className="columns is-mobile is-multiline is-vcentered">
					{list.map((ele, index) => (
						<InfoCard key={index + ele.name} name={ele.name} link={ele.link} info={ele.info} />
					))}
				</div>
			</div>
		</div>
	);
}
