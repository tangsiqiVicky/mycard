'use strict';


var listdata = [];


app.controller('OrderDetailCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', "ngTableParams", '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams) {


    $rootScope.currTitle = "订单详情";


    $scope.po_id = $stateParams.po_id;//request.QueryString("subtype");
    $scope.make_date = $stateParams.make_date;


var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getdata_po&user_id='+user_id+'&po_id='+$scope.po_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_po&user_id=' + user_id + '&po_id=' + $scope.po_id, serviceRoot2),
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

                listdata = [];
console.info('rvssssss',rv);
                $.each(rv.data, function (idx, item) {

                    $scope.SHR=item.SHR;
                    $scope.SH_ADDR=item.SH_ADDR;
                    $scope.TEL=item.TEL;
                    $scope.logistics_info=item.logistics_info;

                })
            }
            else {
                msg = rv.result_text;
            }


            if (isok) {//alert("获取数据成功")
                //alert(msg)

            } else {
                alert(msg)
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {


        }


    };
    $.ajax(options);






    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getdata_po_detail&user_id='+user_id+'&po_id='+$scope.po_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=getdata_po_detail&user_id=' + user_id + '&po_id=' + $scope.po_id, serviceRoot2),
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

                listdata = [];

                $.each(rv.data, function (idx, item) {

                    var theitem = {};
                    theitem.sortno = item.sortno;
                    theitem.shop_id = item.shop_id;
                    theitem.shop_name = item.shop_name;
                    theitem.product_name = item.product_name;
                    theitem.qty = item.qty;
                    theitem.price = item.price;
                    theitem.amount = item.amount;
                    $scope.SHR=item.SHR;
                    $scope.SH_ADDR=item.SH_addr;
                    $scope.TEL=item.tel;
                    $scope.logistics_info=item.logistics_info;

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
                        $scope.tableParams = new ngTableParams({
                            page: 1, // show first page
                            count: 8 // count per page
                        }, {
                            total: listdata.length, // length of data
                            counts: [],
                            getData: function ($defer, params) {
                                $defer.resolve(listdata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);















