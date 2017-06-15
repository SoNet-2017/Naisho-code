'use strict';

//declare the module that will act as parent of all the services dedicated to retrieve/save information about the pizzas
angular.module('myApp.forum', [
    'myApp.post.forumService',
    'myApp.post.singleForumService',
    'myApp.post.insertForumService'
])

.value('version', '0.1');
