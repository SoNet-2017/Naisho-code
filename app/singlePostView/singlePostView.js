'use strict';

angular.module('myApp.singlePostView', ['ngRoute','myApp.post'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/singlePost/:postID', {
    templateUrl: 'singlePostView/singlePostView.html',
    controller: 'singlePostViewCtrl',
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
.controller('singlePostViewCtrl', ['$scope', '$rootScope', '$routeParams', 'SinglePost','UsersChatService',
    function($scope, $rootScope, $routeParams, SinglePost,UsersChatService) {
        //initialize variables
        $scope.dati = {};


        $scope.dati.post = SinglePost.getSinglePost($routeParams.postID);
        console.log( $scope.dati.post );
        $scope.dati.userPost=UsersChatService.getUserInfo($scope.dati.post.userPost);
    }]);