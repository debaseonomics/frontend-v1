import React from 'react';

export default function Distribution() {
	return (
		<div className="section">
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Distribution</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">
					No pre-mine. No founder fees. 100% community distribution.
				</h4>
			</div>
			<div className="container block is-fluid">
				<div className="box content is-medium">
					DEBASE token has two separate staking pools. The first pool yields the initial DEBASE token supply.
					To join this pool, you need to stake <a href="https://www.curve.fi/iearn/deposit">yCurve</a> tokens
					through the DEBASE application. A total of 25,000 DEBASE tokens will be distributed from this pool
					with 12,500 DEBASE being during the first 24 hours. After which the tokens to distribute will half
					to 6,250 and this halving will continue every 24 hours until 25,000 DEBASE are distributed from the
					pool. Also for the first 24 hours only 10,000 yCurve can be staked per account to support fairer
					distribution.
					<br />
					<br />
					The second pool is meant to provide stability and security to the DEBASE by provide liquidity. To
					join tis pool, you need to stake <a href="./">DEBASEUSDC-V2 LP</a> tokens that can be acquired by
					depositing DEBASE and USDC into the <a href="./">DEBASE/USDC</a> Uniswap pool. A total of 75,000
					DEBASE tokens will be distributed from this pool with 37,500 DEBASE being during the first 72 hours.
					After which the tokens to distribute will half to 18,750 and this halving will continue every 72
					hours until 75,000 DEBASE are distributed from the pool.
					<br />
					<br />
					Keeping this distribution scheme is mind rebases will only be available when 95% of the DEBASE are
					distributed from the above mentioned pools or 3 weeks after the launch of the Orchestrator contract
					incase not enough tokens are distributed from the pool. So rebases can be available as early as 2
					weeks from the launch.
					<br />
					<br />
					DEGOV token has one staking pool. This pool will only be available to stake into after the
					orchestrator initiated the first rebase. With the conditions of when the first rebase mentioned
					above. So to join this pool, you need to stake <a href="./">UNI</a> tokens into the{' '}
					<a href="./">DEGOV/UNI</a> pool.A total of 25,000 DEGOV tokens will be distributed from this pool
					with 12,500 DEBASE being distributed during the first 96 hours of the pools launch. After which the
					tokens to distribute will half to 6,250 and this halving will continue every 96 hours until 25,000
					DEBASE are distributed from the pool.
				</div>
			</div>
		</div>
	);
}
