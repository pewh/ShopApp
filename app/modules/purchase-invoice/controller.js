'use strict';

angular.module('shopApp').controller('PurchaseInvoiceCtrl', [
        '$scope',
        'PurchaseInvoiceService',
        'FilterService',
    function ($scope,  PurchaseInvoiceService, FilterService) {

        PurchaseInvoiceService.fetch();

        $scope.countAvailability = function () {
            return FilterService.countAvailability($scope.purchaseInvoices, $scope.keyword);
        }

        $scope.remove = function (purchaseInvoiceId) {
            if (confirm('Apakah Anda yakin untuk menghapus faktur beli ini?')) {
                PurchaseInvoiceService.remove(purchaseInvoiceId);
            }
        }

        $scope.print = function (id) {
            window.open('/#/purchase-invoice/print/' + id, '_blank');
        }
    }
]);


angular.module('shopApp').controller('EditPurchaseInvoiceCtrl', [
        '$scope',
        '$controller',
        '$routeParams',
        'PurchaseInvoiceService',
        'ProductService',
    function ($scope, $controller, $routeParams, PurchaseInvoiceService, ProductService) {

        var parentController = $controller('PurchaseTransactionCtrl', { $scope: $scope });
        angular.extend(this, parentController);

        PurchaseInvoiceService.fetchById($routeParams.id);

        $scope.update = function () {
            PurchaseInvoiceService.update($routeParams.id);
        }
    }
]);

angular.module('shopApp').controller('PrintPurchaseInvoiceCtrl', [
        '$scope',
        '$controller',
        '$routeParams',
        'PurchaseInvoiceService',
        'ProductService',
    function ($scope, $controller, $routeParams, PurchaseInvoiceService, ProductService) {
        PurchaseInvoiceService.fetchById($routeParams.id);
        window.print();
    }
]);


angular.module('shopApp').controller('PurchaseTransactionCtrl', [
        '$scope',
        '$routeParams',
        'ProductService',
        'PurchaseInvoiceService',
        'FilterService',
    function ($scope,  $routeParams, ProductService, PurchaseInvoiceService, FilterService) {

        PurchaseInvoiceService.refresh();

        var previousChosenSupplierId = 0;
        $scope.isProductAvailable = false;

        $scope.isInvoiceAvailable = function () {
            if ($scope.purchaseInvoice.details &&
                $scope.purchaseInvoice.details.length) {
                return true;
            }

            return false;
        }

        $scope.calculateSellPrice = function (detail) {
            return detail.product.buyPrice * detail.quantity;
        }

        $scope.multiplyProduct = function( index, multiplier, name ) {
            var quantityInMultiplier = prompt('Berapa ' + name + '?');

            if (quantityInMultiplier) {
                $scope.purchaseInvoice.details[index].quantity = multiplier * quantityInMultiplier;
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

            $scope.purchaseInvoice.details.push(detail);
        }

        $scope.pushToInvoices = function () {
            if ( productExistsOnCart($scope.purchaseInvoice, $scope.selectedProduct) ) {
                focusStockOnProduct($scope.selectedProduct);
            } else {
                addProductToCart();
            }
        }

        $scope.totalQuantity = function () {
            var quantities = _.pluck($scope.purchaseInvoice.details, 'quantity');

            return sumNumberSequence(quantities);
        }

        $scope.totalSellPriceBeforeDiscount = function () {
            var buyPrices = [];

            _.forEach($scope.purchaseInvoice.details, function(detail) {
                buyPrices.push(detail.product.buyPrice * detail.quantity);
            });

            return sumNumberSequence(buyPrices) || 0;
        }

        $scope.totalSellPriceAfterDiscount = function () {
            return $scope.totalSellPriceBeforeDiscount() * (1 - $scope.purchaseInvoice.discount / 100);
        }

        $scope.create = function () {
            PurchaseInvoiceService.save();
            PurchaseInvoiceService.refresh();
        }

        $scope.remove = function (index) {
            $scope.purchaseInvoice.details.splice(index, 1);
        }

        $scope.removeAll = function () {
            $scope.purchaseInvoice.details = [];
        }

        $scope.filterProductBySupplier = function () {

            var filterBySupplier = function (products) {
                // filter products by supplier id
                $scope.products = _.where(products, {
                    supplier: { id: $scope.purchaseInvoice.supplier }
                });
            }

            var selectFirstProductIfAvailable = function () {
                if ($scope.products[0]) {
                    $scope.selectedProduct = $scope.products[0];
                    $scope.isProductAvailable = true;
                } else {
                    $scope.isProductAvailable = false;
                }
            }

            ProductService.$resource.getList()
                .then(filterBySupplier)
                .then(selectFirstProductIfAvailable);
        }

        $scope.confirmRemoveInvoiceIfExist = function () {
            if ( $scope.purchaseInvoice.details.length ) {
                if (confirm('Nama barang pada faktur harus dikosongkan sebelum mengganti pemasok. Klik OK untuk mengosongkan daftar barang pada faktur.')) {
                    $scope.removeAll();
                } else {
                    console.log("Before change " + $scope.purchaseInvoice.supplier);
                    $scope.purchaseInvoice.supplier = 1;
                    console.log("Now I change to " + $scope.purchaseInvoice.supplier);
                }
            }
        }

        $scope.trackPreviousChosenSupplier = function () {
            previousChosenSupplierId = $scope.purchaseInvoice.supplier;
            console.log("I track " + previousChosenSupplierId);
        }

        $scope.severalActionsWhenSupplierChanged = function () {
            $scope.filterProductBySupplier();
            $scope.confirmRemoveInvoiceIfExist();
            $scope.trackPreviousChosenSupplier();
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