'use strict';

app.controller('MyPublishMsgNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams','ngTableParams',  function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams,ngTableParams) {


    $rootScope.currTitle = "新建发布消息";

    $scope.shop_id = $stateParams.shop_id;
    $scope.to_id = $stateParams.to_id;

    $scope.theid = $stateParams.theid;

    $scope.opertype = $stateParams.opertype;


    if ($scope.opertype == "edit") {
        $rootScope.currTitle = "编辑消息";
    }


    $("#shop_id").val($scope.shop_id);
    $("#to_id").val($scope.to_id);


    $("#submit").click(function () {

        if ($("#shop_id").val() == "") {
            alert("请输入商家编号");
            return;
        }
        if ($("#to_id").val() == "") {
            alert("请输入接收人");
            return;
        }
        if ($("#message").val() == "") {
            alert("请输入消息内容");
            return;
        }


        if ($scope.opertype == "edit")
        {
            var options = {

                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=editmessages&theid='+$scope.theid,serviceRoot),
                url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=editmessages&theid=' + $scope.theid, serviceRoot2),
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

                                $location.path("app/wx/me/mypublish_msg");


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
        else {
            var options = {

                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=savenewmessages&from_id='+user_id,serviceRoot),
                url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=savenewmessages&from_id=' + user_id, serviceRoot2),
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

                                $location.path("app/wx/me/mypublish_msg");


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


    $scope.data = [];

    if ($scope.opertype == "edit") {

//load data
        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmysendmessagesdetail&theid='+$scope.theid+'&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getmysendmessagesdetail&theid=' + $scope.theid + '&user_id=' + user_id, serviceRoot2),
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


                if (rv.result == "1") {
                    isok = true;

                    $.each(rv.data, function (idx, item) {
                        $scope.id = item.id;
                        $scope.key = item.key;
                        $scope.messages = item.message;
                        $scope.shop_id = item.shop_id;
                        $scope.shop_name = item.shop_name;
                        $scope.from_id = item.from_id;
                        $scope.from_name = item.from_name;
                        $scope.to_id = item.to_id;
                        $scope.to_name = item.to_name;
                        $scope.create_time = item.create_time;
                        $scope.pic = item.pic;
                        $scope.voice = item.voice;

                        if ($scope.voice != "") {
                            $scope.havevoice = "assets/images/voice.png"
                        }
                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {
                } else {
                    alert(msg);
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);


    }


    $scope.chooseimg = function (theinputid) {
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
                            else {
                                var allserverId = "";
                                for (var k = 0; k < images.serverId.length; k++) {
                                    allserverId = allserverId + images.serverId[k] + "~~X";
                                }
                                if (allserverId != "") {
                                    allserverId = allserverId.substring(0, allserverId.length - 3);
                                }
                                $scope.allserverId = allserverId;

                                $scope.uploadimg(theinputid, allserverId);
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
   /* 获取商家*/

    $scope.open = function (id) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w,
            target: id,
            container: ""
            //hidebyclickbg:"false"
        });

    }


//func_obj=$scope.open;


    $scope.close = function () {
        $.closePopupLayer();

    }


    var data = [];


    var shop_id = "";
    var thegetshop_id = "autogetbyuser";
    if (user_id == "admin") {
        thegetshop_id = "-1";
    }
    $scope.getshops = function () {
        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getshops&User='+user_id+'&shop_id='+thegetshop_id+'&visible=-1&shop_type=-1',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=getshops&user_id=' + user_id + '&shop_id=' + thegetshop_id + '&visible=-1&shop_type=-1', serviceRoot2),
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

                    data = rv.data;

                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.data = data;
                            $scope.tableParams = new ngTableParams({
                                page: 1, // show first page
                                count: 5 // count per page
                            }, {
                                total: data.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            });
                            $scope.tableParams.reload();

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
    }



    $scope.getshops();


    $scope.getshop = function (shopid) {
        $scope.close();
        $("#shop_id").val(shopid);
        $("#products_type").val("");
    }

    $scope.uploadimg = function (theinputid, allserverId) {

        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=uploadimg&allserverId='+allserverId+'&user_id='+user_id+'&path=msg',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=msg', serviceRoot2),
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


    $scope.stopRecord = function (theinputid) {
        wx.stopRecord({
            success: function (res) {
                voices.localId = res.localId;
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    $scope.RecordEnd = function (theinputid) {
        wx.onVoiceRecordEnd({
            complete: function (res) {
                voices.localId = res.localId;
                alert('录音时间已超过一分钟');
            }
        });
    }

    $scope.record = function (theinputid) {
        voices.localId = "";
        wx.startRecord({
            cancel: function () {
                alert('用户拒绝授权录音');
            }
        });
    }

    $scope.play = function (theinputid) {
        if (voices.localId == '') {
            alert('请先录制一段声音');
            return;
        }
        wx.playVoice({
            localId: voices.localId
        });
    }

    $scope.stop = function (theinputid) {
        wx.stopVoice({
            localId: voices.localId
        });
    }

    $scope.uploadvoice = function (theinputid) {
        voices.serverId = [];


        if (voices.localId == '') {
            alert('请先录制一段声音');
            return;
        }

        function upload() {
            wx.uploadVoice({
                localId: voices.localId,
                success: function (res) {
                    alert('上传语音成功，serverId 为' + res.serverId);
                    voices.serverId.push(res.serverId);

                    var allvoiceserverId = "";
                    for (var k = 0; k < voices.serverId.length; k++) {
                        allvoiceserverId = allvoiceserverId + voices.serverId[k] + "~~X";
                    }
                    if (allvoiceserverId != "") {
                        allvoiceserverId = allvoiceserverId.substring(0, allvoiceserverId.length - 3);
                    }
                    $scope.allvoiceserverId = allvoiceserverId;

                    $scope.uploadvoiceACT(theinputid, allvoiceserverId);

                },
                fail: function (res) {

                    alert(JSON.stringify(res));
                }
            });
        }

        upload();


    }


    $scope.uploadvoiceACT = function (theinputid, allvoiceserverId) {

        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=uploadvoice&allvoiceserverId='+allvoiceserverId+'&user_id='+user_id+'&path=msg',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadvoice&allvoiceserverId=' + allvoiceserverId + '&user_id=' + user_id + '&path=msg', serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
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


}]);

