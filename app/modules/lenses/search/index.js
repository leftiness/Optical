module.exports = angular.module('modules.lenses.search', [])
	.directive('lensesSearchView', require('./lensesSearchDirective'))
	.controller('LensesSearchCtrl', require('./LensesSearchController'));
