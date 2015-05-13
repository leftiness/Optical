function HeaderCtrl($scope, $timeout, $mdSidenav) {
	'use strict';
	$scope.toggleMenu = function () {
		$mdSidenav('sidenav').toggle();
	};

}

HeaderCtrl.$inject = ['$scope', '$timeout', '$mdSidenav'];

module.exports = HeaderCtrl;
