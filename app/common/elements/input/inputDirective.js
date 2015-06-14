module.exports = function () {
	'use strict';
	return {
		template: require('./common-input.html'),
		restrict: 'EA',
		replace: true,
		scope: {
			model: '=',
			values: '=',
			type: '=',
			name: '='
		}
	};
};
