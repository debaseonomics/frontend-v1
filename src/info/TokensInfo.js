import React from 'react';
import debase from '../assets/debase.png';
import degov from '../assets/degov.png';

export default function TokensInfo({ isMobile }) {
	const Token = (tokenImg, name, tag, content, supply, distribution) => (
		<div class="card">
			<div class="card-content">
				<div class="media">
					<div class="media-left">
						<figure class="image is-48x48">
							<img src={tokenImg} alt="Placeholder" />
						</figure>
					</div>
					<div class="media-content is-clipped">
						<p class="title is-4 is-family-secondary">{name}</p>
						<p class="subtitle is-6">{tag}</p>
					</div>
				</div>

				<div className={isMobile ? 'content' : 'content is-medium'}>
					<p>{content}</p>
				</div>
				<nav class="level is-mobile">
					<div class="level-item has-text-centered">
						<div>
							<p class="heading">Total Supply</p>
							<p class="title is-4">{supply}</p>
						</div>
					</div>
					<div class="level-item has-text-centered">
						<div>
							<p class="heading">Initial Distribution</p>
							<p class="title is-4">{distribution}</p>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
	return (
		<div className="pl-0 pr-0 section">
			<div className="columns is-centered">
				<div className="column is-10">
					<div className="columns">
						<div className="column">
							{Token(
								debase,
								'Debase',
								'Flexible Supply Token',
								'DEBASE is an elastic supply token whose features (price target, price oracle(s), rebase lag, etc.) are parameterized  to be controlled through governance and whose value is stabilized through "stabilizer pools"',
								'1,000,000',
								'100,000'
							)}
						</div>
						<div className="column">
							{Token(
								degov,
								'Degov',
								'Governance Token',
								'DEGOV is the governance token of Debaseonomics which is used to vote on the parameters of DEBASE, stabilizer pools as well as other parameters of governance (quorum threshold, execution delay, etc.)',
								'25,000',
								'25,000'
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
