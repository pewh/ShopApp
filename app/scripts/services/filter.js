'use strict';

angular.module('shopApp').factory('FilterService', [
        '$filter',
    function ($filter) {

        var countAvailability = function(collection, keyword) {
            var filteredData = $filter('filter')(collection, keyword);


            if (filteredData && filteredData.length) {
                return true;
            } else {
                return false;
            }
        };

        // Public API here
        return {
            countAvailability: countAvailability
        };

    }
]);