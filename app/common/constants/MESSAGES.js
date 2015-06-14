var MESSAGES = (function () {
	'use strict';

	var m = {};

	m.common = {};

	m.common.ok = 'OK';

	m.crud = {};
	m.crud.create = {};
	m.crud.retrieve = {};
	m.crud.update = {};
	m.crud.delete = {};

	m.crud.create.failure = 'Error while creating records';
	m.crud.retrieve.failure = 'Error while retrieving records';
	m.crud.update.failure = 'Error while updating records';
	m.crud.delete.failure = 'Error while deleting records';

	return m;
}());

MESSAGES.$inject = [];

module.exports = MESSAGES;
