import React, { useEffect, Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { lpAbi, fetcher, burnPoolAbi } from '../utils/index';
import useSWR from 'swr';
import debase from '../assets/debase.png';
import empty from '../assets/empty.png';
import { formatEther, parseEther } from 'ethers/lib/utils';
import TextInfo from './TextInfo.js';

export default function CouponInfo({ tokenAddress, poolAddress, index, isMobile }) {
	const { library } = useWeb3React();

	const { data: debaseAccrued, mutate: getDebaseAccrued } = useSWR([ poolAddress, 'earned', index ], {
		fetcher: fetcher(library, burnPoolAbi)
	});

	const { data: couponBalance, mutate: getCouponBalance } = useSWR([ poolAddress, 'getUserCouponBalance', index ], {
		fetcher: fetcher(library, burnPoolAbi)
	});

	const { data: rewardCycle } = useSWR([ poolAddress, 'rewardCycles', index ], {
		fetcher: fetcher(library, burnPoolAbi)
	});

	const { data: debaseSupply, mutate: getDebaseSupply } = useSWR([ tokenAddress, 'totalSupply' ], {
		fetcher: fetcher(library, lpAbi)
	});

	useEffect(
		() => {
			library.on('block', () => {
				getDebaseSupply(undefined, true);
				getDebaseAccrued(undefined, true);
				getCouponBalance(undefined, true);
			});
			return () => {
				library.removeAllListeners('block');
			};
		},
		[ library, getDebaseAccrued, getDebaseSupply, getCouponBalance ]
	);

	return (
		<Fragment>
			<TextInfo
				isMobile={isMobile}
				label="Epochs"
				value={rewardCycle ? rewardCycle[0].toNumber() : '...'}
				token="Debase"
				noImage={true}
				img={empty}
			/>
			<TextInfo
				isMobile={isMobile}
				label="Epochs Rewarded"
				value={rewardCycle ? rewardCycle[2].toNumber() : '...'}
				token="Debase"
				noImage={true}
				img={empty}
			/>
			<TextInfo
				isMobile={isMobile}
				label="Reward Share"
				value={rewardCycle ? parseFloat(formatEther(rewardCycle[1])).Fixed(isMobile ? 4 : 8) * 1 : '...'}
				token="Debase"
				img={empty}
			/>

			<TextInfo
				isMobile={isMobile}
				label="Coupons Issued"
				value={rewardCycle ? parseFloat(formatEther(rewardCycle[3])).Fixed(isMobile ? 4 : 8) * 1 : '...'}
				token="Debase"
				img={empty}
			/>
			<TextInfo
				isMobile={isMobile}
				label="Reward Distributed"
				value={rewardCycle ? parseFloat(formatEther(rewardCycle[9])).Fixed(isMobile ? 4 : 8) * 1 : '...'}
				token="Debase"
				img={empty}
			/>
			<TextInfo
				isMobile={isMobile}
				label="Coupon Balance"
				value={couponBalance ? parseFloat(formatEther(couponBalance)).Fixed(isMobile ? 4 : 8) * 1 : '...'}
				token="Debase"
				img={empty}
			/>
			<TextInfo
				isMobile={isMobile}
				label="Debase Earned"
				value={
					debaseAccrued !== undefined && debaseSupply !== undefined ? (
						parseFloat(formatEther(debaseAccrued.mul(debaseSupply).div(parseEther('1')))).toFixed(
							isMobile ? 4 : 8
						) * 1
					) : (
						'0'
					)
				}
				token="Debase"
				img={debase}
			/>
		</Fragment>
	);
}
