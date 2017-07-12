'use strict';

angular.module('myApp.users.EditProfileService', [])

    .factory('EditProfileService', function($firebaseArray,$firebaseObject) {
        var EditProfileService = {
            editProfile: function ( userId,name,surname,nuovapassword,buddista,tutor,imgPath) {
                var ref = firebase.database().ref().child("users").child(userId);
                var user = firebase.auth().currentUser;
                // create a synchronized array
                ref.update({
                    name:name,
                    surname:surname,
                    buddista: buddista,
                    tutor:tutor,
                    img_url: imgPath
                });

                 user.updatePassword(nuovapassword);
            },
            cambiaImg: function (userId,imgPath) {
                var ref = firebase.database().ref().child("users").child(userId);
                // create a synchronized array
                ref.update({
                    img_url: imgPath
                });
                return true;
            }
        };
        return EditProfileService;
    });