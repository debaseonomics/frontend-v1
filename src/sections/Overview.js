import React from 'react';
import { contractAddress, etherScanAddress } from '../utils';
import debase from '../assets/debase.png';
import degov from '../assets/degov.png';

const Overview = React.forwardRef(({ scrollToParameters, scrollToOwnership, scrollToStabilizer, isMobile }, ref) => {
	const charts = (
		<div className="box">
			<h4 className="title is-4 ">Token Information</h4>

			<nav className="level has-text-centered">
				<div className="level-left">
					<div className="level-item">
						<figure className="image is-48x48">
							<img src={debase} alt="debase" />
						</figure>
					</div>
					<div className="level-item">
						<p className="title is-size-5-tablet is-size-4-mobile">Debase</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Supply</p>
						<p className="title is-size-5-tablet is-size-4-mobile">100,000</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Rebase Period</p>
						<p className="title is-size-5-tablet is-size-4-mobile">24 Hours</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Rebase Lag</p>
						<p className="title is-size-5-tablet is-size-4-mobile">30</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Stabilizer Pools Reward</p>
						<p className="title is-size-5-tablet is-size-4-mobile">75,000 Debase</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Debase/Dai Pool Reward</p>
						<p className="title is-size-5-tablet is-size-4-mobile">17,000 Debase</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Debase/Dai-Lp Pool Reward</p>
						<p className="title is-size-5-tablet is-size-4-mobile">8,000 Debase</p>
					</div>
				</div>
			</nav>

			<nav className="level has-text-centered">
				<div className="level-left">
					<div className="level-item">
						<figure className="image is-48x48">
							<img src={degov} alt="degov" />
						</figure>
					</div>
					<div className="level-item">
						<div className="level-item">
							<p className="title is-size-5-tablet is-size-4-mobile">Degov</p>
						</div>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Supply</p>
						<p className="title is-size-5-tablet is-size-4-mobile">25,000</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Voting Period</p>
						<p className="title is-size-5-tablet is-size-4-mobile">24 Hours</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Implementation Delay</p>
						<p className="title is-size-5-tablet is-size-4-mobile">24 Hours</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Proposal Threshold</p>
						<p className="title is-size-5-tablet is-size-4-mobile">250 Degov</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Quorum Threshold</p>
						<p className="title is-size-5-tablet is-size-4-mobile">5000 Degov</p>
					</div>
				</div>
				<div className="level-item">
					<div>
						<p className="heading">Degov/Dai-Lp Pool Reward</p>
						<p className="title is-size-5-tablet is-size-4-mobile">25,000 Degov</p>
					</div>
				</div>
			</nav>

			<div className={isMobile ? 'content' : 'content is-medium'}>
				<p>
					Since both the Debase and the Degov tokens have been sent to and solely distributed by pools. No
					exit scams can happen hence ensuring user fund safety. Also {/* eslint-disable-next-line */}
					<a onClick={() => scrollToOwnership()}>ownership</a> of the editable contracts has been transferred
					to governance contracts hence enforcing decentralization.
				</p>
			</div>
		</div>
	);

	return (
		<div className="section" ref={ref}>
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Overview</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">How it all works</h4>
			</div>
			<div className="container block is-fluid ">
				<div className={isMobile ? 'content box' : 'content box is-medium'}>
					<p>
						Debaseonomics is a combination of <a href={etherScanAddress + contractAddress.debase}>
							Debase
						</a>, a flexible supply token, working together with{' '}
						<a href={etherScanAddress + contractAddress.degov}>Degov</a> , a governance token , in-order to
						make Debase achieve it's programmable target price of 1{' '}
						<a href={etherScanAddress + contractAddress.DAI}>DAI</a>. While distributing 100% of both the
						tokens using staking and stabilizer pools to promote fairness and decentralization.
					</p>
					<p>
						So Debase is based on the flexible supply policies brought forth by{' '}
						<a href="https://www.ampleforth.org/basics/">Ampleforth</a> with the fair distribution mechanism
						brought forth by by <a href="https://www.yearn.finance">YFI</a>. What differentiates Debase from
						similar tokens is the addition of the governance token Degov operating on-top of Debase. That
						can allow the community to set various rebasing parameters and even add custom distribution pool
						called
						{/* eslint-disable-next-line */}
						<a onClick={() => scrollToStabilizer()}> stabilizer</a>. These pools can have their own novel
						triggering and distribution mechanisms to incentivize Debase holders in unique ways when Debase
						hit its target price. Keeping this is mind, 75% off all Debase tokens will be available only
						through the stabilizer pools.
					</p>
					<p>
						Degov follows the governance model brought by{' '}
						<a href="https://compound.finance/docs/governance">Compound Finance</a> to allow manipulation of
						various {/* eslint-disable-next-line */}
						<a onClick={() => scrollToParameters()}>parameters</a> related to governance, rebase and
						stabilizer pools.
					</p>
				</div>
				{charts}
			</div>
		</div>
	);
});

export default Overview;
