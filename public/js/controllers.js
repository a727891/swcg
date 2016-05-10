'use strict';

/* Controllers */

angular.module('swcg.controllers', [])
    .controller('AppCtrl', function (swcgAPI) {
        var self = this;
        this.mode = {
            slides: "slides",
            signup: "signup",
            admin: "admin"
        };
        this.viewMode = this.mode.slides;

        //Slides Mode
        this.slides = [];


        //signup Mode


        //admin Mode


        getSlides();

        //--------------------------------
        function getSlides() {
            swcgAPI.getSlides().then(
                function (data) {
                    self.slides = data.slides;
                }
            )
        }

    });
