'use strict';


app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

$('.date').remove(); // 移除插件

//以下是加载商品

function DragLoad_beforeSend(cur_page, theid) {

    $('#pageLoading' + theid).html("加载中。。。");
    $('#pageLoading' + theid).css("visibility", "visible");
}

function DragLoad_packageDom(data, theid, pagenum) {
    var dom = "";

    if (theid == "_SHOPPJ") {//评价

        $.each(data, function (idx, item) {

            var iconstr = "";
            if (item.pj_level == "好") {
                iconstr = '<i class="ti ti-thumb-up fa-2x"></i>';
            }
            else if (item.pj_level == "中") {
                iconstr = '<i class="ti ti-thumb-up fa-2x"></i>';
            }
            else if (item.pj_level == "差") {
                iconstr = '<i class="ti ti-thumb-down fa-2x"></i>';
            }

            var attstr = "";
            if (item.pj_att != "") {
                for (var a = 0; a < item.pj_att.split(";").length; a++) {
                    if (item.pj_att.split(";")[a] != "") {
                        attstr += '<div class="col-xs-3"><img src="' + serviceRoot + item.pj_att.split(";")[a] + '" style="width:100%;"></div>';
                    }
                }
            }


            dom += '<div id="detail_' + theid + '_' + pagenum + '" class="detail">' +

                '<div class="col-xs-12" style="padding:0px;margin-bottom:10px;border-bottom:1px solid #f7f7f7">' +
                '<div class="col-xs-1 text-left" style="padding:0px;">' +
                '<div>' + iconstr + '</div>' +
                '</div>' +
                '<div class="col-xs-11 text-left">' +
                '<div class="detail01">' +
                '<div class="small">' + item.maker + '</div>' +
                '<mark class="small">' + item.make_date + '</mark>' +
                '</div><div class="clearfix space5"></div>' +
                '<div class="detail02">' +
                '' + item.pj_content + '' +
                '</div>' +
                '<div class="detail02"><div class="row">' +
                '' + attstr + '' +
                '</div></div>' +
                '<div class="detail02">' +
                '' + item.pos + '' +
                '</div>' +
                '</div>' +

                '</div>' +

                '</div>';

        })

    }
    else {

        $.each(data, function (idx, item) {
            dom += '<div id="detail_' + theid + '_' + pagenum + '" class="detail">' +

                '<div class="col-xs-12" style="padding:0px;margin-bottom:10px;border-bottom:1px solid #f7f7f7">' +
                '<div class="col-xs-2 text-left" style="padding:0px;">' +
                '<a ui-sref=\"app.wx.me.goodsinfo({goods_id:\'' + item.key + '\'})\"><div><img id="photo_' + item.key + '" src="' + serviceRoot + item.icon + '" width="40px" height="40px" align=left></div></a>' +
                //'<a ui-sref=\"app.wx.me.producttypeinfo({producttype:\'雨\',shop_id:\'325\'})\"><div><img id="photo_'+item.key+'" src="'+serviceRoot+item.photo+'" width="40px" height="40px" align=left></div></a>' +
                '</div>' +
                '<div class="col-xs-9 text-left">' +
                '<a ui-sref=\"app.wx.me.goodsinfo({goods_id:\'' + item.key + '\'})\"><div class="main01">' +
                '<h2>' + item.name + '</h2>' +
                '</div></a>' +
                '<div class="detail01">' +
                '<div class="addr">' + item.desc + '</div>' +
                '<mark class="small">消费返积分：' + item.return_points + '</mark>' +
                '</div>' +
                '<div class="detail02">' +
                '<div class="small">门市价：<del>' + item.price + '</del> </div><div class="small"> 会员价：<span class="text-large text-orange">' + item.member_price + '</span></div>' +
                '</div>' +
                '</div>' +
                '<div class="col-xs-1 text-center" ng-if=\"' + item.room_qty + '\<=\'0\'" style="padding:0px;padding-top:50px;" >' +
                '<a  class="small text-grey"  >' +
                ' <i class="fa fa-shopping-cart  fa-2x "   ></i> &nbsp;加入' +
                '</a>' +
                '</div>		' +
                '<div class="col-xs-1 text-center" ng-if=\"' + item.room_qty + '\>\'0\'" style="padding:0px;padding-top:50px;" ng-click=\"addcaract(this,\'' + item.key + '\',\'' + item.price + '\',\'' + item.products_type + '\',\'' + item.name + '\')\"  >' +
                '<a class="small "  >' +
                ' <i class="fa fa-shopping-cart  fa-2x "   ></i> &nbsp;加入' +
                '</a>' +
                '</div>		' +
                '<div class="col-xs-1 text-center" ng-if=\"' + item.room_qty + '\==undefined" style="padding:0px;padding-top:50px;" ng-click=\"addcaract(this,\'' + item.key + '\',\'' + item.price + '\',\'' + item.products_type + '\',\'' + item.name + '\')\"  >' +
                '<a class="small "  >' +
                ' <i class="fa fa-shopping-cart  fa-2x "   ></i> &nbsp;加入' +
                '</a>' +
                '</div>		' +
                '</div>' +

                '</div>';


            // '<div class="col-xs-1 text-center" ng-if=\"' + item.products_type+ '\==\'客房\&&'+item.room_qty + '\>\'0\'" style="padding:0px;padding-top:50px;"  ng-click=\"addcaract(this,\'' + item.key + '\',\'' + item.price + '\',\'' + item.products_type + '\')\">' +
            // '<a href="#" class="small" >' +
        })

    }


    var ele = compile(dom)(scope);
    angular.element('#lists' + theid).append(ele);

    //$('#lists'+theid).append(dom);


    setTimeout(function () {
        $('#pageLoading' + theid).css("visibility", "hidden");
    }, 1000);


    return true;

}


function DragLoad_noMoreHandle(theid) {
    $('#pageLoading' + theid).html("没有更多了")
    setTimeout(function () {
        $('#pageLoading' + theid).css("visibility", "hidden");
    }, 1000);

}


//pay begin

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

//pay end


app.controller('shopinfoCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', '$compile', "SweetAlert", "$modal", "$filter", function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $compile, SweetAlert, $modal, $filter) {

    $scope.shop_id = $stateParams.shop_id;
    $scope.product_type = $stateParams.product_type;
    $scope.startDate = $stateParams.startDate;
    $scope.endDate = $stateParams.endDate;
    $scope.qty = $stateParams.qty;

    $scope.phone = $stateParams.phone;
    $scope.person_name = $stateParams.person_name;
    if ($scope.phone === undefined) {
        $scope.phone = ""
    }
    ;
    if ($scope.person_name === undefined) {
        $scope.person_name = ""
    }
    ;
    if ($scope.endDate === undefined) {
        $scope.endDate = ""
    }
    ;
    if ($scope.startDate === undefined) {
        $scope.startDate = ""
    }
    ;
    if ($scope.qty === undefined) {
        $scope.qty = ""
    }
    ;

    $rootScope.currTitle = "商家";


    // $scope.shop_id = $stateParams.shop_id;//request.QueryString("subtype");

    $scope.day = 1;
    var shop_id = "";
    var photo = "";
    var icon = "";
    var shop_type = "";
    var subtype = "";
    var name = "";
    var province = "";
    var city = "";
    var district = "";
    var address = "";
    var contact = "";
    var star = "0";

    var contact_phone = "";

    var more_desc = "";
    var desc = "";
    var email = "";
    var latitude = "";
    var longitude = "";

    var cartnum = 0;
    var slidesimg = "";


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


    $scope.getshopinfo = function () {
        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getshopdetail&User='+user_id+"&shop_id="+$scope.shop_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getShopDetail&user_id=' + user_id + "&shop_id=" + $scope.shop_id, serviceRoot2),
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

                    $.each(rv.data, function (idx, item) {

                        icon = item.icon;
                        photo = item.photo;
                        shop_type = item.shop_type;
                        subtype = item.subtype;
                        shop_id = item.shop_id;
                        name = item.name;
                        province = item.province;
                        city = item.city;
                        district = item.district;
                        address = item.address;
                        contact = item.contact;
                        star = item.star;
                        if (star == null || star == "") {
                            star = "2";
                        }


                        contact_phone = item.contact_phone;

                        desc = item.desc;
                        more_desc = item.more_desc;
                        email = item.email;
                        latitude = item.latitude;
                        longitude = item.longitude;

                        cartnum = item.cartnum;
                        if (cartnum == null || cartnum == "") {
                            cartnum = 0;
                        }

                        slidesimg = item.slidesimg;


                        $rootScope.currTitle = "商家-" + name;


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.icon = icon;
                            $scope.photo = photo;
                            $scope.slidesimg = slidesimg;
                            $scope.shop_type = shop_type;
                            $scope.subtype = subtype;
                            $scope.shop_id = shop_id;
                            $scope.name = name;
                            $scope.province = province;
                            $scope.city = city;
                            $scope.district = district;
                            $scope.address = address;
                            $scope.contact = contact;
                            $scope.star = parseInt(star);

                            $scope.contact_phone = contact_phone;

                            $scope.desc = desc;
                            $scope.more_desc = more_desc;
                            $scope.email = email;
                            $scope.latitude = latitude;
                            $scope.longitude = longitude;
                            $scope.cartnum = cartnum;


                            $("#desc").html($scope.desc);
                            $("#shopdesc").html($scope.more_desc);

                            $scope.isReadonly = true;


                            $scope.myInterval = 5000;
                            // 轮播图数据初始化
                            $scope.slides = [];
                            // 添加轮播图源
                            var slidesimgs = slidesimg.split(";");
                            for (var im = 0; im < slidesimgs.length; im++) {
                                if (slidesimgs[im] != "") {
                                    $scope.slides.push({image: slidesimgs[im], text: ''});
                                }
                                //$scope.slides.push({ image: 'assets/images/slider/home-slide1.jpg', text: '三方共赢' });
                                //$scope.slides.push({ image: 'assets/images/slider/home-slide2.jpg', text: '一站式解决联盟商家、会员的积分盈利体系' });
                            }


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
        return false;
    }


    scope = $scope;
    compile = $compile;


    var tabs = [];
    var thesubtype = "";
    var namestr = "";
    var namestrs = namestr.split(",");


    $scope.getproductstype = function () {


        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getproductstype&user_id=' + user_id + "&shop_id=" + $scope.shop_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getproductsType&user_id=' + user_id + '&shop_id=' + $scope.shop_id, serviceRoot2),
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


                    $.each(rv.data, function (idx, item) {

                        if (thesubtype == "") {
                            thesubtype = item.products_type;
                        }

                        namestr = namestr + item.products_type + ","

                    })


                    namestrs = namestr.split(",");
                    for (var i = 0; i < namestrs.length; i++) {
                        if (namestrs[i] != "") {
                            var thetab = {};
                            thetab.subtype = namestrs[i];
                            thetab.title = namestrs[i];
                            thetab.isload = 0;
                            thetab.data = [];

                            tabs.push(thetab);
                        }
                    }


                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)


                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.tabs = tabs;

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


    $scope.gettabby = function (subtype) {
        for (var i = 0; i < $scope.tabs.length; i++) {
            if ($scope.tabs[i].subtype == subtype) {
                return $scope.tabs[i];
            }
        }
    }


    $scope.listdata = function (arg, subtype) {

        maskLayer(1);

        if (arg == 0) {
            $('#lists' + subtype).html("");
            $scope.gettabby(subtype).isload = 1;
        }

        var otherwhere = "";//"&searchvalue="+$("#searchvalue").val()+"&fenlei="+$("#fenlei_se").val()+"&paixu="+$("#paixu_se").val()+"&shaixuan="+$("#shaixuan_se").val()+"&longitude="+cur_pos.split(",")[0]+"&latitude="+cur_pos.split(",")[1];
        DragLoad({
            'id': subtype,
            'url': myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getproducts&shop_id=' + $scope.shop_id + '&user_id=' + user_id + '&products_type=' + subtype + otherwhere, serviceRoot2),
            'loadingDom': $('#pageLoading' + subtype)
        })


        maskLayer(0);

    }


    $scope.clickontab = function (tab) {
        thesubtype = tab.subtype;
        $scope.listdata(0, tab.subtype);
//alert(tab.subtype+":"+tab.isload)

        setTimeout(function () {
            $rootScope.logit(user_id, 'products_type', thesubtype, '商品分类');
        }, 2000);

    }


    $scope.getshopinfo();
    $scope.getproductstype();


    $scope.chgsearchcenter = function (id) {

        is_select = true;

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w,
            height: page_h * 0.9,
            target: id,
            container: ""
        });

    }


    $scope.closepj = function () {
        $.closePopupLayer("myStaticPopup");
    }
    $scope.close = function () {
        $.closePopupLayer("asideContent");

    }

    $scope.ok = function (arg) {


        $scope.localaddress = templocation;
        $scope.close();

    };

    $scope.cancel = function () {
        $scope.close();
    };


    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {

        $.each($scope.tabs, function (idx, item) {
            if (("," + thesubtype + ",").indexOf("," + item.subtype + ",") >= 0) {
                item.active = true;
                $scope.listdata(0, item.subtype)
            }
            else {
                item.active = false;
            }
        })

    });


    $scope.submit_caract = function (obj, theid, qty) {
        //关闭弹出层
        $scope.close();

        $scope.cart_interface(obj, theid);


        //$location.path("/app/wx/me/cart");
    };

    $scope.theid;
    $scope.price = 0;
    $scope.addcaract = function (obj, theid, theprice, products_type,name) {


        if (user_id == "") {

            $scope.gotologin();
            return;
        }


        if (products_type == "客房") {
            // $.openPopupLayer({
            //     name: "asideContent",
            //     width: page_w*1,
            //     height: page_h*0.9,
            //     target: "asideContent",
            //     container: ""
            // });
            //
            // $("#asideContent-body").css("height", (page_h*0.8 - 120) + "px");
            // $("#roomperson_div").css("height", (page_h*0.8 - 220) + "px");
            if ($scope.startDate == "") {
                $scope.gotochangeDate(theid,products_type,name);
                return;
            } else {
                $scope.cart_interface(obj, theid);
            }


        } else {
            $scope.cart_interface(obj, theid, theprice);
        }


    }
    $scope.cleardata = function () {
        $scope.room_type = "";
        $scope.phone = "";
        $scope.conf = [];

    }
    $scope.cart_interface = function (obj, theid) {
        maskLayer(1);

        var options = {
            //url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shopping_cart&user_id=' + user_id + "&products_id=" + theid, serviceRoot2),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shopping_cart&user_id=' + user_id + "&products_id=" + theid + '&person_name=' + $scope.person_name + '&phone=' + $scope.phone + '&room_qty=' + $scope.qty + '&B_DATE=' + $scope.startDate + '&E_DATE=' + $scope.endDate, serviceRoot2),
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

                $.each(rv.data, function (idx, item) {
                    if (item.result == "1") {
                        isok = true;
                        cartnum = parseInt(item.qty);
                    }
                    else {
                        msg = item.result_text;
                    }
                })

                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    maskLayer(0);
                    //购物车数量
                    $scope.cartnum = cartnum;

                    $scope.startDate = "";
                    $scope.endDate = "";
                    $scope.qty = "";
                    $scope.phone = "";
                    $scope.person_name = "";


                    setTimeout(function () {
                        $scope.$apply(function () {
                            //飞
                            var addcar = $(obj);
                            var imgobj = $("#photo_" + theid);//addcar.parent().find('img');
                            //alert(imgobj)
                            var img = imgobj.attr('src');
                            //myalert(img)

                            var flyer = $('<img class="u-flyer" src="' + img + '">');

                            flyer.fly({
                                start: {
                                    left: x,
                                    top: y
                                },
                                end: {
                                    left: offset.left + 10,
                                    top: offset.top + 10,
                                    width: 0,
                                    height: 0
                                },
                                onEnd: function () {
                                    myalert("已成功加入购物车！");

                                    flyer.remove();
                                    // obj.destory();
                                }
                            });


                        });
                    }, 500);


                    setTimeout(function () {
                        $rootScope.logit(user_id, 'products_id', theid, '商品');
                    }, 2000);

                    $scope.cleardata();
                } else {
                    // alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }
        };
        $.ajax(options);


    }


    $scope.gotochangeDate = function (theid,products_type,name) {
        $location.url("/app/wx/me/changesearch?fromurl=" + $location.path() + "&shop_id=" + $scope.shop_id+'&goods_id='+theid+'&goods_name='+name+'&products_type='+products_type+'&opertype=add');
        // $location.url("/app/wx/me/changeDate?shop_id="+$scope.shop_id+"&theid="+theid);

    }

    $scope.gotologin = function () {

        $location.url("/login/signin?fromurl=" + $location.path() + "?shop_id=" + $scope.shop_id);

    }


    var hao = "0";
    var zhong = "0";
    var cha = "0";
    $scope.hao = hao;
    $scope.zhong = zhong;
    $scope.cha = cha;

    $scope.chart = function () {

        var options = {
            url: myforwardurl(serviceRoot2 + 'shops/getShopPJ?actiontype=getShopPJTotal&user_id=' + user_id + '&shop_id=' + $scope.shop_id, serviceRoot2),
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


                        hao = item.hao;
                        zhong = item.zhong;
                        cha = item.cha;

                        $scope.hao = hao;
                        $scope.zhong = zhong;
                        $scope.cha = cha;


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {






                            // Chart.js Data
                            $scope.data = [
                                {
                                    value: parseFloat(hao),
                                    color: '#F7464A',
                                    highlight: '#FF5A5E',
                                    label: '好'
                                },
                                {
                                    value: parseFloat(zhong),
                                    color: '#46BFBD',
                                    highlight: '#5AD3D1',
                                    label: '中'
                                },
                                {
                                    value: parseFloat(cha),
                                    color: '#3f3f3f',
                                    highlight: '#333333',
                                    label: '差'
                                }
                            ];
                            $scope.total = parseFloat(hao) + parseFloat(zhong) + parseFloat(cha);

                            $scope.per_hao = parseInt(parseFloat(hao) / $scope.total * 100)
                            $scope.per_zhong = parseInt(parseFloat(zhong) / $scope.total * 100)

                            $scope.per_cha = 100 - $scope.per_hao - $scope.per_zhong;//parseInt(parseFloat(xxxfjl)/$scope.total*100)

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


    $scope.listpj = function (arg, subtype, pj_level) {

        maskLayer(1);

        if (arg == 0) {
            $('#lists' + subtype).html("");
        }

        var otherwhere = "&pj_level=" + pj_level;//"&searchvalue="+$("#searchvalue").val()+"&fenlei="+$("#fenlei_se").val()+"&paixu="+$("#paixu_se").val()+"&shaixuan="+$("#shaixuan_se").val()+"&longitude="+cur_pos.split(",")[0]+"&latitude="+cur_pos.split(",")[1];

//DragLoad({'id':subtype,'url':myforwardurl(serviceRoot+'mk_main_info?actiontype=getshoppj&shop_id='+$scope.shop_id+'&User='+user_id+otherwhere,serviceRoot),'loadingDom':$('#pageLoading'+subtype),'pageCount':100})


        DragLoad({
            'id': subtype,
            'url': myforwardurl(serviceRoot2 + 'shops/getShopPJ?actiontype=getShopPJ&shop_id=' + $scope.shop_id + '&user_id=' + user_id + otherwhere, serviceRoot2),
            'loadingDom': $('#pageLoading' + subtype)
        })


        maskLayer(0);

    }


    $scope.clickonMaintab = function (tab) {


        if (tab == "tab1") {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.chart();
                    $scope.renderChart = true;
                });
            }, 500);


            $scope.listpj(0, "_SHOPPJ", "");

        }


        if (tab == "tab3") {
            $scope.getmyshoporder();

        }

    }


    var listdata = [];


    $scope.getmyshoporder = function () {

        var options = {
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_po_detail&user_id=' + user_id + '&shop_id=' + $scope.shop_id, serviceRoot2),
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getdata_po&user_id='+user_id+'&shop_id='+$scope.shop_id,serviceRoot),
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

                console.info('rv.data', rv);
                if (rv.result == "1") {
                    isok = true;

                    listdata = [];


                    $.each(rv.data, function (idx, item) {

                        var theitem = {};
                        theitem.sortno = item.sortno;
                        theitem.PO_ID = item.PO_ID;
                        theitem.Maker = item.Maker;
                        theitem.Make_date = item.make_date;
                        theitem.shop_id = item.shop_id;
                        theitem.shop_name = item.shop_name;
                        theitem.amount = item.amount;
                        theitem.Status = item.status;
                        theitem.pic = item.photo;
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


                            //$scope.tableParams.reload();


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


    /*

     $(".addcar").click(function(event){
     alert()
     var addcar = $(this);
     var img = addcar.parent().find('img').attr('src');
     var flyer = $('<img class="u-flyer" src="'+img+'">');
     flyer.fly({
     start: {
     left: event.pageX,
     top: event.pageY
     },
     end: {
     left: offset.left+10,
     top: offset.top+10,
     width: 0,
     height: 0
     },
     onEnd: function(){

     this.destory();
     }
     });
     });
     */


    $scope.editpj = function (theid) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w * 0.9,
            height: page_h * 0.9,
            target: theid,
            container: "",
            hidebyclickbg: "false"
        });

        $("#modal-body").css("height", (page_h * 0.9 - 130) + "px");
    }


    $scope.savepj = function () {

        if ($("#pj_level").val() == "") {
            alert("请评价");
            return;
        }

        var options = {
            url: myforwardurl(serviceRoot2 + 'shops/getShopPJ?actiontype=saveShopPj&user_id=' + user_id + "&shop_id=" + $scope.shop_id, serviceRoot2),
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=saveshoppj&user_id='+user_id+"&shop_id="+$scope.shop_id,serviceRoot),
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


                }
                else {
                    msg = rv.result_text;
                }

                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    $scope.closepj();

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.clickonMaintab("tab1");

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


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


    setTimeout(function () {
        $rootScope.logit(user_id, 'shop', $scope.shop_id, $rootScope.currTitle);
    }, 2000);


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
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=del_po&user_id=' + user_id + '&po_id=' + theid, serviceRoot2),
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=del_po&user_id='+user_id+'&po_id='+theid,serviceRoot),
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


//pay begin

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
                    var isok = false;
                    var msg = "";


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


//pay end


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

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=cart', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=cart', serviceRoot2),
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


                            if (theinputid == "pjslidesimg") {


                                var theimg = {}
                                theimg.key = $scope.slidesimggroup.length
                                theimg.pjslidesimg = rv.uploadfilepath;
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

        $scope.getallslideimg("pjslidesimg");

    }

    $scope.getallslideimg = function (theinputid) {
        $scope.pjslidesimg = "";

        for (var k = 0; k < $scope.slidesimggroup.length; k++) {
            if ($scope.slidesimggroup[k].pjslidesimg != "") {
                $scope.pjslidesimg = $scope.pjslidesimg + $scope.slidesimggroup[k].pjslidesimg + ";";
            }
        }
        if (theinputid) {
            $("#" + theinputid).val($scope.pjslidesimg);
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

            // url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=uploadvoice&allvoiceserverId=' + allvoiceserverId + '&user_id=' + user_id + '&path=msg', serviceRoot),
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


}]);


var offset = $("#end").offset();
var x = page_w / 2;
var y = page_h / 2;


app.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "items", function ($scope, $modalInstance, items) {
    $scope.today = function () {
        $scope.dt = new Date();
    };


    /*
     var tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1);
     var afterTomorrow = new Date();
     afterTomorrow.setDate(tomorrow.getDate() + 2);
     $scope.events =[
     {
     date: tomorrow,
     status: 'full'
     },
     {
     date: afterTomorrow,
     status: 'partially'
     }
     ];

     $scope.getDayClass = function(date, mode) {
     if (mode === 'day') {
     var dayToCheck = new Date(date).setHours(0,0,0,0);

     for (var i=0;i<$scope.events.length;i++){
     var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

     if (dayToCheck === currentDay) {
     return $scope.events[i].status;
     }
     }
     }

     return '';
     };
     */

    // $scope.getday = function(){
    //     $scope.dt = $("#startDate").text();
    // }
    // $scope.getday();
    //
    // if(items =="start"){
    //     $scope.today();
    //     $scope.dateType="入住";
    //     $scope.minDate = $scope.minDate ? null : new Date();
    // }else{
    //
    //     $scope.getday();
    //     $scope.dateType="离开";
    //     $scope.minDate =  $scope.minDate ? null :$("#startDate").text();
    // }

    $scope.ok = function () {
        $modalInstance.close($scope.dt);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);


$(document).ready(function () {


    $("#goods_content").css("height", (page_h - 172) + "px");
    $("#pj_content").css("height", (page_h - 172) + "px");


    /*
     $(document).mousemove(function(e){
     x=e.pageX-100;
     y=e.pageY;
     });
     $(document).click(function(e){
     x=e.pageX-100;
     y=e.pageY;
     });
     */


});


$(function ($) {

    loadwxjs();


});
