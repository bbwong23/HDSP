(function (angular) {
    'use strict';

    angular.module('userProfileCtrl', ['ngResource']).controller('UserProfileController', ['$scope', '$rootScope', '$http', 'UsersService', function ($scope, $rootScope, $http, UsersService) {
        $scope.init = function () {
            $http.get('/api/users/')
                .success(function (data) {
                    $scope.users = data;
                    var firstuser = data[0];
                    $scope.name = firstuser.firstName + " " + firstuser.lastName;
                    $scope.email = firstuser.email;
                    $scope.id = firstuser.studentId;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
    }]);

})(window.angular);

/*
add to appRoutes: 

.when('/userprofile', {
            templateUrl: '/app/common/views/userprofile/profilepage.html',
            controller: 'UserProfileController'
        });

add to app.js: 

'userProfileCtrl'

add to index.html: 

<li><a href="/userprofile">User Profile</a></li>
*/
