'use strict';


var data = [{
    id: 1,
    title: "如何注册？",
    content: ""
}, {
    id: 2,
    title: "忘记密码怎么办？",
    content: ""
}, {
    id: 3,
    title: "如何邀请好友？",
    content: ""
}];


app.controller('ProblemCtrl', ["$window", "$scope", "$rootScope", "ngTableParams", function ($window, $scope, $rootScope, ngTableParams) {

    $rootScope.currTitle = "常见问题";

    var options = {
        url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getorderlist&user_id=' + user_id, serviceRoot),
        async: false,
        type: 'get',
        dataType: 'jsonp',
        data: $("#f1").serializeArray(),
        resetForm: true,
        timeout: 60000,
        jsonp: 'callback',
        success: function (rv) {
            var isok = false;
            var msg = "";

            $.each(rv.data, function (idx, item) {
                if (item.result == "1") {
                    isok = true;
                    msg = item.result_text;
                }
                else {
                    msg = item.result_text;
                }
            })


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


    $scope.open = function (id) {


        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w * 0.8,
            target: id,
            container: ""
        });

    }


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);

}]);




