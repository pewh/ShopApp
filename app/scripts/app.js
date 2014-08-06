'use strict';

angular.module('shopApp', [
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'restangular',
    'mgcrea.ngStrap.datepicker'
])
.config(function ($routeProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('//localhost:1337/api/v1');

    var getViewModulePath = function(moduleName, htmlFile) {
        return 'modules/' + moduleName + '/views/' + htmlFile + '.html';
    };

    $routeProvider
        // product
            .when('/product', {
                templateUrl: getViewModulePath('product', 'index'),
                controller: 'ProductCtrl'
            })
            .when('/product/:id', {
                templateUrl: getViewModulePath('product', 'edit'),
                controller: 'ProductCtrl'
            })

        // supplier
            .when('/supplier', {
                templateUrl: getViewModulePath('supplier', 'index'),
                controller: 'SupplierCtrl'
            })
            .when('/supplier/:id', {
                templateUrl: getViewModulePath('supplier', 'edit'),
                controller: 'SupplierCtrl'
            })

        // customer
            .when('/customer', {
                templateUrl: getViewModulePath('customer', 'index'),
                controller: 'CustomerCtrl'
            })
            .when('/customer/:id', {
                templateUrl: getViewModulePath('customer', 'edit'),
                controller: 'CustomerCtrl'
            })

        // purchase-invoice
            .when('/purchase-invoice', {
                templateUrl: getViewModulePath('purchase-invoice', 'index'),
                controller: 'PurchaseInvoiceCtrl'
            })
            .when('/purchase-invoice/create', {
                templateUrl: getViewModulePath('purchase-invoice', 'create'),
                controller: 'PurchaseTransactionCtrl'
            })
            .when('/purchase-invoice/:id', {
                templateUrl: getViewModulePath('purchase-invoice', 'edit'),
                controller: 'EditPurchaseInvoiceCtrl'
            })
            .when('/purchase-invoice/print/:id', {
                templateUrl: getViewModulePath('purchase-invoice', 'print'),
                controller: 'PrintPurchaseInvoiceCtrl'
            })

        // sales-invoice
            .when('/sales-invoice', {
                templateUrl: getViewModulePath('sales-invoice', 'index'),
                controller: 'SalesInvoiceCtrl'
            })
            .when('/sales-invoice/create', {
                templateUrl: getViewModulePath('sales-invoice', 'create'),
                controller: 'SalesTransactionCtrl'
            })
            .when('/sales-invoice/:id', {
                templateUrl: getViewModulePath('sales-invoice', 'edit'),
                controller: 'EditSalesInvoiceCtrl'
            })
            .when('/sales-invoice/print/:id', {
                templateUrl: getViewModulePath('sales-invoice', 'print'),
                controller: 'PrintSalesInvoiceCtrl'
            })

        // balance
            .when('/balance', {
              templateUrl: getViewModulePath('balance', 'index'),
              controller: 'BalanceCtrl'
            })

        // user
            .when('/user', {
              templateUrl: getViewModulePath('user', 'index'),
              controller: 'UserCtrl'
            })
            .when('/user/:id', {
                templateUrl: getViewModulePath('user', 'edit'),
                controller: 'UserCtrl'
            })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'MenuCtrl'
        })
        .otherwise({
            redirectTo: '/product'
        });
})
        
.run(['CredentialService', '$rootScope', function (CredentialService, $rootScope) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (! CredentialService.isLoggedIn) {
            CredentialService.logout();
        }
    })
}]);