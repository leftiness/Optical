module.exports = angular.module('common.elements.commonHeader', [])
	.directive('commonHeader', require('./headerDirective'))
	.controller('HeaderCtrl', require('./headerController'));
