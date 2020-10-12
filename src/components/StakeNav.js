import React, { useEffect, useState } from 'react';
import { toaster, turncate } from '../utils/index';
import { Link } from 'react-router-dom';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';

export default function StakeNav({ children }) {
	const injected = new InjectedConnector({ supportedChainIds: [ 1 ] });
	const { account, activate, active, error } = useWeb3React();

	const [ menuActive, setMenuActive ] = useState(false);
	const [ activeLink, setActiveLink ] = useState('Staking');

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
		<div>
			<nav className="block navbar has-background-grey-darker" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<div className="navbar-item">
						<Link to="/" className="has-text-white-ter">
							<span className="icon">
								<i className="fas fa-home" />
							</span>
						</Link>
					</div>
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
					</div>
					<div className="navbar-end">
						<div className="navbar-item">
							{active ? (
								<span className="tag is-primary is-medium">
									<span className="icon is-medium has-text-white">
										<i className="fas fa-user-circle" />
									</span>
									<span>{turncate(account, 15, '...')}</span>
								</span>
							) : (
								<div className="button is-primary" onClick={() => activate(injected)}>
									Connect to Metamask
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
			{active ? (
				children
			) : (
				<div className="container is-fluid">
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
	);
}
