'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.post.insertPostService', [])

    .factory('InsertPostService', function($firebaseArray) {
        var InsertPostService = {
            insertNewPost: function (contenuto,userPost) {

                var ref = firebase.database().ref().child("posts");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    contenuto: contenuto,
                    userPost: userPost
                });
            },
            updatePost: function (postId) {

                var ref = firebase.database().ref().child("posts").child(postId);

                ref.update({
                    "id": postId
                });
            }
        };
        return InsertPostService;
    });
