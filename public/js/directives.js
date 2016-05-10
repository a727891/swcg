'use strict';

/* Directives */

angular.module('swcg.directives', [])
    .directive('appVersion', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    })
    .directive('disableAnimation', function($animate){
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs){
                $attrs.$observe('disableAnimation', function(value){
                    $animate.enabled(!value, $element);
                });
            }
        }
    });
