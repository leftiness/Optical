require('angular');

module.exports = angular.module('myApp',
	[
		require('./common/common.js').name,
		require('./modules').name
	])
	.config(require('./appConfig'))
	.config(require('./restangularConfig'))
	.constant('version', require('../package.json').version)
	.run(require('./common/common-init.js'));
