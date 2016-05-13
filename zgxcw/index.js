$(document).ready(function() {
	// 热销商品推荐li最后一个去掉背景
	$(".goods-con li").last().addClass("bg-no");

	loadBanner();
	loadNotices();
	
	//首页提出来的js 2016年1月29日10:47:51 yufei
	//确认
	$("#butId").data("func",function() {
		window.location.href=contextPath+"/search/category.html";
	});

	//初始化隐藏全部楼层
	if(parseInt($(document).height()) > parseInt($(window).height())){
		$('.floor').hide();
	}

	loadZhuanTi();	//加载专题广告
	loadAllFloor(floorCount);	//加载楼层广告
	//loadHotSku();	//加载热品推荐
});

// 加载Banner图
function loadBanner() {
	var ulEl = $(".cat_banner_pic");
	$.ajax({
		url : contextPath + "/asyncGetBanner.html",
		type : 'get',
		dataType : 'json',
		timeout : 5000,
		success : function(data) {
			try {
				for (var i = 0; i < data.length; i++) {
					var banner = data[i];
					ulEl.append("<li><a target='_blank' href='" + banner.link
							+ "'><img src='" + banner.imageUrl
							+ "' width='718' height='507'/></a></li>");
				}
				initBanner();
			} catch (error) {

			}
		},
		error : function() {

		}
	});
}

// 焦点图 左右箭头滑过效果
function initBanner() {
	$(".cat_banner").on("mouseover", function() {
		var error = 0;
		$(".item-sub").each(function() {
			if ($(this).css("display") == "block") {
				error = 1;
				return;
			}
		});
		$(".sub-car-brand").each(function() {
			if ($(this).css("display") == "block") {
				error = 1;
				return;
			}
		});
		if (error == 0)
			$(this).find(".prev_pic,.next_pic").fadeTo("show", 0.2);
	});
	$(".cat_banner").on("mouseout", function() {
		$(this).find(".prev_pic,.next_pic").hide();
	});

	// 焦点图调用
	$('.cat_banner_pic').cycle({
		fx : 'scrollHorz',
		pagerEvent : 'mouseover',
		speed : 1000,
		timeout : 2000,
		delay : -1000,
		width : 718,
		height : 507,
		pager : '#q_flash_btn1',
		prev : ".prev_pic",
		next : ".next_pic",
		pause:true
	});
}

// 诸葛公告列表
function loadNotices() {
	var ulEl = $(".amout-btm ul");
	$.ajax({
		url : contextPath + "/asyncGetNotices.html?random="+Math.random(),
		type : 'get',
		dataType : 'json',
		timeout : 5000,
		success : function(data) {
			try {
				for (var i = 0; i < data.length; i++) {
					var notice = data[i];
					var link = homeDomain + "/notice/detail/" + notice.noticeId + ".html";
					ulEl.append("<li><a target='_blank' href='" + link + "'>" + notice.title + "</a></li>");
				}
			} catch (error) {

			}
		},
		error : function() {

		}
	});
}
//首页提出来的js 2016年1月29日10:47:28 于飞；
$(".nav_ce").prop("class","nav_ce is-index");
var floorDefault = 1;

function loadAllFloor(floorCount){
	var flrx = 0;
	$(window).scroll(function () {
		var footHeight = parseInt($('.footer-top').outerHeight()) + parseInt($('.foot').outerHeight()) + 150;
        var scrollTop = parseInt(document.documentElement.scrollTop||document.body.scrollTop);
        var scrollHeight = (navigator.userAgent.indexOf("Firefox")>0) ? parseInt($(document).height()) : parseInt($(document).height())-footHeight;
        var windowHeight = parseInt($(this).height());

        if (scrollTop + windowHeight >= scrollHeight) {
        	if(floorDefault <= floorCount){
	      		//此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
				loadFloor(floorDefault, 'adverts' + floorDefault);
				$('#section-'+floorDefault).show();
				
				floorDefault++;
        	}else{
        		//数据全部加载完成 添加楼层导航
        		$('#elevator').onePageNav({
					//filter: ':not(.external)',
					scrollThreshold: 0.01
				});
				

				
				$(window).scroll(function(){
					if($(this).scrollTop() > 1100){
						$("#elevator").fadeIn();
						if(flrx == 0){
							$('.flr-nav-tle').each(function(index){
								$(this).css('width',$('.flr-nav-add-txt').eq(index).width()+"px");
							});
							flrx = 1;
						}
						
					}
					else if($(this).scrollTop()<=1400){
						$("#elevator").fadeOut();
					}
				});
        		return;
        	}

        }
    });
}

<!--获取更多公告 -->
function noticePage(){
	var form=document.createElement("form");//<#--创建表单 -->
	form.method="post";
	form.action="${HomeDomain}/notice.html";
	var pageNum=document.createElement("input");//<#--页码 -->
	pageNum.name="pageNum";
	pageNum.value="1";
	var pageSize=document.createElement("input");//<#--页面大小-->
	pageSize.name="pageSize";
	pageSize.value="4";
	var type=document.createElement("input");//<#--页面大小-->
	type.name="type";
	type.value="false";
	form.appendChild(pageNum);
	form.appendChild(pageSize);
	form.appendChild(type);
	document.body.appendChild(form);
	form.submit();//<#--表单提交 -->
}