var LensesService = function (
		NotificationService,
		$stateParams,
		$q,
		Restangular,
		CONSTANTS,
		MESSAGES
	) {

	'use strict';

	var _ = CONSTANTS.lodash;

	this.getKnobs = function () {
		var def = $q.defer();
		Restangular.one('lenses', $stateParams.id).getList().then(
			function (result) {
				def.resolve(_.sortBy(result, 'order'));
			},
			function () {
				var message = MESSAGES.lenses.get.knobs.failure;
				NotificationService.show(message);
				def.resolve([]);
			}
		);
		return def.promise;
	};

	this.getRecords = function () {
		var def = $q.defer();
		Restangular.one('lenses', $stateParams.id).all('records').getList().then(
			function (result) {
				def.resolve(result);
			},
			function () {
				var message = MESSAGES.lenses.get.records.failure;
				NotificationService.show(message);
				def.resolve([]);
			}
		);
		return def.promise;
	};

	this.deleteRecords = function (records) {
		var def = $q.defer();
		var proms = [];
		var good = [];
		var bad = [];
		records.forEach(function (record) {
			var rest = Restangular.one('lenses', $stateParams.id).all('records');
			var prom = rest.all(record.id).remove().then(
				function () {
					good.push(record.id);
				},
				function () {
					// TODO: Somehow get a useful error message?
					bad.push(record.id);
				}
			);
			proms.push(prom);
		});
		$q.all(proms).then(function () {
			// TODO: NotificationService.error(These ones were bad: bad) ?
			var message = MESSAGES.lenses.delete.records.failure;
			NotificationService.show(message);
			def.resolve(good);
		});
		return def.promise;
	};

};

LensesService.$inject = [
	'NotificationService',
	'$stateParams',
	'$q',
	'Restangular',
	'CONSTANTS',
	'MESSAGES'
	];

module.exports = LensesService;
