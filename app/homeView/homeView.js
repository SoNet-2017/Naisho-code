'use strict';

angular.module('myApp.homeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'homeCtrl',
      resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $routeChangeError (see above)
              return Auth.$requireSignIn();
          }]

      }
  })
}])
    .controller('homeCtrl', ['$scope', 'Frase','$location', 'Auth', '$firebaseObject','Users', 'currentAuth', '$firebaseAuth', function ($scope,Frase,$location, Auth, $firebaseObject, Users, currentAuth, $firebaseAuth) {
        $scope.dati={};
        $scope.auth=Auth;

        $scope.showmenu=function () {
            var x = document.getElementById("menu").style.display="flex";
        };


        $scope.showSearchItem=function () {
            var x = document.getElementById("typeSearchContentHome");
            if (x.className.indexOf("w3-show") == -1)
                x.className += " w3-show";
            else
                x.className = x.className.replace(" w3-show", "");
        };

        var ref = firebase.database().ref("frasi/frase");
        ref.once("value")
            .then(function(snapshot) {

                var data = snapshot.val();
                var id=data.id;
                var dati = new Date();
                var a=dati.getDate();
                var b=dati.getMonth();
                var c= 'a'+'b';
                for (var i = 0; i < $scope.dati.frase.length; i++) {
                    if(id=c){$scope.Frase = data.frase;}
                }
            document.getElementById(fraseDelGiorno).innerHTML=$scope.Frase;
            });

        $scope.logout = function () {
            Users.registerLogout(currentAuth.uid);
            $firebaseAuth().$signOut();
            $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                    console.log("User is yet signed in as:", firebaseUser.uid);
                } else {
                    $location.path("/loginView");
                }
            });


        };
        $scope.logout = function () {
            $location.path("/userProfileView");
        }


          /* //noinspection JSAnnotator
        $scope.shownav-bar=function () {
            var x = document.getElementById("topBarHome");
            if (x.className.indexOf("w3-show") == -1)
                x.className += " w3-show";
            else
                x.className = x.className.replace(" w3-show", "");
        };

*/
    }]);