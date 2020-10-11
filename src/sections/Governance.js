import React from 'react';

export default function Governance({ scrollToParameters, scrollToOwnership }) {
	return (
		<div className="section">
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Governance</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">How governance works</h4>
			</div>
			<div className="container block is-fluid ">
				<div className="box content is-medium">
					DEGOV tokens represent a vote in the governance of the protocol. The token allows a user to propose
					new protocol or vote on changes proposed by other users. Initially to propose a new proposal a user
					needs to have 1% of all the DEGOV tokens in supply. For a proposal to pass a quorum of 10% of the
					current DEGOV token supply needs to be reached.
					<br />
					<br />
					When a proposal is passed it will be queued and can be executed after a set delay of 2 days by a
					Timelock contract, that behaves as the owner of the editable contracts. For better detail on this
					behaviour please view how compound finance's{' '}
					<a href="https://compound.finance/docs/governance">governance</a> works of which DEGOV governance is
					based of.
					<br />
					<br />
					So what DEGOV offers a user is control from how governance parameters should behave to how rebasing
					parameters should behave. Giving users an unprecedented level of control to answer the question
					whether the community can build a token that will eventually be stable.
					<br />
					<br />
					To view the types of editable parameters please view the{' '}
					<a onClick={() => scrollToParameters()}>parameters</a> page to see what they are and their current
					values. Also to view the ownership transfer to the timelock contract please view the{' '}
					<a onClick={() => scrollToOwnership()}>ownership</a> page.
				</div>
			</div>
		</div>
	);
}
