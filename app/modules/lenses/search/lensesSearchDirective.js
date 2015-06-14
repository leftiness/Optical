module.exports = function lensesSearchDirective() {
	'use strict';
	return {
		controller: 'LensesSearchCtrl as search',
		template: require('./lensesSearch.html'),
		restrict: 'EA',
		scope: true
	};
};
