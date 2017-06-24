'use strict';

angular.module('myApp.users.EditProfileService', [])

    .factory('EditProfileService', function($firebaseArray,$firebaseObject) {
        var user = firebase.auth().currentUser;
        var EditProfileService = {
            editProfile: function (name,surname, password,nuovapassword,nuovapassword2,buddista,tutor,imgPath) {
               if(nuovapassword===nuovapassword2 && nuovapassword!="")
                var ref = firebase.database().ref().child("users").child(user);
                // create a synchronized array
                ref.update({
                    name:name,
                    surname:surname,
                    buddista: buddista,
                    tutor:tutor,
                    img_url: imgPath
                });
                user.updatePassword(nuovapassword).then(function() {
                    // Update successful.
                });

            }
        };
        return EditProfileService;
    });