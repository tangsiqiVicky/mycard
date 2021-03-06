<%
	/* *
	 *功能：支付宝手机网站支付接口调试入口页面
	 *版本：3.3
	 *日期：2012-08-17
	 *说明：
	 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
	 */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<title>支付宝支付</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<link rel="stylesheet" href="html5/standard/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" type="text/css" />
<link rel="stylesheet" href="html5/bower_components/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="html5/bower_components/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="html5/standard/assets/css/styles.css">
<link rel="stylesheet" href="html5/standard/assets/css/plugins.css">


</head>
<body>


  <div class="row">
  <div class="main-login col-xs-12" style="margin-top:0px;">
<div class="box-register text-center">


        <form id="alipayment" name=alipayment action=alipayapi.jsp method=post target="_blank">
            <div id="body" style="clear:left">
<br><br><br>
<h1>订单支付</h1>
<hr class="one_line">
<br><br><br>

<div class="form-group">
					<h2>商户订单号<br><strong><%=request.getParameter("orderNo")%></strong></h2>
					
						<input name="WIDout_trade_no" id="WIDout_trade_no" value="<%=request.getParameter("orderNo")%>" style="display:none;"/>
					
</div>

                    			

<div class="form-group" style="display:none;">
					<h2>订单名称</h2>
					
						<input name="WIDsubject" id="WIDsubject" value="用户<%=request.getParameter("userId")%>付款"/>
					
</div>

                    			

<div class="form-group">
					<h2>付款金额<br><strong><%=request.getParameter("money")%></strong></h2>
					
						<input name="WIDtotal_fee" id="WIDtotal_fee" value="<%=request.getParameter("money")%>" style="display:none;"/>
					
</div>

                    		

<div class="form-group" style="display:none;">
					<h2>商品展示网址</h2>
					
						<input name="WIDshow_url" id="WIDshow_url"/>
					
</div>

                    		
<div class="form-group" style="display:none;">
					<h2>商品描述</h2>
					
						<input name="WIDbody" id="WIDbody" value="用户<%=request.getParameter("userId")%>付款"/>
						<input name="WIDuserId" id="WIDuserId" value="<%=request.getParameter("userId")%>"/>
					
</div>

                    		
<br><br><br>
                    <h2></h2>

							 <div class="col-lg-6 col-md-12">
							  <div class="form-group">
                                  <div class="col-sm-block">
                                  
                                  
									<button class="btn btn-azure btn-block" type="submit" style="text-align:center;"><h1 style="color:#fff;">确 认</h1></button>
								
                                    
                                  </div>
                              </div>
							  </div>

                    
               
            </div>
		</form>
       


<br><br><br><br>

<div class="copyright">
						&copy; <span class="current-year"></span><span class="text-bold text-uppercase"> SNIPS</span>. <span>All rights reserved</span>
					</div>


</div>


</div>
</div>





</body>
</html>