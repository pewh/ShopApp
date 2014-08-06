'use strict';

angular.module('shopApp').controller('UserCtrl', [
		'$scope',
        '$routeParams',
        '$location',
        'UserService',
        'FilterService',
    function ($scope, $routeParams, $location, UserService, FilterService) {

        UserService.refresh();

        $scope.countAvailability = function () {
            return FilterService.countAvailability($scope.users, $scope.keyword);
        }
        
        $scope.create = function () {
            UserService.save();
        }

        $scope.remove = function (userId) {
            if (confirm('Apakah Anda yakin untuk menghapus user ini?')) {
                UserService.remove(userId);
            }
        }

        $scope.$watch('$routeParams', function() {
            UserService.fetchById($routeParams.id);

            $scope.update = function () {
                UserService.update($routeParams.id);
            }
        });

        $scope.cancel = function () {
            $location.path('/user')
        }

        $scope.roles = [
            { id: 0, name: "Karyawan" },
            { id: 1, name: "Admin" }
        ];
    
    }
]);