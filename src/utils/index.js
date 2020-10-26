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
	'function allowance(address owner, address spender) external view returns (uint256)',
	'event Transfer(address indexed from, address indexed to, uint amount)'
];

export const contractAddress = {
	degov: '0x8A53b840c26eaef4705Fd0A9A307B0BeC9b1Bb44',
	debase: '0xe20303b4f80Ef868F653d1feD3f797b5116C3a2E',
	debasePolicy: '0x806e280c7214C9e3C11a3c7fA047764f69F4BC24',
	governorAlpha: '0x1d372cfD924880E5C1E3900D4E6aE41B6cF4dfF3',
	timelock: '0xC21C2158901852896E4Aa2aB8a27204251658164',
	debaseDaiPool: '0x9F3687A47d887a9f497D168874A05EDD5D56A4DE',
	debaseDaiLpPool: '0x6621cA7B8eDEb023ff32816b3996abD0C77579dc',
	degovDaiLpPool: '0x862DC46B337d27F617c1A3Dda6BBe53d0c1b5a67',
	orchestrator: '0xaA684CA36b59fcb4dfA59D74466CF707c722AA15',
	dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
	debaseDaiLp: '0x8ab3E1FaEb44B51E003a8BF1338B090Dd5247E50',
	oracle: '',
	stabilizerPool: '0x77bC944F7022B24bc12B7Be9Be07D7B4079CdF36'
};

export const uniAddress = {
	'debase-DAI-POOL':
		'https://app.uniswap.org/#/add/0xe20303b4f80Ef868F653d1feD3f797b5116C3a2E/0x6B175474E89094C44Da98b954EedeAC495271d0F'
};

export const ownerShipAddress = {
	degovOwnerShip: '0x8a53b840c26eaef4705fd0a9a307b0bec9b1bb44',
	debasePolicyOwnerShip: '0xaaf2f923e15ce6d83ea107f2312c209957582e08324fde92288e003cc5489764',
	orchestratorOwnerShip: '0xafcd9d344728a5dac0acc2632a3a131b3f29d1f232479658d1dabb99105d15f9',
	governorAlphaOwnerShip: '0xeefcea39f7745f842e5b6148abd21595513c272d57513d9a7b8c2063da6506e8',
	timelockOwnerShip: '0xefc71d2dcbc3e0b91c4bd4f5eea31bca32900d31f257216ecb4878d4a9f714b7',
	stabilizerOwnerShip: '0xd2272847262c77a7006e909392d00d3545833d925c880e0f92fd9a09b277b315'
};

export const etherScanAddress = 'https://etherscan.io/address/';
export const etherScanTX = 'https://etherscan.io/tx/';

export const mobile = 768;
export const tablet = 769;
