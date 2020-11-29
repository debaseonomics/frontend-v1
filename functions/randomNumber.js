const Chance = require('chance');
var chance = new Chance();

exports.handler = async function(event, context) {
	const num = Math.floor(chance.normal({ mean: 10, dev: 4 }));
	if (num < 0) {
		num = 0;
	}
	return {
		statusCode: 200,
		body: num.toString()
	};
};
