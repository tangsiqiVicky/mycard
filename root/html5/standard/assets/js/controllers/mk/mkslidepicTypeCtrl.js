'use strict';


app.controller('mkslidepicTypeCtrl', ["$window", "$scope", "$rootScope", "$location", "ngTableParams", function ($window, $scope, $rootScope, $location, ngTableParams) {

    var data = [];

    $rootScope.currTitle = "MK轮播图";

    var mod_typestr = "首页,商家,个人,周边";
    var mod_typestrs = mod_typestr.split(",");
    for (var i = 0; i < mod_typestrs.length; i++) {
        var thetab = {};
        thetab.id = i + 1;
        thetab.mod_type = mod_typestrs[i];
        data.push(thetab);
    }


    setTimeout(function () {
        $scope.$apply(function () {

            $scope.data = data;

            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 5 // count per page
            }, {
                total: data.length, // length of data
                counts: [],
                getData: function ($defer, params) {
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

        });
    }, 500);


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);





