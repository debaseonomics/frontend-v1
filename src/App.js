import React, { useRef, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { contractAddress } from './utils/index';

import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';

import degov from './assets/degov.png';
import usdc from './assets/usdc.png';
import debase from './assets/debase.png';
import dai from './assets/dai.png';
import empty from './assets/empty.png';

const Landing = React.lazy(() => import('./sections/Landing'));
const Parameters = React.lazy(() => import('./sections/Parameters'));
const Contracts = React.lazy(() => import('./sections/Contracts'));
const Distribution = React.lazy(() => import('./sections/Distribution'));
const Governance = React.lazy(() => import('./sections/Governance'));
const Overview = React.lazy(() => import('./sections/Overview'));
const Rebase = React.lazy(() => import('./sections/Rebase'));
const Asymmetrical = React.lazy(() => import('./sections/Asymmetrical'));
const Ownership = React.lazy(() => import('./sections/Ownership'));

const Staking = React.lazy(() => import('./dapp/Staking'));
const Gov = React.lazy(() => import('./dapp/Gov'));
const Pool = React.lazy(() => import('./dapp/Pool'));
const StakeNav = React.lazy(() => import('./components/StakeNav'));
const Rebaser = React.lazy(() => import('./dapp/Rebaser'));

function getLibrary(provider) {
	const library = new ethers.providers.Web3Provider(provider);
	library.pollingInterval = 12000;
	return library;
}

function App() {
	const overviewRef = useRef(null);
	const parametersRef = useRef(null);
	const ownershipRef = useRef(null);

	function scrollToOverview() {
		overviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
	function scrollToParameters() {
		parametersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function scrollToOwnership() {
		ownershipRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	return (
		<Router>
			<Suspense>
				<Switch>
					<Route path="/dapp">
						<Web3ReactProvider getLibrary={getLibrary}>
							<StakeNav>
								<Route path="/dapp/staking">
									<Route path="/dapp/staking/debase-dai">
										<Pool
											tokenText="DAI"
											rewardText="Debase"
											poolName="Debase/DAI Pool"
											unit={18}
											rewardTokenImage={debase}
											stakeTokenImage={dai}
											tokenAddress={contractAddress.dai}
											poolAddress={contractAddress.debaseDaiPool}
										/>
									</Route>
									<Route path="/dapp/staking/debase-dai-lp">
										<Pool
											tokenText="DAI-LP"
											rewardText="Debase"
											poolName="Debase/DAI-LP Pool"
											unit={18}
											rewardTokenImage={debase}
											stakeTokenImage={empty}
											tokenAddress={contractAddress.debaseDaiLp}
											poolAddress={contractAddress.debaseDaiLpPool}
										/>
									</Route>
									<Route path="/dapp/staking/degov-usdc">
										<Pool
											tokenText="USDC"
											rewardText="Degov"
											poolName="Degov/USDC Pool"
											unit={18}
											rewardTokenImage={degov}
											stakeTokenImage={usdc}
											tokenAddress={contractAddress.usdc}
											poolAddress={contractAddress.degovUsdcPool}
										/>
									</Route>
									<Route path="/dapp/staking/degov-usdc-lp">
										<Pool
											tokenText="USDC-LP"
											rewardText="Degov"
											poolName="Degov/USDC-LP Pool"
											unit={18}
											rewardTokenImage={degov}
											stakeTokenImage={empty}
											tokenAddress={contractAddress.degovUsdcLp}
											poolAddress={contractAddress.degovUsdcLpPool}
										/>
									</Route>
									<Route exact path="/dapp/staking">
										<Staking />
									</Route>
								</Route>
								<Route path="/dapp/rebaser">
									<Rebaser />
								</Route>
								<Route path="/dapp/governance">
									<Gov />
								</Route>
							</StakeNav>
						</Web3ReactProvider>
					</Route>
					<Route path="/">
						<Landing scrollToOverview={scrollToOverview} />
						<Overview ref={overviewRef} scrollToOwnership={scrollToOwnership} />
						<Rebase />
						<Asymmetrical />
						<Governance scrollToParameters={scrollToParameters} scrollToOwnership={scrollToOwnership} />
						<Distribution />
						<Parameters ref={parametersRef} />
						<Contracts />
						<Ownership ref={ownershipRef} />
					</Route>
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
