'use strict';


function callPay() {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady,
                false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
}


function onBridgeReady() {

    /*
     WeixinJSBridge.invoke(
     'getBrandWCPayRequest', {
     "appId":appid,     //公众号名称，由商户传入
     "timestamp":timestamp,         //时间戳，自1970年以来的秒数
     "nonceStr":noncestr, //随机串
     "package":"prepay_id="+prepay_id,
     "signType":"MD5",         //微信签名方式：
     "paySign":paySign //微信签名
     },
     function(res){
     alert(res.err_msg)
     if(res.err_msg == "get_brand_wcpay_request：ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
     }
     );

     */


    wx.chooseWXPay({
        appId: appid,
        nonceStr: noncestr, // 支付签名随机串，不长于 32 位
        package: "prepay_id=" + prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        paySign: paySign, // 支付签名
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        success: function (res) {
            if (res.errMsg == "chooseWXPay:ok") {
                //支付成功

                var options = {
                    url: serviceRoot + 'wx_notify_url.jsp?paymode=wx&out_trade_no=' + out_trade_no + '&userId=' + user_id + '&total_fee=' + total_fee,
                    async: false,
                    type: 'post',
                    dataType: 'json',
                    data: null,
                    resetForm: true,
                    timeout: 60000,
                    success: function (rv) {
                        var isok = false;
                        var msg = "";
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                };
                $.ajax(options);


                scope.close();
                scope.back();
            } else {
                alert(res.errMsg);
                scope.close();
                scope.back();
            }
        },
        cancel: function (res) {
            //支付取消
            scope.close();
            scope.back();
        }
    });

}


var out_trade_no = "";
var total_fee = 0;


app.controller('SettleMEMCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {


    scope = $scope;


    $rootScope.currTitle = "结算（会员付款）";

    $scope.pay_type_value = "cash";
    var the_invite_url = ""


    var validno = "";


    /*
     $scope.clickontab=function(tab){



     if(tab=="0")
     {
     setTimeout(function() {
     $scope.$apply(function() {
     $scope.getqrcode();
     });
     }, 500);




     }



     }

     */


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


    $scope.getqrcode = function () {

        if ($("#price0").val() == "") {
            $("#price0").val("0");
        }

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getpaycode&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'payCode/getpayCodeList?actiontype=getpaycode&user_id='+user_id, serviceRoot2),
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

                        validno = item.validno;
                    }
                    else {
                        msg = item.result_text;
                    }
                })


                if (isok) {//alert("获取数据成功")
                    //alert(msg)


                    setTimeout(function () {
                        $scope.$apply(function () {


                            the_invite_url = "PAY:" + user_id + "~~X" + validno + "~~X" + (($("#price0").val() == "") ? "0" : $("#price0").val());

                            //scope.publicRoot=$rootScope.publicRoot

                            var the_pay_qrcode = the_invite_url


                            $scope.pay_qrcode = the_pay_qrcode;


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
            url: myforwardurl(serviceRoot2 + 'payCode/getpayCodeList?actiontype=payment&user_id=' + user_id, serviceRoot2),
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


    $scope.close = function () {
        $.closePopupLayer();

    }


    $scope.payact = function (PO_ID, amount) {

        $scope.PO_ID = PO_ID;
        $scope.pay_amount = amount;

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w,
            target: 'payContent',
            container: "",
            hidebyclickbg: "false"
        });
    }

    $scope.ok = function (e) {

        out_trade_no = $scope.PO_ID;
        total_fee = $scope.pay_amount;

        if ($scope.paymode == "" || $scope.paymode == undefined) {
            alert("请选择支付方式");
            return;
        }


        if ($scope.paymode == "wx") {

            //获取prepay_id  https://api.mch.weixin.qq.com/pay/unifiedorder
//if(openid==""){openid="oYmhpuNBf9Elpc_buW7Yk_df63-U";}

            var options = {
                //url: myforwardurl(serviceRoot + "snwx_act?mytype=getprepay_id&openid=" + openid + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url + "&orderNo=" + $scope.PO_ID + "&userId=" + user_id + "&money=" + $scope.pay_amount + "&notify_url=" + serviceRoot + "html5/notify_url.html", serviceRoot),
                url: myforwardurl(serviceRoot2 + "snwx/snWXWX/?mytype=getprepay_id&openid=" + openid + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url + "&orderNo=" + $scope.PO_ID + "&userId=" + user_id + "&money=" + $scope.pay_amount + "&notify_url=" + serviceRoot + "html5/notify_url.html", serviceRoot2),
                async: false,
                type: 'get',
                dataType: 'json',
                data: null,
                resetForm: true,
                timeout: 60000,
                // jsonp: 'callback',
                success: function (rv) {
                    var isok = false;
                    var msg = "";


                    if (rv.result == "1") {
                        prepay_id = rv.prepay_id;
                        Sign = rv.Sign;
                        paySign = rv.paySign;
                        getprepay_rvsign = rv.getprepay_rvsign;
                        isok = true;

                    }
                    else {
                        msg = rv.result_text;
                    }


                    if (isok) {//alert("获取数据成功")
                        //alert(msg)


                        //微信支付


                        callPay();


                    } else {
                        alert(msg)
                    }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {


                }


            };
            $.ajax(options);


        }
        else if ($scope.paymode == "ali") {
            //支付宝
            window.open(serviceRoot + "alipay.html?mytype=getprepay_id&openid=" + openid + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url + "&orderNo=" + $scope.PO_ID + "&userId=" + user_id + "&money=" + $scope.pay_amount + "&notify_url=" + serviceRoot + "notify_url.jsp", "_blank");
        }


    };

    $scope.cancel = function (e) {
        $.closePopupLayer();
        //setTimeout(function() { $window.history.back(); }, 500);

    };


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

    $("#settle_savebtn").click(function () {
    // $scope.payonline = function () {
        if ($("#price0").val() == "" || $("#price0").val() == "0") {
            alert("请输入消费金额");
            return;
        }
//支付成功后在notify_url.jsp执行数据库操作P_MK_PAYMENT
        $scope.payact("OL-" + user_id.replace("-", "SPLIT") + "-" + validno, $("#price0").val());

    })


    $scope.back = function () {
        $window.history.back();
    }


    loadwxjs();


    $scope.getqrcode();


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
