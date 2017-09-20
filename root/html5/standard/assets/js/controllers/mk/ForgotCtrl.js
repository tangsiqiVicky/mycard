'use strict';

app.controller('ForgotCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state',"$interval", function ($window, $scope, $location, $rootScope, $localStorage, $state,$interval) {


    $rootScope.currTitle = "忘记密码";


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
            url: myforwardurl(serviceRoot2 + 'user/getmobvalidno?mobile=' + $('#mobile').val(), serviceRoot2),
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


    $("#forgot_submit").click(function () {


        if ($("#validno").val() == "") {
            alert("请输入验证码！");
            return;
        }
        if ($("#password").val() == "") {
            alert("请输入密码！");
            return;
        }

        if ($("#password").val() != $("#password_again").val()) {
            alert("两次输入的密码不一致，请重新输入");
            return;
        }


        maskLayer(1);


        setTimeout(function () {
            $scope.$apply(function () {


                var options = {

                    //url:myforwardurl(serviceRoot+'mk_regist?actiontype=resetpassword',serviceRoot),
                    url: myforwardurl(serviceRoot2 + 'user/registWX?actiontype=resetpassword', serviceRoot2),
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


                        maskLayer(0);
                        if (isok) {
                            alert("修改成功")
                            $location.path("/login/signin").replace();
                            // $rootScope.$apply();
                            $scope.apply();
                        } else {
                            alert(msg)
                        }


                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        maskLayer(0);
                        alert("error");
                    }


                };
                $.ajax(options);
                return false;


            });
        }, 500);


    });


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


    showmenu(false);


}]);

