'use strict';

app.controller('MyPublishGoodsTypeNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', 'ngTableParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams, ngTableParams) {


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


    $rootScope.currTitle = "新建商品分类";

    $scope.shop_id = $stateParams.shop_id;
    $scope.products_type = $stateParams.products_type;

    $("#shop_id").val($scope.shop_id);
    $("#products_type").val($scope.products_type);
    $("#products_type").focus();


    /*
     $("#shop_id").blur(function(){


     if($("#shop_id").val()==""){alert("请输入商家编号");return;}
     var options = {

     url:myforwardurl(serviceRoot+'mk_main_info?actiontype=checkshopid_and_user&shop_id='+$("#shop_id").val()+'&user_id='+user_id,serviceRoot),

     async: false,
     type: 'get',
     dataType: 'jsonp',
     data: $("#f1").serializeArray(),
     resetForm:true,
     timeout:60000,
     jsonp:'callback',
     success: function (rv) {

     var isok=false;
     var msg="";
     $.each(rv.data,function(idx,item){

     if(item.result=="1")
     {
     isok=true;
     }
     else
     {
     msg=item.result_text;
     }
     })

     if(isok){//alert("检查成功")
     }else{alert(msg);$("#shop_id").val("");}




     },
     error: function(XMLHttpRequest, textStatus, errorThrown) {
     alert("当前用户与商家验证失败");
     $("#shop_id").val("");
     }
     };
     $.ajax(options);
     return false;

     });
     */


    $("#submit").click(function () {

        if ($("#shop_id").val() == "") {
            alert("请输入商家编号");
            return;
        }
        if ($("#products_type").val() == "") {
            alert("请输入分类名称");
            return;
        }


        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=add_products_type',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/products?actiontype=add_products_type', serviceRoot2),
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

                            $location.path("app/wx/me/mypublish_goodstype");


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


    $scope.getshop = function (shopid) {
        $scope.close();
        $("#shop_id").val(shopid);

    }


    $scope.open = function (id) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w * 0.9,
            height: page_h * 0.9,
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

                    $.each(rv.data, function (idx, item) {
                        shop_id = item.shop_id;
                    })


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


    $scope.slidesimggroup = [];
    $scope.tableParams3 = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
        total: $scope.slidesimggroup.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            $defer.resolve($scope.slidesimggroup.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.moreimggroup = [];
    $scope.tableParams4 = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
        total: $scope.moreimggroup.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            $defer.resolve($scope.moreimggroup.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
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


        $scope.tableParams3.reload();

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


    $scope.moreimg_delit = function (theid) {

        var index = -1;
        var comArr = $scope.moreimggroup;
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
            $scope.moreimggroup.splice(index, 1);
        }


        $scope.tableParams4.reload();

        $scope.getallmoreimg("slidesimg");

    }


    $scope.getallmoreimg = function (theinputid) {
        $scope.moreimg = "";

        for (var k = 0; k < $scope.moreimggroup.length; k++) {
            if ($scope.moreimggroup[k].slidesimg != "") {
                $scope.moreimg = $scope.moreimg + $scope.moreimggroup[k].moreimg + ";";
            }
        }
        if (theinputid) {
            $("#" + theinputid).val($scope.moreimg);
        }
    }


    $scope.uploadimg = function (theinputid, allserverId) {

        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=uploadimg&allserverId='+allserverId+'&user_id='+user_id+'&path=product',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'snwx/snWX?actiontype=uploadimg&allserverId=' + allserverId + '&user_id=' + user_id + '&path=product', serviceRoot2),
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
                                $scope.tableParams3.reload();

                                $scope.getallslideimg(theinputid);

                            }
                            else if (theinputid == "moreimg") {
                                var theimg = {}
                                theimg.key = $scope.moreimggroup.length
                                theimg.moreimg = rv.uploadfilepath;
                                $scope.moreimggroup.push(theimg);
                                $scope.tableParams4.reload();

                                $scope.getallmoreimg(theinputid);

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