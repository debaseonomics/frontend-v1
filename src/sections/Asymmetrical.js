import React from 'react';

export default function Asymmetrical() {
	return (
		<div className="section">
			<div className="container block is-fluid ">
				<h3 className="title is-size-3-tablet is-size-4-mobile">Asymmetrical Rebases</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile">Additional flexibility</h4>
			</div>
			<div className="container block is-fluid ">
				<div className="box content ">
					<p>
						In addition to the previous discussion on how rebases work. DEBASE introduces the ability to
						adjust the smoothing parameter (Rebase Lag) that is applied in-order to dampen supply changes
						during a rebase. Thus preventing the protocol from increasing or decreasing the supply too fast
						by applying that change over a number of rebases.
					</p>
					<p>
						So say the supply needs needs to increase by an addition 1000 DEBASE tokens to account for the
						price difference from the target price. We will dampen the supply increase by dividing the
						supply increase by 20 and to reduce the supply change to 50 DEBASE only. This is currently how
						most Flexible supply change tokens function with but unfortunately all of them apply a single
						symmetrical lag parameter.
					</p>
					<p>
						DEBASE allows rebase lag can be configured to behave differently according to how far the
						current price is from the target price and if the current price is above or below the target
						price. Thus allowing for an asymmetrical lag parameters that are applied according to the
						current deviation from the target price.
					</p>
					<p>
						An example being that if the price deviation is between 10% - 15% a lag parameter of 20 will be
						applied to account for the deviation being very low. Thus we would not need to smoothen the
						possible supply change as much. Compared to the price deviation being in between 30%-40% we will
						apply a lower lag parameter of 5 to lessen the smoothing effect on the supply change thus in
						theory enforcing a more dramatic price change since the number of tokens have greatly increased.
						All of this is community configurable using the DEGOV governance token.
					</p>
				</div>
			</div>
		</div>
	);
}
