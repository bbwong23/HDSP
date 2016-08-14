(function (angular) {
    'use strict';

    angular.module('mainCtrl', []).controller('MainController',['$scope', function ($scope) {

        $scope.tagline = 'To the moon and back!';

    }]);
})(window.angular);