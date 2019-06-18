var dotenv = require("dotenv");

var environment = (() => {
	const res = dotenv.config({
		path: "./.env",
		debug: process.env.DEBUG
	});

	if (res.error) {
		throw res.error;
	};

	return {
		res: res
	};
})();

const { parsed: envs } = environment.res;
module.exports = envs;