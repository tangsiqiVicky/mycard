'use strict';

app.controller('iwantCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {


    $rootScope.currTitle = "我要";


    $scope.back = function () {
        $window.history.back();
    }

    $('.date').remove(); // 移除插件
    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);

