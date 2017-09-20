'use strict';

app.controller('PayCodeCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {


    $rootScope.currTitle = "付款码";


    var the_invite_url = ""


    var user_id = "";
    var validno = "";


    $scope.getqrcode = function () {

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getpaycode&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'payCode/getpayCodeList?actiontype=getpaycode&user_id=' + user_id, serviceRoot2),
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
                        msg = item.result_text;
                        user_id = item.user_id;
                        validno = item.validno;
                    }
                    else {
                        msg = item.result_text;
                    }
                })


                if (isok) {//alert("获取数据成功")
                    //alert(msg)
                    the_invite_url = user_id + "~~X" + validno;

                    //scope.publicRoot=$rootScope.publicRoot

                    var the_pay_qrcode = the_invite_url

                    $scope.pay_qrcode = the_pay_qrcode


                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }
        };
        $.ajax(options);
        return false;
    }


    $scope.getqrcode();


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);

}]);

