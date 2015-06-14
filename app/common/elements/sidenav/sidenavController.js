function SidenavCtrl(LensesService, Restangular, $mdSidenav, CONSTANTS) {
	'use strict';

	var self = this;
	var _ = CONSTANTS.lodash;

	this.lenses = [];

	(function init() {
		// TODO: LensesService instead of Restangular.
		Restangular.one('lenses', 'lenses').getList('records').then(
			function (lenses) {
				self.lenses = _.sortBy(lenses, 'order');
			},
			function () {
				self.lenses = [];
			}
		);
	})();

}

SidenavCtrl.$inject = ['LensesService', 'Restangular', '$mdSidenav', 'CONSTANTS'];

module.exports = SidenavCtrl;
