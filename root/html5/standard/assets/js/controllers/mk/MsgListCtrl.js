'use strict';


app.controller('MsgListCtrl', ["$window", "$scope", "$rootScope", "ngTableParams", function ($window, $scope, $rootScope, ngTableParams) {

    var data = [];

    $rootScope.currTitle = "我的消息";

    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmymessages&user_id='+user_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getmymessages&user_id=' + user_id, serviceRoot2),
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
                console.info('msg',rv);
                $.each(rv.data, function (idx, item) {
                    var thetab = {};
                    thetab.id = item.id;
                    thetab.key = item.key;
                    thetab.messages = item.messages;
                    thetab.shop_id = item.shop_id;
                    thetab.shop_name = item.shop_name;
                    thetab.from_id = item.from_id;
                    thetab.from_name = item.from_name;
                    thetab.to_id = item.to_id;
                    thetab.to_name = item.to_name;
                    thetab.create_time = item.create_time;


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





