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
	'event Transfer(address indexed from, address indexed to, uint amount)'
];

export const contractAddress = {
	degov: '0xa73e77b6E259AF1c5074194634a08dF84739b458',
	debase: '0x5D5721Db3d6a17fB06D6149Cc1D525Da8BF96cd3',
	debasePolicy: '0x6ba97Ad3438B5A7A94312E43C915a48F772bFB29',
	governorAlpha: '0x075D81D97541033e9080BD4CC1C61cf10D255BB6',
	timelock: '0x421905D1625196e56F5BF188233f4b0C76aA2854',
	debaseUSDCPool: '0x1a09f6570f63b6b0d303931Bdf52ff609Ec413E3',
	debaseYCurvePool: '0x831bC482B98d9b26a0C8e8C642F5d827EC5BFb4E',
	degovUNIPool: '0x975019903bc7e19c43a66db9d00c3d63a541b5D1',
	orchestrator: '0x641bED0fB4F0661796e9047c62652324c11d407e',
	USDC: '0x9E440cB180EF2e33F0609a054Ec396816d24703B',
	YCurve: '0x80674bF7Fd6dC3e7AfBa7E864ACF8C0DB94bf13C',
	UNI: '0x3EB5810D7B9584befFf46b95E9e2726A844540B4',
	debaseUSDCLP: '0xC5D06b0Fdfc7dd46049d4e62C0AE30bf06E2A4A3'
};

export const etherScanAddress = 'https://etherscan.io/address/';

export const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

export const mobile = 768;
export const tablet = 769;
export const desktop = 1215;
