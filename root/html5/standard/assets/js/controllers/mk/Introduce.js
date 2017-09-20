'use strict';


app.controller('Introduce', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams) {


    $rootScope.currTitle = "商家介绍";


    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getproducts&shop_id='+user_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getproducts&shop_id=' + user_id, serviceRoot2),
        async: false,
        type: 'get',
        dataType: 'json',
        data: $("#f1").serializeArray(),
        resetForm: true,
        timeout: 60000,
        // jsonp:'callback',

        success: function (rv) {
            console.info('grtproducts', rv);
            var isok = false;
            var msg = "";
            isok = true;
            data = rv.data;
            //alert(data.length)

            if (isok) {//alert("获取数据成功")
                //alert(msg)
                $scope.tabs = [{
                    title: 'Dynamic Title 1',
                    content: 'Dynamic content 1'
                }, {
                    title: 'Dynamic Title 2',
                    content: 'Dynamic content 2',
                    disabled: false
                }];

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












