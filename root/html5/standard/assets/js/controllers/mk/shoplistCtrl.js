'use strict';
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});


var opertype = "";
var listtype = 0;  //0 一栏   1 两栏


var templocation = "";
var templocation_pos = "";


function After_ClickOnMap(pt, pos, addr) {
    $("#templocation").html(addr);
}


function DragLoad_beforeSend(cur_page, theid) {

    $('#pageLoading').html("加载中。。。");
    $('#pageLoading').css("visibility", "visible");
}

function DragLoad_packageDom(data, theid, pagenum) {
    var dom = "";


    //if(listtype==0) //一栏式
    //{
    $.each(data, function (idx, item) {
        console.info('shoplistdata',data);

        var prightshow = item.pright;
        if (prightshow == "true") {
            prightshow = "block";
        } else {
            prightshow = "none";
        }

        dom += '<div id="detail_' + theid + '_' + pagenum + '" class="detail small">' +

            '<div class="col-xs-12" style="padding:0px;margin-bottom:10px;border-bottom:1px solid #f7f7f7">' +
            '<div class="col-xs-2 text-left" style="padding:0px;">' +
            '<a ui-sref=\"app.wx.me.shopinfo({shop_id:\'' + item.key + '\'})\"><div> <img src="' + serviceRoot + item.photo + '" width="50px" height="50px" align=left></div>' +

            '</a></div>';

        if (opertype == "pright") {
            dom += '<div style="position:absolute;color:#efefef;margin-top:60px;"><div class="checkbox clip-check check-primary checkbox-inline">' +
                '<input type="checkbox" id="checkbox' + idx + '_' + theid + '_' + pagenum + '" ng-click=\"pright(\'' + item.key + '\',$event,\'' + 'pright' + idx + '_' + theid + '_' + pagenum + '\')\">' +
                '<label for="checkbox' + idx + '_' + theid + '_' + pagenum + '">' +
                '	禁止使用' +
                '</label>' +
                '</div><div id="pright' + idx + '_' + theid + '_' + pagenum + '" style="display:' + prightshow + ';position:absolute;color:#efefef;margin-left:80px;margin-top:-110px;"><img src="assets/images/noright.png" style="width:80px;"></div></div>';
        }


        dom += '<div class="col-xs-8 text-left">' +
            '<a ui-sref=\"app.wx.me.shopinfo({shop_id:\'' + item.key + '\'})\"><div class="main01">' +
            '<h2>' + item.name + '</h2>' +
            '</div></a>' +
            '<div class="detail01">' +
            '<div class="small" ui-sref=\"app.wx.me.shopinfo({shop_id:\'' + item.key + '\'})\">' + item.address + '</div>' +
            '<div class="margin-bottom-10 small">' +
            '<rating ng-model="'+item.star+'" readonly="true"  max="5" state-on=\"\'fa fa-star text-yellow text-extra-small margin-right-5\'\" state-off=\"\'fa fa-star-o text-small margin-right-5\'\"></rating>' +
            '<a href="#" class="btn btn-transparent btn-xs" tooltip-placement="top" tooltip="赞" ng-click=\"pj(\'' + item.key + '\',\'0\')\"><i class="ti ti-thumb-up"></i></a>' +
            '<a href="#" class="btn btn-transparent btn-xs tooltips" tooltip-placement="top" tooltip="踩" ng-click=\"pj(\'' + item.key + '\',\'1\')\"><i class="ti ti-thumb-down"></i></a>' +
            '</div>' +
            '<span class="small" style="padding-left:5px;"><mark>接受预订</mark></span>' +
            //'<span class="small" style="padding-left:5px;">T:</span><a class="tel" href="tel:'+item.contact_phone+'">'+item.contact_phone+'</a>' +
            '<div>' +
            '<span class="small"> 起送 / </span>	' +
            '<span class="small"> / </span>' +
            '<span class="small">距离: ' + parseInt(item.distance) + '米</span>' +
            '</div>' +
            '</div>' +
            '<div class="detail02">' +

            '</div>' +
            '</div>' +

            '<div class="col-xs-2">';


        dom += '</div>		' +
            '</div>' +

            '</div>';

    });
    //}
    //else //两栏式
    //{
    /*
     var c_width=page_w-60;
     var thew=200;
     var max_col=parseInt(c_width/thew);
     if(max_col<2){
     thew=parseInt(c_width/2);
     }

     for(var i=0;i<data.length;i++)
     {
     var item=data[i];

     var prightshow=item.pright;
     if(prightshow=="true"){prightshow="block";}else{prightshow="none";}


     dom+='<li class="post" style="width:'+thew+'px;text-align:center;"><div id="detail_'+theid+'_'+pagenum+'" class="detail" valign=top>' ;



     dom+='<div style="padding:0px;margin-bottom:10px;border-bottom:1px solid #f7f7f7">' ;


     if(opertype=="pright")
     {
     dom+='<div style="position:absolute;color:#efefef;"><div class="checkbox clip-check check-primary checkbox-inline">' +
     '<input type="checkbox" id="checkbox'+i+'_'+theid+'_'+pagenum+'" ng-click=\"pright(\''+item.key+'\',$event,\''+'pright'+i+'_'+theid+'_'+pagenum+'\')\">' +
     '<label for="checkbox'+i+'_'+theid+'_'+pagenum+'">' +
     '	禁止使用' +
     '</label>' +
     '</div><div id="pright'+i+'_'+theid+'_'+pagenum+'" style="display:'+prightshow+';position:absolute;color:#efefef;margin-left:40px;"><img src="assets/images/noright.png" style="width:80px;"></div></div>' ;
     }


     dom+='<div><a ui-sref=\"app.wx.me.shopinfo({shop_id:\''+item.key+'\'})\">' +
     '<img src="'+serviceRoot+item.photo+'" width="80px" height="80px" align=center><div style="position:absolute;margin-top:50px;color:#efefef;font-size:20px;">'+item.id+'</div>' +
     '</a></div>' +
     '<div><a ui-sref=\"app.wx.me.shopinfo({shop_id:\''+item.key+'\'})\"><div class="main01">' +
     '<h2 style="margin-bottom:3px;padding:0px;">'+item.name+'</h2><span class="small">【'+item.shop_id+'】</span></div></a>' +
     '</div>' +

     '<div class="detail01">' +
     '<div class="small" ui-sref=\"app.wx.me.shopinfo({shop_id:\''+item.key+'\'})\">'+item.address+'</div>' +
     '<div ng-init="x = '+item.star+'" class="margin-bottom-10 small">' +
     '<rating readonly="true" ng-model="x" max="5" state-on=\"\'fa fa-star text-yellow text-extra-small margin-right-5\'\" state-off=\"\'fa fa-star-o text-small margin-right-5\'\"></rating>' +
     '<a href="#" class="btn btn-transparent btn-xs" tooltip-placement="top" tooltip="赞" ng-click=\"pj(\''+item.key+'\',\'0\')\"><i class="ti ti-thumb-up"></i></a>' +
     '<a href="#" class="btn btn-transparent btn-xs tooltips" tooltip-placement="top" tooltip="踩" ng-click=\"pj(\''+item.key+'\',\'1\')\"><i class="ti ti-thumb-down"></i></a>' +
     '</div>' +
     '<span class="small" style="padding-left:5px;"><mark>接受预订</mark></span>' +
     //'<span class="small" style="padding-left:5px;">T:</span><a class="tel" href="tel:'+item.contact_phone+'">'+item.contact_phone+'</a>' +
     '<div>' +
     '<span class="small"> 起送 / </span>	' +
     '<span class="small"> / </span>' +
     '<span class="small">距离: '+parseInt(item.distance)+'米</span>' +
     '</div>' +
     '</div>' +
     '</div>' ;


     dom+='</div></li>';
     }

     */

    //}


    var ele = compile(dom)(scope);
    angular.element('#lists').append(ele);

    //$('#lists'+theid).append(dom);


    setTimeout(function () {
        $('#pageLoading').css("visibility", "hidden");
    }, 1000);

    return true;

}


function DragLoad_noMoreHandle(theid) {
    $('#pageLoading').html("没有更多了")
    setTimeout(function () {
        $('#pageLoading').css("visibility", "hidden");
    }, 1000);

}


app.controller('shoplistCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', '$compile', function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $compile) {


    $scope.opertype = $stateParams.opertype;
    opertype = $scope.opertype;
//opertype="pright";

    scope = $scope;
    compile = $compile;


    $scope.tabs = [];

    var namestr = "全部,酒店,餐饮,汽车,美容,娱乐,健身,超市,学校,医院,园区,专卖店";
    var namestrs = namestr.split(",");
    var str = ",hotel,restaurant,car,cosmetology,entertainment,body,supermarket,school,hospital,park,mall";
    var strs = str.split(",");
    var icon = "null,fa fa-home,fa fa-cutlery,fa fa-car,fa fa-female,fa fa-microphone,fa fa-futbol-o,fa fa-shopping-cart,null,fa fa-h-square,null,null";
    var icons = icon.split(",");

    for (var i = 0; i < strs.length; i++) {
        var thetab = {};
        thetab.subtype = strs[i];
        thetab.title = namestrs[i];
        thetab.icon = icons[i];
        thetab.isload = 0;
        thetab.data = [];

        /*
         if(strs[i]=="hotel")
         {
         var thetabdatadetail={};
         thetabdatadetail.id=1;
         thetabdatadetail.name="a";
         thetab.data.push(thetabdatadetail);
         thetabdatadetail={};
         thetabdatadetail.id=2;
         thetabdatadetail.name="b";
         thetab.data.push(thetabdatadetail);
         }
         */

        $scope.tabs.push(thetab);
    }


    $scope.gettabby = function (subtype) {
        for (var i = 0; i < $scope.tabs.length; i++) {
            if ($scope.tabs[i].subtype == subtype) {
                return $scope.tabs[i];
            }
        }
    }


    var slidesimg = "";
    $scope.getslidepic = function () {

        var options = {
            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmkslidepic&User='+user_id+'&mod_type=商家',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'user/Slideimg?actiontype=getmkslidepic&user_id=' + user_id + '&mod_type=商家', serviceRoot2),
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

                    $.each(rv.data, function (idx, item) {


                        slidesimg = item.slidesimg;


                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)
                    setTimeout(function () {
                        $scope.$apply(function () {

                            $scope.slidesimg = slidesimg;

                            // 轮播图数据初始化
                            $scope.slides = [];
                            // 添加轮播图源
                            var slidesimgs = slidesimg.split(";");
                            for (var im = 0; im < slidesimgs.length; im++) {
                                if (slidesimgs[im] != "") {
                                    $scope.slides.push({image: slidesimgs[im], text: ''});
                                }
                                //$scope.slides.push({ image: 'assets/images/slider/home-slide1.jpg', text: '三方共赢' });
                                //$scope.slides.push({ image: 'assets/images/slider/home-slide2.jpg', text: '一站式解决联盟商家、会员的积分盈利体系' });
                            }

                            //用于判断轮播图是否已经加载，如果已经加载就不需要重新调接口
                             $rootScope.shoplist_imgloaded=true;
                             $rootScope.shoplist_slides=$scope.slides;


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
        return false;
    }


    if($rootScope.shoplist_imgloaded)//用于判断轮播图是否已经加载，如果已经加载就不需要重新调接口
    {
        $scope.slides=$rootScope.shoplist_slides;
    }
    else
    {
         $scope.getslidepic();
    }


    $scope.listdata = function (arg, subtype) {
//maskLayer(1);

        if (arg == 0) {
            $('#lists').html("");
            //$scope.gettabby(subtype).isload=1;
        }

        var otherwhere = "&searchvalue=" + $("#searchvalue").val() + "&fenlei=" + $("#fenlei_se").val() + "&paixu=" + $("#paixu_se").val() + "&shaixuan=" + $("#shaixuan_se").val() + "&longitude=" + cur_pos.split(",")[0] + "&latitude=" + cur_pos.split(",")[1];

        DragLoad({
            'id': subtype,
            //'url': myforwardurl(serviceRoot + 'mk_main_info?actiontype=getshops&longitude=&latitude=&user_id=' + user_id + '&subtype=' + subtype + otherwhere, serviceRoot),
            'url': myforwardurl(serviceRoot2 + 'shops/getShopList?actiontype=getshops&longitude=&latitude=&user_id=' + user_id + '&subtype=' + subtype + otherwhere, serviceRoot2),
            'loadingDom': $('#pageLoading')
        })

//maskLayer(0);
    }


    var thesubtype = "";


    thesubtype = $stateParams.subtype;//request.QueryString("subtype");
    if (thesubtype == null) {
        thesubtype = "";
    }
    /*
     $scope.renderFinish = function(){
     alert('渲染完之后的操作')
     }
     */

    $scope.listdata(0, "");


    $rootScope.currTitle = "商家列表";


//$scope.listsarray = [{"list":"1"},{"list":"1"}];


    $scope.clickontab = function (tab) {
        thesubtype = tab.subtype;
//$scope.listdata(0,tab.subtype);

        setTimeout(function () {
            $rootScope.logit(user_id, 'subtype', thesubtype, '行业分类');
        }, 2000);

//alert(tab.subtype+":"+tab.isload)
    }


    $("#searchvalue").keyup(function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13 && e.value != '') {
            $scope.listdata(0, thesubtype);
        }

    });

    $scope.changefenlei = function (x) {
        $("#fenlei_se").val(x);
        //$scope.listdata(0,thesubtype);

    }
    $scope.changepaixu = function (x) {
        $("#paixu_se").val(x);
        //$scope.listdata(0,thesubtype);

    }
    $scope.changeshaixuan = function (x) {
        $("#shaixuan_se").val(x);
        listtype = x;

        //$scope.listdata(0,thesubtype);

    }


    $scope.getlocaladdress = function () {
        getlocaladdress();
        $scope.localaddress = cur_addr;

        if (cur_addr == "") {
            setTimeout(function () {
                $scope.getlocaladdress();
            }, 3000);
        }
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


//$("#mapcontainer").css("width",(page_w-15)+"px");
        $("#mapcontainer").css("height", (page_h - 120) + "px");


    }


    $scope.close = function () {
        $.closePopupLayer("myStaticPopup");
    }


    $scope.ok = function (arg) {

        if (arg == 1) {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.localaddress = templocation;
                    $scope.close();
                });
            }, 50);
        }
        else if (arg == 2) {
            $scope.close();
            $scope.listdata(0, thesubtype);
        }


    };

    $scope.cancel = function () {
        $scope.close();
    };


    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {

        $.each($scope.tabs, function (idx, item) {
            if (("," + thesubtype + ",").indexOf("," + item.subtype + ",") >= 0) {
                item.active = true;
                $scope.listdata(0, item.subtype)
            }
            else {
                item.active = false;
            }
        })

    });


    $scope.pj = function (shop_id, arg) {
//alert("进入商家："+shop_id)
        $rootScope.arg0 = shop_id;
//$location.path("/app/wx/me/shopinfo");
    }


    $scope.pright = function (shop_id, $event, imgid) {
        var checkbox = $event.target;
        var pright = (checkbox.checked ? 'enable' : 'disable');
        if (checkbox.checked) {
            $("#" + imgid).css("display", "block");
        }
        else {
            $("#" + imgid).css("display", "none");
        }


        return
        maskLayer(1);

        var options = {
            url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=setpright&shop_id=' + shop_id + '&pright=' + pright + '&user_id=' + user_id, serviceRoot),
            async: false,
            type: 'get',
            dataType: 'jsonp',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            jsonp: 'callback',
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
                    maskLayer(0);
                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);
    }


    $scope.openAside = function (id) {

        $.openPopupLayer({
            name: "myStaticPopup",
            width: page_w * 0.9,

            target: id,
            container: ""
        });

    }


    $scope.back = function () {
        $window.history.back();
    }


    loadbaiduapi();


    chgBottomTab(0);

    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);

//setTimeout(function() { $scope.getlocaladdress();},5000);
    $scope.getlocaladdress();

}]);
















