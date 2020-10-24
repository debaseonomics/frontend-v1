import React from 'react';

export default function Rebase({ isMobile }) {
	return (
		<div className="section">
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Rebases</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">Flexible supply management</h4>
			</div>
			<div className="container block is-fluid ">
				<div className={isMobile ? 'box content' : 'box content is-medium'}>
					<p>
						As the demand for Debase tokens increases, the number of Debase tokens you own increases. If the
						demand decreases, the number of Debase tokens you own decreases. The Debase protocol’s rebase
						function queries a{' '}
						<a href="https://uniswap.org/docs/v2/core-concepts/oracles/">Uniswap v2 oracle</a> to compare
						the price of Debase to DAI. This function initially cannot execute more than once every 24
						hours.
					</p>
					<p>
						If the price difference between DAI and Debase initially is more than 5% in either direction,
						this triggers a rebase event. Above the 5% threshold, the supply expands. Below the 5%
						threshold, the supply contracts. When a rebase event is triggered, Debase supply for all holders
						is adjusted smoothly over a ten-day period in an attempt to meet the targeted value of 1 Debase
						to 1 DAI.
					</p>
					<p>
						For all accounts that own Debase tokens, a rebasing can either result in an increase or decrease
						in their balance of Debase. After a minimum of 24 hours, if the Debase:DAI price is still not
						within the 5% target boundary, a rebase opportunity again becomes available.
					</p>
				</div>
			</div>
		</div>
	);
}
