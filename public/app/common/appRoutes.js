 angular.module('appRoutes', ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // login page
        .when('/login', {
            templateUrl: '/app/common/views/login/login.html',
            controller: 'login'
        })

        // account registration page
        .when('/signup', {
            templateUrl: '/app/common/views/login/registration.html',
            controller: 'signup'
        })

        // home page
        .when('/', {
            templateUrl: '/app/common/views/main/home.html',
            controller: 'MainController'
        })

        // users page that will use the UsersController
        .when('/users', {
            templateUrl: '/app/common/views/users/users.html',
            controller: 'UsersController'
        });

    $locationProvider.html5Mode(true);

}]);