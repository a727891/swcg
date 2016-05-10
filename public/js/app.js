'use strict';
angular.module('swcg', [
        'ngAnimate',
        'ui.bootstrap'
    ])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })
    .controller('AppCtrl', function ($timeout, $http) {
        var self = this;
        this.mode = {
            slides: "slides",
            signup: "signup",
            admin: "admin"
        };
        this.transitionTo = transitionView;
        this.submitSignUp = submitSignUp;
        this.viewMode = this.mode.slides;

        //Slides Mode
        this.slides = [];


        //signup Mode
        this.messages = [];
        this.entry = {
            name:'',
            email:'',
            comment:'',
            groups:{
                imp:false,
                reb:false,
                merc:false
            }
        };
        this.entryTimeout = null;

        //admin Mode


        getSlides();

        //--------------------------------
        function resetEntry(){
            self.entry = {
                name:'',
                email:'',
                comment:'',
                groups:{
                    imp:false,
                    reb:false,
                    merc:false
                }
            };
        }
        function getSlides() {
            return $http.get("/api/slides").then(
                function(res){
                    self.slides = res.data.slides;
                }
            )
        }

        function transitionView(target){
            self.viewMode=target;
            switch(self.viewMode){
                case self.mode.signup:
                    if(self.entryTimeout){
                        $timeout.cancel(self.entryTimeout);
                    }
                    break;
            }
            switch(target){
                case self.mode.signup:
                    self.entryTimeout = $timeout(function(){
                        self.transitionTo(self.mode.slides);
                    }, 150000);
                    self.messages = [];
                    resetEntry();
                    break;
            }
        }
        function submitSignUp(signupFrm,entry){
            if(signupFrm.$valid){
                $timeout.cancel(self.entryTimeout);
                $http.post('./api/signup',entry).then(
                    function(res){
                        if(res.data.error!==null){
                            self.messages.push(
                                {
                                    type:"danger",
                                    text:"Oh no! I'm sorry there was an error. Please tell someone at the table!"
                                });
                        }else{
                            self.messages.push({type:"success",text:"Thanks "+entry.name+"! We will email you in a few days"});
                            resetEntry();
                            $timeout(function(){
                                self.transitionTo(self.mode.slides);
                                self.messages = [];
                            },5000);
                        }

                    }
                );

            }else{
                self.messages.push({type:"danger",text:"form is not valid"})
            }
        }

    });
