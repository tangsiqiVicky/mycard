'use strict';


app.controller('producttypeinfoCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', '$compile', "SweetAlert", function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $compile, SweetAlert) {


    $rootScope.currTitle = "商品类别";

    $scope.shop_id = $stateParams.shop_id;
    $scope.producttype = $stateParams.product_type;//request.QueryString("subtype");


    var cartnum = 0;
    var slidesimg = "";

    $scope.slidesimggroup = [];
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
        total: $scope.slidesimggroup.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            $defer.resolve($scope.slidesimggroup.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.getproducttype = function () {

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getproducttypedetail&shop_id=' + $scope.shop_id + '&producttype=' + $scope.producttype + '&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getproducttypedetail&shop_id=' + $scope.shop_id + '&producttype=' + $scope.producttype + '&user_id=' + user_id, serviceRoot2),
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


                if (rv.result == "1") {
                    isok = true;

                    $.each(rv.data, function (idx, item) {
                        $scope.id = item.id;
                        $scope.key = item.key;
                        $scope.shop_id = item.shop_id;
                        $scope.products_type = item.products_type;
                        $scope.slidesimg = item.slidesimg;
                        $scope.more_desc = item.more_desc;
                        $scope.moreimg = item.moreimg;


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {

                    $("#producttypedesc").html($scope.more_desc);


                    var comArr = $scope.moreimg.split(";");
                    for (var s = 0; s < comArr.length; s++) {
                        if (comArr[s] != "") {
                            var theimg = {}
                            theimg.key = s;
                            theimg.slidesimg = comArr[s];
                            $scope.slidesimggroup.push(theimg);

                        }
                    }

                    $scope.tableParams.reload();


                    // 轮播图数据初始化
                    $scope.slides = [];
                    // 添加轮播图源
                    var slidesimgs = $scope.slidesimg.split(";");
                    for (var im = 0; im < slidesimgs.length; im++) {
                        if (slidesimgs[im] != "") {
                            $scope.slides.push({image: slidesimgs[im], text: ''});
                        }
                        //$scope.slides.push({ image: 'assets/images/slider/home-slide1.jpg', text: '三方共赢' });
                        //$scope.slides.push({ image: 'assets/images/slider/home-slide2.jpg', text: '一站式解决联盟商家、会员的积分盈利体系' });
                    }


                } else {
                    alert(msg);
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);
    }


    $scope.getproducttype();


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


    setTimeout(function () {
        $rootScope.logit(user_id, 'shop', $scope.shop_id, $rootScope.currTitle);
    }, 2000);


}]);






