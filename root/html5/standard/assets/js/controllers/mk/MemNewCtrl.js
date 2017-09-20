'use strict';

app.controller('MemNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams) {


    $rootScope.currTitle = "新建会员";


    $scope.inviter_id = $stateParams.inviter_id;

    $scope.theid = $stateParams.theid;

    $scope.opertype = $stateParams.opertype;


    if ($scope.opertype == "edit") {
        $rootScope.currTitle = "编辑会员";
    }


    $("#submit").click(function () {

        if ($scope.opertype == "edit") {


            var options = {
                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=editmymember&theid='+$scope.theid,serviceRoot),
                url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=editmymember&theid=' + $scope.theid, serviceRoot2),
                async: false,
                type: 'get',
                dataType: 'json',
                data: $("#f1").serializeArray(),
                resetForm: true,
                timeout: 60000,
                // jsonp:'callback',
                success: function (rv) {

                    var isok = false;
                    var msg = "";
                    $.each(rv.data, function (idx, item) {

                        if (item.result == "1") {
                            isok = true;
                        }
                        else {
                            msg = item.result_text;
                        }
                    })

                    if (isok) {

                        setTimeout(function () {
                            $scope.$apply(function () {

                                $location.path("app/wx/me/mymemberlist");


                            });
                        }, 500);


                    } else {
                        alert(msg)
                    }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("保存失败");
                }
            };
            $.ajax(options);


        }
        else {


        }


    });


    $scope.data = [];

    if ($scope.opertype == "edit") {

//load data
        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmymemberlist&theid='+$scope.theid,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getmymemberlist&theid=' + $scope.theid, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp:'callback',
            success: function (rv) {

                var isok = false;
                var msg = "";


                if (rv.result == "1") {
                    isok = true;

                    $.each(rv.data, function (idx, item) {
                        $scope.user_id = item.user_id;
                        $scope.nickname = item.nickname;
                        $scope.phone = item.phone;


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {
                } else {
                    alert(msg);
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);


    }


}]);

