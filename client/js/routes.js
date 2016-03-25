angular.module('app')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/users', {
                templateUrl: 'views/user/users.html',
                controller: 'UserController as usr'
            })
            .when('/create_user', {
                templateUrl: 'views/user/createUser.html',
                controller: 'UserController as usr'
            })
            .otherwise({
                templateUrl: 'views/home/home.html',
                controller: 'HomeController as home'
            })

        $locationProvider.html5Mode(true);
    }])