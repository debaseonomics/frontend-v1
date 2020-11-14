import React, { useState } from 'react';
import { turncate, poolAbi, contractAddress, orchestratorAbi, toaster } from '../utils/index';
import { useWeb3React } from '@web3-react/core';
import { DateTime } from 'luxon';
import useSWR from 'swr';
import { formatEther, isAddress } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import { useLocation } from 'react-router-dom';

const fetcher = (library, abi) => (...args) => {
	const [ arg1, arg2, ...params ] = args;
	if (isAddress(arg1)) {
		const address = arg1;
		const method = arg2;
		const contract = new Contract(address, abi, library.getSigner());
		return contract[method](...params);
	}
	const method = arg1;
	return library[method](arg2, ...params);
};

export default function Rebaser() {
	const location = useLocation();
	console.log(location.pathname); // path is /contact
	const { library } = useWeb3React();

	const { data: getDaiPoolRewardDistributed } = useSWR([ contractAddress.debaseDaiPool, 'rewardDistributed' ], {
		fetcher: fetcher(library, poolAbi)
	});

	const { data: getLpPoolRewardDistributed } = useSWR([ contractAddress.debaseDaiLpPool, 'rewardDistributed' ], {
		fetcher: fetcher(library, poolAbi)
	});

	const { data: getMaximumRebaseTime } = useSWR([ contractAddress.orchestrator, 'maximumRebaseTime' ], {
		fetcher: fetcher(library, orchestratorAbi)
	});

	const { data: getRebaseRequiredSupply } = useSWR([ contractAddress.orchestrator, 'rebaseRequiredSupply' ], {
		fetcher: fetcher(library, orchestratorAbi)
	});

	const [ loading, setLoading ] = useState(false);

	async function handleRebase() {
		setLoading(true);
		const orchestratorContract = new Contract(contractAddress.orchestrator, orchestratorAbi, library.getSigner());
		try {
			await orchestratorContract.rebase();
			toaster('Rebase successfully executed', 'is-success');
		} catch (error) {
			toaster('Rebase failed, please try again', 'is-danger');
		}
		setLoading(false);
	}

	return (
		<div className="columns is-centered">
			<div className="column is-5">
				<div className="box column">
					<div className="block has-text-centered">
						<h2 className="title is-size-4-tablet is-size-5-mobile is-family-secondary">rebase</h2>
					</div>
					<div className="block">
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
							Debase Distributed:{' '}
							{getDaiPoolRewardDistributed && getLpPoolRewardDistributed ? (
								(parseFloat(
									parseFloat(formatEther(getDaiPoolRewardDistributed)) +
										parseFloat(formatEther(getLpPoolRewardDistributed))
								).toFixed(2) *
									1 +
									70000).toString() + ' Debase'
							) : (
								'...'
							)}
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile">
							Required Distribution to Rebase:{' '}
							{getRebaseRequiredSupply ? (
								(parseFloat(formatEther(getRebaseRequiredSupply)) + 70000).toString() + ' Debase'
							) : (
								'...'
							)}
						</h5>
						<h5 className="subtitle is-size-5-tablet is-size-6-mobile ">
							Maximum time to rebase {' '}
							{getMaximumRebaseTime ? (
								DateTime.fromSeconds(getMaximumRebaseTime.toNumber()).toRelative({ round: false })
							) : (
								'...'
							)}
						</h5>
					</div>
					<div className="block">
						<button
							onClick={handleRebase}
							className={
								loading ? (
									'button is-edged is-fullwidth is-primary is-loading'
								) : (
									'button is-edged is-fullwidth is-primary'
								)
							}
						>
							Fire Rebase
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
