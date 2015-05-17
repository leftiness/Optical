/*jshint expr: true*/

describe('LensesController', function () {
	'use strict';

	var ctrl;
	var scope;

	beforeEach(angular.mock.module('myApp'));

	beforeEach(function () {

		angular.mock.inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			ctrl = $controller('LensesCtrl', {
				$scope: scope
			});
		});

	});

	it('should exist', function () {
		expect(ctrl).to.not.be.undefined;
	});

});
