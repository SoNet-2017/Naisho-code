'use strict';

angular.module('myApp.editProfileView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editProfile', {
    templateUrl: 'editProfileView/editProfileView.html',
    controller: 'editProfileViewCtrl'
  });
}])

.controller('editProfileViewCtrl', ['$scope', '$rootScope', 'Auth', 'Users', '$location', function($scope, $rootScope, Auth, Users, $location) {
    $scope.user={};

    $scope.salvamodifiche = function() {

    };
}]);