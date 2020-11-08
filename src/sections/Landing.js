import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing({ scrollToOverview }) {
	const content = (
		<div className="container has-text-centered">
			<h1 className="title is-size-1-tablet is-size-2-mobile">Debaseonomics v87</h1> //small letter v
			<h2 className="subtitle is-size-3-tablet is-size-4-mobile">Boundless Flexibility</h2>
			<div className="buttons has-addons is-centered">
				<button onClick={() => scrollToOverview()} className="button is-rounded is-info">
					Info
				</button>
				<Link className="button is-rounded is-primary" to="/dapp/staking">
					Dapp
				</Link>
			</div>

			<div className="container block mt-3">
				<a href="https://github.com/debaseonomics/" target="_blank" className="icon is-large has-text-white">
					<i className="fab fa-github fa-lg" />
				</a>
				<a href="https://discord.gg/QjmTMnx" target="_blank" className="icon is-large has-text-white">
					<i className="fab fa-discord fa-lg" />
				</a>
				<a href="https://t.me/debaseonomics" target="_blank" className="icon is-large has-text-white">
					<i className="fab fa-telegram fa-lg" />
				</a>
				<a href="https://twitter.com/debaseonomics" target="_blank" className="icon is-large has-text-white">
					<i className="fab fa-twitter fa-lg" />
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
