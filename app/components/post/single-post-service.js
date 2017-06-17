'use strict';

//The service implemented in this module will get information about a single pizza: the one specified by the Id passed as argument of the function
angular.module('myApp.post.singlePostService', [])

    .factory('SinglePost', function($firebaseObject) {
        var singlePostService = {
            getSinglePost: function (postId) {
                var ref = firebase.database().ref().child("posts").child(postId);
                // download the data into a local object
                return $firebaseObject(ref);
                console.log(ref);
            },
            commentPost: function (postId,newComment) {
                var ref = firebase.database().ref().child("posts").child(postId).child("commenti");
                var commentId = ref.key;
                // download the data into a local object
                return $firebaseArray(ref).add({
                    commentId: commentId,
                    commento:newComment
                });

            }

        };
        return singlePostService;
    });
