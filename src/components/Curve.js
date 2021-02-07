import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

export default function Curve({ peakScaler, mean, deviation }) {
	const [ curve, setCurve ] = useState([
		{
			id: 'Res',
			data: []
		}
	]);

	function generateLogNormalDistribution() {
		let disArr = [];
		//Make distribution up till 5$ with an precision of 0.05$

		for (let offset = 1; offset <= 500; offset += 5) {
			const offsetScaled = offset / 100;
			const result =
				parseFloat(peakScaler) *
				(1 / (offsetScaled * parseFloat(deviation) * Math.sqrt(2 * Math.PI))) *
				Math.exp(-1 * ((Math.log(offsetScaled) - parseFloat(mean)) ** 2 / (2 * parseFloat(deviation) ** 2)));

			disArr.push({
				x: offsetScaled,
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
