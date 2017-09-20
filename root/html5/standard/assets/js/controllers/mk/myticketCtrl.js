'use strict';


app.controller('myticketCtrl', ["$window", "$scope", "$rootScope", "ngTableParams","$filter","SweetAlert",function ($window, $scope, $rootScope, ngTableParams,$filter,SweetAlert) {

    var data = [];

    $rootScope.currTitle = "我的卡券";
    $scope.ticketitem=[];
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.startDate=$filter('date')($scope.startDate,'yyyy-MM-dd');
    $scope.endDate=$filter('date')($scope.endDate,'yyyy-MM-dd');
    $scope.ticketdetails = function (item) {

        $.openPopupLayer({
            name: "ticketcontent",
            width: page_w,
            height: page_h * 0.6,
            target: "ticketcontent",
            container: ""
        });
        $scope.ticketitem=item;
        $("#ticketcontent-body1").css("height", (page_h * 0.6 - 120) + "px");
    }


    $scope.close = function () {
        $.closePopupLayer("ticketcontent");
    }

    $scope.data=[];
    function myticket() {
        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmyticket&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getmyticket&status=0&user_id='+user_id,serviceRoot2),
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
                    $.each(rv.data, function (idx, item) {
                        var thetab = {};
                        thetab.id = item.id;
                        thetab.key = item.key;
                        thetab.ticket_id = item.ticket_id;
                        thetab.shop_id = item.shop_id;
                        thetab.shop_name = item.shop_name;
                        thetab.b_date = item.b_date;
                        thetab.e_date = item.e_date;
                        thetab.isvalid = item.isvalid;
                        thetab.owner = item.owner;
                        thetab.isused = item.isused;
                        thetab.product_no = item.product_no;
                        thetab.goods_name = item.goods_name;
                        thetab.product_qty = item.product_qty;
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
                                count: 5 // count per page
                            }, {
                                total: data.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            });

                        });

                        if (data.length == 0) {
                            $scope.isEmpty = "true";
                        } else {
                            $scope.isEmpty = "false";
                        }




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


    myticket();


    $scope.delit = function (theid) {
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

        if (data.length == 0) {
            $scope.isEmpty = "true";
        } else {
            $scope.isEmpty = "false";
        }


    }


    $scope.delitact = function (theid) {
        maskLayer(1);

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=del_ticket&theid='+theid,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=del_ticket&ticket_ids='+theid, serviceRoot2),
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
                    msg = rv.result_text;
                }
                else {
                    msg = rv.result_text;
                }



                if (isok) {
                    //alert("获取数据成功")


                    maskLayer(0);

                     $scope.removerow(theid);



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





