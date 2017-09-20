'use strict';


var out_trade_no = "";
var total_fee = 0;


app.controller('SettleSHOPCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {


    scope = $scope;


    $rootScope.currTitle = "结算（商家收款）";

    $scope.pay_type_value = "cash";
    var the_invite_url = ""


    var validno = "";


    $scope.clickontab = function (tab) {


        if (tab == "0") {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.getqrcode();
                });
            }, 500);


        }


    }


    /*
     $scope.tabs = [{
     title: '匹配码（会员）',
     content: $("#tab0").innerHTML
     }, {
     title: '收款（商家）',
     content: 'Dynamic content 2',
     disabled: false
     }];
     */


    $scope.scanbtn_act = function () {

        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                result = result.substring(4);
                $("#phone").val(result.split("~~X")[0]);
                $("#code").val(result.split("~~X")[1]);
                $("#price").val(result.split("~~X")[2]);
                $("#price").focus();

            }
        });


    }


    $scope.settle_save_main = function () {

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=payment&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'payCode/getpayCodeList?actiontype=payment&user_id=' + $('#phone').val()+'&operator_id=' + user_id, serviceRoot2),
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
                    alert("消费操作成功");


                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("消费操作失败");

            }
        };
        $.ajax(options);
        return false;

    }


    $scope.settle_save = function () {

        if ($("#pay_type").val() == "") {
            alert("请选择消费类型！");
            return;
        }
        if ($("#phone").val() == "") {
            alert("请输入手机号！");
            return;
        }
        if ($("#code").val() == "") {
            alert("请输入匹配码！");
            return;
        }
        if ($("#price").val() == "") {
            alert("请输入金额！");
            return;
        }
        if (parseInt($("#price").val()) <= 0) {
            alert("请输入金额！");
            return;
        }
//alert(myforwardurl(serviceRoot+'main_info?actiontype=payment&user_id='+user_id,publicRoot))
        $scope.settle_save_main();

    }


    $scope.back = function () {
        $window.history.back();
    }


    loadwxjs();

    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);


/*
 //alert(user_id)
 if(user_type=="member_single")
 {
 $("#tab0").attr("active","true");
 }
 else
 {
 $("#tab1").attr("active","true");
 }
 */