'use strict';


var data = [];


app.controller('MemListCtrl', ["$window", "$scope", "$rootScope", "$location", "ngTableParams", "SweetAlert", '$stateParams', function ($window, $scope, $rootScope, $location, ngTableParams, SweetAlert, $stateParams) {


    $rootScope.currTitle = "会员名单";


    $scope.inviter_id = $stateParams.inviter_id;
    $scope.level = $stateParams.level;


    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmymemberlist&inviter_id='+user_id+'&level='+$scope.level,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getmymemberlist&user_id=' + user_id + '&inviter_id=' + user_id + '&level=' + $scope.level, serviceRoot2),
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
            data = rv.data;
            //alert(data.length)

            if (isok) {//alert("获取数据成功")
                //alert(msg)
                $scope.tableParams = new ngTableParams({
                    page: 1, // show first page
                    count: 10 // count per page
                }, {
                    total: data.length, // length of data
                    counts: [],
                    getData: function ($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            } else {
                alert(msg)
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {


        }


    };
    $.ajax(options);


    $scope.newact = function () {
        $location.url("/app/wx/me/mymembernew");
    }


    $scope.editit = function (theid) {
        $location.url("/app/wx/me/mymembernew?theid=" + theid + "&opertype=edit");
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
            if (comArr[i].key === theid) {
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


    $scope.delitact = function (theid) {
        maskLayer(1);

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=delmymember&theid='+theid,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=delmymember&theid=' + theid, serviceRoot2),
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





