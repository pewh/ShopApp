'use strict';

angular.module('shopApp').service('CounterService', [
        '$rootScope',
    function ($rootScope, ProductService, SupplierService, CustomerService) {

        // $rootScope.productsCount = ProductService.resource.getList().$object.length;

        // SupplierService.resource.query(function (response) {
        //     $rootScope.suppliersCount = response.length;
        // });

        // CustomerService.resource.query(function (response) {
        //     $rootScope.customersCount = response.length;
        // });

    }
]);