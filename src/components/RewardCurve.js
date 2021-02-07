import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

export default function RewardCurve({ circBalance, couponIssued, couponBalance, rewardPercentage, debaseSupply }) {
	const [ curve, setCurve ] = useState([
		{
			id: 'Price',
			data: []
		}
	]);

	function calculateValue() {
		let biggestReward = debaseSupply * rewardPercentage / 100;

		let currentReward = debaseSupply * rewardPercentage / 100 * (couponBalance / couponIssued);

		let leastReward = debaseSupply * rewardPercentage / 100 * (couponBalance / circBalance);

		setCurve([
			{
				id: 'Price',
				data: [
					{
						x: 1,
						y: biggestReward
					},
					{
						x: couponIssued,
						y: currentReward
					},
					{
						x: circBalance,
						y: leastReward
					}
				]
			}
		]);
	}

	useEffect(() => {
		calculateValue();
	}, []);

	const chartTheme = {
		textColor: '#fff',
		tooltip: {
			container: {
				background: '#212429',
				color: '#ffffff'
			}
		}
	};

	return (
		<div className="dashboard__chart">
			<ResponsiveLine
				data={curve}
				theme={chartTheme}
				margin={{ top: 20, right: 10, bottom: 50, left: 50 }}
				xScale={{ type: 'point' }}
				yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
				axisTop={null}
				axisRight={null}
				axisBottom={null}
				axisLeft={null}
				colors="#d741a7"
				lineWidth={2}
				pointSize={0}
				enableGridX={false}
				enableGridY={false}
				pointColor="#d741a7"
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				enableSlices="x"
				useMesh={true}
			/>
		</div>
	);
}
