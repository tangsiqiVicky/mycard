
app.controller('dcstatCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', "$interval",function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $interval) {

    $rootScope.currTitle = "问卷记录";

    $scope.dc_id = $stateParams.dc_id;


    $scope.record_id="";
    $scope.chartdata=[];

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
                console.info('rv',rv);
                if (rv.result == "1") {
                    $scope.data=rv.data;
                    isok = true;
                    maskLayer(0);
                }
                else {
                    alert("验证码有误 >_<||| ");
                    $scope.visible=false;
                    msg = rv.result_text;
                    maskLayer(0);
                }


                if (isok) {//alert("获取数据成功")
                    //alert(msg)
                    setTimeout(function () {
                        $scope.$apply(function () {

                            data = $scope.data;

                            $scope.tableParams = new ngTableParams({
                                page: 1, // show first page
                                count: 50 // count per page
                            }, {
                                total: data.length, // length of data
                                counts: [],
                                getData: function ($defer, params) {
                                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            });


                            //$scope.tableParams.reload();


                        });
                    }, 500);


                } else {
                    // alert(msg)
                }




            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }

        };
        $.ajax(options);


    }


recordList();


    setTimeout(function () {
        $.each($scope.chartdata,function (id,item) {

            id=id+1;
            var main_id="main_"+id


            var namedata = new Array();
            $.each(item,function (id,items) {

                namedata.push(items.name);
            })
            chart(main_id,item,namedata);

        })
    }, 2000);





    function chart(id,chartdata,namedata) {
        var myChart = echarts.init(document.getElementById(id));
        // 指定图表的配置项和数据
        var option = {

            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: namedata
            },
            series : [
                {
                    name: '锐适医疗SCM问卷',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:chartdata,
                    label:{
                        normal:{
                            show:false ,
                            position : 'inside'
                        },
                        emphasis:{
                            show :true
                        },
                        textStyle:{
                            color:'#000'
                        }
                    },
                    itemStyle:{
                        normal:{
                            label:{
                                show: true,
                                formatter: function (obj) {
                                    return obj.name + '\n' + obj.percent.toFixed(0) + '%'
                                },
                                textStyle:{
                                    color: '#000'
                                }
                            },
                            labelLine :{show:true}
                        }
                    }
                }
            ],
            color:['#00C740','#FF0000','#FFFD0D','#E88D0C','#0666C7','#0DC7B0']

        };

        // var option = {
        //
        //     tooltip : {
        //         trigger: 'item',
        //         formatter: "{a} <br/>{b} : {c} ({d}%)"
        //     },
        //     legend: {
        //         orient: 'vertical',
        //         left: 'left',
        //         data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        //     },
        //     series : [
        //         {
        //             name: '访问来源',
        //             type: 'pie',
        //             radius : '55%',
        //             center: ['50%', '60%'],
        //             data:chartdata,
        //             label:{
        //                 // normal:{
        //                 //     show:false ,
        //                 //     position : 'inside'
        //                 // },
        //                 // emphasis:{
        //                 //     show :true
        //                 // },
        //                 textStyle:{
        //                     color:'#000'
        //                 }
        //             },
        //             itemStyle:{
        //                 normal:{
        //                     label:{
        //                         show: true,
        //                         formatter: function (obj) {
        //                             return obj.name + '\n' + obj.percent.toFixed(0) + '%'
        //                         },
        //                         textStyle:{
        //                             color: '#000'
        //                         }
        //                     },
        //                     labelLine :{show:true}
        //                 }
        //             }
        //         }
        //     ],
        //     color:['#00C740','#FF0000','#FFFD0D','#E88D0C','#0666C7','#0DC7B0']
        //
        // };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }







    $scope.getcountdata = function(){
        var options = {
            url: myforwardurl(serviceRoot2 + 'invite/requestNaire?actiontype=P_get_total_dc&dc_id='+$scope.dc_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: null, //表单序列化
            resetForm: true,
            timeout: 60000,
            // jsonp: 'callback',
            success: function(rv) {
                console.info('rv.onlinelist',rv.data);
                $scope.chartdata=rv.data;
                $scope.chartdataDesc=rv.dataDesc;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }

        };
        $.ajax(options);
    }

    $scope.getcountdata();

    $scope.back = function () {
        $window.history.back();
    }


    setTimeout(function () {
        $rootScope.logit(user_id, 'url', window.location.href.substring(window.location.href.indexOf("index.html#") + 11), $rootScope.currTitle);
    }, 2000);






}]);



