'use strict';

angular.module('shopApp').controller('CustomerCtrl', [
        '$scope',
        '$routeParams',
        '$location',
        'CustomerService',
        'FilterService',
    function ($scope,  $routeParams, $location, CustomerService, FilterService) {

        CustomerService.refresh();

        $scope.countAvailability = function () {
            return FilterService.countAvailability($scope.customers, $scope.keyword);
        }

        $scope.create = function () {
            CustomerService.save();
        }

        $scope.remove = function (customerId) {
            if (confirm('Apakah Anda yakin untuk menghapus pelanggan ini?')) {
                CustomerService.remove(customerId);
            }
        }

        $scope.$watch('$routeParams', function() {
            CustomerService.fetchById($routeParams.id);

            $scope.update = function () {
                CustomerService.update($routeParams.id);
            }
        });

        $scope.cancel = function () {
            $location.path('/customer')
        }
    
    }
]);