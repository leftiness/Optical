module.exports = function lensesDirective() {
	'use strict';
	return {
		controller: 'LensesCtrl',
		template: require('./lenses.html'),
		restrict: 'EA',
		scope: true
	};
};
