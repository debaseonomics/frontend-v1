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
	degov: '0xC5f7aC6895DcB76877E71db756433fB0E0478FEB',
	debase: '0x51fa472EB89c046484B037B6125CF843C9d41b44',
	debasePolicy: '0x4b2c297ba5be42610994974b9543D56B864CA011',
	governorAlpha: '0x24E420B42971372F060a93129846761F354Bc50B',
	timelock: '0x285671fF5C8172dE63cF5eA264B2e827aDBC6740',
	debaseDaiPool: '0x1a432D97211e8b2CD53DF262c8Da0EfeBa6b6b3D',
	debaseDaiLpPool: '0xC91A0D5B404a66d0d66daF32DA23BB0c434F7F6b',
	degovUsdcPool: '0x5c98c9202b73d27A618662d34A6805c34AB041B8',
	degovUsdcLpPool: '0x435250F99d9ec2D7956773c6768392caD183765e',
	orchestrator: '0xb840b4fe440b5E26e1840cd2D6320FAda1C0ca5d',
	dai: '0x821503f2d6990eb6E71fde0CeFf503cE5415b98c',
	usdc: '0xB7d4f04E8dF26d2FEE35D4AeB2A63fEB49451B78',
	debaseDaiLp: '',
	degovUsdcLp: '',
	oracle: ''
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
