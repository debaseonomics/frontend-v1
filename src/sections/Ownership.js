import React from 'react';
import InfoCard from '../components/InfoCard';

export default function Ownership() {
	let list = [
		{
			name: 'Degov',
			link: 'https://etherscan.io/tx/0x3f70039e3d77ba582c000ea2ede8a4e0d705cd6638bb47bcce8937ad82a207eb',
			info: 'Transferring ownership to timelock'
		},
		{
			name: 'Debase Policy',
			link: 'https://etherscan.io/tx/0x471b397a6ef630b535b7b330b414a390b70899ceca28a389e917b4e5862123de',
			info: 'Transferring ownership to timelock'
		},
		{
			name: 'Orchestrator',
			link: 'https://etherscan.io/tx/0x121a27b6e8f14104b58104af7d13a79083633b3dbe0525b013611866a5632fc4',
			info: 'Transferring ownership to timelock'
		},
		{
			name: 'GovernorAlpha',
			link: 'https://etherscan.io/tx/0xdc89824dc956cfb1672edabc00393101ea44f0504a782b813c351f985029c6b2',
			info: 'Transferring ownership to timelock'
		},
		{
			name: 'Timelock',
			link: 'https://etherscan.io/tx/0x131af46f1f93cb9aa6ef0a745161ffa3b95052e529eaecaebc89a6e8fa73efee',
			info: 'Transferring ownership to itself'
		}
	];
	return (
		<div className="section">
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Ownership</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">Contract ownership transfer transactions</h4>
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
