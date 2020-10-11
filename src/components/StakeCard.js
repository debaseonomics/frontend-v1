import React from 'react';
import { Link } from 'react-router-dom';
import { turncate } from '../utils/index';

export default function StakeCard({
	title,
	link,
	contract,
	contractLink,
	website,
	websiteLink,
	supply,
	initial,
	infoText,
	warningText,
	warningText2,
	duration
}) {
	return (
		<div className="box">
			<div className="block">
				<h3 className="title is-size-3-desktop is-size-4-touch has-text-centered">{title}</h3>
				<div className="divider">{infoText}</div>
				<h5 className="title is-size-5-desktop is-size-6-touch">
					<strong>Contract</strong>: <a href={contractLink}>{turncate(contract, 16, '...')}</a>
				</h5>
				<h5 className="title is-size-5-desktop is-size-6-touch">
					<strong>Website</strong>: <a href={websiteLink}>{website}</a>
				</h5>
				<h5 className="title is-size-5-desktop is-size-6-touch">
					<strong>Total supply</strong>: {supply}
				</h5>
				<h5 className="title is-size-5-desktop is-size-6-touch">
					<strong>Initial supply</strong>: {initial}
				</h5>
				<h5 className="title is-size-5-desktop is-size-6-touch">
					<strong>Halving period</strong>: {duration}
				</h5>

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
