import React from 'react';
import { contractAddress, etherScanAddress } from '../utils';

const Overview = React.forwardRef(({}, ref) => {
	return (
		<div className="section" ref={ref}>
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Overview</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">How it all works</h4>
			</div>
			<div className="container block is-fluid ">
				<div className="box content is-medium">
					Debaseonomics combines <a href={etherScanAddress + contractAddress.debase}>DEBASE</a>, a flexible
					supply token , with <a href={etherScanAddress + contractAddress.degov}>DEGOV</a> , a governance
					token , working together in-order to make DEBASE achieve it's target price of 1{' '}
					<a href={etherScanAddress + contractAddress.USDC}>USDC</a>. DEBASE is based on the flexible supply
					policies brought by <a href="https://www.ampleforth.org/basics/">Ampleforth</a> and combines then
					with the fair distribution mechanism brought by <a href="https://www.yearn.finance">YFI</a>. To put
					forward the idea of a completely community owned token much similar to{' '}
					<a href="https://www.based.money">BASED</a> token. What differentiates DEBASE from similar tokens
					like Ample and BASED is the addition of the governance token DEGOV operating on-top of DEBASE.
					<br />
					<br />
					DEGOV follows the governance model brought by{' '}
					<a href="https://compound.finance/docs/governance">Compound Finance</a> to allow manipulation of
					various parameters related to governance, distribution and most importantly the supply adjustment
					parameters. So the community can get together this and completely control the behaviour of the
					protocol. Thus giving a level of not found in similarly behaving coins.
					<br />
					<br />
					Finally both the DEBASE and the DEGOV tokens will all be sent to and distributed by staking pools.
					This way no rug pull or exit scam will be possible
				</div>
			</div>
		</div>
	);
});

export default Overview;
