function LensesCtrl($scope, $stateParams, Restangular, CONSTANTS) {
	'use strict';
	$scope.params = $stateParams;
	Restangular.one('lenses', $stateParams.id).getList('records').then(
		function (records) {
			$scope.safeRecords = records;
			$scope.records = [].concat($scope.safeRecords);
		},
		function () {
			$scope.safeRecords = [];
			$scope.records = [];
		}
	);

	Restangular.one('lenses', $stateParams.id).getList().then(
		function (knobs) {
			$scope.knobs = CONSTANTS.lodash.sortBy(knobs, 'order');
		},
		function () {
			$scope.knobs = [];
		}
	);
}

LensesCtrl.$inject = ['$scope', '$stateParams', 'Restangular', 'CONSTANTS'];

module.exports = LensesCtrl;
