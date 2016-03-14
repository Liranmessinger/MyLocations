'use strict';

/* Controllers */

var phonecatControllers = angular.module('locationsControles', []);

phonecatControllers.controller('CategoryListCtrl', ['$scope',
  function($scope) {
      $scope.msgErr='';
      $scope.isEdit=false;
    $scope.isLastClickAdd=false;
    $scope.categories=[];
    $scope.selectedCategory={
        id:-1,
        name:''
    };

      (function init() {
          // load data, init scope, etc.
          $scope.categories=loadData();
          $scope.selectedCategory=$scope.categories.length>0?$scope.categories[0]:{};
      })();

      $scope.Add=function()
      {
          $scope.isEdit=true;
          $scope.selectedCategory=$scope.categories.length>0?$scope.categories[0]:{};
          $scope.isLastClickAdd=true;
      };
      $scope.Remove=function()
      {
          for(var a=0;a<$scope.categories.length;a++)
          {
              var item =$scope.categories[a];
              if(item.id==$scope.selectedCategory.id) {
                  $scope.categories.splice(a,1);
                  break;
              }
          }
          $scope.selectedCategory=$scope.categories.length>0?$scope.categories[0]:{};
          saveData();
      };
      $scope.Edit=function()
      {
          $scope.selectedCloneCategory=angular.copy($scope.selectedCategory);
          $scope.isEdit=true;
          $scope.isLastClickAdd=false;
      };
      $scope.Save=function()
      {
          if(!isDataValid())
              return;
          $scope.msgErr='';
          var newItem=angular.copy($scope.selectedCloneCategory);
          if($scope.isLastClickAdd) {
              var newId=$scope.categories.length>0?parseInt($scope.categories[$scope.categories.length-1].id)+1:1;
              newItem.id=newId;
              $scope.categories.push(newItem);
              $scope.selectedCategory = $scope.categories[$scope.categories.length - 1];
          }
          else
          {
              for(var a=0;a<$scope.categories.length;a++)
              {
                  var item =$scope.categories[a];
                  if(item.id==newItem.id) {
                      item.name = newItem.name;
                      break;
                  }
              }
          }
          $scope.isEdit=false;
          $scope.selectedCloneCategory={};
          saveData();
      };
      $scope.Cancel=function()
      {
          $scope.isEdit=false;
          $scope.selectedCloneCategory={};
      };

      function saveData()
      {
          utils.setLocalStorage('categoryData',$scope.categories);
      }

      function loadData()
      {
          var data=utils.getLocalStorage('categoryData');
          if(data==null)
              data=[];
         return data;
      }

      function isDataValid()
      {
          if(utils.isEmpty($scope.selectedCloneCategory)||utils.isEmpty($scope.selectedCloneCategory.name))
          {
              $scope.msgErr='before saving please fill all inputs data';
              return false;
          }
          return true;
      }
  }]);

phonecatControllers.controller('LocationListCtrl', ['$scope','NgMap',
  function($scope,NgMap) {
      $scope.googleMapsUrl='https://maps.googleapis.com/maps/api/js?key=AIzaSyCdNiz_hPeAIqnC8jUGhcLraCIZvhZXhfg';
      $scope.msgErr='';
      $scope.method=method.none;
      $scope.locations=[];
      $scope.categories=[];
      $scope.selectedLocation={
          id:-1,
          name:'',
          adress:'',
          coordinates:'',
          category:[]
      };
      (function init() {
          // load data, init scope, etc.
          $scope.categories=loadData('categoryData');
          $scope.selectedCloneLocation={};
          $scope.selectedCloneLocation.category={};
          $scope.selectedCloneLocation.category=$scope.categories.length>0?$scope.categories[0]:{};
          $scope.locations=loadData('locationData');
          $scope.selectedLocation=$scope.locations.length>0?$scope.locations[0]:{};
          setViewMode();
      })();

      NgMap.getMap().then(function(map) {

      });

      function setViewMode()
      {
          $scope.selectedCloneLocation=angular.copy($scope.selectedLocation);
          $scope.method=method.View;
      }

      function loadData(key)
      {
          var data=utils.getLocalStorage(key);
          if(data==null)
              data=[];
          return data;
      }

      function saveData()
      {
          utils.setLocalStorage('locationData',$scope.locations);
      }

      function isDataValid()
      {
          if(utils.isEmpty($scope.selectedCloneLocation)||
              utils.isEmpty($scope.selectedCloneLocation.name)
              ||utils.isEmpty($scope.selectedCloneLocation.adress)
              ||
              utils.isEmpty($scope.selectedCloneLocation.coordinates)
              ||
              utils.isEmpty($scope.selectedCloneLocation.category))
          {
              $scope.msgErr='before saving please fill all inputs data';
              return false;
          }
          return true;
      }

      $scope.Add=function()
      {
          $scope.isEdit=true;
          $scope.selectedLocation=$scope.locations.length>0?$scope.locations[0]:{};
          $scope.method=method.Add;
          $scope.selectedCloneLocation={};
          $scope.selectedCloneLocation.category={};
          $scope.selectedCloneLocation.category=$scope.categories.length>0?$scope.categories[0]:{};
      };
      $scope.Remove=function()
      {
          for(var a=0;a<$scope.locations.length;a++)
          {
              var item =$scope.locations[a];
              if(item.id==$scope.selectedLocation.id) {
                  $scope.locations.splice(a,1);
                  break;
              }
          }
          $scope.selectedLocation=$scope.locations.length>0?$scope.locations[0]:{};
          saveData();
      };
      $scope.Edit=function()
      {
          $scope.selectedCloneLocation=angular.copy($scope.selectedLocation);
          $scope.method=method.Edit;
      };
      $scope.View=function()
      {
          setViewMode();
      };
      $scope.Save=function()
      {
          if(!isDataValid())
            return;
          $scope.msgErr='';
          var newItem=angular.copy($scope.selectedCloneLocation);
          if($scope.method==method.Add) {
              var newId=$scope.locations.length>0?parseInt($scope.locations[$scope.locations.length-1].id)+1:1;
              newItem.id=newId;
              $scope.locations.push(newItem);
              $scope.selectedLocation = $scope.locations[$scope.locations.length - 1];
          }
          else if($scope.method==method.Edit)
          {
              for(var a=0;a<$scope.locations.length;a++)
              {
                  if($scope.locations[a].id==newItem.id) {
                      $scope.locations[a].name = newItem.name;
                      $scope.locations[a].adress = newItem.adress;
                      $scope.locations[a].coordinates = newItem.coordinates;
                      $scope.locations[a].category = newItem.category;
                      $scope.selectedLocation=$scope.locations[a];
                      break;
                  }
              }
          }
          $scope.method=method.none;
          setViewMode();
          saveData();
      };
      $scope.Cancel=function()
      {
          $scope.method=method.none;
          $scope.selectedCloneLocation={};
      };
  }]);
var method=
{
    'Add':1,
    'View':2,
    'Edit':3,
    'none':4
};

