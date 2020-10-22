import React from 'react';
import Coin from '../components/Coin';
import debase from '../assets/debase.png';
import degov from '../assets/degov.png';

export default function CoinPie({ scrollToDistribution, scrollToStabilizer }) {
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
		<div className="section">
			<div className="columns">
				<div className="mb-6 column is-half" style={{ height: '320px' }}>
					<Coin data={debaseData} scheme="set1" />
					<nav className="level">
						<div className="level-item">
							<div className="media">
								<div className="media-left">
									<figure className="image is-64x64">
										<img src={debase} alt="Debase" />
									</figure>
								</div>
								<div className="media-content">
									<p className="title is-3">Debase</p>
									<p className="mt-1 subtitle is-5">1,000,000</p>
								</div>
							</div>
						</div>
					</nav>
				</div>
				<div className="column is-half" style={{ height: '320px' }}>
					<Coin data={degovData} scheme="category10" />
					<nav className="level">
						<div className="level-item">
							<div className="media">
								<div className="media-left">
									<figure className="image is-64x64">
										<img src={degov} alt="Degov" />
									</figure>
								</div>
								<div className="media-content">
									<p className="title is-3">Degov</p>
									<p className="mt-1 subtitle is-5">25,000</p>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
}
