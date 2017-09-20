'use strict';


app.controller('MyPublishShopinfoCtrl', ["$window", "$scope", "$rootScope", "$location", "ngTableParams", "SweetAlert", function ($window, $scope, $rootScope, $location, ngTableParams, SweetAlert) {

    var data = [];

    $rootScope.currTitle = "商家资料";

    var shop_id = "";

    var thegetshop_id = "autogetbyuser";
    if (user_id == "admin") {
        thegetshop_id = "-1";
    }

    $scope.getshops = function () {
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getshops&User=' + user_id + '&shop_id=' + thegetshop_id + '&visible=-1&shop_type=-1', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=getshops&user_id=' + user_id + '&shop_id=' + thegetshop_id + '&visible=-1&shop_type=-1', serviceRoot2),
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

                console.info('comArrdata',rv);
                if (rv.result == "1") {
                    isok = true;

                    data = rv.data;

                    $.each(rv.data, function (idx, item) {
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


                            $scope.tableParams = new ngTableParams({
                                page: 1, // show first page
                                count: 5 // count per page
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


    $scope.getshops();


    $scope.newact = function () {
        $location.url("/app/wx/me/mypublish_shopinfo_new");
    }


    $scope.editit = function (shop_id) {
        $location.url("/app/wx/me/mypublish_shopinfo_new?shop_id=" + shop_id + "&opertype=edit");
    }


    $scope.delit = function (shop_id) {
        SweetAlert.swal({
            title: "确定删除商家资料吗?",
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

                $scope.delitact(shop_id);
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


    $scope.removerow = function (shop_id) {
        alert('进入removerow');
        var index = -1;
        var comArr = data;
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].key === shop_id) {
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


    $scope.delitact = function (shop_id) {
        maskLayer(1);
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=del_shop&shop_id=' + shop_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=del_shop&shop_id='+ shop_id, serviceRoot2),
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
                console.info('rvdatata',rv);

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


                    $scope.removerow(shop_id);

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


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);





