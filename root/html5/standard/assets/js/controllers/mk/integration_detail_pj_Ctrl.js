'use strict';


var data = [{
    id: 1,
    name: "Batman",
    alias: "Bruce Wayne",
    publisher: "DC Comics",
    gender: "male",
    power: 37
}, {
    id: 13,
    name: "Rogue",
    alias: "Anna Marie",
    publisher: "Marvel Comics",
    gender: "female",
    power: 80
}];


app.controller('integration_detail_pj_Ctrl', ["$window", "$scope", "$rootScope", "ngTableParams", function ($window, $scope, $rootScope, ngTableParams) {


    $rootScope.currTitle = "待评价消费记录";


    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getranklist&user_id='+user_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getranklist&user_id=' + user_id, serviceRoot2),
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


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);





