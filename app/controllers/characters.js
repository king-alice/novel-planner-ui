'use strict';

angular.module('myApp.characters', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/characters', {
    templateUrl: 'views/dashboards.html',
    controller: 'CharacterDashboardController'
  });
  $routeProvider.when('/characters/add', {
      templateUrl: 'views/create.html',
      controller: 'CharacterDashboardController'
  });
  $routeProvider.when('/characters/:id', {
      templateUrl: 'views/entity.html',
      controller: 'CharacterController'
  })
}])
    .controller('CharacterDashboardController', function($scope, $location, $http) {
        $scope.label = "character";
        $http.get('http://127.0.0.1:8080/character/getAll')
            .then(function(response) {
                $scope.data = response.data;
            })
            .catch(function(err) {
                console.log("could not fetch data");
            });
        $scope.create = function (name) {
            const url = 'http://127.0.0.1:8080/character/create';
            var postReq = {name: name};
            $http.post(
                url,
                postReq)
                .then(function(response) {
                    const id = response.data;
                    //$location.path('/characters');
                    $location.path('/characters/' + id);
                })
                .catch(function(err) {
                    console.log("could not post");
                });
        }
    })
    .controller('CharacterController', function($scope, $http, $routeParams) {
        $scope.id = $routeParams.id;
        $http.get('http://127.0.0.1:8080/character/',
            {params: {"id": $routeParams.id}})
            .then(function (response) {
                $scope.name = response.data.name;
            })
            .catch(function(err) {
                console.log("could not get");
            });
    });