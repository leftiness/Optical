function LensesEditCtrl(LensesService, $stateParams) {
	'use strict';

	var self = this;

	this.params = $stateParams;
	this.record = {};
	this.knobs = [];

	// TODO: Inherit knobs as a child state?

	/*
	 * TODO: Pass record as a parameter somehow instead of downloading it again
	 * with LensesService? Maybe cache it on the parent controller. If the cache
	 * has a record with this ID, use that one. Otherwise, download it again.
	 */

	(function init() {
		var lens = self.params.lens;
		var record = self.params.record;
		LensesService.getRecord(lens, record).then(function (record) {
			self.record = record;
		});
		LensesService.getAllKnobs(lens).then(function (knobs) {
			self.knobs = knobs;
		});
	})();

}

LensesEditCtrl.$inject = ['LensesService', '$stateParams'];

module.exports = LensesEditCtrl;
