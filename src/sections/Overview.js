import React from 'react';
import { contractAddress, etherScanAddress } from '../utils';

const Overview = React.forwardRef(({ scrollToOwnership }, ref) => {
	return (
		<div className="section" ref={ref}>
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Overview</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">How it all works</h4>
			</div>
			<div className="container block is-fluid ">
				<div className="box content ">
					<p>
						Debaseonomics is a combination of <a href={etherScanAddress + contractAddress.debase}>
							DEBASE
						</a>, a flexible supply token, working together with{' '}
						<a href={etherScanAddress + contractAddress.degov}>DEGOV</a> , a governance token , in-order to
						make DEBASE achieve it's <strong>fixed</strong> target price of 1{' '}
						<a href={etherScanAddress + contractAddress.DAI}>DAI</a>. While distributing 100% of both the
						tokens using staking pools to promote fairness and decentralization.
					</p>
					<p>
						So DEBASE is based on the flexible supply policies brought forth by{' '}
						<a href="https://www.ampleforth.org/basics/">Ampleforth</a> with the fair distribution mechanism
						brought forth by by <a href="https://www.yearn.finance">YFI</a>. To put forward the idea of a
						completely community owned token very similar to <a href="https://www.based.money">BASED</a>{' '}
						token. What differentiates DEBASE from similar tokens like Ample and BASED is the addition of
						the governance token DEGOV operating on-top of DEBASE.
					</p>
					<p>
						DEGOV follows the governance model brought by{' '}
						<a href="https://compound.finance/docs/governance">Compound Finance</a> to allow manipulation of
						various parameters related to governance, distribution and most importantly the supply
						adjustment parameters. So the community can get together to completely control the behaviour of
						the protocol in-order to help DEBASE it's target price.
					</p>
					<p>
						<strong>
							Since both the DEBASE and the DEGOV tokens have been sent to and solely distributed by the
							staking pools. No exit scams can happen hence ensuring user fund safety
						</strong>. Also {/* eslint-disable-next-line */}
						<a href="#" onClick={() => scrollToOwnership()}>
							ownership
						</a>{' '}
						of the editable contracts has been transferred to governance contracts hence enforcing
						decentralization.
					</p>
				</div>
			</div>
		</div>
	);
});

export default Overview;
