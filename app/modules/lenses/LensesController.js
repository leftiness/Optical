function LensesCtrl($scope, LensesService, $stateParams, CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;

	$scope.params = $stateParams;

	$scope.delete = function () {
		var selected = _.filter($scope.records, 'isSelected');
		LensesService.deleteRecords(selected).then(function (good) {
			$scope.records = _.reject($scope.records, function (record) {
				return _.includes(good, record.id);
			});
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
		LensesService.getKnobs().then(function (knobs) {
			$scope.knobs = knobs;
		});
		LensesService.getRecords().then(function (records) {
			$scope.records = records;
			$scope.safeRecords = records;
		})
	})();

}

LensesCtrl.$inject = ['$scope',
	'LensesService',
	'$stateParams',
	'CONSTANTS'
];

module.exports = LensesCtrl;
