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
		'https://app.uniswap.org/#/add/0xa059b04F5293DE69fB3CC9ae5EE1E51083111247/0x6B175474E89094C44Da98b954EedeAC495271d0F'
};

export const ownerShipAddress = {
	degovOwnerShip: '0xe5c0db0425e48b2d5036cb41b1c086c905a79b4f572ae54496afb5a331e1f65f',
	debasePolicyOwnerShip: '0x789e60618d5a9209b438ceb8017aec59d0723c531ed2545a8db71ddecda1c135',
	orchestratorOwnerShip: '0x46d1aa58621c032f288cb828ada67841bfde628df77ef093fe8e1600307d41f0',
	governorAlphaOwnerShip: '0xd652880dd2b4730194f47e5872f34c4a7e29cd9149051a783108135cdb7ca4aa',
	timelockOwnerShip: '0x7178927425394f2f7d555e27b404b507de3db0c899abd9819c5506370a809be3',
	stabilizerOwnerShip: '0x7178927425394f2f7d555e27b404b507de3db0c899abd9819c5506370a809be3'
};

export const etherScanAddress = 'https://etherscan.io/address/';
export const etherScanTX = 'https://etherscan.io/tx/';

export const mobile = 768;
export const tablet = 769;
