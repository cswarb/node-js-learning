const single = (() => {
	var instance;

	function init() {
		var num = 2;
		
		function addNumbers(addition) {
			return Math.round(num + addition);
		};

		return {
			add: addNumbers
		}
	}

	function getInstance() {
		if (!instance) {
			instance = init();
		};
		return instance;
	};

	return {
		getInstance: getInstance
	};
})();


console.log("singleton: ", single.getInstance());


module.exports = single;