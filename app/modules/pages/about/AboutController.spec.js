/*jshint expr: true*/

describe('AboutController', function () {
	'use strict';
	var ctrl;
	var scope;

	beforeEach(angular.mock.module('myApp'));

	beforeEach(function () {

		angular.mock.inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			ctrl = $controller('AboutCtrl', {
				$scope: scope
			});
		});

	});

	it('should exist', function () {
		expect(ctrl).to.not.be.undefined;
	});

});
