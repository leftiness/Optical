function LensesSearchCtrl(LensesService, $stateParams, CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;
	var self = this;

	this.params = $stateParams;
	this.records = [];
	this.safeRecords = [];
	this.knobs = [];

	this.delete = function () {
		var selected = _.filter(self.records, 'isSelected');
		var lens = self.params.lens;
		LensesService.deleteRecords(lens, selected).then(function (good) {
			self.records = _.reject(self.records, function (record) {
				return _.includes(good, record.id);
			});
		});
	};

	this.add = function () {
		var show = _.get(this, 'show.buttons');
		if (_.isUndefined(show) || show === true) {
			/*
			 * TODO: Implement state change in view somehow?
			 * The problem is the custom if(show) logic... A directive?
			 */
		}
	};

	this.clear = function () {
		_.forEach(self.records, function (record) {
			delete record.isSelected;
		});
	};

	(function init() {
		var lens = self.params.lens;
		LensesService.getAllKnobs(lens).then(function (knobs) {
			self.knobs = knobs;
		});
		LensesService.getAllRecords(lens).then(function (records) {
			self.records = records;
			self.safeRecords = records;
		});
	})();

}

LensesSearchCtrl.$inject = [
	'LensesService',
	'$stateParams',
	'CONSTANTS'
];

module.exports = LensesSearchCtrl;
