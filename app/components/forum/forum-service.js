'use strict';

//The service implemented in this module will get information about all the available eventi
angular.module('myApp.forum.forumService', [])

    .factory('Forum', function($firebaseArray) {
        var forumService = {
            getData: function () {
                var ref = firebase.database().ref().child("forum");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return forumService;
    });
