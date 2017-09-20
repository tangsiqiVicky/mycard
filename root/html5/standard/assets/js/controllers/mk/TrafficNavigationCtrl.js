'use strict';

app.controller('TrafficNavigationCtrl', ["$window","$scope","$location","$rootScope", function ($window,$scope,$location,$rootScope) {

	//加载百度地图api
	try{		
		is_load_baidumap=false;  
		if(!is_load_baidumap){
			loadbaiduapi();
			OnresizeEvent();
			setTimeout(function() {	
				var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
				driving.search("人民广场", "崇明区庙镇南星村庆华中路304号");
			},500);
		}	
	}catch(e){}	


	function OnresizeEvent(){
		showmenu(false);
		$("#mapcontainer").css("height",page_h+"px");
	}

}]);


