import React from 'react';
import { contractAddress, etherScanAddress } from '../utils';

const Overview = React.forwardRef(({ scrollToParameters, scrollToStabilizer, scrollToUniswap, isMobile }, ref) => {
	return (
		<div className="section pl-0 pr-0" ref={ref}>
			<div className=" block">
				<h3 className="title is-size-3-tablet is-size-5-mobile is-family-secondary">Overview</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile has-text-grey-darker">How it all works</h4>
			</div>
			<div className=" block">
				<div className={isMobile ? 'box content' : 'box content is-medium'}>
					<p>
						Debaseonomics is a combination of <a href={etherScanAddress + contractAddress.debase}>
							DEBASE
						</a>, a flexible supply token, and <a href={etherScanAddress + contractAddress.degov}>DEGOV</a>,
						a governance token, working together to solve the fundamental issues faced by elastic supply
						tokens. 100% of the tokens are distributed through staking and "stabilizer pools" to promote
						fairness and decentralization.
					</p>
					<p>
						Debaseonomics doesn't aim to be create another flexible supply token proposing a small set of
						features that might, in theory, make them reach their pegged value. Instead, it encompasses an
						infinite variety of elastic supply tokens by proposing {/* eslint-disable-next-line */}
						<a onClick={() => scrollToStabilizer()}>stabilizer pools</a> which can be programmed in unique
						ways to try to incentivize DEBASE holders to stabilize the token price over a number of cycles,
						in a process mediated by governance. These pools attempt to solve some of the biggest
						{/* eslint-disable-next-line */}
						<a onClick={() => scrollToUniswap()}> issues faced by such coins</a>, including incentivizing
						pegging DEBASE to target during negative rebases.
					</p>
					<p>
						Keeping this flexibility in mind, 90% of all debase tokens have been assigned to be rewarded to
						any number of successful stabilizers proposed and voted on by governance. Serving as an
						incentivization mechanism for the community to develop and, in turn, stabilize DEBASE further.
					</p>
					<p>
						So to control such pools and the protocol itself, a governance token has been paired token with
						DEBASE. To allow the community to decide what types of stabilizers to include and how the
						protocol should rebase in general. DEGOV follows the governance model brought by{' '}
						<a href="https://compound.finance/docs/governance">Compound Finance</a> to allow the
						manipulation of various <a onClick={() => scrollToParameters()}>parameters</a> in a
						decentralized manner.
					</p>
					<p>
						Debaseonomics is moving forward development in elastic supply tokens by incentivizing boundless
						possibilities in trying to stabilize DEBASE price in the long or short term through governance
						and stability pools.
					</p>
				</div>
			</div>
		</div>
	);
});

export default Overview;
