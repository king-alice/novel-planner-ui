'use strict';

angular.module('myApp.novels', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/novels', {
    templateUrl: 'views/dashboards.html',
    controller: 'NovelDashboardController'
  });
  $routeProvider.when('/novels/add', {
      templateUrl: 'views/create.html',
      controller: 'NovelDashboardController'
  });
  $routeProvider.when('/novels/:id', {
      templateUrl: 'views/entity.html',
      controller: 'NovelController'
  });
}])
    .controller('NovelDashboardController', function($scope, $location, $http) {
        $scope.label = "novel";
        $http.get('http://127.0.0.1:8080/novel/getAll')
        .then(function(response) {
            $scope.data = response.data;
        })
        .catch(function(err) {
            console.log("could not fetch data");
        });
        $scope.create = function (name) {
            const url = 'http://127.0.0.1:8080/novel/create';
            var postReq = {title: name};
            $http.post(
                url,
                postReq)
                .then(function(response) {
                    const id = response.data;
                    //$location.path('/characters');
                    $location.path('/novels/' + id);
                })
                .catch(function(err) {
                    console.log("could not post");
                });
        }
    })
    .controller('NovelController', function($scope, $http, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.showTemplateSelect = false;

        $http.get('http://127.0.0.1:8080/novel/getById/',
            {params: {"id": $routeParams.id}})
            .then(function (response) {
                $scope.title = response.data.title;
                $scope.genres = response.data.genres;
                $scope.characters = response.data.characters;
                $scope.technique = response.data.technique;
                $scope.technique !== undefined && $scope.technique !== null ? $scope.templateSelected = true : $scope.templateSelected = false;
            })
        $scope.toggleTemplateSelect = function() {
            $scope.showTemplateSelect = !$scope.showTemplateSelect;
        }

        $scope.updateTechnique = function(technique) {
            $scope.technique = technique;
            var putReq = {"novelId": $scope.id, "technique": technique}
            $http.put(
                'http://127.0.0.1:8080/novel/technique',
                putReq
            ).then( function(response) {
                $scope.templateSelected = true;
                $scope.techniqueDesc = response.data.description;
            }).catch( function(err) {
                console.log(err);
            })
        }
    });