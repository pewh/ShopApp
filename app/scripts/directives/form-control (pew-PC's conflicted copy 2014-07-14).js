'use strict';

angular.module('shopApp').directive('inputGroup', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/scripts/directives/templates/input-text.html',
        scope: {
            label: '@'
        },
        link: function postLink(scope, element, attrs) {
            //
        }
    };
});