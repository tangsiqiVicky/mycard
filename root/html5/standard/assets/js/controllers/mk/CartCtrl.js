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
                        //alert("微信支付成功");
                        var isok = false;
                        var msg = "";
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {}
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


app.controller('CartCtrl', ["$window", "$scope", "$rootScope", "$location", "ngTableParams", "SweetAlert","$filter", function ($window, $scope, $rootScope, $location, ngTableParams, SweetAlert,$filter) {

    scope = $scope;


    $rootScope.currTitle = "购物车";
    menuid = "cart_man";

    var data = [];
    var cartnum = 0
    var cartamount = 0;
    var discount_amount = 0;

    $scope.addrshow_flag = false;
    $scope.liuyanshow_flag = false;
    $scope.ticket_num=0;

    $scope.showhide_addr = function () {
        $scope.addrshow_flag = !$scope.addrshow_flag;
    }


    $scope.isShow = false;












    $scope.slidesimggroup = [];
    $scope.tableParams3 = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
        total: $scope.slidesimggroup.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            $defer.resolve($scope.slidesimggroup.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });






    $scope.setEditId = function () {
        $scope.isShow = !$scope.isShow;
    };






    //房间价格详情
    $scope.roomdetails = function (dateprice) {

        $.openPopupLayer({
            name: "roomcontent",
            width: page_w,
            height: page_h * 0.6,
            target: "roomcontent",
            container: ""
        });
        $scope.dateprice=dateprice;
        $("#roomcontent-body1").css("height", (page_h * 0.6 - 120) + "px");
        // $("#asideContent1").css("height", (page_h * 0.6 - 120) + "px");

    }


    $scope.produt_no="";
    var flag=false;
    //使用优惠券
    $scope.getticket = function (thekey,product_no) {


        if($scope.selected==""){
            alert("选择商品");
        }else{
            $.openPopupLayer({
                name: "asideContentticket",
                width: page_w,
                height: page_h * 0.6,
                target: "asideContentticket",
                container: ""
            });


            $("#modal-body3").css("height", (page_h*0.6 - 130) + "px");
            if($scope.thekey==thekey){
                flag=false;
            }else {
                flag=true;
            }

            if(flag){

                $scope.product_no=product_no;
                $scope.thekey=thekey;

                getmyticket(thekey,product_no);


            }else{


            }
        }






    }





    $scope.removerow = function (theid) {
        var r = -1;

        var alldata = data;
        for (var m = 0; m < alldata.length; m++) {

            var index = -1;
            var comArr = alldata[m].data;
            for (var i = 0; i < comArr.length; i++) {
                if (comArr[i].key === theid) {
                    index = i;

                    break;
                }
            }

            //if( index === -1 ) {
            //	alert( "找不到行" );
            //}

            if (index > -1) {
                data[m].data.splice(index, 1);
            }

            if (data[m].data.length == 0) {
                r = m;
            }


        }


        if (r > -1) {
            data.splice(r, 1);
        }

        if (data.length == 0) {
            $scope.isEmpty = "true";
        } else {
            $scope.isEmpty = "false";
        }

    }

    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 500 // count per page
    }, {
        // total: data.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            params.total(data.length);
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.getdata_shopping_cart = function () {

        maskLayer(1);

        var options = {
            url:myforwardurl(serviceRoot2+'shops/shoppingCart?actiontype=getdata_shopping_cart&user_id='+user_id,serviceRoot2),
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getdata_shopping_cart&user_id=' + user_id, serviceRoot),
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
                console.info('ss',rv);

                if (rv.result == "1") {
                    isok = true;
                    var thenum = 0;

                    $scope.theshop=rv.data;
                    console.info('$scope.theshop',$scope.theshop);
                    $.each(rv.data, function (idx, item) {

                        thenum++;
                        // var theshop = {};
                        // theshop.sortno = item.sortno;
                        // theshop.shop_id = item.shop_id;
                        // theshop.shop_name = item.shop_name;
                        // theshop.amount = item.amount;
                        // theshop.member = item.member;
                        //     theshop.data = [];
                        //
                        $.each(item.data, function (idx, product) {
                        //     var theitem = {};
                        //     theitem.sortno = product.sortno;
                        //     theitem.key = product.key;
                        //     theitem.e_date=product.e_date;
                        //     theitem.b_date=product.b_date;
                        //     theitem.cart_id = product.cart_id;
                        //     theitem.product_no = product.product_no;
                        //     theitem.name = product.name;
                        //     theitem.price = product.price;
                        //     theitem.photo = product.photo;
                        //     theitem.member_price = product.member_price;
                        //     theitem.desc = product.desc;
                        //     theitem.qty = product.qty;
                        //     theitem.room_qty = product.room_qty;
                        //     theitem.amount = product.amount;
                        //     theitem.person_info = product.person_info;
                            $scope.ticket_num = product.ticket_num;
                        //     if (product.person_info.length == 0) {
                        //         theitem.hasperson = false;
                        //     } else {
                        //         theitem.hasperson = true;
                        //     }
                        //     theitem.dateprice = product.dateprice;
                        //
                        //     if (product.dateprice.length == 0) {
                        //         theitem.hasdateprice = false;
                        //     } else {
                        //         theitem.hasdateprice = true;
                        //     }
                        //
                        //
                        //      theshop.data.push(theitem);
                        //     // cartnum = parseInt(cartnum) + parseInt(product.qty);
                        //     // cartamount = parseFloat(cartamount) + parseFloat(product.amount);
                        })


                        // data.push(theshop);
                    })


                    if (thenum == 0) {
                        $scope.isEmpty = "true";
                    } else {
                        $scope.isEmpty = "false";
                    }
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    maskLayer(0);

                    setTimeout(function () {
                        $scope.$apply(function () {


                            $scope.cartnum = cartnum;
                            $scope.cartamount = cartamount;
                            $scope.discount_amount=discount_amount;
                            $scope.tableParams.reload();
                            // $scope.tableParams = new ngTableParams({
                            //     page: 1, // show first page
                            //     count: 500 // count per page
                            // }, {
                            //     total: data.length, // length of data
                            //     counts: [],
                            //     getData: function ($defer, params) {
                            //         $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            //     }
                            // });
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





    //创建变量用来保存选中结果
    $scope.selected = [];
    var updateSelected = function (action, id) {
        if (action == 'add' && $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
        if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
    };
    //更新某一列数据的选择
    $scope.updateSelection = function ($event, id,qty) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
        $scope.chgqty(id,qty);



    };
    //全选操作
    $scope.selectAll = function ($event,id,qty,data) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        for (var i = 0; i < data.length; i++) {
            var contact = data[i];
            updateSelected(action, contact.key);
            $scope.chgqty();
        }
    };
    $scope.isSelected = function (id) {

        return $scope.selected.indexOf(id) >= 0;
    };
    $scope.isSelectedAll = function (data) {

        return $scope.selected.length === data.length;
    };



    // $scope.choseArr=[];//定义数组用于存放前端显示
    var str="";//
    // $scope.x=false;//默认未选中
    $scope.time=0;//选中个数

    $scope.chk= function (z,x) {//单选或者多选
        if($scope.time<$scope.ticket_num){

            if (x == true) {//选中
                str = str + z + ',';
                $scope.time++;

                if($scope.time==$scope.ticket_num){
                    $.each($scope.ticketdata,function (index,item) {

                        var id=item.ticket_id;
                        $("#"+id).attr("disabled",true);
                        $("#"+z).attr("disabled",false);

                    })


                }
            } else {
                str = str.replace(z + ',', '');//取消选中
                $scope.time--;
                if( $scope.time<0){
                    $scope.time=0;
                }
                $.each($scope.ticketdata,function (index,item) {
                    var id=item.ticket_id;
                    $("#"+id).attr("disabled",false);

                })
            }
        }
        else if($scope.time==$scope.ticket_num) {

            str = str.replace(z + ',', '');//取消选中
            $scope.time--;
            $.each($scope.ticketdata,function (index,item) {
                var id=item.ticket_id;
                $("#"+id).attr("disabled",false);

            })

        }else{

        }

        // $scope.choseArr=(str.substr(0,str.length-1)).split(',');
        $scope.choseArr=str;

    };


    $scope.getdata_shopping_cart();


    var PO_ID = "";
    var pay_amount = 0;
    $scope.submitpo = function () {
        if (cartnum == 0) {
            myalert("请选择商品");
        }
        else if (PO_ID != "") {
            alert("已生成订单");
            setTimeout(function () {
                $window.history.back();
            }, 500);
        }
        else {
            // maskLayer(1);

            var options = {
                url:myforwardurl(serviceRoot2+'shops/shoppingCart?actiontype=add_po&user_id='+user_id+'&ticket_ids='+$scope.choseArr+'&cart_ids='+$scope.selected,serviceRoot2),
                //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=add_po&user_id=' + user_id, serviceRoot),
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
                    console.info('rvamount',rv);
                    $.each(rv.data, function (idx, item) {


                        if (item.result == "1") {

                            PO_ID = item.PO_ID;
                            pay_amount = item.amount;
                            isok = true;

                        }
                        else if (item.result == "0") {

                            msg = "没那么多了(｡•́︿•̀｡)";

                        }
                        else {
                            msg = item.result_text;
                        }
                    })


                    if (isok) {//alert("获取数据成功")
                        //alert(msg)


                        maskLayer(0);

                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.PO_ID = PO_ID;


                                myalert("订单提交成功！");
                                if(pay_amount==0.00){
                                    $scope.cartamount=pay_amount;
                                    $scope.getdata_shopping_cart();

                                }else{

                                    $scope.payact(PO_ID, pay_amount);

                                    cartnum=0;
                                    cartamount=0;
                                    discount_amount=0;
                                    PO_ID="";

                                }
                            });
                        }, 500);


                        //setTimeout(function() { $window.history.back(); }, 500);

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

    $scope.delit = function (theid) {
        SweetAlert.swal({
            title: "确定移出购物车吗?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "移出",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {

                $scope.chgqty(theid, -9999);
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


    $scope.editit = function (theid) {

        $("#qtyspan" + theid).css("display", "none");
        $("#qtydiv" + theid).css("display", "block");


        $("input[name='qty" + theid + "']").TouchSpin({
            min: 0,
            max: 1000,
            step: 1,//增量或减量
            decimals: 0, //精度
            boostat: 5,
            maxboostedstep: 10,
            postfix: '' //后缀
        });

        //$("input[name='qty"+theid+"']").focus();


        $("#editA" + theid).css("display", "none");
        $("#editB" + theid).css("display", "none");
        $("#okitA" + theid).css("display", "block");
        $("#okitB" + theid).css("display", "block");
    }

    $scope.okit = function (theid) {
        $("#qtyspan" + theid).css("display", "block");
        $("#qtydiv" + theid).css("display", "none");

        $scope.chgqty(theid, $("input[name='qty" + theid + "']").val())
        $("#editA" + theid).css("display", "block");
        $("#editB" + theid).css("display", "block");
        $("#okitA" + theid).css("display", "none");
        $("#okitB" + theid).css("display", "none");
    }


    $scope.chgqty = function (theid, theval) {
        // maskLayer(1);
        if(theid==undefined){
            theid="";
        }
        if(theval==undefined){
            theval="";
        }


        var theqty = 0;
        var theamount = 0;
        var key_amount=0;

        var options = {
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=update_shopping_cart&cart_ids='+$scope.selected+'&user_id=' + user_id + '&theid=' + theid + '&qty=' + theval, serviceRoot2),
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=update_shopping_cart&user_id='+user_id+'&theid='+theid+'&qty='+theval,serviceRoot),
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

                $.each(rv.data, function (idx, item) {

                    if (item.result == "1") {
                        isok = true;
                        theqty = item.qty;
                        theamount = item.amount;
                        cartnum = theqty;
                        cartamount = theamount;
                        var key_id="key_"+item.key;
                        item.key_amount= $filter("number")(item.key_amount,2);
                        $('#'+key_id).text(item.key_amount);
                    }
                    else {
                        msg = rv.result_text;
                    }
                })


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    maskLayer(0);

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.cartnum = theqty;
                            $scope.cartamount = theamount;
                        });
                    }, 500);


                    if (theval == -9999) {



                        //这是删除，公用了这个函数

                        /*
                         SweetAlert.swal({
                         title: "删除成功!",
                         text: "",
                         type: "success",
                         confirmButtonColor: "#007AFF"
                         });
                         */

                        $scope.removerow(theid);
                        $scope.getdata_shopping_cart();

                        // $scope.tableParams.reload();


                    }


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
        $scope.getdata_shopping_cart();
         // $scope.getdata_shopping_cart();

    }
    $scope.userTicketByCart = function () {

        // maskLayer(1);
        var options = {
            url:myforwardurl(serviceRoot2+'shops/shoppingCart?actiontype=userTicketByCart&user_id=' + user_id +'&theid='+$scope.thekey+'&cart_ids='+$scope.selected+'&ticket_ids='+$scope.choseArr,serviceRoot2),
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
                console.info('ss',rv);


                if(rv.result=="1")
                {
                    $scope.discount_amount=rv.discount_amount;
                    $.closePopupLayer();

                }
                else
                {
                    msg=rv.result_text;
                }



            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);
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
                    var isok=false;
                    var msg="";

                    if(rv.result=="1")
                    {
                        prepay_id=rv.prepay_id;
                        Sign=rv.Sign;
                        paySign=rv.paySign;
                        getprepay_rvsign=rv.getprepay_rvsign;
                        isok=true;

                    }
                    else
                    {
                        msg=rv.result_text;
                    }



                    if(isok){//alert("获取数据成功")
                        //alert(msg)


                        //微信支付


                        callPay();





                    }else{alert(msg)}

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
        $scope.getdata_shopping_cart();
        $.closePopupLayer();
        setTimeout(function () {
            $window.history.back();
        }, 500);

    };


    $scope.chooseimg = function (theinputid) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId = res.localIds;
                ////alert('已选择 ' + res.localIds.length + ' 张图片');


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

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=cart', serviceRoot),

            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=product', serviceRoot2),
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
                    isok = true;


                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {

                    setTimeout(function () {
                        $scope.$apply(function () {


                            if (theinputid == "pic") {


                                var theimg = {}
                                theimg.key = $scope.slidesimggroup.length
                                theimg.slidesimg = rv.uploadfilepath;
                                $scope.slidesimggroup.push(theimg);
                                $scope.tableParams3.reload();

                                $scope.getallslideimg(theinputid);

                            }

                            //$("#" + theinputid).val(rv.uploadfilepath);
                            //$("#previewimg_" + theinputid).attr("src", serviceRoot + rv.uploadfilepath);

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


    $scope.delpic = function (theid) {

        var index = -1;
        var comArr = $scope.slidesimggroup;
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
            $scope.slidesimggroup.splice(index, 1);
        }


        $scope.tableParams3.reload();

        $scope.getallslideimg("pic");

    }

    $scope.getallslideimg = function (theinputid) {
        $scope.slidesimg = "";

        for (var k = 0; k < $scope.slidesimggroup.length; k++) {
            if ($scope.slidesimggroup[k].slidesimg != "") {
                $scope.slidesimg = $scope.slidesimg + $scope.slidesimggroup[k].slidesimg + ";";
            }
        }
        if (theinputid) {
            $("#" + theinputid).val($scope.slidesimg);
        }
    }



    $scope.stopRecord = function (theinputid) {
        wx.stopRecord({
            success: function (res) {
                voices.localId = res.localId;

                $scope.uploadvoice('voice');

            },
            fail: function (res) {

                alert('请先点录制');
                // alert(JSON.stringify(res));
            }
        });
    }

    $scope.RecordEnd = function (theinputid) {
        wx.onVoiceRecordEnd({
            complete: function (res) {
                voices.localId = res.localId;
                alert('录音时间已超过一分钟');
            }
        });
    }

    $scope.record = function (theinputid) {
        voices.localId = "";
        wx.startRecord({
            cancel: function () {
                alert('用户拒绝授权录音');
            }
        });
    }

    $scope.play = function (theinputid) {
        if (voices.localId == '') {
            alert('请先录制一段声音');
            return;
        }
        wx.playVoice({
            localId: voices.localId
        });
    }

    $scope.stop = function (theinputid) {
        wx.stopVoice({
            localId: voices.localId
        });
    }

    $scope.uploadvoice = function (theinputid) {
        voices.serverId = [];


        if (voices.localId == '') {
            alert('请先录制一段声音');
            return;
        }

        function upload() {
            wx.uploadVoice({
                localId: voices.localId,
                success: function (res) {
                    alert('上传语音成功');//，serverId 为' + res.serverId);
                    voices.serverId.push(res.serverId);

                    var allvoiceserverId = "";
                    for (var k = 0; k < voices.serverId.length; k++) {
                        allvoiceserverId = allvoiceserverId + voices.serverId[k] + "~~X";
                    }
                    if (allvoiceserverId != "") {
                        allvoiceserverId = allvoiceserverId.substring(0, allvoiceserverId.length - 3);
                    }
                    $scope.allvoiceserverId = allvoiceserverId;

                    $scope.uploadvoiceACT(theinputid, allvoiceserverId);

                },
                fail: function (res) {

                    alert(JSON.stringify(res));
                }
            });
        }

        upload();


    }


    $scope.uploadvoiceACT = function (theinputid, allvoiceserverId) {

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=uploadvoice&allvoiceserverId=' + allvoiceserverId + '&user_id=' + user_id + '&path=msg', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadvoice&allvoiceserverId=' + allvoiceserverId + '&user_id=' + user_id + '&path=msg', serviceRoot2),
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
                    isok = true;


                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $("#" + theinputid).val(rv.uploadfilepath);

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


    var addrdata = [];

    $scope.getaddrinit = function () {
        var options = {
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getshaddr&user_id=' + user_id, serviceRoot2),
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getshaddr&user_id='+user_id,serviceRoot),
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
                        var thetab = {};
                        thetab.id = item.id;
                        thetab.sortno = item.sortno;
                        thetab.key = item.key;
                        thetab.shr = item.shr;
                        thetab.addr = item.addr;
                        thetab.tel = item.tel;
                        thetab.remark = item.remark;

                        addrdata.push(thetab);


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {


                            $scope.addr_tableParams = new ngTableParams({
                                page: 1, // show first page
                                count: 5 // count per page
                            }, {
                                total: addrdata.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(addrdata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            });

                        });
                    }, 500);

                } else {
                    // alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);
    }


    $scope.getaddrinit();


    $scope.getaddr = function (shr, addr, tel) {
        $scope.close();
        $("#shr").val(shr);
        $("#addr").val(addr);
        $("#tel").val(tel);

    }


    $scope.addr_delit = function (theid) {
        SweetAlert.swal({
            title: "确定删除地址吗?",
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

                $scope.addr_delitact(theid);
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


    $scope.addr_removerow = function (theid) {

        var index = -1;
        var comArr = addrdata;
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
            addrdata.splice(index, 1);
        }


    }


    $scope.addr_delitact = function (theid) {
        maskLayer(1);

        var options = {
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=del_shaddr&theid=' + theid, serviceRoot2),
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=del_shaddr&theid='+theid,serviceRoot),
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


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    maskLayer(0);


                    $scope.addr_removerow(theid);

                    $scope.addr_tableParams.reload();


                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);

    }


    $scope.newaddr = function () {

        if ($("#theshr").val() == "") {
            alert("请输入收货人");
            return;
        }
        if ($("#theaddr").val() == "") {
            alert("请输入地址");
            return;
        }


        var options = {

            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getshaddr&user_id=' + user_id, serviceRoot2),
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=add_shaddr&user_id='+user_id,serviceRoot),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f2").serializeArray(),
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

                            addrdata.push({
                                'sortno': '',
                                'key': '',
                                'id': '',
                                'shr': $("#theshr").val(),
                                'tel': $("#thetel").val(),
                                'addr': $("#theaddr").val()
                            });

                            $scope.addr_tableParams.reload();
                            //$location.path("app/wx/me/mypublish_addr");


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

    $scope.open = function (id) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w,
            height: page_h*0.9,
            target: id,
            container: ""
            //hidebyclickbg:"false"
        });

        $("#modal-body").css("height", (page_h*0.9 - 130) + "px");
        $("#modal-body2").css("height", (page_h*0.9 - 130) + "px");



    }






    var tickets_id=[];
    var mydata = [];
    //根据会员获取会员当前卡劵
    var ticketdata=[];
    function getmyticket(cart_id,product_no) {

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmyticket&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getmyticket&user_id='+user_id+'&status=1&product_nos='+product_no+'&cart_id='+cart_id,serviceRoot2),
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


                            $scope.ticketdata = ticketdata;
                            console.info('rvticketdata',$scope.ticketdata);
                            $.each($scope.ticketdata,function (index,item) {
                                if(item.isselect==0){

                                }
                                if(item.isselect==1){
                                    tickets_id.push(item.ticket_id);
                                    $scope.choseArr=tickets_id;
                                    $scope.time++;


                                }

                            })





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







// func_obj=$scope.open;





    $scope.back = function () {
        $window.history.back();
    }


    loadwxjs();


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


    showmenu(false);


}]);


if (user_id == "") {
    //window.location="standard/wx_interface.html?menuid=cart_man&needwxright=true";
}

