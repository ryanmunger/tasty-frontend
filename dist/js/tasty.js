"use strict";

angular.module('tasty', [
    'ngRoute',
    'tasty.login'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'})
}]);

'use strict';

angular.module('tasty.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginController'
    });
}]);

angular.module('tasty.login').controller('loginController', ['$scope',
    function($scope) {
        console.log('inside of login controller');
    }
]);
