var MESSAGES = (function () {
	'use strict';

	var m = {};

	m.common = {};

	m.lenses = {};
	m.lenses.get = {};
	m.lenses.delete = {};
	m.lenses.get.records = {};
	m.lenses.get.knobs = {};
	m.lenses.delete.records = {};

	m.common.ok = 'OK';

	m.lenses.get.records.failure = 'Failed to get records';
	m.lenses.get.knobs.failure = 'Failed to get knobs';
	m.lenses.delete.records.failure = 'Failed to delete some records';

	return m;
}());

MESSAGES.$inject = [];

module.exports = MESSAGES;
