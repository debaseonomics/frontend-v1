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
	degov: '0x3Fa43fA711d9B22ECd5fC63Eb07c3890d6C35D84',
	debase: '0x934978F3b0AbDA8c6a5b8DC67373eCFA3dfAddC1',
	debasePolicy: '0x940d8A1def90c887a769BA148359672c3cadA77f',
	governorAlpha: '0x57518e7EdB516112a478A5FD36Dda9B61C348783',
	timelock: '0x9A11302e13685448fab00e4d83a82b9A86241e83',
	debaseDaiPool: '0x00F91c359cE50731eD12EE75A383E856329e273E',
	debaseDaiLpPool: '0x5651c3B048dC389D7fDeF22d8365a1B6513b5363',
	degovDaiLpPool: '0xA780a57Bd3Ecf2A49d981CFA1ecd863e4Eb0BDa0',
	orchestrator: '0xBAfA0A894Ad6251FDD0Ed0387f57196765321410',
	dai: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
	debaseDaiLp: '0xe4786C0DD3768035A298E14F3D46390Ce72371a3',
	oracle: '',
	stabilizerPool: '0xD0B13c573C5C644A98576b42E35c522E4950e83E'
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
