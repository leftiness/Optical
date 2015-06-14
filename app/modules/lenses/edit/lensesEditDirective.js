module.exports = function lensesEditDirective() {
	'use strict';
	return {
		controller: 'LensesEditCtrl as edit',
		template: require('./lensesEdit.html'),
		restrict: 'EA',
		scope: true
	};
};
