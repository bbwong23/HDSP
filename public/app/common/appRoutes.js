 angular.module('appRoutes', ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

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