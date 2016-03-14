'use strict';

/* App Module */

var phonecatApp = angular.module('myLocatonsApp', [
  'ngRoute',
  'locationsAnimations',
    'ngMap',
  'locationsControles',
  'locationServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/categories', {
        templateUrl: 'partials/categories.html',
        controller: 'CategoryListCtrl'
      }).
        when('/locations', {
          templateUrl: 'partials/locations.html',
          controller: 'LocationListCtrl'
        }).
      otherwise({
        redirectTo: '/categories'
      });
  }]);


