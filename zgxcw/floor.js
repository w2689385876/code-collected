//换一批

function loadZhuanTi() {
	$.ajax({
		url : contextPath + "/asyncZhuanTi.html",
		type : 'get',
		dataType : 'text',
		timeout : 5000,
		success : function(html) {
			$(".zt-tj").html(html);
		},
		error : function() {

		}
	});
}

function loadHotSku(){
	$.ajax({
		url : contextPath + "/asyncHotSkus.html",
		type : 'get',
		dataType : 'text',
		timeout : 5000,
		success : function(html) {
			$("#hotskus").html(html);
			bindHotSku();
		},
		error : function() {

		}
	});
}

function bindHotSku(){
	var liWidth = $('.goods-con ul li').width();
	$('.goods-con ul').width(liWidth*$('.goods-con ul li').length);
	$('.goods-con').width(liWidth*6);

	$('.change-list').on('click',function(){
		var obj = $(this);
		if(!obj.hasClass("is-on")){
			obj.addClass("is-on");
			if(($('.goods-con ul').position().left)-(liWidth*6) > -($('.goods-con ul').width())){
				$('.goods-con ul').animate({'left':($('.goods-con ul').position().left)-liWidth*6},500,function(){
					obj.removeClass("is-on");
				});
			}else{
				$('.goods-con ul').animate({'left':0},500,function(){
					obj.removeClass("is-on");
				});
			}
		}
	});
}

function loadFloor(floorNum, containerID) {
	$.ajax({
		url : contextPath + "/asyncLoadFloor.html",
		data : {
			floorNum : floorNum
		},
		type : 'get',
		async:false,
		dataType : 'text',
		timeout : 5000,
		success : function(data) {
			$("#" + containerID).html(data);
			resetCycle('#'+$('#'+ containerID+' .ulcycle').attr("id"));
		},
		error : function() {

		}
	});
}
function resetCycle(expStr){
	var imgW = $(expStr).attr('data-width'),
		imgH = $(expStr).attr('data-height'),
		pager = $(expStr).attr('data-pager'),
		prevBtn = $(expStr).attr('data-prev'),
		nextBtn = $(expStr).attr('data-next'),
		overObj = $(expStr).parent();
	$(expStr).cycle({
		fx:'scrollHorz',
		pagerEvent:'mouseover',
		speed:1000,
		timeout:2000,
		delay:2000,
		width:imgW,
		height:imgH,
		pager:'#'+pager,
		prev:'.'+prevBtn,
		next:'.'+nextBtn,
		pause:true
		});
	overObj.on("mouseover",function(){
			$(this).find('.'+prevBtn+',.'+nextBtn).fadeTo("show",0.2);
	});
	overObj.on("mouseout",function(){
		$(this).find('.'+prevBtn+',.'+nextBtn).hide();
	});
}