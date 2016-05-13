//-------------------------弹出选择车型--------------------------
$(function() {
	
	$(".car-info-cont2").on("click","dd",function(){
        $(this).addClass("on").siblings("dd").removeClass("on");
        if($(this).closest(".step2").next().find(".add-car-tab2-hd").length>0){
            if($(this).closest(".step2").prev().find(".add-car-tab2-hd").length == 0){
                $(this).addClass("on").siblings().removeClass("on");
                $(this).closest(".step2").next().removeClass("hide").siblings().addClass("hide");
                $(this).closest(".step2").next().find(".car-show2 dd").remove();
                $(this).closest(".step2").next().find(".car-show2").append("<dd>"+$(this).text()+"<b></b></dd>");
                $(this).closest(".step2").next().find(".car-info-cont2").find("dd").removeClass("on");
                return;
            }
            $(this).closest("#big-car").find(".step2:gt("+($(this).closest(".step2").index())+")").find(".car-info-cont2").find("dd").removeClass("on");
            $(this).closest(".step2").next().find(".car-show2").html($(this).closest(".step2").find(".car-show2").html());
            $(this).closest(".step2").next().find(".car-show2").append("<dd>"+$(this).text()+"<b></b></dd>");
            $(this).closest(".step2").addClass("hide").next().removeClass("hide");
        }
    });
	//大车根据首字母搜索品牌
    $(".car-type-choose2").on("click","li",function(){
    	//if ($(this).index() == 0) {
			//$("#bigCarBrand").closest("div").find("ul").eq(0)
					//.show().siblings().hide();
			//$(this).addClass("on").siblings().removeClass("on");
		//}else{
			//首字母
			var firstSpell = $(this).attr("a");
			//大车型种类Id
			var bigCarTypeId=$("#bigCarTypeId").val();
			$(this).addClass("on").siblings().removeClass("on");
			$.ajax({
     			url : contextPath + "/asyncgetBigCarMasterBrand.html",
     			data : "firstSpell=" + firstSpell + "&bigCarTypeId=" + bigCarTypeId,
     			type : 'get',
     			dataType : 'text',
     			success : function(data) {
     				$("#bigCarBrand").closest("div").find("ul").eq(1).html(data);
     				$("#bigCarBrand").closest("div").find("ul").eq(1).show().siblings().hide();
     			},
     			error : function() {

     			}
     		});
			$(".car-type-cont-list2").eq($(this).index()).show().siblings().hide();
		//}
    });
    //大车选择品牌搜索车系
    $(".car-type-cont-list2").on("click","li",function(){
        $(this).closest("#big-car").find(".step2:gt("+($(this).closest(".step2").index())+")").find(".car-info-cont2").find("dd").removeClass("on");
        $(this).closest(".step2").next().find(".car-show2").html($(this).closest(".step2").find(".car-show2").html());
        $(this).closest(".step2").next().find(".car-show2").append("<dd>"+$(this).text()+"<b></b></dd>");
        $(this).closest(".step2").addClass("hide").next().removeClass("hide");
    });
    
    //删除已选
    $(".car-show2").on("click","dd",function(){
        if($(this).index() == 1){
            $(this).closest("#big-car").find(".step2").find(".car-type-cont-list").find(".on").removeClass("on");
            $(this).closest("#big-car").find(".step2").find(".car-type-cont-list").eq(0).show().siblings().hide();
            $(this).closest("#big-car").find(".step2").find(".car-type-choose").find("li").eq(0).addClass("on").siblings().removeClass("on");
            $("#bigCarBrand").closest("div").find("ul").eq(1).html("");
            //$("#bigCarHot").addClass("on").siblings().removeClass("on");
            $("#bigCarBrand").css('display','block');
			$("#bigCarTypeId").val("") ;
			$("#bigCarMasterBrandId").val("") ;
			$("#bigCarSeriesId").val("") ;
			$("#bigCarHorsePowerId").val("") ;
			$("#bigCarDriveName").val("") ;
			$("#bigCarLogo").val("") ;
        }else{
            $(this).closest("#big-car").find(".step2:gt("+($(this).index()-2)+")").find(".car-info-cont2").find("dd").removeClass("on");
        }
        $(this).closest("#big-car").find(".step2").eq($(this).index()-1).removeClass("hide").siblings().addClass("hide");
    });
    	
});
//点击种类事件
function getBigCarMasterBrand(bigCarTypeId){
	$("#bigCarTypeId").val(bigCarTypeId);
	$.ajax({
		url : contextPath + "/asyncgetBigCarSpell.html",
		data : "bcTypeId=" + bigCarTypeId,
		type : 'get',
		dataType : 'text',
		success : function(data) {
			//$(".car-type-choose2 #bigCarHot").siblings().remove() ;
			$(".car-type-choose2").html(data) ;
			var firstSpell =$("#firstSpell").text();
			$.ajax({
     			url : contextPath + "/asyncgetBigCarMasterBrand.html",
     			data : "firstSpell=" + firstSpell + "&bigCarTypeId=" + bigCarTypeId,
     			type : 'get',
     			dataType : 'text',
     			success : function(data) {
     				$("#bigCarBrand").closest("div").find("ul").eq(1).html(data);
     				$("#bigCarBrand").closest("div").find("ul").eq(1).show().siblings().hide();
     			},
     			error : function() {

     			}
     		});
			
		},
		error : function() {

		}
	});

}
//点击品牌获取车系
function getBigCarSeries(bigCarMasterBrandId,logo){
	$.ajax({
			url : contextPath + "/asyncgetBigCarSeries.html",
			data : "bigCarMasterBrand=" + bigCarMasterBrandId,
			type : 'get',
			dataType : 'text',
			success : function(data) {
				$("#bigCarSeries").html(data);
				$("#bigCarMasterBrandId").val(bigCarMasterBrandId);
				$("#bigCarLogo").val(logo);
			},
			error : function() {

			}
		});
}
//点击车系获取马力
function getBigCarHorsePower(bigCarSeriesId){
	$.ajax({
		url : contextPath + "/asyncgetBigCarHorsePower.html",
		data : "bigCarSeriesId=" + bigCarSeriesId,
		type : 'get',
		dataType : 'text',
		success : function(data) {
			$("#bigCarHorsePower").html(data);
			$("#bigCarSeriesId").val(bigCarSeriesId);
		},
		error : function() {

		}
	});
}
//点击马力获取驱动
function getBigCarDrive(bigCarHorsePowerId){
	var bigCarSeriesId=$("#bigCarSeriesId").val();
	$.ajax({
		url : contextPath + "/asyncgetBigCarDrive.html",
		data : "bigCarSeriesId=" + bigCarSeriesId + "&bigCarHorsePowerId=" + bigCarHorsePowerId,
		type : 'get',
		dataType : 'text',
		success : function(data) {
			$("#bigCarDrive").html(data);
			$("#bigCarHorsePowerId").val(bigCarHorsePowerId);
		},
		error : function() {

		}
	});
}