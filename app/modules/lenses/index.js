module.exports = angular.module('modules.lenses',
	[
		require('./search').name,
		require('./edit').name
	])
	.config(require('./lensesRoutes'))
	.controller('LensesCtrl', require('./LensesController'));
