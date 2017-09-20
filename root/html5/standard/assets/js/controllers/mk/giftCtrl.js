'use strict';


app.controller('giftCtrl', ["$window", "$scope", "$rootScope", "$location", "$stateParams", "ngTableParams", "SweetAlert", "$interval", function ($window, $scope, $rootScope, $location, $stateParams, ngTableParams, SweetAlert, $interval) {
//$scope.po_id="20170223-0001";
    $scope.po_id = $stateParams.po_id;

    //myalert($scope.po_id)



    $scope.getguestroom = function () {
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 5 // count per page
        }, {
            total: 0, // length of data
            counts: [],
            getData: function ($defer, params) {
                //把ajax 放在ngTable里面
                var options = {

                    //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getdata_saoma_detail&po_id=' + $scope.po_id, serviceRoot),
                    url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_saoma_detail&po_id=' + $scope.po_id, serviceRoot2),
                    async: false,
                    type: 'get',
                    dataType: 'json',
                    data: null,
                    resetForm: true,
                    timeout: 60000,
                    // jsonp: 'callback',
                    success: function (rv) {

                        if (rv.result == "1") {
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

    $scope.getguestroom();


    $scope.getinfo = function () {
        var options = {
            // url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getdata_saoma&po_id=' + $scope.po_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_saoma&po_id=' + $scope.po_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {
            console.info('aa',rv);
                var isok = false;
                var msg = "";
                if (rv.result == "1") {
                    isok = true;
                    $.each(rv.data, function (idx, item) {
                        $scope.username = item.SHR;
                        $scope.phone = item.Tel;
                        $scope.address = item.SH_ADDR;
                        $scope.type = item.type;
                        $scope.Owner = item.Owner;
                        $scope.status = item.status;
                        $scope.logistics_info = item.logistics_info;

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

    setTimeout(function () {
        $scope.getinfo();
    }, 500);

    $scope.submitend = function () {
        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=add_PO_saoma&po_id=' + $scope.po_id + '&po_id=' + $scope.po_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_PO_saoma&po_id=' + $scope.po_id , serviceRoot2),
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
                    console.log(rv.data);
                    if (item.result == "1") {
                        isok = true;
                        if ($scope.type == "1") {
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
                    alert("参与成功");
                    $scope.getinfo();


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
            $scope.submitend();
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
            url: myforwardurl(serviceRoot2 + 'user/getmobvalidno?mobile=' + $scope.phone, serviceRoot2),
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





