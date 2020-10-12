import React from 'react';
import { Link } from 'react-router-dom';
import Wave from '../assets/Wave.svg';

export default function Landing({ scrollToOverview }) {
	const content = (
		<div className="container has-text-centered">
			<h1 className="title is-size-1-tablet is-size-2-mobile">Debaseonomics</h1>
			<h2 className="subtitle is-size-3-tablet is-size-4-mobile">A tale of two tokens</h2>
			<div className="buttons are-medium is-centered">
				<button onClick={() => scrollToOverview()} className="button is-medium is-rounded is-info is-outline">
					Details
				</button>
				<Link className="button is-medium is-rounded is-primary is-outline" to="/dapp/staking">
					Launch Dapp
				</Link>
			</div>

			<div className="container block mt-3">
				<a href="https://github.com/de-base/" className="icon has-text-white">
					<i className="fab fa-github" />
				</a>
				<a href="https://discord.gg/QjmTMnx" className="icon has-text-white">
					<i className="fab fa-discord" />
				</a>
			</div>
		</div>
	);
	return (
		<section
			className="hero is-fullheight"
			style={{ backgroundImage: `url(${Wave})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
		>
			<div className="hero-body">{content}</div>
		</section>
	);
}
