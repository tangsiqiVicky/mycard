'use strict';


//以下是加载商品
var pulleft = 0;


function DragLoad_beforeSend(theid) {

    $('#pageLoading' + theid).html("加载中。。。");
    $('#pageLoading' + theid).css("visibility", "visible");
}

function DragLoad_packageDom(data, theid, pagenum) {
    var dom = "";
    var dom2 = "";

    $.each(data, function (idx, item) {
        dom += '<li style="position: absolute; left: ' + 260 * pulleft + 'px; top: 0px;">' +
            '<figure>';
        var pics = item.ThumbsPic.split(";");
        for (var i = 0; i < pics.length; i++) {
            if (pics[i] != "") {
                dom += '<img src="' + serviceRoot + pics[i] + '">';
            }
        }

        dom += '<figcaption><h3>' + item.ONE_TITLE + '</h3><p>' + item.ONE_DESC_short + '</p></figcaption>' +
            '</figure>' +
            '</li>';
        if (pulleft > 3) {
            pulleft = 0;
        } else {
            pulleft++;
        }
    });


    $.each(data, function (idx, item) {
        dom2 += '<li>' +
            '<figure>' +
            '<figcaption>' +
            '<h3>' + item.ONE_TITLE + '</h3>' +
            '<div style="max-height:35px;border:0px solid red;overflow:auto;" class="small">' + item.ONE_DESC + '</div>' +
            '</figcaption>';

        var pics = item.Pic.split(";");
        for (var i = 0; i < pics.length; i++) {
            if (pics[i] != "") {
                dom2 += '<div class="figureimgdiv" style="border:0px solid red;overflow:auto;margin-top:-20px;"><img src="' + serviceRoot + pics[i] + '"></div>';
            }
        }

        dom2 += '</figure>' +
            '</li>';

    });


    var ele = compile(dom)(scope);
    angular.element('#lists' + theid).append(ele);

    var ele2 = compile(dom2)(scope);
    angular.element('#lists2' + theid).append(ele2);

    //$('#lists'+theid).append(dom);


    setTimeout(function () {
        $('#pageLoading' + theid).css("visibility", "hidden");
    }, 100);


    setTimeout(function () {
        new CBPGridGallery(document.getElementById('grid-gallery'));


        $(".figureimgdiv").css("height", page_h - 160);


    }, 100);

    return true;

}


function DragLoad_noMoreHandle(theid) {
    $('#pageLoading' + theid).html("没有更多了")
    setTimeout(function () {
        $('#pageLoading' + theid).css("visibility", "hidden");
    }, 1000);

}


app.controller('OneminuteCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', '$compile', function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $compile) {
    scope = $scope;
    compile = $compile;


    $rootScope.currTitle = "名卡一分钟";


    var data = [];

    /*
     $scope.getdata_oneminute=function(){


     maskLayer(1);

     var options = {
     url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getdata_oneminute&user_id='+user_id,serviceRoot),
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


     if(rv.result=="1")
     {
     isok=true;

     $.each(rv.data,function(idx,item){

     var theshop = {};
     theshop.sortno=item.sortno;
     theshop.ONE_TITLE=item.ONE_TITLE;
     theshop.ThumbsPic=item.ThumbsPic;
     theshop.Pic=item.Pic;
     theshop.ONE_DESC=item.ONE_DESC;
     theshop.ONE_DESC_short=item.ONE_DESC_short;
     theshop.make_date=item.make_date;

     data.push(theshop);
     })
     }
     else
     {
     msg=rv.result_text;
     }




     if(isok){//alert("获取数据成功")
     //alert(msg)

     maskLayer(0);

     setTimeout(function() {
     $scope.$apply(function() {

     $scope.data=data;

     $scope.tableParams = new ngTableParams({
     page: 1, // show first page
     count: 500 // count per page
     }, {
     total: data.length, // length of data
     counts: [],
     getData: function ($defer, params) {
     $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
     }
     });
     });
     },500);


     }else{alert(msg)}



     },
     error: function(XMLHttpRequest, textStatus, errorThrown) {


     }


     };
     $.ajax(options);
     }
     */


    $scope.listdata = function (arg, subtype) {

        maskLayer(1);

        if (arg == 0) {
            $('#lists' + subtype).html('<li style="position: absolute; left: 0px; top: 0px;" class="grid-sizer"></li>');
            $('#lists2' + subtype).html("");
        }

        var otherwhere = "";

        DragLoad({
            'id': subtype,
            'url': myforwardurl(serviceRoot2 + 'invite/getOneMinute?actiontype=getdata_oneminute&isvalid=true&user_id=' + user_id, serviceRoot2),
            'loadingDom': $('#pageLoading' + subtype)
        })


        maskLayer(0);

    }


    $scope.listdata(0, "");


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);







