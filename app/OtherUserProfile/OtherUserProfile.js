'use strict';

angular.module('myApp.OtherUserProfile', ['ngRoute','myApp.users','myApp.post'])

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

   .controller('OtherUserProfileCtrl',['$scope','$rootScope','$routeParams','currentAuth','UsersFriendsService','UsersTutorService', 'UserList',
   function ($scope, $rootScope, $routeParams, currentAuth, UsersFriendsService,UsersTutorService,  UserList) {

       $scope.dati = {};

       $scope.dati.userId = UsersFriendsService.getUserInfo(currentAuth.uid);
       $scope.dati.otherUserId = $routeParams.otherUserId;
       console.log($scope.dati.otherUserId);

       $scope.dati.recipient = UsersFriendsService.getUserInfo($scope.dati.otherUserId);
console.log($scope.dati.recipient);
       // dati amicizie
       $scope.dati.friends = UsersFriendsService.getFriends();
       // dati tutor
       $scope.dati.tutors = UsersTutorService.getTutors();
// creazione amicizia
       $scope.CreateFriendship = function() {
           UsersFriendsService.insertNewUsersFriendship($scope.dati.userId,$routeParams.otherUserId,'Bottone disabilitato').then(function (ref) {
               var firendshipId = ref.key;
               UsersFriendsService.updateUsersFollow(friendshipId);
               $('#friendsButton').attr('disabled',true);
           });
       };
        $scope.removeFriendship = function (friendshipId) {
            UsersFriendsService.deleteFriend(friendshipId);
            $('#friendsButton').prop("disabled",false);
        };


       $scope.CreateTutor = function() {
           UsersTutorService.insertNewUsersTutor($scope.dati.userId,$routeParams.otherUserId,'Bottone disabilitato').then(function (ref) {
               var followId = ref.key;
               UsersTutorService.updateUsersTutor(tutorId);
               $('#tutorButton').attr('disabled',true);
           });
       };

       $scope.CreateTutored = function() {
           UsersTutorService.insertNewUsersTutor($routeParams.otherUserId,$scope.dati.userId,'Bottone disabilitato').then(function (ref) {
               var followId = ref.key;
               UsersTutorService.updateUsersTutor(tutorId);
               $('#tutoredButton').attr('disabled',true);
           });
       };
       $scope.removeTutor = function (tutorId) {
           UsersTutorService.deleteTutor(tutorId);
           $('#tutorButton').prop("disabled",false);
       };

       $scope.removeTutored = function (tutorId) {
           UsersTutorService.deleteTutor(tutorId);
           $('#tutoredButton').prop("disabled",false);
       };
   }]);