import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing({ scrollToOverview }) {
	const content = (
		<div className="container has-text-centered">
			<h1 className="title is-size-1-tablet is-size-2-mobile">Debaseonomics</h1>
			<h2 className="subtitle is-size-3-tablet is-size-4-mobile">A tale of two tokens</h2>
			<div className="buttons has-addons is-centered">
				<button onClick={() => scrollToOverview()} className="button is-rounded is-info">
					Info
				</button>
				<Link className="button is-rounded is-primary" to="/dapp/staking">
					Dapp
				</Link>
			</div>

			<div className="container block mt-3">
				<a href="https://github.com/debaseonomics/" className="icon has-text-white">
					<i className="fab fa-github" />
				</a>
				<a href="https://discord.gg/QjmTMnx" className="icon has-text-white">
					<i className="fab fa-discord" />
				</a>
			</div>
		</div>
	);
	return (
		<section className="hero is-fullheight">
			<div className="hero-body">{content}</div>
		</section>
	);
}
