'use strict';

angular.module('myApp.OtherUserProfile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/OtherUser/:otherUserId', {
            templateUrl: 'OtherUserProfile/OtherUserProfile.html',
            controller: 'OtherUserProfileCtrl',
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

   .controller('OtherUserProfileCtrl',['$scope','$rootScope','$routeParams','$window','currentAuth','UsersFriends','UsersTutorsService','Post',
   function ($scope, $rootScope, $routeParams,$window, currentAuth, UsersFriends,UsersTutorsService,Post) {

       $scope.dati = {};
       $scope.post=[];
       $scope.postDaMostrare=[];

       //dati current user
       $scope.dati.userId = UsersFriends.getUserInfo(currentAuth.uid);

       //id OtherUser
       $scope.dati.otherUserId = $routeParams.otherUserId;
       console.log($scope.dati.otherUserId);

       //info OtherUser
       $scope.dati.recipient = UsersFriends.getUserInfo($scope.dati.otherUserId);
       console.log($scope.dati.recipient);

       //tutti i post
       $scope.post=Post.getData();

       $scope.post.$loaded().then(function () {
           for  (var i=0;i< $scope.post.length; i++){
               if ($scope.post[i].userPost===$scope.dati.otherUserId)
                   $scope.postDaMostrare.push($scope.post[i])
           }
       });

       // dati su tutte amicizie
       $scope.dati.friends = UsersFriends.getFriends();

       // dati su tutti i tutor
       $scope.dati.tutors = UsersTutorsService.getTutors();

       // set no-friends and no tutors
       $scope.dati.notYetFriends = true;
       $scope.dati.notYetTutor = true;
       $scope.dati.notYetTutored = true;

       //per settare i bottoni
       //amicizia
       $scope.dati.friends.$loaded().then(function(){
           var friends = $scope.dati.friends;
           for (var keySingleFriend in friends) {
               if (!angular.isFunction(keySingleFriend)) {
                   if (!angular.isFunction(friends[keySingleFriend]))
                   {
                       if (friends[keySingleFriend]!=undefined && friends[keySingleFriend].friend1!=undefined) {
                           if ($scope.dati.userId.$id == friends[keySingleFriend].friend1) {
                               if ($scope.dati.recipient.$id == friends[keySingleFriend].friend2) {
                                   $scope.dati.notYetFriends = false;
                               }
                           }
                       }
                   }
               }
           }
       });
//bottone richiesta fare tutor

       $scope.dati.tutors.$loaded().then(function(){
           var tutors = $scope.dati.tutors;
           for (var keySingleTutor in tutors) {
               if (!angular.isFunction(keySingleTutor)) {
                   if (!angular.isFunction(tutors[keySingleTutor]))
                   {
                       if (tutors[keySingleTutor]!=undefined && tutors[keySingleTutor].tutor!=undefined) {
                           if ($scope.dati.userId.$id == tutors[keySingleTutor].tutor) {
                               if ($scope.dati.recipient.$id == tutors[keySingleTutor].tutored) {
                                   $scope.dati.notYetTutor = false;
                               }
                           }
                       }
                   }
               }
           }
       });

       //bottone richiesta avere tutor
       $scope.dati.tutors.$loaded().then(function(){
           var tutors = $scope.dati.tutors;
           for (var keySingleTutor in tutors) {
               if (!angular.isFunction(keySingleTutor)) {
                   if (!angular.isFunction(tutors[keySingleTutor]))
                   {
                       if (tutors[keySingleTutor]!=undefined && tutors[keySingleTutor].tutored!=undefined) {
                           if ($scope.dati.userId.$id == tutors[keySingleTutor].tutored) {
                               if ($scope.dati.recipient.$id == tutors[keySingleTutor].tutor) {
                                   $scope.dati.notYetTutored = false;
                               }
                           }
                       }
                   }
               }
           }
       });

       $scope.dati.yetFriends = false;
       $scope.dati.yetTutor = false;
       $scope.dati.yetTutored = false;
//bottone remove amicizia
       $scope.dati.friends.$loaded().then(function(){
           var friends = $scope.dati.friends;
           for (var keySingleFriend in friends) {
               if (!angular.isFunction(keySingleFriend)) {
                   if (!angular.isFunction(friends[keySingleFriend])) {
                       if (friends[keySingleFriend]!=undefined && friends[keySingleFriend].friend1!=undefined) {
                           if ($scope.dati.userId.$id == friends[keySingleFriend].friend1) {
                               if ($scope.dati.recipient.$id == friends[keySingleFriend].friend2) {
                                   $scope.dati.Friends = friends[keySingleFriend].id;
                                   console.log($scope.dati.Friends);
                                   $scope.dati.yetFriends = true;

                               }
                           }
                       }
                   }
               }
           }
           return false;});
       //bottone remove essere tutor

       $scope.dati.tutors.$loaded().then(function(){
           var tutors = $scope.dati.tutors;
           for (var keySingleTutor in tutors) {
               if (!angular.isFunction(keySingleTutor)) {
                   if (!angular.isFunction(tutors[keySingleTutor])) {
                       if (tutors[keySingleTutor]!=undefined && tutors[keySingleTutor].tutor!=undefined) {
                           if ($scope.dati.userId.$id == tutors[keySingleTutor].tutor) {
                               if ($scope.dati.recipient.$id == tutors[keySingleTutor].tutored) {
                                   $scope.dati.Tutors = tutors[keySingleTutor].id;
                                   console.log($scope.dati.Tutors);
                                   $scope.dati.yetTutor = true;

                               }
                           }
                       }
                   }
               }
           }
           return false;});

       //bottone remove avere tutor

       $scope.dati.tutors.$loaded().then(function(){
           var tutors = $scope.dati.tutors;
           //console.log(tutors);
           for (var keySingleTutor in tutors) {
               if (!angular.isFunction(keySingleTutor)) {
                   if (!angular.isFunction(tutors[keySingleTutor])) {
                       if (tutors[keySingleTutor]!=undefined && tutors[keySingleTutor].tutored!=undefined) {
                           if ($scope.dati.userId.$id == tutors[keySingleTutor].tutored) {
                               if ($scope.dati.recipient.$id == tutors[keySingleTutor].tutor) {
                                   console.log(tutors[keySingleTutor].id);
                                   $scope.dati.Tutors = tutors[keySingleTutor].id;
                                   console.log($scope.dati.Tutors);
                                   $scope.dati.yetTutored = true;

                               }
                           }
                       }
                   }
               }
           }
           return false;});


       // creazione amicizia
       $scope.CreateFriendship = function() {
           UsersFriends.insertNewFriendship($scope.dati.userId.$id,$routeParams.otherUserId,'Bottone disabilitato').then(function (ref) {
               var friendshipId = ref.key;
               UsersFriends.updateUsersFriends(friendshipId);
               $scope.dati.notFriends = false;
               $scope.dati.yetFriends =true;
               $window.location.reload();

           });
       };
       //rimozione amicizia
       $scope.removeFriendship = function (friendshipId) {
           UsersFriends.deleteFriendship(friendshipId);
           $scope.dati.notYetFriends = true;
           $scope.dati.yetFriends =false;
           $window.location.reload();
       };
       // richiesta per fare da tutor
       $scope.becameTutor = function() {
           UsersTutorsService.insertNewTutor($scope.dati.userId.$id,$routeParams.otherUserId,'Bottone disabilitato').then(function (ref) {
               var tutorId = ref.key;
               UsersTutorsService.updateUsersTutor(tutorId);
               $scope.dati.notYetTutor = false;
               $scope.dati.yetTutor =true;
               $window.location.reload();

           });
       };
       //rimozione tutor
       $scope.removeTutor = function (tutorId) {
           UsersTutorsService.deleteTutor(tutorId);
           $scope.dati.notYetTutor = true;
           $scope.dati.yetTutor =false;
           $window.location.reload();
       };

       // richiesta per avere un tutor
       $scope.becameTutored = function() {
           UsersTutorsService.insertNewTutor($routeParams.otherUserId,$scope.dati.userId.$id,'Bottone disabilitato').then(function (ref) {
               var tutorId = ref.key;
               UsersTutorsService.updateUsersTutor(tutorId);
               $scope.dati.notYetTutored = false;
               $scope.dati.yetTutored =true;
               $window.location.reload();

           });
       };
       //rimozione tutor
       $scope.removeTutored = function (tutorId) {
           UsersTutorsService.deleteTutor(tutorId);
           $scope.dati.notYetTutored = true;
           $scope.dati.yetTutored =false;
           $window.location.reload();
       };

   }]);