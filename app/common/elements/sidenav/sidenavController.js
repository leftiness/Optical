function SidenavCtrl($scope, $mdSidenav, Restangular) {
	'use strict';
	var list = Restangular.all('pages');
	list.getList().then(
		function (pages) {
			$scope.pages = pages;
		},
		function () {
			$scope.pages = [];
		}
	);
}

SidenavCtrl.$inject = ['$scope', '$mdSidenav', 'Restangular'];

module.exports = SidenavCtrl;
