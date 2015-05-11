function config(RestangularProvider) {
	'use strict';
	RestangularProvider.setBaseUrl('/api');
	RestangularProvider.setRestangularFields({
		id: '_id'
	});
}

config.$inject = ['RestangularProvider'];

module.exports = config;
