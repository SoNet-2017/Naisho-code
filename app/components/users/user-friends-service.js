'use strict'

angular.module('myApp.users.usersFriendsService', [])

    .factory('UsersFriendsService', function usersFriendsService($firebaseArray, $firebaseObject) {
        var UsersFriendsService = {
            getFriends: function() {
                var ref = firebase.database().ref().child("friends");
                return $firebaseArray(ref);
            },

            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);
            },
            //per una nuova richiesta di amicizia
            insertNewUsersFriendship: function (src, dest,  button) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("friends");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    src: src,
                    dest: dest,
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
            deleteFriend : function (friendshipId) {
                var refDel = firebase.database().ref().child("follows").child(friendshipId);
                refDel.remove();
            }
        };
        return NewUsersFriendsService;
    });

