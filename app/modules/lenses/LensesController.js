function LensesCtrl($scope, LensesService, $stateParams, CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;

	$scope.params = $stateParams;

	$scope.delete = function () {
		_.filter($scope.records, {'isSelected': true}).forEach(function (record) {
			record.all(record.id).remove().then(
				function () {
					$scope.records = _.without($scope.records, record);
				},
				function () {
					// TODO: Alert user that deleting failed
				}
			);
		});
	};

	$scope.edit = function () {
		// TODO: Implement state change
	};

	$scope.add = function () {
		var show = _.get($scope, 'show.buttons');
		if (_.isUndefined(show) || show === true) {
			// TODO: Implement state change
		}
	};

	$scope.clear = function () {
		_.forEach($scope.records, function (record) {
			delete record.isSelected;
		});
	};

	(function init() {
		LensesService.getKnobs().then(function (data) {
			$scope.knobs = data;
		});
		LensesService.getRecords().then(function (data) {
			$scope.records = data;
			$scope.safeRecords = data;
		})
	})();

}

LensesCtrl.$inject = ['$scope',
	'LensesService',
	'$stateParams',
	'CONSTANTS'
];

module.exports = LensesCtrl;
