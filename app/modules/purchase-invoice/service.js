'use strict';

angular.module('shopApp').factory('PurchaseInvoiceService', [
        '$rootScope',
        'Restangular',
        'LogService',
        'ProductService',
        '$location',
    function ($rootScope, Restangular, LogService, ProductService, $location) {

        var PurchaseInvoice = Restangular.all('purchaseinvoices');

        var refresh = function () {
            resetNewPurchaseInvoice();
            fetch();
            fetchSupplier();
        }

        var fetch = function () {
            PurchaseInvoice.getList().then(function (invoices) {
                $rootScope.purchaseInvoices = invoices;
            });
        };

        var fetchSupplier = function () {
             Restangular.all('suppliers').getList().then(function (suppliers) {
                 $rootScope.suppliers = suppliers;
             });
        };

        // TODO refactor it
        var fetchById = function (id) {
            Restangular.one('purchaseinvoices', id).get().then(function (invoice) {
                $rootScope.purchaseInvoice = invoice;

                // list all products
                ProductService.$resource.getList().then(function(products) {
                    // filter products by supplier id
                    $rootScope.products = _.where(products, {
                        supplier: { id: invoice.supplier.id }
                    });

                    // remove blank option
                    if ($rootScope.products[0]) {
                        $rootScope.selectedProduct = $rootScope.products[0];
                    }
                });
            });
        };

        var resetNewPurchaseInvoice = function () {
            $rootScope.purchaseInvoice = {
                code: '',
                discount: 0,
                supplier: -1,
                details: []
            };
        };

        var save = function () {
            PurchaseInvoice.post($rootScope.purchaseInvoice).then(resetNewPurchaseInvoice, function(e) {
                alert("Error: nomor faktur sudah ada");
            });
        }

        var update = function (id) {
            Restangular.one('purchaseinvoices', id).get().then(function (invoice) {
                invoice = $rootScope.purchaseInvoice;
                invoice.put().then(function () {
                    $location.path('/purchase-invoice');
                })
            });
        }

        var remove = function (id) {
            Restangular.one('purchaseinvoices', id).get().then(function (response) {
                response.remove();
            }).then(function () {
                $rootScope.purchaseInvoices = [];
                setTimeout(fetch, 500);
            });
        }

        // Public API here
        return {
            refresh: refresh,
            fetch: fetch,
            fetchById: fetchById,
            fetchSupplier: fetchSupplier,
            resetNewPurchaseInvoice: resetNewPurchaseInvoice,
            save: save,
            update: update,
            remove: remove
        };
    }
]);