module.exports = angular.module('modules',
	[
		require('./home').name,
		require('./pages').name, // Used for static content pages like "About", "Privacy Policy", "404", etc.
		require('./lenses').name
	])
	.controller('MainCtrl', require('./MainController'));
