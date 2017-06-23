'use strict';

angular.module('myApp.singlePostView', ['ngRoute','myApp.post','myApp.users'])
//,'myApp.commento'
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
.controller('singlePostViewCtrl', ['$scope', '$rootScope', '$routeParams', 'SinglePost','UsersChatService','$firebaseStorage','currentAuth','Post',
    function($scope, $rootScope, $routeParams, SinglePost,UsersChatService,$firebaseStorage,currentAuth,Post) {
     //   'Commento','InsertCommentoService',
        //,Commento,InsertCommentoService
        //initialize variables
        $scope.dati = {};
        $scope.post={};
        $scope.commenti={};
        $scope.commentiDaMostrare=[];
//per avere i dati del singolo post
        console.log("sei qui",$routeParams.postID);
        $scope.dati.post = SinglePost.getSinglePost($routeParams.postID);
        console.log( $scope.dati.post );
        //commenti ai post:
       $scope.commenti=Post.getCommentData();
         console.log($scope.commenti);

        $scope.dati.post.$loaded().then(function () {
            $scope.dati.userPost = UsersChatService.getUserInfo($scope.dati.post.userPost);
            var idCommentatore = currentAuth.uid;
            $scope.commentatore=UsersChatService.getUserInfo(currentAuth.uid);
            console.log("id del commentatore:" ,idCommentatore);
            console.log("questo è info fi chi ha messo il post dati.userPost:", $scope.dati.userPost);

//dati dell'user che ha messo il post:
       $scope.dati.user = UsersChatService.getUserInfo($scope.dati.post.userPost);
       console.log($scope.dati.post.userPost)
       console.log("questo è dati:", $scope.dati.user);


       //commenti al post:
           for (var i = 0; i < $scope.commenti.length; i++) {
                  console.log($scope.commenti[i]);
               if( $scope.commenti[i].post===$scope.dati.post.id){
             var info=UsersChatService.getUserInfo($scope.commenti[i].idCommentatore);
             var cognome=UsersChatService.getUserInfo($scope.commenti[i].idCommentatore);
             $scope.commentiDaMostrare.push({commento:$scope.commenti[i].commento,info:info})
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
                SinglePost.commentPost($scope.dati.post.id,$scope.post.newComment, idCommentatore,$scope.commentatore.name,$scope.commentatore.surname);
                $scope.post.newComment="";
            };


            //funzione mi "piace"

            $scope.miPiace= function () {
                //per cambiare colore
                var b=document.getElementById("miPiace");
                console.log(b);
                if(b.style.backgroundColor="#bbbbbb")
                {console.log("sono qui");
                    b.style.backgroundColor="#9acae5";
                    b.innerHTML = "Non mi Piace Più";
                    console.log(b.style.backgroundColor);
            }
                else  if(b.style.backgroundColor="#9acae5"){
                   console.log("ora sono qui");
                   b.style.backgroundColor="#bbbbbb";
                   b.innerHTML = "Mi Piace";
               }
            }
        });
    }]);