'use strict';

angular.module('shopApp').factory('UserService', [
        '$rootScope',
        '$location',
        'Restangular',
        'LogService',
    function ($rootScope, $location, Restangular, LogService) {
        var User = Restangular.all('users');

        var refresh = function () {
            fetch();
            resetNewUser();
        };

        var fetch = function () {
            $rootScope.users = User.getList().$object;
        };

        var fetchById = function (id) {
            $rootScope.user = Restangular.one('users', id).get().$object;
        };

        var resetNewUser = function () {
            $rootScope.newUser = {
                username: '',
                password: '',
                role: 0
            };
        };

        var save = function () {
            User.post($rootScope.newUser).then(refresh, LogService.errorHandler);
        }

        var update = function (id) {
            Restangular.one('users', id).put($rootScope.user).then(function () {
                $location.path('/user');
            });
        }

        var remove = function (id) {
            Restangular.one('users', id).get().then(function (response) {
                response.remove().then(fetch);
            }, LogService.errorHandler);
        }

        // Public API here
        return {
            refresh: refresh,
            fetch: fetch,
            fetchById: fetchById,
            resetNewUser: resetNewUser,
            save: save,
            update: update,
            remove: remove
        };
    }
]);