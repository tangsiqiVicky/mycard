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


app.controller('goodsinfoCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', '$compile', '$cookieStore', "SweetAlert","$modal","$filter", function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams, $compile, $cookieStore, SweetAlert,$modal,$filter) {

    $('.date').remove(); // 移除插件
    $scope.product_no=$stateParams.product_no;
    $scope.shop_id=$stateParams.shop_id;
    $scope.product_type=$stateParams.product_type;
    $scope.startDate=$stateParams.startDate;
    $scope.endDate=$stateParams.endDate;
    $scope.statuss=$stateParams.statuss;

    if($scope.phone===undefined){$scope.phone=""};
    if($scope.person_name===undefined){$scope.person_name=""};
    if($scope.endDate===undefined){$scope.endDate=""};
    if($scope.startDate===undefined){$scope.startDate=""};


    if($scope.shop_id==null||$scope.shop_id==undefined)
    {
        if($rootScope.arg0.indexOf("shop_id=")==0){$scope.shop_id=$rootScope.arg0.substring(8);}
        if($rootScope.arg1.indexOf("producttype=")==0){$scope.producttype=$rootScope.arg1.substring(12);$rootScope.currTitle=$scope.producttype;}

    }
    var cartnum=0;
    var slidesimg="";


    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };


    $rootScope.currTitle = "商品";

    $scope.goods_id = $stateParams.goods_id;//request.QueryString("subtype");


    var cartnum = 0;
    var slidesimg = "";

    $scope.slidesimggroup = [];





    $scope.getgoodsinfo = function () {

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getproductsdetail&goods_id=' + $scope.goods_id + '&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/products?actiontype=getproductsdetail&goods_id=' + $scope.goods_id + '&user_id=' + user_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            //jsonp: 'callback',
            success: function (rv) {

                var isok = false;
                var msg = "";
                console.info('goodsinfo1111',rv.data);

                if (rv.result == "1") {
                    isok = true;


                    $.each(rv.data, function (idx, item) {
                        $scope.id = item.id;
                        $scope.key = item.key;
                        $scope.shop_id = item.shop_id;
                        $scope.shop_name = item.shop_name;
                        $scope.goods_id = item.goods_id;
                        $scope.name = item.name;
                        $scope.products_type = item.products_type;
                        $scope.desc = item.desc;
                        $scope.price = item.price;
                        $scope.member_price = item.member_price;
                        $scope.icon = item.icon;
                        $scope.photo = item.photo;
                        $scope.return_points = item.return_points;
                        $scope.room_qty = item.room_qty;
                        $scope.visible = item.visible;
                        $scope.priority = item.priority;
                        $scope.slidesimg = item.slidesimg;
                        $scope.more_desc = item.more_desc;
                        $scope.moreimg = item.moreimg;
                        $scope.have_breakfast = item.have_breakfast;   //早餐
                        $scope.area = item.area;                            //面积
                        $scope.to_live = item.to_live;                  //可住几人
                        $scope.floor = item.floor;                      //楼层
                        $scope.bed_type = item.bed_type;                    //床型
                        $scope.smokeless = item.smokeless;              //无烟
                        $scope.wifi = item.wifi;                            //贷款
                        $scope.amenities = item.amenities;              //便利设施
                        $scope.shower_room = item.shower_room;          //浴室
                        $scope.food_catering = item.food_catering;      //食品
                        $scope.service_desc = item.service_desc;            //服务和其他
                    })
                    console.log('xxxxxxxxx' + $scope.have_breakfast);
                }
                else {
                    msg = rv.result_text;
                }

                if (isok) {


                    $("#goodsdesc").html($scope.more_desc);
                    if ($scope.more_desc != "") {
                        $scope.Showgoodsdesc = "yes";
                    }

                    var comArr = $scope.moreimg.split(";");
                    for (var s = 0; s < comArr.length; s++) {
                        if (comArr[s] != "") {
                            var theimg = {}
                            theimg.key = s;
                            theimg.slidesimg = comArr[s];
                            $scope.slidesimggroup.push(theimg);
                            $scope.Showslidesimg = "yes";
                        }
                    }

                    //$scope.tableParams.reload();


                    // 轮播图数据初始化
                    $scope.slides = [];
                    // 添加轮播图源
                    var slidesimgs = $scope.slidesimg.split(";");
                    for (var im = 0; im < slidesimgs.length; im++) {
                        if (slidesimgs[im] != "") {
                            $scope.slides.push({image: slidesimgs[im], text: ''});
                        }
                        //$scope.slides.push({ image: 'assets/images/slider/home-slide1.jpg', text: '三方共赢' });
                        //$scope.slides.push({ image: 'assets/images/slider/home-slide2.jpg', text: '一站式解决联盟商家、会员的积分盈利体系' });
                    }


                } else {
                    alert(msg);
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);
    }


    $scope.getgoodsinfo();




    $scope.close = function () {
        $.closePopupLayer("asideContent");
    }

    $scope.ok = function (arg) {


        $scope.localaddress = templocation;
        $scope.close();

    };

    $scope.cancel = function () {
        $scope.close();
    };


    $scope.gotochangeDate = function (theid) {

        $location.url("/app/wx/me/changesearch?fromurl="+$location.path()+"&shop_id="+$scope.shop_id+"&goods_id="+$scope.goods_id+"&goods_name="+$scope.name+"&products_type=客房&opertype=add");
        // $location.url("/app/wx/me/changeDate?shop_id="+$scope.shop_id+"&theid="+theid);

    }
    $scope.gotochangepeople = function (theid) {

        $location.url("/app/wx/me/changePeople?product_type='客房'&startDate="+$scope.startDate+'&endDate='+$scope.endDate+'&shop_id='+$scope.shop_id+'&goods_id='+$scope.goods_id+'&room_qty='+$scope.room_qty+'&fromurl='+$scope.fromurl+'&opertype=add');


    }
 $scope.gotologin = function () {

$location.url("/login/signin?fromurl="+$location.path()+"?goods_id="+$scope.goods_id);

 }

    //加入购物车
    $scope.addcaract = function () {
        //public_goods_id=goods_id;

         if(user_id==""){$scope.gotologin();return;}


            if ($scope.products_type=="客房") {

                    if($scope.statuss=="addpeople"){

                        $scope.gotochangepeople($scope.goods_id);return;
                    }else{
                        $scope.gotochangeDate($scope.goods_id);return;
                    }



            } else {
                $scope.cart_interface();
            }

    }


    $scope.cleardata=function(){
        $scope.room_type="";
        $scope.phone="";
        $scope.conf = [];

    }
    $scope.cart_interface = function () {

         //addcart();
        maskLayer(1);

        if($scope.qty==undefined){
            $scope.qty="";
        }
        var options = {
            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=add_shopping_cart&user_id=' + user_id + '&products_id=' + $scope.goods_id + '&person_name=' + $scope.getallname() + '&phone=' + $scope.phone + '&room_qty=' + $scope.qty, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shopping_cart&user_id=' + user_id + "&products_id=" +$scope.goods_id+'&person_name='+$scope.person_name+'&phone='+$scope.phone+'&room_qty='+$scope.qty+'&B_DATE='+$scope.startDate+'&E_DATE='+$scope.endDate, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            //jsonp: 'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";

                $.each(rv.data, function (idx, item) {
                    if (item.result == "1") {
                        isok = true;
                        cartnum = parseInt(item.qty);
                        $scope.cleardata();
                    }
                    else {
                        msg = item.result_text;
                    }
                })

                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    $scope.startDate="";
                    $scope.endDate="";
                    $scope.qty="";
                    $scope.phone="";
                    $scope.person_name="";
                    maskLayer(0);
                    //购物车数量
                    $scope.cartnum= cartnum;
myalert("已成功加入购物车！");



                    setTimeout(function () {
                        $rootScope.logit(user_id, 'products_id', $scope.goods_id, '商品');
                    }, 2000);


                } else {
                    alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                alert("error")
            }
        };
        $.ajax(options);
    }


    $scope.submit_caract = function () {
        //关闭弹出层
        $scope.close();
        $scope.cart_interface();
        //$location.path("/app/wx/me/cart");
    };


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


    setTimeout(function () {
        $rootScope.logit(user_id, 'shop', $scope.shop_id, $rootScope.currTitle);
    }, 2000);


}]);


var offset = $("#end").offset();
var x = page_w / 2;
var y = page_h / 2;


/* $(document).ready(function(){


 $(document).mousemove(function(e){
 x=e.pageX-100;
 y=e.pageY;
 });
 $(document).click(function(e){
 x=e.pageX-100;
 y=e.pageY;
 });





 });
*/


