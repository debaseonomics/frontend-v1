import React from 'react';
import ParametersCard from '../components/ParametersCard';

const Parameters = React.forwardRef(
	// eslint-disable-next-line
	({}, ref) => {
		const editableList = [
			{ heading: 'Price target', info: 'Debase target price' },
			{ heading: 'rebase Interval', info: 'Minimum time before a rebase' },
			{ heading: 'rebase Offset', info: 'When a rebase can happen' },
			{ heading: 'rebase Window', info: 'Period within a rebase can execute' },
			{ heading: 'Oracle', info: 'Oracle which gets current Debase/DAI price' },
			{ heading: 'Default rebase lags', info: 'Enable default dampening rebase changes' },
			{
				heading: 'rebase lag breakpoints',
				info: 'Add, update and delete asymmetrical dampening for set ranges changes'
			},
			{ heading: 'Stabilizer Pools', info: 'Add, update and delete stabilizer pools' },
			{ heading: 'Stabilizer Parameters', info: 'Any parameters related to parameter pools' },
			{ heading: 'Deviation Thresholds', info: 'Thresholds within not to rebase' },
			{ heading: 'Quorum Threshold', info: 'Votes needed to pass a proposal' },
			{ heading: 'Proposal Threshold', info: 'Token needed to start a proposal' },
			{ heading: 'Voting Delay', info: 'Delay before voting on a proposal' },
			{ heading: 'Voting Period', info: 'Period for voting on a proposal' },
			{ heading: 'Execution Delay', info: 'Delay before passed proposal can execute' },
			{ heading: 'Grace Period', info: 'Period within which a passed proposal can execute' }
		];

		return (
			<div className="section" ref={ref}>
				<div className=" block  ">
					<h3 className="title is-size-3-tablet is-size-4-mobile">Parameters</h3>
					<h4 className="subtitle is-size-4-tablet is-size-5-mobile">Editable parameters</h4>
				</div>
				<div className=" block  ">
					<div className="columns is-multiline is-vcentered">
						{editableList.map((ele, index) => (
							<ParametersCard key={index + ele.heading} heading={ele.heading} value={ele.info} />
						))}
					</div>
				</div>
			</div>
		);
	}
);

export default Parameters;
