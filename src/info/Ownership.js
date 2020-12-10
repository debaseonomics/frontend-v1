import React from 'react';
import InfoCard from '../components/InfoCard';
import { ownerShipAddress, etherScanTX } from '../utils';

const Ownership = React.forwardRef(
	// eslint-disable-next-line
	({ }, ref) => {
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
				name: 'Governor alpha',
				link: etherScanTX + ownerShipAddress.governorAlphaOwnerShip,
				info: 'Transferring ownership to timelock'
			},
			{
				name: 'Timelock',
				link: etherScanTX + ownerShipAddress.timelockOwnerShip,
				info: 'Transferring ownership to itself'
			},
			{
				name: 'Stabilizer',
				link: etherScanTX + ownerShipAddress.stabilizerOwnerShip,
				info: 'Transferring ownership to timelock'
			}
		];
		return (
			<div className="section pl-0 pr-0" ref={ref}>
				<div className=" block ">
					<div className="box content box content is-medium">
						<h3 className="title is-size-3-tablet is-size-4-mobile is-family-secondary">Ownership</h3>
						<h4 className="subtitle is-size-4-tablet is-size-5-mobile has-text-grey-darker">
							Contract ownership transfer transactions
					</h4>
						<div className="columns is-multiline is-vcentered">
							{list.map((ele, index) => (
								<InfoCard key={index + ele.name} name={ele.name} link={ele.link} info={ele.info} />
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default Ownership;
