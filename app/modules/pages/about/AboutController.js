function AboutCtrl($scope) {
	'use strict';
	$scope.aboutVar = 'This is an example of a sub-module.';
}

AboutCtrl.$inject = ['$scope'];

module.exports = AboutCtrl;
