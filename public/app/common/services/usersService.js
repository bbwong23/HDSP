angular.module('usersService', ['ngResource']).service('UsersService', ['$resource', '$q', function ($resource, $q) {
    var User = $resource('/api/users', {}, {});
    var GetUser = $resource('/api/users/:id', { id: '@id'});
    // get a specific user
    this.getUser = function (userId) {
        var users = $q.defer();
        GetUsers.get({ id: userId}, function (data) {
            users.resolve(data);
        });
        return users.promise;
    };
    // add a user
    this.addUser = function (userForm) {
        User.save(userForm);
    };
    // delete a user
    this.deleteUser = function (userId) {
        User.delete(userId);
    };
    // get all users
    this.getUsers = function () {
        var users = $q.defer();
        User.query(function (data) {
            users.resolve(data);
        });
        return users.promise;
    };
}]);