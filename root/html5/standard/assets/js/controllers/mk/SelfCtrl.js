'use strict';

app.controller('selfCtrl', ["$window","$scope","$location","$rootScope",'$localStorage','$state', function ($window,$scope,$location,$rootScope,$localStorage,$state) {


$scope.user_id=user_id;

$rootScope.currTitle="个人中心";

var points="0";
var cards="0";


var inviter_id="";






var slidesimg="";
$scope.getslidepic=function(){

var options = {
				//url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getmkslidepic&User='+user_id+'&mod_type=个人',serviceRoot),
				url:myforwardurl(serviceRoot2+'user/Slideimg?actiontype=getmkslidepic&mod_type=个人&user_id='+user_id,serviceRoot2),
				async: false,
                type: 'get',
                dataType: 'json',
                data: null,
				resetForm:true,
				timeout:60000,
				// jsonp:'callback',
                success: function (rv) {
					var isok=false;
					var msg="";

						if(rv.result=="1")
						{
					   isok=true;

								$.each(rv.data,function(idx,item){


									slidesimg=item.slidesimg;



								})
						}
						else
						{
						msg=rv.result_text;
						}

						if(slidesimg==""){slidesimg="assets/images/bg-006.jpg";}

						if(isok){//alert("获取数据成功")
							//alert(msg)
							setTimeout(function() {
								$scope.$apply(function() {

									$scope.slidesimg=slidesimg;

 // 轮播图数据初始化
         $scope.slides = [];
         // 添加轮播图源
		 var slidesimgs=slidesimg.split(";");
		 for(var im=0;im<slidesimgs.length;im++)
		{
				if(slidesimgs[im]!="")
			{
			  $scope.slides.push({ image: slidesimgs[im], text: '' });
			}
         //$scope.slides.push({ image: 'assets/images/slider/home-slide1.jpg', text: '三方共赢' });
         //$scope.slides.push({ image: 'assets/images/slider/home-slide2.jpg', text: '一站式解决联盟商家、会员的积分盈利体系' });
		}



							//用于判断轮播图是否已经加载，如果已经加载就不需要重新调接口
                             $rootScope.self_imgloaded=true;
                             $rootScope.self_slides=$scope.slides;

								});
							},500);

						}else{alert(msg)}



                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {


                     }
            };
            $.ajax(options);
			return false;
}






 if($rootScope.self_imgloaded)//用于判断轮播图是否已经加载，如果已经加载就不需要重新调接口
    {
        $scope.slides=$rootScope.self_slides;
    }
    else
    {
         $scope.getslidepic();
    }









var options = {
				//url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getpoints_cards&user_id='+user_id,serviceRoot),
				url:myforwardurl(serviceRoot2+'self/firstSelf?actiontype=getpoints_card&user_id='+user_id,serviceRoot2),
				async: false,
                type: 'get',
                dataType: 'json',
                data: $("#f1").serializeArray(),
				resetForm:true,
				timeout:60000,
				// jsonp:'callback',
                success: function (rv) {
					var isok=false;
					var msg="";

					$.each(rv.data,function(idx,item){

					   if(item.result=="1")
						{
					   isok=true;
						msg=item.result_text;
						points=item.points;
						cards=item.cards;
						}
						else
						{
						msg=item.result_text;
						}
					})

						if(isok){//alert("获取数据成功")
							//alert(msg)
							setTimeout(function() {
							$scope.$apply(function() {

								$("#amount").val(cards);
								$("#jf").val(points);

								$scope.amount=cards
								$scope.jf=points

							});
							},500);


						}else{}


                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {


                     }
            };
            $.ajax(options);







var options = {
				//url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getusrinfo&user_id='+user_id,serviceRoot),
    			url:myforwardurl(serviceRoot2+'self/firstSelf?actiontype=getuserinfo&user_id='+user_id,serviceRoot2),
				async: false,
                type: 'get',
                dataType: 'json',
                data: $("#f1").serializeArray(),
				resetForm:true,
				timeout:60000,
				// jsonp:'callback',
                success: function (rv) {

					var isok=false;
					var msg="";

					$.each(rv.data,function(idx,item){


					   if(item.result=="1")
						{
					   isok=true;
						msg=item.result_text;
						nickname=item.nickname;
						phone=item.phone;
						logo=item.logo;
						picture=item.picture;
						inviter_id=item.inviter_id;

						sex=item.sex;
						city=item.city;
						province=item.province;
						country=item.country;
						headimgurl=item.headimgurl;

						if(picture=="" || picture==null){picture=headimgurl;}

						}
						else
						{
						msg=item.result_text;
						}
					})

						if(isok){//alert("获取数据成功")
							//alert(msg)
							//alert(nickname)


							setTimeout(function() {
							$scope.$apply(function() {

								$scope.nickname=nickname;
								$scope.picture=picture;
								$scope.inviter_id=inviter_id;
								$scope.sex=sex;
								$scope.city=city;
								$scope.province=province;
								$scope.country=country;
								$scope.headimgurl=headimgurl;
								$scope.logo=logo;
								$scope.phone=phone;


								$("#selfimg").attr("src",picture);

							});
							},500);

						}else{}


                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {


                     }
            };
            $.ajax(options);











$scope.editit=function()
{
$location.url("/app/wx/me/self_new?user_id="+user_id+"&opertype=edit");
}









/*

if($rootScope.openid=="")
{$scope.showbindbtn=true;}
else
{$scope.showbindbtn=false;}
*/

var validno="";
var the_id_qrcode="";


$scope.getidqrcode=function(){

var options = {
				//url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getidcode&user_id='+user_id,serviceRoot),
				url:myforwardurl(serviceRoot2+'self/firstSelf?actiontype=getidcode&user_id='+user_id,serviceRoot2),
				async: false,
                type: 'get',
                dataType: 'json',
                data: $("#f1").serializeArray(),
				resetForm:true,
				timeout:60000,
				// jsonp:'callback',
                success: function (rv) {

					var isok=false;
					var msg="";


					$.each(rv.data,function(idx,item){
					   if(item.result=="1")
						{
					   isok=true;
						msg=item.result_text;

						validno=item.validno;
						}
						else
						{
						msg=item.result_text;
						}
					})


						if(isok){//alert("获取数据成功")
							//alert(msg)

							the_id_qrcode="ID:"+user_id+"~~X"+validno;

							$scope.id_qrcode=the_id_qrcode;



						}else{alert(msg)}



                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {


                     }
            };
            $.ajax(options);
			return false;
}



$scope.getidqrcode();






$scope.showmyqrcode=function(id){


					$.openPopupLayer({
						name: "myStaticPopup",
						width: page_w*0.8,
						target: id,
						container:""
					});

}







$scope.back=function()
{
$window.history.back();
}



setTimeout(function() { $rootScope.logit(user_id,'url',window.location.href.substring(window.location.href.indexOf("index.html#")+11),$rootScope.currTitle);},2000);



}]);

