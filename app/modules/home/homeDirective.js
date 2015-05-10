module.exports = function homeDirective() {
	'use strict';
	return {
		controller: 'HomeCtrl', // Called from HomeController.js
		template: require('./home.html'),
		restrict: 'EA',
		scope: true
	};
};
