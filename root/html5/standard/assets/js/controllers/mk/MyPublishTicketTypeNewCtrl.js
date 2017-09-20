'use strict';

app.controller('MyPublishTicketTypeNewCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', '$stateParams', 'ngTableParams', function ($window, $scope, $location, $rootScope, $localStorage, $state, $stateParams, ngTableParams) {





    $rootScope.currTitle = "新建卡券分类";

    $scope.shop_id = $stateParams.shop_id;
    $scope.ticket_type = $stateParams.ticket_type;

    $("#shop_id").val($scope.shop_id);
    $("#ticket_type").val($scope.ticket_type);
    $("#ticket_type").focus();


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
        if ($("#ticket_type").val() == "") {
            alert("请输入分类名称");
            return;
        }


        var options = {

            //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=add_ticket_type',serviceRoot),
            url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=add_ticket_type',serviceRoot2),
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

                            $location.path("app/wx/me/mypublish_tickettype");


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

        $("#getshop_modal-body").css("height", (page_h*0.9 - 130) + "px");

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


   




}]);


