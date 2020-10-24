import React from 'react';
import { contractAddress, etherScanAddress } from '../utils';
import Coin from '../components/Coin';
import debase from '../assets/debase.png';
import degov from '../assets/degov.png';

const Overview = React.forwardRef(({ scrollToDistribution, scrollToOwnership, scrollToStabilizer, isMobile }, ref) => {
	const debaseData = [
		{
			id: 'Dai Pool',
			value: 10,
			label: '10%',
			tool: 'Initial debase seeding pool',
			supply: '25,000 Debase',
			click: scrollToDistribution
		},
		{
			id: 'Dai-LP Pool',
			value: 15,
			label: '15%',
			tool: 'Incentives debase liquidity',
			supply: '75,000 Debase',
			click: scrollToDistribution
		},
		{
			id: 'Stabilizer Pools',
			value: 75,
			label: '75%',
			tool: 'Custom pools helping to stabilize debase',
			supply: '900,000 Debase',
			click: scrollToStabilizer
		}
	];

	const degovData = [
		{
			id: 'Dai-Lp Pool',
			value: 100,
			label: '100%',
			tool: 'Degov seed pool',
			supply: '25,000 Degov',
			click: scrollToDistribution
		}
	];
	return (
		<div className="section" ref={ref}>
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Overview</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">How it all works</h4>
			</div>
			<div className="container block is-fluid ">
				<div className={isMobile ? 'box content' : 'box content is-medium'}>
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
						brought forth by by <a href="https://www.yearn.finance">YFI</a>. To put forward the idea of a
						completely community owned token very similar to <a href="https://www.based.money">Based</a>{' '}
						token. What differentiates Debase from similar tokens is the addition of the governance token
						Degov operating on-top of Debase and custom {/* eslint-disable-next-line */}
						<a onClick={() => scrollToStabilizer()}>stabilizer</a> pools to incentivize Debase hitting its
						target price during a rebase.
					</p>
					<p>
						Degov follows the governance model brought by{' '}
						<a href="https://compound.finance/docs/governance">Compound Finance</a> to allow manipulation of
						various parameters related to governance, distribution and most importantly the supply
						adjustment parameters. So the community can get together to completely control the behaviour of
						the protocol in-order to help Debase it's target price.
					</p>
					<h4>Pool Distribution</h4>
					<div className="columns">
						<div className="column is-half">
							<div className="block" style={{ height: '240px' }}>
								<Coin data={debaseData} />
							</div>
							<div className="columns is-centered block">
								<div className="column is-half">
									<article className="media">
										<figure className="media-left ">
											<p className="image is-64x64">
												<img src={debase} alt="debase" />
											</p>
										</figure>
										<div className="media-content">
											<div class="content">
												<p>
													<strong>Debase</strong>
													<br />
													100,000
												</p>
											</div>
										</div>
									</article>
								</div>
							</div>
						</div>
						<div className="column is-half">
							<div className="block" style={{ height: '240px' }}>
								<Coin data={degovData} />
							</div>
							<div className="columns is-centered block">
								<div className="column is-half">
									<article className="media">
										<figure className="media-left ">
											<p className="image is-64x64">
												<img src={degov} alt="debase" />
											</p>
										</figure>
										<div className="media-content">
											<div class="content">
												<p>
													<strong>Degov</strong>
													<br />
													25,000
												</p>
											</div>
										</div>
									</article>
								</div>
							</div>
						</div>
					</div>
					<p>
						Since both the Debase and the Degov tokens have been sent to and solely distributed by pools. No
						exit scams can happen hence ensuring user fund safety. Also {/* eslint-disable-next-line */}
						<a onClick={() => scrollToOwnership()}>ownership</a> of the editable contracts has been
						transferred to governance contracts hence enforcing decentralization.
					</p>
				</div>
			</div>
		</div>
	);
});

export default Overview;
