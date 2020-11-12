import React from 'react';

export default function Asymmetrical({ isMobile }) {
	return (
		<div className="section pl-0 pr-0">
			<div className=" block  ">
				<h3 className="title is-size-3-tablet is-size-5-mobile is-family-secondary">asymmetrical lag</h3>
				<h4 className="subtitle is-size-4-tablet is-size-5-mobile has-text-grey-darker">
					Additional flexibility
				</h4>
			</div>
			<div className=" block  ">
				<div className={isMobile ? 'box content' : 'box content is-medium'}>
					<p>
						Debase allows for the community to adjust the smoothing parameter (Rebase Lag) over configurable
						ranges that is applied in-order to dampen supply changes during a rebase. Thus preventing the
						protocol from increasing or decreasing the supply too fast.
					</p>
					<p>
						So the rebase lag can be configured to behave differently according to how far the current price
						is from the target price and if the current price is above or below the target price. Thus
						allowing for asymmetrical lag parameters that are applied according to the current deviation
						from the target price.
					</p>
					<p>
						So say the supply needs to increase by an addition 1000 Debase tokens to account for the price
						difference from the target price, and we have configured a lag parameter of 20 to applied for
						the supply change range of 500-1500. We will dampen the supply increase by dividing the supply
						increase by 20 and to reduce the supply change to 50 Debase only. Thus, we would not need such a
						dramatic increase in the supply.
					</p>
					<p>
						Compared to the supply change being 10000 Debase tokens we will apply a lower lag parameter of 5
						to lessen the smoothing effect on the supply change thus in theory enforcing a more dramatic
						price change since the number of tokens have greatly increased or decreased if the supply change
						was negative.
					</p>
				</div>
			</div>
		</div>
	);
}
