'use strict';


var templocation = "";
var templocation_pos = "";

var temp_province = "";
var temp_city = "";
var temp_district = "";

function After_ClickOnMap(pt, pos, addr) {
    $("#templocation").html(addr);
}



app.controller('RegShopCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', 'ngTableParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams, ngTableParams) {


    $rootScope.currTitle = "商户注册";


    $scope.theinvitor = $stateParams.theinvitor;


    $scope.agree_value = true;

    $scope.shop_type = "shop";

    $scope.visible="1";
    $scope.priority="1";



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
        count: 10 // count per page
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

if($("#name").val()==""){alert("请输入商家名称");return;}
        var options = {

            // url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=checkshopidexist&shop_id=' + $("#shop_id").val() + "&name=" + $("#name").val(), serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=checkshopidexist&shop_id=' + $("#shop_id").val() + "&name=" + $("#name").val(), serviceRoot2),
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
        if ($("#agree").val() != "true") {
            alert("请同意商户认证协议");
            return;
        }
        var options = {

            // url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=addshopinfo&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=addshopinfo&user_id=' + user_id, serviceRoot2),
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
                var admin_tel = "";
                var password = "";
                $.each(rv.data, function (idx, item) {

                    if (item.result == "1") {
                        isok = true;
                        admin_tel = item.admin_tel;
                        password = item.password;
                    }
                    else {
                        msg = item.result_text;
                    }
                })

                if (isok) {

                    setTimeout(function () {
                        $scope.$apply(function () {

                            alert("注册成功，现在将以管理人身份登录")

                            $location.url("login/signin?uid=" + admin_tel + "&pwd=" + password + "&isreglogin=1");


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


    $scope.slidesimg = "";

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

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=shop', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=shop', serviceRoot2),
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

                            //$("#"+theinputid).val($("#"+theinputid).val()+";"+rv.uploadfilepath);
                            //$("#previewimg_"+theinputid).attr("src",serviceRoot+rv.uploadfilepath);


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
            width: page_w*0.9,
            height: page_h*0.9,
            target: id,
            container: ""
        });


//$("#mapcontainer").css("width",(page_w-15)+"px");
        $("#mapcontainer").css("height", (page_h*0.9 - 80) + "px");


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


    $scope.openlaw = function (id) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w*0.9,
            height: page_h*0.9,
            target: id,
            container: ""
            //hidebyclickbg:"false"
        });

    }


    $scope.closelaw = function () {
        $.closePopupLayer();

    }





 try {
        showmenu(false);
    } catch (e) {
    }

loadwxjs();

 loadbaiduapi();





}]);








