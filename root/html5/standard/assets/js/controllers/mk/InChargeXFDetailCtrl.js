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


app.controller('InChargeXFDetailCtrl', ["$window", "$scope", "$rootScope", "ngTableParams", function ($window, $scope, $rootScope, ngTableParams) {

    $rootScope.currTitle = "储值消费明细";


    var shop_id = $rootScope.arg0;

    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getcardhistory&user_id='+user_id+"&shop_id="+shop_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getcardhistory&user_id=' + user_id + "&shop_id=" + shop_id, serviceRoot2),
        async: false,
        type: 'get',
        dataType: 'json',
        data: $("#f1").serializeArray(),
        resetForm: true,
        timeout: 60000,
        // jsonp:'callback',
        success: function (rv) {
            console.info('getcardhistory', rv);
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





