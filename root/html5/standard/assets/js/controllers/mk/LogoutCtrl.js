'use strict';

app.controller('LogoutCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$cookieStore', function ($window, $scope, $location, $rootScope, $localStorage, $cookieStore) {


    $rootScope.currTitle = "退出";

    clickbottomtabindex = 0;


    var getValue = function () {
        return $window.sessionStorage.length;
    }

    var getData = function () {
        var json = [];
        $.each($window.sessionStorage, function (i, v) {
            json.push(angular.fromJson(v));
        });
        return json;
    }

    var removeItem = function (id) {
        $window.sessionStorage.removeItem(id);

    }


    var userimg = "";
    var isremember = "";
    var isremember_user_id = "";
    var isremember_password = "";
    var thedata = getData();
    $.each(thedata, function (idx, item) {
        if (item.id != undefined) {
            user_id = item.id;
            //userimg=item.img;
            //isremember=item.remember;
            //isremember_user_id=item.remember_user_id;
            //isremember_password=item.remember_password;
        }
    })


    if (user_id != "") {
        removeItem(user_id);
    }


    var options = {

        //url:myforwardurl(serviceRoot+'mk_login?mytype=logout&login_name='+user_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'user/loginwx?mytype=logout&login_name=' + user_id, serviceRoot2),
        async: false,
        type: 'get',
        dataType: 'json',
        data: $("#f1").serializeArray(),
        resetForm: true,
        timeout: 60000,
        // jsonp:'callback',
        success: function (rv) {

            //$location.path("/app/dashboard").replace();
            $location.path("/app/login/signin").replace();
            $rootScope.$apply();


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $location.path("/app/login/signin").replace();
            $rootScope.$apply();

        }
    };
    $.ajax(options);


}]);

