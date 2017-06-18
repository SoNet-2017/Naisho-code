'use strict';

angular.module('myApp.singlePostView', ['ngRoute','myApp.post','myApp.users'])

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
.controller('singlePostViewCtrl', ['$scope', '$rootScope', '$routeParams', 'SinglePost','UsersChatService','$firebaseStorage',
    function($scope, $rootScope, $routeParams, SinglePost,UsersChatService,$firebaseStorage) {
        //initialize variables
        $scope.dati = {};
        $scope.post={};

//per avere i dati del singolo post
        console.log("sei qui",$routeParams.postID)
        $scope.dati.post = SinglePost.getSinglePost($routeParams.postID);
        console.log( $scope.dati.post );
        $scope.dati.post.$loaded().then(function () {
            $scope.dati.userPost = UsersChatService.getUserInfo($scope.dati.post.userPost);
            console.log("questo è dati.userPost:", $scope.dati.userPost);

            //funzione per commentare post:

            //   1)mostra la finestra per inserire il commento
            $scope.commenta = function () {
                document.getElementById("commento").style.display = "flex";
            };
            //   2)chiude la finestra per inserire il commento dopo che si è premuto il tasto "commenta"
            $scope.closeCommento = function () {
                document.getElementById("commento").style.display = "none";
            };
//  3)   salva il commento nel database
            $scope.salvaCommento = function () {
                SinglePost.commentPost($scope.dati.post.id,$scope.post.newComment);
                $scope.post.newComment="";
            };


            //funzione mi "piace"

            $scope.miPiace= function () {
                var b=document.getElementById("miPiace");
               // if(b.attr('disabled')==="false"){
                 b.style.backgroundColor="#3903FF";
                //b.innerHTML = "Non mi Piace Più";
            //}
                //else {b.style.backgroundColor="gray";
                //    b.innerHTML = "Mi Piace";
                  //  b.attr('disabled')==="true";
                //}
            }
        });
    }]);