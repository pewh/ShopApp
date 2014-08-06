'use strict';

angular.module('shopApp').factory('ProductService', [
        '$rootScope',
        '$location',
        'Restangular',
        'LogService',
    function ($rootScope, $location, Restangular, LogService) {

        var Product = Restangular.all('products');
        var Balance = Restangular.one('balances');

        var refresh = function () {
            fetch();
            fetchBalance();
            resetNewProduct();
        };

        var fetch = function () {
            $rootScope.products = Product.getList().$object;
        };

        var fetchById = function (id) {
            $rootScope.product = Restangular.one('products', id).get().$object;
        };

        var fetchBalance = function() {
            Balance.get().then(function(balance) {
                $rootScope.purchaseValue = balance.totalDefisit;
                $rootScope.salesValue = balance.totalSurplus;
            });
        };
        
        var resetNewProduct = function () {
            $rootScope.newProduct = {
                code: '',
                name: '',
                supplier: '',
                buyPrice: 1,
                sellPrice: 1
            };
        };

        var save = function () {
            Product.post($rootScope.newProduct).then(refresh, function(e) {
                alert("Error: kode sudah ada");
            });
        };

        var update = function (id) {
            // HACK: use supplier's id instead of supplier object
            $rootScope.product.supplier = $rootScope.product.supplier.id;

            Restangular.one('products', id).put($rootScope.product).then(function () {
                $location.path('/product');
            });
        };

        var remove = function (id) {
            Restangular.one('products', id).get().then(function (response) {
                response.remove().then(fetch);
            }, LogService.errorHandler);
        };

        // Public API here
        return {
            $resource: Restangular.all('products'),
            $object: Restangular.all('products').getList().$object, // deprecated
            refresh: refresh,
            fetch: fetch,
            fetchById: fetchById,
            resetNewProduct: resetNewProduct,
            save: save,
            update: update,
            remove: remove
        };
    }
]);