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

app.controller('OrderCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', "ngTableParams", "SweetAlert", function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, SweetAlert) {


    scope = $scope;

    var data = [];
    var listdata = [];


    $rootScope.currTitle = "我的订单";


    // Chart.js Data
    $scope.data = [];

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: false,

        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: '#fff',

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: 'easeOutBounce',

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };


    var total_num = 0;
    var total_amount = 0;


    $scope.gettotaldata_po = function () {
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=gettotaldata_po&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=gettotaldata_po&user_id=' + user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";


                if (rv.result == "1") {
                    isok = true;
                    msg = rv.result_text;
                    $.each(rv.data, function (idx, item) {
                        total_num = item.num;
                        total_amount = item.amount;
                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.total_num = total_num;
                            $scope.total_amount = total_amount;

                            $scope.renderChart = true;
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

    }

    $scope.gettotaldata_po();


    var colorstr = "#00CC33,#00CC00,#C75000,#FF9900,#23DB8D,#CCFF00,#ff6600,#ffcc00";
    var colorstrs = colorstr.split(",");


    $scope.getdata_po_byproducttype = function () {
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getdata_po_byproducttype&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_po_byproducttype&user_id=' + user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";


                if (rv.result == "1") {
                    isok = true;
                    msg = rv.result_text;
                    $.each(rv.data, function (idx, item) {

                        var thetab = {};
                        thetab.value = item.amount;
                        thetab.color = colorstrs[(idx + 1) % 8];
                        thetab.highlight = '#FF5A5E';
                        thetab.label = item.products_type;

                        data.push(thetab);

                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.data = data;
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

    }


    $scope.getdata_po_byproducttype();


    $scope.getdata_po = function () {
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getdata_po&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_po&user_id=' + user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";


                if (rv.result == "1") {
                    isok = true;

                    listdata = [];

                    $.each(rv.data, function (idx, item) {

                        var theitem = {};
                        theitem.sortno = item.sortno;
                        theitem.PO_ID = item.PO_ID;
                        theitem.Maker = item.Maker;
                        theitem.Make_date = item.Make_date;
                        theitem.shop_id = item.shop_id;
                        theitem.shop_name = item.shop_name;
                        theitem.amount = item.amount;
                        theitem.Status = item.Status;
                        theitem.pic = item.pic;
                        theitem.voice = item.voice;

                        listdata.push(theitem);


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.listdata = listdata;

                            $scope.tableParams = new ngTableParams({
                                page: 1, // show first page
                                count: 5 // count per page
                            }, {
                                total: listdata.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(listdata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            });

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

    }

    $scope.getdata_po();


    $scope.removerow = function (theid) {

        var index = -1;
        var comArr = listdata;
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].PO_ID === theid) {
                index = i;

                break;
            }
        }

        if (index === -1) {
            alert("找不到行");
        }

        if (index > -1) {
            listdata.splice(index, 1);
        }


        $scope.listdata = listdata;
    }


    $scope.delit = function (theid) {
        SweetAlert.swal({
            title: "确定删除订单吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {

                $scope.delitact(theid);
                /*
                 SweetAlert.swal({
                 title: "Deleted!",
                 text: "Your imaginary file has been deleted.",
                 type: "success",
                 confirmButtonColor: "#007AFF"
                 });
                 */
            } else {
                /*
                 SweetAlert.swal({
                 title: "Cancelled",
                 text: "Your imaginary file is safe :)",
                 type: "error",
                 confirmButtonColor: "#007AFF"
                 });
                 */
            }
        });


    }


    $scope.delitact = function (theid, theval) {
        maskLayer(1);

        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=del_po&user_id=' + user_id + '&po_id=' + theid, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=del_po&user_id=' + user_id + '&po_id=' + theid, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
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


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    maskLayer(0);


                    $scope.removerow(theid);

                    $scope.tableParams.reload();


                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);

    }


    $scope.sure = function (theid,Status) {
        maskLayer(1);

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=del_po&user_id=' + user_id + '&po_id=' + theid, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=confirm_po&user_id=' + user_id + '&po_id=' + theid+'&status='+'生效', serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
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


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    maskLayer(0);
                    $scope.getdata_po();
                    $scope.tableParams.reload();




                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);

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


    $scope.ok_pay = function (e) {

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
                // url: myforwardurl(serviceRoot + "snwx_act?mytype=getprepay_id&openid=" + openid + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url + "&orderNo=" + $scope.PO_ID + "&userId=" + user_id + "&money=" + $scope.pay_amount + "&notify_url=" + serviceRoot + "html5/notify_url.html", serviceRoot),
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

                    console.info('rv',rv);
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

    $scope.cancel_pay = function (e) {
        $.closePopupLayer();
        //setTimeout(function() { $window.history.back(); }, 500);

    };


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);


loadwxjs();











