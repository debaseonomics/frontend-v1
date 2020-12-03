import React, { useState, useEffect } from 'react';

/* import Nivo chart line */
import { ResponsiveLine } from '@nivo/line'

/* import data dependencies */
import { formatEther } from 'ethers/lib/utils';
import { request, gql } from 'graphql-request';

/* import styling */
import './Dashboard.css';

/* Chart theming */
const chartTheme = {
    "textColor": "#ffffff",
    tooltip: {
        container: {
            background: '#212429',
            color: '#ffffff'
        },
    },
    "grid": {
        "line": {
            "stroke": "#2d3237",
            "strokeWidth": 1
        }
    }
};

const query = gql`
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

/* utils fn */
const timestampToDate = timestamp => {
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
    return (formattedSupplyAdjustment / totalSupply) * 100;
};

export default function Dashboard() {

    const [ pastRebases, setPastRebases ] = useState([]);
    const [ totalSupplyData, setTotalSupplyData ] = useState([
        {   
            id: 'Totalsupply',
            data: []
        }
    ]);
    const [ rebasePercentageData, setRebasePercentageData ] = useState([
        {   
            id: 'Rebasepercentage',
            data: []
        }
    ]);

    useEffect(() => {
		async function fetchRebaseHistory() {
			let res = await request('https://api.thegraph.com/subgraphs/name/debaseonomics/subgraph', query)
			if (res.rebases) {
				setPastRebases([ ...res.rebases ]);
			}
		}
		fetchRebaseHistory();
    }, []);
    
    useEffect(() => {
        const localPastRebases = [...pastRebases].reverse();
        if (localPastRebases.length === 0) { return }

        /* add dummy past rebase */
        localPastRebases.unshift({
            epoch: 0,
            exchangeRate: 0,
            rebaseLag: 0,
            supplyAdjustment: 0,
            timestamp: localPastRebases[0].timestamp - (24 * 60 * 60)
        });

        /* calculate total supply data*/
        const localTotalSupplyData = [...totalSupplyData];
        localPastRebases.forEach((rebase, i, arr) => {
            const { timestamp } = rebase;
            localTotalSupplyData[0].data.push({
                "x": timestampToDate(timestamp),
                "y": calcTotalSupply(i, arr)
            });
        });

        /* calculate rebase percentage data*/
        const localRebasePercentageData = [...rebasePercentageData];
        localPastRebases.forEach((rebase, i, arr) => {
            const { timestamp } = rebase;
            if (i !== 0) {
                localRebasePercentageData[0].data.push({
                    "x": timestampToDate(timestamp),
                    "y": calcRebasePercentage(i, arr)
                });
            }
        });

        /* update state values */
        setTotalSupplyData(localTotalSupplyData);
        setRebasePercentageData(localRebasePercentageData);

    }, [pastRebases]);

    const renderTotalSupplyChart = () => {
        if (totalSupplyData[0].data.length === 0) { return null} 
        return (
            <ResponsiveLine
                data={totalSupplyData}
                theme={chartTheme}
                margin={{ top: 20, right: 10, bottom: 60, left: 70 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 0,
                    tickPadding: 20,
                    tickRotation: -45,
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 0,
                    tickPadding: 20,
                    tickRotation: 0,
                }}
                colors='#f5468e'
                lineWidth={2}
                pointSize={6}
                pointColor="#212429"
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                tooltip={({ id, value, color }) => ( <strong style={{ color }}>{id}: {value}</strong> )}
                enableSlices="x"
                useMesh={true}
            />
        );
    };

    const renderRebasePercentageChart = () => {
        if (rebasePercentageData[0].data.length === 0) { return null} 

        return (
            <ResponsiveLine
                data={rebasePercentageData}
                theme={chartTheme}
                margin={{ top: 20, right: 10, bottom: 70, left: 70 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 0,
                    tickPadding: 20,
                    tickRotation: -45,
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 0,
                    tickPadding: 20,
                    tickRotation: 0,
                }}
                colors='#f5468e'
                lineWidth={2}
                pointSize={6}
                pointColor="#212429"
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                tooltip={({ id, value, color }) => ( <strong style={{ color }}>{id}: {value}</strong> )}
                enableSlices="x"
                useMesh={true}
            />
        );

    };

    return (
        <div className="columns is-centered">
			<div className="column is-6">
				<div className="box column">
                    <div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">total supply</h2>
					</div>
                    <div className="dashboard__chart">
                        {renderTotalSupplyChart()}
                    </div>
                </div>
            </div>
            <div className="column is-6">
				<div className="box column">
                    <div className="has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">rebase %</h2>
					</div>
                    <div className="dashboard__chart">
                        {renderRebasePercentageChart()}
                    </div>
                </div>
            </div>
        </div>
    )
};