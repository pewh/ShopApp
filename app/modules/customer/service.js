'use strict';

angular.module('shopApp').factory('CustomerService', [
        '$rootScope',
        '$location',
        'Restangular',
        'LogService',
    function ($rootScope, $location, Restangular, LogService) {
        var Customer = Restangular.all('customers');

        var refresh = function () {
            fetch();
            resetNewCustomer();
        };

        var fetch = function () {
            $rootScope.customers = Customer.getList().$object;
        };

        var fetchById = function (id) {
            $rootScope.customer = Restangular.one('customers', id).get().$object;
        };

        var resetNewCustomer = function () {
            $rootScope.newCustomer = {
                code: '',
                name: '',
                supplier: '',
                stock: 1,
                price: 1
            };
        };

        var save = function () {
            Customer.post($rootScope.newCustomer).then(refresh, LogService.errorHandler);
        };

        var update = function (id) {
            Restangular.one('customers', id).put($rootScope.customer).then(function () {
                $location.path('/customer');
            });
        };

        var remove = function (id) {
            Restangular.one('customers', id).get().then(function (response) {
                response.remove().then(fetch);
            }, LogService.errorHandler);
        };

        // Public API here
        return {
            refresh: refresh,
            fetch: fetch,
            fetchById: fetchById,
            resetNewCustomer: resetNewCustomer,
            save: save,
            update: update,
            remove: remove
        };
    }
]);