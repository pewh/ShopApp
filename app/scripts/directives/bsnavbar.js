'use strict';

angular.module('shopApp').directive('bsNavbar', ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var locationPath = function () {
                return $location.path();
            };

            scope.$watch(locationPath, function (newValue, oldValue) {
                $('li[data-match-route]', element).each(function (key, li) {
                    var $li = angular.element(li),
                        pattern = $li.attr('data-match-route'),
                        regexp = new RegExp('^' + pattern, ['i']);

                    if (regexp.test(newValue)) {
                        $li.addClass('active');
                    } else {
                        $li.removeClass('active');
                    }
                })
            });
        }
    };
}]);