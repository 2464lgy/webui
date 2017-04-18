/**
 * Created by xiongmao on 2016/11/12.
 */
var app=angular.module('app.category',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when("/category",{
        templateUrl:'loads/category.html',
        controller:"categoryController"
    });
});
app.controller("categoryController",function($scope,modalService){
    $scope.data={
        categories:$scope.$parent.categories
    }
});