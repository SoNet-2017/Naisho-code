'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.post.insertPostService', [])

    .factory('InsertPostService', function($firebaseArray) {
        var InsertPostService = {
            insertNewPost: function (contenuto,userPost,imgPath) {

                var ref = firebase.database().ref().child("posts");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    contenuto: contenuto,
                    userPost: userPost,
                    img_url: imgPath,
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

       var InsertCommentoService = {
            insertNewCommento: function (contenuto,idPost,idCommentatore) {

                var ref = firebase.database().ref().child("commenti");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    contenuto: contenuto,
                    idPost: idPost,
                    idCommentatore: idCommentatore,
                });
            },
            updateCommento: function (commentoId) {

                var ref = firebase.database().ref().child("commenti").child(commentoId);

                ref.update({
                    "id": commentoId
                });
            }
        };
        return InsertCommentoService;
    });
