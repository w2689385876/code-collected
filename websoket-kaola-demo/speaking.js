// JavaScript Document
var timer;
var basepath = '';
$(function(){
	basepath=$('#basepathid').val();
	//取消
	$('.windowclose').click(function(){
		$('.jindutiaowindow').hide();
		$('.reviewtalk').hide();
		$('.talkabout').css('display','inline-block');
		$('.jdbox_animate').css('width',0);
		clearTimeout(timer);
		// 隐藏通话中提示
//		$('.contect').hide();
		$('.sayingimg .calling').attr('src',basepath+'pad_new/images/speaking/5.jpg').unbind('click').bind('click',consult);
		$('.liji_text p').text("远程开仓 立即存放");
		
		_json.status = 5;
		ws.send(JSON.stringify(_json));
	});
	//后台等待
	$('.afterwhit').click(function(){
		$('.jindutiaowindow').hide();
		$('.talkabout').hide();
		$('.reviewtalk').css('display','inline-block');
	});
	//查看通话
	$('.reviewtalk').click(function(){
		$('.jindutiaowindow').show();
	});
	
	$('.sayingimg img,.talkabout').click(consult);
	
	// 左侧栏选项
	$('.three').click(function(){
		var bbb=$('.allbox span');
		if(bbb.css('color')=='#fff'){
			$('.allbox span').css('color','#fff');
		}else{
			$('.allbox span').css('color','#898989');
		}
		$('.three span').removeClass('bon');
		$(this).addClass('bon');
	})

	// 右侧物品展示
	$('.type li').each(function(i){
		$(this).click(function(){
			$('.type ul li').removeClass('lon');
			$(this).addClass('lon');
			$('.information').eq(i).show().siblings('.information').hide();
			$('.information').eq(i).find('.list_box').eq(0).addClass('on');
			$('.information').eq(i).find('.list_box').eq(0).children('.list_box_hidden').show();
		});
	})
	$('.information').eq(0).show();

	// 二维码弹层弹出
	$('.shadow a').click(function(){
		var winbox=$('.windowtipopenbox');
		winbox.find('img').attr('src',$(this).data('img'));
		winbox.find('p').text("编号："+$(this).data('no'));
		if(winbox.css('dispaly')=='none'){
			$('.windowtipopenbox').hide();
		}else{
			$('.windowtipopenbox').show();
		}
	});
	// 二维码弹层关闭
	$('.windowtipopenbox_text a').click(function(){
		$('.windowtipopenbox').hide();
	});
	//立即选择可用仓型
	$('.within').click(function(){
		var h=$('.top').height()+$('.lianxi').height()+$('.middle').height()+90;
		$('.speakingbox').animate({'margin-top':0-h},300);
	});
	//立即选择可用仓 返回
	$('.back').click(function(){
		$('.speakingbox').animate({'margin-top':0},500);
	});
	//centre 内滚动高度
	$('.centre,.information').css('height',$(window).height()-71);
	
	// 加载更多
	$('.more').data('nextPage',2);
	$('.more>a').click(function(){
		 getMoreStorages($('.more').data('nextPage'));
	});
	$('.smallmore').data('nextPage',2);
	$('.smallmore>a').click(function(){
		 getMoreSmallStorages($('.smallmore').data('nextPage'));
	});
	$('.middlemore').data('nextPage',2);
	$('.middlemore>a').click(function(){
		 getMoreMiddleStorages($('.middlemore').data('nextPage'));
	});
	$('.bigmore').data('nextPage',2);
	$('.bigmore>a').click(function(){
		 getMoreBigStorages($('.bigmore').data('nextPage'));
	});
	$('.bigbigmore').data('nextPage',2);
	$('.bigbigmore>a').click(function(){
		 getMoreBigBigStorages($('.bigbigmore').data('nextPage'));
	});
	
	// 关闭评分弹窗
	$('.close').click(function(){
		$('.pingjiabox').hide();
	});
	//实景展示onload
	$('.inthecall').click(function(){
		var ohtml='<li style="width:974px;"><a class="pic" href="javascript:void(0)"><img src="'+basepath+'pad_new/images/new_storage_1.jpg" alt="" /></a></li>'
			+'<li style="width:974px;"><a class="pic" href="javascript:void(0)"><img src="'+basepath+'pad_new/images/new_storage_2.jpg" alt="" /></a></li>';
		$('.bd ul').html(ohtml);
		$('.slidecontent').show();
		$('.leftLoop .bd li img,.bd li').css('width',$('.hd').width());
		$('.bd ul').css('width',$('.bd ul li').length*$('.hd').width());
		onloadMethod();
		$(window).resize(function(){onloadMethod();});
	});
	//关闭实景展示
	$('.slideclosebox').click(function(){
		$('.slidecontent').hide();
	});
	
	// 启动页面定时刷新，刷新频率30分钟
	autoRefresh.setup(1800);
});
function onloadMethod(){
	//焦点图公用方法
	var Focus_lunbo=jQuery(".leftLoop").slide({ mainCell:".bd ul",effect:"leftLoop",vis:1,scroll:1,autoPlay:false});
}
function oneload(){
	$('.jdbox_animate').animate({'width':'65%'},3000);
	$('.jdttexttip').text('小考正在努力为您连接中......');
	timer=setTimeout(secondload,3000);
};
function secondload(){
	$('.jdbox_animate').animate({'width':'85%'},10000);
	$('.jdttexttip').text('小考正在努力为您连接中......');
	timer=setTimeout(threeload,10000);
};
function threeload(){
	$('.jdbox_animate').animate({'width':'92.5%'},1000);
	$('.jdttexttip').text('连接成功，正在为您排队');
	timer=setTimeout(loadend,3000);
};
function loadend(){
	$('.jdttexttip').html('排队中，您前面还有<em>'+Math.ceil(Math.random()*5)+'</em>个人');
	timer=setTimeout(function(){
		$('.jdttexttip').text('正在加载通话中......');
	},3000);
}
function loaddingbox(){
	var num=parseInt($('.jdbox_animate').width())/parseInt($('.jdboxbg').width())*100;
	$('.numboxview').text(parseInt(num)+'%');
	$('.numboxview').css('left',parseInt(num)-4+'%')
	setTimeout(loaddingbox,10);
};
// 加载更多仓-全部
function getMoreStorages(pn) {
	$.post(ctx+'/pages/Pad/getStorages.htm',{
		page: pn,
		id : locationid
	},function(dat){
//		var jsonData = eval("("+dat+")");
		var jsonData = dat;
		var data = jsonData.result;
		var newStorages = '';
		$(data).each(function(i){
			newStorages +=
				'<li>'+
                        '<div class="form_goods_image">'+
                        	(data[i].typeid == 1 ?
                        		'<img src="'+ctx+'/pad_new/images/keyong/4.png" alt="" />'
                        	:data[i].typeid == 2 ?
                        		'<img src="'+ctx+'/pad_new/images/keyong/5.png" alt="" />'
                        	:
                        		'<img src="'+ctx+'/pad_new/images/keyong/2.png" alt="" />'
                        	)+
                            '<span>编号:'+data[i].unitno+'</span>'+
                            '<span>规格:'+data[i].depth +'mx'+data[i].width +'mx'+data[i].height +'m</span>'+
                            '<span>价格:'+data[i].autoprice.toFixed(2)+'元/月</span>'+
                            '<div class = "shadow">'+
                                '<a href="javascript:void(0)" data-no="'+data[i].unitno +'" data-img="'+ctx+'/'+data[i].qrcodeurl +'">扫码预订</a>'+
                                '<img src="'+ctx+'/pad_new/images/keyong/3.png" alt="" />'+
                            '</div> '+
                        '</div>'+
                    '</li>';
                    /*
				'<div class="form_goods_image">'+
                   '<img src="'+ctx+'/'+data[i].qrcodeurl+'" alt="" />'+
                   '<label for="">'+data[i].unitno+'</label>'+
                   '<span>（'+data[i].depth.toFixed(1)+'m³ x '+data[i].width.toFixed(1)+'m³ x '+data[i].height.toFixed(1)+'m³ )</span>'+
                   '<label for="">'+data[i].autoprice.toFixed(2)+'元/月</label>'+
                   '<em>扫码立即下单</em>'+
                '</div>';
                */
		});
		if(pn<2) {
			$('.allStorage').replaceWith($('.allStorage').clone().empty().append($(newStorages)));
		} else {
			$(newStorages).appendTo('.allStorage');
		}
		jsonData.lastPage ? $('.more').hide() : $('.more').show();
		$('.more').data('nextPage',pn+1);
		initErWei();
	});
}


// 加载更多仓-大仓
function getMoreBigStorages(pn) {
	$.post(ctx+'/pages/Pad/getBigStorages.htm',{
		page: pn,
		id : locationid
	},function(dat){
//		var jsonData = eval("("+dat+")");
		var jsonData = dat;
		var data = jsonData.result;
		var newStorages = '';
		$(data).each(function(i){
			newStorages +=
				'<li>'+
                        '<div class="form_goods_image">'+
                       		'<img src="'+ctx+'/pad_new/images/keyong/2.png" alt="" />'+
                            '<span>编号:'+data[i].unitno+'</span>'+
                            '<span>规格:'+data[i].depth +'mx'+data[i].width +'mx'+data[i].height +'m</span>'+
                            '<span>价格:'+data[i].autoprice.toFixed(2)+'元/月</span>'+
                            '<div class = "shadow">'+
                                '<a href="javascript:void(0)" data-no="'+data[i].unitno +'" data-img="'+ctx+'/'+data[i].qrcodeurl +'">扫码预订</a>'+
                                '<img src="'+ctx+'/pad_new/images/keyong/3.png" alt="" />'+
                            '</div> '+
                        '</div>'+
                    '</li>';
                    /*
				'<div class="form_goods_image">'+
                   '<img src="'+ctx+'/'+data[i].qrcodeurl+'" alt="" />'+
                   '<label for="">'+data[i].unitno+'</label>'+
                   '<span>（'+data[i].depth.toFixed(1)+'m³ x '+data[i].width.toFixed(1)+'m³ x '+data[i].height.toFixed(1)+'m³ )</span>'+
                   '<label for="">'+data[i].autoprice.toFixed(2)+'元/月</label>'+
                   '<em>扫码立即下单</em>'+
                '</div>';
                */
		});
		if(pn<2) {
			$('.bigStorage').replaceWith($('.bigStorage').clone().empty().append($(newStorages)));
		} else {
			$(newStorages).appendTo('.bigStorage');
		}
		jsonData.lastPage ? $('.bigmore').hide() : $('.bigmore').show();
		$('.bigmore').data('nextPage',pn+1);
		initErWei();
	});
}


// 加载更多仓-超大仓
function getMoreBigBigStorages(pn) {
	$.post(ctx+'/pages/Pad/getBigBigStorages.htm',{
		page: pn,
		id : locationid
	},function(dat){
//		var jsonData = eval("("+dat+")");
		var jsonData = dat;
		var data = jsonData.result;
		var newStorages = '';
		$(data).each(function(i){
			newStorages +=
				'<li>'+
                        '<div class="form_goods_image">'+
                       		'<img src="'+ctx+'/pad_new/images/keyong/8.png" alt="" />'+
                            '<span>编号:'+data[i].unitno+'</span>'+
                            '<span>规格:'+data[i].depth +'mx'+data[i].width +'mx'+data[i].height +'m</span>'+
                            '<span>价格:'+data[i].autoprice.toFixed(2)+'元/月</span>'+
                            '<div class = "shadow">'+
                                '<a href="javascript:void(0)" data-no="'+data[i].unitno +'" data-img="'+ctx+'/'+data[i].qrcodeurl +'">扫码预订</a>'+
                                '<img src="'+ctx+'/pad_new/images/keyong/3.png" alt="" />'+
                            '</div> '+
                        '</div>'+
                    '</li>';
		});
		if(pn<2) {
			$('.bigbigStorage').replaceWith($('.bigbigStorage').clone().empty().append($(newStorages)));
		} else {
			$(newStorages).appendTo('.bigbigStorage');
		}
		jsonData.lastPage ? $('.bigbigmore').hide() : $('.bigbigmore').show();
		$('.bigbigmore').data('nextPage',pn+1);
		initErWei();
	});
}


// 加载更多仓-小仓
function getMoreSmallStorages(pn) {
	$.post(ctx+'/pages/Pad/getSmallStorages.htm',{
		page: pn,
		id : locationid
	},function(dat){
//		var jsonData = eval("("+dat+")");
		var jsonData = dat;
		var data = jsonData.result;
		var newStorages = '';
		$(data).each(function(i){
			newStorages +=
				'<li>'+
                        '<div class="form_goods_image">'+
                     		'<img src="'+ctx+'/pad_new/images/keyong/4.png" alt="" />'+
                            '<span>编号:'+data[i].unitno+'</span>'+
                            '<span>规格:'+data[i].depth +'mx'+data[i].width +'mx'+data[i].height +'m</span>'+
                            '<span>价格:'+data[i].autoprice.toFixed(2)+'元/月</span>'+
                            '<div class = "shadow">'+
                                '<a href="javascript:void(0)" data-no="'+data[i].unitno +'" data-img="'+ctx+'/'+data[i].qrcodeurl +'">扫码预订</a>'+
                                '<img src="'+ctx+'/pad_new/images/keyong/3.png" alt="" />'+
                            '</div> '+
                        '</div>'+
                    '</li>';
		});
		if(pn<2) {
			$('.smallStorage').replaceWith($('.smallStorage').clone().empty().append($(newStorages)));
		} else {
			$(newStorages).appendTo('.smallStorage');
		}
		jsonData.lastPage ? $('.smallmore').hide() : $('.smallmore').show();
		$('.smallmore').data('nextPage',pn+1);
		initErWei();
	});
}


// 加载更多仓-中仓
function getMoreMiddleStorages(pn) {
	$.post(ctx+'/pages/Pad/getMiddleStorages.htm',{
		page: pn,
		id : locationid
	},function(dat){
//		var jsonData = eval("("+dat+")");
		var jsonData = dat;
		var data = jsonData.result;
		var newStorages = '';
		$(data).each(function(i){
			newStorages +=
				'<li>'+
                        '<div class="form_goods_image">'+
                       		'<img src="'+ctx+'/pad_new/images/keyong/5.png" alt="" />'+
                            '<span>编号:'+data[i].unitno+'</span>'+
                            '<span>规格:'+data[i].depth +'mx'+data[i].width +'mx'+data[i].height +'m</span>'+
                            '<span>价格:'+data[i].autoprice.toFixed(2)+'元/月</span>'+
                            '<div class = "shadow">'+
                                '<a href="javascript:void(0)" data-no="'+data[i].unitno +'" data-img="'+ctx+'/'+data[i].qrcodeurl +'">扫码预订</a>'+
                                '<img src="'+ctx+'/pad_new/images/keyong/3.png" alt="" />'+
                            '</div> '+
                        '</div>'+
                    '</li>';
		});
		if(pn<2) {
			$('.middleStorage').replaceWith($('.middleStorage').clone().empty().append($(newStorages)));
		} else {
			$(newStorages).appendTo('.middleStorage');
		}
		jsonData.lastPage ? $('.middlemore').hide() : $('.middlemore').show();
		$('.middlemore').data('nextPage',pn+1);
		initErWei();
	});
}
// 打分弹窗倒计时关闭
var scoreInterval = function(second){
	var proc = null;
	var i=second;
	$('.close').text("关闭（"+i+"）");
	proc = setInterval(function(){
		if(i<=0) {
			if(proc) {
				clearInterval(proc);
				$('.pingjiabox').hide();
				return;
			}
		}
		$('.close').text("关闭（"+(--i)+"）");
	},1000);
}

// 二维码弹窗
function initErWei(){
	// 二维码弹层弹出
	$('.shadow a').click(function(){
		var winbox=$('.windowtipopenbox');
		winbox.find('img').attr('src',$(this).data('img'));
		winbox.find('p').text("编号："+$(this).data('no'));
		if(winbox.css('dispaly')=='none'){
			$('.windowtipopenbox').hide();
		}else{
			$('.windowtipopenbox').show();
		}
	});
	// 二维码弹层关闭
	$('.windowtipopenbox_text a').click(function(){
		$('.windowtipopenbox').hide();
	});
}


//立即咨询
var consult = function(){
	// 解绑立即通话事件
	$('.sayingimg .calling').unbind('click');
	//初始化
	clearTimeout(timer);
	$('.numboxview').css('left','-4%');
	$('.jdbox_animate').css('width',0);
	$('.jdttexttip').text('小考正在努力为您连接中......');
	
	// 发送请求
	_json.status = 0;
	ws.send(JSON.stringify(_json));
	
	//弹层展开
	$('.jindutiaowindow').show(function(){
		$('.jdbox_animate').animate({'width':'0%'},0);
		timer=setTimeout(oneload,1);
		loaddingbox();
		//显示通话提示
		$('.contect').show();
		$('.sayingimg .calling').attr('src',basepath+'pad_new/images/speaking/6.jpg').unbind('click').click(function(){
			$('.jindutiaowindow').show();
		});
		$('.liji_text p').text("视频客服通话接通中……");
	});
}
function frontTemp() {
	var timeStamp = new Date().toLocaleString(),
		dianTid = $('.titleright').find('em').text().split('-')[1],
	    pathName=window.document.location.pathname.split('/')[2],
	    dianPosition = pathName==='a1'?'店内':'店外';
		dataStringTemp = timeStamp+'_'+dianTid+'_'+'begin'+'_'+dianPosition;
	$.ajax({
		url:ctx+'/pages/Main/padlog.htm',
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
$(function(){
	$('.talkabout').on('click',frontTemp);
});
// 自动刷新页面
var autoRefresh = (function(){
	var procc = null;
	
	// 刷新定时器
	var startInterval = function(_time){
		return setInterval(function(){
			location.reload();
		},_time);
	}
	
	// 启动刷新，参数为妙
	var setup = function(_time){
		_time *= 1000;
		procc = startInterval(_time);
		$(document).click(function(){
			if(procc) clearInterval(procc);
			procc = startInterval(_time);
		});
	}
	return {
		setup : setup
	}
})();