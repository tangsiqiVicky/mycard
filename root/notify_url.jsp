﻿<%
/* *
 功能：支付宝服务器异步通知页面
 版本：3.3
 日期：2012-08-17
 说明：
 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。

 //***********页面功能说明***********
 创建该页面文件时，请留心该页面文件中无任何HTML代码及空格。
 该页面不能在本机电脑测试，请到服务器上做测试。请确保外部可以访问该页面。
 该页面调试工具请使用写文本函数logResult，该函数在com.alipay.util文件夹的AlipayNotify.java类文件中
 如果没有收到该页面返回的 success 信息，支付宝会在24小时内按一定的时间策略重发通知
 //********************************
 * */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@page import="java.io.*" %>
<%@page import="java.net.*" %>
<%@ page import="com.alipay.util.*"%>
<%@ page import="com.alipay.config.*"%>
<%@ include file="db.jsp"%>

<%
System.out.println("============================================");
%>

<%DBWork.initConn();%>
<%
	//获取支付宝POST过来反馈信息
	Map<String,String> params = new HashMap<String,String>();
	Map requestParams = request.getParameterMap();
	for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
		String name = (String) iter.next();
		String[] values = (String[]) requestParams.get(name);
		String valueStr = "";
		for (int i = 0; i < values.length; i++) {
			valueStr = (i == values.length - 1) ? valueStr + values[i]
					: valueStr + values[i] + ",";
		}
		//乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
		//valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
		//System.out.println("notify_url.jsp  name   "+name+"  valueStr   "+valueStr);
		params.put(name, valueStr);
	}
	
	//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
	//商户订单号

	String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");

	String extra_common_param = new String(request.getParameter("extra_common_param").getBytes("ISO-8859-1"),"UTF-8");
	//System.out.println("extra_common_param:"+extra_common_param);

	String userId = extra_common_param.split("~~X")[0];//new String(request.getParameter("userId").getBytes("ISO-8859-1"),"UTF-8");
	String total_fee = new String(request.getParameter("total_fee").getBytes("ISO-8859-1"),"UTF-8");

	//支付宝交易号

	String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");

	//交易状态
	String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),"UTF-8");
	System.out.println(" 当前支付宝     notify_url.jsp  out_trade_no   "+out_trade_no+"  total_fee  "+total_fee+"  trade_no  "+trade_no+"  trade_status  "+trade_status);
	//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//
	//String userId = new String(request.getParameter("userId").getBytes("ISO-8859-1"),"UTF-8");
	System.out.println("notify_url.jsp  userId   "+userId);
	if(AlipayNotify.verify(params)){//验证成功
		//////////////////////////////////////////////////////////////////////////////////////////
		//请在这里加上商户的业务逻辑程序代码

		//——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
		
		if(trade_status.equals("TRADE_FINISHED")){
			//判断该笔订单是否在商户网站中已经做过处理
				//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
				//请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
				//如果有做过处理，不执行商户的业务程序
				
			//注意：
			//退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
		} else if (trade_status.equals("TRADE_SUCCESS")){
			//判断该笔订单是否在商户网站中已经做过处理
				//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
				//请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
				//如果有做过处理，不执行商户的业务程序
				//DBWork.executeUpdate("update PO set Status='已支付' where PO_ID='"+out_trade_no+"'");

				String url = "";
				Map<String, String> parameters = new HashMap<String, String>();
				for (int i = 0; i < 2; i++) {

					BufferedReader in = null;// 读取响应输入流
					StringBuffer sb = new StringBuffer();// 存储参数
					String paramss2 = "";// 编码之后的参数
					String result = "";
					if (i == 0) {
						url = "http://101.69.174.62:8080/snsoft/shops/shoppingCart";
						parameters.put("actiontype", "confirm_po");
						parameters.put("po_id", out_trade_no);
						parameters.put("status", "已支付");
						parameters.put("user_id", userId);
					}
					if (i == 1) {
						url = "http://101.69.174.62:8080/snsoft/payCode/getpayCodeList";
						parameters.put("actiontype", "paymentpay");
						parameters.put("po_id", out_trade_no);
						parameters.put("pay_type", "cash");
						parameters.put("price", total_fee);
						parameters.put("user_id", userId);
					}
					System.out.println("  i  " + i + " pathUrl1  " + url + "  parameters  " + parameters);
					try {
						// 编码请求参数
						if (parameters.size() == 1) {
							for (String name : parameters.keySet()) {
								sb.append(name).append("=").append(java.net.URLEncoder.encode(parameters.get(name), "UTF-8"));
							}
							paramss2 = sb.toString();
						} else {
							for (String name : parameters.keySet()) {
								sb.append(name).append("=").append(java.net.URLEncoder.encode(parameters.get(name), "UTF-8"))
										.append("&");
							}
							String temp_params = sb.toString();
							paramss2 = temp_params.substring(0, temp_params.length() - 1);
						}
						String full_url = url + "?" + paramss2;
						// System.out.println(full_url);
						// 创建URL对象
						java.net.URL connURL = new java.net.URL(full_url);
						// 打开URL连接
						java.net.HttpURLConnection httpConn = (java.net.HttpURLConnection) connURL.openConnection();
						// 设置通用属性
						httpConn.setRequestProperty("Accept", "*/*");
						httpConn.setRequestProperty("Connection", "Keep-Alive");
						httpConn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)");
						// 建立实际的连接
						httpConn.connect();
						// 响应头部获取
						Map<String, List<String>> headers = httpConn.getHeaderFields();
						// 遍历所有的响应头字段
						for (String key : headers.keySet()) {
							// System.out.println(key + "\t：\t" + headers.get(key));
						}
						// 定义BufferedReader输入流来读取URL的响应,并设置编码方式
						in = new BufferedReader(new InputStreamReader(httpConn.getInputStream(), "UTF-8"));
						String line;
						// 读取返回的内容
						while ((line = in.readLine()) != null) {
							result += line;
						}
					} catch (Exception e) {
						e.printStackTrace();
					} finally {
						try {
							if (in != null) {
								in.close();
							}
						} catch (IOException ex) {
							ex.printStackTrace();
						}
					}
				}
				
				



				//if(out_trade_no.indexOf("OL-")>=0)
				//{
				//DBWork.executeUpdate("P_MK_PAYMENT '"+out_trade_no.split("-")[1].replaceAll("SPLIT","-")+"','"+out_trade_no.split("-")[2]+"','"+out_trade_no.split("-")[1].replaceAll("SPLIT","-")+"',"+total_fee+",'cash'");
				//System.out.println("P_MK_PAYMENT '"+out_trade_no.split("-")[1].replaceAll("SPLIT","-")+"','"+out_trade_no.split("-")[2]+"','"+out_trade_no.split("-")[1].replaceAll("SPLIT","-")+"',"+total_fee+",'cash'");
				//}
			//注意：
			//付款完成后，支付宝系统发送该交易状态通知
		}

		//——请根据您的业务逻辑来编写程序（以上代码仅作参考）——
			
		out.print("success");	//请不要修改或删除

		//////////////////////////////////////////////////////////////////////////////////////////
	}else{//验证失败
		out.print("fail");
	}
%>
<%
//DBWork.wait(1000);
DBWork.end();
//out.println(request.getServletPath());
%>