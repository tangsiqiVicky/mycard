'use strict';


app.controller('mkslidepicCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', 'ngTableParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams, ngTableParams) {


    $rootScope.currTitle = "MK轮播图";

    $scope.mod_type = $stateParams.mod_type;


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


    $("#submit").click(function () {


        if ($("#slidesimg").val() == "") {
            alert("请选择图片");
            return;
        }

        var options = {

            url: myforwardurl(serviceRoot2 + 'user/Slideimg?actiontype=savemkslidepic&user_id=' + user_id, serviceRoot2),
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

                            $location.path("app/wx/me/mkslidepictype");


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


    });


//load data
    var options = {

        url: myforwardurl(serviceRoot2 + 'user/Slideimg?actiontype=getmkslidepic&user_id=' + user_id + '&mod_type=' + $scope.mod_type, serviceRoot2),
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

                    $scope.slidesimg = item.slidesimg;

                })
            }
            else {
                msg = rv.result_text;
            }


            if (isok) {


                var comArr = $scope.slidesimg.split(";");
                for (var s = 0; s < comArr.length; s++) {
                    if (comArr[s] != "") {
                        var theimg = {}
                        theimg.key = s;
                        theimg.slidesimg = comArr[s];
                        $scope.slidesimggroup.push(theimg);
                        $scope.tableParams.reload();
                    }
                }

                $scope.getallslideimg("slidesimg");


            } else {
                alert(msg);
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    };
    $.ajax(options);


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


    $scope.delit = function (theid) {

        var index = -1;
        var comArr = $scope.slidesimggroup;
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].key === theid) {
                index = i;

                break;
            }
        }

        if (index === -1) {
            alert("找不到行");
        }

        if (index > -1) {
            $scope.slidesimggroup.splice(index, 1);
        }


        $scope.tableParams.reload();

        $scope.getallslideimg("slidesimg");

    }


    $scope.getallslideimg = function (theinputid) {
        $scope.slidesimg = "";

        for (var k = 0; k < $scope.slidesimggroup.length; k++) {
            if ($scope.slidesimggroup[k].slidesimg != "") {
                $scope.slidesimg = $scope.slidesimg + $scope.slidesimggroup[k].slidesimg + ";";
            }
        }
        if (theinputid) {
            $("#" + theinputid).val($scope.slidesimg);
        }
    }

    $scope.uploadimg = function (theinputid, allserverId) {

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=mk', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=mk', serviceRoot2),
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


                            if (theinputid == "slidesimg") {
                                var theimg = {}
                                theimg.key = $scope.slidesimggroup.length
                                theimg.slidesimg = rv.uploadfilepath;
                                $scope.slidesimggroup.push(theimg);
                                $scope.tableParams.reload();

                                $scope.getallslideimg(theinputid);

                            }
                            else if (theinputid == "logo") {
                                $scope.logo = rv.uploadfilepath;
                                $("#previewimg_" + theinputid).attr("src", serviceRoot + rv.uploadfilepath);
                            }
                            else if (theinputid == "photo") {
                                $scope.photo = rv.uploadfilepath;
                                $("#previewimg_" + theinputid).attr("src", serviceRoot + rv.uploadfilepath);
                            }


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


$(function ($) {

    loadwxjs();

});


