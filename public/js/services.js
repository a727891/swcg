'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('swcg.services', [])
    .value('version', '0.1')
    .factory('swcgAPI', function ($http) {

        function readSlideList(){
            return $http.get("/api/slides").then(
                function(res){
                    return res.data;
                }
            )
        }

        return {
            getSlides:readSlideList
        }

    });
