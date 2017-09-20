'use strict';

var templocation="";
var templocation_pos="";

function After_ClickOnMap(pt,pos,addr)
{
$("#templocation").html(addr);
}

app.controller('room_searchCtrl', ["$window","$scope","$filter","$location","$rootScope",'$localStorage','$state','ngTableParams','$stateParams', '$compile','$modal',function ($window,$scope,$filter,$location,$rootScope,$localStorage,$state,ngTableParams,$stateParams,$compile,$modal) {

/*$state.go('app.wx.me.shopgoods_by_producttype',{shop_id:'S-kf',product_type:'客房'});*/

$scope.day=1;
$rootScope.currTitle="商品";

$scope.shop_id=$stateParams.shop_id;
$scope.producttype=$stateParams.product_type;
$scope.minDate=new Date();

$scope.roomlist = [
	{name:'全部/房间'},
    {name:'标准间'},
    {name:'花园大床房'},
    {name:'花园错层房'},
    {name:'豪华套房'},
    {name:'花园套房'}
];
$scope.room_type='全部/房间';//id的值，区分类型
//$scope.room_type=$scope.roomlist[0].name;//如果想要第一个值

$scope.date_init = function(){
	/*$rootScope.startDate=$scope.startDate;
	$rootScope.endDate=$scope.endDate;*/
	var startDate = $filter('date')($scope.startDate,'yyyy-MM-dd');
	var endDate = $filter('date')($scope.endDate,'yyyy-MM-dd');
	$state.go('app.wx.me.shopgoods_by_producttype',{shop_id:'S-kf',product_type:'客房',startDate:startDate,endDate:endDate,product_no:$scope.product_no});
}

if($scope.shop_id==null||$scope.shop_id==undefined)
{
	if($rootScope.arg0.indexOf("shop_id=")==0){$scope.shop_id=$rootScope.arg0.substring(8);}
	if($rootScope.arg1.indexOf("producttype=")==0){$scope.producttype=$rootScope.arg1.substring(12);$rootScope.currTitle=$scope.producttype;}

}


var cartnum=0;
var slidesimg="";
$scope.open = function (dateType,size) {
    var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
            items: function () {
                return dateType;
            }
        }
    });

    modalInstance.result.then(function (date) {
    	if(dateType == "start"){
    		$scope.startDate = date;
    		$scope.getday();;
    		day();
    	}else{
    		$scope.endDate = date;
    		day();
    	}

    }, function () {
        console.log('----' + new Date());
    });
};

//这个可以获取轮播图
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
			if(rv.result=="1"){
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
			}else{
				msg=rv.result_text;
			}

			if(isok){
				$("#producttypedesc").html($scope.more_desc);
				if($scope.more_desc!=""){$scope.Showproducttypedesc="yes";}

					// 轮播图数据初始化
			        $scope.slides = [];
			        // 添加轮播图源
					var slidesimgs=$scope.slidesimg.split(";");

					for(var im=0;im<slidesimgs.length;im++){
						if(slidesimgs[im]!=""){
						  $scope.slides.push({ image: slidesimgs[im], text: '' });
						  $scope.Showslidesimg="yes";
						}
					}
				}else{
					alert(msg);
				}
	    },
		error: function(XMLHttpRequest, textStatus, errorThrown) { }
	};
    $.ajax(options);
}
$scope.getproducttype();


$scope.chgsearchcenter=function(id){

	$.openPopupLayer({
		name: "myStaticPopup",
		width: page_w,
		height: page_h-30,
		target: id,
		container:""
	});

//$("#mapcontainer").css("width",(page_w-15)+"px");
$("#mapcontainer").css("height",(page_h-120)+"px");


}


 //显示当前时间
        $scope.today = function () {
        $scope.startDate = new Date();

    };

    $scope.getday = function(){

    var  intValue  =  0;
    var  endDate  =  null;
    intValue  =  $scope.startDate.getTime();
    intValue  +=  1  *  (24  *  3600  *  1000);

    endDate  =  new  Date  (intValue);
        if(endDate.getMonth()<10){
            if(endDate.getDate()<10){
                $scope.endDate = endDate.getFullYear()+"-"+ "0"+(endDate.getMonth()+1)+"-" + "0"+endDate.getDate();

            }else{
                $scope.endDate = endDate.getFullYear()+"-"+"0"+(endDate.getMonth()+1)+"-"+ endDate.getDate();

            }

        }else{
            if(endDate.getDate()<10){
                $scope.endDate = endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-" + "0"+endDate.getDate();

            }else{
                $scope.endDate = endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+ endDate.getDate();

            }

        }
}
function day(){
	$scope.day=1;
	var days = $scope.endDate.getTime()-$scope.startDate.getTime();
    $scope.day = parseInt(days / (1000 * 60 * 60 * 24))+1;
}
          $scope.today();
         $scope.getday();

$scope.close=function(){
	$.closePopupLayer("myStaticPopup");
}

$scope.ok = function (arg) {

if(arg==1)
{
setTimeout(function() {
		$scope.$apply(function() {
		$scope.localaddress=templocation;
		$scope.close();
		});
		},50);
}
else if(arg==2)
{
	$scope.close();
	$scope.listdata(0,thesubtype);
}


    };

    $scope.cancel = function () {
        $scope.close();
    };


$scope.localaddress=cur_addr;

$scope.getlocaladdress=function(){

	getlocaladdress();

	$scope.localaddress=cur_addr;
}

//加载百度地图api
/*try{
	setTimeout(function() {
		is_load_baidumap=false;
		if(!is_load_baidumap){
			loadbaiduapi();
		}
	},100);
  }catch(e){}*/







}]);







app.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "items", function ($scope, $modalInstance, items) {
	$scope.today = function() {
    	$scope.dt = new Date();
	};





	/*
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 2);
	$scope.events =[
	    {
	        date: tomorrow,
	        status: 'full'
	    },
	    {
	        date: afterTomorrow,
	        status: 'partially'
	    }
	];

	$scope.getDayClass = function(date, mode) {
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	      for (var i=0;i<$scope.events.length;i++){
	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	        if (dayToCheck === currentDay) {
	          return $scope.events[i].status;
	        }
	      }
	    }

	    return '';
	};
	*/

	 $scope.getday = function(){
       $scope.dt = $("#startDate").text();
      }
    $scope.getday();

	if(items =="start"){
		$scope.today();
		$scope.dateType="入住";
		$scope.minDate = $scope.minDate ? null : new Date();
	}else{

		$scope.getday();
		$scope.dateType="离开";
		$scope.minDate =  $scope.minDate ? null :$("#startDate").text();
	}

    $scope.ok = function () {
        $modalInstance.close($scope.dt);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);



