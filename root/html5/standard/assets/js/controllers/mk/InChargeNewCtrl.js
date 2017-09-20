'use strict';

app.controller('InChargeNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {

//$localStorage.user.name="";
//$localStorage.user.picture="assets/images/media-user.png";


    $rootScope.currTitle = "储值";


    $scope.incharge_save = function () {


        if ($("#phone").val() == "") {
            alert("请输入手机号！");
            return;
        }
        if ($("#code").val() == "") {
            alert("请输入匹配码！");
            return;
        }
        if ($("#cash").val() == "") {
            alert("请输入实收金额！");
            return;
        }
        if (parseInt($("#cash").val()) <= 0) {
            alert("请输入实收金额！");
            return;
        }
        if ($("#balance").val() == "") {
            alert("请输入储值额度！");
            return;
        }
        if (parseInt($("#balance").val()) <= 0) {
            alert("请输入储值额度！");
            return;
        }
//level      可选, 值：mk, gold, silver, copper

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=recharge&user_id='+user_id+"&level=",serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=recharge&user_id=' + user_id + "&level=", serviceRoot2),
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
                    alert("储值操作成功");


                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("储值操作失败");

            }
        };
        $.ajax(options);
        return false;


    }


    $scope.scanbtn_act = function () {

        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果

                $("#phone").val(result.split("~~X")[0]);
                $("#code").val(result.split("~~X")[1]);

                $("#cash").focus();

            }
        });


    }


    $scope.back = function () {
        $window.history.back();
    }


    loadwxjs();


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);

