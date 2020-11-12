import React from 'react';

const Uniswap = React.forwardRef(
	// eslint-disable-next-line
	({ isMobile }, ref) => {
		return (
			<div className="section pl-0 pr-0" ref={ref}>
				<div className=" block  ">
					<h3 className="title is-size-3-tablet is-size-5-mobile is-family-secondary">Uniswap</h3>
					<h4 className="subtitle is-size-4-tablet is-size-5-mobile has-text-grey-darker">
						The biggest issue with rebase tokens
					</h4>
				</div>
				<div className=" block  ">
					<div className={isMobile ? 'box content' : 'box content is-medium'}>
						<p>
							Ironically, AMMs like Uniswap is one of the biggest issues that is faced by such flexible
							coins. Even though such tokens wouldn't exist without Uniswap, the issue relates to how
							Uniswap behaves when a rebase event happens. For instance, assume that during a rebase the
							protocol increases Debases supply by 1000 DEBASE tokens. In theory, users should help
							discover the new price of the token using the "new" tokens they get by selling, which will
							help DEBASE reach its target price. This mechanism has been pointed about by the Ampleforth{' '}
							<a href="https://www.ampleforth.org/papers/">white paper</a>, yet this doesn't happen in
							practice.
						</p>
						<p>
							Uniswap pool, where the tokens are given to provide liquidity, automatically get the new
							price the fastest to maintain the constant product model. As uniswap functions using a
							constant product model (reserve1*reserve2 = totalReserves), so as soon as the supply is
							changed so does the price instantly. That is, Uniswap automatically aligns itself to the new
							price, before users can sell off or buy back tokens to allow the market find the price.
						</p>
						<p>
							While elastic supply tokens have to rely on Uniswap for the vital liquidity it needs to
							grow, in doing so, they sacrifice market led price discovery. Debaseonomics attempts to
							solve this problem by having a stabilizer pool that could be programmed to behave similar to
							an Uniswap pool but with a mechanism that could delay its constant product change.
							Essentially, this means creating a worse-off pool that allows users to find the price
							discovery by market activity. This solution is open-ended; Debaseonomics incentivizes novel
							mechanisms to ameliorate this issue. By overcoming it, Debaseonomics can actualize the
							vision pointed out by Ampleforth.
						</p>
					</div>
				</div>
			</div>
		);
	}
);

export default Uniswap;
