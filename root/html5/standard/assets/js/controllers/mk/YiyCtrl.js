'use strict';


window.addEventListener('shake', shakeEventDidOccur, false);

var media1 = document.getElementById("musicBox1");
var media2 = document.getElementById("musicBox2");

var hand = document.getElementById("hand");
//shake event callback

function shake_act() {
    if (media1) {
        media1.play();
    }


    hand.className = "hand hand-animate"


    setTimeout(function () {
        var result = document.getElementById("result");
        result.className = "result";
        var arr = ['妹子一枚', '优惠券一张', '电影票两张', '土豪金一台'];
        var num = Math.floor(Math.random() * 4);
        result.innerHTML = "恭喜，摇得" + arr[num] + "！";
        setTimeout(function () {
            result.className = "result result-show";
            if (media2) {
                media2.play();
            }

            hand.className = "hand";


            After_shake_act();


        }, 1000);

    }, 3000);
}

/*
 wx.stopSearchBeacons({
 complete:function(res){
 //关闭查找完成后的回调函数
 }
 });



 wx.onSearchBeacons({
 complete:function(argv){
 //回调函数，可以数组形式取得该商家注册的在周边的相关设备列表
 alert("onSearchBeacons:"+argv)
 }
 });


 */


function After_shake_act() {
    scope.yiybtn_act();
}


app.controller('YiyCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams) {


    $rootScope.currTitle = "摇一摇";

    scope = $scope;

    var validno = "";


    $scope.after_yiy = function (argv) {

        alert(argv)
    }


    $scope.handclick = function () {
        shake_act();
    }


    $scope.yiybtn_act = function () {


        var device_id = "6431601";
        var uuid = "FDA50693-A4E2-4FB1-AFCF-C6EB07647825";
        var major = "10069";
        var minor = "11126";


        var options = {
            //url:myforwardurl(serviceRoot+'snwx_act?mytype=beacon_adddevice&user_id='+user_id+'&group_name=snsoft&device_id='+device_id+'&uuid='+uuid+'&major='+major+'&minor='+minor,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWXWX/?mytype=beacon_adddevice&user_id=' + user_id + '&group_name=snsoft&device_id=' + device_id + '&uuid=' + uuid + '&major=' + major + '&minor=' + minor, serviceRoot2),
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
                    msg = rv.result_text;

                }
                else {
                    msg = rv.result_text;
                }


                //if(isok){//alert("获取数据成功")
                //alert(msg)


                wx.startSearchBeacons({
                    ticket: "",  //摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
                    complete: function (argv) {
                        //开启查找完成后的回调函数

                        alert("argv:" + argv);

                    }
                });

                alert("isok")


                //}else{alert(msg)}


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


    $scope.yiybtn_act();


}]);



