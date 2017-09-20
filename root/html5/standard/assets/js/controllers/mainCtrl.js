'use strict';
/**
 * Clip-Two Main Controller
 */
app.controller('AppCtrl', ['$rootScope', '$scope', '$state', '$translate', '$localStorage', '$window', '$document', '$timeout', 'cfpLoadingBar',"$location",
function ($rootScope, $scope, $state, $translate, $localStorage, $window, $document, $timeout, cfpLoadingBar,$location) {

    // Loading bar transition
    // -----------------------------------
    var $win = $($window);
    var request =
        {
            QueryString : function(val)
            {

                var rv="";
                try
                {
                    var uri = window.location.href;
                    var re = new RegExp("\\?" +val+ "=([^&?]*)", "ig");
                    rv=((uri.match(re))?(uri.match(re)[0].substr(val.length+2)):"");


                    if(rv==""){
                        re = new RegExp("\\&" +val+ "=([^&?]*)", "ig");
                        rv=((uri.match(re))?(uri.match(re)[0].substr(val.length+2)):"");
                    }

                }catch(e){}
                return rv;
            }
        }

    var getValue = function(){
        return $window.sessionStorage.length;
    }

    var getData = function(){
      var json = [];
      $.each($window.sessionStorage, function(i, v){
        json.push(angular.fromJson(v));
      });
      return json;
    }

    var removeItem = function(id){
      $window.sessionStorage.removeItem(id);

    }



	var thedata=getData();

	$.each(thedata,function(idx,item){
		if(item.id!=undefined)
		{
		user_id=item.id;
		/*
		picture=item.img;
		logo=item.logo;
		user_type=item.user_type;
		nickname=item.nickname;
		phone=item.phone;
		openid=item.openid;
		*/
		}

					})





	if(user_id!=null&&user_id!="")
	{

		/*
		if(picture!=null&&picture!="")
		{}
		else
		{
		picture='assets/images/media-user.png';
		}

			var json = [];
							json = {
							  id: user_id,
							  img: picture,
								  logo:logo,
								  nickname: nickname,
								  user_type: user_type,
								  phone: phone,
								  openid:openid
							}
							 */
							//$window.sessionStorage.setItem(user_id, JSON.stringify(json));//写入session

	}
	else
	{

		openid=decodeURI(request.QueryString("openid"));
		user_id=decodeURI(request.QueryString("user_id"));
		nickname=decodeURI(request.QueryString("nickname"));
		sex=decodeURI(request.QueryString("sex"));
		province=decodeURI(request.QueryString("province"));
		city=decodeURI(request.QueryString("city"));
		country=decodeURI(request.QueryString("country"));
		headimgurl=decodeURI(request.QueryString("headimgurl"));
        headimgurl=headimgurl.replace(/%2F/g,"/");





	}

	if(user_id==null||user_id=="null"||user_id=="undefined"){user_id="";}
	if(menuid=="registration"||menuid=="shopreg"){user_id="";}




var tooltip00="";
var tooltip01="";
var tooltip02="";
var tooltip03="";
var tooltip04="";
var tooltip05="";

$rootScope.tooltip00="这里开始名卡之旅！摇一摇使用语音助手";
$rootScope.tooltip01="看看附近有点啥吧:)";
$rootScope.tooltip02="我的购物车";
$rootScope.tooltip03="我的地盘我做主！";
$rootScope.tooltip04="";
$rootScope.tooltip05="";

//alert("mainCtrl:"+menuid)

try{
//if(user_id==""){$("#ss_menu").css("display","none");}else{$("#ss_menu").css("display","");}
if(menuid=="registration"||menuid=="shopreg"||menu_defaultshow=="false"){showmenu(false);}else{showmenu(true);}
}catch(e){}

//alert("mainCtrl user_id:"+user_id+","+nickname+",uid:"+uid+",theinvitor:"+theinvitor)


if(user_id=="")
{

		$rootScope.openid=openid;
		$rootScope.user.nickname=nickname;
		$rootScope.user.sex=sex;
		$rootScope.user.province=province;
		$rootScope.user.city=city;
		$rootScope.user.country=country;
		$rootScope.user.headimgurl=headimgurl;



	if(uid!="")
	{
	$location.url("/login/signin?uid="+uid+"&pwd="+pwd+"&isreglogin=1");
	}
	else if(theinvitor!="")
    {
    $location.url("/login/registration?theinvitor="+theinvitor);
    }
    else if(applogin_token!="")
    {
    $location.url("/login/signin?applogin_token="+applogin_token);
    }
	else
	{
		if(menuid=="registration")
		{
		$location.url("/login/registration");
		}
		else if(menuid=="shopreg")
		{
		$location.url("/login/shopregistration");
		}
		else
		{
			/*不登陆也可以使用系统，只是在需要用户编号的地方*/
		//$location.url("/login/signin");
		}
	}

}
else
{
var options = {
				//url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getusrinfo&user_id='+user_id,serviceRoot),
				url:myforwardurl(serviceRoot2+'self/firstSelf?actiontype=getuserinfo&user_id='+user_id,serviceRoot2),
				async: false,
                type: 'get',
                dataType: 'json',
                data: null,
				resetForm:true,
				timeout:60000,
				// jsonp:'callback',
                success: function (rv) {
					var isok=false;

					$.each(rv.data,function(idx,item){

					   if(item.result=="1")
						{
					   isok=true;
						nickname=item.nickname;
						picture=item.picture;
						phone=item.phone;
						logo=item.logo;
						user_type=item.user_type;
						openid=item.openid;

						tooltip00=item.tooltip00;
						tooltip01=item.tooltip01;
						tooltip02=item.tooltip02;
						tooltip03=item.tooltip03;
						tooltip04=item.tooltip04;
						tooltip05=item.tooltip05;
						}

					})

						if(isok){

							setTimeout(function() {
							$scope.$apply(function() {

								$rootScope.user.user_id=user_id;
								$rootScope.user.picture=picture;
								$rootScope.user.logo=logo;
								$rootScope.user.nickname=nickname;
								$rootScope.user.phone=phone;
								$rootScope.user.user_type=user_type;
								$rootScope.openid=openid;

								$rootScope.tooltip00=tooltip00;
								$rootScope.tooltip01=tooltip01;
								$rootScope.tooltip02=tooltip02;
								$rootScope.tooltip03=tooltip03;
								$rootScope.tooltip04=tooltip04;
								$rootScope.tooltip05=tooltip05;

								if(logo!=""){$rootScope.justlogo=((logo.indexOf("upload_folder")>=0)?serviceRoot:"")+logo;}
								//alert(logo)

							});
							},500);

						}else{}


                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {


                     }
            };
            $.ajax(options);
}






    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

//var isreg=request.QueryString("isreg")+"";
//	$rootScope.isreg=isreg;
//alert(isreg)
						//alert("mainCtrl:"+user_id)
//alert("$rootScope.isreg:"+$rootScope.isreg)
//alert(user_id=="" && $rootScope.isreg!="true")
		//if(user_id=="" && $rootScope.isreg!="true")
		//{
		//$location.path("/login/signin");//.replace();
							//$rootScope.$apply();

		//}

//alert("stateChangeStart:"+user_id)
try{
$(window).unbind("scroll");
}catch(e){}

try{
window.removeEventListener("shake", shakeEventDidOccur);
}catch(e){}

try{
$("#totopbtn").css("display","none");
}catch(e){}

try{$.closePopupLayer();}
catch(e){}
        //start loading bar on stateChangeStart
        cfpLoadingBar.start();

    });


try{$("#supersized").empty();$("#supersized-loader").remove();}catch(e){}


/*
	$rootScope.$on('$stateChangeStart', function(event, next) {
  return Auth.isLoggedInAsync(function(loggedIn) {
    if (next.authenticate && !loggedIn) {
      return $location.path("/login");
    }
  });


});
*/


    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {


//alert("mainCtrl:"+$rootScope.openid)

try{
if(menuid=="registration"||menuid=="shopreg"||menu_defaultshow=="false"){showmenu(false);}else{showmenu(true);}
}catch(e){}


//alert("stateChangeSuccess:"+user_id)

try{$("#supersized").empty();$("#supersized-loader").remove();}catch(e){}

        //stop loading bar on stateChangeSuccess
        event.targetScope.$watch("$viewContentLoaded", function () {

            cfpLoadingBar.complete();
        });

        // scroll top the page on change state

        $document.scrollTo(0, 0);

        if (angular.element('.email-reader').length) {
            angular.element('.email-reader').animate({
                scrollTop: 0
            }, 0);
        }

        // Save the route title
        //$rootScope.currTitle = $state.current.title;

	try{chgBottomTab()}catch(e){}


    });



$rootScope.logit=function(theuser_id,thelogtype,theaction,thecomment)
	{

var options = {
				//url:myforwardurl(serviceRoot+'mk_main_info?actiontype=logit&user_id='+theuser_id+"&logtype="+thelogtype+"&action="+theaction+"&comment="+thecomment,serviceRoot),
				url:myforwardurl(serviceRoot2+'self/firstSelf?actiontype=logit&user_id='+theuser_id+"&logtype="+thelogtype+"&action="+theaction+"&comment="+thecomment,serviceRoot2),
				async: false,
                type: 'get',
                dataType: 'json',
                data: null,
				resetForm:true,
				timeout:60000,
				// jsonp:'callback',
                success: function (rv) {
					var isok=false;

					$.each(rv.data,function(idx,item){

					   if(item.result=="1")
						{
					   isok=true;

						}

					})

						if(isok){

							setTimeout(function() {
							$scope.$apply(function() {

							});
							},500);

						}else{}


                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {


                     }
            };
            $.ajax(options);
}



    // State not found
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        //$rootScope.loading = false;
        console.log(unfoundState.to);
        // "lazy.state"
        console.log(unfoundState.toParams);
        // {a:1, b:2}
        console.log(unfoundState.options);
        // {inherit:false} + default options

		//alert("stateNotFound");
    });

    $rootScope.pageTitle = function () {
        return ' - ' + $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
    };

    // save settings to local storage
    if (angular.isDefined($localStorage.layout)) {
        $scope.app.layout = $localStorage.layout;

    } else {
        $localStorage.layout = $scope.app.layout;
    }
    $scope.$watch('app.layout', function () {
        // save to local storage
        $localStorage.layout = $scope.app.layout;
    }, true);

    //global function to scroll page up
    $scope.toTheTop = function () {

        $document.scrollTopAnimated(0, 600);

    };

    // angular translate
    // ----------------------

    $scope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
            'cn': '中文',
			'en': 'English',
            'it_IT': 'Italiano',
            'de_DE': 'Deutsch'
        },
        // display always the current ui language
        init: function () {
            var proposedLanguage = $translate.proposedLanguage() || $translate.use();
            var preferredLanguage = $translate.preferredLanguage();
            // we know we have set a preferred one in app.config
            $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
        },
        set: function (localeId, ev) {
            $translate.use(localeId);
            $scope.language.selected = $scope.language.available[localeId];
            $scope.language.listIsOpen = !$scope.language.listIsOpen;
        }
    };




    $scope.language.init();

    // Function that find the exact height and width of the viewport in a cross-browser way
    var viewport = function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        };
    };
    // function that adds information in a scope of the height and width of the page
    $scope.getWindowDimensions = function () {
        return {
            'h': viewport().height,
            'w': viewport().width
        };
    };
    // Detect when window is resized and set some variables
    $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
        $scope.windowHeight = newValue.h;
        $scope.windowWidth = newValue.w;
        if (newValue.w >= 992) {
            $scope.isLargeDevice = true;
        } else {
            $scope.isLargeDevice = false;
        }
        if (newValue.w < 992) {
            $scope.isSmallDevice = true;
        } else {
            $scope.isSmallDevice = false;
        }
        if (newValue.w <= 768) {
            $scope.isMobileDevice = true;
        } else {
            $scope.isMobileDevice = false;
        }
    }, true);
    // Apply on resize
    $win.on('resize', function () {
        $scope.$apply();
    });




}]);



