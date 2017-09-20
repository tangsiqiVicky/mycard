'use strict';

app.controller('MyPublishnosendTicketNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', 'ngTableParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams, ngTableParams) {


    $rootScope.currTitle = "发行卡劵";


    // $scope.shop_id = $stateParams.shop_id;

    $scope.theid = $stateParams.theid;

    $scope.opertype = $stateParams.opertype;



    if ($scope.opertype == "edit") {
        $rootScope.currTitle = "编辑卡券";
        $scope.send=0;

    }else{}

    $("#shop_id").val($scope.shop_id);


//editor begin


    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReady = function () {
        // ...
    };

    $scope.userInfo = {

        avatar: ''

    };
    $scope.removeImage = function () {
        $scope.noImage = true;
    };

    if ($scope.userInfo.avatar == '') {
        $scope.noImage = true;
    }



//editor end


    /*
     $("#shop_id").blur(function(){


     if($("#shop_id").val()==""){alert("请输入商家编号");return;}
     var options = {

     url:myforwardurl(serviceRoot+'mk_main_info?actiontype=checkshopid&shop_id='+$("#shop_id").val()+'&user_id='+user_id,serviceRoot),

     async: false,
     type: 'get',
     dataType: 'jsonp',
     data: $("#f1").serializeArray(),
     resetForm:true,
     timeout:60000,
     jsonp:'callback',
     success: function (rv) {

     var isok=false;
     var msg="";
     $.each(rv.data,function(idx,item){

     if(item.result=="1")
     {
     isok=true;
     }
     else
     {
     msg=item.result_text;
     }
     })

     if(isok){//alert("检查成功")
     }else{alert(msg);$("#shop_id").val("");}




     },
     error: function(XMLHttpRequest, textStatus, errorThrown) {
     alert("当前用户与商家验证失败");
     $("#shop_id").val("");
     }
     };
     $.ajax(options);
     return false;

     });
     */

    $scope.tickettableParams = new ngTableParams({
        page: 1, // show first page
        count: 4// count per page
    }, {
        // total: ticketdata.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            params.total(ticketdata.length);
            $defer.resolve(ticketdata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });



    var ticketdata = [];
    $scope.getticket = function () {

        if($("#shop_id").val()==""){
            myalert("选择商家");
            return;

        }else if($scope.ticket_type==""){
            myalert("选择卡券类型");
            return;

        }else{
            var options = {
                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getticket&User='+user_id+'&shop_id=',serviceRoot),
                url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getticket&ownerStatus=0&User='+user_id+'&shop_id='+$("#shop_id").val()+'&ticket_type='+$scope.ticket_type+'&grantStatus=0', serviceRoot2),
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
                    console.info('rv',rv);
                    if (rv.result == "1") {
                        isok = true;
                        ticketdata = rv.data;

                    }
                    else {
                        msg = rv.result_text;
                    }


                    if (isok) {//alert("获取数据成功")
                        //alert(msg)

                        setTimeout(function () {
                            $scope.$apply(function () {

                                $scope.data = ticketdata;
                                $scope.tickettableParams.reload();

                                $scope.open('asideContent3');
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

    }




    var ticket_id="";
    $scope.getticketById = function (item) {

        $scope.close();
        $scope.ticket_id=ticket_id+=item.ticket_id+',';
        $scope.msg =  $scope.nickname + ",恭喜您获得由"+$scope.shop_name+"提供的"+$scope.ticket_type+"代金劵。请登录微信在名卡公众号，点击会员中心——卡劵查看";

    }


    $("#submit").click(function () {

        if ($scope.opertype == "edit") {
            if ($("#shop_id").val() == "") {
                alert("请输入商家编号");
                return;
            }
            if ($("#ticket_type").val() == "") {
                alert("请输入分类名称");
                return;
            }
            if ($("#isvalid").val() == "") {
                alert("请选择是否有效");
                return;
            }


            var options = {

                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=edit_ticket&theid='+$scope.theid,serviceRoot),
                url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=edit_ticket&theid='+$scope.theid, serviceRoot2),
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

                        setTimeout(function () {
                            $scope.$apply(function () {

                                $location.path("app/wx/me/mypublish_nosendticket");


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
        else {
            var str=$("#owner").val()
            if(str.indexOf("U-")==-1){
                $scope.phone=str;
                $scope.msg = "恭喜您获得由"+$scope.shop_name+"提供的"+$scope.ticket_type+"代金劵。请登录微信在名卡公众号，点击会员中心——卡劵查看";

            }

            var options = {
                url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=fafang_ticket&owner='+$("#owner").val()+"&ticket_ids="+$("#ticket_id").val(), serviceRoot2),
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
                                $location.path("app/wx/me/mypublish_nosendticket");


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


    });





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



    $scope.data = [];

    if ($scope.opertype == "edit") {

//load data
        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getticket&theid='+$scope.theid+'&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getticket&theid='+$scope.theid+'&user_id='+user_id+'&grantStatus=0',serviceRoot2),
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


                if (rv.result == "1") {
                    isok = true;

                    $.each(rv.data, function (idx, item) {
                        $scope.id = item.id;
                        $scope.sortno = item.sortno;
                        $scope.key = item.key;
                        $scope.ticket_id = item.ticket_id;
                        $scope.shop_id = item.shop_id;
                        $scope.shop_name = item.shop_name;
                        $scope.b_date = item.b_date;
                        $scope.e_date = item.e_date;
                        $scope.isvalid = item.isvalid;
                        $scope.owner = item.owner;
                        $scope.isused = item.isused;
                        $scope.amount = item.amount;
                        $scope.rate = item.rate;
                        $scope.points = item.points;
                        $scope.ticket_type = item.ticket_type;
                        $scope.maker = item.maker;
                        $scope.make_date = item.make_date;
                        $scope.fafang_date = item.fafang_date;
                        $scope.use_date = item.use_date;
                        $scope.po_id = item.po_id;
                        $scope.product_no = item.product_no;
                        $scope.product_qty = item.product_qty;
                        $scope.remark = item.remark;

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




    $scope.getshop = function (item) {
        $scope.close();
        $("#shop_id").val(item.shop_id);
        $("#ticket_type").val("");

    }
    $scope.ticket_type="";
    $scope.gettickettypeact = function (item) {
        $scope.close();
        $scope.ticket_type=item.ticket_type;
        $scope.shop_name=item.shop_name;
        $("#ticket_type").val(item.ticket_type);
         // $scope.getticket();

    }


    $scope.open = function (id) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w*0.9,
            height: page_h*0.9,
            target: id,
            container: ""
            //hidebyclickbg:"false"
        });

        $("#getshop_modal-body").css("height", (page_h*0.9 - 130) + "px");
        $("#gettype_modal-body").css("height", (page_h*0.9 - 130) + "px");

    }


//func_obj=$scope.open;


    $scope.close = function () {
        $.closePopupLayer();

    }





    var phones="";
    $scope.phone="";
    $scope.nickname="";
    $scope.getuserid = function (item) {
        $scope.close();
        $scope.nickname=item.nickname;
        $scope.phone=item.phone
        phones='U-'+item.phone;
        $("#owner").val(phones);

        $scope.msg =  item.nickname + ",恭喜您获得由"+$scope.shop_name+"提供的"+$scope.ticket_type+"代金劵。请登录微信在名卡公众号，点击会员中心——卡劵查看";

    }


    $scope.close = function() {
        $.closePopupLayer("myStaticPopup");
    }
    //创建变量用来保存选中结果
    $scope.selected = [];
    var updateSelected = function (action, id) {
        if (action == 'add' && $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
        if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
    };
    //更新某一列数据的选择
    $scope.updateSelection = function ($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
    };
    //全选操作
    $scope.selectAll = function ($event) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        for (var i = 0; i < $scope.data.length; i++) {
            var contact = $scope.data[i];
            updateSelected(action, contact.ticket_id);
        }
    };
    $scope.isSelected = function (id) {
        return $scope.selected.indexOf(id) >= 0;
    };
    $scope.isSelectedAll = function () {
        return $scope.selected.length === $scope.data.length;
    };

    var strticket;
    $scope.sure = function () {
        $.closePopupLayer();
        strticket = $scope.selected.join(",");
        $scope.ticket_id= strticket;

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
                                count: 8// count per page
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



    var data = [];




    var shop_id = "";
    var thegetshop_id = "autogetbyuser";
    if (user_id == "admin") {
        thegetshop_id = "-1";
    }

    $scope.getshops = function () {
        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getshops&User='+user_id+'&shop_id='+thegetshop_id+'&visible=-1&shop_type=-1',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=getshops&user_id=' + user_id + '&shop_id=' + thegetshop_id + '&visible=-1&shop_type=-1', serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            // jsonp:'callback',
            success: function (rv) {

                var isok = false;
                var msg = "";


                if (rv.result == "1") {
                    isok = true;

                    data = rv.data;

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
                                count: 8// count per page
                            }, {
                                total: data.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            });
                            $scope.tableParams.reload();

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



    $scope.getshops();


    var data2 = [];

    $scope.tableParams2 = new ngTableParams({
        page: 1, // show first page
        count: 10// count per page
    }, {
        total: data2.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            $defer.resolve(data2.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.gettickettype = function () {

        if ($("#shop_id").val() == "") {
            alert("请先选择商家");
            return;
        }

        data2 = [];

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=gettickettype&User='+user_id+'&shop_id='+$("#shop_id").val(),serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=gettickettype&user_id=' + user_id + '&shop_id=' + $("#shop_id").val(), serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            // jsonp:'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";

                if (rv.result == "1") {
                    isok = true;


                    $.each(rv.data, function (idx, item) {
                        var thetab = {};
                        thetab.id = item.id;
                        thetab.key = item.key;
                        thetab.shop_id = item.shop_id;
                        thetab.shop_name = item.shop_name;
                        thetab.ticket_type = item.ticket_type;

                        data2.push(thetab);


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {


                            $scope.tableParams2.reload();


                            $scope.open('asideContent2');


                        });
                    }, 500);

                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                alert("无分类")
            }


        };
        $.ajax(options);
    }


}]);


$(function ($) {

    loadwxjs();

});

app.filter('textLengthSet', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');//'...'可以换成其它文字
    };
})

