


$(document).ready(function (ev) {




})


function setbg(arg)
{

    $.supersized({
        // Functionality
        slide_interval: 10000,      // Length between transitions
        transition: 1,          // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        transition_speed: 700,      // Speed of transition
        // Components
        slide_links: 'blank',   // Individual links for each slide (Options: false, 'num', 'name', 'blank')
        slides: [           // Slideshow Images

            {image : 'assets/images/'+arg+'_bg001.jpg'},
            {image : 'assets/images/'+arg+'_bg002.jpg'},
            {image : 'assets/images/'+arg+'_bg003.jpg'},
            {image : 'assets/images/'+arg+'_bg004.jpg'}


        ]
    });

}





app.controller('dcCtrl', ["$window", "$scope", "$location", "$rootScope", 'ngTableParams', '$stateParams', function ($window, $scope, $location, $rootScope, ngTableParams, $stateParams) {

    $rootScope.currTitle = "问卷调查";

//本界面可新增调查，可查看某一记录的详情
    $scope.record_id=$stateParams.record_id;
    if($scope.record_id==undefined || $scope.record_id==null){$scope.record_id="";}
//如果传了问卷记录编号，说明是查看这一纪录的详情，那就整体显示，否则是分页显示题目

    $scope.thedata={};
    $scope.theitem = {};
    $scope.dc_id=$stateParams.dc_id;
    if($scope.dc_id==undefined){$scope.dc_id="20170615";}
    $scope.dc_name="";
    $scope.length="";
    var gift_po_show_url;
    var po_id;
    var dataInfo = [];
    var str="";




    $scope.getresult =function(evt,opertype,item,usercontent,usercontentid,i) {
        var theanswer="";
        var thescore=0;
        var o;
        var theobj;

        if(evt==null)
        {
            o=$("#Q_"+usercontentid);
            theobj=document.getElementById("Q_"+usercontentid);//为了从jQuery获取tagName
        }
        else
        {
        o=$(evt.target);
        theobj=o[0];//为了从jQuery获取tagName
        }



        if(theobj.tagName.toLowerCase()=="span"){

            theobj=theobj.parentElement.parentElement.parentElement;
        }if(theobj.tagName.toLowerCase()=="lable"){
            theobj=theobj.parentElement.parentElement;
        }
        if(theobj.tagName.toLowerCase()=="li"||theobj.tagName.toLowerCase()=="div"){
            theobj=theobj.getElementsByTagName("INPUT")[0];
        }


        theanswer=theobj.value;


        if(theanswer==item.right_answer){
            thescore=item.score;
        }

        if(opertype=="new"){


            var theitem={};
            theitem.question_id=item.question_id;
            theitem.answer=theanswer;
            theitem.score=thescore;
            theitem.usercontent=usercontent;
            dataInfo.push(theitem);

        }else if(opertype=="edit"){

            if(item.single_or_multi=='1'){
                var oldvalue=dataInfo[i].answer;
                if(theobj.checked){
                    theanswer=myreplace(","+oldvalue+",",","+theanswer+",",",")+","+theanswer;
                }else{
                    theanswer=myreplace(","+oldvalue+",",","+theanswer+",",",");

                }
                theanswer=myreplace(theanswer,",,",",");
                if(theanswer==item.right_answer){
                    thescore=item.score;
                }
            }
            var theitem={};
            theitem.question_id=item.question_id;
            theitem.answer=theanswer;
            theitem.score=thescore;
            theitem.usercontent=usercontent;
            dataInfo.splice(i,1,theitem);

        }


    }





    $scope.clickQuestion = function(evt,item,usercontentid){
        var o;
        var oE;

        if(evt==null)
        {
            o=$("#Q_"+usercontentid);
            oE=document.getElementById("Q_"+usercontentid);//为了从jQuery获取tagName
        }
        else
        {
        o=$(evt.target);
        oE=o[0];//为了从jQuery获取tagName
        }



        var usercontentobj;
        var usercontent="";
        if(document.getElementById("usercontent_"+usercontentid))
        {
            usercontent=document.getElementById("usercontent_"+usercontentid).value;
        }



        //o.addClass("on").siblings('li').removeClass("on");

        if(oE.tagName.toLowerCase()=='li'||oE.tagName.toLowerCase()=='div') {
            o.find("input[type=checkbox]").click();
        }

        if(oE.tagName.toLowerCase()=='span') {
            o=$(oE.parentElement.parentElement.parentElement);
            o.find("input[type=checkbox]").click();
        }


        if(oE.tagName.toLowerCase()=='lable') {
            o=$(oE.parentElement.parentElement);
            o.find("input[type=checkbox]").click();
        }
        if(oE.tagName.toLowerCase()=='input') {
            o=$(oE.parentElement.parentElement);
            o.find("input[type=checkbox]").click();
        }






        o.find("input[type=radio]").prop("checked",true).parent().siblings().find("input[type=radio]").prop("checked",false);
        //o.parent(".dxt_box").parent(".kcks_title_ts").attr("date-title",1);
        //o.parent(".dxt_box").parent(".last").attr("date-title",0);




        var flag=0;

        for( var i = 0; i < dataInfo.length; i++ ) {

            if( dataInfo[i].question_id === item.question_id) {
                flag=1;
                $scope.getresult(evt,"edit",item,usercontent,usercontentid,i);
                break;

            }

        }



        if(flag==0){
            $scope.getresult(evt,"new",item,usercontent,usercontentid);
        }



        $scope.dataInfo= JSON.stringify(dataInfo);
        console.info('$scope.dataInfo', $scope.dataInfo);


    }



    $scope.Q_index=0;



    //console.info('$scope.dataInfo'+$scope.dataInfo);
    $scope.getdata = function () {


        if($scope.record_id=="")  //新做问卷，获取题目
        {

            maskLayer(1);
            var options = {
                url:myforwardurl(serviceRoot2+'invite/requestNaire?actiontype=getdataDc&dc_id='+$scope.dc_id,serviceRoot2),
                async: false,
                type: 'get',
                dataType: 'json',
                data: null,
                resetForm: true,
                timeout: 60000,
                // jsonp: 'callback',
                success: function (rv) {
                    console.info('rv',rv);
                    var isok = false;
                    var msg = "";
                    if (rv.result == "1") {
                        $scope.data = rv.data

                        $scope.length=rv.data.length;

                        $.each(rv.data,function(key,item){
                            $scope.dc_id=item.dc_id;
                            $scope.dc_name=item.dc_name;
                            $scope.notice=item.notice;
                            $scope.remark=item.remark;
                            $scope.logo=item.logo;
                            $scope.theme=item.theme;
                            $scope.isuserdef=item.isuserdef;
                        });


                        maskLayer(0);

                    } else {
                        msg = rv.result_text;

                        alert(msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            };
            $.ajax(options);


        }
        else//查看某一个人问卷记录详情
        {
            maskLayer(1);
            var options = {
                url:myforwardurl(serviceRoot2+'invite/requestNaire?actiontype=getDcRecordDetailById&record_id='+$scope.record_id,serviceRoot2),
                async: false,
                type: 'get',
                dataType: 'json',
                data: null,
                resetForm: true,
                timeout: 60000,
                // jsonp: 'callback',
                success: function (rv) {
                    var isok = false;
                    var msg = "";
                    if (rv.result == "1") {
                        $scope.data = rv.data
                        $scope.length=rv.data.length;
                        console.info('sssffffsss',rv.data);
                        $scope.dc_id=rv.dc_id;
                        $scope.dc_name=rv.dc_name;
                        $scope.name=rv.name;
                        $scope.company=rv.company;
                        $scope.tel=rv.tel;
                        $scope.logo=rv.logo;
                        $scope.theme=rv.theme;

                        /*
                         $.each(rv.data,function(key,item){
                         $scope.dc_id=item.dc_id;
                         $scope.dc_name=item.dc_name;
                         $scope.notice=item.notice;
                         $scope.remark=item.remark;
                         });
                         */

                        maskLayer(0);

                    } else {
                        msg = rv.result_text;

                        alert(msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            };
            $.ajax(options);

        }



        setTimeout(function () {
            setbg($scope.theme); }, 500);




    }

    $scope.getdata();






    function addDc() {

        myalert("处理中。。。");

        maskLayer(1);
        /* 提交表单 */
        var options = {

            url: myforwardurl(serviceRoot2 + 'invite/requestNaire?actiontype=addDc_record&dc_id='+ $scope.dc_id, serviceRoot2),
            async: false,
            type: 'get',
            dataType: 'json',
            data: $("#f1").serializeArray(),
            resetForm:true,
            timeout:60000,
            // jsonp:'callback',
            success: function (rv) {
                var isok = false;
                var msg = "";
                console.info('rv',rv);
                po_id=rv.po_id;
                gift_po_show_url=rv.gift_po_show_url;
                if(rv.result=="1") {
                    isok=true;
                    msg=rv.result_text;
                }else{
                    $.each(rv.data,function(key,item){
                        if(item.result=="0"){
                            msg=item.result_text;
                        }
                    });
                }

                myalert(msg);
                alert(msg);
                maskLayer(0);

                if(isok) {
                    maskLayer(1);
                    window.location.href=gift_po_show_url+"?po_id="+po_id;

                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        };
        $.ajax(options);
        return false;

    }


    function validatemobile(mobile)
    {
        if(mobile.length==0)
        {
            alert('请输入手机号码，^_^');
            $("#tel").focus();
            return false;
        }
        if(mobile.length!=11)
        {
            alert('请输入有效的手机号码，→_→');
            $("#tel").focus();
            return false;
        }

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
        if(!myreg.test(mobile))
        {
            alert('请输入有效的手机号码，→_→');
            $("#tel").focus();
            return false;
        }
        else{
            return true;
        }
    }



    $scope.submit = function(){

        var theanswer=(dataInfo[$scope.Q_index]==undefined)?"":dataInfo[$scope.Q_index].answer;

        if($scope.Q_index==$scope.length)//最后联系方式
        {

            if(validatemobile($("#tel").val())) {
                addDc();
            }
        }
        else
        {
            if(theanswer!="" && theanswer!="," && theanswer!=",,")
            {
                $scope.Q_index=$scope.Q_index+1;
            }
            else
            {
                alert("为了我们共同进步，帮帮忙啦！");
            }

        }

    }















































    showmenu(false);





}]);





