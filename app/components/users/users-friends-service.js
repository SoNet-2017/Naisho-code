'use strict'

angular.module('myApp.users.usersFriendsService', [])

    .factory('UsersFriends', function usersFriendsService($firebaseArray, $firebaseObject) {
        var NewUsersFriendsService = {
            getFriends: function() {
                var ref = firebase.database().ref().child("friends");
                return $firebaseArray(ref);
            },

            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);
            },
            insertNewFriendship: function (friend1, friend2,  button) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("friends");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    friend1: friend1,
                    friend2: friend2,
                    button: button
                });
            },
            updateUsersFriends: function (friendshipId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("friends").child(friendshipId);
                // create a synchronized array
                ref.update({
                    id: friendshipId
                });
            },
            deleteFriendship: function (friendshipId) {
                var refDel = firebase.database().ref().child("friends").child(friendshipId);
                refDel.remove();
            }
        };
        return NewUsersFriendsService;
    });
