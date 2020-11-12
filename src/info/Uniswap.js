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
							Uniswap is by far the biggest issue that is faced by such flexible coins. The issue relates
							to how Uniswap behaves when a rebase event happens. Say during a rebase even the protocol
							increases Debases supply by 1000 Debase tokens. What in theory that is supposed to happen is
							as users get more "tokens" from the rebase they are supposed to sell of and this sell off is
							supposed to induce Debase price to eventually reach its target price.
						</p>
						<p>
							This mechanism has been pointed about by the Ampleforth{' '}
							<a href="https://www.ampleforth.org/papers/">white paper</a> yet in practice this doesn't
							happen since the uniswap pool, where the tokens are given to provide liquidity,
							automatically get the new price the fastest. As uniswap functions using a constant product
							model (reserve1*reserve2 = totalReserves), so as soon as the supply is changed so does the
							price instantly. Uniswap automatically aligns itself to the new price, before users can sell
							off or buy back tokens to find the new price themselves.
						</p>
						<p>
							So rebasing tokens have to rely on Uniswap for the vital liquidity it needs to grow but in
							doing so they sacrifice the price discovery that they could have been induced by their
							selloff or buy back of the token. Debase attempts to solve this problem by having a
							stabilizer pool that could be programmed behave similar to an uniswap pool but have a
							mechanism that could delay its constant product change. Thus, essentially creating a worse
							off pool but the trade off is that it allows users to find the price discovery by selling or
							holding the tokens themselves. This solution is open-ended and other mechanism are possible
							if developed to over this issue. By overcoming it debaseonomics could achieve vision pointed
							out by Ampleforth.
						</p>
					</div>
				</div>
			</div>
		);
	}
);

export default Uniswap;
