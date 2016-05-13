<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String wsPath = "ws://182.92.9.195:8081/";
//String wsPath = "ws://localhost:7070/message/";
%>
<%@ include file="/commons/taglibs.jsp" %>
<%@ include file="/commons/meta.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">
<title>考拉迷你仓门店视频应答系统</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<style>
	body{min-width:1366px;}
	object:focus { outline:none; }
    #flashContent { display:none; }
	html,body{margin:0;padding:0;}
	.ministorage_title{display:block;overflow:hidden;background:#009dd9;padding:0 0 0 25px;line-height:50px;font-size:24px;color:#fff;font-weight:bold;}
	.mendiantitile{display:block;overflow:hidden;margin:40px 0 10px;text-align:center;}
	.mendiantitile span{display:inline-block;padding:0 60px;line-height:65px;font-size:28px;color:#f00;font-weight:bold;*display:inline;*zoom:1;border-top:1px solid #000;border-bottom:1px solid #000;}
	.outertable {text-align: center;}
	.historytable{position:relative;text-align:left;display:block;padding:0 0 50px;width:738px;margin:0 auto;}
	.historytable label{display:block;font-size:16px;line-height:55px;color:#323232;}
	.wenan{display:block;position:absolute;top:50px;right:-270px;z-index:19;}
	.wenan p{display:block;font-size:16px;color:#000;line-height:30px;}
	.wenan span{display:block;font-size:16px;color:#000;line-heught:25px;}
	.viewtable{border-top:1px solid #787878;border-left:1px solid #787878;}
	.viewtable th,.viewtable td{text-align:center;color:#323232;font-size:12px;font-weight:normal;border-bottom:1px solid #787878;border-right:1px solid #787878;}
	.viewtable th{line-height:28px;}
	.viewtable td{line-height:54px;}
	.viewtable .lasttd{width: 120px;}
	.lasttd a {margin:10px;float:left;width: 100px;height: 30px;background: #009dd9; color: white; display: block; line-height: 30px;border-radius:5px;}
	.unanswer:link {color:white;}
	#notice {position: absolute;left: -200px;}
</style>
<script type="text/javascript" src="pad_new/js/config.js"></script>
<script src="pad_new/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
 	var dianTid;
	var ws = null;
	var processId = null;
	var initId = null;
	
	var _json = {
		id : null,
		body : null,
		location : null,
		side : null,
		from : "server",
		status : 0,
		to : null,
		source : 2
	};
 function frontTemp(dianTid,kefuStatus) {
		var timeStamp = new Date().toLocaleString(),
		    pathName=window.document.location.pathname.split('/')[2],
		    dianPosition ='客服';
			dataStringTemp = timeStamp+'_'+dianTid+'_'+kefuStatus+'_'+dianPosition;
			
		$.ajax({
			url:'${ctx}/pages/Pad/padlog.htm',
			data:{logstr:dataStringTemp},
			type:'post',
			dataType:'text',
			success:function(data){
				console.log('hello data');
			},
			error:function(data){
				console.log('数据存储失败'+data);
			}
		});
	}
	var autoRefresh = (function(){
   		var procc = null;
   		
   		// 刷新定时器
   		var startInterval = function(_time){
   			return setInterval(function(){
   				location.reload();
   			},_time);
   		};
   		
   		// 启动刷新，参数为妙
   		var setup = function(_time){
   			_time *= 1000;
   			procc = startInterval(_time);
   			$(document).click(function(){
   				if(procc) clearInterval(procc);
 	  			procc = startInterval(_time);
   			});
   		};
   		return {
   			setup : setup
   		};
   		alert("server.jsp refresh");
   	})();
	
	function initWebSocket(){
		
		ws = new WebSocket(wsPath+"padWS?type=server");
		
		// 接收到消息的事件
		ws.onmessage = function(_msg){
		
			$('.message').text(_msg.data);
			var _message = eval("("+_msg.data+")");
			if(_message.to == "server") {
				// 用户呼叫客服
				if(_message.status == "0") {
					addRecord(_message); 
				}
				
				// 客服接入响应
				if(_message.status == "-1"){
					var kefuStatus ='接入';
					var s1 = $('.viewtable tr').filter(function(){
						return $(this).children().first().text()==_message.id;
					}).children().find('.status1');
					s1.text("客服接入").hide().siblings('.status2').show();
					var temS1 = $('.viewtable tr').filter(function(){
						return $(this).children().first().text()==_message.id;
					}).children();
					dianTid = temS1.eq(0).text()+temS1.eq(3).text();
					frontTemp(dianTid,kefuStatus);
				}
				
				// 进度条成功关闭
				if(_message.status == "-2") {
					var kefuStatus ='开始';
					var s2 = $('.viewtable tr').filter(function(){
						return $(this).children().first().text()==_message.id;
					}).children().find('.status2');
					var temS2 = $('.viewtable tr').filter(function(){
						return $(this).children().first().text()==_message.id;
					}).children();
					dianTid = temS2.eq(0).text()+temS2.eq(3).text();
					s2.text("开始视频").hide().siblings('.status3').show();
					frontTemp(dianTid,kefuStatus);
				}
				
				// pad评价框弹出
				if(_message.status == "-3") {
					var kefuStatus ='结束';
					$('.viewtable tr').filter(function(){
						return $(this).children().first().text()==_message.id;
					}).children().last().html("已结束");
					$('.mendiantitile span').text('成功接入视频应答系统');
					$('input[name=ec_call]').val('成功接入视频应答系统');
					var temS3 = $('.viewtable tr').filter(function(){
						return $(this).children().first().text()==_message.id;
					}).children();
					dianTid = temS3.eq(0).text()+temS3.eq(3).text();
					frontTemp(dianTid,kefuStatus);
				}
				
				// pad取消呼叫
				if(_message.status == "5") {
					$('.viewtable tr').filter(function(){
						return $(this).children().first().text()==_message.id;
					}).children().last().html("已取消");
					$('.mendiantitile span').text('成功接入视频应答系统');
					$('input[name=ec_call]').val('成功接入视频应答系统');
				}
			}
		}
		
	
		ws.onopen = function(){
			clearTimeout(initId);
			var text = '${ec_call }';
			if(text){
				$('.mendiantitile span').text(text);
			} else {
				$('.mendiantitile span').text('成功接入视频应答系统');
			}
			
		};
		ws.onerror = function(){
			$('.mendiantitile span').text('服务器连接错误');
		};
		
		ws.onclose = function(){
			initId = setTimeout(initWebSocket, 5000);
		};
	}
	$(function(){
		if(window.WebSocket) {
			initWebSocket();
			// 启动页面定时刷新，刷新频率30分钟
			autoRefresh.setup(1800);
			// 客服接入
			$('.status1').click(function(){status1(this);});
			
			$('.status2').click(function(){status2(this);});
			
			$('.status3').click(function(){status3(this);});
		} else {
			$('.mendiantitile span').text('当前系统不支持此浏览器，建议使用Chrome、Firefox或360浏览器');
		}
	});
	
	// 用户呼叫以后生成新的记录
	function addRecord(message){
		var json = message;
		if(json.success) {
			var newline = $(
				'<tr>'+
					'<td>'+json.record.id+'</td>'+
					'<td>'+json.record.callDate+'</td>'+
					'<td>'+json.record.callTime+'</td>'+
					'<td>'+json.record.location.name+"【"+(json.side=="A"?'仓内':'仓外')+'】</td>'+
					'<td><a target=blank href=tencent://message/?uin='+(json.side=="A"?json.record.location.qq1:json.record.location.qq2)+'&Site=http://cang.mini-kaola.com&Menu=yes><img border="0" src="http://wpa.qq.com/pa?p=2:'+(json.side=="A"?json.record.location.qq1:json.record.location.qq2)+':41" alt="点击这里给我发消息" title="点击这里给我发消息"></a></td>'+
					'<td class="lasttd">'+
						'<a style="'+(!json.answerdt?'display:block;':'display:none;')+'" data1="'+json.location +'" data2="'+json.side+'" class="status1" onclick="status1(this);" href="javascript:void(0);">客服接入</a>'+
						'<a style="'+(json.answerdt && !json.vediodt?'display:block;':'display:none;')+'" data1="'+json.location +'" data2="'+json.side+'" class="status2" onclick="status2(this);" href="javascript:void(0);">开始通话</a>'+
						'<a style="'+(json.answerdt && json.vediodt && !json.enddt?'display:block;':'display:none;')+'" data1="'+json.location +'" data2="'+json.side+'" class="status3" onclick="status3(this);" href="javascript:void(0);">通话结束</a>'+
					'</td>'+
				'</tr>'
			);
			newline.find('.lasttd a').addClass('unanswer');
			$('.viewtable').find('tr').first().after(newline);
			$('.mendiantitile span').text('当前【'+json.record.location.name+":"+(json.side=='A'?'仓内':'仓外')+'】正在呼叫');
			$('input[name=ec_call]').val('当前【'+json.record.location.name+":"+(json.side=='A'?'仓内':'仓外')+'】正在呼叫');
			$('#myaudio').get(0).play();
			
			//一页显示太多数据后去掉最后一行
			if($('.viewtable').find('tr').size()>${pageSize}+1) {
		    	$('.viewtable').find('tr').last().remove();
		    	if($('div.right_7_5:contains("下一页")').next().text().trim()==1) {
		    		$('div.right_7_4').before("<div class='right_7_5'><a href=\"javascript:document.forms.ec.ec_p.value='3';document.forms.ec.setAttribute('action','/storage/pages/Pad/toIndexPage3.htm');document.forms.ec.setAttribute('method','post');document.forms.ec.submit()\">2</a><div>");
		    		$('.text_blue').eq(1).text(2);
		    	}
		    }
		    // 更新记录条数
		    var _countObj = $('.text_blue').first();
		    _countObj.text(parseInt(_countObj.text())+1);
		}
	}
	var statuscommon = function(curr){
		_json = {
			id : null,
			body : null,
			location : null,
			side : null,
			from : "server",
			status : 0,
			to : null,
			source : 2
		};
		var id = curr.parent().siblings().eq(0).text();
		_json.location = curr.attr('data1');
		_json.side = curr.attr('data2');
		_json.id = id;
		_json.to = _json.location+_json.side;
	}
	
	// 客服接入
	var status1 = function(obj){
	/* 	var kefuStatus ='接入'; */
		var curr = $(obj);
		statuscommon(curr);
		_json.to = "server";
		_json.status = 1;
		// 消息体
		ws.send(JSON.stringify(_json));
		curr.html('请等待...');
		/* dianTid = $(obj).parents().find('td').eq(0).text()+$(obj).parents().find('td').eq(3).text();
		frontTemp(dianTid,kefuStatus); */
	}
	
	// 结束进度条
	var status2 = function(obj){
		/* var kefuStatus ='开始'; */
		var curr = $(obj);
		statuscommon(curr);
		_json.status = 2;
		ws.send(JSON.stringify(_json));
		curr.html('请等待...');
		/* dianTid = $(obj).parents().find('td').eq(0).text()+$(obj).parents().find('td').eq(3).text();
		frontTemp(dianTid,kefuStatus); */
	}
	
	// 结束视频通话，打开pad评价弹窗
	var status3 = function(obj){
		/* var kefuStatus ='结束'; */
		var curr = $(obj);
		statuscommon(curr);
		_json.status = 3;
		ws.send(JSON.stringify(_json));
		curr.html('请等待...');
		/* dianTid = $(obj).parents().find('td').eq(0).text()+$(obj).parents().find('td').eq(3).text();
		frontTemp(dianTid,kefuStatus); */
	}
</script>
</head>
<body>
	<div class="ministorage_title">考拉迷你仓门店视频应答系统</div>
	<div class="mendiantitile"><span>
	<c:if test="${ec_call}">
	${ec_call }
	</c:if>
	</span></div>
	<div class="outertable">
		<div class="historytable">
			<div class = "wenan">
				<p>操作步骤：</p>
				<!-- 旧版操作步骤
				<span>1、点击客服接入</span>
				<span>2、点击发起QQ交谈</span>
				<span>3、等待QQ视频接通成功</span>
				<span>4、点击开始通话</span>
				<span>5、点击结束QQ视频通话</span>
				<span>6、点击结束通话</span>
				 -->
				<span>1、点击客服接入</span>
				<span>2、点击发起QQ交谈</span>
				<span>3、等待QQ视频接通成功</span>
				<span>4、点击开始通话</span>
				<span>5、为用户打开仓门</span>
				<span>6、点击结束QQ视频通话</span>
				<span>7、对仓内QQ发起视频</span>
				<span>8、对仓内QQ发起远程协助</span>
				<span>9、最小化QQ视频</span>
				<span>10、打开屏保（任务栏第二个图标）</span>
				<span>11、最大化QQ视频（5S内）</span>
				<span>12、用户点击返回通话</span>
				<span>13、结束通话</span>
			</div>
			<label>历史记录</label>
			<audio id="myaudio" src="pad_new/resources/zhouxingxing.MP3" controls="controls" hidden="true">
				<p style="color: red; font-size: 16px; font-family: '微软雅黑';">您的浏览器不支持声音提示！</p>
			</audio>
			<form id="ec" action="${ctx}/pages/Pad/toIndexPage3.htm" method="post">
				<input type="hidden" id="basepath" value="<%=basePath %>" />
				<input type="hidden"  name="ec_crd"  value="${pageSize}" />
				<input type="hidden"  name="ec_p"  value="${pageNumber+1}" />
				<input type="hidden"  name="ec_call"  value="${ec_call }" >
				<table cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" class="viewtable" width="100%">
					<tr>
						<th>编号</th>
						<th>日期</th>
						<th>时间</th>
						<th>门店</th>
						<th>视频聊天</th>
						<th>通话状态</th>
					</tr>
					<c:forEach items="${page.result }" var="r">
		                <tr>
		                 	<td>${r.id }</td>
		                	<td><c:out value="${fn:substring(r.calldt, 0, 10)}" /></td>
		                	<td><c:out value="${fn:substring(r.calldt, 11, 19)}" /></td>
		                	<td>${r.locationname }【${r.side==0?"仓内":"仓外" }】</td>
		                	<td>
		                    	<a target=blank href=tencent://message/?uin=${r.side==0?r.qq1:r.qq2 }&Site=http://cang.mini-kaola.com&Menu=yes><img border="0" src="http://wpa.qq.com/pa?p=2:${r.side==0?r.qq1:r.qq2 }:41" alt="点击这里给我发消息" title="点击这里给我发消息"></a>
		                    </td>
		                    <td class="lasttd">
		                    	<c:if test="${r.status == 0}">
		                   			<a data1="${r.locationid }" <c:choose><c:when test="${empty r.answerdt}">style="display:block;"</c:when><c:otherwise>style="display:none;"</c:otherwise></c:choose> data2="${r.side == '0' ? 'A' : 'B'}" class="status1" href="javascript:void(0);">客服接入</a>
		                   			<a data1="${r.locationid }" <c:choose><c:when test="${!empty r.answerdt and empty r.vediodt}">style="display:block;"</c:when><c:otherwise>style="display:none;"</c:otherwise></c:choose> data2="${r.side == '0' ? 'A' : 'B'}" class="status2" href="javascript:void(0);">开始通话</a>
		                   			<a data1="${r.locationid }" <c:choose><c:when test="${!empty r.answerdt and !empty r.vediodt and empty r.enddt}">style="display:block;"</c:when><c:otherwise>style="display:none;"</c:otherwise></c:choose> data2="${r.side == '0' ? 'A' : 'B'}" class="status3" href="javascript:void(0);">通话结束</a>
		                    		<c:if test="${!empty r.answerdt and !empty r.vediodt and !empty r.enddt}">已结束</c:if>
		                    	</c:if>
		                    	<c:if test="${r.status == 1 }">已取消</c:if>
		                    </td>
		                </tr>
		               </c:forEach>
				</table>
				<jsp:include page="page3.jsp"></jsp:include>
			</form>
		</div>
	</div>
	<script type="text/javascript">
	
	</script>
</body>
</html>