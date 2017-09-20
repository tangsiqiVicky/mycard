'use strict';

app.controller('LoginCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$cookieStore', '$stateParams', function ($window, $scope, $location, $rootScope, $localStorage, $cookieStore, $stateParams) {


    $rootScope.currTitle = "登录";

    $scope.fromurl = $stateParams.fromurl;



    $scope.uid = $stateParams.uid;
    $scope.pwd = $stateParams.pwd;
    $scope.isreglogin = $stateParams.isreglogin;
    $scope.applogin_token = $stateParams.applogin_token;
    if($scope.applogin_token==undefined){$scope.applogin_token="";}

    clickbottomtabindex = 0;


    var getValue = function () {
        return $window.sessionStorage.length;
    }

    var getData = function () {
        var json = [];
        $.each($window.sessionStorage, function (i, v) {
            json.push(angular.fromJson(v));
        });
        return json;
    }

    var removeItem = function (id) {
        $window.sessionStorage.removeItem(id);

    }


    var isremember = "";
    var isremember_user_id = "";
    var isremember_password = "";
    var thedata = getData();
    $.each(thedata, function (idx, item) {
        if (item.id != undefined) {
            user_id = item.id;
            //picture=item.img;
            //logo=item.logo;
            //nickname=item.nickname;
            //phone=item.phone;
            //user_type=item.user_type;
            //openid=item.openid;
        }
    })


    if (user_id != "") {
        removeItem(user_id);
    }

    user_id = "";
    //picture="assets/images/avatar-1.jpg";


    $scope.openid = $rootScope.openid;
    $scope.nickname = $rootScope.user.nickname;
    $scope.sex = $rootScope.user.sex;
    $scope.province = $rootScope.user.province;
    $scope.city = $rootScope.user.city;
    $scope.country = $rootScope.user.country;
    $scope.headimgurl = $rootScope.user.headimgurl;

//myalert($scope.nickname)

    /*
     $rootScope.user.user_id=user_id;
     $rootScope.user.picture=picture;
     $rootScope.user.logo=logo;
     $rootScope.user.nickname=nickname;
     $rootScope.user.phone=phone;
     $rootScope.user.user_type=user_type;
     $rootScope.openid=openid;
     */


    isremember = $cookieStore.get("remember_value");
if($scope.applogin_token == "")
{
    if (isremember == "true") {
        isremember_user_id = $cookieStore.get("login_name");
        isremember_password = $cookieStore.get("login_password");

        $("#login_name").val(isremember_user_id);
        $("#login_password").val(isremember_password);
        $scope.remember_value = true;
        //$("#openid").val($rootScope.openid);
    }
}
else
{
    $("#login_name").val("");
    $("#login_password").val("");

}


    $scope.remember_value = true;


    $("#login").click(function () {

//if($scope.remember_value){$("#openid").val($rootScope.openid);}


    if($scope.applogin_token == "")
    {

        if ($("#login_name").val() == "") {
            //myalert("请输入用户名！");
            return;
        }
        if ($("#login_password").val() == "") {
            //myalert("请输入密码！");
            return;
        }

    }




        var options = {

            //url: myforwardurl(serviceRoot + 'mk_login?mytype=checkopeniduserid', serviceRoot),
            url: myforwardurl(serviceRoot2 + 'user/loginwx?mytype=checkopeniduserid', serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm: true,
            timeout: 60000,
            jsonp:'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";
                if (rv.result == "1") {
                    isok = true;
                }
                else {
                    msg = rv.result_text;
                }




                //if (isok) {myalert("检查成功1")


                        //$scope.login_act();

                //}
                //else {
                    //if(confirm(msg)){
                        //新增APP Login 绑定 begin
                        //APP绑定用户会返回绑定的用户名，如果此时登陆界面没有输入用户名，则自动填入，否则，不自动填入，继续登录将重新绑定
                        if(rv.alreadybind_uid!=""&&rv.alreadybind_uid!=undefined){
                                if ($("#login_name").val() == "") {$("#login_name").val(rv.alreadybind_uid);}
                        }
                        if(rv.alreadybind_pwd!=""&&rv.alreadybind_pwd!=undefined){
                                if ($("#login_password").val() == "") {$("#login_password").val(rv.alreadybind_pwd);}
                        }

                        //myalert($scope.applogin_token+","+$("#login_name").val()+","+msg+rv.alreadybind_uid+"----")

                        //新增APP Login 绑定 end
                        $scope.login_act();
                    //}

               // }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                myalert("检查失败");

            }
        };
        $.ajax(options);


    });



$scope.login_act = function () {
        var options2 = {

                       // url: myforwardurl(serviceRoot + 'mk_login', serviceRoot),
                        url: myforwardurl(serviceRoot2 + 'user/loginwx?mytype=loginwx', serviceRoot2),
                        async: false,
                        type: 'get',
                        dataType: 'json',
                        data: $("#f1").serializeArray(),
                        resetForm: true,
                        timeout: 60000,
                        jsonp:'callback',
                        success: function (rv) {
                            //data=myOut(data);
                            //$location.path("/app/wx/registration").replace();
                            //$rootScope.$apply();
                            var isok = false;
                            var msg = "";

                            $.each(rv.data, function (idx, item) {


                                if (item.result == "1") {
                                    user_id = item.user_id;
                                    //myalert("getuser_id:"+user_id)
                                    user_type = item.user_type;
                                    nickname = item.nickname;
                                    phone = item.phone;
                                    logo = item.logo;
                                    isok = true;

                                    h5login_token=item.h5login_token;
                                }
                                else {
                                    msg = item.result_text;
                                }
                            })

                            if (isok) {//myalert("登录成功")


                                setTimeout(function () {
                                    $scope.$apply(function () {

                                        var isremember = "";
                                        var isremember_user_id = "";
                                        var isremember_password = "";
                                        if ($scope.remember_value) {

                                            $cookieStore.put("login_name", $("#login_name").val());
                                            $cookieStore.put("login_password", $("#login_password").val());
                                            $cookieStore.put("remember_value", "true");
                                        }
                                        else {
                                            $cookieStore.put("login_name", "");
                                            $cookieStore.put("login_password", "");
                                            $cookieStore.put("remember_value", "false");
                                        }


                                        /*
                                         var json = [];
                                         json = {
                                         id: user_id,
                                         img: "assets/images/avatar-1.jpg",
                                         user_type: user_type,
                                         nickname:nickname,
                                         phone:phone,
                                         logo:logo,
                                         remember:isremember,
                                         remember_user_id:isremember_user_id,
                                         remember_password:isremember_password,
                                         openid:openid

                                         }
                                         */


                                        $rootScope.user.user_id = user_id;
                                        $rootScope.user.picture = picture;
                                        $rootScope.user.logo = logo;
                                        $rootScope.user.user_type = user_type;
                                        $rootScope.user.nickname = nickname;
                                        $rootScope.user.phone = phone;


                                        if (logo != undefined) {

                                            $rootScope.justlogo = serviceRoot + logo;
                                        }else{

                                        }



                                        if($scope.fromurl!=""&&$scope.fromurl!=undefined)
                                        {
                                            $location.url($scope.fromurl);
                                        }
                                        else
                                        {
                                            $location.url("/app/eco/firstpage");
                                        }



                                    });
                                }, 500);


                            } else {
                                myalert(msg)
                            }


                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            myalert("登录失败");

                        }
                    };
                    $.ajax(options2);
    }






showmenu(false);




    if ($scope.uid != null && $scope.uid != undefined && $scope.uid != "" && $scope.pwd != "" && $scope.isreglogin == "1") {//新增APP Login 绑定 begin
        setTimeout(function () {
            $("#login_name").val($scope.uid);
            $("#login_password").val($scope.pwd);
//myalert(123)
            $("#login").click();
//myalert("auto login"+$scope.uid)
        }, 100);
    }
    else
    {

        if($scope.applogin_token!="")
        {


            setTimeout(function () {
                $("#login").click();
            }, 100);

        }


    }











}]);

