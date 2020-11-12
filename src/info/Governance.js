import React from 'react';

export default function Governance({ scrollToParameters, scrollToOwnership, isMobile }) {
	return (
		<div className="section pl-0 pr-0">
			<div className=" block  ">
				<h3 className="title is-size-3-tablet is-size-5-mobile is-family-secondary">Governance</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile has-text-grey-darker">
					How governance works
				</h4>
			</div>
			<div className=" block  ">
				<div className={isMobile ? 'box content' : 'box content is-medium'}>
					<p>
						DEGOV tokens represent a vote in the governance of the protocol. The token allows a user to
						propose new protocols or vote on changes proposed by other users. Initially, for new proposals a
						user needs to have 1% of all the DEGOV tokens in supply. For a proposal to pass, a quorum of 10%
						of the current DEGOV token supply needs to be reached.
					</p>
					<p>
						When a proposal is passed, it will be queued and can be executed after a set delay of 2 days by
						a Timelock contract which behaves as the owner of the editable contracts. For more details on
						this behavior, please view how Compound Finance's{' '}
						<a href="https://compound.finance/docs/governance">governance</a> works, as Debaseonomics'
						governance is forked from it.
					</p>
					<p>
						What DEGOV offers a user is wide ranging control of governance parameters as well as rebasing
						parameters. This framework gives users an unprecedented level of control to find the best
						solutions to stabilize DEBASE (and thus, elastic supply tokens) in the long run.
					</p>
					<p>
						For a detailed view of editable parameters and their current values please view{' '}
						{/* eslint-disable-next-line */}
						<a onClick={() => scrollToParameters()}>the Parameters section</a>. To view the ownership
						transfer to the time lock contract, please view the {/* eslint-disable-next-line */}
						<a onClick={() => scrollToOwnership()}>ownership</a> page.
					</p>
				</div>
			</div>
		</div>
	);
}
