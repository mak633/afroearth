'use strict';

/* Controllers */
var afroEarthApp = angular.module('afroEarthApp', ['ngRoute', 'ngResource', 'ngCookies']);

afroEarthApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
      .when('/',{
        templateUrl:'template/home.html',
        controller:'afroEarthMainCtrl'
      })
      .when('/about',{
        templateUrl:'template/about.html',
        controller:'AboutCtrl'
      })
      .when('/contact',{
        templateUrl:'template/contact.html',
        controller:'ContactCtrl'
      })
      .when('/sites/:niche', {
        templateUrl:'template/single.html',
        controller:'SingleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
/* Factory */
afroEarthApp.factory('Single', ['$resource', function ($resource) {
    return $resource('sites/:niche.:format',{
        niche: 'singles',
        format: 'json'
    })
}])

/* Filter */
afroEarthApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
});

afroEarthApp.controller('afroEarthMainCtrl',['$scope','$http','$location','$cookies', '$rootScope', '$window', function($scope, $http, $location, $cookies, $rootScope, $window) {
    $http.get("js/afro.json").then(function(response) {
        $scope.myDataFirst = response.data;
        $scope.singleNiche = $scope.myDataFirst.US;
        $rootScope.header = $scope.singleNiche;
    });
    $scope.setCountry = function (choise) {
        switch (choise){
            case "US" : $scope.singleNiche = $scope.myDataFirst.US;
                break;
            case "UK" : $scope.singleNiche = $scope.myDataFirst.UK;
                break;
            case "SA" : $scope.singleNiche = $scope.myDataFirst.SA;
                break;
            case "CAN" : $scope.singleNiche = $scope.myDataFirst.CAN;
                break;
            case "AU" : $scope.singleNiche = $scope.myDataFirst.AU;
                break;
        }
        $cookies.put("myCountry", choise);
        $rootScope.header = $scope.singleNiche;
    };
    $rootScope.bodylayout = "home-page";
}]);

afroEarthApp.controller('SingleCtrl',['$scope','$http', '$location', '$routeParams', 'Single', '$cookies', '$rootScope', function($scope, $http, $location, $routeParams, Single, $cookies, $rootScope) {
  $scope.niche = $routeParams.niche;
    $rootScope.bodylayout = "single-page";
  var url = 'sites/'+$routeParams.niche+'.json';
    Single.get({niche: $routeParams.niche}, function (data) {
        $scope.singleFirst = data;
        $scope.singleNiche = $scope.singleFirst.US;
        var getCountry = String($cookies.get("myCountry"));
        $scope.setCountry = function (choice) {
            switch (choice) {
                case "US" :
                    $scope.singleNiche = $scope.singleFirst.US;
                    break;
                case "UK" :
                    $scope.singleNiche = $scope.singleFirst.UK;
                    break;
                case "SA" :
                    $scope.singleNiche = $scope.singleFirst.SA;
                    break;
                case "CAN" :
                    $scope.singleNiche = $scope.singleFirst.CAN;
                    break;
                case "AU" :
                    $scope.singleNiche = $scope.singleFirst.AU;
                    break;
            }
            $rootScope.header = $scope.singleNiche;
        }
        $scope.setCountry(getCountry);
        $rootScope.myid = $scope.singleNiche;
    })
    $rootScope.header = $scope.singleNiche;

}]);

afroEarthApp.run(function ($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        $(window).load(function () {
            "use strict";
            // Parallax Effect
            (function () {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                } else {
                    $(window).stellar({
                        horizontalScrolling: false,
                        responsive: true,
                    });
                }
            }());

        });
        $(document).ready(function () {
            $(function () {
                $('#form1').multiStepForm()
            });
            // PreLoader
            if ($(window).width() < 750) {
                $("li.other-countries a").on("click", function (e) {
                    e.preventDefault();
                    if (!($("li.other-countries").children("ul").hasClass("in"))) {
                        $("li.other-countries").children("ul").css({left: 0});
                        $("li.other-countries").children("ul").addClass("in");
                    } else {
                        $("li.other-countries").children("ul.in").css({left: -9999});
                        $("li.other-countries").children("ul").removeClass("in");
                    }
                });
            }
            $(window).on('resize', function () {
                if ($(window).width() < 750) {
                    $("li.other-countries a").on("click", function (e) {
                        e.preventDefault();
                        if (!($("li.other-countries").children("ul").hasClass("in"))) {
                            $("li.other-countries").children("ul").css({left: 0});
                            $("li.other-countries").children("ul").addClass("in");
                        } else {
                            $("li.other-countries").children("ul.in").css({left: -9999});
                            $("li.other-countries").children("ul").removeClass("in");
                        }
                    });
                }
            });
            // jQuery Smooth Scroll
            $('.page-scroll').on('click', function (event) {
                var $anchor = $(this),
                    headerH = '55';
                $('html , body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - headerH + "px",
                }, 1200, 'easeInOutExpo');
                event.preventDefault();
            });
            // jQuery ScrollSpy
            $('body').scrollspy({
                target: '.navbar-collapse',
                offset: 70
            });
            // Partners Carousel
            $("#partners-carousel").owlCarousel({
                // Partners Carousel Settings
                navigation: false,
                pagination: false,
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items: 5,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [979, 3],
                stopOnHover: true,
            });
            // BLog Post Carousel
            $("#blog-post-carousel").owlCarousel({
                // BLog Post Carousel Settings
                navigation: false,
                slideSpeed: 2000,
                paginationSpeed: 1000,
                singleItem: true,
                pagination: true,
                autoPlay: true,
                stopOnHover: true,
            });
            // Counter JS
            $('.our-awards-section').on('inview', function (event, visible, visiblePartX, visiblePartY) {
                if (visible) {
                    $(this).find('.timer').each(function () {
                        var $this = $(this);
                        $({
                            Counter: 0
                        }).animate({
                            Counter: $this.text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function () {
                                $this.text(Math.ceil(this.Counter));
                            }
                        });
                    });
                    $(this).off('inview');
                }
            });
        });
    });
});
