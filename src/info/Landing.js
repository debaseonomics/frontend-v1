import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from 'react-dark-mode-toggle';
import { useRecoilState } from 'recoil';
import { darkModeState } from '../state/index.js';

export default function Landing({ scrollToOverview }) {
	const [ isDarkMode, setIsDarkMode ] = useRecoilState(darkModeState);

	function toggleMode() {
		const body = document.body;
		body.classList.toggle('dark-mode');
		setIsDarkMode(!isDarkMode);
	}

	return (
		<section className="hero is-fullheight">
			<div className="hero-body">
				<div className="container has-text-centered">
					<h1 className="title is-size-2-tablet is-size-4-mobile">Debaseonomics v87</h1>
					<h2 className="subtitle is-size-3-tablet is-size-4-mobile">Boundless Flexibility</h2>

					<div className="buttons mb-0 is-centered">
						<button onClick={() => scrollToOverview()} className="button is-rounded is-info">
							Info
						</button>
						<Link className="button is-rounded is-primary" to="/dapp/staking">
							Dapp
						</Link>
					</div>

					<a href="https://github.com/debaseonomics/" target="_blank" className="icon is-large ">
						<i className="fab fa-github fa-lg" />
					</a>
					<a href="https://discord.gg/QjmTMnx" target="_blank" className="icon is-large ">
						<i className="fab fa-discord fa-lg" />
					</a>
					<a href="https://t.me/debaseonomics" target="_blank" className="icon is-large ">
						<i className="fab fa-telegram fa-lg" />
					</a>
					<a href="https://twitter.com/debaseonomics" target="_blank" className="icon is-large ">
						<i className="fab fa-twitter fa-lg" />
					</a>
					<div>
						<DarkModeToggle onChange={toggleMode} checked={isDarkMode} speed={3} size={40} />
					</div>
				</div>
			</div>
		</section>
	);
}
