function LensesCtrl($scope, $stateParams, $mdMedia, Restangular, CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;

	$scope.params = $stateParams;

	$scope.showKnobs = function () {
		return _.isUndefined(_.get($scope, 'show.knobs')) ?
			$mdMedia('gt-lg') :
			$scope.show.knobs;
	};

	$scope.toggleKnobs = function () {
		_.set($scope, 'show.knobs', !$scope.showKnobs());
	};

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

	function init() {
		Restangular.one('lenses', $stateParams.id).getList().then(
			function (result) {
				$scope.knobs = _.sortBy(result, 'order');
			},
			function () {
				// TODO: Alert user that loading knobs failed
				$scope.knobs = [];
			}
		);
		Restangular.one('lenses', $stateParams.id).all('records').getList().then(
			function (result) {
				$scope.safeRecords = result;
				$scope.records = [].concat($scope.safeRecords);
			},
			function () {
				// TODO: Alert the user that loading the records failed
				$scope.safeRecords = [];
				$scope.records = [];
			}
		);
	}

	init();

}

LensesCtrl.$inject = ['$scope',
	'$stateParams',
	'$mdMedia',
	'Restangular',
	'CONSTANTS'
];

module.exports = LensesCtrl;
