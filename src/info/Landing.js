import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing({ scrollToOverview }) {
	return (
		<section className="hero is-fullheight">
			<div className="hero-body">
				<div className="container has-text-centered">
					<h1 className="title is-size-2-tablet is-size-4-mobile is-family-secondary">Debaseonomics v87</h1>
					<h2 className="subtitle is-size-3-tablet is-size-4-mobile has-text-grey-darker">
						Boundless Flexibility
					</h2>

					<div className="mb-0 buttons is-centered">
						<button onClick={() => scrollToOverview()} className="button is-edged is-medium is-primary">
							Overview
						</button>
						<Link className="button is-edged is-medium is-link" to="/dapp/staking">
							Application
						</Link>
					</div>
					<div className="socials">
						<a
							href="https://github.com/debaseonomics/"
							target="_blank"
							rel="noopener noreferrer"
							className="icon is-large has-text-grey-darker"
						>
							<i className="fab fa-github fa-lg" />
						</a>
						<a
							href="https://discord.gg/kmt9ESWXKg"
							target="_blank"
							rel="noopener noreferrer"
							className="icon is-large has-text-grey-darker"
						>
							<i className="fab fa-discord fa-lg" />
						</a>
						<a
							href="https://t.me/debaseonomics"
							target="_blank"
							rel="noopener noreferrer"
							className="icon is-large has-text-grey-darker"
						>
							<i className="fab fa-telegram fa-lg" />
						</a>
						<a
							href="https://twitter.com/debaseonomics"
							target="_blank"
							rel="noopener noreferrer"
							className="icon is-large has-text-grey-darker"
						>
							<i className="fab fa-twitter fa-lg" />
						</a>
						<a
							href="https://debaseonomics.medium.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="icon is-large has-text-grey-darker"
						>
							<i className="fab fa-medium fa-lg" />
						</a>
					</div>
					{/*<div>
						<DarkModeToggle onChange={toggleMode} checked={isDarkMode} speed={3} size={40} />
					</div>*/}
				</div>
			</div>
		</section>
	);
}
