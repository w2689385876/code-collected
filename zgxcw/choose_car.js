$(function() {
	// 更换车型-弹窗-开始
	$(".replace-car").click(function() { // click-here 可自定义,标志点击出现弹窗的位置
		popup("change_car");
		if($.trim($("#isBigCarCatClass").val())=='true') {
			$('.add-car-tab1-hd').click() ;
		}
	});

	//删除已选
	$(".car-show").on("click","dd",function(){
		if($(this).index()==1) {  // 清除主品牌 ，品牌，车系，排量，年款，logo
			$("#choosedCarMasterBrand").val("")  ;
			$("#choosedCarBrand").val("")  ;
			$("#choosedCarModel").val("")  ;
			$("#choosedCarEngine").val("")  ;
			$("#choosedCarYear").val("")  ;
			$("#choosedCarLog").val("")  ;
		} else if($(this).index()==2) {  // 清除品牌，车系，排量，年款
			$("#choosedCarBrand").val("")  ;
			$("#choosedCarModel").val("")  ;
			$("#choosedCarEngine").val("")  ;
			$("#choosedCarYear").val("")  ;
		} else if($(this).index()==3) {   // 清除排量，年款
			$("#choosedCarEngine").val("")  ;
			$("#choosedCarYear").val("")  ;
		}
	});

	//tab切换
	$('.add-car-tab1-hd').on('click',carTab);
	// 查询品牌
	$(".car-type-choose li").click(function() {
		if ($(this).index() == 0) {
			$("#brandCarId").closest("div").find("ul").eq(0)
					.show().siblings().hide();
		} else {
			var brandName = $(this).attr("a");
			$.ajax({
				url : $("#base").val()+"/store/asyncgetAllCarMasterBrandGroups.html",
				type : 'get',
     			dataType : 'text',
				data : "brandName=" + brandName,
				success : function(data) {
					$("#brandCarId").closest("div").find("ul").eq(1).html(data);
					$("#brandCarId").closest("div").find("ul").eq(1).show().siblings().hide();
					$("#carMasterBrand").val(brandName);
				}
			});
		}
	});
	//关闭
	$("#close").click(function() {
		$("#change_car").hide();
		$(".popup_layer_bg").hide();
	})
	//重置
	$("#refres").click(function() {
		
		if($('.add-car-infor-cont[_type=smallcar]').css('display') == "block"){
            $(this).closest("#change_car").find(".step").find(".car-type-cont-list").find(".on").removeClass("on");
            $(this).closest("#change_car").find(".step").find(".car-type-cont-list").eq(0).show().siblings().hide();
            $(this).closest("#change_car").find(".step").eq(0).removeClass("hide").siblings().addClass("hide");
            $("#choosedCarMasterBrand").val("");
        }else{
            $(this).closest("#change_car").find(".step2").find(".car-type-cont-list").find(".on").removeClass("on");
            $(this).closest("#change_car").find(".step2").find(".car-type-cont-list").eq(0).show().siblings().hide();
            $(this).closest("#change_car").find(".step2").eq(0).removeClass("hide").siblings().addClass("hide");
            $("#bigCarTypeId").val("");
        }
		
	})
	//确认
	$("#butId").click(function() {
		//判断小车or大车确认
		if($('.add-car-infor-cont[_type=smallcar]').css('display') == "block"){
			var modelNameStr = "";
			var selectedStep = $(".add-car-infor-cont").find(".step:visible");
			var index = selectedStep.index();
			//获取选中名称
			selectedStep.find(".car-show").find("dd").each(function(i,ele) {
				modelNameStr += $(this).text() + " ";
			});
			// 获取年款
			if(index == 3) {    
				if($.trim($("#yearType").find("dd.on").text())!='') {
					modelNameStr += $.trim($("#yearType").find("dd.on").text());
					$("#choosedCarYear").val($("#yearType").find("dd.on").text());
				};
			} else {       // 没有选到第四步，清掉之前选的年款数据
				$("#choosedCarYear").val("") ;
			}
			//获取隐藏域中大车型条件Id
			var carMasterBrandId = $.trim($("#choosedCarMasterBrand").val()) ;
			var carBrandId = $.trim($("#choosedCarBrand").val()) ;
			var carModelId = $.trim($("#choosedCarModel").val()) ;
			var carEngine = $.trim($("#choosedCarEngine").val()) ;
			var carYear = $.trim($("#choosedCarYear").val()) ;
			var modelIdStr = "" ;
			if(carMasterBrandId!='' && 0 <= index) {
				modelIdStr = modelIdStr + carMasterBrandId + "#@#" ;
				if(carBrandId!='') {
					modelIdStr = modelIdStr + carBrandId + "#@#" ;
				}
				if(carBrandId!=''&&carModelId!='' && 1 <= index) {
					modelIdStr = modelIdStr +  carModelId + "#@#" ;
					if(carEngine!='' && 2 <= index) {
						modelIdStr = modelIdStr + carEngine + "#@#" ;
						if(carYear!='' && 3 <= index) {
							modelIdStr = modelIdStr +  carYear;
						}
					}
				}
			}
			//小车型logo
			var carLogo=$("#choosedCarLog").val();
			if(modelIdStr=='') {
				carLogo = "" ;
			}
			var modelName = "" ;
			//存储信息到session 
			$.ajax({
				async:false,
				type : "post",
				url : $("#base").val() + "/store/saveSelectedCarModel.html",
				data : {modelId:modelIdStr,modelName:modelNameStr,carLogo:carLogo,carFlag:1},
				success : function(data) {
						if ($.trim(data)=='true') {
							$("#closeDiv").click();
							var func = $("#butId").data("func");
							if(func!=undefined) {
								func() ;
							}
						}
				}

			});
			
		}else{
			//大车确认事件
			var modelNameStr = "";
			var selectedStep = $(".add-car-infor-cont").find(".step2:visible");
			var index = selectedStep.index();
			//获取选中名称
			selectedStep.find(".car-show2").find("dd").each(function(i,ele) {
				modelNameStr += $(this).text() + " ";
			});
			//获取驱动形式
			if(index == 4) {
				if($.trim($("#bigCarDrive").find("dd.on").text())!='') {
					modelNameStr += $.trim($("#bigCarDrive").find("dd.on").text());
					$("#bigCarDriveName").val($("#bigCarDrive").find("dd.on").text());
				};
			}else{
				$("#bigCarDriveName").val("");
			}
			//获取隐藏域中大车型条件Id
			var bigCarTypeId = $("#bigCarTypeId").val();
			var bigCarMasterBrandId = $("#bigCarMasterBrandId").val();
			var bigCarSeriesId = $("#bigCarSeriesId").val();
			var bigCarHorsePowerId = $("#bigCarHorsePowerId").val();
			var bigCarDriveName = $("#bigCarDriveName").val();
			
			var modelIdStr = "" ;
			if($.trim(bigCarTypeId)!='' && 0 <= index) {
				modelIdStr = modelIdStr + bigCarTypeId + "#@#";
				if($.trim(bigCarMasterBrandId) && 1 <= index) {
					modelIdStr = modelIdStr +  bigCarMasterBrandId + "#@#";
					if($.trim(bigCarSeriesId) && 2 <= index) {
						modelIdStr = modelIdStr + bigCarSeriesId + "#@#";
						if($.trim(bigCarHorsePowerId) && 3 <= index) {
							modelIdStr = modelIdStr +  bigCarHorsePowerId+ "#@#";
							if($.trim(bigCarDriveName) && 3 <= index) {
								modelIdStr = modelIdStr +  bigCarDriveName;
							}
						}
					}
				}
			}
			//大车型logo
			var carLogo=$("#bigCarLogo").val();
			if(modelIdStr=='') {
				carLogo = "" ;
			}
			var modelName = "" ;
			//存储信息到session 
			$.ajax({
				async:false,
				type : "post",
				url : $("#base").val() + "/store/saveSelectedCarModel.html",
				data : {modelId:modelIdStr,modelName:modelNameStr,carLogo:carLogo,carFlag:2},
				success : function(data) {
						if ($.trim(data)=='true') {
							$("#closeDiv").click();
							var func = $("#butId").data("func");
							if(func!=undefined) {
								func() ;
							}
						}
				}

			});
		}
		
	});

	$("#clearCarBtn").click(function() {
		$("#choosedCarMasterBrand").val("")  ;
		$("#choosedCarBrand").val("")  ;
		$("#choosedCarModel").val("")  ;
		$("#choosedCarEngine").val("")  ;
		$("#choosedCarYear").val("")  ;
		$("#choosedCarLog").val("")  ;

		$("#bigCarTypeId").val("") ;
		$("#bigCarMasterBrandId").val("") ;
		$("#bigCarSeriesId").val("") ;
		$("#bigCarHorsePowerId").val("") ;
		$("#bigCarDriveName").val("") ;
		$("#bigCarLogo").val("") ;

		$.ajax({
			async:false,
			type : "post",
			url : $("#base").val() + "/store/saveSelectedCarModel.html",
			data : {modelId:"",modelName:"",carLogo:"",carFlag:"",random:Math.random()},
			success : function(data) {
				if ($.trim(data)=='true') {
					var func = $("#clearCarBtn").data("func");
					if(func!=undefined) {
						func() ;
					}
				}
			}
		});
	}) ;
	
	
});
// 通过主品牌ID 获取品牌和车系
function getCarModel(carMasterBrandId,carLogUrl) {
	$("#choosedCarLog").val(carLogUrl);
	$.ajax({
		type : 'get',
		dataType : 'text',
		url : $("#base").val() + "/store/asyncgetBrandAndModelList.html",
		data : "carBrandID=" + carMasterBrandId,
		success : function(data) {
			$("#choosedCarMasterBrand").val(carMasterBrandId);
			$("#carModel").html(data);

		}

	});
}

// 通过车系 获取排量
function getEngine(carModelId,carBrandId) {
	$.ajax({
		type : 'get',
		dataType : 'text',
		url : $("#base").val() + "/store/asyncgetCarModelEngine.html",
		data : "modelId=" + carModelId,
		success : function(data) {
			$("#choosedCarBrand").val(carBrandId);
			$("#choosedCarModel").val(carModelId);
			$("#carPaiLiang").html(data);
		}
	});
}
// 通过车系id和排量去得年款
function getCarModelYear(carModelId, engineAll) {
	$.ajax({
		type : 'get',
		dataType : 'text',
		url : $("#base").val() + "/store/asyncgetCarModelYear.html",
		data : "engine=" + engineAll + "&carModelId=" + carModelId,
		success : function(data) {
			$("#choosedCarEngine").val(engineAll);
			$("#yearType").html(data);
		}

	});
}
//切换选项卡
function carTab(){
	if($(this).attr("flag")=="bigChoose"){
		$.ajax({
			url : contextPath + "/asyncgetBigCarType.html",
			type : 'get',
			dataType : 'text',
			success : function(data) {
				$("#bigCarType").html(data);
			},
			error : function() {

			}
		});
	}
	$('.add-car-tab1-hd').removeClass('add-car-tab1-hd-down');
	$(this).addClass('add-car-tab1-hd-down');
	$('.add-car-infor-cont').hide();
	$('.add-car-infor-cont').eq($(this).index()).show();

}