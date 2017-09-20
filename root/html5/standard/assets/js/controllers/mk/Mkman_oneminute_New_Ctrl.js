'use strict';

app.controller('Mkman_oneminute_New_Ctrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams) {


    $rootScope.currTitle = "新建名卡一分钟";

    $scope.theid = $stateParams.theid;

    $scope.opertype = $stateParams.opertype;


    if ($scope.opertype == "edit") {
        $rootScope.currTitle = "编辑名卡一分钟";
    }


    $("#submit").click(function () {

        if ($scope.opertype == "edit") {
            if ($("#ONE_TITLE").val() == "") {
                alert("请输入标题");
                return;
            }
            if ($("#ONE_DESC").val() == "") {
                alert("请输入详细描述");
                return;
            }
            if ($("#ThumbsPic").val() == "") {
                alert("请输入缩略图");
                return;
            }
            if ($("#Pic").val() == "") {
                alert("请输入大图");
                return;
            }

            var options = {

                // url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=edit_oneminute&theid=' + $scope.theid + '&allserverId=' + $scope.allserverId, serviceRoot),
                url: myforwardurl(serviceRoot2 + 'invite/getOneMinute?actiontype=edit_oneminute&theid=' + $scope.theid + '&allserverId=' + $scope.allserverId, serviceRoot2),
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
                        }
                        else {
                            msg = item.result_text;
                        }
                    })

                    if (isok) {

                        setTimeout(function () {
                            $scope.$apply(function () {

                                $location.path("app/wx/me/mkman_oneminute");


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


        }
        else {

            if ($("#ONE_TITLE").val() == "") {
                alert("请输入标题");
                return;
            }
            if ($("#ONE_DESC").val() == "") {
                alert("请输入详细描述");
                return;
            }
            if ($("#ThumbsPic").val() == "") {
                alert("请输入缩略图");
                return;
            }
            if ($("#Pic").val() == "") {
                alert("请输入大图");
                return;
            }

            var options = {

                //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=add_oneminute&allserverId=' + $scope.allserverId, serviceRoot),
                url: myforwardurl(serviceRoot2 + 'invite/getOneMinute?actiontype=add_oneminute&allserverId=' + $scope.allserverId, serviceRoot2),
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
                        }
                        else {
                            msg = item.result_text;
                        }
                    })

                    if (isok) {

                        setTimeout(function () {
                            $scope.$apply(function () {

                                $location.path("app/wx/me/mkman_oneminute");


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


        }


    });


    $scope.data = [];

    if ($scope.opertype == "edit") {

//load data
        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getoneminutedetail&theid=' + $scope.theid + '&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'invite/getOneMinute?actiontype=getoneminutedetail&theid=' + $scope.theid + '&user_id=' + user_id, serviceRoot2),
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


                if (rv.result == "1") {
                    isok = true;

                    $.each(rv.data, function (idx, item) {

                        $scope.key = item.key;
                        $scope.ONE_TITLE = item.ONE_TITLE;
                        $scope.ThumbsPic = item.ThumbsPic;
                        $scope.Pic = item.Pic;
                        $scope.ONE_DESC = item.ONE_DESC;
                        $scope.ONE_DESC_short = item.ONE_DESC_short;
                        $scope.make_date = item.make_date;
                        $scope.isvalid = (item.isvalid == "true") ? "true" : "";
                        $scope.SortNo = item.SortNo;


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


    $scope.uploadimg = function (theinputid, allserverId) {

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=oneminute', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=oneminute', serviceRoot2),
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


}]);

