'use strict';


app.controller('shopgoods_by_producttypeCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$cookieStore', '$state', '$stateParams', '$compile', '$aside',"$modal","$filter", function ($window, $scope, $location, $rootScope, $localStorage, $cookieStore, $state, $stateParams, $compile, $aside,$modal,$filter) {

//$scope.user_id=user_id;
    $rootScope.currTitle = "商品";

    // $scope.shop_id = $stateParams.shop_id;
    $scope.sub_type = $stateParams.sub_type;
    $scope.producttype = $stateParams.product_type;
    $scope.startDate=$stateParams.startDate;
    $scope.endDate=$stateParams.endDate;
    $scope.product_no=$stateParams.product_no;
    $scope.type=$stateParams.type;
    $scope.goods_name=$stateParams.goods_name;
    if($scope.shop_id ==undefined){
        $scope.shop_id = '';
    }

    if($scope.shop_id ==undefined){
        $scope.shop_id = '';
    }
    if($scope.startDate ==undefined){
        $scope.startDate = '';
    }
    if($scope.endDate ==undefined){
        $scope.endDate = '';
    }
    if($scope.product_no ==undefined){
        $scope.product_no = '';
    }

    if($scope.goods_name==undefined||$scope.goods_name=='全部/房间'){
        $scope.goods_name="";
    }

    $rootScope.currTitle=$rootScope.currTitle+"-"+$scope.producttype;

    if ($scope.shop_id == null || $scope.shop_id == undefined) {
        if ($rootScope.arg0.indexOf("shop_id=") == 0) {
            $scope.shop_id = $rootScope.arg0.substring(8);
        }
        if ($rootScope.arg1.indexOf("producttype=") == 0) {
            $scope.producttype = $rootScope.arg1.substring(12);
            $rootScope.currTitle = $scope.producttype;
        }

    }


    var cartnum = 0;
    var slidesimg = "";


    if($scope.producttype=='客房'&&$scope.type==undefined){

        $location.url("/app/wx/me/changesearch?fromurl="+$location.path()+"&shop_id="+$scope.shop_id+"&goods_id=&goods_name="+$scope.goods_name+"&products_type=客房&opertype=search");
    }if($scope.type=='edit'){



    }









    $scope.getproducttype = function () {

        var options = {

            //url: myforwardurl(serviceRoot + 'mk_main_info?actiontype=getproducttypedetail&shop_id=' + $scope.shop_id + '&producttype=' + $scope.producttype + '&user_id=' + user_id, serviceRoot),
            url: myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getproducttypedetail&shop_id=' + $scope.shop_id + '&producttype=' + $scope.producttype + '&user_id=' + user_id, serviceRoot2),
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

                console.info('rvvv',rv);
                if (rv.result == "1") {
                    isok = true;

                    $.each(rv.data, function (idx, item) {
                        $scope.id = item.id;
                        $scope.key = item.key;
                        $scope.shop_id = item.shop_id;
                        $scope.products_type = item.products_type;
                        $scope.slidesimg = item.slidesimg;
                        $scope.more_desc = item.more_desc;
                        $scope.moreimg = item.moreimg;

                    })
                }
                else {
                    msg = rv.result_text;
                }


                if (isok) {

                    $("#producttypedesc").html($scope.more_desc);
                    if ($scope.more_desc != "") {
                        $scope.Showproducttypedesc = "yes";
                    }

                    // 轮播图数据初始化
                    $scope.slides = [];
                    // 添加轮播图源
                    var slidesimgs = $scope.slidesimg.split(";");

                    for (var im = 0; im < slidesimgs.length; im++) {
                        if (slidesimgs[im] != "") {
                            $scope.slides.push({image: slidesimgs[im], text: ''});
                            $scope.Showslidesimg = "yes";
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


    $scope.slidesimggroup = [];
    /*
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

     */


    $scope.getgoods_by_producttype = function () {


     if($scope.shop_id ==undefined){
         $scope.shop_id = '';
     }
        if($scope.goods_id ==undefined){
            $scope.goods_id = '';
        }
        if($scope.product_no==undefined){
            $scope.product_no="";
        }

        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getproducts&shop_id='+$scope.shop_id+'&products_type='+$scope.producttype+'&user_id='+user_id,serviceRoot),
            url: myforwardurl(serviceRoot2 + "shops/getShopDetail?actiontype=getproducts&products_type="+$scope.producttype+"&product_no="+ $scope.product_no+"&goods_name="+$scope.goods_name+"&start_date="+$scope.startDate+"&end_date="+$scope.endDate, serviceRoot2),
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

                console.info('rvproduct',rv);
                if (rv.result == "1") {
                    isok = true;


                    $scope.slidesimggroup = [];

                    $.each(rv.data, function (idx, item) {


                        /*
                        $scope.id = item.id;
                        $scope.key = item.key;
                        $scope.goods_id = item.goods_id;
                        $scope.shop_id = item.shop_id;
                        $scope.shop_name = item.shop_name;
                        $scope.name = item.name;
                        $scope.products_type = item.products_type;
                        $scope.desc = item.desc;
                        $scope.price = item.price;
                        $scope.member_price = item.member_price;
                        $scope.photo = item.photo;
                        $scope.return_points = item.return_points;
                        $scope.visible = item.visible;
                        $scope.priority = item.priority;
                        $scope.slidesimg2 = item.slidesimg;
                        $scope.more_desc2 = item.more_desc;
                        $scope.moreimg2 = item.moreimg;
                        */

                        if (item.photo != "") {
                            var theimg = {}
                            theimg.key = item.id;
                            //theimg.slidesimg=item.slidesimg;
                            theimg.goods_id = item.goods_id;
                            theimg.photo = item.photo;
                            theimg.price = item.price;
                            theimg.products_type = item.products_type;
                            theimg.shop_name = item.shop_name;
                            theimg.name = item.name;
                            theimg.room_qty = item.room_qty;
                            // 轮播图数据初始化
                            //var slides = [];
                            // 添加轮播图源
                            //var slidesimgs=theimg.slidesimg.split(";");
                            //for(var im=0;im<slidesimgs.length;im++)
                            //{
                            //if(slidesimgs[im]!="")
                            //{
                            //  slides.push({ image: slidesimgs[im], text: '' });
                            //}
                            //$scope.slides.push({ image: 'assets/images/slider/home-slide1.jpg', text: '三方共赢' });
                            //$scope.slides.push({ image: 'assets/images/slider/home-slide2.jpg', text: '一站式解决联盟商家、会员的积分盈利体系' });
                            //}

                            //theimg.slides=slides;


                            $scope.slidesimggroup.push(theimg);

                        }


                    })


                    //$scope.tableParams.reload();


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


    $scope.getproducttype();
    $scope.getgoods_by_producttype();


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




    /*
     $scope.openAside = function (position,arg0) {

     var modalInstance = $aside.open({
     templateUrl: 'asideContent.html',
     placement: position,
     size: 'sm',
     backdrop: true,
     controller: function ($scope, $modalInstance,items) {

     $scope.member_price=items;
     $scope.ok = function (e) {
     $modalInstance.close($scope.total_amount);
     e.stopPropagation();
     };
     $scope.cancel = function (e) {
     $modalInstance.dismiss();
     e.stopPropagation();
     };
     },
     resolve: {
     items: function () {
     return arg0;
     }
     }
     });

     modalInstance.result.then(function (module_items) {
     $scope.total_amount = module_items;
     }, function () {
     console.log('时间: ' + new Date());
     });
     };
     */

    $scope.person_qty = [];
    $scope.person_qty.push(0);

    $scope.change_qty = function () {

        var alreadynum = $scope.person_qty.length;
        if ($scope.qty - alreadynum > 0) {
            for (var i = 0; i < $scope.qty - alreadynum; i++) {
                $scope.person_qty.push(alreadynum + i);
            }

        }
        else {
            $scope.person_qty.splice($scope.person_qty.length - 1);
        }


    }

    $scope.getallname=function()
    {
        var rv="";
        for(var i=0;i<$scope.conf.length;i++)
        {
            rv+=$scope.conf[i].replace(/ /g,",").replace(/，/g,",")+"~~X";
        }
        return rv;
    }

    $scope.submit_caract = function () {
        $scope.cart_interface(public_goods_id);//添加购物车
    };



    var public_goods_id="";

//加入购物车
    $scope.addcaract = function (goods_id,products_type,room_qty) {


        public_goods_id=goods_id;


        if(user_id==""){$scope.gotologin();return;}

        if (products_type=="客房") {


            $location.url("/app/wx/me/changePeople?fromurl="+$location.path()+"&startDate="+$scope.startDate+"&endDate="+$scope.endDate+"&shop_id="+$scope.shop_id+"&room_qty="+room_qty+"&goods_id="+goods_id+"&goods_name="+$scope.name+"&products_type="+products_type+"&opertype=add");

        } else {

                $scope.cart_interface(goods_id);

        }
    }
    $scope.cleardata=function(){
        $scope.room_type="";
        $scope.phone="";
        $scope.conf = [];

    }
$scope.cart_interface=function(goods_id) {

    // maskLayer(1);
    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=add_shopping_cart&user_id='+user_id+"&products_id="+$scope.goods_id,serviceRoot),
        //url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shopping_cart&user_id=' + user_id + "&products_id=" + goods_id, serviceRoot2),
        url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shopping_cart&user_id=' + user_id + "&products_id=" +goods_id, serviceRoot2),
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
            console.info('addcart',rv);

            $.each(rv.data, function (idx, item) {
                if (item.result == "1") {
                    isok = true;
                    cartnum = parseInt(item.qty);
                    $scope.close();
                    $scope.cleardata();
                }
                else {
                    msg = item.result_text;
                }
            })


            if (isok) {//alert("获取数据成功")
                //alert(msg)

                maskLayer(0);
                //购物车数量
                $scope.cartnum = cartnum;
                myalert("已成功加入购物车！");


                setTimeout(function () {
                    $rootScope.logit(user_id, 'products_id', goods_id, '商品');
                }, 2000);


            } else {
                alert(msg)
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            alert("error")
        }
    };$.ajax(options);
}





$scope.gotologin = function () {

$location.url("/login/signin?fromurl="+$location.path()+"?product_type="+$scope.producttype);
 }



    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


    setTimeout(function () {
        $rootScope.logit(user_id, 'shop', $scope.shop_id, $rootScope.currTitle);
    }, 2000);







}]);



