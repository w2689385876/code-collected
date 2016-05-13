//触发函数
$(document).ready(function(){
	$("#mini_car").on("mouseenter", loadCart); 
	$("#mcart-sigle").on('click','.delete',removeCartItem);
	loadCart();
})

//Mini购物车悬停
function loadCart(){
		//var CartDomain="http://172.31.30.115:8080/cart";
		$.ajax({
		url : CartDomain+"/asyncMiniCart.html",
		type : "GET",
		dataType:"jsonp",
		callback:"callback",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success : function(result) {
			 	var li = "" ;
	            var totalsDiv = "" ;
	            if(result && result.data &&  result.data.items && result.data.items.length !=null && result.data.items.length>0 ) {
	                var items = result.data.items ;
	                var li = "" ;
	                $(items).each(function() {
	                        var img_url=this.imageUrl;
	                        var projectDomain="";
	                        
	                        if(this.source=="0"){
	                        	projectDomain=ZpjdDomain;
	                        }else if (this.source=="1"){
	                        	projectDomain=QpscDomain;
	                        }
	                        
	                        li = li +  "<li>";
	                        if(img_url!=null && img_url!=""){
	                        	li = li +"<div class=\"p-img fl\"><a href='"+projectDomain+"/item/"+this.skuID+".html"+"' target=\"_blank\"><img width='53' height='53' src='"+imgUrl+img_url+"' alt=''></a></div>";
	                        }
	                        else{
	                        	li=li+"<div class=\"p-img fl\" style='border:0;'></div>";
	                        }
	                        
	                        li = li +"<div class=\"p-name fl\">" +
	                            "<a href='"+projectDomain+"/item/"+this.skuID+".html"+"' title=\"\" target=\"_blank\">"+this.skuName+"</a>" +
	                            "</div>" +
	                            "<div class=\"p-detail\">";
	                        
	            
	                        
	                        if(result.data.showPrice){
	                        	li=li+"<span class=\"p-price\">" +
	                            "<strong><span>￥</span>"+this.price+"</strong>×"+this.quantity+"" +
	                            "</span>"
	                        }
	                            
	                        li = li +"<a class=\"delete fr\" data-id='"+this.shopCartItemID+"' data-type=\"RemoveProduct\" href=\"javascript:void(0)\">删除</a>" +
	                            "</div>" +
	                            "</li>";
	                    
	                }) ;
	                if(result.data.showPrice){
	                	totalsDiv = totalsDiv+"<div class=\"p-total\"><b>"+(result.data.qty?result.data.qty:0)+"</b>件商品<br>" +
                        "                 共计：<strong>"+(result.data.totalAmount?result.data.totalAmount:0)+"</strong></div>";
                        
	                } 
	                totalsDiv=totalsDiv+"        <a id=\"btn-payforgoods\" href='"+CartDomain+"/cart.html' title=\"去购物车结算\">去购物车结算</a>";
	            }
	            $("#mcart-sigle").html(li) ;
	            $("#totalInCart").html(totalsDiv) ;
	            checkCert();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			checkCert();
		}
	});
}

	//jsonp 回调方法
	function callback(){}

	//购物车 点击删除 效果
function removeCartItem(){
		var shopCartItemID=$(this).attr('data-id');

		var ele=$(this);
		if(!ele){
			return false;
		}

		$.ajax({
			url : CartDomain+"/asyncDeleteMiniItem.html?shopCartItemID="+shopCartItemID,
			type : "GET",
			dataType:"jsonp",
			callback:"callback",
	        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success : function(result) {
				var isSuccess = result.data.success;
				if(isSuccess){
					ele.parents("li").remove();
					$('#mini_car').trigger('mouseenter');
				}else{
					var msg=result.data.message;
					if(msg==null || msg ==""){
						msg="删除购物车中商品失败";
					}
					ZGTX.utils.alert({
						width:"300",
						title:"提示",
						content:msg
					});
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
					ZGTX.utils.alert({
						width:"300",
						title:"提示",
						content:"删除购物车中商品失败"
					});
			}
		});

}


	//检查购物车中是否有商品
	function checkCert(){
		var len=$("#mcart-sigle li").length;
		if(len==0){
			$('#settleup-content').hide();
			$('#noGoods').show();
		}else{
			$('#noGoods').hide();
			$('#settleup-content').show();
		}
		$('#shopping-amount').html(len).show();
	}
