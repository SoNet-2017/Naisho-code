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
            }
        };
        return postService;
    });
