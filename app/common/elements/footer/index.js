module.exports = angular.module('common.elements.commonFooter', [])
	.directive('commonFooter', function () {
		'use strict';
		return {
			template: require('./common-footer.html'),
			restrict: 'EA',
			replace: true
		};
	});
