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
						Debaseonomics allows for the governance to adjust the smoothing parameter (Rebase Lag) 
						over configurable ranges that is applied in-order to dampen supply changes during a rebase. 
						The rebase lag can be configured to behave in accordance with both the amplitude 
						and sign of deviation between the current price and the target price thus allowing for assymmetric lag.
						This flexibility prevents the protocol from increasing or decreasing the supply too fast 
						if suitable to circumstance. 

					
					</p>
					<p>
						For instance, say the supply needs to increase by an addition of 1000 DEBASE tokens to account 
						for the price difference from the target price, and governance has configured a lag parameter of 20 to be applied for the supply change range of 500-1500. 
						Here, the supply increase will dampen by a factor of 20 and to reduce the supply increase to 50 Debase only. 
						Thus a dramatic increase in supply will not be seen.
					</p>
					<p>
						On the other hand, if 10000 DEBASE tokens are to be added in rebase, a lower lag parameter of 5 can be used 
						to lessen the smoothing effect on the supply change. In theory, this enforces a more dramatic supply change 
						(and presumably, price change) relative to the previous example.
					</p>
				</div>
			</div>
		</div>
	);
}
