'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.forum.insertForumService', [])

    .factory('InsertForumService', function($firebaseArray) {
        var InsertForumService = {
            insertNewForum: function (titolo,argomento) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("forum");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    titolo: titolo,
                    argomento: argomento
                });
            },
            updateForum: function (forumId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("forum").child(forumId);
                // create a synchronized array
                ref.update({
                    "id": forumId
                });
            },

            insertNewCommento: function (contenuto,idForum,idCommentatore) {

            var ref = firebase.database().ref().child("commentiForum");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                commento: contenuto,
                forum: idForum,
                idCommentatore: idCommentatore,
            });
        },
        updateCommento: function (commentoId) {

            var ref = firebase.database().ref().child("commentiForum").child(commentoId);

            ref.update({
                "id": commentoId
            });
        }

    };
        return InsertForumService;
    });
