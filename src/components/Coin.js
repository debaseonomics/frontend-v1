import { ResponsivePie } from '@nivo/pie';
import React from 'react';

export default function Coin({ data }) {
	return (
		<ResponsivePie
			data={data}
			margin={{ top: 20, bottom: 20, right: 20, left: 20 }}
			innerRadius={0.4}
			padAngle={3}
			cornerRadius={10}
			colors={{ scheme: 'set1' }}
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
			radialLabelsLinkHorizontalLength={20}
			radialLabelsLinkStrokeWidth={3}
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
