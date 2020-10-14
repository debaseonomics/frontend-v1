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
	degov: '0xda79fd5DaB45d1674AbE831cc8072f27c8A1D317',
	debase: '0xCBaDDD1f3B4A72716B0813B010eC6f11D0b2cAb5',
	debasePolicy: '0x930af34f49Bcd5e54b2432b56Ea8803Ea980B23f',
	governorAlpha: '0x2a0D42DB3BF46a93A7b19Bf2aB32E7f402119daF',
	timelock: '0xdd4C3e6e9f581683d0Ac9510Cd414416FC6AdDf5',
	debaseDaiPool: '0x5cA79d26F9488d58444314B8d7f1a9B71bF82880',
	debaseDaiLpPool: '0x2859143c595CD3e74EC7d97Fe62D414080669599',
	degovUniPool: '0x28008905CdE7Fa10e77B7150170BB5cEadc55bA9',
	degovUniLpPool: '0x05Db16b3CCf654Df98b6986AaF7685b50e3B8184',
	orchestrator: '0x245d3b7dFB29b3eCCb91Bc469E1768e6D6147efa',
	DAI: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
	UNI: '0xddea378a6ddc8afec82c36e9b0078826bf9e68b6',
	debaseDaiLp: '0x0ab537235d93bac83d2d29d327cc0c9f00da29d7',
	degovUniLp: '0x495582b715e55ea58f5d9de533291804ba1e1072'
};

export const uniAddress = {
	'debase-DAI-POOL':
		'https://app.uniswap.org/#/add/0xa059b04F5293DE69fB3CC9ae5EE1E51083111247/0x6B175474E89094C44Da98b954EedeAC495271d0F',
	'debase-WETH-POOL': '',
	'degov-UNI-POOL': ''
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

export const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

export const mobile = 768;
export const tablet = 769;
export const desktop = 1215;
