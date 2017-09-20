'use strict';


app.controller('yjcpCtrl', ["$window", "$scope", "$location", "$rootScope", function ($window, $scope, $location, $rootScope) {


    $rootScope.currTitle = "有机商品";


    $rootScope.arg0 = "shop_id=S-kxnc";
    $rootScope.arg1 = "producttype=有机商品";
//alert($rootScope.arg0)


    $location.path("/app/wx/me/shopgoods_by_producttype");


//setTimeout(function() { $rootScope.logit(user_id,'url',window.location.href.substring(window.location.href.indexOf("index.html#")+11),$rootScope.currTitle);},2000);


}]);

