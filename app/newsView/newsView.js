'use strict';

angular.module('myApp.newsView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/newsView', {
    templateUrl: 'newsView/newsView.html',
    controller: 'newsViewCtrl'
  });
}])

.controller('newsViewCtrl', ['$scope', '$rootScope', 'Auth', 'Users', '$location', function($scope, $rootScope, Auth, Users, $location) {

}]);