module.exports = function aboutDirective() {
	'use strict';
	return {
		controller: 'AboutCtrl',
		template: require('./about.html'),
		restrict: 'EA',
		scope: true
	};
};
