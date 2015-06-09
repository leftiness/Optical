var SelectedFilter = function (CONSTANTS) {
	'use strict';

	return function (input) {
		return CONSTANTS.lodash.countBy(input, 'isSelected')[true];
	};
};

SelectedFilter.$inject = ['CONSTANTS'];

module.exports = SelectedFilter;
