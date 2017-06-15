'use strict';

angular.module('myApp.singleForumView', ['ngRoute','myApp.forum'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/singleForum/:forumID', {
    templateUrl: 'singleForumView/singleForumView.html',
    controller: 'singleForumViewCtrl',
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
//Inline Array Annotation
    //Here we pass an array whose elements consist of a list of strings (the names of the dependencies)
    // followed by the function itself.
    //When using this type of annotation, take care to keep the annotation array
    // in sync with the parameters in the function declaration.
.controller('singleForumViewCtrl', ['$scope', '$rootScope', '$routeParams', 'SingleForum',
    function($scope, $rootScope, $routeParams, SingleForum) {
        //initialize variables
        $scope.dati = {};

        $scope.dati.forum = SingleForum.getSingleForum($routeParams.forumID);
        ;
    }]);