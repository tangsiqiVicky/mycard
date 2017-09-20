'use strict';


app.controller('ScanCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams) {


    $rootScope.currTitle = "扫一扫";

    $scope.qrcode = $stateParams.qrcode;

    var validno = "";


    $scope.after_scan = function () {

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=afterscan&user_id='+user_id+'&qrcode='+$("#qrcode").val(),serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=afterscan&user_id=' + user_id + '&qrcode=' + $("#qrcode").val(), serviceRoot2),
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

                    }
                    else {
                        msg = item.result_text;
                    }
                })


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {
                            $("#container").html(msg);
                        });
                    }, 500);


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


    $scope.scanbtn_act = function () {

        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                $("#qrcode").val(result);
                $scope.after_scan();
            }
        });


    }


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


    if ($scope.qrcode != undefined && $scope.qrcode != null && $scope.qrcode != "") {
        $("#qrcode").val($scope.qrcode);
        $scope.after_scan();
    }
    else {
        $scope.scanbtn_act();
    }


}]);



