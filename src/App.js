import React, { useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { contractAddress } from './utils/index';

import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import Landing from './sections/Landing';
import Parameters from './sections/Parameters';
import Contracts from './sections/Contracts';
import Distribution from './sections/Distribution';
import Governance from './sections/Governance';
import Overview from './sections/Overview';
import Rebase from './sections/Rebase';
import Staking from './dapp/Staking';
import Gov from './dapp/Gov';
import Pool from './dapp/Pool';
import StakeNav from './components/StakeNav';
import Rebaser from './dapp/Rebaser';
import Asymmetrical from './sections/Asymmetrical';
import Ownership from './sections/Ownership';

import degov from './assets/degov.png';
import curve from './assets/curve.png';
import uni from './assets/uni.png';
import debase from './assets/debase.png';
import usdc from './assets/usdc.png';

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
			<Switch>
				<Route path="/dapp">
					<Web3ReactProvider getLibrary={getLibrary}>
						<StakeNav>
							<Route path="/dapp/staking">
								<Route path="/dapp/staking/debase-yCurve">
									<Pool
										tokenText="YCurve"
										rewardText="Debase"
										poolName="Debase/YCurve Pool"
										rewardTokenImage={debase}
										stakeTokenImage={curve}
										tokenAddress={contractAddress.YCurve}
										poolAddress={contractAddress.debaseYCurvePool}
									/>
								</Route>
								<Route path="/dapp/staking/debase-usdc">
									<Pool
										tokenText="USDC-LP"
										rewardText="Debase"
										poolName="Debase/USDC-LP Pool"
										rewardTokenImage={debase}
										stakeTokenImage={usdc}
										tokenAddress={contractAddress.debaseUSDCLP}
										poolAddress={contractAddress.debaseUSDCPool}
									/>
								</Route>
								<Route path="/dapp/staking/degov-uni">
									<Pool
										tokenText="UNI"
										rewardText="Degov"
										poolName="Degov/UNI Pool"
										rewardTokenImage={degov}
										stakeTokenImage={uni}
										tokenAddress={contractAddress.UNI}
										poolAddress={contractAddress.degovUNIPool}
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
					<Overview ref={overviewRef} />
					<Rebase />
					<Asymmetrical />
					<Governance scrollToParameters={scrollToParameters} />
					<Distribution />
					<Parameters ref={parametersRef} />
					<Contracts />
					<Ownership ref={ownershipRef} scrollToOwnership={scrollToOwnership} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
