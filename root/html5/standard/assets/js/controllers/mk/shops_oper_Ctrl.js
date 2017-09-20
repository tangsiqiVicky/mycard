'use strict';


app.controller('shops_oper_Ctrl', ["$window", "$scope", "$rootScope", "$location", "ngTableParams", "SweetAlert", "$stateParams", function ($window, $scope, $rootScope, $location, ngTableParams, SweetAlert, $stateParams) {

    var data = [];

    $rootScope.currTitle = "商家操作员";

    $scope.shop_id = $stateParams.shop_id;


    $scope.getuserlist = function () {
        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=get_shop_admin&type=shops_oper&shop_id='+$scope.shop_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shop_admin?actiontype=get_shop_admin&type=shops_oper&shop_id=' + $scope.shop_id, serviceRoot2),
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
                        thetab.sortno = item.sortno;
                        thetab.id = item.id;
                        thetab.key = item.key;
                        thetab.shop_id = item.shop_id;
                        thetab.user_id = item.user_id;

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


    $scope.getuserlist();


    $scope.newsave = function () {


        if ($("#shop_id").val() == "") {
            alert("请输入商家编号");
            return;
        }
        if ($("#user_id").val() == "") {
            alert("请输入用户编号");
            return;
        }


        var options = {

            // url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=add_shop_admin&type=shops_oper', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shop_admin?actiontype=add_shop_admin&type=shops_oper', serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f2").serializeArray(),
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

                if (isok) {

                    setTimeout(function () {
                        $scope.$apply(function () {


                            data.push({
                                'sortno': '',
                                'key': '',
                                'id': '',
                                'shop_id': $("#shop_id").val(),
                                'user_id': $("#user_id").val()
                            });
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
        return false;

    }


    $scope.delit = function (theid) {
        SweetAlert.swal({
            title: "确定删除吗?",
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
            if (comArr[i].id === theid) {
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


    }


    $scope.delitact = function (theid) {
        maskLayer(1);

        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=del_shop_admin&type=shops_oper&theid=' + theid, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shop_admin?actiontype=del_shop_admin&type=shops_oper&theid=' + theid, serviceRoot2),
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


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);





