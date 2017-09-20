<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="0" />

		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="description" content="{{app.description}}">
		<meta name="keywords" content="app, responsive, angular, bootstrap, dashboard, admin">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="HandheldFriendly" content="true" />
		<meta name="apple-touch-fullscreen" content="yes" />

	<style>
body{margin:0px;}
	</style>
	</head>
<script src="html5/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="html5/standard/assets/js/snips.js"></script>



	<script language="javascript">
var orderNo="<%=request.getParameter("orderNo")%>";
var money="<%=request.getParameter("money")%>";
var userId="<%=request.getParameter("userId")%>";


$(document).ready(function (ev) {

var theurl=serviceRoot+"alipay.jsp?orderNo="+orderNo+"&money="+money+"&userId="+userId;

$("#payfrm").css("height",page_h);
$("#payfrm").attr("src",theurl);
//setTimeout(loadbaiduapi(),3000);

});


</script>
<iframe id="payfrm" name="payfrm" style="width:100%;height:100%;border:0px;" frameborder=0 src=""></iframe>


</html>
