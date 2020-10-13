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
	degov: '0xd96c8EB4Df169A463318A65C86F667ebA633b3a1',
	debase: '0xa059b04F5293DE69fB3CC9ae5EE1E51083111247',
	debasePolicy: '0xAC937a27686edeCdF03500ad9903F038716eF8Dc',
	governorAlpha: '0x21AcdCac88255AA3f83F2E17F67ab4E5cfA9D777',
	timelock: '0xD5401c392ED80Ac3486183CAc53aeC8302f802d0',
	debaseDAIPool: '0x1f441E9835234EE2265Fba792C300ab1B268ca38',
	debaseYCurvePool: '0xB2FCa91dce1bB8d3b486eFD197371A3e72A915B1',
	degovUNIPool: '0x31a4c65eEdc4a178c5Ee011E6E08de0C9c838b3E',
	orchestrator: '0x73De3220C32E6BaF81816464B29b2f61160D004e',
	DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
	YCurve: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
	UNI: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
	debaseDAILP: '0x143139f884c456a729E1F764B82Ce057D3FE08A6'
};

export const uniAddress = {
	'debase-DAI-POOL':
		'https://app.uniswap.org/#/add/0xa059b04F5293DE69fB3CC9ae5EE1E51083111247/0x6B175474E89094C44Da98b954EedeAC495271d0F',
	'debase-WETH-POOL': '',
	'debase-YCurve-Pool': '',
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
