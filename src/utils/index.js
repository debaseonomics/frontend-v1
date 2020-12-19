import { toast } from 'bulma-toast';
import { Contract } from 'ethers';
import { isAddress } from 'ethers/lib/utils';

export function turncate(fullStr, strLen, separator) {
	if (fullStr.length <= strLen) return fullStr;

	separator = separator || '...';

	var sepLen = separator.length,
		charsToShow = strLen - sepLen,
		frontChars = Math.ceil(charsToShow / 2),
		backChars = Math.floor(charsToShow / 2);

	return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
}

export function toaster(message, toastType, duration = 2000) {
	return toast({
		message: '<h1>' + message + '</h1>',
		type: toastType,
		position: 'bottom-center',
		duration: duration,
		dismissible: true,
		pauseOnHover: true,
		animate: { in: 'fadeIn', out: 'fadeOut' }
	});
}

export const poolAbi = [
	'function rewardPerToken() public view returns (uint256)',
	'function earned(address account) public view returns (uint256)',
	'function rewardDistributed() public view returns(uint256)',
	'function periodFinish() public view returns(uint256)',
	'function initReward() public view returns(uint256)',
	'function rewardRate() public view returns(uint256)',
	'function startTime() public view returns(uint256)',
	'function stake(uint256 amount)',
	'function withdraw(uint256 amount)',
	'function exit()',
	'function getReward()',
	'function balanceOf(address account) public view returns (uint256)'
];

export const thresholdCounterAbi = [
	'function rewardPercentage() public view returns (uint256)',
	'function countInSequence() public view returns (bool)',
	'function countThreshold() public view returns (uint256)',
	'function beforePeriodFinish() public view returns (bool)',
	'function duration() public view returns (uint256)',
	'function poolEnabled() public view returns (bool)',
	'function poolLpLimit() public view returns (uint256)',
	'function enablePoolLpLimit() public view returns (bool)',
	'function userLpLimit() public view returns (uint256)',
	'function enableUserLpLimit() public view returns (bool)',
	'function revokeRewardPrecentage() public view returns (uint256)',
	'function revokeReward() public view returns (bool)',
	'function count() public view returns (uint256)',
	'function noramlDistributionMean() public view returns (uint256)',
	'function normalDistributionDeviation() public view returns (uint256)',
	'function totalSupply() public view returns (uint256)',
	'function balanceOf(address) public view returns (uint256)',
	'function normalDistribution(uint256) external view returns(uint256)'
];

export const orchestratorAbi = [
	'function maximumRebaseTime() public view returns(uint256)',
	'function rebaseRequiredSupply() public view returns(uint256)',
	'function rebase() public'
];

export const debasePolicyAbi = [
	'function priceTargetRate() public view returns(uint256)',
	'function upperDeviationThreshold() public view returns(uint256)',
	'function lowerDeviationThreshold() public view returns(uint256)',
	'function useDefaultRebaseLag() public view returns(bool)',
	'function defaultPositiveRebaseLag() public view returns(uint256)',
	'function defaultNegativeRebaseLag() public view returns(uint256)',
	'function minRebaseTimeIntervalSec() public view returns(uint256)',
	'function rebaseWindowOffsetSec() public view returns(uint256)',
	'function rebaseWindowLengthSec() public view returns(uint256)',
	'function upperLagBreakpoints(uint256) public view returns(uint256)',
	'function lowerLagBreakpoints(uint256) public view returns(uint256)',
	'function lastRebaseTimestampSec() public view returns(uint256)',
	'function stabilizerPools(uint256) public view returns(bool,address)'
];

export const lpAbi = [
	'function name() view returns (string)',
	'function symbol() view returns (string)',
	'function balanceOf(address) view returns (uint)',
	'function totalSupply() view returns (uint256)',
	'function transfer(address to, uint amount)',
	'function approve(address spender, uint value) external returns (bool)',
	'function allowance(address owner, address spender) external view returns (uint256)',
	'event Transfer(address indexed from, address indexed to, uint amount)'
];

export const randomNumberAbi = [
	'function randomResult() external view returns(uint256)'
];

export const uniAbi = ['function getReserves() view returns (uint112,uint112,uint32)'];

export const contractAddress = {
	degov: '0x469E66e06fEc34839E5eB1273ba85A119B8D702F',
	debase: '0x9248c485b0B80f76DA451f167A8db30F33C70907',
	debasePolicy: '0x989Edd2e87B1706AB25b2E8d9D9480DE3Cc383eD',
	governorAlpha: '0x291BC8eDFE98155224502282444cC2E98d80d2d5',
	timelock: '0x969e1d56682305963c6b7f8920D0200189B22482',
	debaseDaiPool: '0xf5cB771023706Ca566eA6128b88e03A262737479',
	debaseDaiLpPool: '0xF4168cc431e9a8310e595dB9F7E2564cC96F5D51',
	degovDaiLpPool: '0xaB68de2a9d9A733F3c4CFE52Af7Fc4f6aa015637',
	orchestrator: '0x177A1F55Df0F28d8e9F5C837C706E04A82890025',
	dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
	debaseDaiLp: '0xE98f89a2B3AeCDBE2118202826478Eb02434459A',
	oracle: '0xb1Df2F0C76074eD466510F4440772Cc7b3D5337C',
	stabilizerPool: '0x800479a76dc74c3a9FAAE25320A0EE4E8740996b',
	randomNumber: '0x633ED04e5702625268948867B96e26443F316b7f'
};

export const uniAddress = {
	'debase-DAI-POOL': 'https://info.uniswap.org/pair/0xE98f89a2B3AeCDBE2118202826478Eb02434459A'
};

export const ownerShipAddress = {
	degovOwnerShip: '',
	debasePolicyOwnerShip: '',
	orchestratorOwnerShip: '',
	governorAlphaOwnerShip: '',
	timelockOwnerShip: '',
	stabilizerOwnerShip: ''
};

export const etherScanAddress = 'https://etherscan.io/address/';
export const etherScanTX = 'https://etherscan.io/tx/';

export const mobile = 768;
export const tablet = 769;

export const fetcher = (library, abi) => (...args) => {
	const [arg1, arg2, ...params] = args;
	if (isAddress(arg1)) {
		const address = arg1;
		const method = arg2;
		const contract = new Contract(address, abi, library.getSigner());
		return contract[method](...params);
	}
	const method = arg1;
	return library[method](arg2, ...params);
};
