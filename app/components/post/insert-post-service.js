'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.post.insertPostService', [])

    .factory('InsertPostService', function($firebaseArray) {
        var InsertPostService = {
            insertNewPost: function (id, contenuto,userPost) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("posts");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    id: id,
                    contenuto: contenuto,
                    userPost: userPost
                });
            },
            updatePost: function (postId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("posts").child(postID);
                // create a synchronized array
                ref.update({
                    "id": postID
                });
            }
        };
        return InsertEventoService;
    });
