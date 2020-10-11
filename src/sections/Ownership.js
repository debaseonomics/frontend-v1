import React from 'react';
import InfoCard from '../components/InfoCard';
import { ownerShipAddress, etherScanTX } from '../utils';

const Ownership = React.forwardRef(({}, ref) => {
	let list = [
		{
			name: 'Degov',
			link: etherScanTX + ownerShipAddress.degovOwnerShip,
			info: 'Transferring ownership to timelock'
		},
		{
			name: 'Debase Policy',
			link: etherScanTX + ownerShipAddress.debasePolicyOwnerShip,
			info: 'Transferring ownership to timelock'
		},
		{
			name: 'Orchestrator',
			link: etherScanTX + ownerShipAddress.orchestratorOwnerShip,
			info: 'Transferring ownership to timelock'
		},
		{
			name: 'GovernorAlpha',
			link: etherScanTX + ownerShipAddress.governorAlphaOwnerShip,
			info: 'Transferring ownership to timelock'
		},
		{
			name: 'Timelock',
			link: etherScanTX + ownerShipAddress.timelockOwnerShip,
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
});

export default Ownership;
