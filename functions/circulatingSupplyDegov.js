const ethers = require('ethers');

const degovAbi = [ 'function balanceOf(address) view returns (uint)', 'function totalSupply() view returns(uint)' ];

exports.handler = async function(event, context) {
	const provider = new ethers.providers.EtherscanProvider('homestead', 'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE');
	const degov = new ethers.Contract('0x469E66e06fEc34839E5eB1273ba85A119B8D702F', degovAbi, provider);

	const totalSupply = await degov.totalSupply();
	const poolBalance = await degov.balanceOf('0xaB68de2a9d9A733F3c4CFE52Af7Fc4f6aa015637');
	const circBalance = ethers.utils.formatEther(totalSupply.sub(poolBalance));

	return {
		statusCode: 200,
		body: circBalance
	};
};
