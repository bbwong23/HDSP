(function (angular) {
    'use strict';

    angular.module('usersCtrl', ['ngResource']).controller('UsersController', ['$scope', '$rootScope', '$http', 'UsersService', function ($scope, $rootScope, $http, UsersService) {
        $scope.formData = {};
        $scope.getUser = function () {
            $http.get('/api/users')
                .success(function (data) {
                    $scope.users = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.createUser = function () {
            // document.getElementById('firstName').value = "";
            // document.getElementById('lastName').value = "";
            // document.getElementById('email').value = "";
            // document.getElementById('studentId').value = "";
            // document.getElementById('password').value = "";
            // begin dialog
            $("#add-user-dialog").dialog({
                dialogClass: "testUserDialog",
                title: "Add a User",
                closeText: "x",
                height: 300,
                width: 500,
                buttons: [
                    {
                        text: "Submit",
                        class: "submitCancelOk",
                        click: function () {
                            console.log(document.getElementById('firstName').value);
                            if ((document.getElementById('firstName').value === "") || (document.getElementById("lastName").value === "") || (document.getElementById("email").value === "") || (document.getElementById("password").value === "") || (document.getElementById("studentId").value === "")) {
                                $("#add-user-dialog").dialog("widget").effect("shake", { times: 2 }, 200);
                            } else {

                                var firstName = document.getElementById("firstName").value;
                                var lastName = document.getElementById("lastName").value;
                                var email = document.getElementById("email").value;
                                var studentId = document.getElementById("studentId").value;
                                var password = document.getElementById("password").value;
                                $("#add-dash-dialog").dialog("close"); // not working?
                                $scope.formData = { "firstName": firstName, "lastName": lastName, "email": email, "password": password, "studentId": studentId };
                                UsersService.addUser($scope.formData);
                            }
                        }
                    },
                    {
                        text: "Cancel",
                        class: "submitCancelOk",
                        click: function () {
                            $("#add-user-dialog").dialog("close");
                        }
                    }
                ]
            });
            $("#add-dash-dialog").dialog("open");
        };

        $scope.deleteUser = function (id) {
            $http.delete('/api/users' + id)
                .success(function (data) {
                    $scope.users = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
    }]);

})(window.angular);