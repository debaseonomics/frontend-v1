import React, { useEffect, useState, Fragment } from 'react';
import { useWeb3React } from '@web3-react/core';
import { lpAbi, fetcher, mph88Abi } from '../utils/index';
import useSWR from 'swr';
import { DateTime } from 'luxon';
import { formatEther, parseEther } from 'ethers/lib/utils';
import TextInfo from './TextInfo.js';
import { BigNumber } from 'ethers';

export default function CouponInfo({
	rewardTokenAddress,
	poolAddress,
	rewardText,
	rewardTokenImage,
	deposit,
	isMobile,
	dai,
	mph88
}) {
	const { library } = useWeb3React();

	const { data: debaseAccrued, mutate: getDebaseAccrued } = useSWR([ poolAddress, 'earned', deposit.id ], {
		fetcher: fetcher(library, mph88Abi)
	});

	useEffect(
		() => {
			library.on('block', () => {
				getDebaseSupply(undefined, true);
				getDebaseAccrued(undefined, true);
			});
			return () => {
				library.removeAllListeners('block');
			};
		},
		[ library, getDebaseSupply, getDebaseAccrued ]
	);

	return <Fragment />;
}
