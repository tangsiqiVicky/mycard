'use strict';

app.controller('lxrNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams) {


    $rootScope.currTitle = "新建联系人";

    $scope.user_id = $stateParams.user_id;

    $("#user_id").val($scope.user_id);


    $("#submit").click(function () {

        if ($("#user_id").val() == "") {
            alert("无用户编号");
            return;
        }
        if ($("#lxr").val() == "") {
            alert("请输入姓名");
            return;
        }
        if ($("#tel").val() == "") {
            alert("请输入电话");
            return;
        }


        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=addlxr&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'invite/invitelxr?actiontype=addlxr&user_id=' + user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp:'callback',
            success: function (rv) {
                console.info('addlxr', rv);
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

                            $location.path("app/wx/me/lxr");


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
        return false;


    });


}]);

