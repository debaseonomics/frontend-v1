import { toast } from 'bulma-toast';

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

export const lpAbi = [
	'function name() view returns (string)',
	'function symbol() view returns (string)',
	'function balanceOf(address) view returns (uint)',
	'function transfer(address to, uint amount)',
	'function approve(address spender, uint value) external returns (bool)',
	'function allowance(address owner, address spender) external view returns (uint256)',
	'event Transfer(address indexed from, address indexed to, uint amount)'
];

export const uniAbi = [
	'function price0CumulativeLast() view returns (uint256)',
	'function price1CumulativeLast() view returns (uint256)'
];

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
	stabilizerPool: '0x99d6EB950F9719d7b883a2c67735ecA6A91d6EaD'
};

export const uniAddress = {
	'debase-DAI-POOL': 'https://info.uniswap.org/pair/0x8ab3E1FaEb44B51E003a8BF1338B090Dd5247E50'
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
