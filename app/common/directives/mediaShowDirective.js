var mediaShowDirective = function ($mdMedia) {
	'use strict';
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var media = function () {
				return $mdMedia(attrs.media);
			};
			var not = function () {
				return !!attrs.hasOwnProperty('not');
			};
			var show = 'display: inline-block !important;';
			var hide = 'display: none !important;';
			if (media()) {
				element.attr('style', hide);
			}
			scope.$watch(media, function (newValue, oldValue) {
				if (newValue !== oldValue) {
					var style = !(media() && not()) ? show : hide;
					element.attr('style', style);
				}
			});
		}
	};
};

mediaShowDirective.$inject = ['$mdMedia'];

module.exports = mediaShowDirective;
