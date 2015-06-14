function lensesRoutes($stateProvider) {
	'use strict';

	var lenses = {
		name: 'lenses',
		abstract: 'true',
		url: '/lenses',
		template: '<div ui-view></div>',
		data: {
			moduleClasses: 'lens',
			pageClasses: 'lenses',
			pageTitle: 'Lenses',
			pageDescription: 'Some description.'
		}
	};

	var search = {
		name: 'lenses.search',
		url: '/:lens?q&f&s',
		template: '<div lenses-search-view></div>',
		data: {
			moduleClasses: 'lens',
			pageClasses: 'lenses',
			pageTitle: 'Search',
			pageDescription: 'Some description.'
		}
	};

	var edit = {
		name: 'lenses.edit',
		url: '/:lens/edit/:record',
		template: '<div lenses-edit-view></div>',
		data: {
			moduleClasses: 'lens',
			pageClasses: 'lenses',
			pageTitle: 'Edit',
			pageDescription: 'Some description.'
		}
	};

	$stateProvider.state(lenses);
	$stateProvider.state(search);
	$stateProvider.state(edit);

}

lensesRoutes.$inject = ['$stateProvider'];

module.exports = lensesRoutes;
