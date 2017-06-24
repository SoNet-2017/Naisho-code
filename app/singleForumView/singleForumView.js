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
.controller('singleForumViewCtrl', ['$scope', '$rootScope', '$routeParams', 'SingleForum','UsersChatService','$firebaseStorage','currentAuth','Forum','InsertForumService',
    function($scope, $rootScope, $routeParams, SingleForum,UsersChatService,$firebaseStorage,currentAuth,Forum,InsertForumService) {
        //initialize variables
        $scope.dati = {};
        $scope.commenti={};
        $scope.commentiDaMostrare=[];

        $scope.commenti=Forum.getCommentData();
        $scope.dati.forum = SingleForum.getSingleForum($routeParams.forumID);
        console.log($scope.dati.forum);

        $scope.dati.forum.$loaded().then(function () {
            var idCommentatore = currentAuth.uid;
            $scope.commentatore=UsersChatService.getUserInfo(currentAuth.uid);
            console.log("id del commentatore:" ,idCommentatore);

            //commenti al post:
            for (var i = 0; i < $scope.commenti.length; i++) {
                console.log($scope.commenti[i]);
                if( $scope.commenti[i].forum===$scope.dati.forum.id){
                    var info=UsersChatService.getUserInfo($scope.commenti[i].idCommentatore);
                    var cognome=UsersChatService.getUserInfo($scope.commenti[i].idCommentatore);
                    $scope.commentiDaMostrare.push({commento:$scope.commenti[i].commento,info:info});
                };
            }

            console.log($scope.commentiDaMostrare);

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
                //  InsertCommentoService.insertNewCommento($scope.dati.post.id,$scope.post.newComment, idCommentatore);
                console.log($scope.forum.newComment,$scope.dati.forum.id, idCommentatore);
                InsertForumService.insertNewCommento($scope.forum.newComment,$scope.dati.forum.id,idCommentatore);
                $scope.forum.newComment="";
            };


        });

        }]);