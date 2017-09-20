'use strict';

app.controller('MemCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', "$timeout", function ($window, $scope, $location, $rootScope, $localStorage, $state, $timeout) {


    $rootScope.currTitle = "我的会员";

    var mymemnum = "";
    var mempoints = "";


    var lev1 = 9
    var lev2 = 180;
    var lev3 = 1260;


    var tree, treedata_avm;
    $scope.my_tree_handler = function (branch) {
        var _ref;
        $scope.output = "提示：" + branch.label;
        $scope.level = branch.label.split("会员")[0].replace("提示：", "").replace("一级", "1").replace("二级", "2").replace("三级", "3");

        if ((_ref = branch.data) != null ? _ref.description :
                void 0) {
            return $scope.output += '(' + branch.data.description + ')';
        }
    };


    treedata_avm = [{
        label: '一级会员',
        children: [{
            label: '二级会员',
            children: ['三级会员']
        }]
    }];

    $scope.my_data = treedata_avm;

    $scope.my_tree = tree = {};


    $scope.try_async_load = function () {
        $scope.my_data = [];
        $scope.doing_async = true;


        return $timeout(function () {

            treedata_avm = [{
                label: '一级会员【' + lev1 + '】',
                children: [{
                    label: '二级会员【' + lev2 + '】',
                    children: ['三级会员【' + lev3 + '】']
                }]
            }];


            $scope.my_data = treedata_avm;

            $scope.doing_async = false;
            return tree.expand_all();
        }, 500);
    };


    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmymember&user_id='+user_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getmymember&user_id=' + user_id, serviceRoot2),
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
                    msg = item.result_text;
                    mymemnum = item.member_num;
                    mempoints = item.points_invite;
                    lev1 = item.lev1;
                    lev2 = item.lev2;
                    lev3 = item.lev3;
                }
                else {
                    msg = item.result_text;
                }
            })


            if (isok) {//alert("获取数据成功")
                //alert(msg)

                setTimeout(function () {
                    $scope.$apply(function () {


                        $("#mymemnum").val(mymemnum);
                        $("#mempoints").val(mempoints);

                        $scope.try_async_load();

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


    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);


}]);

