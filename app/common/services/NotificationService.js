var NotificationService = function ($mdToast, MESSAGES) {
	'use strict';

	/*
	 * TODO: Notification queue. Persistent across application states.
	 * As notifications are cleared or fade away, new notifications show.
	 */

	/*
	 * TODO: Toast in white space beneath toolbar?
	 * https://github.com/angular/material/issues/1106
	 */

	this.show = function (message) {
		// TODO: Messages in constants.
		var toast = $mdToast.simple()
			.action(MESSAGES.common.ok)
			.content(message)
			.position('top right')
			.hideDelay(6000);
		$mdToast.show(toast);
	};

};

NotificationService.$inject = ['$mdToast', 'MESSAGES'];

module.exports = NotificationService;
