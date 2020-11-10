import React, { Fragment, useEffect, useState } from 'react';
import { toaster, turncate } from '../utils/index';
import { Link } from 'react-router-dom';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import DarkModeToggle from 'react-dark-mode-toggle';
import Valley from '../assets/Valley.svg';
import debase from '../assets/debase.png';

export default function DappLayout({ children }) {
	const injected = new InjectedConnector({ supportedChainIds: [ 1 ] });
	const { account, activate, active, error } = useWeb3React();

	const [ menuActive, setMenuActive ] = useState(false);
	const [ activeLink, setActiveLink ] = useState('Staking');

	const isUserRejectedRequestError = error instanceof UserRejectedRequestError;
	const isNoEthereumProviderError = error instanceof NoEthereumProviderError;
	const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

	const [ isDarkMode, setIsDarkMode ] = useState(false);

	function toggleMode() {
		const body = document.body;
		body.classList.toggle('dark-mode');
		setIsDarkMode(!isDarkMode);
	}

	useEffect(
		() => {
			if (isUnsupportedChainIdError) {
				toaster('Please connect to main network', 'is-danger', 3000);
			} else if (isNoEthereumProviderError) {
				toaster('Metamask not found', 'is-danger', 3000);
			} else if (isUserRejectedRequestError) {
				toaster('Cannot connect to metamask', 'is-danger', 3000);
			}
		},
		[ isUnsupportedChainIdError, isNoEthereumProviderError, isUserRejectedRequestError ]
	);

	const menuLink = (link, to) => (
		<div className="navbar-item">
			<Link
				className={activeLink === link ? 'has-text-white-ter has-text-weight-bold' : 'has-text-white-ter'}
				to={to}
				onClick={() => setActiveLink(link)}
			>
				{link}
			</Link>
		</div>
	);

	return (
		<div
			className="hero is-fullheight"
			style={{
				backgroundImage: `url(${Valley})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
			}}
		>
			<div className="hero-head">
				<nav className="navbar is-transparent is-spaced" role="navigation" aria-label="main navigation">
					<div className="navbar-brand">
						<div className="navbar-item">
							<Link to="/">
								<figure className="image">
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
							{menuLink('Staking', '/dapp/staking')}
							{menuLink('Governance', '/dapp/governance')}
							{menuLink('Rebaser', '/dapp/rebaser')}
							{menuLink('Stabilizer', '/dapp/stabilizer')}
						</div>
						<div className="navbar-end">
							<div className="navbar-item">
								{active ? (
									<Fragment>
										<div className="account">
											<span className="icon is-medium ">
												<i className="fas fa-user-circle" />
											</span>
											<h5 className="title is-6">{turncate(account, 15, '...')}</h5>
										</div>
									</Fragment>
								) : null}
							</div>
							<div className="navbar-item">
								<DarkModeToggle onChange={toggleMode} checked={isDarkMode} size={50} />
							</div>
						</div>
					</div>
				</nav>
			</div>
			<div className="hero-body staking-bg">
				{active ? (
					<div className="container">{children}</div>
				) : (
					<div className="container">
						<div className="columns is-centered has-text-centered">
							<div className="column is-7">
								<div className="box">
									<h4 className="title is-4">Must connect with metamask to interact with dapp</h4>
									<button className="button is-primary" onClick={() => activate(injected)}>
										Connect to metamask
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div />
		</div>
	);
}
