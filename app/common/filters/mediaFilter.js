var MediaFilter = function ($mdMedia) {
	'use strict';

	return function (input) {
		return $mdMedia(input);
	};
};

MediaFilter.$inject = ['$mdMedia'];

module.exports = MediaFilter;
