'use strict';

app.controller('changePeopleCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', '$compile', "SweetAlert", "$modal", "$filter",function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $compile, SweetAlert,$modal,$filter) {

    $scope.fromurl = $stateParams.fromurl;
    $scope.shop_id = $stateParams.shop_id;//request.QueryString("subtype");
    $scope.room_qty = $stateParams.room_qty;
    $scope.opertype=$stateParams.opertype;
    $scope.goods_id = $stateParams.goods_id;//request.QueryString("subtype");
    $scope.product_type = $stateParams.product_type;
    $scope.startDate = $stateParams.startDate;
    $scope.endDate = $stateParams.endDate;
    if ($scope.phone === undefined) {
        $scope.phone = "";
    }

    if ($scope.person_name === undefined) {
        $scope.person_name = "";
    }

    if ($scope.endDate === undefined) {
        $scope.endDate = "";
    }

    if ($scope.startDate === undefined) {
        $scope.startDate = "";
    }

    if ($scope.qty === undefined) {
        $scope.qty = "";
    }

     if($scope.goods_id==undefined){
         $scope.goods_id="";
     }





    $("#roomperson_div").css("height", (page_h*0.8 - 220) + "px");



    $scope.cancel = function () {
        history.go(-1);
    };



    $scope.person_qty = [];
    $scope.person_qty.push(0);

    $scope.change_qty = function () {

        var alreadynum = $scope.person_qty.length;

        if($scope.qty<=$scope.room_qty) {

            if ($scope.qty - alreadynum > 0) {
                for (var i = 0; i < $scope.qty - alreadynum; i++) {
                    $scope.person_qty.push(alreadynum + i);
                }

            }
            else {
                $scope.person_qty.splice($scope.person_qty.length - 1);
            }
        }else{
            $scope.person_qty = [];
            $scope.person_qty.push(0,1);
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

        $scope.startDate = "";
        $scope.endDate = "";
        $scope.qty = "";
        $scope.phone = "";

    }


    var cartnum;
    $scope.add = function () {
        maskLayer(1);

        var options = {
            url: myforwardurl(serviceRoot2 + 'shops/shoppingCart?actiontype=add_shopping_cart&user_id=' + user_id + "&products_id=" + $scope.goods_id + '&person_name=' + $scope.getallname() + '&phone=' + $scope.phone + '&room_qty=' + $scope.qty + '&B_DATE=' + $scope.startDate + '&E_DATE=' + $scope.endDate+ "&goods_id=" + $scope.goods_id, serviceRoot2),
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
                    if($scope.opertype=='add'){
                        history.go(-1);

                    }else {
                        $location.url($scope.fromurl+"?product_type='客房'&shop_id="+$scope.shop_id+"&goods_id="+$scope.goods_id);

                    }
                    $scope.cartnum = cartnum;



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



    // $scope.gotologin = function () {
    //
    //     $location.url("/login/signin?fromurl="+$location.path()+"?shop_id="+$scope.shop_id);
    //
    // }
    //



    showmenu(false);






}]);




