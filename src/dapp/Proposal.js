import React from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export default function Proposal() {
	let { proposalId } = useParams();

	const proposalData = {
		name: 'Uniswap Improvement Strategy',
		date: 'Executed October 13th, 2020',
		status: 'Passed'
	};

	const proposalHistory = [
		{
			status: 'Created',
			link: '#',
			date: 'October 12th, 2020 – 10:18pm'
		},
		{
			status: 'Active',
			link: '#',
			date: 'October 12th, 2020 – 10:18pm'
		},
		{
			status: 'Succeeded',
			link: '#',
			date: 'October 15th, 2020 – 9:10pm'
		},
		{
			status: 'Queued',
			link: '#',
			date: 'October 15th, 2020 – 2:16pm'
		},
		{
			status: 'Executed',
			link: '#',
			date: 'October 17th, 2020 – 2:17pm'
		}
	];

	const isMobile = useMediaQuery({ query: `(max-width: 482px)` });

	return (
		<div className="columns is-centered">
			<div className="column is-8">
				<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary has-text-centered">
					Proposal Overview
				</h2>
				<nav className="box level is-mobile">
					<div className="level-left">
						<div className="level-item">
							<div>
								<h3 className="pb-5 title is-size-4-tablet is-size-6-mobile">{proposalData.name}</h3>
								<h4 className="subtitle is-size-5-tablet is-size-6-mobile">{proposalData.date}</h4>
							</div>
						</div>
					</div>
					<div className="level-right">
						<div className="level-item">
							<span
								className={
									proposalData.status === 'Passed' ? (
										'tag is-success is-medium'
									) : (
										'tag is-danger is-medium'
									)
								}
							>
								{proposalData.status}
							</span>
						</div>
					</div>
				</nav>
				<div className="columns is-multiline">
					<div className="column is-half">
						<div className="box">
							<nav className="level">
								<div className="level-left">
									<div className="level-item">
										<h4 className="title is-4">For</h4>
									</div>
								</div>
								<div className="level-rigth">
									<div className="level-item">
										<h4 className="title is-4">231,211</h4>
									</div>
								</div>
							</nav>
							<progress className="progress is-primary" value="15" max="100" />
						</div>
					</div>
					<div className="column is-half">
						<div className="box">
							<nav className="level">
								<div className="level-left">
									<div className="level-item">
										<h4 className="title is-4">Against</h4>
									</div>
								</div>
								<div className="level-rigth">
									<div className="level-item">
										<h4 className="title is-4">100,212</h4>
									</div>
								</div>
							</nav>
							<progress className="progress is-danger" value="85" max="100" />
						</div>
					</div>
					<div className="column is-8">
						<div className="box content">
							<h3>Description</h3>
							<ol>
								<li>cUNI._delegateCompLikeTo("0xbbf3f1421d886e9b2c5d71")</li>
								<li>Reduce reserves of cSAI by 510.00 SAI</li>
								<li>Transfer 510.00 SAI to 0x2b384212edc04ae8bb41738d05ba20e33277bf33</li>
							</ol>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis magna consectetur,
								luctus nunc ac, rhoncus felis. Duis a lacus nec nisl accumsan pulvinar. In gravida dolor
								ut lorem mattis, posuere ultricies neque gravida. Morbi et nisi eu ipsum condimentum
								tempus vitae sit amet augue. Sed justo dolor, lobortis ut tellus eget, tempor luctus
								velit. Aliquam malesuada eros mi. Donec dictum molestie sem. Nulla elementum molestie
								diam, vel posuere urna imperdiet eu. Praesent tincidunt lectus vitae sagittis facilisis.
								Curabitur molestie tellus eget urna ornare laoreet. Praesent vulputate nisi ante, et
								maximus lectus congue vitae. Vivamus et risus ac lorem
							</p>
							<p>
								ullamcorper posuere. Nullam cursus metus at faucibus tristique. Aliquam vel enim
								fringilla, finibus mauris ut, tincidunt eros. Morbi ut feugiat quam. Vestibulum eu
								fringilla dui. Sed vestibulum pulvinar enim. Suspendisse at sodales erat, ac suscipit
								magna. Mauris molestie sit amet lectus in lacinia. In pharetra neque a imperdiet
								efficitur. Nullam gravida sapien quis metus sagittis blandit. Suspendisse pretium
								porttitor pellentesque.
							</p>
						</div>
					</div>
					<div className="column">
						<div className="box content">
							<h3>Proposal History</h3>
							{proposalHistory.map((ele, index) => (
								<div className="pb-1 is-block" style={{ width: '100%' }}>
									{ele.status}
									<br />
									{ele.date}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
