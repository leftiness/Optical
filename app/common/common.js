window.jQuery = window.$ = require('jquery');
window._ = require('lodash');

require('angular-bootstrap');
require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');
require('domready/ready');
require('lodash');
require('restangular');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-smart-table');

module.exports = angular.module('common',
	[
		'ui.bootstrap',
		'ui.router',
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'restangular',
		'ngMaterial',
		'smart-table',
		require('./elements/header').name,
		require('./elements/footer').name,
		require('./elements/sidenav').name,
		require('./elements/input').name,
		require('./constants').name,
		require('./directives').name,
		require('./resources').name,
		require('./filters').name,
		require('./services').name
	]);
