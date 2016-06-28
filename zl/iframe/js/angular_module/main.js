/**
 * Created by Administrator on 15-11-20.
 */
var mainApp = angular.module("mainApp",["ngRoute","FanTanYeWuModule","FanTanZongHeModule"]);
mainApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/FanTanYeWu",{templateUrl:"js/modules/fantan/FanTanYeWu.html",controller:"FanTanYeWuController"});
    $routeProvider.when("/FanTanZongHe",{templateUrl:"js/modules/fantan/FanTanZongHe.html",controller:"FanTanZongHeController"});
    $routeProvider.when("/FanDuYeWu",{templateUrl:"js/modules/fanDu/FanDuYeWu.html",controller:"FanDuYeWuController"});
    $routeProvider.when("/FanDuZongHe",{templateUrl:"js/modules/fanDu/FanDuZongHe.html",controller:"FanDuZongHeController"});
    $routeProvider.otherwise({
        redirectTo:"/FanTanYeWu"
    })
}]);