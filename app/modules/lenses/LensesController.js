function LensesCtrl($scope, $stateParams, Restangular) {
	'use strict';
	$scope.params = $stateParams;
	Restangular.one('lenses', $stateParams.id).get().then(
		function (lens) {
			$scope.fields = _.sortBy(lens.fields, 'order');
			$scope.safeData = lens.data;
			$scope.data = [].concat($scope.safeData);
		},
		function () {
			$scope.fields = [];
			$scope.safeData = [];
			$scope.data = [];
		}
	);
}

LensesCtrl.$inject = ['$scope', '$stateParams', 'Restangular'];

module.exports = LensesCtrl;
