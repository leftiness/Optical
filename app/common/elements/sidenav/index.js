module.exports = angular.module('common.components.commonSidenav', [])
	.directive('commonSidenav', require('./sidenavDirective'))
	.controller('SidenavCtrl', require('./sidenavController'));
