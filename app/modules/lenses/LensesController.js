function LensesCtrl(LensesService, $stateParams, CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;
	var self = this;

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

	this.edit = function () {
		// TODO: Implement state change
	};

	this.add = function () {
		var show = _.get(this, 'show.buttons');
		if (_.isUndefined(show) || show === true) {
			// TODO: Implement state change
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
		})
	})();

}

LensesCtrl.$inject = [
	'LensesService',
	'$stateParams',
	'CONSTANTS'
];

module.exports = LensesCtrl;
