'use strict';


app.controller('SettleCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {


    scope = $scope;


    $rootScope.currTitle = "结算";


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);


