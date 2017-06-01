'use strict';

angular.module('myApp.homeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html',
    controller: 'View1Ctrl',
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

    .controller('View1Ctrl','$scope', 'Frase', function($scope, Frase) {
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
                    if(data=c){$scope.Frase = data.frase;}
                }

            });
    });


       /* //noinspection JSAnnotator
        $scope.shownav-bar=function () {
            var x = document.getElementById("topBarHome");
            if (x.className.indexOf("w3-show") == -1)
                x.className += " w3-show";
            else
                x.className = x.className.replace(" w3-show", "");
        };

*/
