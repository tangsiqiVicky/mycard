    <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
        <%@page import="java.sql.*" %>
         <%@page import="java.io.*" %>
          <%@page import="java.net.*" %>
           <%@page import="java.util.*" %>
        <%@page import="database.surenet_function"%>
      <%--   <%@ include file="db.jsp"%>  --%>
            <%/* DBWork.initConn(); */surenet_function s_func=surenet_function.getInstance();%>
           <%--  <%
/* String out_trade_no=s_func.GBK(request.getParameter("out_trade_no"));
//String userId=s_func.GBK(request.getParameter("userId"));
		System.out.println(" 当前        wx_notify_url.jsp  out_trade_no   "+out_trade_no);
String total_fee=s_func.GBK(request.getParameter("total_fee"));
String userId=s_func.GBK(request.getParameter("userId"));
		System.out.println("wx_notify_url.jsp  total_fee   "+total_fee);
//DBWork.executeUpdate("update PO set Status='已支付' where PO_ID='"+out_trade_no+"'");
//DBWork.query(" update PO set status='已支付' where po_id='"+out_trade_no+"'")
System.out.println("update PO set Status='已支付' where PO_ID='"+out_trade_no+"'");

if(out_trade_no.indexOf("OL-")>=0){
				//DBWork.executeUpdate("P_MK_PAYMENT '"+out_trade_no.split("-")[1].replaceAll("SPLIT","-")+"','"+out_trade_no.split("-")[2]+"','"+out_trade_no.split("-")[1].replaceAll("SPLIT","-")+"',"+total_fee+",'cash'");
				System.out.println("P_MK_PAYMENT '"+out_trade_no.split("-")[1].replaceAll("SPLIT","-")+"','"+out_trade_no.split("-")[2]+"','"+out_trade_no.split("-")[1].replaceAll("SPLIT","-")+"',"+total_fee+",'cash'");
	}else{
		
	}  */
%> --%>
         <%--    <%
//DBWork.wait(1000);
/* DBWork.end(); */
//out.println(request.getServletPath());
%> --%>


  <%
  
 		String out_trade_no=s_func.GBK(request.getParameter("out_trade_no"));
		//String userId=s_func.GBK(request.getParameter("userId"));
		System.out.println(" 当前        wx_notify_url.jsp  out_trade_no   "+out_trade_no);
		String total_fee=s_func.GBK(request.getParameter("total_fee"));
		String userId=s_func.GBK(request.getParameter("userId"));
		System.out.println("wx_notify_url.jsp  total_fee   "+total_fee);
		
		
		String url = "";
		Map<String, String> parameters = new HashMap<String, String>();
		for (int i = 0; i < 2; i++) {

			BufferedReader in = null;// 读取响应输入流
			StringBuffer sb = new StringBuffer();// 存储参数
			String params = "";// 编码之后的参数
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
					params = sb.toString();
				} else {
					for (String name : parameters.keySet()) {
						sb.append(name).append("=").append(java.net.URLEncoder.encode(parameters.get(name), "UTF-8"))
								.append("&");
					}
					String temp_params = sb.toString();
					params = temp_params.substring(0, temp_params.length() - 1);
				}
				String full_url = url + "?" + params;
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

  
%>
