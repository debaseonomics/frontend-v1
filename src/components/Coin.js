import { ResponsivePie } from '@nivo/pie';
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
			sortByValue={true}
			radialLabelsLinkOffset={0}
			radialLabelsLinkDiagonalLength={6}
			radialLabelsLinkHorizontalLength={6}
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
			onClick={(data) => console.log(data)}
			motionStiffness={90}
			motionDamping={15}
		/>
	);
}
