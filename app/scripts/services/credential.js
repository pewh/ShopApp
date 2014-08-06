'use strict';

angular.module('shopApp').factory('CredentialService', [
		'$location',
		'Restangular',
	function Credential($location, Restangular) {
	    var valid = function (username, password) {
	    	var loginRule = {
	    		username: username,
	    		password: password
	    	};

				Restangular.one('users').get(loginRule).then(function (response) {
	        	if (response.length) {
	        		localStorage.setItem('ShopApp:authenticated_as', response[0].role); // 0: karyawan, 1: admin
	        		$location.path('/');
	        	} else {
	        		alert('Username/password salah');
	        	}
	        });
	    };

	    var logout = function () {
	    	delete localStorage['ShopApp:authenticated_as'];
    		$location.path('/login');
	    };

	    var isLoggedIn = function () {
	    	return _.isString(localStorage.getItem('ShopApp:authenticated_as'));
	    }

	    return {
	    	valid: valid,
	    	logout: logout,
	    	isLoggedIn: isLoggedIn
	    };
	}
]);