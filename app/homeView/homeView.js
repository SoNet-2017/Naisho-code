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
        var a =dato.getDate();
        if (String(a).length == 1) {
            a = "0"+a;
        }
        console.log(a);
        var b=dato.getMonth();
        if (String(b).length == 1) {
            b = "0"+b;
        }
        console.log(b);
        var c= a+b;
        console.log(c);
        var ref = firebase.database().ref().child("frasi/"+c+"");
        $scope.soka = $firebaseObject(ref);
        $scope.soka.$loaded().then(function () {

            document.getElementById("fraseDelGiorno").innerHTML = $scope.soka.frase;
            console.log($scope.soka.frase);
        });

    }]);