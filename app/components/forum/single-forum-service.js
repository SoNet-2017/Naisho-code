'use strict';

//The service implemented in this module will get information about a single pizza: the one specified by the Id passed as argument of the function
angular.module('myApp.forum.singleForumService', [])

    .factory('SingleForum', function($firebaseObject) {
        var singleForumService = {
            getSingleForum: function (forumId) {
                var ref = firebase.database().ref().child("forum").child(forumId);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
        return singleForumService;
    });
