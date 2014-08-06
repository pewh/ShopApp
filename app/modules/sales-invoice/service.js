'use strict';

angular.module('shopApp').factory('SalesInvoiceService', [
        '$rootScope',
        'Restangular',
        'LogService',
        'ProductService',
        '$location',
    function ($rootScope, Restangular, LogService, ProductService, $location) {

        var SalesInvoice = Restangular.all('salesinvoices');
        var Customer = Restangular.all('customers');

        var refresh = function () {
            resetNewSalesInvoice();
            fetch();
            fetchCustomer();
            fetchProduct();
        }

        var fetch = function () {
            SalesInvoice.getList().then(function (invoices) {
                $rootScope.salesInvoices = invoices;
            });
        };

        var fetchCustomer = function () {
            Restangular.all('customers').getList().then(function (customers) {
                 $rootScope.customers = customers;
             });
        };

        var fetchProduct = function () {
            Restangular.all('products').getList().then(function(products) {
                $rootScope.products = products;

                // remove blank option
                if ($rootScope.products[0]) {
                    $rootScope.selectedProduct = $rootScope.products[0];
                }
            });
        }

        var fetchById = function (id) {
            Restangular.one('salesinvoices', id).get().then(function (invoice) {
                $rootScope.salesInvoice = invoice;
            });

            Restangular.all('customers').getList().then(function (customers) {
                $rootScope.customers = customers;
            });
        };

        var resetNewSalesInvoice = function () {
            $rootScope.salesInvoice = {
                code: '',
                discount: 0,
                customer: -1,
                details: []
            };
        };

        var save = function () {
            SalesInvoice.post($rootScope.salesInvoice).then(resetNewSalesInvoice, function(e) {
                alert("Error: nomor nota sudah ada");
            });
        }

        var update = function (id) {
            // // HACK: use customer's id instead of customer object
            // $rootScope.product.supplier = $rootScope.product.supplier.id;

            // Restangular.one('products', id).put($rootScope.product).then(function () {
            //     $location.path('/product');
            // });

            Restangular.one('salesinvoices', id).get().then(function (invoice) {
                invoice = $rootScope.salesInvoice;
                invoice.customer = invoice.customer.id;

                invoice.put().then(function () {
                    $location.path('/sales-invoice');
                })
            });
        }

        var remove = function (id) {
            Restangular.one('salesinvoices', id).get().then(function (response) {
                response.remove();
            }).then(function () {
                $rootScope.salesInvoices = [];
                setTimeout(fetch, 500);
            });
        }

        // Public API here
        return {
            refresh: refresh,
            fetch: fetch,
            fetchById: fetchById,
            fetchCustomer: fetchCustomer,
            resetNewSalesInvoice: resetNewSalesInvoice,
            save: save,
            update: update,
            remove: remove
        };
    }
]);