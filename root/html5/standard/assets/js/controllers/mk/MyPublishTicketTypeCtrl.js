'use strict';


app.controller('MyPublishTicketTypeCtrl', ["$window", "$scope", "$rootScope", "$location", "ngTableParams", "SweetAlert", function ($window, $scope, $rootScope, $location, ngTableParams, SweetAlert) {

    var data = [];

    $rootScope.currTitle = "卡券分类";

    var shop_id = "";


    $scope.gettickettype = function () {
        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=gettickettype&User='+user_id+'&shop_id=',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=gettickettype&User='+user_id+'&shop_id=',serviceRoot2),
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
                        thetab.sortno = item.sortno;
                        thetab.shop_id = item.shop_id;
                        thetab.shop_name = item.shop_name;
                        thetab.ticket_type = item.ticket_type;

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


    $scope.gettickettype();


    $scope.newact = function () {
        $location.url("/app/wx/me/mypublish_tickettype_new?shopid=" + shop_id);
    }


    $scope.delit = function (shop_id, ticket_type) {
        SweetAlert.swal({
            title: "确定删除卡券分类吗?",
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

                $scope.delitact(shop_id, ticket_type);
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


    $scope.removerow = function (ticket_type) {

        var index = -1;
        var comArr = data;
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].key === ticket_type) {
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


    $scope.delitact = function (shop_id, ticket_type) {
        maskLayer(1);

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=del_ticket_type&shop_id='+shop_id+'&ticket_type='+ticket_type,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=del_ticket_type&shop_id='+shop_id+'&ticket_type='+ticket_type,serviceRoot2),
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


                    $scope.removerow(ticket_type);

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





