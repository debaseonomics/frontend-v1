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
	degov: '0xe1a3771a93CD3908aA78bF70DC11A480bCb7c37D',
	debase: '0xE5E167D508F597a9f50f02Fd099631b379Ce905a',
	debasePolicy: '0x9Baf4C360FB0C8647992B30Fce70eb8b3d6Da711',
	governorAlpha: '0x021FC96ef74D676323B96F178fdCDc657b75AB9e',
	timelock: '0xb0b9FFBdFF346bF0a204ffb87e07Dc5D958500B5',
	debaseDaiPool: '0xdcc886232B99B213Ae680B86A9f36388904f2bCB',
	debaseDaiLpPool: '0xAdffC6EA819eaFED5c458E5799b9a8f1C72f7B5e',
	degovUsdcPool: '0x14B8367478Baa89aD240fD76e1ECf19829AD8f26',
	degovUsdcLpPool: '0x0c319D85ff816220d240EB2A63034fe95A50543E',
	orchestrator: '0x5DaAEF418394B9D69fb68f17aDE21557C24557FD',
	dai: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
	usdc: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
	debaseDaiLp: '0x96365c52de72cfbff65bd7706c4cbe620a23f852',
	degovUsdcLp: '0xa491d063d4b6c93400ff88208d9db57c180c7c55',
	oracle: '',
	debaseDaiLpStabilizerPool: '0xDf238f0b8A9db52d369d627AeAA5042E63e461ed'
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

export const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

export const mobile = 768;
export const tablet = 769;
export const desktop = 1215;
