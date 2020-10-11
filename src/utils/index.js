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
	degov: '0x583a50222Dd9cE78E4c4D8fEC9f288998df3632B',
	debase: '0xa3411ca34606f95c64FbeDd62cC3b4966ebf95fe',
	debasePolicy: '0x51EBfB7b287efE9E37DDAc6dd9fc8216F7811Ef5',
	governorAlpha: '0x59CD5390A2FaDD2A553Fe01ba342FfBB1568e059',
	timelock: '0x2A918AFD78C74e8cEB50947dF936814DF1b94e0c',
	debaseDAIPool: '0x2B43a5cd2d6e667B08816cC272542A1B83794bB9',
	debaseYCurvePool: '0x2A7e2d7DAb430A9Bc9D6D6ec164e83d94E0C7f41',
	degovUNIPool: '0x61ebc0D52dF203C1e3afB475c87e4Bf3843E035B',
	orchestrator: '0x804c2dD653294F4219a8564774196C0Be532084C',
	DAI: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
	YCurve: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
	UNI: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
	debaseDAILP: '0xEAB0bC0bfa4f4C6386f7baAAF451C4cBfd69EBad'
};

export const uniAddress = {
	'debase-DAI-POOL': '',
	'debase-WETH-POOL': '',
	'debase-YCurve-Pool': '',
	'degov-UNI-POOL': ''
};

export const ownerShipAddress = {
	degovOwnerShip: '',
	debasePolicyOwnerShip: '',
	orchestratorOwnerShip: '',
	governorAlphaOwnerShip: '',
	timelockOwnerShip: ''
};

export const etherScanAddress = 'https://etherscan.io/address/';
export const etherScanTX = 'https://etherscan.io/tx/';

export const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

export const mobile = 768;
export const tablet = 769;
export const desktop = 1215;
