'use strict';

app.controller('ShoplawCtrl', ["$window", "$scope", "$location", function ($window, $scope, $location) {

    $scope.back = function () {
        $window.history.back();
    }

}]);

