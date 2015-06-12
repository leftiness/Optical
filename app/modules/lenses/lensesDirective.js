module.exports = function lensesDirective() {
	'use strict';
	return {
		controller: 'LensesCtrl as lenses',
		template: require('./lenses.html'),
		restrict: 'EA',
		scope: true
	};
};
