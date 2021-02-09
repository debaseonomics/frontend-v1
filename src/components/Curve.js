import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

export default function Curve({ peakScaler, mean, deviation }) {
	const [ curve, setCurve ] = useState([
		{
			id: 'Price',
			data: []
		}
	]);

	function generateLogNormalDistribution() {
		let disArr = [];
		//Make distribution up till 5$ with an precision of 0.05$

		disArr.push({
			x: 1.05,
			y: 0
		});

		for (let offset = 2; offset <= 500; offset += 1) {
			const offsetScaled = offset / 100;
			const result =
				parseFloat(peakScaler) *
				(1 / (offsetScaled * parseFloat(deviation) * Math.sqrt(2 * Math.PI))) *
				Math.exp(-1 * ((Math.log(offsetScaled) - parseFloat(mean)) ** 2 / (2 * parseFloat(deviation) ** 2)));

			disArr.push({
				x: (offset + 115) / 100,
				y: result
			});
		}

		setCurve([
			{
				id: 'Price',
				data: disArr
			}
		]);
	}

	useEffect(() => {
		generateLogNormalDistribution();
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
				xFormat=" >-.2f"
				yFormat=" >-.3f"
				axisLeft={{
					orient: 'left',
					tickValues: [ 0, 0.5, 1 ],
					tickSize: 2,
					legend: 'Value',
					legendOffset: -36,
					legendPosition: 'middle'
				}}
				axisBottom={{
					orient: 'bottom',
					tickValues: [ 1.05, 2, 3, 4, 5, 6 ],
					tickSize: 5,
					legend: 'Price ($DAI)',
					legendOffset: 36,
					legendPosition: 'middle'
				}}
				// markers={[
				// 	{
				// 		axis: 'x',
				// 		value: 1,

				// 		lineStyle: { stroke: '#b0413e', strokeWidth: 2 }
				// 	}
				// ]}
				colors="#d741a7"
				lineWidth={2}
				pointSize={0}
				enableGridX={false}
				enableGridY={false}
				pointColor="#d741a7"
				pointBorderWidth={2}
				pointLabelYOffset={-12}
				useMesh={true}
			/>
		</div>
	);
}
