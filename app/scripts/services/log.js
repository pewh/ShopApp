'use strict';

angular.module('shopApp').service('LogService', function () {

    var errorHandler = function (errorResponse) {
        console.log(errorResponse);
    };

    return {
        errorHandler: errorHandler
    };
});