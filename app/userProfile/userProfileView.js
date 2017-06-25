'use strict';

angular.module('myApp.userProfileView', ['ngRoute','myApp.forum','myApp.users'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userProfile', {
    templateUrl: 'userProfile/userProfileView.html',
    controller: 'userProfileCtrl',
      resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $routeChangeError (see above)
              return Auth.$requireSignIn();
          }]
      }
  })
}])

.controller('userProfileCtrl', ['$scope', '$rootScope', 'UsersChatService', 'Users', 'currentAuth', '$firebaseAuth', '$location','Forum',
    function($scope, $rootScope, UsersChatService, Users, currentAuth, $firebaseAuth, $location, Forum) {
    $scope.dati={};

   // $rootScope.dati.currentView = "userProfile";
    $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);
    $scope.dati.forum=Forum.getData();



}]);