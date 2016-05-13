$(function() {
	$('img').error(function(){
		this.src = contextPath + "/images/no_pic_new.jpg";
	})
	// 头部搜索显示下拉列表
	var bol = true;
	$(".head-text").on('click', function() {
		$(".search-list").show();
		return false;
	});
	// 头部搜索获取text焦点
	$(".head-text").on('focus', function() {
		if ($(this).val() == '按原厂编号，商品名称，品牌，分类') {
			$(this).val('');
		}
	});
	// 弹出选择车型
	// $(".replace-car-idx").on("click",function(){ //click-here 可自定义,标志点击出现弹窗的位置
	// popup("change_car");
	// });
	// 头部搜索失去焦点
	var timeout = null;
	$(".head-text").on('blur', function() {
		bol = true;
		var _this = $(".head-text");
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			if (_this.val() == '' && bol) {
				_this.val('按原厂编号，商品名称，品牌，分类');
			}
		}, 200, $(this)); // 定时器里面默认this指向window 所以在最后传入参数$(this)， 此时$(this) ==》
											// $(".head-text")
	});

	// 头部搜索滑过过一秒隐藏搜索列表
	var timer = null;
	$('.head-search').hover(function() {
		clearInterval(timer); // 鼠标移入 .head-search 清除一秒后隐藏的定时器
	}, function() {
		timer = setInterval(function() {
			$(".search-list").hide();
		}, 1000); // 鼠标移出 .head-search 1秒后隐藏
	});

	// 头部搜索点击其他地方也隐藏list
	$(document).on('click', function() {
		bol = true;
		$(".search-list").hide();
	})

	// 头部搜索下拉
	$(".search-list ul li").each(function() {
		$(this).hover(function() {
			$(this).addClass("head-hover");
			$(this).find("span").replaceWith('<a href="javascript:viod(0)">删除</a>');
		}, function() {
			$(this).removeClass("head-hover");
			$(this).find("a").replaceWith('<span>搜索历史</span>');
		})
	})

	// 头部搜索删除搜索列表
	$('.search-list ul').on('click', 'li a', function(ev) {
		bol = false;
		$(this).parent('li').remove();
		if ($('.search-list ul li').length <= 0) {
			if ($(".head-text").val() == '') {
				$(".head-text").val('按原厂编号，商品名称，品牌，分类');
			}
		}
		return false; // 阻止触发选择
	})

	// 头部搜索选择
	$('.search-list ul').on('click', 'li', function() {
		bol = false;
		var value = $(this).find('i').text();
		$(".head-text").val(value);
		$(".search-list").hide(); // 选择后隐藏list
	})

	// 头部 无边框
	// $(".head-nav li.hv-bg").addClass("none-bg");

	// 网站导航下拉展示层的样式更改
	$(".per-nav:eq(1),.per-nav:eq(2)").css("width", "272px");
	$(".per-nav:eq(3)").css("borderRight", "none");
	$(".per-nav:eq(0)").find("a").css("width", "65px");
	$(".per-nav:eq(0)").css("width", "310px");

	// 左侧列表
	// /*侧边栏效果开始*/
	$(".item").each(function() {
		$(this).mouseenter(function() {
			$(this).addClass("itemhover").siblings().removeClass("itemhover");
			$('.nav_ce_hide').show();
			$('.item-sub').addClass("item-sub-on");
			$('.nav_ce_hide .item-sub').show();
		})
	});
	$(".nav_box").on("mouseover", ".nav_ce", function() {
		$(this).find(".nav-ce-tab").show();
		$(".nav_box").mouseleave(function() {
			if ($(this).find(".is-index").length == 0) {
				$(this).find(".nav-ce-tab").hide();
			}
			$('.item').removeClass("itemhover");
			$('.nav_ce_hide .item-sub').hide();
		});
	});
	// 滑过选择车型去掉左侧列表出现的层
	$(".replace-car").mouseenter(
			function() {
				$(this).siblings(".nav_ce_show").find(".itemhover").removeClass(
						"itemhover");
				$('.nav_ce_hide .item-sub').hide();
			});

	// ------右侧导航
	$(".toolbar .toolbar-tab").mouseenter(
			function() {
				$(this).addClass("toolbar-tab-hover").siblings().removeClass(
						"toolbar-tab-hover");
				$(this).find(".tab-text").animate({
					"left" : -61
				}, 500);
			})
	$(".toolbar .toolbar-tab").mouseleave(function() {
		$(this).removeClass("toolbar-tab-hover");
		$(this).find(".tab-text").animate({
			"left" : -35
		}, 500);
	})
	// ---------返回顶部
	$(".tab-return-icon").click(function() {
		$("body,html").animate({
			scrollTop : 0
		}, 500);
	})
	// ----------左侧导航效果
	/*
	 * $(".elevator li").mouseenter(function(){
	 * $(this).addClass("current").siblings().removeClass("current");
	 * $(this).find(".flr-nav-tle").animate({"left":-61},500); }) $(".elevator
	 * li").mouseleave(function(){ $(this).removeClass("current");
	 * $(this).find(".flr-nav-tle").animate({"left":-35},500); })
	 */

	// 兼容placeholder
	if (!("placeholder" in $("input"))) {
		$("input[placeholder]").each(function() {
			var that = $(this);
			that.val(that.attr("placeholder")).on({
				focus : function() {
					if (that.val() === that.attr("placeholder")) {
						that.val("");
					}
				},
				blur : function() {
					if ($.trim(that.val()) == "") {
						that.val(that.attr("placeholder"));
						that.css("color", "#666");
					}
				}
			})
		})
	}
	// -------------------------弹出选择车型--------------------------
	// 热门、A、B、C 选择下面汽车品牌
	$(".car-type-choose").on("click", "li", function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(".car-type-cont-list").eq($(this).index()).show().siblings().hide();
	});
	// 选择品牌
	$(".car-type-cont-list").on(
			"click",
			"li",
			function() {
				$(this).addClass("on").siblings().removeClass("on");
				$(this).closest(".step").next().removeClass("hide").siblings()
						.addClass("hide");
				$(this).closest(".step").next().find(".car-show dd").remove();
				$(this).closest(".step").next().find(".car-show").append(
						"<dd>" + $(this).text() + "<b></b></dd>");
				$(this).closest(".step").next().find(".car-info-cont").find("dd")
						.removeClass("on");
			});

	// 选择步骤
	$(".add-car-tab2-hd").on(
			"click",
			".on",
			function() {
				$(this).closest("#change_car").find(".step").eq($(this).index())
						.removeClass("hide").siblings().addClass("hide");
			});

	// 删除已选
	$(".car-show").on(
			"click",
			"dd",
			function() {
				if ($(this).index() == 1) {
					$(this).closest("#change_car").find(".step").find(
							".car-type-cont-list").find(".on").removeClass("on");
					$(this).closest("#change_car").find(".step").find(
							".car-type-cont-list").eq(0).show().siblings().hide();
					$(this).closest("#change_car").find(".step").find(".car-type-choose")
							.find("li").eq(0).addClass("on").siblings().removeClass("on");
				} else {
					$(this).closest("#change_car").find(
							".step:gt(" + ($(this).index() - 2) + ")").find(".car-info-cont")
							.find("dd").removeClass("on");
				}
				$(this).closest("#change_car").find(".step").eq($(this).index() - 1)
						.removeClass("hide").siblings().addClass("hide");
			});

	$(".car-info-cont")
			.on(
					"click",
					"dd",
					function() {
						$(this).addClass("on").siblings("dd").removeClass("on");
						if ($(this).closest(".step").next().find(".add-car-tab2-hd").length > 0) {
							$(this).closest("#change_car").find(
									".step:gt(" + ($(this).closest(".step").index()) + ")").find(
									".car-info-cont").find("dd").removeClass("on");
							$(this).closest(".step").next().find(".car-show").html(
									$(this).closest(".step").find(".car-show").html());
							$(this).closest(".step").next().find(".car-show").append(
									"<dd>" + $(this).text() + "<b></b></dd>");
							$(this).closest(".step").addClass("hide").next().removeClass(
									"hide");
						}
					});

	// 关闭
	$(".close-popup").on("click", function() {
		$(this).closest("#change_car").find(".popup-layer-top-close").click();
	});
	// 重置
	$(".reset-popup").on(
			"click",
			function() {
				$(this).closest("#change_car").find(".step")
						.find(".car-type-cont-list").find(".on").removeClass("on");
				$(this).closest("#change_car").find(".step")
						.find(".car-type-cont-list").eq(0).show().siblings().hide();
				$(this).closest("#change_car").find(".step").eq(0).removeClass("hide")
						.siblings().addClass("hide");
			});
	// 确定
	$(".submit-btn").on("click", function() {

	});

	$(".popup-layer-body-top-text .sub").click(function() {
		if ($(this).prev().val().length != 17) {
			ZGTX.utils.alert({
				width : "300",
				title : "提示",
				content : "请输入正确的17位VIN码！"
			});
		} else {
			$.ajax({
				url : "",
				type : "POST",
				data : "id=" + id,
				dataType : "json",
				success : function(result) {
					if (result.success) {

					} else {
						ZGTX.utils.alert({
							width : "300",
							title : "提示",
							content : result.data
						});
					}
				}
			});
		}
	});
})

// 选项卡切换
function tabs(tabtit, tabcnt, more) {
	tabtit.each(function(index) {
		$(this).on('hover', function() {
			var tindex = index;
			$(this).addClass('on').siblings('li').removeClass('on');
			tabcnt.eq(tindex).show().siblings('.tabcon').hide();
		});
	});
}

// 弹窗封装
var popup;
popup = function(opt) {
    var $popup_layer_bg = "<div class='popup_layer_bg' style='filter: alpha(opacity=60);zoom:1;'></div>"; //定义弹窗黑色背景;
	$("body").append($popup_layer_bg);
	var $obj = $("#" + opt);

	var popup_layer_position = function() { // 定义定位方法
		var window_height = $(window).height(), obj_height = $obj.height(), window_width = $(
				window).width(), obj_width = $obj.width(), obj_top = (window_height - obj_height) / 2, obj_left = (window_width - obj_width) / 2;
		$obj.css({
			"top" : obj_top,
			"left" : obj_left
		});
	};
	popup_layer_position();
	$(".popup_layer_bg").fadeIn();
	$obj.show();

	window.onresize = function() { // 实时定位
		popup_layer_position();
	};
	// 鼠标滑过关闭按钮/关闭弹窗
	$obj.find(".popup-layer-top-close").click(function() {
		$obj.hide();
		$(".popup_layer_bg").remove();
	});
}

// 加载热搜关键字
function loadHotKeywords() {
	$.ajax({
		url : contextPath + "/asyncHotKeywords.html",
		type : 'get',
		dataType : 'json',
		timeout : 5000,
		success : function(data) {
			var html = "";
			if(data != null && data.length > 0){
				for(var i = 0; i < data.length; i++){
					var adContent = data[i];
					html = html + "<a target='_blank' href=" + adContent.link + ">" + adContent.content + "</a>";
				}
			}
			$(".tuijian-bd").html(html);
		},
		error : function() {

		}
	});
}

$(function(){
	loadHotKeywords();
	loading();
});
$(document).ajaxStart(function(){
	   loading.show();
	});
 $(document).ajaxStop(function(){
	   loading.hide();
	});
 /**
  * [loading 添加加载状态 注意img的路径]
  */
 function loading(){
 	var loadingHtml = '<div class="loading" id="loading"><img src="'+contextPath+'/images/loading.gif">Loading</div>';
 	if ($('.loading').length < 1) {
 		$('body').append(loadingHtml);
 	};
 }
 loading.show = function(){
 	$('.loading').show();
 }
 loading.hide = function(){
 	$('.loading').hide();
 }

 //检查搜索关键字
 function checkKeyword(){
	 if($.trim($("#kw").val())=='按原厂编号，商品名称，品牌，分类') {
     return false ;
	 }
	 if($.trim($("#kw").val())!='按原厂编号，商品名称，品牌，分类') {
	     $.trim($("#kw").val());
	 }
	 return true;
 }
 

//lhy 增加右侧购物车显示效果
 $(function(){
 	$(window).bind('scroll',function(){
 		var scrollT=$(window).scrollTop();
 		if(scrollT>200){
 			$('.toolbar').addClass('on');
 		}else{
 			$('.toolbar').removeClass('on');
 		}
 	});
 });