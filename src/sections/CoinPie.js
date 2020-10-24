import React from 'react';
import Coin from '../components/Coin';
import debase from '../assets/debase.png';
import degov from '../assets/degov.png';

export default function CoinPie({ scrollToDistribution, scrollToStabilizer }) {
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
