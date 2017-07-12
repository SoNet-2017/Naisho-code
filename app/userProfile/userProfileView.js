'use strict';

angular.module('myApp.userProfileView', ['ngRoute','myApp.forum','myApp.users'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userProfile', {
    templateUrl: 'userProfile/userProfileView.html',
    controller: 'userProfileCtrl',
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

.controller('userProfileCtrl', ['$scope', '$rootScope', 'UsersChatService', 'Users', 'currentAuth', '$firebaseAuth', '$location','Forum','Evento',
    function($scope, $rootScope, UsersChatService, Users, currentAuth, $firebaseAuth, $location, Forum,Evento) {
    $scope.dati={};

   // $rootScope.dati.currentView = "userProfile";
    $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);
    $scope.dati.forum=Forum.getData();
    $scope.dati.eventi=Evento.getData();
    $scope.dati.eventiDaMostrare=[];

    var dato = new Date();
    var a =dato.getDate();
    if (String(a).length == 1) {
            a = "0"+a;
        }
        var b=dato.getMonth();
        b=b+1;
        if (String(b).length == 1) {
            b = "0"+b;
        }
    $scope.dati.eventi.$loaded().then(function () {
            for (var i=0;i< $scope.dati.eventi.length; i++){
                if (b<$scope.dati.eventi[i].Mese)
                    $scope.dati.eventiDaMostrare.push($scope.dati.eventi[i])
                else if(b===$scope.dati.eventi[i].Mese){
                    if(a<=$scope.dati.eventi[i].Giorno)
                        $scope.dati.eventiDaMostrare.push($scope.dati.eventi[i])
                }
            }
    });



}]);