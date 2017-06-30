'use strict';

angular.module('myApp.singlePostView', ['ngRoute'])

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
  });
}])

.controller('singlePostViewCtrl', ['$scope', '$rootScope', '$routeParams','$window', 'SinglePost','UsersChatService','$firebaseStorage','currentAuth','Post','InsertPostService',
    function($scope, $rootScope, $routeParams,$window, SinglePost,UsersChatService,$firebaseStorage,currentAuth,Post,InsertPostService) {

        //initialize variables
        $scope.dati = {};
        $scope.post={};
        $scope.commenti={};
        $scope.id={};
        $scope.commentiDaMostrare=[];

//per avere i dati del singolo post
       // console.log("sei qui",$routeParams.postID);
        $scope.dati.post = SinglePost.getSinglePost($routeParams.postID);
       // console.log( $scope.dati.post );
        //commenti ai post:
       $scope.commenti=Post.getCommentData();
      // console.log($scope.commenti);
        $scope.commenti.$loaded().then(function (){
        $scope.dati.post.$loaded().then(function () {
            $scope.dati.userPost = UsersChatService.getUserInfo($scope.dati.post.userPost);
            var idCommentatore = currentAuth.uid;
            $scope.idCommentatore=idCommentatore;
            $scope.commentatore=UsersChatService.getUserInfo(currentAuth.uid);
            console.log("id del commentatore:" ,idCommentatore);
            console.log("questo è info di chi ha messo il post dati.userPost:", $scope.dati.userPost);
            // id di chi ha messo il post
            //console.log($scope.dati.userPost.$id);
//dati dell'user che ha messo il post:
     //  $scope.dati.user = UsersChatService.getUserInfo($scope.dati.post.userPost);
     //  console.log($scope.dati.post.userPost)
     //  console.log("questo è dati:", $scope.dati.user);


       //commenti al post:
           for (var i = 0; i < $scope.commenti.length; i++) {
                 // console.log($scope.commenti[i]);
               if( $scope.commenti[i].post===$scope.dati.post.id){
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
                console.log($scope.post.newComment,$scope.dati.post.id, idCommentatore);
                InsertPostService.insertNewCommento($scope.post.newComment,$scope.dati.post.id,idCommentatore);
                $scope.post.newComment="";
                $window.location.reload();
            };


            //funzione mi piace
            //per avere tutti i like
            $scope.dati.likes=Post.getLike();
            console.log($scope.dati.likes);

            $scope.dati.like = false;
            $scope.dati.likes.$loaded().then(function(){
                var likes = $scope.dati.likes;
                for (var keySingleLike in likes) {
                    if (!angular.isFunction(keySingleLike)) {
                        if (!angular.isFunction(likes[keySingleLike]))
                        {
                            if (likes[keySingleLike]!=undefined && likes[keySingleLike].postId!=undefined) {
                                if ($routeParams.postID == likes[keySingleLike].postId) {
                                    if (idCommentatore== likes[keySingleLike].userId) {
                                        $scope.dati.notLike = false;
                                    }
                                }
                            }
                        }
                    }
                }
            });


            $scope.dati.notLike = true;

            $scope.dati.likes.$loaded().then(function(){
                var likes = $scope.dati.likes;
                for (var keySingleLike in likes) {
                    if (!angular.isFunction(keySingleLike)) {
                        if (!angular.isFunction(likes[keySingleLike])) {
                            if (likes[keySingleLike]!=undefined && likes[keySingleLike].postId!=undefined) {
                                if ($routeParams.postID== likes[keySingleLike].postId) {
                                    if (idCommentatore== likes[keySingleLike].userId) {
                                        $scope.dati.likes = likes[keySingleLike].id;
                                        console.log($scope.dati.likes);
                                        $scope.dati.like = true;

                                    }
                                }
                            }
                        }
                    }
                }
                return false;});

            $scope.miPiace= function () {
                    Post.insertNewLike($routeParams.postID,idCommentatore,'Bottone disabilitato').then(function (ref) {
                    var likeId = ref.key;
                    Post.updateLike(likeId);
                    $scope.dati.like = false;
                    $scope.dati.notLike = true;
                    $window.location.reload();

                });
            }

            $scope.nonMiPiace= function (likeId) {

               Post.deleteLike(likeId);
                $scope.dati.like = true;
                $scope.dati.notLike = false;
                $window.location.reload();

            }


        });
        });

    }]);