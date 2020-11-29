const ethers = require('ethers');

const debaseAbi = [ 'function balanceOf(address) view returns (uint)', 'function totalSupply() view returns(uint)' ];

exports.handler = async function(event, context) {
	const provider = new ethers.providers.EtherscanProvider('homestead', 'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE');

	const contract = new ethers.Contract('0x9248c485b0B80f76DA451f167A8db30F33C70907', debaseAbi, provider);

	const totalSupply = await contract.totalSupply();
	const stabilizerBalance = await contract.balanceOf('0x989Edd2e87B1706AB25b2E8d9D9480DE3Cc383eD');
	const circBalance = ethers.utils.formatEther(totalSupply.sub(stabilizerBalance));

	return {
		statusCode: 200,
		body: circBalance
	};
};
