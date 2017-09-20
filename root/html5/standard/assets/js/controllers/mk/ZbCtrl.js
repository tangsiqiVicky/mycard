'use strict';

app.controller('ZbCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {


    $rootScope.currTitle = "周边";


    var slidesimg = "";
    $scope.getslidepic = function () {

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmkslidepic&User='+user_id+'&mod_type=周边',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'user/Slideimg?actiontype=getmkslidepic&mod_type=周边', serviceRoot2),
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


                        slidesimg = item.slidesimg;


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)
                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.slidesimg = slidesimg;

                            // 轮播图数据初始化
                            $scope.slides = [];
                            // 添加轮播图源
                            var slidesimgs = slidesimg.split(";");
                            for (var im = 0; im < slidesimgs.length; im++) {
                                if (slidesimgs[im] != "") {
                                    $scope.slides.push({image: slidesimgs[im], text: ''});
                                }
                                //$scope.slides.push({ image: 'assets/images/slider/home-slide1.jpg', text: '三方共赢' });
                                //$scope.slides.push({ image: 'assets/images/slider/home-slide2.jpg', text: '一站式解决联盟商家、会员的积分盈利体系' });
                            }


                            //用于判断轮播图是否已经加载，如果已经加载就不需要重新调接口
                            $rootScope.zb_imgloaded = true;
                            $rootScope.zb_slides = $scope.slides;


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
        return false;
    }


    if ($rootScope.zb_imgloaded)//用于判断轮播图是否已经加载，如果已经加载就不需要重新调接口
    {
        $scope.slides = $rootScope.zb_slides;
    }
    else {
        $scope.getslidepic();
    }


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

