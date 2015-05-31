function LensesCtrl($scope, $stateParams, $mdMedia, Restangular, CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;
	$scope.params = $stateParams;
	$scope.query = {};

	$scope.showKnobs = function () {
		return _.isUndefined(_.get($scope, 'show.knobs')) ?
			$mdMedia('gt-lg') :
			$scope.show.knobs;
	};

	$scope.toggleKnobs = function () {
		$scope.showKnobs() ?
		_.set($scope, 'show.knobs', false) :
		_.set($scope, 'show.knobs', true);
	};

	$scope.countSelected = function () {
		var count = _.countBy($scope.records, 'isSelected')[true];
		return _.isUndefined(count) ? 0 : count;
	};

	$scope.delete = function () {
		$scope.records = _.reject($scope.records, {'isSelected': true});
		// TODO: Implement REST
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
			$scope.knobs = _.sortBy(knobs, 'order');
		},
		function () {
			$scope.knobs = [];
		}
	);

}

LensesCtrl.$inject = ['$scope', '$stateParams', '$mdMedia', 'Restangular', 'CONSTANTS'];

module.exports = LensesCtrl;
