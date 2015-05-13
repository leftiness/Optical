module.exports = function () {
	'use strict';
	return {
		controller: 'HeaderCtrl',
		template: require('./common-header.html'),
		restrict: 'EA',
		replace: true
	};
};
