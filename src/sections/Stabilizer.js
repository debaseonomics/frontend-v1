import React from 'react';

export default function Stabilizer() {
	return (
		<div className="section">
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Stabilizer</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">Performance based rewards</h4>
			</div>
			<div className="container block is-fluid ">
				<div className="box content ">
					To reward debase user's being able to hit it's price target during a rebase. A stabilizer pool will
					be available to stake into after the start of the first rebase. The pool will reward debase tokens
					and to stake into it Debase/DAI-LP uniswap token will be provided thus helping to secure long term
					pool liquidity.
					<br />
					<br />
					This pool will be funds with a configurable amount of reward tokens with certain conditions are met.
					So say when a <strong>sequence</strong> of neutral rebases ( current exchange rate within deviation
					threshold of price target ) have been recorded then 10,000 DEBASE token will be sent into stabilizer
					pool to be distributed as a reward to the community. Under the condition that the stabilizer pool
					previous distribution cycle has ended which itself can be configured to be ignored.
					<br />
					<br />
					Finally keeping mind the portion (60%) of the DEBASE total supply that is available to be
					distributed and Debase policy contract distributing funds to the stabilizer pool. The whole
					stabilizer contract can be replaced with another pool that meets a set interface. Thus providing a
					greater degree of flexibility in how the stabilizer funds will be distributed.
				</div>
			</div>
		</div>
	);
}
