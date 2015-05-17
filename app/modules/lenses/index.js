module.exports = angular.module('modules.lenses', [])
	.directive('lensesView', require('./lensesDirective'))
	.controller('LensesCtrl', require('./LensesController'))
	.config(require('./lensesRoutes'));
