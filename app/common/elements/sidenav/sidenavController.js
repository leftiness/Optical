function SidenavCtrl($scope, $mdSidenav, Restangular) {
	'use strict';
	var list = Restangular.all('lenses');
	list.getList().then(
		function (lenses) {
			$scope.lenses = lenses;
		},
		function () {
			$scope.lenses = [];
		}
	);
}

SidenavCtrl.$inject = ['$scope', '$mdSidenav', 'Restangular'];

module.exports = SidenavCtrl;
