'use strict';

angular.module('myApp.editProfileView', ['ngRoute','myApp.users'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/editProfile', {
    templateUrl: 'editProfileView/editProfileView.html',
    controller: 'editProfileViewCtrl',
      resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $routeChangeError (see above)
              return Auth.$requireSignIn();
          }]

      }
  });
}])

.controller('editProfileViewCtrl', ['$scope', '$rootScope', 'Users', '$firebaseStorage','EditProfileService',
    function($scope, $rootScope, Users, $firebaseStorage,  EditProfileService) {
    $scope.user={};
    $scope.dati = {};
    $scope.dati.feedback = "";
    $scope.dati.userId = firebase.auth().currentUser.uid;
    var ctrl = this;
    $scope.fileToUpload = null;
    $scope.imgPath= "";

    console.log(firebase.auth().currentUser.uid);

        $scope.salvamodifiche = function() {
            //check if the user inserted all the required information
            if ($scope.dati.nuovapassword!= undefined && $scope.dati.nuovapassword===$scope.dati.nuovapassword2 && $scope.dati.name!= undefined && $scope.dati.name!="" && $scope.dati.surname!=undefined && $scope.dati.surname!="") {
                $scope.dati.error = "";
                //try to upload the image: if no image was specified, we create a new pizza without an image
                if ($scope.fileToUpload != null) {
                    //get the name of the file
                    var fileName = $scope.fileToUpload.name;
                    //specify the path in which the file should be saved on firebase
                    var storageRef = firebase.storage().ref("usersImg/" + fileName);
                    $scope.storage = $firebaseStorage(storageRef);
                    var uploadTask = $scope.storage.$put($scope.fileToUpload);
                    uploadTask.$complete(function (snapshot) {
                        $scope.imgPath = snapshot.downloadURL;
                        $scope.finalEdit();
                    });
                    uploadTask.$error(function (error) {
                        $scope.dati.error = error + " Non hai inserito alcuna immagine";
                        //edit profile in any case (without the image)
                        $scope.finalEdit();
                    });
                }
                else {
                    //do not add the image
                    $scope.finalEdit();

                }
            }
            else
            {
                //write an error message to the user
                $scope.dati.error = "Hai dimenticato di inserire delle informazioni richieste!";
            }
        };


    ctrl.onChange = function onChange(fileList) {
        $scope.fileToUpload = fileList[0];
    };

    $scope.finalEdit = function()
    {
        EditProfileService.editProfile( $scope.dati.userId,$scope.dati.name,$scope.dati.surname, $scope.dati.nuovapassword,$scope.dati.buddista,$scope.dati.tutor, $scope.imgPath).then(function() {

            Users.updateUser($scope.dati.userId);

            $scope.dati.feedback = "Il profilo è stato modificato corretamente";
            $scope.dati.name = "";
            $scope.dati.surname = "";
            $scope.dati.nuovapassword="";
            $scope.dati.nuovapassword2="";
            $scope.dati.buddista="";
            $scope.dati.tutor="";
            $scope.imgPath="";
        });
    }
}]);
