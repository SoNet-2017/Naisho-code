'use strict';

//declare the module that will act as parent of all the services dedicated to retrieve/save information about the pizzas
angular.module('myApp.forum', [
    'myApp.forum.forumService',
    'myApp.forum.singleForumService',
    'myApp.forum.insertForumService'
])

.value('version', '0.1');
