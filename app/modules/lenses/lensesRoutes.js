function lensesRoutes($stateProvider) {
	'use strict';

	var lenses = {
		name: 'lenses',
		url: '/lenses/:id?q&f&s',
		template: '<div lenses-view></div>',
		data: {
			moduleClasses: 'lens',
			pageClasses: 'lenses',
			pageTitle: 'Lenses',
			pageDescription: 'Some description.'
		}
	};

	$stateProvider.state(lenses);

}

lensesRoutes.$inject = ['$stateProvider'];

module.exports = lensesRoutes;
