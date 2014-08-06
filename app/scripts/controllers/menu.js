'use strict';

angular.module('shopApp').controller('MenuCtrl', [
		'$scope',
		'CounterService',
		'CredentialService',
	function ($scope, CounterService, CredentialService) {
		
		$scope.isLoggedIn = CredentialService.isLoggedIn;

		$scope.login = function() {
			CredentialService.valid($scope.username, $scope.password);
		}

		$scope.logout = function() {
			CredentialService.logout();
		}
	}
]);