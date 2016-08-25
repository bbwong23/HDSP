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
        })

        // NEW ROUTE
        .when('/userprofile', {
            templateUrl: '/app/common/views/userprofile/profilepage.html',
            controller: 'UserProfileController'
        });
    $locationProvider.html5Mode(true);

}]);