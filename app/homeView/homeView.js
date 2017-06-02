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
  });
}])
    .controller('homeCtrl', ['$scope', '$location', 'Auth', '$firebaseObject','Users', 'currentAuth', '$firebaseAuth', function ($scope,$location, Auth, $firebaseObject, Users, currentAuth, $firebaseAuth) {
        $scope.dati={};
        $scope.auth=Auth;

        $scope.showSearchItem=function () {
            var x = document.getElementById("typeSearchContentHome");
            if (x.className.indexOf("w3-show") == -1) {
                x.className += " w3-show";
            }
            else {
                x.className = x.className.replace(" w3-show", "");
            }
        };
        // funzione frase del giorno
        var dato = new Date();
        var a=dato.getDate();
        console.log(a);
        var b=dato.getMonth();
        console.log(b);
        var c= "0"+a+"0"+b;
        console.log(c);
        var ref = firebase.database().ref().child("frasi/"+c+"");
        $scope.soka = $firebaseObject(ref);
        $scope.soka.$loaded().then(function () {
           
            document.getElementById("fraseDelGiorno").innerHTML = $scope.soka.frase;
            console.log($scope.soka.frase);
        });


        //logout
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
       // menu a comparsa
        $scope.show = function () {
            document.getElementById("menu").style.left = "0px";
        };
        $scope.close= function()  {
            document.getElementById("menu").style.left = "-250px";
        };
    }]);