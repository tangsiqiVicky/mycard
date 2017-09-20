'use strict';



app.controller('MySendGiftCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', "ngTableParams", "SweetAlert", function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, SweetAlert) {


    $scope.type="1";
    $scope.isok="false";
    $scope.giftqrcode="";

    scope = $scope;

    var data = [];
    var listdata = [];


    $rootScope.currTitle = "一键送礼";


    // Chart.js Data
    $scope.data = [];

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


    var total_num = 0;
    var total_amount = 0;


    $scope.gettotaldata_po = function () {
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=gettotaldata_po&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=gettotaldata_po&user_id=' + user_id, serviceRoot2),
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
                    msg = rv.result_text;
                    $.each(rv.data, function (idx, item) {
                        total_num = item.num;
                        total_amount = item.amount;
                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.total_num = total_num;
                            $scope.total_amount = total_amount;

                            $scope.renderChart = true;
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

    $scope.gettotaldata_po();


    var colorstr = "#00CC33,#00CC00,#C75000,#FF9900,#23DB8D,#CCFF00,#ff6600,#ffcc00";
    var colorstrs = colorstr.split(",");


    $scope.getdata_po_byproducttype = function () {
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getdata_po_byproducttype&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_po_byproducttype&user_id=' + user_id, serviceRoot2),
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
                    msg = rv.result_text;
                    $.each(rv.data, function (idx, item) {

                        var thetab = {};
                        thetab.value = item.amount;
                        thetab.color = colorstrs[(idx + 1) % 8];
                        thetab.highlight = '#FF5A5E';
                        thetab.label = item.products_type;

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


    $scope.getdata_po_byproducttype();






    $scope.getdata_po = function () {
        var options = {
            //http://localhost:8080/snsoft/shops/shoppingCart?actiontype=getdata_po&shop_id=S-kf&user_id=15366193728
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getdata_po&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_po&user_id=' + user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            //jsonp: 'callback',
            success: function (rv) {
                console.info('rvvshop',rv);
                var isok = false;
                var msg = "";
                if (rv.result == "1") {
                    isok = true;

                    listdata = [];

                    $.each(rv.data, function (idx, item) {

                        var theitem = {};
                        theitem.sortno = item.sortno;
                        theitem.PO_ID = item.PO_ID;
                        theitem.Maker = item.Maker;
                        theitem.Make_date = item.Make_date;
                        theitem.shop_id = item.shop_id;
                        theitem.shop_name = item.shop_name;
                        theitem.amount = item.amount;
                        theitem.Status = item.Status;
                        theitem.pic = item.pic;
                        theitem.voice = item.voice;
                        theitem.giftshorturl = item.giftshorturl;

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

    $scope.getdata_po();




    $scope.close = function () {
        $.closePopupLayer();

    }


    $scope.payact = function (PO_ID, amount) {

        $scope.type="1";
        $scope.isok="false";
        $scope.giftqrcode="";


        $scope.PO_ID = PO_ID;

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w,
            target: 'payContent',
            container: "",
            hidebyclickbg: "false"
        });
    }



    $scope.ok_pay = function (e) {


        if ($("#type").val() == "1" && $("#phone").val()=="") {
            alert("请输入手机号");
            return;
        }


        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=createQRCODE_PO_saoma&user_id=' + user_id+'&po_id='+$scope.PO_ID, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=createQRCODE_PO_saoma&user_id=' + user_id+'&po_id='+$scope.PO_ID,serviceRoot2),
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
                var shorturl="";


                if (rv.result == "1") {

                    isok = true;
                    shorturl=rv.shorturl;


                }
                else {
                    msg = rv.result_text;
                }




                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.giftqrcode="http://1dao7.cn/s/"+shorturl;
                            $scope.isok="true";
                            $("#qrcode").attr("src", serviceRoot + "qrcode?msg=" + $scope.giftqrcode + "&width=200&height=200");

                            $scope.getdata_po();


                            $scope.tofriendall();
                            $scope.tofriend();

                        });
                    }, 500);






                } else {
                    $scope.isok="false";
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);





    };






    $scope.showqrcode = function (poid,giftshorturl)
    {
        $scope.PO_ID=poid;
        var shorturl=giftshorturl;
        $scope.giftqrcode="http://1dao7.cn/s/"+shorturl;
        $scope.isok="true";
        $("#qrcode2").attr("src", serviceRoot + "qrcode?msg=" + $scope.giftqrcode + "&width=200&height=200");

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w,
            target: 'payContent2',
            container: "",
            hidebyclickbg: "true"
        });


        $scope.tofriendall();
        $scope.tofriend();


    }










    $scope.tofriendall = function ()//朋友圈
    {
        var pageTitle = "扫码收好礼";
        var pageUrl = $scope.giftqrcode;

        if(pageUrl==""){myalert("请先确定送礼订单");return;}

        pageUrl="http://www.mycard.top/h5-js/html5/gift.html?po_id="+$scope.PO_ID ;

        wx.onMenuShareTimeline({
            title: "请收礼（由"+$rootScope.user.nickname+"送出），" + pageTitle, // 分享标题
            link: pageUrl, // 分享链接
            imgUrl: 'http://www.mycard.top/h5-js/html5/standard/assets/images/just_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                setTimeout(function () {
                    $rootScope.logit(user_id, 'gift', pageUrl, $rootScope.currTitle);
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

        var pageTitle = "扫码收好礼";
        var pageUrl = $scope.giftqrcode;
        if(pageUrl==""){myalert("请先确定送礼订单");return;}

        pageUrl="http://www.mycard.top/h5-js/html5/gift.html?po_id="+$scope.PO_ID ;

        wx.onMenuShareAppMessage({
            title: "请收礼（由"+$rootScope.user.nickname+"送出），" + pageTitle, // 分享标题
            desc: ""+$rootScope.user.nickname+"送给您的礼品，扫码后填写您的收货地址，剩下的就交给快递小哥吧", // 分享描述
            link: pageUrl, // 分享链接
            imgUrl: 'http://www.mycard.top/h5-js/html5/standard/assets/images/just_logo.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: pageUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                setTimeout(function () {
                    $rootScope.logit(user_id, 'gift', pageUrl, $rootScope.currTitle);
                }, 2000);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });


    }





















    $scope.cancel_pay = function (e) {
        $.closePopupLayer();
        //setTimeout(function() { $window.history.back(); }, 500);

    };


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);


loadwxjs();











