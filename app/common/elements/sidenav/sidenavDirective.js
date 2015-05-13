module.exports = function () {
	'use strict';
	return {
		controller: 'SidenavCtrl',
		template: require('./common-sidenav.html'),
		restrict: 'EA',
		replace: true
	};
};
