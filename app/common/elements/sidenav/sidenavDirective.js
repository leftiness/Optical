module.exports = function () {
	'use strict';
	return {
		controller: 'SidenavCtrl as nav',
		template: require('./common-sidenav.html'),
		restrict: 'EA',
		replace: true
	};
};
