'use strict';

app.controller('MyPublishTicketNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', 'ngTableParams','$filter', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams, ngTableParams,$filter) {


    $rootScope.currTitle = "新建卡券";


    $scope.shop_id = $stateParams.shop_id;

    $scope.theid = $stateParams.theid;

    $scope.opertype = $stateParams.opertype;

    $scope.maker=user_id;
    $scope.make_date=$filter('date')(new Date(), "yyyy-MM-dd");


    if ($scope.opertype == "edit") {
        $rootScope.currTitle = "编辑卡券";
    }

    $("#shop_id").val($scope.shop_id);


//editor begin


    $scope.endOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startOpened = false;
        $scope.endOpened = !$scope.endOpened;
    };
    $scope.startOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endOpened = false;
        $scope.startOpened = !$scope.startOpened;
    };


    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReady = function () {
        // ...
    };


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

    //获取产品列表
    $scope.getproducts = function() {
        var options = {
            //url: myforwardurl(serviceRoot + 'x5_main_info?actiontype=get_products&shop_id=S-kxnc', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'x5/snsoft?actiontype=getX5_products&shop_id='+$scope.shop_id, serviceRoot2),
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function(rv) {
                var isok = false;
                var msg = "";
                if(rv.result == "1") {
                    isok = true;
                    $scope.shopdatas = rv.data;

                } else {
                    msg = rv.result_text;
                }
                if(isok) {



                    $scope.open('asideContent3');
                    // setTimeout(function() {
                    //     $scope.$apply(function() {
                    //         $scope.shopdatas = data;
                    //
                    //     });
                    // }, 500);
                } else {
                    alert(msg)
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // alert("获取数据失败。。。。。。")

            }

        };
        $.ajax(options);

    }



    $("#submit").click(function () {

        $scope.b_date=$filter('date')($scope.b_date, "yyyy-MM-dd");
        $scope.e_date=$filter('date')($scope.e_date, "yyyy-MM-dd");
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

                                $location.path("app/wx/me/mypublish_ticket");


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

                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=add_ticket',serviceRoot),
                url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=add_ticket', serviceRoot2),
                async: false,
                type: 'get',
                dataType: 'json',
                data: $("#f1").serializeArray(),
                resetForm: true,
                timeout: 60000,
                // jsonp:'callback',
                success: function (rv) {
                    console.info('add_ticket', rv);
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

                                $location.path("app/wx/me/mypublish_ticket");


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





    $scope.data = [];

    if ($scope.opertype == "edit") {

//load data
        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getticket&theid='+$scope.theid+'&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getticket&theid='+$scope.theid+'&user_id='+user_id,serviceRoot2),
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
                        $scope.img = item.img;
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


    $scope.chooseimg = function (theinputid) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId = res.localIds;
                //alert('已选择 ' + res.localIds.length + ' 张图片');


                var i = 0, length = images.localId.length;
                images.serverId = [];
                function upload() {
                    wx.uploadImage({
                        localId: images.localId[i],
                        success: function (res) {
                            i++;
                            //alert('已上传：' + i + '/' + length);
                            images.serverId.push(res.serverId);
                            if (i < length) {
                                upload();
                            }
                            else {
                                var allserverId = "";
                                for (var k = 0; k < images.serverId.length; k++) {
                                    allserverId = allserverId + images.serverId[k] + "~~X";
                                }
                                if (allserverId != "") {
                                    allserverId = allserverId.substring(0, allserverId.length - 3);
                                }
                                $scope.allserverId = allserverId;

                                $scope.uploadimg(theinputid, allserverId);
                            }
                        },
                        fail: function (res) {

                            alert(JSON.stringify(res));
                        }
                    });
                }

                upload();

            }
        });


    }




    $scope.uploadimg = function (theinputid, allserverId) {

        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=uploadimg&allserverId='+allserverId+'&user_id='+user_id+'&path=product',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=product', serviceRoot2),
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


                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {

                    setTimeout(function () {
                        $scope.$apply(function () {


                           if (theinputid == "img") {
                                $scope.img = rv.uploadfilepath;
                                $("#previewimg_" + theinputid).attr("src", serviceRoot + rv.uploadfilepath);
                            }


                        });
                    }, 500);


                } else {
                    alert(msg);
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);


    }


    $scope.getshop = function (shopid) {
        $scope.close();
        $("#shop_id").val(shopid);
        $("#ticket_type").val("");
    }

    $scope.gettickettypeact = function (ticket_type) {
        $scope.close();
        $("#ticket_type").val(ticket_type);

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


    var product_nos="";
    $scope.buyAction = function (item) {
        $scope.close();
        product_nos+=item.product_no+',';
        // $("#product_no").val(product_nos);
        $scope.product_no=(product_nos.substr(0,product_nos.length-1)).split(',');

    }



    var phones="";
    $scope.getuserid = function (item) {
        $scope.close();
        phones+='U-'+item.phone+',';
        $("#owner").val(phones);
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
    var datashop = [];
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

                    datashop = rv.data;

                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.data = datashop;
                            $scope.tableParamsShop = new ngTableParams({
                                page: 1, // show first page
                                count: 8// count per page
                            }, {
                                total: datashop.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(datashop.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            });
                            $scope.tableParamsShop.reload();

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
        count: 5 // count per page
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
            // url:myforwardurl(serviceRoot+'mk_main_info?actiontype=gettickettype&User='+user_id+'&shop_id='+$("#shop_id").val(),serviceRoot),
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
