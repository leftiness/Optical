function LensesSearchCtrl(LensesService, $stateParams, CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;
	var self = this;

	// TODO: Somehow get $stateParams reference out of this controller.
	this.params = $stateParams;

	this.records = [];
	this.safeRecords = [];
	this.knobs = [];

	this.delete = function () {
		var selected = _.filter(self.records, 'isSelected');
		LensesService.deleteRecords(selected).then(function (good) {
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
		LensesService.getKnobs().then(function (knobs) {
			self.knobs = knobs;
		});
		LensesService.getRecords().then(function (records) {
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
