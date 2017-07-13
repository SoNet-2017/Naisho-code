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

.controller('userProfileCtrl', ['$scope', '$rootScope', 'UsersChatService', 'Users', 'currentAuth', '$firebaseAuth', '$location','Forum','Evento','SingleEvento',
    function($scope, $rootScope, UsersChatService, Users, currentAuth, $firebaseAuth, $location, Forum,Evento,SingleEvento) {
    $scope.dati={};
        // eventi a cui sono invitato
        $scope.invitato=[];
        var id = currentAuth.uid;
    $scope.dati.user = UsersChatService.getUserInfo(currentAuth.uid);
    $scope.dati.forum=Forum.getData();
    $scope.dati.eventi=Evento.getData();

        $scope.dati.inviti = Evento.getInviti();
        console.log( $scope.dati.inviti );
        $scope.dati.inviti.$loaded().then(function (){
            for (var i=0;i< $scope.dati.inviti.length; i++){
                if($scope.dati.inviti[i].invitatoId==id){
                    var evento=SingleEvento.getSingleEvento($scope.dati.inviti[i].eventoId);
                    $scope.invitato.push(evento);
                }
            }
        });


}]);