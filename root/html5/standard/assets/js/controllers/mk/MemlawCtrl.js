'use strict';

app.controller('MemlawCtrl', ["$window", "$scope", "$location", function ($window, $scope, $location) {

    $scope.back = function () {
        $window.history.back();
    }

}]);

