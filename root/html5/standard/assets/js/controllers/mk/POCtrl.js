'use strict';


app.controller('POCtrl', ["$window", "$scope", "$rootScope", "ngTableParams", function ($window, $scope, $rootScope, ngTableParams) {

    $rootScope.currTitle = "订单";

    window.location = publicRoot + "standard/order/index.html";

}]);




