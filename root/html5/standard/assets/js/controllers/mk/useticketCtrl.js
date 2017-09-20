'use strict';


app.controller('useticketCtrl', ["$window", "$scope", "$rootScope", "$location", "$stateParams", "ngTableParams", "SweetAlert", "$interval", function ($window, $scope, $rootScope, $location, $stateParams, ngTableParams, SweetAlert, $interval) {
//$scope.po_id="20170223-0001";
    $scope.ticket_id= $stateParams.ticket_id;
    $scope.ticket_type= $stateParams.ticket_type;
    $scope.shop_id= $stateParams.shop_id;
    $scope.shop_name= $stateParams.shop_name;
    $scope.product_no = "";
    $scope.product_qty = "";
    $scope.b_date = "";
    $scope.e_date = "";
    $scope.type='1';
    $scope.img="";


    //myalert($scope.po_id)

    $scope.getticket = function () {
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 5 // count per page
        }, {
            total: 0, // length of data
            counts: [],
            getData: function ($defer, params) {
                //把ajax 放在ngTable里面
                var options = {
                    url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getticket&ticket_id='+$scope.ticket_id+'&ticket_type='+$scope.ticket_type+'&shop_id='+$scope.shop_id, serviceRoot2),
                    async: false,
                    type: 'get',
                    dataType: 'json',
                    data: null,
                    resetForm: true,
                    timeout: 60000,
                    // jsonp: 'callback',
                    success: function (rv) {
                        if (rv.result == "1") {
                            console.info('ec',rv);

                            $.each(rv.data, function (idx, item) {
                                    $scope.img=item.img;
                                    $scope.isused = item.isused;
                                    $scope.product_no = item.product_no;
                                    $scope.product_qty = item.product_qty;
                                    $scope.b_date = item.b_date;
                                    $scope.e_date = item.e_date;

                                })
                            params.total(rv.data.length);
                            $defer.resolve(rv.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        // alert("获取数据失败。。。。。。")
                    }
                };
                $.ajax(options);
            }
        });
    }

    $scope.getticket();


    $scope.submitend = function () {
        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=add_PO_saoma&po_id=' + $scope.po_id + '&po_id=' + $scope.po_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=use_ticket&ticket_ids=' + $scope.ticket_id , serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data:$("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";
                $.each(rv.data, function (idx, item) {
                    if (item.result == "1") {

                        if ($scope.type == "1") {
                            isok = true;
                            layer.closeAll();
                        }

                    } else if (item.result == "2") {
                        layer.closeAll();
                        msg = item.result_text;
                    } else if (item.result == "3") {
                        msg = item.result_text;
                    } else {
                        layer.closeAll();
                        msg = item.result_text;
                    }
                })

                if (isok) {
                    $scope.saveinfo();


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
    $scope.saveinfo=function () {
        var options = {
            url: myforwardurl(serviceRoot2 + 'x5/snsoftpost?actiontype=saveX5_data_po&shop_id='+$scope.shop_id+'&maker='+user_id+'&ticket_ids='+ $scope.ticket_id,serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data:$("#f1").serializeArray(), //表单序列化
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function(rv) {
                console.info('rv',rv);
                if(rv.result == "1"){
                    alert("成功领取卡券");
                    $scope.sendsms();
                     $location.path("/app/wx/me/order");

                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }

        };
        $.ajax(options);
    }

    $scope.msg =  "您已使用由"+$scope.shop_name+"+提供的"+$scope.ticket_type+"。请登录微信名卡公众号，点击会员中心——交易统计查看详情";
    var issending = 0;
    $scope.sendsms=function () {
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=sendsms&mobile=' + $("#invited").val(), serviceRoot),
            url: myforwardurl(serviceRoot2 + 'user/mainUser?actiontype=sendsms&mobile=' + $scope.phone+'&sms_msg='+$scope.msg, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {

                maskLayer(0);

                var isok = false;
                var msg = "";

                if (rv.result == "1") {
                    isok = true;
                    msg = rv.result_text;
                }

                if (isok) {
                    // alert("发行成功");


                }
                else {
                    alert("发送失败")
                }

                issending = 0;

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                maskLayer(0);

                alert("发送失败，请检查短信网关");
                issending = 0;
            }
        };
        $.ajax(options);
        return false;
    }


    $scope.submit = function () {
        if ($scope.type == "1") {
            var option = {
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['80%', '200px'], //宽高
                title: '发送验证码',
                shade: 0.6,//遮罩透明度
                anim: 1,//0-6的动画形式，-1不开启
                content: $('#myModalUploadImg'),
                end: function () {
                }
            };
            layer.open(option);

        } else {
            // $scope.submitend();
        }


    };


    $scope.master = $scope.myModel;
    $scope.form = {

        submit: function (form) {
            var firstError = null;
            if (form.$invalid) {

                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }

                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                return;

            } else {
                $scope.submit();

            }

        },
        reset: function (form) {

            $scope.myModel = angular.copy($scope.master);
            form.$setPristine(true);

        }
    };

    var issending = 0;
    var wait = 60;

    $scope.description = "获取验证码";
    $scope.flag = true;
    var second = 59;
    var timerHandler;
    $scope.sendCode = function () {
        $scope.flag = false;
        $scope.getsmscode();
        if (timerHandler) {
            return;
        }
        timerHandler = $interval(function () {
            if (second <= 0) {
                $interval.cancel(timerHandler);
                second = 59;
                $scope.description = "获取验证码";
                timerHandler = null;
                $scope.flag = true;
            } else {
                $scope.description = second + " 秒后重发";
                second--;
                $scope.flag = false;
            }
        }, 1000, 100);

    };
    $scope.getsmscode = function () {

        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getmobvalidno&mobile=' + $scope.Owner, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'user/getmobvalidno?mobile='+ $scope.phone, serviceRoot2),
            async: true,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
             // jsonp: 'callback',
            success: function (rv) {
                maskLayer(0);
                // if (rv.result == "1") {
                //     alert("验证码已发送，请注意查收。。。");
                // }

                issending = 0;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                maskLayer(0);
                // alert("获取验证码失败，请检查短信网关");
                issending = 0;

            }

        };
        $.ajax(options);


    }

}]);





