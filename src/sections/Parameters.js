import React from 'react';
import ParametersCard from '../components/ParametersCard';

const Parameters = React.forwardRef(
	// eslint-disable-next-line
	({}, ref) => {
		const editableList = [
			{ heading: 'Rebase Interval', info: 'Minimum time before a rebase' },
			{ heading: 'Rebase Offset', info: 'When a rebase can happen' },
			{ heading: 'Default Rebase Lag', info: 'Symmetrical dampening rebase changes' },
			{ heading: 'Rebase Lag Breakpoints', info: 'Asymmetrical dampening of rebase changes' },
			{ heading: 'Rebase Window', info: 'Period within a rebase can execute' },
			{ heading: 'Upper Deviation Threshold', info: 'Upper target threshold within not to rebase' },
			{ heading: 'Lower Deviation Threshold', info: 'Lower target threshold within not to rebase' },
			{ heading: 'Quorum Threshold', info: 'Votes needed to pass a proposal' },
			{ heading: 'Proposal Threshold', info: 'Token needed to start a proposal' },
			{ heading: 'Voting Delay', info: 'Delay before voting on a proposal' },
			{ heading: 'Voting Period', info: 'Period for voting on a proposal' },
			{ heading: 'Execution Delay', info: 'Delay before passed proposal can execute' },
			{ heading: 'Grace Period', info: 'Period within which a passed proposal can execute' }
		];

		return (
			<div className="section" ref={ref}>
				<div className="container block is-fluid ">
					<h3 className="title is-size-3-tablet is-size-4-mobile">Parameters</h3>
					<h4 className="subtitle is-size-4-tablet is-size-5-mobile">Editable parameters</h4>
				</div>
				<div className="container block is-fluid ">
					<div className="columns is-multiline is-mobile is-vcentered">
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
