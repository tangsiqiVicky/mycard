'use strict';


window.onresize = function () {
    var w = (window['innerWidth'] || document.documentElement.scrollWidth);
    var h = (window['innerHeight'] || document.documentElement.scrollHeight);

    $("#mapcontainer").css("height", (h - 115) + "px");

//$("#tempmenudiv").css("left",($("#mapcontainer").offsetWidth-150)+"px");
//$("#tempmenudiv").css("right",(60)+"px");
//$("#tempmenudiv").css("top",(60)+"px");

}


app.controller('GISCtrl', ["$scope", "$location", "$rootScope", function ($scope, $location, $rootScope) {


    /*
     function ZoomControl(){
     // 默认停靠位置和偏移量
     var w=(window['innerWidth'] || document.documentElement.scrollWidth);
     var h=(window['innerHeight'] || document.documentElement.scrollHeight);
     this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
     this.defaultOffset = new BMap.Size(60, 20);
     }
     */


    var w = (window['innerWidth'] || document.documentElement.scrollWidth);
    var h = (window['innerHeight'] || document.documentElement.scrollHeight);
    $("#mapcontainer").css("height", (h - 115) + "px");

//$("#tempmenudiv").css("left",($("#mapcontainer").offsetWidth-150)+"px");
//$("#tempmenudiv").css("right",(60)+"px");
//$("#tempmenudiv").css("top",(60)+"px");


    var map = new BMap.Map("mapcontainer");
    var point;
    point = new BMap.Point(121.478133, 31.2281);
    map.centerAndZoom(point, 12);
//map.addEventListener("tilesloaded",function(){alert("地图加载完毕");});

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //var mk = new BMap.Marker(r.point);
            //map.addOverlay(mk);
            //map.panTo(r.point);
            point = r.point;
            map.centerAndZoom(r.point, 12);
            //alert('您的位置：'+point.lng+','+point.lat);


            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(point, function (result) {
                if (result) {
                    $scope.localaddress = result.address;
                }
            });


        }
        else {
            alert('failed' + this.getStatus());
        }
    }, {enableHighAccuracy: true})
    //关于状态码
    //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
    //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
    //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
    //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
    //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
    //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
    //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
    //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
    //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)


    /*
     //ip地址定位
     function myFun(result){
     var cityName = result.name;
     map.setCenter(cityName);
     alert("当前定位城市:"+cityName);
     }
     var myCity = new BMap.LocalCity();
     myCity.get(myFun);

     */


    /*
     //城市名定位
     function theLocation(){
     var city = document.getElementById("cityName").value;
     if(city != ""){
     map.centerAndZoom(city,11);      // 用城市名设置地图中心点
     }
     }
     */


    /*
     // 用经纬度设置地图中心点
     function theLocation(){
     if(document.getElementById("longitude").value != "" && document.getElementById("latitude").value != ""){
     map.clearOverlays();
     var new_point = new BMap.Point(document.getElementById("longitude").value,document.getElementById("latitude").value);
     var marker = new BMap.Marker(new_point);  // 创建标注
     map.addOverlay(marker);              // 将标注添加到地图中
     map.panTo(new_point);
     }
     }
     */


    map.addControl(new BMap.NavigationControl());
//map.addControl(new BMap.ScaleControl());    
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

//map.setCurrentCity("上海"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用


    var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_LEFT});   //设置版权控件位置
    map.addControl(cr); //添加版权控件
    var bs = map.getBounds();   //返回地图可视区域
    cr.addCopyright({id: 1, content: "SNIPS/v8&nbsp;&nbsp;&nbsp;&nbsp;", bounds: bs});
    //Copyright(id,content,bounds)类作为CopyrightControl.addCopyright()方法的参数


    /*
     //地图控件的方式加载菜单，现在采用外面加载
     ZoomControl.prototype = new BMap.Control();
     ZoomControl.prototype.initialize = function(map){
     var div = document.createElement("div");
     var htmlstr=document.getElementById("tempmenudiv").innerHTML.replace(/tempdiv_/g,"");
     div.insertAdjacentHTML("beforeEnd",htmlstr)
     map.getContainer().appendChild(div);
     return div;
     }
     var myZoomCtrl = new ZoomControl();
     map.addControl(myZoomCtrl);
     */


    /*
     point = new BMap.Point(121.478133, 31.2281);  // 创建点坐标
     var marker = new BMap.Marker(point);        // 创建标注
     map.addOverlay(marker);                     // 将标注添加到地图中
     marker.addEventListener("click", function(){
     alert("您点击了标注");
     });

     marker.enableDragging();
     marker.addEventListener("dragend", function(e){
     alert("当前位置：" + e.point.lng + ", " + e.point.lat);
     })
     */


    /*
     map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
     var myPushpin = new BMap.PushpinTool(map);         // 创建标注工具实例
     myPushpin.addEventListener("markend", function(e){  // 监听事件，提示标注点坐标信息
     alert("您标注的位置：" +
     e.marker.getPoint().lng + ", " +
     e.marker.getPoint().lat);
     });
     myPushpin.open();                                  // 开启标注工具
     */

    /*
     //驾车导航
     var map = new BMap.Map("container");
     map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
     var driving = new BMap.DrivingRoute(map, {
     renderOptions: {
     map: map,
     autoViewport: true
     }
     });
     driving.search("中关村", "天安门");
     */

    /*
     var local = new BMap.LocalSearch(map, {
     renderOptions:{map: map,autoViewport: true,panel: "results"},pageCapacity: 8
     });
     local.search("天安门");
     */


    /*
     //周边
     var local = new BMap.LocalSearch(map,
     { renderOptions:{map: map, autoViewport: true}});
     local.searchNearby("酒店", "前门");
     */


    /*
     var myGeo = new BMap.Geocoder();
     // 根据坐标得到地址描述
     myGeo.getLocation(new BMap.Point(116.364, 39.993), function(result){
     if (result){
     $scope.localaddress=result.address;
     alert(result.address);
     var local = new BMap.LocalSearch(map,
     { renderOptions:{map: map, autoViewport: true}});
     local.searchNearby("酒店", result.address);

     }
     });
     */


    var local = new BMap.LocalSearch(map,
        {renderOptions: {map: map, autoViewport: true}});


    $(function ($) {

        $("#gooey-v").gooeymenu({
            bgColor: "#ff6666",
            contentColor: "white",
            style: "vertical",
            horizontal: {
                menuItemPosition: "glue"
            },
            vertical: {
                menuItemPosition: "spaced",
                direction: "down"
            },
            circle: {
                radius: 90
            },
            margin: "small",
            size: 70,
            bounce: true,
            bounceLength: "small",
            transitionStep: 100,
            hover: "#68d099"
        });


    });


    var layerobj = null;

    app.controller('LayerCtrl', ["$scope", function ($scope) {


        $scope.open = function (id, title) {

            layerobj = $("#" + id);
            //layerobj.css("display","");

            /*
             $("#"+id).css("display","");
             $("#"+id).css("left","0px");
             $("#"+id).css("top","0px");
             */


            layer.open({
                type: 1, //page层
                //area: ['800px', '400px'],
                title: title,
                shade: 0.6, //遮罩透明度
                shadeClose: true, //点击遮罩关闭
                moveType: 1, //拖拽风格，0是默认，1是传统拖动
                shift: 1, //0-6的动画形式，-1不开启
                content: layerobj.html()
            });


        }

        $scope.close = function () {
            layerobj.css("display", "none");
        }


        $scope.searchmap = function (arg) {


            var rv = false;

            if (arg == 1) {


                var str = "酒店,餐饮,汽车,美容,娱乐,健身";
                var strs = str.split(",");
                var truefalse = $("#zbss_searchobj_value").val();

                var truefalses = truefalse.split(",");
                var keystr = "";
                for (var i = 0; i < truefalses.length; i++) {
                    if (truefalses[i] == "true") {
                        keystr = keystr + strs[i] + ",";
                    }

                }
                if (keystr != "") {
                    keystr = keystr.substring(0, keystr.length - 1);
                }
                if (keystr != "") {
                    var myKeys = keystr.split(",");
                    //local.searchInBounds(myKeys, map.getBounds());
                    local.searchNearby(myKeys, point, $("#distance").val());
                }

                rv = true;
            }
            else if (arg == 2) {

                if ($("#showtype_value").val() != "") {

                    /*
                     var app = angular.module('myApp', []);
                     app.controller('customersCtrl', function($scope, $http) {
                     $http.get("http://www.runoob.com/try/angularjs/data/Customers_JSON.php")
                     .success(function (response) {$scope.names = response.records;});
                     });
                     */

                    $scope.names = ("A,B,C").split(",");

                    rv = true;

                }
                else {
                    alert("请选择显示方式")
                }


            }

            return rv;
        }


        $scope.ok = function (arg) {

            if ($scope.searchmap(arg)) {
                $scope.close();
            }
        };

        $scope.cancel = function () {
            $scope.close();
        };


    }]);


}]);


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.


/*
 app.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "items", function ($scope, $modalInstance, items) {

 $scope.items = items;
 $scope.selected = {
 item: $scope.items[0]
 };







 $scope.searchmap=function(arg){

 var rv=false;

 if(arg==1)
 {
 var local = new BMap.LocalSearch(map,
 { renderOptions:{map: map, autoViewport: true}});

 var str="酒店,餐饮,汽车,美容,娱乐,健身";
 var strs=str.split(",");
 var truefalse=$("#searchobj_value").val();
 var truefalses=truefalse.split(",");
 var keystr="";
 for(var i=0;i<truefalses.length;i++)
 {
 if(truefalses[i]=="true")
 {
 keystr=keystr+strs[i]+",";
 }

 }
 if(keystr!=""){keystr=keystr.substring(0,keystr.length-1);}

 if(keystr!="")
 {
 var myKeys = keystr.split(",");
 //local.searchInBounds(myKeys, map.getBounds());
 local.searchNearby(myKeys,point,$("#distance").val());
 }

 rv=true;
 }
 else if(arg==2)
 {

 if($("#showtype_value").val()!="")
 {


 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
 $http.get("http://www.runoob.com/try/angularjs/data/Customers_JSON.php")
 .success(function (response) {$scope.names = response.records;});
 });


 $scope.names = ("A,B,C").split(",");

 rv=true;

 }
 else{alert("请选择显示方式")}


 }

 return rv;
 }




 $scope.ok = function (arg) {
 if($scope.searchmap(arg))
 {
 $modalInstance.close($scope.selected.item);
 }
 };

 $scope.cancel = function () {
 $modalInstance.dismiss('cancel');
 };



 }]);





 */















