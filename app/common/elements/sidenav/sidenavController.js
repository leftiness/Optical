function SidenavCtrl($scope, $mdSidenav, Restangular, CONSTANTS) {
	'use strict';
	Restangular.one('lenses', 'lenses').getList('records').then(
		function (lenses) {
			$scope.lenses = CONSTANTS.lodash.sortBy(lenses, 'order');
		},
		function () {
			$scope.lenses = [];
		}
	);
}

SidenavCtrl.$inject = ['$scope', '$mdSidenav', 'Restangular', 'CONSTANTS'];

module.exports = SidenavCtrl;
