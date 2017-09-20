

app.controller('dcrecordCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', "$interval",function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $interval) {

    $rootScope.currTitle = "问卷记录";

$scope.dc_id = $stateParams.dc_id;



    function recordList() {


         maskLayer(1);


        var options = {

            url: myforwardurl(serviceRoot2 + 'invite/requestNaire?actiontype=getdataDc_record&dc_id='+$scope.dc_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null,
            resetForm:true,
            timeout:60000,
            // jsonp:'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";
                $scope.data = rv.data;
                if(rv.result=="1"){


                     maskLayer(0);

                }else{
                    alert("验证码有误 >_<||| ");
                    $scope.visible=false;

                     maskLayer(0);
                }


            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);

    }


recordList();









































    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);






}]);



