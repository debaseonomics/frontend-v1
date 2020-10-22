import { ResponsivePie, linearGradientDef } from '@nivo/pie';
import React from 'react';

export default function Coin({ data, scheme }) {
	return (
		<ResponsivePie
			data={data}
			margin={{ top: 25, bottom: 25, right: 25, left: 25 }}
			innerRadius={0.5}
			padAngle={1.5}
			cornerRadius={10}
			colors={{ scheme }}
			borderWidth={1}
			borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
			radialLabelsTextXOffset={6}
			radialLabelsTextColor="#ffffff"
			theme={{
				fontSize: 15,
				tooltip: {
					container: {
						background: '#363636',
						borderRadius: 5
					}
				}
			}}
			defs={[
				{
					id: 'gradientC',
					type: 'linearGradient',
					colors: [
						{ offset: 0, color: '#e90c59' },
						{ offset: 25, color: '#f90c5f' },
						{ offset: 50, color: '#a9f6ff' },
						{ offset: 75, color: '#00e6ff' }
					]
				}
			]}
			fill={[ { match: { id: 'Dai-Lp Pool' }, id: 'gradientC' } ]}
			sortByValue={true}
			radialLabelsLinkOffset={0}
			radialLabelsLinkDiagonalLength={6}
			radialLabelsLinkHorizontalLength={15}
			radialLabelsLinkStrokeWidth={2}
			radialLabelsLinkColor={{ from: 'color' }}
			slicesLabelsTextColor="#ffffff"
			sliceLabel="label"
			animate={true}
			tooltip={({ id, tool, supply }) => (
				<div>
					<h6 className="title is-6">{id}</h6>
					<p className="subtitle is-6">{tool}</p>
					<p className="subtitle is-6">Supply: {supply}</p>
				</div>
			)}
			onClick={({ click }) => click()}
			motionStiffness={90}
			motionDamping={15}
		/>
	);
}
