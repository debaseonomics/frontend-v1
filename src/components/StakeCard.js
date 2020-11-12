import React from 'react';
import { Link } from 'react-router-dom';
import { turncate, poolAbi } from '../utils/index';
import { DateTime } from 'luxon';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { formatEther, isAddress } from 'ethers/lib/utils';
import { Contract } from 'ethers';

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

	const { data: getStartTime } = useSWR([ contract, 'startTime' ], {
		fetcher: fetcher(library, poolAbi)
	});

	return (
		<div className="box">
			<div className="block">
				<h3 className="title is-size-4-tablet is-size-5-mobile has-text-centered is-family-secondary">
					{title}
				</h3>
				<div className="divider">{infoText}</div>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
					Contract: <a href={contractLink}>{turncate(contract, 16, '...')}</a>
				</h5>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
					Website: <a href={websiteLink}>{website}</a>
				</h5>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">Total Reward: {supply}</h5>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">Halving period: {duration}</h5>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
					Halving Reward: {currentReward ? parseFloat(formatEther(currentReward)) * 1 + tokenTag : '...'}
				</h5>
				{enabled ? (
					<h5 className="subtitle is-size-5-tablet is-size-6-mobile has-text-centered">
						Staking starts in{' '}
						{getStartTime ? (
							DateTime.fromSeconds(getStartTime.toNumber()).toRelative({ round: false })
						) : (
							'...'
						)}
					</h5>
				) : null}

				<h6
					className={
						warningText == null ? (
							'is-hidden'
						) : (
							'subtitle is-size-5-tablet is-size-6-mobile has-text-centered has-text-warning'
						)
					}
				>
					{warningText}
				</h6>
				<h6
					className={
						warningText2 == null ? (
							'is-hidden'
						) : (
							'subtitle is-size-5-tablet is-size-6-mobile has-text-centered has-text-warning'
						)
					}
				>
					{warningText2}
				</h6>
			</div>
			<div className="block">
				<Link to={'/dapp/staking/' + link}>
					<button className="button is-edged is-fullwidth is-primary">Stake</button>
				</Link>
			</div>
		</div>
	);
}
