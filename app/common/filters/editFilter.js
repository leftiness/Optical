var EditFilter = function (CONSTANTS) {
	'use strict';

	var _ = CONSTANTS.lodash;

	return function (input) {
		var list = _.filter(input, 'isSelected');
		return _.get(list, ['0', 'id']);
	};
};

EditFilter.$inject = ['CONSTANTS'];

module.exports = EditFilter;
