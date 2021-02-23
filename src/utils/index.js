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
	'function revokeRewardDuration() public view returns (uint256)',
	'function revokeReward() public view returns (bool)',
	'function count() public view returns (uint256)',
	'function normalDistributionMean() public view returns (uint256)',
	'function normalDistributionDeviation() public view returns (uint256)',
	'function totalSupply() public view returns (uint256)',
	'function balanceOf(address) public view returns (uint256)',
	'function normalDistribution(uint256) external view returns(uint256)'
];

export const thresholdCounterV2Abi = [
	'function rewardPercentage() public view returns (uint256)',
	'function countInSequence() public view returns (bool)',
	'function countThreshold() public view returns (uint256)',
	'function beforePeriodFinish() public view returns (bool)',
	'function blockDuration() public view returns (uint256)',
	'function poolEnabled() public view returns (bool)',
	'function poolLpLimit() public view returns (uint256)',
	'function enablePoolLpLimit() public view returns (bool)',
	'function userLpLimit() public view returns (uint256)',
	'function enableUserLpLimit() public view returns (bool)',
	'function revokeRewardDuration() public view returns (uint256)',
	'function revokeReward() public view returns (bool)',
	'function count() public view returns (uint256)',
	'function normalDistributionMean() public view returns (uint256)',
	'function normalDistributionDeviation() public view returns (uint256)',
	'function totalSupply() public view returns (uint256)',
	'function balanceOf(address) public view returns (uint256)',
	'function normalDistribution(uint256) external view returns(uint256)'
];

export const V3Abi = [
	'function rewardPercentage() public view returns (uint256)',
	'function blockDuration() public view returns (uint256)',
	'function poolEnabled() public view returns (bool)',
	'function poolLpLimit() public view returns (uint256)',
	'function enablePoolLpLimit() public view returns (bool)',
	'function periodFinish() public view returns(uint256)',
	'function userLpLimit() public view returns (uint256)',
	'function poolLpLimit() public view returns (uint256)',
	'function enableUserLpLimit() public view returns (bool)',
	'function totalSupply() public view returns (uint256)',
	'function balanceOf(address) public view returns (uint256)',
	'function cycleEnds() public view returns(uint256)',
	'function rewardPerTokenMax() public view returns(uint256)',
	'function rewardShare() public view returns(uint256)'
];

export const incentivizerAbi = [
	'function rewardPercentage() public view returns (uint256)',
	'function blockDuration() public view returns (uint256)',
	'function poolEnabled() public view returns (bool)',
	'function poolLpLimit() public view returns (uint256)',
	'function enablePoolLpLimit() public view returns (bool)',
	'function userLpLimit() public view returns (uint256)',
	'function enableUserLpLimit() public view returns (bool)',
	'function revokeReward() public view returns (bool)',
	'function totalSupply() public view returns (uint256)',
	'function balanceOf(address) public view returns (uint256)'
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

export const mph88Abi = [
	'function deposit(uint256) public returns(uint256)',
	'function lockPeriod() view returns (uint256)',
	'function withdraw(uint256,uint256) external ',
	'function treasury() view returns (address)',
	'function debaseRewardPercentage() view returns (uint256)',
	'function blockDuration() view returns (uint256)',
	'function deposits(uint256) view returns (address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)',
	'function depositIds(address,uint256) view returns(uint256)',
	'function lpDeposits(address) view returns (uint256)',
	'function depositLength() view returns (uint256)',
	'function daiFee() view returns (uint256)',
	'function mphFee() view returns (uint256)',
	'function periodFinish() view returns (uint256)',
	'function multiWithdraw(uint256[],uint256[]) external',
	'function debaseRewardDistributed() view returns (uint256)',
	'function poolEnabled() view returns (bool)',
	'function allowEmergencyWithdraw() view returns (bool)',
	'function maxDepositLimit() view returns (uint256)',
	'function totalLpLimit() view returns (uint256)',
	'function totalLpLimitEnabled() view returns (bool)',
	'function maxDepositLimitEnabled() view returns (bool)',
	'function totalLpLocked() view returns (uint256)',
	'function earned(uint256) view returns (uint256)'
];

export const burnPoolAbi = [
	'function circBalance() view returns(uint256)',
	'function buyCoupons(uint256) external',
	'function getReward(uint256) external',
	'function earned(uint256,address) view returns(uint256)'
];

export const burnPoolOracleAbi = [ 'function currentAveragePrice() external view returns (uint256, uint256)' ];
export const oracleAbi = [ 'function currentAveragePrice() external view returns (uint256, uint256)' ];

export const vestingAbi = [ 'function accountVestList(address,uint256) view returns(uint256,uint256,uint256,uint256)' ];

export const randomNumberAbi = [ 'function randomResult() external view returns(uint256)' ];

export const uniAbi = [ 'function getReserves() view returns (uint112,uint112,uint32)' ];

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
	randomNumber: '0x633ED04e5702625268948867B96e26443F316b7f',
	degovEthPool: '0x4789519821ae0f49d95203b1a2ed805141bf0dae',
	degovEthLp: '0xfc835d90ea6557b57b29361d95c4584d389e6ee8',
	mph88Pool: '0x36f1F4125B4066cA4b768F9F5f9a737Bd4FA8f62',
	mph88: '0x8888801aF4d980682e47f1A9036e589479e835C5',
	vesting: '0x8943eb8F104bCf826910e7d2f4D59edfe018e0e7',
	disbursement: '0xac838d80ae37f32c6853e31f85a4b00208c46b95',
	thresholdCounterV2Eth: '0xA36206621e6F14E6D4fCD9B3426209530c9c5f30',
	randomNumberConsumer: '0x68bf7a502515270c7ef849df7b26ca308ac5b0a2',
	debaseEthLp: '0xa8e5533d1e22be2df5e9ad9f67dd22a4e7d5b371',
	burnPool: '0x8c9354C0def4a39D53Ac0730CEfe12d019439640',
	burnPoolOracle: '0x27fe90d99de424d083e116f3d17a52f379eebf33',
	oracleV2: '0x6a5254a4621a1a558E706f5972f7A9b22F7566D2',
	sp3Pool: '0x29e92C31C980098d5724fe82EbC5A824e32d9C9B'
};

export const uniAddress = {
	'debase-DAI-POOL': 'https://info.uniswap.org/pair/0xE98f89a2B3AeCDBE2118202826478Eb02434459A',
	'degov-ETH-POOL:': 'https://info.uniswap.org/pair/0xfc835d90ea6557b57b29361d95c4584d389e6ee8'
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
