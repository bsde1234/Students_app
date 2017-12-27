angular.module("myApp", ['chart.js', 'ngRoute', 'myApp.page1', 'myApp.page2', 'myApp.page3', 'myApp.page4', 'myApp.page5', ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .otherwise({
                redirectTo: "/page1"
            })
}]);
