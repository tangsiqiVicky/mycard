'use strict';







app.controller('room_listCtrl', ["$window","$scope","$location","$rootScope",'$localStorage','$state','ngTableParams','$stateParams', '$compile',function ($window,$scope,$location,$rootScope,$localStorage,$state,ngTableParams,$stateParams,$compile) {



$rootScope.currTitle="商品";

$scope.shop_id=$stateParams.shop_id;
$scope.producttype=$stateParams.product_type;//request.QueryString("subtype");



if($scope.shop_id==null||$scope.shop_id==undefined)
{
	if($rootScope.arg0.indexOf("shop_id=")==0){$scope.shop_id=$rootScope.arg0.substring(8);}
	if($rootScope.arg1.indexOf("producttype=")==0){$scope.producttype=$rootScope.arg1.substring(12);$rootScope.currTitle=$scope.producttype;}
	
}


var cartnum=0;
var slidesimg="";







$scope.getproducttype=function(){

var options = {
                
				//url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getproducttypedetail&shop_id='+$scope.shop_id+'&producttype='+$scope.producttype+'&user_id='+user_id,serviceRoot),
		url: myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getproducttypedetail&shop_id=' + $scope.shop_id + '&producttype=' + $scope.producttype + '&user_id=' + user_id, serviceRoot2),
				async: false,
                type: 'get',
                dataType: 'json',
                data: null,
				resetForm:true,
				timeout:60000,
				//jsonp:'callback',
                success: function (rv) {
					
					var isok=false;
					var msg="";
					




						if(rv.result=="1")
						{
						   isok=true;

							$.each(rv.data,function(idx,item){
									$scope.id = item.id;
									$scope.key = item.key;
									$scope.shop_id=item.shop_id;
									$scope.products_type=item.products_type;
									$scope.slidesimg=item.slidesimg;
									$scope.more_desc=item.more_desc;
									$scope.moreimg=item.moreimg;
												
							})
						}
						else
						{
						msg=rv.result_text;
						}





						if(isok){

							$("#producttypedesc").html($scope.more_desc);
							if($scope.more_desc!=""){$scope.Showproducttypedesc="yes";}

										// 轮播图数据初始化
									         $scope.slides = [];
									         // 添加轮播图源
											 var slidesimgs=$scope.slidesimg.split(";");
											
											 for(var im=0;im<slidesimgs.length;im++)
											{
													if(slidesimgs[im]!="")
												{
												  $scope.slides.push({ image: slidesimgs[im], text: '' });
												  $scope.Showslidesimg="yes";
												}
									         //$scope.slides.push({ image: 'assets/images/slider/home-slide1.jpg', text: '三方共赢' });
									         //$scope.slides.push({ image: 'assets/images/slider/home-slide2.jpg', text: '一站式解决联盟商家、会员的积分盈利体系' });
											}

								


						}else{alert(msg);}

					
				
					
                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
                       
                     }
            };
            $.ajax(options);
}




	



$scope.slidesimggroup=[];
$scope.tableParams = new ngTableParams({
										page: 1, // show first page
										count: 10 // count per page
									}, {
										total: $scope.slidesimggroup.length, // length of data
										counts: [],
getData: function ($defer, params) {
											$defer.resolve($scope.slidesimggroup.slice((params.page() - 1) * params.count(), params.page() * params.count()));
										}
									});



	
$scope.getgoods_by_producttype=function(){

var options = {
                
				//url:myforwardurl(serviceRoot+'mk_main_info?actiontype=getproducts&shop_id='+$scope.shop_id+'&products_type='+$scope.producttype+'&user_id='+user_id,serviceRoot),
		url: myforwardurl(serviceRoot2 + 'shops/getShopDetail?actiontype=getproducts&shop_id=' + $scope.shop_id + '&products_type=' + $scope.producttype + '&user_id=' + user_id, serviceRoot2),
				async: false,
                type: 'get',
                dataType: 'json',
                data: null,
				resetForm:true,
				timeout:60000,
				//jsonp:'callback',
                success: function (rv) {
					
					var isok=false;
					var msg="";
					




						if(rv.result=="1")
						{
						   isok=true;

						   $scope.slidesimggroup=[];

							$.each(rv.data,function(idx,item){
												$scope.id = item.id;
												$scope.key = item.key;
												$scope.goods_id=item.goods_id;
												$scope.shop_id=item.shop_id;
												$scope.shop_name=item.shop_name;
												$scope.name=item.name;
												$scope.products_type=item.products_type;
												$scope.desc=item.desc;
												$scope.price=item.price;
												$scope.member_price=item.member_price;
												$scope.photo=item.photo;
												$scope.return_points=item.return_points;
												$scope.visible=item.visible;
												$scope.priority=item.priority;
												$scope.slidesimg2=item.slidesimg;
												$scope.more_desc2=item.more_desc;
												$scope.moreimg2=item.moreimg;

												


												
												if(item.photo!="")
												{
												var theimg={}
												theimg.key=item.id;
												//theimg.slidesimg=item.slidesimg;
												theimg.goods_id=item.goods_id;
												theimg.name=item.name;
												theimg.desc=item.desc;
												theimg.price=item.price;
												theimg.photo=item.photo;


												$scope.slidesimggroup.push(theimg);
												
												}


												
							})



									$scope.tableParams.reload();


						}
						else
						{
						msg=rv.result_text;
						}




						if(isok){


						}else{alert(msg);}

					
				
					
                },
				error: function(XMLHttpRequest, textStatus, errorThrown) {
                       
                     }
            };
            $.ajax(options);
}





$scope.getproducttype();
$scope.getgoods_by_producttype();

		





$scope.addcaract=function(){

	alert("22")			

}



	
	



    





$scope.back=function()
{
$window.history.back();
}







setTimeout(function() { $rootScope.logit(user_id,'url',window.location.href.substring(window.location.href.indexOf("index.html#")+11),$rootScope.currTitle);},2000);


setTimeout(function() { $rootScope.logit(user_id,'shop',$scope.shop_id,$rootScope.currTitle);},2000);












































}]);






