'use strict';


app.controller('MyPublishnosendTicketCtrl', ["$window", "$scope", "$rootScope", "$location", "ngTableParams", "SweetAlert", function ($window, $scope, $rootScope, $location, ngTableParams, SweetAlert) {

    var data = [];

    $rootScope.currTitle = "未发行卡券";

    var shop_id = "";


    $scope.getticket = function () {
        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getticket&User='+user_id+'&shop_id=',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getticket&User='+user_id+'&shop_id=&grantStatus=0', serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            //jsonp: 'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";
                if (rv.result == "1") {
                    isok = true;


                    $.each(rv.data, function (idx, item) {
                        var thetab = {};
                        thetab.id = item.id;
                        thetab.sortno = item.sortno;
                        thetab.key = item.key;
                        thetab.ticket_id = item.ticket_id;
                        thetab.shop_id = item.shop_id;
                        thetab.shop_name = item.shop_name;
                        thetab.b_date = item.b_date;
                        thetab.e_date = item.e_date;
                        thetab.isvalid = item.isvalid;
                        thetab.owner = item.owner;
                        thetab.isused = item.isused;
                        thetab.amount = item.amount;
                        thetab.rate = item.rate;
                        thetab.points = item.points;
                        thetab.ticket_type = item.ticket_type;
                        thetab.maker = item.maker;
                        thetab.make_date = item.make_date;
                        thetab.fafang_date = item.fafang_date;
                        thetab.use_date = item.use_date;
                        thetab.po_id = item.po_id;
                        thetab.img = item.img;
                        thetab.product_no = item.product_no;
                        thetab.product_qty = item.product_qty;
                        thetab.remark = item.remark;


                        data.push(thetab);


                        shop_id = item.shop_id;

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
                            $scope.shop_id = shop_id;

                            $scope.tableParams = new ngTableParams({
                                page: 1, // show first page
                                count: 8// count per page
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


    $scope.getticket();


    $scope.newact = function () {
        $location.url("app/wx/me/mypublish_nosendticket_new?shop_id=" + shop_id);
    }


    $scope.editit = function (theid) {
        $location.url("app/wx/me/mypublish_nosendticket_new?theid=" + theid + "&opertype=edit");
    }


    $scope.delit = function (theid) {
        $(".dropdown-menu").css('display','none');
        SweetAlert.swal({
            title: "确定删除卡券吗?",
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


    $scope.removerow = function (theid) {

        var index = -1;
        var comArr = data;
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].ticket_id === theid) {
                index = i;

                break;
            }
        }

        if (index === -1) {
            alert("找不到行");
        }

        if (index > -1) {
            data.splice(index, 1);
        }


        $scope.data = data;
    }


    $scope.delitact = function (theid) {
        maskLayer(1);

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=del_ticket&theid='+theid,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=del_ticket&ticket_ids='+theid, serviceRoot2),
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
                console.info('rv',rv);
                if (rv.result == "1") {
                    isok = true;
                    msg = rv.result_text;
                }
                else {
                    msg = rv.result_text;
                }



                if (isok) {
                    //alert("获取数据成功")


                    maskLayer(0);

                    $scope.removerow(theid);
                    $scope.tableParams.reload();



                } else {
                    alert(msg);
                }



            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);

    }


    $scope.back = function () {
        $window.history.back();
    }



    $scope.ticket_id;
    $scope.ticket_type;
    $scope.open = function (id,item) {

        $(".dropdown-menu").css('display','none');
        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w*0.9,
            height: page_h*0.9,
            target: id,
            container: ""
            //hidebyclickbg:"false"
        });

        $scope.ticket_id=item.ticket_id;
        $scope.ticket_type=item.ticket_type;
        $scope.shop_name=item.shop_name;
        $("#getshop_modal-body").css("height", (page_h*0.9 - 130) + "px");
        $("#gettype_modal-body").css("height", (page_h*0.9 - 130) + "px");

    }

    $scope.close = function() {
        $.closePopupLayer("myStaticPopup");
    }

    //faxing
    $scope.phone="";
    var phones="";
    $scope.msg="";
    $scope.nickname="";
    $scope.getuserid = function (item) {
        $.closePopupLayer();
        SweetAlert.swal({
            title: "确定发行卡券吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                $scope.phone=item.phone;
                phones='U-'+item.phone;
                $scope.nickname=item.nickname;
                $scope.msg =  $scope.nickname + ",恭喜您获得由"+$scope.shop_name+"提供的"+$scope.ticket_type+"。请登录微信在名卡公众号，点击会员中心——卡劵查看。";

                $scope.sendticket(phones,$scope.ticket_id);
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


    $scope.sendticket=function (owner,ticket_id) {
        var options = {
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=fafang_ticket&owner='+owner+"&ticket_ids="+ticket_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data:null,
            resetForm: true,
            timeout: 60000,
            // jsonp:'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";
                $.closePopupLayer();
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
                            $scope.sendsms();
                            $scope.removerow(ticket_id);
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
    }

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

                console.info('rv',rv);
                maskLayer(0);

                var isok = false;
                var msg = "";

                if (rv.result == "1") {
                    isok = true;
                    msg = rv.result_text;
                }

                if (isok) {
                    alert("发行成功");




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
    var userdata=[];
    $scope.getuser = function () {
        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getshops&User='+user_id+'&shop_id='+thegetshop_id+'&visible=-1&shop_type=-1',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'user/mainUser?actiontype=getAllUser', serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            // jsonp:'callback',
            success: function (rv) {
                console.info('rv',rv);
                var isok = false;
                var msg = "";
                isok = true;

                userdata = rv.data;

                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.userdata = userdata;
                            $scope.tableParamsuser = new ngTableParams({
                                page: 1, // show first page
                                count: 10 // count per page
                            }, {
                                total: userdata.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(userdata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            });
                            $scope.tableParamsuser.reload();

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


    $scope.getuser();


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);



}]);





