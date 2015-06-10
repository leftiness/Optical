var LensesService = function ($stateParams, $q, Restangular, CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;

	this.getKnobs = function () {
		var def = $q.defer();
		Restangular.one('lenses', $stateParams.id).getList().then(
			function (result) {
				def.resolve(_.sortBy(result, 'order'));
			},
			function () {
				// TODO: Alert user that loading knobs failed
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
				// TODO: Alert user that loading records failed
				def.resolve([]);
			}
		);
		return def.promise;
	};

};

LensesService.$inject = ['$stateParams', '$q', 'Restangular', 'CONSTANTS'];

module.exports = LensesService;
