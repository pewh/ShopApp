'use strict';

angular.module('shopApp').filter('daterange', function () {
    return function( list, startDate, endDate ) {
        var results = [];

        var startDate = (startDate && !isNaN(Date.parse(startDate))) ? Date.parse(startDate) : 0;
        var endDate = (endDate && !isNaN(Date.parse(endDate))) ? Date.parse(endDate) : new Date().getTime();

        if (list && list.length > 0) {
            $.each(list, function( index, list ) {
                var listDate = new Date(list.datetime);

                if (listDate >= startDate && listDate <= endDate) {
                    results.push(list);
                }
            });
        }
        
        return results;
    }
});