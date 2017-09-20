'use strict';

app.controller('InviteCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$aside', 'ngTableParams', '$http', "SweetAlert",function ($window, $scope, $location, $rootScope, $localStorage, $state, $aside, ngTableParams, $http,SweetAlert) {

    $rootScope.currTitle = "邀请";

    var myOut = function (str) {
        if (str == null || str == "") {
            str = "ISNULLREP*@@!ISNULLREP";
        }
        str = str.split("*@@!")[1].replace("ISNULLREP", "");
        return str;
    }


    $scope.invite_title = "";
    $scope.invite_url = "";


    $scope.getqrcode = function () {
        //if($("#invited").val()==""){alert("请输入受邀请者手机号码！");return;}
        $("#invited").val($("#invited").val().replace(/ /g, ""));


        setTimeout(function () {
            $scope.$apply(function () {
                //var options = {
                //		url:myforwardurl(serviceRoot+"mk_main_info?actiontype=get_invite_sms_validno&invitor="+user_id+"&invited="+$("#invited").val(),serviceRoot),
                //		async: false,
                //		type: 'get',
                //		dataType: 'jsonp',
                //		data: $("#f1").serializeArray(),
                //		resetForm:true,
                //		timeout:60000,
                //		jsonp:'callback',
                //		success: function (rv) {
                var isok = false;
                var msg = "";
                var invitor = "";


                //			   if(rv.result=="1")
                //				{
                isok = true;
                msg = user_id + "-v-" + $("#invited").val();//rv.result_text;
                invitor = $rootScope.user.nickname + "[" + user_id + "]";//rv.invitor;
                //				}

                var the_invite_sms_validno = msg;
                var the_invite_url = serviceRoot + "html5/v.html?v=" + the_invite_sms_validno;
                if ($("#invited").val() == "") {
                    the_invite_url = "http://www.mycard.top/h5-js/html5/login.html?theinvitor=" + user_id;
                }
                $scope.invite_url = the_invite_url;
                $scope.invite_title = invitor + "邀请您加入名卡联盟[注册有礼送10元名卡币]，请关注微信公众号:名卡联盟";

                var tiaozhuanurl = "http://www.mycard.top/h5-js/html5/v.html?v=" + the_invite_sms_validno
                if ($("#invited").val() == "") {
                    tiaozhuanurl = "http://www.mycard.top/h5-js/html5/v.html?theinvitor=" + user_id;
                }


                var the_invite_qrcode_validno = encodeURI(the_invite_url)
                $scope.invite_qrcode_validno = the_invite_qrcode_validno

                $("#qrcode").attr("src", serviceRoot + "qrcode?msg=" + the_invite_qrcode_validno + "&width=200&height=200");

                $scope.getqrcode_main(tiaozhuanurl, invitor);


                //		},
                //		error: function(XMLHttpRequest, textStatus, errorThrown) {
                //			   maskLayer(0);

                //			 }
                //	};
                //	$.ajax(options);
                //	return false;


            });
        }, 500);


    }


    $scope.getqrcode_main = function (tiaozhuanurl, invitor) {

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getshorturl&url=' + tiaozhuanurl, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getshorturl&url=' + tiaozhuanurl, serviceRoot2),
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
                var shorturl = "";
                if (rv.result == "1") {
                    isok = true;
                    msg = rv.result_text;

                    $.each(rv.data, function (idx, item) {
                        shorturl = item.shorturl;
                    })

                }

                if (isok) {

                    $("#sms_msg").val("查看：http://1dao7.cn/t/" + shorturl + "。" + invitor + "邀请您加入名卡联盟[注册有礼送10元名卡币]，或关注公众号:名卡联盟，品质生活即将开启。。。【名卡联盟】");
                    $scope.tofriend();
                    $scope.tofriendall();
                    $scope.toqq();
                    $scope.toqqzone();
                    $scope.toweibo();

                }
                else {
                    alert("获取短网址失败")
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);

    }


    $("#invited").blur(function () {

        setTimeout(function () {
            $scope.$apply(function () {
                //if($("#invited").val()==""){$("#qrcode").attr("src","");$("#invited").focus();return;}

            });
        }, 500);

        $scope.getqrcode();

    });


    $("#invited").keyup(function () {

        $("#invited").val($("#invited").val().replace(/ /g, ""));

        if ($("#invited").val().length == 11) {
            $scope.getqrcode();
        }
        else {
            $("#sms_msg").val("");
            $("#qrcode").attr("src", "");

        }

    });


    var issending = 0;

    $("#sms_submit").click(function () {

        if ($("#invited").val() == "") {
            alert("请输入受邀请者手机号码！");
            return;
        }
        if ($("#sms_msg").val() == "") {
            alert("请输入邀请信息内容！");
            return;
        }


        if (issending == 1) {
            alert("正在发送，请稍候。。。");
            return;
        }

        issending = 1;

        //alert(myforwardurl('&actiontype=sendsms&mobile='+$("#invited").val(),publicRoot));

        maskLayer(1);

        setTimeout(function () {
            $scope.$apply(function () {
                var options = {

                    //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=sendsms&mobile=' + $("#invited").val(), serviceRoot),
                    url: myforwardurl(serviceRoot2 + 'user/mainUser?actiontype=sendsms&mobile=' + $("#invited").val(), serviceRoot2),
                    async: false,
                    type: 'get',
                    dataType: 'json',
                    data: $("#f1").serializeArray(),
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
                            alert("邀请已发送。。。");
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


            });
        }, 500);

    });


    $scope.tofriendORall = function () {

        if ($("#invited").val() == "") {
            alert("请输入受邀请者手机号码！");
            return;
        }
        if ($("#sms_msg").val() == "") {
            alert("请输入邀请信息内容！");
            return;
        }

        $scope.tofriend();
        $scope.tofriendall();
        $scope.toqq();
        $scope.toqqzone();
        $scope.toweibo();
        alert("请选择右上角菜单：分享至朋友或朋友圈，进行分享");
    }


    $scope.tofriendall = function ()//朋友圈
    {
        var pageTitle = $scope.invite_title;
        var pageUrl = $scope.invite_url;


        pageUrl = "http://www.mycard.top/h5-js/html5/login.html?theinvitor=" + user_id;


        wx.onMenuShareTimeline({
            title: "万能的朋友圈啊，" + pageTitle, // 分享标题
            link: pageUrl, // 分享链接
            imgUrl: 'http://www.mycard.top/h5-js/html5/standard/assets/images/just_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                setTimeout(function () {
                    $rootScope.logit(user_id, 'invite', pageUrl, $rootScope.currTitle);
                }, 2000);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            fail: function (res) {
                alert("分享失败，请重新尝试");
            }
        });

    }


    $scope.tofriend = function ()//朋友
    {

        var pageTitle = $scope.invite_title;
        var pageUrl = $scope.invite_url;
        pageUrl = pageUrl.replace(/\&/g, '%26');

        if ($("#invited").val() == "") {
            pageUrl = "http://www.mycard.top/h5-js/html5/login.html?theinvitor=" + user_id;
        }

        wx.onMenuShareAppMessage({
            title: "我亲爱的朋友[" + $("#invited").val() + "]，" + pageTitle, // 分享标题
            desc: '邀请您加入名卡联盟[注册有礼送10元名卡币]，或关注公众号：名卡联盟', // 分享描述
            link: pageUrl, // 分享链接
            imgUrl: 'http://www.mycard.top/h5-js/html5/standard/assets/images/just_logo.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                if ($("#invited").val() != "") {
                    setTimeout(function () {
                        $rootScope.logit(user_id, 'invite', $("#invited").val(), $rootScope.currTitle);
                    }, 2000);
                }
                setTimeout(function () {
                    $rootScope.logit(user_id, 'invite', pageUrl, $rootScope.currTitle);
                }, 2000);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });


    }


    $scope.toqq = function ()//QQ
    {
        var pageTitle = $scope.invite_title;
        var pageUrl = $scope.invite_url;


        pageUrl = "http://www.mycard.top/h5-js/html5/login.html?theinvitor=" + user_id;


        wx.onMenuShareQQ({
            title: "亲爱的的QQ，" + pageTitle, // 分享标题
            desc: '邀请您加入名卡联盟[注册有礼送10元名卡币]，或关注公众号：名卡联盟', // 分享描述
            link: pageUrl, // 分享链接
            imgUrl: 'http://www.mycard.top/h5-js/html5/standard/assets/images/just_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                setTimeout(function () {
                    $rootScope.logit(user_id, 'invite', pageUrl, $rootScope.currTitle);
                }, 2000);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            fail: function (res) {
                alert("分享失败，请重新尝试");
            }
        });

    }


    $scope.toqqzone = function ()//QQ
    {
        var pageTitle = $scope.invite_title;
        var pageUrl = $scope.invite_url;


        pageUrl = "http://www.mycard.top/h5-js/html5/login.html?theinvitor=" + user_id;


        wx.onMenuShareQZone({
            title: "万能的QQ空间啊，" + pageTitle, // 分享标题
            desc: '邀请您加入名卡联盟[注册有礼送10元名卡币]，或关注公众号：名卡联盟', // 分享描述
            link: pageUrl, // 分享链接
            imgUrl: 'http://www.mycard.top/h5-js/html5/standard/assets/images/just_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                setTimeout(function () {
                    $rootScope.logit(user_id, 'invite', pageUrl, $rootScope.currTitle);
                }, 2000);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            fail: function (res) {
                alert("分享失败，请重新尝试");
            }
        });

    }


    $scope.toweibo = function ()//QQ
    {
        var pageTitle = $scope.invite_title;
        var pageUrl = $scope.invite_url;


        pageUrl = "http://www.mycard.top/h5-js/html5/login.html?theinvitor=" + user_id;


        wx.onMenuShareWeibo({
            title: "万能的围脖啊，" + pageTitle, // 分享标题
            desc: '邀请您加入名卡联盟[注册有礼送10元名卡币]，或关注公众号：名卡联盟', // 分享描述
            link: pageUrl, // 分享链接
            imgUrl: 'http://www.mycard.top/h5-js/html5/standard/assets/images/just_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                setTimeout(function () {
                    $rootScope.logit(user_id, 'invite', pageUrl, $rootScope.currTitle);
                }, 2000);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            fail: function (res) {
                alert("分享失败，请重新尝试");
            }
        });

    }


    var data = [];

    $scope.getlxr = function () {


        var options = {
            // url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getlxr&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'invite/invitelxr?actiontype=getlxr&user_id=' + user_id, serviceRoot2),
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
                console.info('lxr',rv);

                if (rv.result == "1") {
                    isok = true;

                    $.each(rv.data, function (idx, item) {
                        var thetab = {};
                        thetab.sortno = item.sortno;
                        thetab.key = item.key;
                        thetab.id = item.id;
                        thetab.lxr = item.lxr;
                        thetab.tel = item.tel;
                        thetab.remark = item.remark;

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

                            $scope.tableParams = new ngTableParams({
                                page: 1, // show first page
                                count: 20 // count per page
                            }, {
                                total: data.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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


    /*
     $scope.openAside = function (position) {

     var thescope=$scope;

     setTimeout(function() {
     $scope.$apply(function() {


     $aside.open({
     templateUrl: 'asideContent',
     placement: position,
     size: 'sm',
     backdrop: true,
     controller: function ($scope, $modalInstance) {

     $scope.ok = function (e) {
     $modalInstance.close();
     e.stopPropagation();
     };
     $scope.cancel = function (e) {
     $modalInstance.dismiss();
     e.stopPropagation();
     };

     $scope.gettel=function (tel,e) {
     thescope.gettel(tel);
     $modalInstance.dismiss();
     e.stopPropagation();
     };




     }
     },thescope);


     });
     },500);


     }
     */


    $scope.gettel = function (tel, e) {
        $scope.gettel(tel);
    };


    $scope.downloadit = function () {
        window.location = "http://www.mycard.top/h5-js/html5/download.html";
    }

    $scope.newlxr = function () {


        if ($("#lxr").val() == "") {
            alert("请输入姓名");
            return;
        }
        if ($("#tel").val() == "") {
            alert("请输入手机号码");
            return;
        }


        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=addlxr&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'invite/invitelxr?actiontype=addlxr&user_id=' + user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f2").serializeArray(),
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

                    setTimeout(function () {
                        $scope.$apply(function () {


                            $scope.data.push({
                                'sortno': '',
                                'key': '',
                                'id': '',
                                'lxr': $("#lxr").val(),
                                'tel': $("#tel").val(),
                                'remark': ''
                            });

                            $scope.tableParams.reload();

                        });
                    }, 500);


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


    $scope.removerow = function (theid) {

        var index = -1;
        var comArr = $scope.data;
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].key === theid) {
                index = i;

                break;
            }
        }

        if (index === -1) {
            alert("找不到行");
        }

        if (index > -1) {
            $scope.data.splice(index, 1);
        }

    }


    $scope.delit = function (theid) {
        $scope.close();
        SweetAlert.swal({
            title: "确定删除联系人吗?",
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


    $scope.delitact = function (key) {

        if (key == "") {
            alert("请选择");
            return;
        }


        var options = {

            // url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=dellxr&theid=' + key, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'invite/invitelxr?actiontype=dellxr&theid=' + key, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f2").serializeArray(),
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

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.removerow(key);

                            $scope.tableParams.reload();


                        });
                    }, 500);


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


    $scope.gettel = function (tel) {
        $scope.close();
        $("#invited").val(tel);
        $scope.getqrcode();

    }


    $scope.open = function (id) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w * 0.9,
            height: page_h * 0.9,
            target: id,
            container: ""
            //hidebyclickbg:"false"
        });

    }


//func_obj=$scope.open;


    $scope.close = function () {
        $.closePopupLayer();

    }


    $scope.back = function () {
        $window.history.back();
    }




$scope.gotologin = function () {

$location.url("/login/signin?fromurl="+$location.path());

 }




if(user_id==""){$scope.gotologin();return;}
else
{

     setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);

    $scope.getlxr();

    loadwxjs();


    $scope.getqrcode();
    /*
     $scope.tofriend();
     $scope.tofriendall();
     $scope.toqq();
     $scope.toqqzone();
     $scope.toweibo();
     */
}

   


}]);

