'use strict';

window.addEventListener('shake', shakeEventDidOccur, false);

var media1 = document.getElementById("musicBox1");
var media2 = document.getElementById("musicBox2");

//shake event callback

function shake_act() {
    if (media1) {
        media1.play();
    }

    setTimeout(function () {
        $("#msg").show().animate({width: '300px'}, 1000).fadeOut(5000);
        if (media2) {
            media2.play();
        }
    }, 3000);
}


app.controller('FirstPageCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {


    $rootScope.currTitle = "首页";

    var slidesimg = "";
    $scope.getslidepic = function () {

        var options = {
            //http://192.168.3.51:8080/snsoft/user/Slideimg?actiontype=getSlideimg&mod_type=首页
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getmkslidepic&User=' + user_id + '&mod_type=首页', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'user/Slideimg?actiontype=getmkslidepic&user_id=' + user_id + '&mod_type=首页', serviceRoot2),
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
                             $rootScope.firstpage_imgloaded=true;
                             $rootScope.firstpage_slides=$scope.slides;


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




    if($rootScope.firstpage_imgloaded)//用于判断轮播图是否已经加载，如果已经加载就不需要重新调接口
    {
        $scope.slides=$rootScope.firstpage_slides;
    }
    else
    {
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


    chgBottomTab(0);


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);

