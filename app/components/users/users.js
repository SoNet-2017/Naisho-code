'use strict';

//declare the module that will act as parent of all the services dedicated to retrieve/save information about the users
angular.module('myApp.users', [
    'myApp.users.usersService',
    'myApp.users.usersListService',
    'myApp.users.usersChatService',
    'myApp.users.usersGeocoordInsertService'
])

.value('version', '0.1');

