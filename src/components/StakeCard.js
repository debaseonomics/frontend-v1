import React from 'react';
import { Link } from 'react-router-dom';
import { turncate, poolAbi, fetcher } from '../utils/index';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { formatEther } from 'ethers/lib/utils';

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
	enabled,
	battery
}) {
	const { library } = useWeb3React();

	const { data: currentReward } = useSWR([contract, 'initReward'], {
		fetcher: fetcher(library, poolAbi)
	});

	const { data: getRewardDistributed } = useSWR([contract, 'rewardDistributed'], {
		fetcher: fetcher(library, poolAbi)
	});

	return (
		<div className="box">
			<div className="block">
				<h3 className="title is-size-4-tablet is-size-5-mobile has-text-centered is-family-secondary">
					<div className="battery">
						{battery}

					</div>
					{title}
				</h3>
				<div className="divider" style={{ color: '#C0C2C9' }}>
					{infoText}
				</div>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
					Contract:{' '}
					<a target="_blank" rel="noopener noreferrer" href={contractLink}>
						{turncate(contract, 16, '...')}
					</a>
				</h5>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
					Website:{' '}
					<a target="_blank" rel="noopener noreferrer" href={websiteLink}>
						{website}
					</a>
				</h5>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">Total Reward: {supply}</h5>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">Halving period: {duration}</h5>
				<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
					Halving Reward: {currentReward ? parseFloat(formatEther(currentReward)) * 1 + tokenTag : '...'}
				</h5>
				{enabled ? (
					<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
						Rewards Claimed:{' '}
						{getRewardDistributed ? (
							parseFloat(formatEther(getRewardDistributed)).toFixed(2) + tokenTag
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
