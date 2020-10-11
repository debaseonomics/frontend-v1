import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Typed from 'react-typed';
import Wave from '../assets/Wave.svg';

export default function Landing({ scrollToOverview }) {
	const content = (
		<div className="container has-text-centered">
			<h1 className="title is-size-1-tablet is-size-2-mobile">Debaseonomics</h1>
			<Typed
				className="subtitle is-block is-size-3-tablet is-size-4-mobile"
				strings={[
					'A tale of two tokens.',
					'Debase - Modifiable flexible supply token.',
					'Degov - Reward based governance token.',
					'No pre-mine. No founder fees.',
					'Fair distribution.'
				]}
				typeSpeed={30}
				backSpeed={15}
				loop
			/>
			<div className="buttons are-medium is-centered">
				<button onClick={() => scrollToOverview()} className="button is-medium is-rounded is-info is-outline">
					Details
				</button>
				<Link className="button is-medium is-rounded is-primary is-outline" to="/dapp/staking">
					Launch Dapp
				</Link>
			</div>

			<div className="container block mt-3">
				<div className="field is-grouped is-grouped-centered">
					<Icon iconName="fab fa-github fa-lg" />
					<Icon iconName="fab fa-discord fa-lg" />
				</div>
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
