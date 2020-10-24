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
	degov: '0xA40FaB39382D9ea8D95371f4a2177bdDaE0EC15c',
	debase: '0xE7ED1aC3ea97c236EF4c7c66a3CcD7032991269e',
	debasePolicy: '0x40060d8EA4247e7621267f3373429fDdE25Ed759',
	governorAlpha: '0xAf411707eA2d89F08EB9cdAD2007E3aE3C887245',
	timelock: '0xe9178e41AC96554dF70aBb391DC76f9a82CB78Bb',
	debaseDaiPool: '0x5168118F21dF95bAAFcAeDeE42C739A2FD6591D5',
	debaseDaiLpPool: '0xd1762ec70D0fe82D78bC02b579b2871f44c03AbE',
	degovDaiLpPool: '0x79Ff610111b7FEEdaA545bcD0Ef16EAdD9174AA2',
	orchestrator: '0x11f11B853f2E2C34c5c00F22D986774e7EE1d986',
	dai: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
	debaseDaiLp: '0x90e5Bb3FE3be3207e23B0DEdb019a40A3f074649',
	oracle: '',
	stabilizerPool: '0xC30C00C73a145F9dc91AC1447518934f713D2877'
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
	timelockOwnerShip: '0x7178927425394f2f7d555e27b404b507de3db0c899abd9819c5506370a809be3'
};

export const etherScanAddress = 'https://etherscan.io/address/';
export const etherScanTX = 'https://etherscan.io/tx/';

export const mobile = 768;
export const tablet = 769;
