'use strict';

angular.module('shopApp').controller('BalanceCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
    Restangular.all('balances');
]);