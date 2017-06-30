'use strict';

//The service implemented in this module will get information about all the available eventi
angular.module('myApp.post.postService', [])

    .factory('Post', function($firebaseArray) {
        var postService = {
            getData: function () {
                var ref = firebase.database().ref().child("posts");
                // download the data into a local object
                return $firebaseArray(ref);
            },
            getCommentData: function () {
                var ref = firebase.database().ref().child("commenti");
                // download the data into a local object
                return $firebaseArray(ref);
            },
            getLike: function () {
                var ref = firebase.database().ref().child("likes");
                return $firebaseArray(ref);
            },

            insertNewLike: function (postId, userId,  button) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("likes");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    postId: postId,
                    userId: userId,
                    button: button
                });
            },
            updateLike: function (likeId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("likes").child(likeId);
                // create a synchronized array
                ref.update({
                    id: likeId
                });
            },
            deleteLike: function (likeId) {
                var refDel = firebase.database().ref().child("likes").child(likeId);
                refDel.remove();
            }


        };
        return postService;
    });
