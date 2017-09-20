'use strict';

app.controller('MyPublishAddrNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams) {


    $rootScope.currTitle = "新建地址";

    $scope.user_id = $stateParams.user_id;


    $("#submit").click(function () {

        if ($("#shr").val() == "") {
            alert("请输入收货人");
            return;
        }
        if ($("#addr").val() == "") {
            alert("请输入地址");
            return;
        }


        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=add_shaddr&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shaddr&user_id=' + user_id, serviceRoot2),
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

                            $location.path("app/wx/me/mypublish_addr");


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

