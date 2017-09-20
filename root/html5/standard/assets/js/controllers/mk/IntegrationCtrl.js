'use strict';

app.controller('IntegrationCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', function ($window, $scope, $location, $rootScope, $localStorage, $state) {


    $rootScope.currTitle = "积分管理";

    var kxfjf = "";
    var xffjf = "";
    var xxxfjl = "";
    var ysyjf = "";


    var options = {
        //url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getpoints&user_id='+user_id,serviceRoot),
        url: myforwardurl(serviceRoot2 + 'self/firstSelf?actiontype=getpoints&user_id=' + user_id, serviceRoot2),
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
                    kxfjf = item.points;
                    xffjf = item.points_returned;
                    xxxfjl = item.points_invite;
                    ysyjf = item.points_consumed;
                }
                else {
                    msg = item.result_text;
                }
            })


            if (isok) {//alert("获取数据成功")
                //alert(msg)


                $("#kxfjf").val(kxfjf);
                $("#xffjf").val(xffjf);
                $("#xxxfjl").val(xxxfjl);
                $("#ysyjf").val(ysyjf);


                $scope.xffjf = xffjf
                $scope.xxxfjl = xxxfjl

                $scope.kxfjf = kxfjf
                $scope.ysyjf = ysyjf


                setTimeout(function () {
                    $scope.$apply(function () {



                        // Chart.js Data
                        $scope.data = [
                            {
                                value: parseFloat(xffjf),
                                color: '#F7464A',
                                highlight: '#FF5A5E',
                                label: '消费获得'
                            },
                            {
                                value: parseFloat(xxxfjl),
                                color: '#46BFBD',
                                highlight: '#5AD3D1',
                                label: '邀请奖励'
                            }
                        ];
                        $scope.total = parseFloat(xffjf) + parseFloat(xxxfjl);
                        if ($scope.total > 0) {
                            $scope.per_xf = parseInt(parseFloat(xffjf) / $scope.total * 100)
                            $scope.per_yqjl = 100 - $scope.per_xf;//parseInt(parseFloat(xxxfjl)/$scope.total*100)
                        }
                        else {
                            $scope.per_xf = 0;
                            $scope.per_yqjl = 0;
                        }
                        // Chart.js Options
                        $scope.options = {

                            // Sets the chart to be responsive
                            responsive: false,

                            //Boolean - Whether we should show a stroke on each segment
                            segmentShowStroke: true,

                            //String - The colour of each segment stroke
                            segmentStrokeColor: '#fff',

                            //Number - The width of each segment stroke
                            segmentStrokeWidth: 2,

                            //Number - The percentage of the chart that we cut out of the middle
                            percentageInnerCutout: 50, // This is 0 for Pie charts

                            //Number - Amount of animation steps
                            animationSteps: 100,

                            //String - Animation easing effect
                            animationEasing: 'easeOutBounce',

                            //Boolean - Whether we animate the rotation of the Doughnut
                            animateRotate: true,

                            //Boolean - Whether we animate scaling the Doughnut from the centre
                            animateScale: false,

                            //String - A legend template
                            legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

                        };


                    });


                    $scope.renderChart = true;


                }, 500);


            } else {
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            $("#kxfjf").val("0");
            $("#xffjf").val("0");
            $("#xxxfjl").val("0");
            $("#ysyjf").val("0");

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







