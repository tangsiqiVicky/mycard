var app = angular.module('clipApp', ['clip-two']);
app.run(['$rootScope', '$state', '$stateParams','$window','$cookieStore',
function ($rootScope, $state, $stateParams,$window,$cookieStore) {

    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);



 // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

//alert(xmlhttp("https://api.weixin.qq.com/sns/oauth2/access_token?appid="+$rootScope.appid+"&secret="+$rootScope.secret+"&code="+$rootScope.code+"&grant_type=authorization_code"));


    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: "名卡联盟", // name of your project
        author: 'SNIPS', // author's name or company name
        description: app_desc, // brief description
        version: '2.0', // current version
        year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
        isMobile: (function () {// true if the browser is a mobile device
            var check = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                check = true;
            };
            return check;
        })(),
        layout: {
            isNavbarFixed: true, //true if you want to initialize the template with fixed header
            isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
            isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
            isFooterFixed: false, // true if you want to initialize the template with fixed footer
            theme: 'theme-1', // indicate the theme chosen for your project
            logo: 'assets/images/logo.png' // relative path of the project logo

        }
    };
    $rootScope.user = {
        user_id: '',
		nickname:'',
			sex:'',
			province:'',
			city:'',
			country:'',
			headimgurl:'',
		phone:'',
        job: '',
        picture: 'assets/images/media-user.png',
			logo:'',
		user_type:'',
		remember:''
    };






	$rootScope.justlogo="assets/images/just_logo.png";

	$rootScope.publicRoot = publicRoot;//"http://localhost:91/h5-js/";
	$rootScope.serviceRoot = serviceRoot;//"http://192.168.1.10:91/h5-js/"; //http://123.57.248.31:81/
	$rootScope.appid=appid;//"wx11d1e3f49fb98554";
	$rootScope.secret=secret;//"820656d4ad23d3c313bf6a3ba474002e";
	$rootScope.code="";
	$rootScope.openid="";  //如果为空，表示使用浏览器打开，否则是通过微信打开

	$rootScope.arg0="";
	$rootScope.arg1="";
	$rootScope.arg2="";

	$rootScope.location_lng_lat="";
	$rootScope.location_name="";














}]);
// translate config
app.config(['$translateProvider',
function ($translateProvider) {

    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
    });

    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
    // This is where preferredLanguage(langKey) comes in.
    //$translateProvider.preferredLanguage('en');
	$translateProvider.preferredLanguage('cn');

    // Store the language in the local storage
    $translateProvider.useLocalStorage();

    // Enable sanitize
    $translateProvider.useSanitizeValueStrategy('sanitize');

}]);
// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

}]);



/*
app.directive('loading', function loading() {
    return {
        restrict: 'E',
        transclude: true,
        template: '<div class="divModal">'
        + '<div ng-show="loading" class="loading">'
        + '<img alt="" src="../assets/pages/img/wait-loading.gif" style="vertical-align: middle; margin-right: 7px;"/>'
        + '<b></b>'
        + '</div>'
        + '</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
				{
					$("body,html").css({"overflow":"hidden"});
					$(element).css("display","block");
                    $(element).show();
				}
                else
				{
					$("body,html").css({"overflow":"auto"});
					$(element).css("display","none");
                    $(element).hide();
				}
                //$(element).show();
            });
        }
    }
});
*/
