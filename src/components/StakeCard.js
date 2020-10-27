import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { turncate, poolAbi } from '../utils/index';
import { DateTime } from 'luxon';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { formatEther, isAddress } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import { uniAbi } from '../utils/index';

const fetcher = (library, abi) => (...args) => {
	const [ arg1, arg2, ...params ] = args;
	if (isAddress(arg1)) {
		const address = arg1;
		const method = arg2;
		const contract = new Contract(address, abi, library.getSigner());
		return contract[method](...params);
	}
	const method = arg1;
	return library[method](arg2, ...params);
};

export default function StakeCard({
	title,
	link,
	tokenTag,
	contract,
	debaseDaiLp,
	rewardToken,
	contractLink,
	website,
	websiteLink,
	supply,
	infoText,
	warningText,
	warningText2,
	duration,
	enabled
}) {
	const { library } = useWeb3React();

	const { data: getPeriodFinish } = useSWR([ contract, 'periodFinish' ], {
		fetcher: fetcher(library, poolAbi)
	});

	const { data: currentReward } = useSWR([ contract, 'initReward' ], {
		fetcher: fetcher(library, poolAbi)
	});

	return (
		<div className="box">
			<div className="block">
				<h3 className="title is-size-3-tablet is-size-4-mobile has-text-centered">{title}</h3>
				<div className="divider">{infoText}</div>
				<h5 className="title is-size-5-tablet is-size-6-mobile">
					<strong>Contract</strong>: <a href={contractLink}>{turncate(contract, 16, '...')}</a>
				</h5>
				<h5 className="title is-size-5-tablet is-size-6-mobile">
					<strong>Website</strong>: <a href={websiteLink}>{website}</a>
				</h5>
				<h5 className="title is-size-5-tablet is-size-6-mobile">
					<strong>Total Reward</strong>: {supply}
				</h5>
				<h5 className="title is-size-5-tablet is-size-6-mobile">
					<strong>Halving period</strong>: {duration}
				</h5>
				<h5 className="title is-size-5-tablet is-size-6-mobile">
					<strong>Halving Reward</strong>:{' '}
					{currentReward ? parseFloat(formatEther(currentReward)) * 1 + tokenTag : '...'}
				</h5>
				{enabled ? (
					<h5 className="title is-size-5-tablet is-size-6-mobile has-text-centered">
						<strong>Time to next halving</strong>{' '}
						{getPeriodFinish ? (
							DateTime.fromSeconds(getPeriodFinish.toNumber()).toRelative({ round: false })
						) : (
							'...'
						)}
					</h5>
				) : null}

				<h6
					className={
						warningText == null ? 'is-hidden' : 'subtitle mt-1 is-6 has-text-centered has-text-warning'
					}
				>
					{warningText}
				</h6>
				<h6
					className={
						warningText2 == null ? 'is-hidden' : 'subtitle mt-1 is-6 has-text-centered has-text-warning'
					}
				>
					{warningText2}
				</h6>
			</div>
			<div className="block">
				<Link to={'/dapp/staking/' + link}>
					<button className="button is-rounded is-fullwidth is-primary">Get Token</button>
				</Link>
			</div>
		</div>
	);
}
