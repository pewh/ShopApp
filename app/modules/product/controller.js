'use strict';

angular.module('shopApp').controller('ProductCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        'ProductService',
        'FilterService',
        'Restangular',
    function ($scope,  $routeParams, $location, ProductService, FilterService, Restangular) {

        ProductService.refresh();

        // TODO: refactor later
        var Supplier = Restangular.all('suppliers');
        $scope.suppliers = Supplier.getList().$object;

        $scope.countAvailability = function () {
            return FilterService.countAvailability($scope.products, $scope.keyword);
        }

        $scope.create = function () {
            ProductService.save();
        }

        $scope.remove = function (productId) {
            if (confirm('Apakah Anda yakin untuk menghapus barang ini?')) {
                ProductService.remove(productId);
            }
        }

        $scope.$watch('$routeParams', function() {
            ProductService.fetchById($routeParams.id);

            $scope.update = function () {
                ProductService.update($routeParams.id);
            }
        });

        $scope.cancel = function () {
            $location.path('/product')
        }

    }
]);