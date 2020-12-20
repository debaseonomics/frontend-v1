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
	battery,
	button
}) {
	const { library } = useWeb3React();

	const { data: currentReward } = useSWR([contract, 'initReward'], {
		fetcher: fetcher(library, poolAbi)
	});

	const { data: getRewardDistributed } = useSWR([contract, 'rewardDistributed'], {
		fetcher: fetcher(library, poolAbi)
	});

	return (
		<div className="boxs stakecard">
			<div className="block">
				<div className="stake-header ">
					<h3 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">
						{title}
					</h3>
				</div>
				{/*<div className="divider" style={{ color: '#C0C2C9' }}>
					{infoText}
	</div>*/}
				<div className="stakegrid">
					<div className="buttons">
						<a className="is-primary" target="_blank" rel="noopener noreferrer" href={contractLink}>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M7 18H17V16H7V18Z" fill="currentColor" />
								<path d="M17 14H7V12H17V14Z" fill="currentColor" />
								<path d="M7 10H11V8H7V10Z" fill="currentColor" />
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
									fill="currentColor"
								/>
							</svg>

							 contract
							{/*turncate(contract, 16, '...')*/}
						</a>
						<a className="is-primary" target="_blank" rel="noopener noreferrer" href={websiteLink}>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14.8284 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.509 3.3668 14.9763 3.3668 13.4142 4.9289L10.5858 7.75732L12 9.17154L14.8284 6.34311C15.6095 5.56206 16.8758 5.56206 17.6568 6.34311C18.4379 7.12416 18.4379 8.39049 17.6568 9.17154L14.8284 12Z"
									fill="currentColor"
								/>
								<path
									d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02372 20.6332 6.49106 20.6332 4.92896 19.0711C3.36686 17.509 3.36686 14.9764 4.92896 13.4143L7.75739 10.5858L9.1716 12L6.34317 14.8285C5.56212 15.6095 5.56212 16.8758 6.34317 17.6569C7.12422 18.4379 8.39055 18.4379 9.1716 17.6569L12 14.8285Z"
									fill="currentColor"
								/>
								<path
									d="M14.8285 10.5857C15.219 10.1952 15.219 9.56199 14.8285 9.17147C14.4379 8.78094 13.8048 8.78094 13.4142 9.17147L9.1716 13.4141C8.78107 13.8046 8.78107 14.4378 9.1716 14.8283C9.56212 15.2188 10.1953 15.2188 10.5858 14.8283L14.8285 10.5857Z"
									fill="currentColor"
								/>
							</svg>
							{website}
						</a>
					</div>
					<h5 className="subtitle is-size-5-tablet is-size-6-mobile"><span>Total Reward:</span> <span>{supply}</span></h5>
					<h5 className="subtitle is-size-5-tablet is-size-6-mobile"><span>Halving period:</span> <span>{duration}</span></h5>
					<h5 className="batWrap subtitle is-size-5-tablet is-size-6-mobile">
						<span>Halving Reward
								<div className="battery">
								{battery}
							</div>
						</span>
						<span>{currentReward ? parseFloat(formatEther(currentReward)).toFixed(9) * 1 + tokenTag : '...'}</span>
					</h5>
					{enabled ? (
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
							<span>Rewards Claimed</span>
							<span>{getRewardDistributed ? (
								parseFloat(formatEther(getRewardDistributed)).toFixed(2) + tokenTag
							) : (
									'...'
								)}</span>
						</h5>
					) : null}
				</div>

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
					<button className="button is-edged is-fullwidth is-primary">{button}</button>
				</Link>
			</div>
		</div>
	);
}
