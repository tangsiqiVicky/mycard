'use strict';


var templocation = "";
var templocation_pos = "";

var temp_province = "";
var temp_city = "";
var temp_district = "";

function After_ClickOnMap(pt, pos, addr) {
    $("#templocation").html(addr);
}


app.controller('SelfNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams) {


    $rootScope.currTitle = "新建用户资料";


    $scope.user_id = $stateParams.user_id;

    $scope.opertype = $stateParams.opertype;


    if ($scope.opertype == "edit") {
        $rootScope.currTitle = "编辑用户资料";
    }


    $("#submit").click(function () {


        if ($scope.opertype == "edit") {
            var options = {

                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=edituserinfo',serviceRoot),
                url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=edituserinfo', serviceRoot2),
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
                    $.each(rv.data, function (idx, item) {

                        if (item.result == "1") {
                            isok = true;
                        }
                        else {
                            msg = item.result_text;
                        }
                    })

                    if (isok) {

                        setTimeout(function () {
                            $scope.$apply(function () {

                                $location.path("app/wx/me/self");


                            });
                        }, 500);


                    } else {
                        alert(msg)
                    }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("保存失败");
                }
            };
            $.ajax(options);
            return false;
        }


    });


    var theuser_id = "";
    var thenickname = "";
    var thepicture = "";
    var thephone = "";
    var theemail = "";
    var theaddress = "";
    var theheadimgurl = "";


    $scope.data = [];

    if ($scope.opertype == "edit") {

//load data
        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getusrinfo&user_id=' + $scope.user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getuserinfo&user_id=' + $scope.user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {

                var isok = false;
                var msg = "";


                $.each(rv.data, function (idx, item) {
                    if (item.result == "1") {
                        isok = true;

                        theuser_id = item.user_id;
                        thenickname = item.nickname;
                        thepicture = item.picture;
                        thephone = item.phone;
                        theemail = item.email;
                        theaddress = item.address;
                        theheadimgurl = item.headimgurl;

                        if (thepicture == "" || thepicture == null) {
                            thepicture = theheadimgurl;
                        }


                    }
                    else {
                        msg = item.result_text;
                    }

                })


                if (isok) {


                    setTimeout(function () {
                        $scope.$apply(function () {


                            $scope.user_id = theuser_id;
                            $scope.nickname = thenickname;
                            $scope.picture = thepicture;
                            $scope.phone = thephone;
                            $scope.email = theemail;
                            $scope.address = theaddress;

                            if ($scope.picture.indexOf("http") < 0) {
                                $scope.thepicture = serviceRoot + $scope.picture;
                            }
                            else {
                                $scope.thepicture = $scope.picture;
                            }


                            $("previewimg_picture").attr("src", $scope.thepicture);


                        });
                    }, 500);


                } else {
                    alert(msg);
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);


    }




    $scope.chooseimg=function(theinputid)
    {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId = res.localIds;
                //alert('已选择 ' + res.localIds.length + ' 张图片');


                var i = 0, length = images.localId.length;
                images.serverId = [];
                function upload() {
                    wx.uploadImage({
                        localId: images.localId[i],
                        success: function (res) {
                            i++;
                            //alert('已上传：' + i + '/' + length);
                            images.serverId.push(res.serverId);
                            if (i < length) {
                                upload();
                            }
                            else
                            {
                                var allserverId="";
                                for(var k=0;k<images.serverId.length;k++)
                                {
                                    allserverId=allserverId+images.serverId[k]+"~~X";
                                }
                                if(allserverId!="")
                                {
                                    allserverId=allserverId.substring(0,allserverId.length-3);
                                }
                                $scope.allserverId=allserverId;

                                $scope.uploadimg(theinputid,allserverId);
                            }
                        },
                        fail: function (res) {

                            alert(JSON.stringify(res));
                        }
                    });
                }
                upload();

            }
        });


    }


    $scope.uploadimg = function (theinputid, allserverId) {

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=user', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=user', serviceRoot2),
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


                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $("#" + theinputid).val(rv.uploadfilepath);
                            $("#previewimg_" + theinputid).attr("src", serviceRoot + rv.uploadfilepath);

                        });
                    }, 500);


                } else {
                    alert(msg);
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);


    }


    $scope.chgsearchcenter = function (id) {

        is_select = true;

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w,
            height: page_h - 30,
            target: id,
            container: ""
        });

        $("#mapcontainer").css("height", (page_h - 120) + "px");
    }


    $scope.close = function () {
        $.closePopupLayer("myStaticPopup");
    }


    $scope.ok = function (arg) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.address = templocation;
                $scope.longitude = templocation_pos.split(",")[0];
                $scope.latitude = templocation_pos.split(",")[1];

                $scope.province = temp_province;
                $scope.city = temp_city;
                $scope.district = temp_district;


                $scope.close();
            });
        }, 50);

    };

    $scope.cancel = function () {
        $scope.close();
    };


}]);


function initbaidumap() {

    if (!is_load_baidumap) {
        loadbaiduapi();
    }


}


try {
    setTimeout(function () {

        is_load_baidumap = false;

        initbaidumap();


    }, 100);
} catch (e) {
}

