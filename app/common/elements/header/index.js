module.exports = angular.module('common.elements.commonHeader', [])
	.directive('commonHeader', function () {
		'use strict';
		return {
			template: require('./common-header.html'),
			restrict: 'EA',
			replace: true
		};
	});
