var LensesService = function (
		NotificationService,
		$q,
		Restangular,
		CONSTANTS,
		MESSAGES
	) {

	'use strict';

	var _ = CONSTANTS.lodash;

	this.getAllKnobs = function (lens) {
		var def = $q.defer();
		Restangular.one('lenses', lens).getList().then(
			function (result) {
				def.resolve(_.sortBy(result, 'order'));
			},
			function () {
				var message = MESSAGES.crud.retrieve.failure;
				NotificationService.toast(message);
				def.resolve([]);
			}
		);
		return def.promise;
	};

	this.getAllRecords = function (lens) {
		var def = $q.defer();
		Restangular.one('lenses', lens).all('records').getList().then(
			function (result) {
				def.resolve(result);
			},
			function () {
				var message = MESSAGES.crud.retrieve.failure;
				NotificationService.toast(message);
				def.resolve([]);
			}
		);
		return def.promise;
	};

	this.getRecord = function (lens, record) {
		var def = $q.defer();
		Restangular.one('lenses', lens).one('records', record).get().then(
			function (result) {
				def.resolve(result);
			},
			function () {
				var message = MESSAGES.crud.retrieve.failure;
				NotificationService.toast(message);
				def.resolve({});
			}
		);
		return def.promise;
	};

	this.deleteRecords = function (lens, records) {
		var def = $q.defer();
		var proms = [];
		var good = [];
		var bad = [];
		records.forEach(function (record) {
			var rest = Restangular.one('lenses', lens).all('records');
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
			var message = MESSAGES.crud.delete.failure;
			NotificationService.toast(message);
			def.resolve(good);
		});
		return def.promise;
	};

};

LensesService.$inject = [
	'NotificationService',
	'$q',
	'Restangular',
	'CONSTANTS',
	'MESSAGES'
	];

module.exports = LensesService;
