'use strict';

app.controller('RegCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$cookieStore', '$stateParams',"$interval", function ($window, $scope, $location, $rootScope, $localStorage, $cookieStore, $stateParams,$interval) {

    $scope.theinvitor = $stateParams.theinvitor;

    $rootScope.currTitle = "注册";


    var issending = 0;

   
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
            url: myforwardurl(serviceRoot2 + 'user/getmobvalidno?mobile=' + $('#phone').val(), serviceRoot2),
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
    // $scope.getsmscode = function () {
    //
    //
    //     maskLayer(1);
    //
    //
    //     issending = 1;
    //
    //
    //     setTimeout(function () {
    //         $scope.$apply(function () {
    //
    //
    //             //alert(myforwardurl('&actiontype=getmobvalidno&mobile='+f1.mobile.value))
    //             var options = {
    //                 //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getmobvalidno&mobile=' + $("#phone").val(), serviceRoot),
    //                 url: myforwardurl(serviceRoot2 + 'user/getmobvalidno?mobile=' + $('#phone').val(), serviceRoot2),
    //                 async: false,
    //                 type: 'get',
    //                 dataType: 'json',
    //                 data: null,
    //                 resetForm: true,
    //                 timeout: 60000,
    //                 success: function (rv) {
    //
    //
    //                     maskLayer(0);
    //                     // if (rv.result == "1") {
    //                     //     alert("验证码已发送，请注意查收。。。");
    //                     // }
    //
    //                     issending = 0;
    //
    //                 },
    //                 error: function (XMLHttpRequest, textStatus, errorThrown) {
    //
    //                     maskLayer(0);
    //                     // alert("获取验证码失败，请检查短信网关");
    //                     issending = 0;
    //                 }
    //
    //
    //             };
    //             $.ajax(options);
    //             return false;
    //
    //
    //         });
    //     }, 500);
    //
    // }


    $("#invite_code").blur(function () {


        if ($("#invite_code").val() == "") {
            alert("邀请人手机号或编号或商家编号或者短信邀请码,如果没有就留空");
            return;
        }
        var options = {

            //url: myforwardurl(serviceRoot + 'mk_regist?actiontype=searchinvite&invite_code=' + $("#invite_code").val(), serviceRoot),
            url: myforwardurl(serviceRoot2+'user/registWX?actiontype=searchinvite&invite_code=' + $("#invite_code").val(), serviceRoot2),
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

                if (isok) {
                } else {
                    alert(msg);
                    $("#invite_code").val("");
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("邀请人手机号或者商家邀请码，验证失败");
                $("#invite_code").val("");
            }
        };
        $.ajax(options);
        return false;

    });


    $scope.agree_value = true;


    $("#reg_submit").click(function () {

        $("#phone").val($("#phone").val().replace(/ /g, ""));

        var thephone = $("#phone").val();

//if($("#invite_code").val()==""){alert("请输入邀请人手机号或者商家邀请码");return;}
        if (thephone == "") {
            alert("请输入手机号！");
            return;
        }
        if (thephone.length != 11) {
            alert("手机号有误！");
            return;
        }
//if($("#password").val()==""){alert("请输入密码！");return;}
        if ($("#agree").val() != "true") {
            alert("请同意会员认证协议");
            return;
        }

        if ($("#validno").val() == "") {
            alert("请输入验证码！");
            return;
        }
        $("#password").val("");
        $("#password_again").val("");
        //if($("#password").val()!=$("#password_again").val()){alert("两次输入的密码不一致，请重新输入");return;}


        maskLayer(1);


        setTimeout(function () {
            $scope.$apply(function () {

                var options = {

                    //url: myforwardurl(serviceRoot + 'mk_regist?actiontype=register&issms=1', serviceRoot),
                    url: myforwardurl(serviceRoot2+'user/registWX?actiontype=register&issms=1', serviceRoot),
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
                        var uid = "";
                        var pwd = "";
                        $.each(rv.data, function (idx, item) {

                            if (item.result == "1") {
                                isok = true;
                                uid = item.uid;
                                pwd = item.pwd;
                            }
                            else {
                                msg = item.result_text;
                            }
                        })


                        maskLayer(0);

                        if (isok) {
                            alert("注册成功")

                            setTimeout(function () {
                                $scope.$apply(function () {

                                    $location.url("/login/signin?uid=" + uid + "&pwd=" + pwd + "&isreglogin=1");


                                });
                            }, 500);


                        } else {
                            alert(msg);
                        }


                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        maskLayer(0);
                        alert("注册失败");
                    }


                };
                $.ajax(options);
                return false;


            });
        }, 500);

    });


    try {
        showmenu(false);
    } catch (e) {
    }


    if ($scope.theinvitor != null && $scope.theinvitor != undefined && $scope.theinvitor != "") {
        //alert("regCtrl:"+$scope.theinvitor)
        setTimeout(function () {
            $("#invite_code").val($scope.theinvitor);
        }, 1000);
    }


    $scope.openlaw = function (id) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w * 0.9,
            height: page_h * 0.9,
            target: id,
            container: ""
            //hidebyclickbg:"false"
        });

    }


    $scope.closelaw = function () {
        $.closePopupLayer();

    }


    $("#validno").val("");


}]);

