module.exports = angular.module('modules.lenses.edit', [])
	.directive('lensesEditView', require('./lensesEditDirective'))
	.controller('LensesEditCtrl', require('./LensesEditController'));
