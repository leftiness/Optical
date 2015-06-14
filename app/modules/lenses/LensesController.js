function LensesCtrl($scope) {
	'use strict';
	$scope.childModulesInheritThis = 'This text is inherited.'; // child modules can inherit this
}

LensesCtrl.$inject = ['$scope'];

module.exports = LensesCtrl;
