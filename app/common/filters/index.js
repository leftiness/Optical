module.exports = angular.module('common.filters', [])
	.filter('selected', require('./selectedFilter.js'))
	.filter('media', require('./mediaFilter.js'));
