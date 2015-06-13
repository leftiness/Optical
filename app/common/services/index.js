// Services and Factories have their first letter capitalized like Controllers

module.exports = angular.module('common.services', [])
	.service('LensesService', require('./LensesService.js'))
	.service('NotificationService', require('./NotificationService.js'));
