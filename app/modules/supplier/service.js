'use strict';

angular.module('shopApp').factory('SupplierService', [
        '$rootScope',
        '$location',
        'Restangular',
        'LogService',
    function ($rootScope, $location, Restangular, LogService) {
        var Supplier = Restangular.all('suppliers');

        var refresh = function () {
            fetch();
            resetNewSupplier();
        };

        var fetch = function () {
            $rootScope.suppliers = Supplier.getList().$object;
        };

        var fetchById = function (id) {
            $rootScope.supplier = Restangular.one('suppliers', id).get().$object;
        };

        var resetNewSupplier = function () {
            $rootScope.newSupplier = {
                name: '',
                address: '',
                contact: ''
            };
        };

        var save = function () {
            Supplier.post($rootScope.newSupplier).then(refresh, LogService.errorHandler);
        }

        var update = function (id) {
            Restangular.one('suppliers', id).put($rootScope.supplier).then(function () {
                $location.path('/supplier');
            });
        }

        var remove = function (id) {
            Restangular.one('suppliers', id).get().then(function (response) {
                response.remove().then(fetch);
            }, LogService.errorHandler);
        }

        // Public API here
        return {
            $promise: Supplier.getList(),
            refresh: refresh,
            fetch: fetch,
            fetchById: fetchById,
            resetNewSupplier: resetNewSupplier,
            save: save,
            update: update,
            remove: remove
        };
    }
]);