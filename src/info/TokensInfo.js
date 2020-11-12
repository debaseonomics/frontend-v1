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
							<img src={tokenImg} alt="Placeholder image" />
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
		<div className="section pl-0 pr-0">
			<div className="columns is-centered">
				<div className="column is-10">
					<div className="columns">
						<div className="column">
							{Token(
								debase,
								'Debase',
								'Flexible Supply Token',
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur sem purus, id consequat tellus interdum vel. Duis tristique rutrum lacus, nec consequat enim rutrum ac.',
								'1,000,000',
								'100,000'
							)}
						</div>
						<div className="column">
							{Token(
								degov,
								'Degov',
								'Governance Token',
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur sem purus, id consequat tellus interdum vel. Duis tristique rutrum lacus, nec consequat enim rutrum ac.',
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
