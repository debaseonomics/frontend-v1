import React from 'react';
import { etherScanAddress, contractAddress, uniAddress } from '../utils';
import { Link } from 'react-router-dom';

const Distribution = React.forwardRef(
	// eslint-disable-next-line
	({ isMobile }, ref) => {
		return (
			<div className="section" ref={ref}>
				<div className="container block is-fluid ">
					<h3 className="title is-size-3-tablet is-size-4-mobile">Distribution Pools</h3>
					<h4 className="subtitle is-size-4-tablet is-size-5-mobile">
						No pre-mine. No founder fees. 100% community distribution.
					</h4>
				</div>
				<div className="container block is-fluid">
					<div className={isMobile ? 'box content' : 'box content is-medium'}>
						<h3>Debase</h3>
						<p>
							Debase token has two separate staking pools. The first pool yields the initial Debase token
							supply. To join this pool, you need to stake{' '}
							<a href="https://www.curve.fi/iearn/deposit">DAI</a> tokens the into the{' '}
							<Link to="/dapp/staking/debase-dai">Debase/DAI</Link> staking pool. A total of 25,000 Debase
							tokens will be distributed from this pool with 12,500 Debase being during the first 24
							hours. After which the tokens to distribute will half to 6,250 and this halving will
							continue every 24 hours until 25,000 Debase are distributed from the pool. Also for the
							first 24 hours only 10,000 DAI can be staked per account to support fairer distribution.{' '}
							<strong>
								So if you encounter an error while staking, be sure that you are staking under the
								mentioned limit.
							</strong>
						</p>
						<p>
							The second pool is meant to provide stability and security to the Debase by provide
							liquidity. To join tis pool, you need to add liquidity into the{' '}
							<a href={uniAddress['debase-DAI-POOL']}>Debase/DAI</a> Uniswap pool to acquire{' '}
							<a href={etherScanAddress + contractAddress.debaseDAIPool}>Debase-DAI-V2</a> liquidity pool
							tokens. These tokens can be deposited into the into the{' '}
							<Link to="/dapp/staking/debase-dai">Debase/DAI</Link> staking pool to earn debase reward
							tokens. A total of 75,000 Debase tokens will be distributed from this pool with 37,500
							Debase being during the first 72 hours. After which the tokens to distribute will half to
							18,750 and this halving will continue every 72 hours until 75,000 Debase are distributed
							from the pool.
						</p>
						<p>
							Keeping this distribution scheme is mind rebases will only be available when 95% of the
							Debase are distributed from the above mentioned pools or 3 weeks after the launch of the
							Orchestrator contract incase not enough tokens are distributed from the pool. So rebases can
							be available as early as 2 weeks from the launch.
						</p>
						<h3>Degov</h3>
						<p>
							Degov token has one staking pool. This pool will only be available to stake into after the
							orchestrator initiated the first rebase. With the conditions of when the first rebase
							mentioned above. So to join this pool, you need to stake{' '}
							<a href="https://app.uniswap.org/#/Debase">DEBASE</a> tokens into the{' '}
							<Link to="/dapp/staking/debase-dai">Degov/Dai-Lp</Link> pool.A total of 25,000 Degov tokens
							will be distributed from this pool with 12,500 Degov being distributed during the first 96
							hours of the pools launch. After which the tokens to distribute will half to 6,250 and this
							halving will continue every 96 hours until 25,000 Degov are distributed from the pool. So if
							you encounter an error while staking, be sure that you are staking under the mentioned limit
							or the first rebase has been initiated and the Degov/Dai-Lp pool started.
						</p>
					</div>
				</div>
			</div>
		);
	}
);

export default Distribution;
