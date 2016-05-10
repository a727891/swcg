'use strict';

// Declare app level module which depends on filters, and services

angular.module('swcg', [
        'ngAnimate',
        'swcg.controllers',
        'swcg.filters',
        'swcg.services',
        'swcg.directives',
        'ui.bootstrap'
    ])
    .config(function ($locationProvider) {
        //$routeProvider.when('/view1', {
        //    templateUrl: 'partials/partial1',
        //    controller: 'MyCtrl1',
        //    controllerAS: 'v1Ctrl'
        //}).when('/view2', {
        //    templateUrl: 'partials/partial2',
        //    controller: 'MyCtrl2'
        //}).otherwise({
        //    redirectTo: '/view1'
        //});

        $locationProvider.html5Mode(true);
    });
