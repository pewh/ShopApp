'use strict';

angular.module('shopApp').controller('SupplierCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        'SupplierService',
        'FilterService',
    function ($scope,  $routeParams, $location, SupplierService, FilterService) {

        SupplierService.fetch();

        SupplierService.resetNewSupplier();

        $scope.countAvailability = function () {
            return FilterService.countAvailability($scope.suppliers, $scope.keyword);
        }

        $scope.create = function () {
            SupplierService.save();
        }

        $scope.remove = function (supplierId) {
            if (confirm('Apakah Anda yakin untuk menghapus pemasok ini?')) {
                SupplierService.remove(supplierId);
            }
        }

        $scope.$watch('$routeParams', function() {
            SupplierService.fetchById($routeParams.id);

            $scope.update = function () {
                SupplierService.update($routeParams.id);
            }
        });

        $scope.cancel = function () {
            $location.path('/supplier')
        }
    
    }
]);