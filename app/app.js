"use strict";

angular.module('tasty', [
    'ngRoute',
    'tasty.login'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'})
}]);
