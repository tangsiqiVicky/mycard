$(document).ready(function (ev) {


    $.supersized({
        // Functionality
        slide_interval: 10000,		// Length between transitions
        transition: 1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        transition_speed: 700,		// Speed of transition
        // Components
        slide_links: 'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
        slides: [			// Slideshow Images

            {image : 'assets/images/_bg001.jpg'},
            {image : 'assets/images/_bg002.jpg'},
            {image : 'assets/images/_bg003.jpg'},
            {image : 'assets/images/_bg004.jpg'}


        ]
    });






})



app.controller('dcdetailCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', "$interval",function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $interval) {

    $rootScope.currTitle = "问卷查询";

    $scope.visible=false;
    var issending = 0;
    var wait = 60;

    $scope.description = "获取验证码";
    $scope.flag = true;
    var second = 59;
    var timerHandler;
    $scope.sendCode = function () {
        if(validatemobile($("#mobile").val())){
            $scope.flag = false;
            $scope.getsmscode();
            $("#validno").focus();
            if (timerHandler) {
                return;
            }
            timerHandler = $interval(function () {
                if (second <= 0) {
                    $interval.cancel(timerHandler);
                    second = 59;
                    $scope.description = "获取验证码";
                    timerHandler = null;
                    $scope.flag = true;
                } else {
                    $scope.description = second + " 秒后重发";
                    second--;
                    $scope.flag = false;
                    
                }
            }, 1000, 100);
        }else{

        }


    };


    function validatemobile(mobile)
    {
        if(mobile.length==0)
        {
            alert('请输入手机号码，^_^');
            $("#mobile").focus();
            return false;
        }
        if(mobile.length!=11)
        {
            alert('请输入有效的手机号码，→_→');
            $("#mobile").focus();
            return false;
        }

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
        if(!myreg.test(mobile))
        {
            alert('请输入有效的手机号码，→_→');
            $("#mobile").focus();
            return false;
        }
        else{
            return true;
        }
    }
    $scope.getsmscode = function () {


    maskLayer(1);

        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getmobvalidno&mobile=' + $scope.Owner, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'user/getmobvalidno?mobile=' + $('#mobile').val(), serviceRoot2),
            async: true,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {
                maskLayer(0);
                // if (rv.result == "1") {
                //     alert("验证码已发送，请注意查收。。。");
                // }

                issending = 0;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                maskLayer(0);
                // alert("获取验证码失败，请检查短信网关");
                issending = 0;

            }

        };
        $.ajax(options);


    }






    function myDc() {


        maskLayer(1);


        var options = {

            url: myforwardurl(serviceRoot2 + 'invite/requestNaire?actiontype=getdataDc_record&tel='+$('#mobile').val()+'&validno='+$("#validno").val(), serviceRoot2),
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

                    $scope.visible=true;

                     maskLayer(0);
                     
                }else{
                    alert("验证码有误 >_<||| ");
                    $scope.visible=false;

                     maskLayer(0);
                }


            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);


    }



    $scope.submit=function () {

        myDc();


    }

    $scope.showqrcode = function (poid,giftshorturl)
    {

        $scope.PO_ID=poid;
        var shorturl=giftshorturl;
        $scope.giftqrcode=shorturl+"?po_id="+$scope.PO_ID;
        $scope.isok="true";
        $("#qrcode2").attr("src", serviceRoot + "qrcode?msg=" + $scope.giftqrcode + "&width=200&height=200");
        $("#look").attr("href", $scope.giftqrcode);

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w*0.6,
            target: 'payContent2',
            container: "",
            hidebyclickbg: "true"
        });


    }








































    showmenu(false);


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);



}]);





