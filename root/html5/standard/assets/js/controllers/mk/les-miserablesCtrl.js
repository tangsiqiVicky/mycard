
app.controller('les-miserablesCtrl', ["$window", "$scope", "$location", "$rootScope", '$localStorage', '$state', 'ngTableParams', '$stateParams', "$interval",function ($window, $scope, $location, $rootScope, $localStorage, $state, ngTableParams, $stateParams, $interval) {

    $rootScope.currTitle = "";
    $scope.title = '力引导布局';

    var myChart = echarts.init(document.getElementById('main'));

    // var myChartContainer = function () {
    //     myChart.style.width = window.innerWidth+'px';
    //     myChart.style.height = window.innerHeight+'px';
    // };
    // myChartContainer();




    $scope.get = function () {

        var options = {
            url: myforwardurl('http://115.238.227.190:90/snsoft/surenet_folder/pm/xml.jsp?P_Name=测试113'),
            async: false,
            type: 'get',
            dataType:'jsonp',
            data: null,
            resetForm: true,
            timeout: 60000,
            jsonp: 'callback',
            success: function (rv) {
               console.info('rv',rv);


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }


        };
        $.ajax(options);

    }
    $scope.get();
    // 指定图表的配置项和数据
    myChart.showLoading();
    // http://115.238.227.190:90/snsoft/surenet_folder/pm/xml.jsp?ProjectName='蚁加-项目管理模块'
    // les-miserables.gexf
    $.get('les-miserables.gexf', function (xml) {
        myChart.hideLoading();

        var graph = echarts.dataTool.gexf.parse(xml);
        // var categories = [];
       var categories = [
            {
             name:'供应商'
            },
            {
                name:'生产商'
            },
            {
                name:'竞争对手'
            },
            {
                name:'消费群体'
            },
            {
                name:'政府部门'
            },
            {
                name:'非法人团队'
            },
            {
                name:'行业管理部门'
            },
            {
                name:'其他'
            }

        ];
        // for (var i = 0; i < 9; i++) {
        //     categories[i] = {
        //         name: '类目' + i
        //     };
        // }
        graph.nodes.forEach(function (node) {
            node.itemStyle = null;
            node.symbolSize = 10;
            node.value = node.symbolSize;
            node.category = node.attributes.modularity_class;
            // Use random x, y
            node.x = node.y = null;
            node.draggable = true;
        });
        option = {
            title: {
                text: 'Les Miserables',
                subtext: 'Default layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {},
            legend: [{
                // selectedMode: 'single',
                data: categories.map(function (a) {
                    return a.name;
                })
            }],
            animation: false,
            series : [
                {
                    name: 'Les Miserables',
                    type: 'graph',
                    layout: 'force',
                    data: graph.nodes,
                    links: graph.links,
                    categories: categories,
                    roam: true,
                    label: {
                        normal: {
                            position: 'right'
                        }
                    },
                    force: {
                        repulsion: 100
                    }
                }
            ]
        };

        myChart.setOption(option);
        // window.onresize = function () {
        //     myChartContainer();
        //     myChart.resize();
        // };


    }, 'xml');


















}]);



