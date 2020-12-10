import React from 'react';

const Uniswap = React.forwardRef(
	// eslint-disable-next-line
	({ isMobile }, ref) => {
		return (
			<div className="section pl-0 pr-0" ref={ref}>
				<div className=" block  ">
					<div className={isMobile ? 'box content' : 'box content is-medium'}>
						<h3 className="title is-size-3-tablet is-size-5-mobile is-family-secondary">Uniswap</h3>
						<h4 className="subtitle is-size-4-tablet is-size-5-mobile has-text-grey-darker">
							The biggest issue with rebase tokens
					</h4>
						<p>
							Ironically, AMMs like Uniswap are one of the biggest issues faced by such flexible
							coins. Even though such tokens wouldn't exist without Uniswap, the issue relates to how
							Uniswap behaves when a rebase event happens. For instance, assume that during a rebase the
							protocol increases DEBASE supply by 1000 DEBASE tokens. In theory, users should help
							discover the new price of the token using the "new" tokens they get, by selling, which will
							help DEBASE reach its target price. This mechanism has been pointed about by the Ampleforth{' '}
							<a target="_blank" rel="noopener noreferrer" href="https://www.ampleforth.org/papers/">
								white paper
							</a>, yet this doesn't happen in practice.
						</p>
						<p>
							Uniswap pool, where the tokens are given to provide liquidity, automatically get the new
							price first, to maintain the constant product model. As Uniswap functions using a
							constant product model (reserve1*reserve2 = totalReserves), as soon as the supply is
							changed, the price changes instantly. That is, Uniswap automatically aligns itself to the new
							price, before users can sell off or buy back tokens, allowing the market find the price.
						</p>
						<p>
							While elastic supply tokens have to rely on Uniswap for the vital liquidity it needs to
							grow, in doing so, they sacrifice market-led price discovery. Debaseonomics attempts to
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
