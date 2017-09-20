function myOut(str) {
    if (str == null || str == "") {
        str = "ISNULLREP*@@!ISNULLREP";
    }
    if (str.split("*@@!").length > 1) {
        str = str.split("*@@!")[1].replace("ISNULLREP", "");
    }
    return str;
}

function oxmlhttp(theUrl, publicRoot, user_id) {
    var randomstr = "user_id=" + user_id
    var re = /\?/
    if (re.test(theUrl)) {
        theUrl = theUrl + "&" + randomstr
    }
    else {
        theUrl = theUrl + "?" + randomstr
    }

    if (theUrl.substr(0, 4).toLowerCase() != "http") {
        theUrl = publicRoot + theUrl
    }
    var xmlhttpfileName = encodeURI(theUrl)
    var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
    xmlHttp.open("POST", xmlhttpfileName, false)
    xmlHttp.send()
    return myOut(xmlHttp.responseText);
}

function myreplace(str,olestr,newstr)
{
    var rv=str

    if(olestr!=newstr)
    {
    while(rv.indexOf(olestr)>=0)
    {
    rv=rv.replace(olestr,newstr)
    }
    }
    return rv;

}

function myforwardurl(theurl, serviceRoot) {

    if (publicRoot != "" && publicRoot != "/") {
        theurl = publicRoot + "myforward?theurl=" + encodeURI(theurl);
    }
    return theurl;
}


function isok(obj, time) {

    if (document.getElementById(obj)) {
        return true;
    }
    else {
        //alert(obj)
        //isok(obj,time);
    }
    window.setInterval(function () {
        isok(obj, time);
    }, time);

}


function myalert(msg)
{
    $("#alertmsg").html(msg);
    $("#alertmsg").show().animate({width: '250px'}, 200).fadeOut(1500);
}

var request =
    {
        QueryString: function (val) {
            var rv = "";
            try {
                var uri = window.location.href;
                var re = new RegExp("\\?" + val + "=([^&?]*)", "ig");
                rv = ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 2)) : "");

                if (rv == "") {
                    re = new RegExp("\\&" + val + "=([^&?]*)", "ig");
                    rv = ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 2)) : "");
                }

            } catch (e) {
            }
            return rv;
        }
    }


var page_w = (window['innerWidth'] || document.documentElement.scrollWidth);
var page_h = (window['innerHeight'] || document.documentElement.scrollHeight);

window.onresize = function () {

    try {
        page_w = (window['innerWidth'] || document.documentElement.scrollWidth);
        page_h = (window['innerHeight'] || document.documentElement.scrollHeight);
    }
    catch (e) {
    }


    try {
        OnresizeEvent()
    } catch (e) {
    }
}


//公共变量begin
var scope;
var compile;
var app_name = "名卡联盟";
var app_desc = "";
var publicRoot = "/";//"http://localhost:91/h5-js/";//"http://192.168.1.101:91/h5-js/";
var serviceRoot = "http://www.mycard.top/h5-js/";
var serviceRoot2 = "http://101.69.174.15:8080/snsoft/";
var appid = "wxa445cf4c1c719f79";//"wx622332ab3ccc0c18";
var secret = "0208e3510d6994c3ff4481eb001f431f";//"3567d82f466c1439c285a8a1ea8680c4";
var token = "snwx";
var openid = "";
var user_id = "";
var user_type = "";
var nickname = "";
var phone = "";
var picture = "";
var logo = "";
var clickbottomtabindex = 0;
var menu_defaultshow=request.QueryString("menu_defaultshow");
if(menu_defaultshow==undefined){menu_defaultshow="true";}

var sex = "";
var province = "";
var city = "";
var country = "";
var headimgurl = "";


var is_load_baidumap = false;
var is_getlocaladdress = false;
var is_load_wx = false;

//仅用于首次注册的自动登录
var uid = request.QueryString("uid");
var pwd = request.QueryString("pwd");
var theinvitor = request.QueryString("theinvitor");
var menuid = request.QueryString("menuid");
var applogin_token=request.QueryString("applogin_token");//用于APP登录调用H5
var h5login_token=request.QueryString("h5login_token");//用于H5登录调用其他网页


var timestamp = new Date().getTime() + "";
timestamp = timestamp.substring(0, timestamp.length - 3);
var noncestr = "i4C3VM0P37wVUCFvkVAy"
var url = window.location.href.split("#")[0];//publicRoot+"standard/index.html"
var jsapi_signature = "";
var images = {
    localId: [],
    serverId: []
};
var voices = {
    localId: [],
    serverId: []
};
var prepay_id = "";
var Sign = "";
var paySign = "";
var getprepay_rvsign = "";
//公共变量end


/*--shake begin-*/

function shakeEventDidOccur() {

    try {
        shake_act()
    } catch (e) {
    }
}


window.onload = function () {

    //create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 15
    });

    // start listening to device motion
    myShakeEvent.start();

    // register a shake event

};

/*--shake end-*/






//$(document).ready(function (ev) {

/*
 $.supersized({
 // Functionality
 slide_interval          :   10000,		// Length between transitions
 transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
 transition_speed		:	700,		// Speed of transition
 // Components
 slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
 slides 					:  	[			// Slideshow Images

 //{image : 'assets/images/bg-001.jpg'},
 //{image : 'assets/images/bg-002.jpg'},
 //{image : 'assets/images/bg-003.jpg'},
 //{image : 'assets/images/bg-004.jpg'},
 //{image : 'assets/images/bg-005.jpg'},
 //{image : 'assets/images/bg-006.jpg'},
 //{image : 'assets/images/bg-007.jpg'},
 //{image : 'assets/images/bg-008.jpg'},
 {image : 'assets/images/bg-017.jpg'}
 //{image : 'assets/images/bg-010.jpg'},
 //{image : 'assets/images/bg-011.jpg'},
 //{image : 'assets/images/bg-012.jpg'}
 //{image : 'assets/images/bg-013.jpg'},
 //{image : 'assets/images/bg-014.jpg'},
 //{image : 'assets/images/bg-015.jpg'},
 //{image : 'assets/images/bg-016.jpg'},
 //{image : 'assets/images/bg-017.jpg'},
 //{image : 'assets/images/bg-018.jpg'},
 //{image : 'assets/images/bg-019.jpg'},
 //{image : 'assets/images/bg-020.jpg'}

 ]
 });

 */


//setTimeout(loadbaiduapi(),5000);

//loadwxjs();

//});


/*
 try{
 if(user_id==""){$("#ss_menu").css("display","none");}else{$("#ss_menu").css("display","");}
 }catch(e){}
 */

if (request.QueryString("menuid") == "po" || request.QueryString("menuid") == "firstpage") {
    clickbottomtabindex = 0;
}
if (request.QueryString("menuid") == "self_man") {
    clickbottomtabindex = 3;
}
if (request.QueryString("menuid") == "zb") {
    clickbottomtabindex = 1;
}
if (request.QueryString("menuid") == "cart") {
    clickbottomtabindex = 2;
}


function chgclickbottomtabindex(arg) {
    clickbottomtabindex = arg
}

function chgBottomTab(arg) {
    if (arg != null) {
        clickbottomtabindex = arg;
    }
    $("#bottom_tab0").attr('class', 'text-dark-user-forbottom');
    $("#bottom_tab1").attr('class', 'text-dark-user-forbottom');
    $("#bottom_tab2").attr('class', 'text-dark-user-forbottom');
    $("#bottom_tab3").attr('class', 'text-dark-user-forbottom');
    $("#bottom_tab" + clickbottomtabindex).attr('class', 'text-dark-user-click');
}


//遮罩层
function maskLayer(arg) {
    try {
        if (arg == 1) {
//显示遮罩层
            $.openPopupLayer({
                name: "masklayer",
                width: page_w*2,
                height: page_h*2,
                target: "masklayer",
                container: ""
            });
        }
        else {
//隐藏遮罩层
            $.closePopupLayer("masklayer");
        }
    } catch (e) {
    }
}


//以下是百度地图begin
var map;
var myGeo;
var geolocation;
var point;
var circle;
var is_select = false;
var cur_addr = "";
var cur_pos = "";
var cur_operid = "";

function loadbaiduapi() {

    if (document.getElementById("bdmap")) {
        maskLayer(1);
        document.body.removeChild(document.getElementById("bdmap"));
    }

    var script = document.createElement("script");
    script.setAttribute("id", "bdmap");
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=TK5m7eydqtOgrHAmNVGBm1Ka&callback=initialize";
    document.body.appendChild(script);

}

function loadwxjs() {

    if (!is_load_wx) {
        var script = document.createElement("script");
        script.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
        document.body.appendChild(script);

        setTimeout(function () {
            loadWXjsAPI();
        }, 1000);
    }

}


function getlocaladdress() {
    try {


        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                //var mk = new BMap.Marker(r.point);
                //map.addOverlay(mk);
                if (map) {
                    map.panTo(r.point);
                }
                point = r.point;

                //alert('您的位置：'+point.lng+','+point.lat);
                myGeo.getLocation(point, function (rs) {
                        var addComp = rs.addressComponents;
                        if (addComp.province != addComp.city) {
                            cur_addr = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                        }
                        else {
                            cur_addr = addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                        }
                        //alert(cur_addr)
                        cur_pos = point.lng + ',' + point.lat;
                        //$cookieStore.put("cur_pos",cur_pos);
                    }
                );
                //map.centerAndZoom(r.point, 12);
                //alert('您的位置：'+point.lng+','+point.lat);


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

        myGeo.getLocation(point, function (result) {
            if (result) {

                cur_addr = result.address;
                cur_pos = point.lng + ',' + point.lat;


            }
        });


        is_getlocaladdress = true;


    }
    catch (e) {
    }

    if (!is_getlocaladdress) {
        setTimeout(function () {
            getlocaladdress();
        }, 3000);
    }
}


function initialize() {
//map = new BMap.Map("mapcontainer");
    try {


        map = new BMap.Map("mapcontainer");

        point = new BMap.Point(121.478133, 31.2281);
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);
//map.addEventListener("tilesloaded",function(){alert("地图加载完毕");});
        map.addEventListener("click", function (e) {

//alert('您的位置：'+e.point.lng+','+e.point.lat);

            //alert(e.point.lng + "," + e.point.lat);
            var pt = e.point;
            myGeo.getLocation(pt, function (rs) {
                var addComp = rs.addressComponents;
                if (addComp.province != addComp.city) {
                    cur_addr = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                }
                else {
                    cur_addr = addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                }
                cur_pos = pt.lng + ',' + pt.lat;
                //alert(cur_addr)
                templocation = cur_addr;
                templocation_pos = cur_pos;

                try {
                    After_ClickOnMap(pt, cur_pos, cur_addr);
                } catch (e) {
                }

            });


            map.clearOverlays();
            var tmp_marker = new BMap.Marker(pt);  // 创建标注

            map.addOverlay(tmp_marker);              // 将标注添加到地图中


        });
//geolocation = new BMap.Geolocation();


        myGeo = new BMap.Geocoder();
        geolocation = new BMap.Geolocation();


        getlocaladdress();

        is_load_baidumap = true;

    }
    catch (e) {
    }

    if (!is_load_baidumap) {
        setTimeout(function () {
            initialize();
        }, 3000);
    }


    maskLayer(0);
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


//map.addControl(new BMap.NavigationControl());
//map.addControl(new BMap.ScaleControl());
//map.addControl(new BMap.OverviewMapControl());
//map.addControl(new BMap.MapTypeControl());

//map.setCurrentCity("上海"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用

    /*
     var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_LEFT});   //设置版权控件位置
     map.addControl(cr); //添加版权控件
     var bs = map.getBounds();   //返回地图可视区域
     cr.addCopyright({id: 1, content: "SNIPS/v8&nbsp;&nbsp;&nbsp;&nbsp;", bounds: bs});
     */
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


}


//以上是百度地图end


//以下微信JS接口 begin


function loadWXjsAPI() {
    //alert("loadWXjs")
//加载微信JSSDK接口
    var options = {
        //url:myforwardurl(serviceRoot+"snwx_act?mytype=getjsapi_signature&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url,serviceRoot),
        url: myforwardurl(serviceRoot2 + "snwx/snWXWX/?mytype=getjsapi_signature&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url, serviceRoot2),
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
                msg = rv.result_text;
            }

            //var jsapi_ticket=oxmlhttp(serviceRoot+"snwx_act?mytype=getjsapi_ticket");
            //alert(jsapi_ticket)
            //alert(location.href.split('#')[0])

            jsapi_signature = msg;//oxmlhttp(serviceRoot+"snwx_act?mytype=getjsapi_signature&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url).trim();
            //alert(jsapi_signature)
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appid, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: noncestr, // 必填，生成签名的随机串
                signature: jsapi_signature,// 必填，签名，见附录1
                jsApiList: ["chooseImage", "uploadImage", "chooseWXPay", "scanQRCode", 'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 ,'startSearchBeacons','stopSearchBeacons','onSearchBeacons'
            });


            is_load_wx = true;


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {


        }
    };
    $.ajax(options);


    if (!is_load_wx) {
        setTimeout(function () {
            loadWXjsAPI();
        }, 1000);
    }
}


//以上微信JS接口 end





function showmenu(arg) {
    if(arg)
    {
        $("#bottombanner").css("display", "");
    } else {
        $("#bottombanner").css("display", "none");
    }
}
