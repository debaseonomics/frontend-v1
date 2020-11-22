import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Gov() {
	const history = useHistory();

	function handleOnClick(index) {
		history.push('/dapp/governance/proposal/' + index);
	}

	const data = [
		{
			name: 'Uniswap Improvement Strategy',
			date: 'Executed October 13th, 2020',
			status: 'Passed'
		},
		{
			name: 'Upgrade cUSDC Interest Rate Model',
			date: 'Cancelled September 21st, 2020',
			status: 'Failed'
		}
	];

	return (
		<div className="columns is-centered">
			<div className="column is-8">
				<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary has-text-centered">
					Governance Overview
				</h2>
				<nav className="level">
					<div className="mt-1 mb-0 mr-1 level-item box has-text-centered">
						<div>
							<p className="heading">Degov Distributed</p>
							<p className="title">22,310/25,000</p>
						</div>
					</div>
					<div className="mt-1 mb-0 mr-1 level-item box has-text-centered">
						<div>
							<p className="heading">Votes Delegated</p>
							<p className="title">1222</p>
						</div>
					</div>
					<div className="mt-1 mb-0 mr-1 level-item box has-text-centered">
						<div>
							<p className="heading">Voter</p>
							<p className="title">100</p>
						</div>
					</div>

					<div className="mt-1 mb-0 level-item box has-text-centered">
						<div>
							<p className="heading">Proposals Passed</p>
							<p className="title">1</p>
						</div>
					</div>
				</nav>
				<table className="table is-fullwidth" style={{ borderRadius: '10px' }}>
					<thead>
						<tr>
							<th>Proposal</th>
							<th className="has-text-right">Status</th>
						</tr>
					</thead>
					<tbody>
						{data.map((ele, index) => (
							<tr key={index} onClick={() => handleOnClick(index + 1)}>
								<td>
									<p className="title">{ele.name}</p>
									<p className="subtitle">{ele.date}</p>
								</td>
								<td className="has-text-right">
									<span
										className={
											ele.status === 'Passed' ? (
												'mt-3 tag is-success is-large'
											) : (
												'mt-3 tag is-danger is-large'
											)
										}
									>
										{ele.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
