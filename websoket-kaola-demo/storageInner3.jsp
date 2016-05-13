<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ include file="/commons/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<!-- <meta name="viewport" content="target-densitydpi=device-dpi,min-width=1024,max-width=1024,user-scalable=no,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" /> -->
<meta content="telephone=yes" name="format-detection" />
<meta content="email=yes" name="format-detection" />
	<title>迷你考拉仓-${location.name }</title>
<link href="<%=basePath %>pad_new/css/reset.css" type="text/css" rel="stylesheet" />
<link href="<%=basePath %>pad_new/css/speaking.css" type="text/css" rel="stylesheet" />
<link href="<%=basePath %>pad_new/css/public.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" language="javascript" src="<%=basePath %>pad_new/js/jquery-1.9.1.min.js"></script>
<!-- <script src="https://dn-learning-tech.qbox.me/realtimecat/realtimecat-0.2.min.js"></script> -->
<script type="text/javascript" src="<%=basePath %>pad_new/js/config.js"></script>
</head>

<body>
	<input type="hidden" name="" id="basepathid" value="<%=basePath%>" />
    <div class = "speakingbox">
        <div class = "top"></div>
        <!-- lianxi -->
        <div class = "lianxi">
            <div class = "telephone"></div>
            <div class = "titleright">
                <span>400-035-8885</span>
                <em>迷你考拉仓-${location.name }</em>
            </div>
        </div>
        <!-- middle -->
        <div class = "middle">
            <!-- product -->
            <div class = "product">
                <div class = "kaola">
                    <img src="<%=basePath%>pad_new/images/speaking/1.png" alt="" class = "t_img" />
                    <div class = "kaola_text">
                        <p>迷你考拉</p>
                        <span>社区中的自助式仓储服务，给您的物品恒温恒湿，安全可靠的存储环境，让您经历不一样的仓储体验！</span>
                    </div>
                    <img src="<%=basePath%>pad_new/images/speaking/2.png" alt="" />
                </div>
                <div class = "live">
                    <!--<div class = "inthecall">
                        <img src="<%=basePath%>pad_new/images/speaking/3.png" alt="" />
                        <a href="javascript:void(0)">更多实景</a>
                    </div>-->
                    <div class = "within">
                        <div class = "now">
                            <a href="javascript:void(0)">
                                <span>立即选择可用仓型</span>
                                <p>(${page.totalCount })</p>
                                <img src="<%=basePath%>pad_new/images/speaking/4.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- saying -->
            <div class = "saying">
                <div id="localMediaContainer" class = "sayingimg">
                    <!-- look -->
                    <div class = "look">
                        <a href="javascript:void(0)" class="reviewtalk">查看通话</a>
                        <a href="javascript:void(0)" class="talkabout">立即咨询</a>
                    </div>
                    <img class="calling" src="<%=basePath%>pad_new/images/speaking/5.jpg" alt="" />
                    <!-- contect -->
                    <!-- 
                    <div class="contect">
                        <div class="contect_text">
                            <img src="<%=basePath%>pad_new/images/speaking/phone2.png" alt="" />
                        </div>
                    </div>
                      -->
                    <div class="liji_text">
                        <p>远程开仓 立即存放</p>
                    </div>
                    <!-- contect -->
                    <!--
                    <div class="remote_text">
                        <p>远程开仓</p>
                        <em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;立即存放</em>
                    </div>
                     -->
                </div>
                <!-- 活动先去掉 
                <div class = "morebig">
                    <img src="<%=basePath%>pad_new/images/speaking/3.jpg" alt="" />
                    <div class="home_text">
                        <span>让</span>
                        <span>家</span>
                        <span>更</span>
                        <span>大</span>
                        <span>一</span>
                        <span class = "dian">点</span>
                    </div>
                </div>
                 -->
            </div>
        </div>
        <!-- canuse -->
        <div class = "canuse">
            <div class = "math">
                <span>可用仓型<em>&nbsp;${page.totalCount }</em></span>
            </div>
            <div class = "back">
                <a href="javascript:void(0)">返回</a>
            </div>
        </div>
        <!-- cl -->
        <div class = "cl"></div>
        <!-- centre -->
        <div class = "centre">
            <!-- type -->
            <div class = "type">
                <ul>
                    <li class = "lon">
                        <div class = "three allbox">
                            <a href="javascript:void(0)"><span>全部</span></a>
                        </div>
                    </li>
                    <li>
                        <div class = "three">
                            <p>小型仓</p>
                            <span>(最多可容纳10个24寸的行李箱)</span>
                        </div>
                    </li>
                    <li>
                        <div class = "three">
                            <p>中型仓</p>
                            <span>(最多可容纳20个24寸的行李箱)</span>
                        </div>
                    </li>
                    <li>
                        <div class = "three">
                            <p>大型仓</p>
                            <span>(最多可容纳30个24寸的行李箱)</span>
                        </div>
                    </li>
                    <li>
                        <div class = "three">
                            <p>超大型仓</p>
                            <span>(最多可容纳40个24寸的行李箱)</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- information -->
            <div class = "information on">
            	<c:if test="${page.totalCount==0}">
	                <div class = "kong" style="display: block;">
	                    <b>此类仓型当前已全部出租</b>
	                    <p>您可以选择其它仓型或向咨询客服其它仓库的出租情况</p>
	                </div>
	            </c:if>
                <ul class="allStorage">
                <c:forEach items="${page.result}" var="storage">
                    <li>
                        <div class="form_goods_image">
                        	<c:if test="${storage.typeid == 5 }">
                        		<img src="<%=basePath%>pad_new/images/keyong/4.png" alt="" />
                        	</c:if>
                            <c:if test="${storage.typeid == 2 }">
                        		<img src="<%=basePath%>pad_new/images/keyong/5.png" alt="" />
                        	</c:if>
                        	<c:if test="${storage.typeid == 3 }">
                        		<img src="<%=basePath%>pad_new/images/keyong/2.png" alt="" />
                        	</c:if>
                        	<c:if test="${storage.typeid == 4 }">
                        		<img src="<%=basePath%>pad_new/images/keyong/2.png" alt="" />
                        	</c:if>
                            <span>编号:${storage.unitno }</span>
                            <span>规格:${storage.depth}mx${storage.width}mx${storage.height}m</span>
                            <span>价格:<fmt:formatNumber value="${storage.autoprice }" pattern="#.00"/>元/月</span>
                            <div class = "shadow">
                                <a href="javascript:void(0)" data-no="${storage.unitno }" data-img="${ctx }/${storage.qrcodeurl }">扫码预订</a>
                                <img src="<%=basePath%>pad_new/images/keyong/3.png" alt="" />
                            </div> 
                        </div>
                    </li>
               	</c:forEach>
                </ul>
                <c:if test="${fn:length(page.result) >= page.pageSize}">
	                <div class = "more">
	                    <a href="javascript:void(0)">查看更多</a>
	                </div>
                </c:if>
            </div>
            <!-- information -->
            <div class = "information on">
            	<c:if test="${smallpage.totalCount==0}">
	                <div class = "kong" style="display: block;">
	                    <b>此类仓型当前已全部出租</b>
	                    <p>您可以选择其它仓型或向咨询客服其它仓库的出租情况</p>
	                </div>
	            </c:if>
                <ul class="smallStorage">
                	<c:forEach items="${smallpage.result}" var="storage">
                    <li>
                        <div class="form_goods_image">
                        	<img src="<%=basePath%>pad_new/images/keyong/4.png" alt="" />
                            <span>编号:${storage.unitno }</span>
                            <%--
                            <span>规格:<fmt:formatNumber value="${storage.depth + 0.0001}" pattern="#,###,###,###"/>m³x<fmt:formatNumber value="${storage.width + 0.0001}" pattern="#,###,###,###"/>m³x<fmt:formatNumber value="${storage.height + 0.0001}" pattern="#,###,###,###"/>m³</span>
                            --%>
                            <span>规格:${storage.depth}mx${storage.width}mx${storage.height}m</span>
                            <span>价格:<fmt:formatNumber value="${storage.autoprice }" pattern="#.00"/>元/月</span>
                            <div class = "shadow">
                                <a href="javascript:void(0)" data-no="${storage.unitno }" data-img="${ctx }/${storage.qrcodeurl }">扫码预订</a>
                                <img src="<%=basePath%>pad_new/images/keyong/3.png" alt="" />
                            </div> 
                        </div>
                    </li>
               		</c:forEach>
                </ul>
                <c:if test="${fn:length(smallpage.result) >= smallpage.pageSize}">
	                <div class = "smallmore">
	                    <a href="javascript:void(0)">查看更多</a>
	                </div>
                </c:if>
            </div>
            <!-- information -->
            <div class = "information on">
            	<c:if test="${middlepage.totalCount==0}">
	                <div class = "kong" style="display: block;">
	                    <b>此类仓型当前已全部出租</b>
	                    <p>您可以选择其它仓型或向咨询客服其它仓库的出租情况</p>
	                </div>
	            </c:if>
                <ul class="middleStorage">
                	<c:forEach items="${middlepage.result}" var="storage">
                    <li>
                        <div class="form_goods_image">
                        	<img src="<%=basePath%>pad_new/images/keyong/5.png" alt="" />
                            <span>编号:${storage.unitno }</span>
                            <span>规格:${storage.depth}mx${storage.width}mx${storage.height}m</span>
                            <span>价格:<fmt:formatNumber value="${storage.autoprice }" pattern="#.00"/>元/月</span>
                            <div class = "shadow">
                                <a href="javascript:void(0)" data-no="${storage.unitno }" data-img="${ctx }/${storage.qrcodeurl }">扫码预订</a>
                                <img src="<%=basePath%>pad_new/images/keyong/3.png" alt="" />
                            </div> 
                        </div>
                    </li>
               		</c:forEach>
                </ul>
                <c:if test="${fn:length(middlepage.result) >= middlepage.pageSize}">
	                <div class = "middlemore">
	                    <a href="javascript:void(0)">查看更多</a>
	                </div>
                </c:if>
            </div>
            <!-- information -->
            <div class = "information on">
            	<c:if test="${bigpage.totalCount==0}">
	                <div class = "kong" style="display: block;">
	                    <b>此类仓型当前已全部出租</b>
	                    <p>您可以选择其它仓型或向咨询客服其它仓库的出租情况</p>
	                </div>
	            </c:if>
                <ul class="bigStorage">
                	<c:forEach items="${bigpage.result}" var="storage">
                    <li>
                        <div class="form_goods_image">
                        	<img src="<%=basePath%>pad_new/images/keyong/2.png" alt="" />
                            <span>编号:${storage.unitno }</span>
                            <span>规格:${storage.depth}mx${storage.width}mx${storage.height}m</span>
                            <span>价格:<fmt:formatNumber value="${storage.autoprice }" pattern="#.00"/>元/月</span>
                            <div class = "shadow">
                                <a href="javascript:void(0)" data-no="${storage.unitno }" data-img="${ctx }/${storage.qrcodeurl }">扫码预订</a>
                                <img src="<%=basePath%>pad_new/images/keyong/3.png" alt="" />
                            </div> 
                        </div>
                    </li>
               		</c:forEach>
                </ul>
                <c:if test="${fn:length(bigpage.result) >= bigpage.pageSize}">
	                <div class = "bigmore">
	                    <a href="javascript:void(0)">查看更多</a>
	                </div>
                </c:if>
            </div>
            
            <!-- information -->
            <div class = "information on">
            	<c:if test="${bigbigpage.totalCount==0}">
	                <div class = "kong" style="display: block;">
	                    <b>此类仓型当前已全部出租</b>
	                    <p>您可以选择其它仓型或向咨询客服其它仓库的出租情况</p>
	                </div>
                </c:if>
                <ul class="bigbigStorage">
                	<c:forEach items="${bigbigpage.result}" var="storage">
                    <li>
                        <div class="form_goods_image">
                        	<img src="<%=basePath%>pad_new/images/keyong/8.png" alt="" />
                            <span>编号:${storage.unitno }</span>
                            <span>规格:${storage.depth}mx${storage.width}mx${storage.height}m</span>
                            <span>价格:<fmt:formatNumber value="${storage.autoprice }" pattern="#.00"/>元/月</span>
                            <div class = "shadow">
                                <a href="javascript:void(0)" data-no="${storage.unitno }" data-img="${ctx }/${storage.qrcodeurl }">扫码预订</a>
                                <img src="<%=basePath%>pad_new/images/keyong/3.png" alt="" />
                            </div> 
                        </div>
                    </li>
               		</c:forEach>
                </ul>
                <c:if test="${fn:length(bigbigpage.result) >= bigbigpage.pageSize}">
	                <div class = "bigbigmore">
	                    <a href="javascript:void(0)">查看更多</a>
	                </div>
                </c:if>
            </div>
        </div>
    </div>
    <!--评价系统弹层 box-->
    <div class = "pingjiabox">
        <div class = "top"></div>
        <!-- service -->
        <div class = "service">
            <p>请您对我的服务做出<b>评价：</b></p>
        </div>
        <!-- choose -->
        <div class = "choose">
            <ul>
                <li>
                    <div class = "select level1">
                    	<a href="javascript:void(0)">
	                        <img src="<%=basePath%>pad_new/images/pingjia/1.jpg" alt="" />
	                        <span>非常满意</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div class = "select only level2">
                    	<a href="javascript:void(0)">
	                        <img src="<%=basePath%>pad_new/images/pingjia/2.jpg" alt="" />
	                        <span>满意</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div class = "select level3">
                    	<a href="javascript:void(0)">
	                        <img src="<%=basePath%>pad_new/images/pingjia/3.jpg" alt="" />
	                        <span>一般</span>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <!-- close -->
        <div class = "close">
            关闭（9）
        </div>
    </div>
    <!--评价系统弹层 box end-->
    <!--二维码弹层 box-->
    <div class="windowtipopenbox">
        <div class="windowopenbgbox"></div>
        <div class="windowtipopenbox_text">
            <img src="<%=basePath%>pad_new/images/keyong/6.png" alt="" />
            <p>编号：BJXXXXXX</p>
            <a href="javascript:void(0)">关闭</a>
        </div>
    </div>
    <!--二维码弹层 box end-->
    <!--进度条弹层-->
    <div class="jindutiaowindow">
    	<div class="windowclose">取消</div>
        <div class="contentbox">
        	<div class="numboxview">0%</div>
            <div class="jdbox">
            	<div class="jdboxbg">
                	 <div class="jdbox_animate">
                     	<span></span>
                     </div>
                </div>
            </div>
        </div>
        <div class="jdttexttip">小考正在努力为您连接中......</div>
        <a href="javascript:void(0)" class="afterwhit">后台等待</a>
    </div>
    <!--进度条弹层 end-->
    
    <%-- <div class="pb_images">
    	<img src="<%=basePath%>pad_new/images/bg.png" width="100%" height="100%">
    </div> --%>
</body>


<script type="text/javascript">
	// 门店编号
	var locationid = ${param.id};
	var pageSize = 10;
	var ctx = '${ctx}';
	
	 // 声明变量
    var session;
    var sessionid;
    var tokenid;
    var localStream;
	
	var _json = {
		id : null,
		body : null,
		source : 1,
		side : "A",
		location : locationid,
		from : locationid + "A",
		to : "server",
		status : 0
	};
	
	var ws = null;
	var processId = null;
	var initId = null;
	
	function initWebSocket(){
		ws = new WebSocket(wsPath+"padWS?type=pad");
		
		ws.onopen = function(){
			clearTimeout(initId);
		};
		ws.onerror = function(){
		};
	
		ws.onclose = function(){
			initId = setTimeout(initWebSocket, 5000);
		};
		
		// 接收到消息的事件
		ws.onmessage = function(_msg){
			var _message = eval("("+_msg.data+")");
			if(_message.location == locationid && _message.side == _json.side) {
				// 用户呼叫成功
				if(_message.status == "0"){
					_json.id = _message.id;
				}
			
				// 结束进度条
				if(_message.status == "2" && _message.id == _json.id){
					$('.jindutiaowindow').hide();
					$('.reviewtalk').hide();
					$('.talkabout').css('display','inline-block');
					$('.jdbox_animate').css('width',0);
					// 隐藏通话中提示
					clearTimeout(timer);
					$('.sayingimg .calling').attr('src',basepath+'pad_new/images/speaking/5.jpg').unbind('click').bind('click',consult);
					$('.liji_text p').text("远程开仓 立即存放");
//					$('.contect').hide();
//					$('.remote_text').show();
					// 打开视频连接
					//session.connect();
					//startRealTimeCat();
				}
				// 视频通话结束
				if(_message.status == 3 && _message.id == _json.id){
/* 					if(localStream && localStream.getStream()) {
						localStream.getStream().stop();
					} */
					//session.disconnect();
					
	                $('#localMediaContainer').children().show();
					$('.pingjiabox').show();
					$('body').css('overflow','hidden');
					scoreInterval(15);
				}
				// 打开屏保
				if(_message.status == 9){
					//alert('打开屏保');
					$('.pb_images').show(0);
					$('body').css('overflow','hidden');
				}
				
				// 关闭屏保
				if(_message.status == 10){
					//alert('关闭屏保');
					$('.pb_images').hide(0);
					if($('#localMediaContainer').children().last().hasClass('fullScreen')){
						$('body').css('overflow','hidden');
					} else {
						$('body').css('overflow','auto');
					}
					if(!$('.jindutiaowindow').is(':hidden')){
						$('body').css('overflow','hidden');
					}
				}
			}
		}
	}
	
	function startRealTimeCat(){
		
         var mediaList = document.querySelector('#localMediaContainer');

         /********************************
          *           工具函数
          ********************************/
         // 初始化流
         function initStream(options, callback) {
             localStream = new RTCat.Stream(options);
             localStream.on('access-accepted', function () {
                     session.send({stream: localStream, data: true});
                     callback(localStream);
                 }
             );
             localStream.on('access-failed', function (err) {
                 console.log(err);
             });

             localStream.on('play-error', function (err) {
                 console.log(err);
             });
             localStream.init();
         }

         // 显示流
         function displayStream(id, stream) {

             // Video container
             var videoContainer = document.createElement("div");
             videoContainer.setAttribute('style', "width: 100%; height:100%;");

             // Video player
             var videoPlayer = document.createElement('div');
             videoPlayer.setAttribute("id", "peer-" + id);

             videoContainer.appendChild(videoPlayer);
             mediaList.appendChild(videoContainer);

             stream.play("peer-" + id,{width:'100%',height:'100%'});
         }

         /**************************************
         *               建立会话
         ***************************************/

         // 使用token新建会话，请将此处的Token替换为
         // 从http://dashboard.shishimao.com/生成的Token
         session = new RTCat.Session(tokenid);

         //session.connect();

         session.on('connected', function (users) {
             console.log('Session connected');
             initStream({video: true, audio: true, data: true}, function (stream) {
                 //displayStream('self', stream)
             });

         });

		session.on('connect_error', function (error) {
             console.log('Session connect_error');
            
         });

         session.on('in', function (token) {
             if (localStream) {
                 session.sendTo({to: token, stream: localStream, data: true});
             }
             console.log('someone in');
         });

         session.on('out', function (token) {
             console.log('someone out');
         });

         session.on('remote', function (r_channel) {
             var id = r_channel.getId();
             $('#localMediaContainer').children().hide();
             r_channel.on('stream', function (stream) {
                 displayStream(id, stream);
                 
				// 点击视频窗口全屏和还原
				$('#localMediaContainer').children().last().click(function(){
					$(this).toggleClass('fullScreen');
					if($(this).hasClass('fullScreen')){
						$('body').css('overflow','hidden');
					} else {
						$('body').css('overflow','auto');
					}
					if(!$('.jindutiaowindow').is(':hidden')){
						$('body').css('overflow','hidden');
					}
				});
				setTimeout(function(){
					$('#localMediaContainer').children().last().addClass('fullScreen');
					$('body').css('overflow','hidden');
				},5000);
             });
             r_channel.on('close', function () {
                 $('#peer-' + id).parent().remove();
             });
         });
         
         session.connect();
	}
	
	$(function(){
		if(window.WebSocket) {
			initWebSocket();
			
			// 提交客服评价
			$('.level1 a').click(function(){
				// 非常满意
				_json.body = 3;
				_json.status = 4;
				ws.send(JSON.stringify(_json));
				$('.pingjiabox').hide();
				$('body').css('overflow','auto');
			});
			$('.level2 a').click(function(){
				// 满意
				_json.body = 2;
				_json.status = 4;
				ws.send(JSON.stringify(_json));
				$('.pingjiabox').hide();
				$('body').css('overflow','auto');
			});
			$('.level3 a').click(function(){
				// 一般
				_json.body = 1;
				_json.status = 4;
				ws.send(JSON.stringify(_json));
				$('.pingjiabox').hide();
				$('body').css('overflow','auto');
			});
		} else {
			alert('当前系统不支持此浏览器，建议使用Chrome、Firefox或360浏览器');
		}
	});
</script>
<script type="text/javascript" language="javascript" src="<%=basePath %>pad_new/js/speaking.js"></script>
</html>
