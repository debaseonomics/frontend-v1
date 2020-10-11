import React from 'react';

export default function Rebase({ scrollToParameters }) {
	return (
		<div className="section">
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Rebases</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">Flexible supply management</h4>
			</div>
			<div className="container block is-fluid ">
				<div className="box content is-medium">
					As the demand for DEBASE tokens increases, the number of DEBASE tokens you own increases. If the
					demand decreases, the number of DEBASE tokens you own decreases. The DEBASE protocol’s rebase
					function queries a{' '}
					<a href="https://uniswap.org/docs/v2/core-concepts/oracles/">Uniswap v2 oracle</a> to compare the
					price of DEBASE to USDC. This function initially cannot execute more than once every 24 hours.
					<br />
					<br />
					If the price difference between USDC and DEBASE initially is more than 5% in either direction, this
					triggers a rebase event. Above the 5% threshold, the supply expands. Below the 5% threshold, the
					supply contracts. When a rebase event is triggered, DEBASE supply for all holders is adjusted
					smoothly over a ten-day period in an attempt to meet the targeted value of 1 DEBASE to 1 USDC.
					<br />
					<br />
					For all accounts that own DEBASE tokens, a rebasing can either result in an increase or decrease in
					their balance of DEBASE. After a minimum of 24 hours, if the DEBASE:USDC price is still not within
					the 5% target boundary, a rebase opportunity again becomes available.
					<br />
					<br />
					Since Debase is a modifiable token so parameters mentioned here can be modified using the Degov
					governance token. So you can the list of modifiable parameters{' '}
					<a onClick={() => scrollToParameters()}>here</a>.
				</div>
			</div>
		</div>
	);
}
