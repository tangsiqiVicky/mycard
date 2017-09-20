'use strict';

app.controller('changesearchCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', '$compile', "SweetAlert", "$modal", "$filter",function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $compile, SweetAlert,$modal,$filter) {

    $scope.fromurl = $stateParams.fromurl;
    $scope.shop_id = $stateParams.shop_id;//request.QueryString("subtype");
    $scope.goods_id = $stateParams.goods_id;//request.QueryString("subtype");
    $scope.products_type = $stateParams.products_type;
    $scope.opertype = $stateParams.opertype;
    $scope.goods_name = $stateParams.goods_name;

    var slidesimg = "";
    $scope.getslidepic = function () {

        var options = {
            url: myforwardurl(serviceRoot2 + 'user/Slideimg?actiontype=getmkslidepic&user_id=' + user_id + '&mod_type=酒店', serviceRoot2),
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
                console.info('rv',rv);

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

                            // //用于判断轮播图是否已经加载，如果已经加载就不需要重新调接口
                            // $rootScope.firstpage_imgloaded=true;
                            // $rootScope.firstpage_slides=$scope.slides;


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

    $scope.getslidepic();
    if($scope.opertype=='add'){

    }
    var roomlist1=[];
    if($scope.opertype=='search'){

        $scope.goods_name='全部/房间';

        $scope.roomlist = function () {

            var options = {
                url: myforwardurl(serviceRoot2 + "shops/getShopDetail?actiontype=getproducts&products_type="+$scope.products_type, serviceRoot2),
                async: false,
                type: 'get',
                dataType: 'json',
                data: null,
                resetForm: true,
                timeout: 60000,
                // jsonp: 'callback',
                success: function (rv) {
                    roomlist1.push("全部/房间");
                    $.each(rv.data,function (index,item) {
                        roomlist1.push(item.name);
                    })

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {


                }
            };
            $.ajax(options);


        }
        $scope.roomlist();

        // $scope.roomlist=roomlist;




    }


    var roomlist2=[];
    function first(){
        for(var i=0;i<roomlist1.length;i++){
            if(roomlist2.indexOf(roomlist1[i])<0){
                roomlist2.push(roomlist1[i])
            }
        }
        return roomlist2;
    }
    first(roomlist1);

    $scope.roomlistdata=roomlist2;



    $scope.room_qty="";
    $scope.date_init = function () {

        var startDate=$("#startDate").val();
        var endDate=$("#endDate").val();
        startDate=startDate.replace(/\//g, '-')
        endDate=endDate.replace(/\//g, '-')
        if($scope.goods_id==undefined){
            $scope.goods_id="";
        }
        var options = {
            url: myforwardurl(serviceRoot2 + "shops/getShopDetail?actiontype=getproducts&products_type="+$scope.products_type+"&product_no="+ $scope.goods_id+"&start_date="+startDate+"&end_date="+endDate, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function (rv) {
                console.info('rv',rv);
                if(rv.data.length>0){

                    if($scope.opertype=='add'){
                        $.each(rv.data,function (index,item) {
                            $scope.room_qty=item.room_qty;

                        })
                        $location.url("/app/wx/me/changePeople?product_type='客房'&startDate="+startDate+'&endDate='+endDate+'&shop_id='+$scope.shop_id+'&goods_id='+$scope.goods_id+'&room_qty='+$scope.room_qty+'&fromurl='+$scope.fromurl);
                    }
                    if($scope.opertype=='search'){

                        $location.url($scope.fromurl+"?product_type=客房&startDate="+startDate+'&endDate='+endDate+'&goods_name='+$("#goods_name").val()+'&type=edit');

                    }

                }else{

                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }
        };
        $.ajax(options);


    }



    $scope.cancel = function () {
        history.go(-1);
    };





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
    $scope.conf = [];
    $scope.getallname=function()
    {
        var rv="";
        for(var i=0;i<$scope.conf.length;i++)
        {
            rv+=$scope.conf[i].replace(/ /g,",").replace(/，/g,",")+"~~X";
        }
        return rv;
    }
    $scope.theid;
    $scope.price = 0;

    $scope.cleardata=function(){
        $scope.room_type="";
        $scope.phone="";
        $scope.conf = [];

    }
    $scope.ok = function () {

        var person_name = $scope.getallname();
        var phone = $scope.phone;
        var qty =$scope.qty;
        var B_DATE = $("#startDate").val();
        var E_DATE = $("#endDate").val();

        if(phone===undefined){
            phone="";
        }
        if(person_name===undefined){
            person_name="";
        }

        $scope.cart_interface(person_name,phone,qty,B_DATE,E_DATE);

        // if($scope.fromurl!=""&&$scope.fromurl!=undefined)
        // {
        //
        //
         //  $location.url($scope.fromurl+"?product_type='客房'&startDate="+B_DATE+'&endDate='+E_DATE+'&qty='+qty+'&phone='+phone+'&person_name='+person_name+'&shop_id='+$scope.shop_id+'&goods_id='+$scope.goods_id);
        //
        //
        // }
        // else
        // {
        //     $location.url("/app/eco/firstpage");
        // }



    }

    var cartnum;
    $scope.cart_interface = function (person_name,phone,qty,B_DATE,E_DATE) {
        maskLayer(1);

        var options = {
            //url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shopping_cart&user_id=' + user_id + "&products_id=" + theid, serviceRoot2),
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shopping_cart&user_id=' + user_id + "&products_id=" + $scope.goods_id + '&person_name=' + person_name + '&phone=' + phone + '&room_qty=' + qty + '&B_DATE=' + B_DATE + '&E_DATE=' + B_DATE+ "&goods_id=" + $scope.goods_id, serviceRoot2),
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
                        isok = true;
                        cartnum = parseInt(item.qty);
                    }
                    else {
                        msg = item.result_text;
                    }
                })

                if (isok) {//alert("获取数据成功")
                    //alert(msg)

                    maskLayer(0);
                    //购物车数量
                    myalert("已成功加入购物车！");
                    $location.url($scope.fromurl+"?product_type='客房'&shop_id="+$scope.shop_id+"&goods_id="+$scope.goods_id);
                    $scope.cartnum = cartnum;

                    $scope.startDate = "";
                    $scope.endDate = "";
                    $scope.qty = "";
                    $scope.phone = "";
                    $scope.person_name = "";


                    setTimeout(function () {
                        $scope.$apply(function () {
                            //飞
                            var addcar = $(obj);
                            var imgobj = $("#photo_" + theid);//addcar.parent().find('img');
                            //alert(imgobj)
                            var img = imgobj.attr('src');
                            //myalert(img)

                            var flyer = $('<img class="u-flyer" src="' + img + '">');

                            flyer.fly({
                                start: {
                                    left: x,
                                    top: y
                                },
                                end: {
                                    left: offset.left + 10,
                                    top: offset.top + 10,
                                    width: 0,
                                    height: 0
                                },
                                onEnd: function () {
                                    myalert("已成功加入购物车！");


                                    flyer.remove();
                                    // obj.destory();
                                }
                            });


                        });
                    }, 500);


                    setTimeout(function () {
                        $rootScope.logit(user_id, 'products_id', theid, '商品');
                    }, 2000);

                    $scope.cleardata();
                } else {
                    // alert(msg)
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }
        };
        $.ajax(options);


    }


    $scope.gotochangeDate = function () {

    $location.url("/app/wx/me/changeDate?fromurl="+$location.path()+"?shop_id="+$scope.shop_id);

 }

    $scope.gotologin = function () {

        $location.url("/login/signin?fromurl="+$location.path()+"?shop_id="+$scope.shop_id);

    }




    showmenu(false);





}]);




