'use strict';

angular.module('shopApp').controller('SalesInvoiceCtrl', [
        '$scope',
        'SalesInvoiceService',
        'FilterService',
    function ($scope,  SalesInvoiceService, FilterService) {

        SalesInvoiceService.fetch();

        $scope.countAvailability = function () {
            return FilterService.countAvailability($scope.salesInvoices, $scope.keyword);
        }

        $scope.remove = function (salesInvoiceId) {
            if (confirm('Apakah Anda yakin untuk menghapus faktur beli ini?')) {
                SalesInvoiceService.remove(salesInvoiceId);
            }
        }

        $scope.print = function (id) {
            window.open('/#/sales-invoice/print/' + id, '_blank');
        }
    }
]);


angular.module('shopApp').controller('EditSalesInvoiceCtrl', [
        '$scope',
        '$controller',
        '$routeParams',
        'SalesInvoiceService',
        'ProductService',
    function ($scope, $controller, $routeParams, SalesInvoiceService, ProductService) {

        var parentController = $controller('SalesTransactionCtrl', { $scope: $scope });
        angular.extend(this, parentController);

        SalesInvoiceService.fetchById($routeParams.id);

        $scope.update = function () {
            SalesInvoiceService.update($routeParams.id);
        }
    }
]);


angular.module('shopApp').controller('PrintSalesInvoiceCtrl', [
        '$scope',
        '$controller',
        '$routeParams',
        'SalesInvoiceService',
        'ProductService',
    function ($scope, $controller, $routeParams, SalesInvoiceService, ProductService) {
        SalesInvoiceService.fetchById($routeParams.id);
        window.print();
    }
]);


angular.module('shopApp').controller('SalesTransactionCtrl', [
        '$scope',
        '$routeParams',
        'ProductService',
        'SalesInvoiceService',
        'FilterService',
    function ($scope,  $routeParams, ProductService, SalesInvoiceService, FilterService) {

        SalesInvoiceService.refresh();

        $scope.isInvoiceAvailable = function () {
            if ($scope.salesInvoice.details &&
                $scope.salesInvoice.details.length) {
                return true;
            }

            return false;
        }

        $scope.calculateSellPrice = function (detail) {
            return detail.product.sellPrice * detail.quantity;
        }

        $scope.multiplyProduct = function( index, multiplier, name ) {
            var quantityInMultiplier = prompt('Berapa ' + name + '?');

            if (quantityInMultiplier) {
                $scope.salesInvoice.details[index].quantity = multiplier * quantityInMultiplier;
            }
        }

        /**
        * return {Boolean}
        */
        var productExistsOnCart = function (invoice, product) {
            var productsOnInvoice = _.pluck(invoice.details, 'product');

            return _.contains(productsOnInvoice, product);
        }

        /* return void */
        var focusStockOnProduct = function (product) {
            $('[data-id=' + product.id + ']').focus();
        }

        /* return void */
        var addProductToCart = function () {
            var detail = {
                product: $scope.selectedProduct,
                quantity: 1
            };

            $scope.salesInvoice.details.push(detail);
        }

        $scope.pushToInvoices = function () {
            if ( productExistsOnCart($scope.salesInvoice, $scope.selectedProduct) ) {
                focusStockOnProduct($scope.selectedProduct);
            } else {
                addProductToCart();
            }
        }

        $scope.totalQuantity = function () {
            var quantities = _.pluck($scope.salesInvoice.details, 'quantity');

            return sumNumberSequence(quantities);
        }

         $scope.totalSellPriceBeforeDiscount = function () {
            if ($scope.salesInvoice.details &&
                $scope.salesInvoice.details.length) {

                var sellPrices = [];

                 _.forEach($scope.salesInvoice.details, function(detail) {
                    sellPrices.push(detail.product.sellPrice * detail.quantity);
                });

                return sumNumberSequence(sellPrices) || 0;
            } else {
                return 0;
            }
           
        }

        $scope.totalSellPriceAfterDiscount = function () {
            return $scope.totalSellPriceBeforeDiscount() * (1 - $scope.salesInvoice.discount / 100);
        }

        $scope.create = function () {
            SalesInvoiceService.save();
            SalesInvoiceService.refresh();
        }

        $scope.remove = function (index) {
            $scope.salesInvoice.details.splice(index, 1);
        }

        $scope.removeAll = function () {
            $scope.salesInvoice.details = [];
        }

        setInterval(function () {
            $scope.$apply(function () {
                $scope.datetime = (new Date()).toISOString();
            }, 1000);
        });


        // helper            
        var sumNumberSequence = function (array) {
            if ( _.isNumber.apply(this, array) ) {

                return _.reduce(array, function (memo, num) {
                    return memo + num;
                }, 0);

            } else if ( _.isFunction.apply(this, array) ) {

                return _.reduce(array, function (memo, num) {
                    return memo + num();
                }, 0);
            }

            return 0;
        }

    }
]);