import React, { Fragment, useState, useEffect } from 'react';

/* import Nivo chart line */
import { ResponsiveLine } from '@nivo/line';

/* import data dependencies */
import { formatEther } from 'ethers/lib/utils';
import { request, gql } from 'graphql-request';
import { ethers } from 'ethers';
import { contractAddress, lpAbi } from '../utils';

/* import token logos */
import dai from '../assets/dai.png';
import degov from '../assets/degov.png';
import debase from '../assets/debase.png';

/* Chart theming */
const chartTheme = {
	textColor: '#fff',
	tooltip: {
		container: {
			background: '#212429',
			color: '#ffffff'
		}
	},
	grid: {
		line: {
			stroke: '#282F49',
			strokeWidth: 1
		}
	}
};

/* utils fn */
const financial = (x) => Number.parseFloat(x).toFixed(2);

const timestampToDate = (timestamp) => {
	const timestampMillisec = timestamp * 1000;
	return new Date(timestampMillisec).toLocaleDateString();
};

const calcTotalSupply = (index, pastRebasesArr) => {
	let baseValue = 1000000;
	for (let i = 0; i <= index; i++) {
		const formattedSupplyAdjustment = parseFloat(formatEther(pastRebasesArr[i].supplyAdjustment));
		baseValue += formattedSupplyAdjustment;
	}
	return baseValue;
};

const calcRebasePercentage = (index, pastRebasesArr) => {
	const formattedSupplyAdjustment = parseFloat(formatEther(pastRebasesArr[index].supplyAdjustment));
	const totalSupply = calcTotalSupply(index - 1, pastRebasesArr);
	return formattedSupplyAdjustment / totalSupply * 100;
};


const Dashboard = () => {
	const [pastRebases, setPastRebases] = useState([]);
	const [pairData, setPairData] = useState(null);

	const [debaseData, setDebaseData] = useState(null);
	const [degovData, setDegovData] = useState(null);
	const [usdData, setUsdData] = useState(null);

	const [debaseCircSupply, setDebaseCircSupply] = useState(null);
	const [degovCircSupply, setDegovCircSupply] = useState(null);

	const [totalSupplyData, setTotalSupplyData] = useState([
		{
			id: 'Totalsupply',
			data: []
		}
	]);
	const [rebasePercentageData, setRebasePercentageData] = useState([
		{
			id: 'Rebasepercentage',
			data: []
		}
	]);

	const rebaseQuery = gql`
		{
			rebases(orderBy: epoch, orderDirection: desc) {
				epoch
				exchangeRate
				supplyAdjustment
				rebaseLag
				timestamp
			}
		}
	`;

	const debaseQuery = gql`
		{
			pair(id: "0xe98f89a2b3aecdbe2118202826478eb02434459a") {
				id
				reserve0
				reserve1
				token0Price
				token1Price
				volumeToken0
				volumeToken1
			}
		}
	`;
	const degovQuery = gql`
		{
			pair(id: "0xfc835d90ea6557b57b29361d95c4584d389e6ee8") {
				id
				reserve0
				reserve1
				token0Price
				token1Price
				volumeToken0
				volumeToken1
			}
		}
	`;

	const usdQuery = gql`
		{
			pair(id: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11") {
				id
				reserve0
				reserve1
				token0Price
				token1Price
				volumeToken0
				volumeToken1
			}
		}
	`


	useEffect(() => {
		async function fetchRebaseHistory() {
			const res = await request('https://api.thegraph.com/subgraphs/name/debaseonomics/subgraph', rebaseQuery);
			if (res.rebases) {
				setPastRebases([...res.rebases]);
			}
		}
		fetchRebaseHistory();

		async function fetchTokenData() {
			const provider = new ethers.providers.EtherscanProvider('homestead', 'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE');

			const contract = new ethers.Contract(contractAddress.debase, lpAbi, provider);
			const totalSupply = await contract.totalSupply();
			const stabilizerBalance = await contract.balanceOf(contractAddress.debasePolicy);
			const pool1Balance = await contract.balanceOf(contractAddress.debaseDaiPool);
			const pool2Balance = await contract.balanceOf(contractAddress.debaseDaiLpPool);
			const circBalance = ethers.utils.formatEther(
				totalSupply.sub(stabilizerBalance).sub(pool1Balance).sub(pool2Balance)
			);
			setDebaseCircSupply(circBalance);

			const contractDegov = new ethers.Contract(contractAddress.degov, lpAbi, provider);
			const totalSupplyDegov = await contractDegov.totalSupply();
			//const stabilizerBalanceDegov = await contractDegov.balanceOf(contractAddress.degovPolicy);
			//const pool1BalanceDegov = await contractDegov.balanceOf(contractAddress.degovDaiPool);
			const pool2BalanceDegov = await contractDegov.balanceOf(contractAddress.degovDaiLpPool);
			const circBalanceDegov = ethers.utils.formatEther(
				totalSupplyDegov.sub(pool2BalanceDegov)
			);

			setDegovCircSupply(circBalanceDegov);

		}
		fetchTokenData();

		async function fetchPairData() {
			const usdRes = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', usdQuery);
			const debaseRes = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', debaseQuery);
			const degovRes = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', degovQuery);

			if (debaseRes.pair) {
				const debasePrice = debaseRes.pair.token0Price;
				setDebaseData(debasePrice);
			}
			if (degovRes.pair) {
				console.log(degovRes.pair);

				const degovPrice = degovRes.pair.token1Price;
				setDegovData(degovPrice);
			}
			if (usdRes.pair) {
				console.log(usdRes.pair);
				const usdPrice = usdRes.pair.token0Price;
				setUsdData(usdPrice);
			}
		}
		fetchPairData();

	}, []);



	useEffect(
		() => {
			const localPastRebases = [...pastRebases].reverse();
			if (localPastRebases.length === 0) {
				return;
			}

			/* add dummy past rebase */
			localPastRebases.unshift({
				epoch: 0,
				exchangeRate: 0,
				rebaseLag: 0,
				supplyAdjustment: 0,
				timestamp: localPastRebases[0].timestamp - 24 * 60 * 60
			});

			/* calculate total supply data*/
			const localTotalSupplyData = [...totalSupplyData];
			localPastRebases.forEach((rebase, i, arr) => {
				const { timestamp } = rebase;
				localTotalSupplyData[0].data.push({
					x: timestampToDate(timestamp),
					y: calcTotalSupply(i, arr)
				});
			});

			/* calculate rebase percentage data*/
			const localRebasePercentageData = [...rebasePercentageData];
			localPastRebases.forEach((rebase, i, arr) => {
				const { timestamp } = rebase;
				if (i !== 0) {
					localRebasePercentageData[0].data.push({
						x: timestampToDate(timestamp),
						y: calcRebasePercentage(i, arr)
					});
				}
			});

			/* update state values */
			setTotalSupplyData(localTotalSupplyData);
			setRebasePercentageData(localRebasePercentageData);
		},
		[pastRebases]
	);


	const renderTotalSupplyChart = () => {
		if (totalSupplyData[0].data.length === 0) {
			return null;
		}
		return (
			<ResponsiveLine
				data={totalSupplyData}
				theme={chartTheme}
				margin={{ top: 20, right: 10, bottom: 100, left: 85 }}
				xScale={{ type: 'point' }}
				yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
				sliceTooltip={({ slice }) => {
					return (
						<div
							style={{
								background: '#212429',
								padding: '9px 12px',
								boxShadow:
									'0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)',
								color: 'white'
							}}
						>
							{slice.points.map((point) => (
								<div
									key={point.id}
									style={{
										color: point.serieColor,
										padding: '3px 0'
									}}
								>
									<span style={{ color: '#923db3' }}>{point.data.yFormatted}</span>
								</div>
							))}
						</div>
					);
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					orient: 'bottom',
					tickSize: 0,
					tickPadding: 20,
					tickRotation: -45,
					legend: 'Date',
					legendOffset: 85,
					legendPosition: 'middle',
					legendRotation: 90
				}}
				axisLeft={{
					orient: 'left',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'DEBASE',
					legendOffset: -80,
					legendPosition: 'middle',
					legendRotation: 90
				}}
				colors="#d741a7"
				lineWidth={2}
				pointSize={6}
				pointColor="#d741a7"
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				enableSlices="x"
				useMesh={true}
			/>
		);
	};

	const renderRebasePercentageChart = () => {
		if (rebasePercentageData[0].data.length === 0) {
			return null;
		}

		return (
			<ResponsiveLine
				data={rebasePercentageData}
				theme={chartTheme}
				margin={{ top: 20, right: 10, bottom: 100, left: 80 }}
				xScale={{ type: 'point' }}
				yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
				sliceTooltip={({ slice }) => {
					return (
						<div
							style={{
								background: '#212429',
								padding: '9px 12px',
								boxShadow:
									'0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)',
								color: 'white'
							}}
						>
							{slice.points.map((point) => (
								<div
									key={point.id}
									style={{
										color: point.serieColor,
										padding: '3px 0'
									}}
								>
									<span style={{ color: '#923db3' }}>{point.data.yFormatted}%</span>
								</div>
							))}
						</div>
					);
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					orient: 'bottom',
					tickSize: 0,
					tickPadding: 20,
					tickRotation: -45,
					legend: 'Date',
					legendOffset: 85,
					legendPosition: 'middle',
					legendRotation: 90
				}}
				axisLeft={{
					orient: 'left',
					tickSize: 0,
					tickPadding: 20,
					tickRotation: 0,
					legend: 'Rebase %',
					legendOffset: -60,
					legendPosition: 'middle',
					legendRotation: 90
				}}
				colors="#d741a7"
				lineWidth={2}
				pointSize={6}
				pointColor="#d741a7"
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				enableSlices="x"
				useMesh={true}
			/>
		);
	};


	const renderDebasePrice = () => {
		if (!debaseData) { return null }

		return financial(debaseData);
	};

	const renderDegovPrice = () => {
		if (!degovData) { return null }

		return financial(degovData * usdData);
	};

	const renderDebaseCircSupply = () => {
		if (!debaseCircSupply) { return null }

		return financial(debaseCircSupply);
	};

	const renderDegovCircSupply = () => {
		if (!degovCircSupply) { return null }

		return financial(degovCircSupply);
	};

	const renderDebaseMarketcap = () => {
		if (!debaseData && !debaseCircSupply) { return null }

		return financial(debaseData * debaseCircSupply);
	};

	const renderDegovMarketcap = () => {
		if (!degovData && !degovCircSupply) { return null }

		return financial((degovData * usdData) * degovCircSupply);
	};

	return (
		<div className="columns is-multiline">
			<div className="column is-4">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">Debase</h2>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{renderDebasePrice()} <img src={dai} alt="Dai" /></h5>
					</div>
				</div>
			</div>
			<div className="column is-4">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">debase Circ. Supply</h2>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{renderDebaseCircSupply()}<img src={debase} alt="Debase" /></h5>
					</div>
				</div>
			</div>
			<div className="column is-4">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">Marketcap debase</h2>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{renderDebaseMarketcap()}<img src={dai} alt="Dai" /></h5>
					</div>
				</div>
			</div>
			<div className="column is-4">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">degov</h2>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{renderDegovPrice()} <img src={dai} alt="Dai" /></h5>
					</div>
				</div>
			</div>

			<div className="column is-4">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">degov Circ. Supply</h2>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{renderDegovCircSupply()}<img src={degov} alt="Degov" /></h5>
					</div>
				</div>
			</div>
			<div className="column is-4">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">Marketcap degov</h2>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">{renderDegovMarketcap()}<img src={dai} alt="Dai" /></h5>
					</div>
				</div>
			</div>


			<div className="column is-6">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">total supply</h2>
					</div>
					<div className="dashboard__chart">{renderTotalSupplyChart()}</div>
				</div>
			</div>

			<div className="column is-6">
				<div className="box column">
					<div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">rebase History</h2>
					</div>
					<div className="dashboard__chart">{renderRebasePercentageChart()}</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard
