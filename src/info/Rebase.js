import React from 'react';

export default function Rebase({ isMobile }) {
	return (
		<div className="section pl-0 pr-0">
			<div className=" block">
				<h3 className="title is-size-3-tablet is-size-5-mobile is-family-secondary">rebases</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile has-text-grey-darker">
					Flexible supply management
				</h4>
			</div>
			<div className=" block  ">
				<div className={isMobile ? 'box content' : 'box content is-medium'}>
					<p>
						As the demand for DEBASE tokens waxes and wanes, so does the supply. Assuming initial
						parameters, Debaseonomics protocol’s rebase function queries a{' '}
						<a href="https://uniswap.org/docs/v2/core-concepts/oracles/">Uniswap v2 oracle</a> to compare
						the price of Debase to DAI. This function cannot execute more than once every 24 hours. Note:{/* eslint-disable-next-line */}{' '}
						Governance can vote on choice of the Oracle(s) as well as the rebase interval.
					</p>
					<p>
						Assuming current parameters for DEBASE, if the price difference between DAI and DEBASE initially
						is more than 5% in either direction, this triggers a rebase event. Above the 5% threshold, the
						supply expands. Below the 5% threshold, the supply contracts. When a rebase event is triggered,
						DEBASE supply for all holders is adjusted smoothly in an attempt to meet the targeted value of
						DEBASE to its programmable DAI target price. For all accounts that own DEBASE tokens, a rebasing
						can either increase or decrease their balance. After a minimum of 24 hours, if DEBASE:DAI price
						is still not within the 5% target boundary, a rebase opportunity becomes available again.
					</p>
				</div>
			</div>
		</div>
	);
}
