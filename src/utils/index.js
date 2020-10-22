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
	degov: '0xda160c15DEFB9Fd3aD41D511f45937Ece5C6F701',
	debase: '0x76d4E27a6dcaE689F1d1193C33D82c0af9564130',
	debasePolicy: '0x94C21Cd271497C05472b5DfFb47C5A9B83AD2513',
	governorAlpha: '0x6B138117f72Fc716585782b8c4aa60bed1A3Dc11',
	timelock: '0x7f40AfA8BE2E4397C2abe8D7044e2A7943F2B4cb',
	debaseDaiPool: '0x4bC9E964a041c0852c7A180e994e8579745A48Bd',
	debaseDaiLpPool: '0xa47619a84DF38843088d548Ad9FC36F0228d5101',
	degovUsdcPool: '0x50F7Eb2edd62D4a1592a6865961A773f0d31fb95',
	degovUsdcLpPool: '0x486c803c90e9cFC84fA30c03F83Ed2a0caeF4801',
	orchestrator: '0x1507a7B7Ae4db6132cf5Ea3Ce2115298936839D2',
	dai: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
	usdc: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
	debaseDaiLp: '0xcc0ccdba7debdd69d9d0e3cc1471d7c1141d7876',
	degovUsdcLp: '0x1051d641c0a6a5920decdfeca9dd4c866fb97345',
	oracle: '',
	debaseDaiLpStabilizerPool: '0x16C6532Dd4A843261f2EbBFbDaD8BCAC11e64517'
};

export const uniAddress = {
	'debase-DAI-POOL':
		'https://app.uniswap.org/#/add/0xa059b04F5293DE69fB3CC9ae5EE1E51083111247/0x6B175474E89094C44Da98b954EedeAC495271d0F',
	'debase-WETH-POOL': '',
	'degov-USDC-POOL': ''
};

export const ownerShipAddress = {
	degovOwnerShip: '0xe5c0db0425e48b2d5036cb41b1c086c905a79b4f572ae54496afb5a331e1f65f',
	debasePolicyOwnerShip: '0x789e60618d5a9209b438ceb8017aec59d0723c531ed2545a8db71ddecda1c135',
	orchestratorOwnerShip: '0x46d1aa58621c032f288cb828ada67841bfde628df77ef093fe8e1600307d41f0',
	governorAlphaOwnerShip: '0xd652880dd2b4730194f47e5872f34c4a7e29cd9149051a783108135cdb7ca4aa',
	timelockOwnerShip: '0x7178927425394f2f7d555e27b404b507de3db0c899abd9819c5506370a809be3'
};

export const etherScanAddress = 'https://etherscan.io/address/';
export const etherScanTX = 'https://etherscan.io/tx/';

export const mobile = 768;
export const tablet = 769;
export const desktop = 1215;
