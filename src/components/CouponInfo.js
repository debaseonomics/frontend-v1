import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { fetcher, burnPoolAbi, contractAddress } from '../utils/index';
import useSWR from 'swr';
import { formatEther, parseEther } from 'ethers/lib/utils';
import TextInfo from './TextInfo.js';
import debase from '../assets/debase.png';

export default function CouponInfo({ debaseSupply, isMobile, id }) {
	const { library, account } = useWeb3React();

	const { data: debaseAccrued, mutate: getDebaseAccrued } = useSWR(
		[ contractAddress.burnPool, 'earned', id, account ],
		{
			fetcher: fetcher(library, burnPoolAbi)
		}
	);

	console.log(debaseAccrued ? formatEther(debaseAccrued) : null);

	useEffect(
		() => {
			library.on('block', () => {
				getDebaseAccrued(undefined, true);
			});
			return () => {
				library.removeAllListeners('block');
			};
		},
		[ library, getDebaseAccrued ]
	);

	return (
		<TextInfo
			isMobile={isMobile}
			label="Debase Earned"
			value={
				debaseAccrued !== undefined ? (
					parseFloat(formatEther(debaseAccrued.mul(debaseSupply).div(parseEther('1')))).toFixed(4) * 1
				) : (
					'0'
				)
			}
			img={debase}
			token="Debase"
		/>
	);
}
