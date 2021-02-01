import React, { Fragment, useEffect, useState } from 'react';
import { toaster, turncate } from '../utils/index';
import { Link } from 'react-router-dom';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';

import debase from '../assets/debase.png';

export default function DappLayout({ children }) {
	const injected = new InjectedConnector({ supportedChainIds: [ 1, 1337 ] });
	const { account, activate, active, error } = useWeb3React();

	const [ menuActive, setMenuActive ] = useState(false);

	const isUserRejectedRequestError = error instanceof UserRejectedRequestError;
	const isNoEthereumProviderError = error instanceof NoEthereumProviderError;
	const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

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
				//backgroundImage: `url(${Valley})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
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
							{menuLink('Incentivizers', '/dapp/incentivizers')}
							<div className="navbar-item">
								<a
									href="https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=0x9248c485b0b80f76da451f167a8db30f33c70907"
									target="_blank"
									className="button is-edged is-medium is-primary in-nav"
								>
									TRADE DEBASE
								</a>
								<a
									href="https://uniswap.exchange/swap?inputCurrency=ETH&outputCurrency=0x469e66e06fec34839e5eb1273ba85a119b8d702f"
									target="_blank"
									className="button is-edged is-medium is-primary in-nav"
								>
									TRADE DEGOV
								</a>
							</div>
						</div>
						<div className="navbar-end">
							<div className="navbar-item">
								{active ? (
									<Fragment>
										<div className="account">
											<span className="icon is-medium ">
												<i className="fas fa-user-circle" />
											</span>
											<h5 className="subtitle is-6">{turncate(account, 15, '...')}</h5>
										</div>
									</Fragment>
								) : null}
							</div>
							{/*<div className="navbar-item">
								<DarkModeToggle onChange={toggleMode} checked={isDarkMode} speed={3} size={40} />
								</div>*/}
						</div>
					</div>
				</nav>
			</div>
			<div className="hero-body">
				{active ? (
					<div className="container is-fluid">{children}</div>
				) : (
					<div className="container is-fluid">
						<div className="columns is-centered has-text-centered">
							<div className="column is-7">
								<div className="boxs foxie">
									<h4 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">
										Must connect with metamask to interact with dapp
									</h4>
									<button className="button is-primary is-edged" onClick={() => activate(injected)}>
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
