import React from 'react';
import { contractAddress, etherScanAddress } from '../utils';
import debase from '../assets/debase.png';
import degov from '../assets/degov.png';

const Overview = React.forwardRef(
	({ scrollToParameters, scrollToOwnership, scrollToStabilizer, scrollToUniswap, isMobile }, ref) => {
		const charts = (
			<div className="box mt-4">
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
							<p className="title is-size-5-tablet is-size-4-mobile">1,000,000</p>
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
							<p className="title is-size-5-tablet is-size-4-mobile">900,000 Debase</p>
						</div>
					</div>
					<div className="level-item">
						<div>
							<p className="heading">Debase/Dai Pool Reward</p>
							<p className="title is-size-5-tablet is-size-4-mobile">30,000 Debase</p>
						</div>
					</div>
					<div className="level-item">
						<div>
							<p className="heading">Debase/Dai-Lp Pool Reward</p>
							<p className="title is-size-5-tablet is-size-4-mobile">70,000 Debase</p>
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
						Since Debase and Degov tokens have been sent to and solely distributed by pools, no exit scams
						can happen, ensuring user fund safety. Additionally, {/* eslint-disable-next-line */}
						<a onClick={() => scrollToOwnership()}>ownership</a> of the editable contracts has been
						transferred to governance contracts enforcing decentralization.
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
							Debaseonomics is a combination of{' '}
							<a href={etherScanAddress + contractAddress.debase}>Debase</a>, a flexible supply token, and{' '}
							<a href={etherScanAddress + contractAddress.degov}>Degov</a>, a governance token, working
							together to solve the fundamental issues faced by elastic supply tokens. 100% of the tokens are
							distributed through staking and "stabilizer pools" to promote fairness and decentralization.
						</p>
						<p>
							Debase doesn't aim to be just another flexible supply token proposing a small set of
							features that might, in theory, make them reach their pegged value. Instead, it tries to
							encompass all the previously released tokens by proposing {/* eslint-disable-next-line */}
							<a onClick={() => scrollToStabilizer()}>stabilizer pools</a> which can be programmed in
							unique ways to try to incentivize Debase holders to stabilize the token price in a process mediated by governance. 
							These pools can be programmed to reward users for stabilizing Debase over a number of cycles, by using
							various strategies in an attempt to solve some of the biggest
							{/* eslint-disable-next-line */}
							<a onClick={() => scrollToUniswap()}> issues faced by such coins</a>. //I would mention both issues: Uniswap and peg during Negative Rebases .
						</p>
						<p>
							Keeping this flexibility in mind, <strong>90%</strong> of all debase tokens have been
							assigned to be rewarded to any number of stabilizers proposed and voted on by the community.
							Serving as an incentivization mechanism for the community to develop and, in turn, stabilize
							debase further.
						</p>
						<p>
							So to control such pools and the protocol itself, a governance token has been paired token
							with Debase. To allow the community to decide what types of stabilizers to include and how
							the protocol should rebase in general. Degov follows the governance model brought by{' '}
							<a href="https://compound.finance/docs/governance">Compound Finance</a> to allow the
							manipulation of various <a onClick={() => scrollToParameters()}>parameters</a> in a
							decentralized manner.
						</p>
						<p>
							Debaseonomics is moving forward development in elastic
							supply tokens by allowing for boundless possibilities in trying to stabilize Debase price in the
							long or short term through governance and stability pools.
						</p>
					</div>
					{charts}
				</div>
			</div>
		);
	}
);

export default Overview;
