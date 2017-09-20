

app.controller('dcmanCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', "$interval",function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $interval) {

    $rootScope.currTitle = "问卷管理";

$scope.dc_name="";
$scope.dc_logo="";

    function DcList() {


        maskLayer(1);


        var options = {

            url: myforwardurl(serviceRoot2 + 'invite/requestNaire?actiontype=getAllDc', serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm:true,
            timeout:60000,
            // jsonp:'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";
                console.info('rv',rv);
                $scope.data = rv.data;

                if(rv.result=="1"){

                     maskLayer(0);

                }else{

                     maskLayer(0);
                }


            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);


    }


DcList();




    $scope.showqrcode = function (dc_id,dc_name,dc_logo)
    {
        if(dc_logo==""||dc_logo==null){dc_logo="/html5/standard/assets/images/just_logo.png";}
        $scope.dc_name=dc_name;
        $scope.dc_logo=dc_logo;
        $scope.giftqrcode=serviceRoot+"/html5/dc.html?dc_id="+dc_id;
        $("#qrcode2").attr("src", serviceRoot + "qrcode?msg=" + $scope.giftqrcode + "&width=200&height=200");

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w*0.8,
            target: 'payContent2',
            container: "",
            hidebyclickbg: "true"
        });


        $scope.tofriendall();
        $scope.tofriend();


    }










    $scope.tofriendall = function ()//朋友圈
    {
        var pageTitle = $scope.dc_name;
        var pageUrl = $scope.giftqrcode;

        if(pageUrl==""){myalert("请先选择要分享的调查问卷");return;}


        wx.onMenuShareTimeline({
            title: pageTitle, // 分享标题
            link: pageUrl, // 分享链接
            imgUrl: serviceRoot+$scope.dc_logo, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                setTimeout(function () {
                    $rootScope.logit(user_id, 'gift', pageUrl, $rootScope.currTitle);
                }, 2000);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            fail: function (res) {
                alert("分享失败，请重新尝试");
            }
        });

    }


    $scope.tofriend = function ()//朋友
    {

        var pageTitle = $scope.dc_name;
        var pageUrl = $scope.giftqrcode;

        if(pageUrl==""){myalert("请先选择要分享的调查问卷");return;}

        wx.onMenuShareAppMessage({
            title: pageTitle, // 分享标题
            desc: "请您参与问卷，完成后不要忘记填写您的小礼品收货地址，剩下的就交给快递小哥吧", // 分享描述
            link: pageUrl, // 分享链接
            imgUrl: serviceRoot+$scope.dc_logo, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: pageUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                setTimeout(function () {
                    $rootScope.logit(user_id, 'gift', pageUrl, $rootScope.currTitle);
                }, 2000);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });


    }


































    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);






}]);


app.filter('textLengthSet', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');//'...'可以换成其它文字
    };
})





loadwxjs();
