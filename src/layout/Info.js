import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import debase from '../assets/debase.png';
import Valley from '../assets/Valley.svg';

export default function Layout({ children }) {
	const [menuActive, setMenuActive] = useState(false);

	const menuLink = (link, to) => (
		<div className="navbar-item">
			{link === 'Vote' || link === 'Governance' ? (
				<a target="_blank" rel="noopener noreferrer" href={to}>
					{link}
				</a>
			) : (
					<Link to={to}>{link}</Link>
				)}
		</div>
	);


	return (
		<div
			className="hero is-fullheight"
			style={{
				backgroundImage: `url(${Valley})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundAttachment: 'fixed'
			}}
		>
			<div className="hero-head">
				<nav className="navbar is-transparent is-spaced" role="navigation" aria-label="main navigation">
					<div className="navbar-brand">
						<div className="navbar-item">
							<Link to="/">
								<figure className="image" style={{ width: '28px', height: '28px' }}>
									<img src={debase} alt="debase" />
								</figure>
							</Link>
						</div>
						{/* eslint-disable-next-line */}
						<a
							role="button"
							onClick={() => setMenuActive(!menuActive)}
							className={menuActive ? 'navbar-burger is-active' : 'navbar-burger'}
							aria-label="menu"
							aria-expanded="false"
						>
							<span aria-hidden="true" />
							<span aria-hidden="true" />
							<span aria-hidden="true" />
						</a>
					</div>
					<div className={menuActive ? 'navbar-menu is-active' : 'navbar-menu'}>
						<div className="navbar-start">
							{menuLink('Dashboard', '/info/dashboard')}
							{menuLink('Staking', '/dapp/staking')}
							{menuLink('Vote', 'https://snapshot.page/#/debaseonomics')}
							{menuLink('Rebase', '/dapp/rebase')}
							{menuLink('Stabilizers', '/dapp/stabilizers')}
						</div>
						<div className="navbar-end">
							<div className="navbar-item">

							</div>
						</div>
					</div>
				</nav>
			</div>
			<div className="hero-body">
				<div className="container is-fluid">{children}</div>
			</div>
		</div>
	);
}
