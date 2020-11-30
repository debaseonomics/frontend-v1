const Chance = require('chance');
var chance = new Chance();

exports.handler = async function(event, context) {
	const params = event.queryStringParameters;
	let num = Math.floor(chance.normal({ mean: parseInt(params.mean), dev: parseInt(params.sigma) }));
	if (num < 0) {
		num = 0;
	}
	return {
		statusCode: 200,
		body: num.toString()
	};
};
