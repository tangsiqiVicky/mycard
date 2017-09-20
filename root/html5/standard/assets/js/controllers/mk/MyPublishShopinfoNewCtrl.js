'use strict';


var templocation = "";
var templocation_pos = "";

var temp_province = "";
var temp_city = "";
var temp_district = "";

function After_ClickOnMap(pt, pos, addr) {
    $("#templocation").html(addr);
}


app.controller('MyPublishShopinfoNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', 'ngTableParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams, ngTableParams) {


    $rootScope.currTitle = "新建商家资料";


//editor begin


    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReady = function () {
        // ...
    };


//editor end


    $scope.shop_id = $stateParams.shop_id;

    $scope.opertype = $stateParams.opertype;


    if ($scope.opertype == "edit") {
        $rootScope.currTitle = "编辑商家资料";
        $("#shop_id").attr("readOnly", true);
    }


    $scope.shop_type = "shop";


    var namestr = "酒店,餐饮,汽车,美容,娱乐,健身,超市,学校,医院,园区,专卖店";
    var namestrs = namestr.split(",");
    var str = "hotel,restaurant,car,cosmetology,entertainment,body,supermarket,school,hospital,park,mall";
    var strs = str.split(",");

    $scope.subtypes = [];

    for (var i = 0; i < strs.length; i++) {
        var theitem = {};
        theitem.id = strs[i];
        theitem.name = namestrs[i];
        $scope.subtypes.push(theitem);
    }


    $scope.slidesimggroup = [];

    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 8 // count per page
    }, {
        total: $scope.slidesimggroup.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            $defer.resolve($scope.slidesimggroup.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $("#name").blur(function () {
        if ($scope.opertype == "edit") {
            return;
        }

//if($("#shop_id").val()==""){alert("请输入商家编号");return;}
        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=checkshopidexist&shop_id='+$("#shop_id").val()+"&name="+$("#name").val(),serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=checkshopidexist&shop_id=' + $("#shop_id").val() + "&name=" + $("#name").val(), serviceRoot2),
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
                $.each(rv.data, function (idx, item) {

                    if (item.result == "1") {
                        alert("此商家已存在");
                        $("#shop_id").val("");
                        $("#name").val("");
                        $("#shop_id").focus();
                    }
                    else {

                    }
                })


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("当前商家验证失败");
                $("#shop_id").val("");
            }
        };
        $.ajax(options);
        return false;

    });


    $("#submit").click(function () {

        if ($("#admin_tel").val() == "") {
            alert("请输入管理人手机号");
            return;
        }

        if ($scope.opertype == "edit") {
            var options = {

                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=editshopinfo&shop_id='+$scope.shop_id,serviceRoot),
                url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=editshopinfo&shop_id=' + $scope.shop_id, serviceRoot2),
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

                                $location.path("app/wx/me/mypublish_shopinfo");


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

                //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=addshopinfo&user_id='+user_id,serviceRoot),
                url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=addshopinfo&user_id=' + user_id, serviceRoot2),
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

                                $location.path("app/wx/me/mypublish_shopinfo");


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


    if ($scope.opertype == "edit") {

//load data
        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getshopdetail&shop_id='+$scope.shop_id+'&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getShopDetail&shop_id=' + $scope.shop_id + '&user_id=' + user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            // jsonp:'callback',
            success: function (rv) {
                console.info('rv',rv);
                var isok = false;
                var msg = "";



                if (rv.result == "1") {
                    isok = true;

                    $.each(rv.data, function (idx, item) {
                        $scope.shop_id = item.shop_id;
                        $scope.name = item.name;
                        $scope.admin_tel = item.admin_tel;
                        $scope.shop_type = item.shop_type;
                        $scope.subtype = item.subtype;
                        $scope.province = item.province;
                        $scope.city = item.city;
                        $scope.district = item.district;
                        $scope.address = item.address;
                        $scope.contact = item.contact;
                        $scope.contact_phone = item.contact_phone;


                        $scope.photo = item.photo;
                        $scope.logo = item.logo;
                        $scope.slidesimg = item.slidesimg;
                        $scope.desc = item.desc;
                        $scope.latitude = item.latitude;
                        $scope.longitude = item.longitude;
                        $scope.star = item.star;

                        $scope.admin_tel = item.admin_tel;

                        $scope.visible = item.visible;
                        $scope.priority = item.priority;


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

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=uploadimg&allserverId='+allserverId+'&user_id='+user_id+'&path=shop',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=shop', serviceRoot2),
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


$(function ($) {

    loadwxjs();

    loadbaiduapi();

});
