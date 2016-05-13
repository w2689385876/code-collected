var news = '{{#each items}} <li class="media" id="{{_id}}"> {{#if image}} <a class="pull-left"  href="javaScript:void(0)"> <img class="media-object" width="180px" src="{{image}}"></a> {{/if}} <div class="media-body"> <h4 class="media-heading"><a href="{{href}}" target="_blank">{{title}}</a></h4> <p>{{shortContent}} ……</p> <h4><small><i class="glyphicon glyphicon-calendar"></i>{{publishdate}}</small></h4></div> </li> <hr> {{/each}}';
var newsTemplate = Handlebars.compile(news);

function DynamicCompany(type){
	this.type = type;
	this.typeHref = {
		'news':'news-list.html',
		'staff':'staff-list.html',
		'topic':'topic-list.html',
		'bidding':'bidding.html',
		'bidded':'bidding.html'
	};
}
DynamicCompany.prototype.getArticle = function(index){
	var type = this.type;
	var typeHref = this.typeHref[type];
	$.ajax({
		url:'/cms/ws/0.1/content/news/list?start='+ (index * 10) +'&count=10&type='+ type +'&_order=publishdate',
		dataType:'json',
		success:function(data){
			$.each(data.items,function(index, value){
				value.href = typeHref + "?id="+value._id;
			});
			var newsHtml = newsTemplate(data)
			$('.media-list').html(newsHtml);
			var page = data.page;
			var totalPages = data.totalPages;
			var i = 0;
			var htmlArray = [];
			var current = '';
			var startDisabled = '';
			var endDisabled = '';
			if(totalPages == 1){
				startDisabled = "disabled";
			}
			if((index + 1) == totalPages){
				endDisabled = "disabled";
			}
			htmlArray.push('<li class="'+startDisabled+'"><a>«</a></li>')
			for(i;i < totalPages;i++){
					if(i == index){
						current = "active";
					}else{
						current = "";
					}
					htmlArray.push('<li class="'+ current +'"><a href="javaScript:void(0)" data-index="'+ i +'">'+(i+1)+'</a></li>')

			}
			htmlArray.push('<li class="'+endDisabled+'"><a>»</a></li>');
			$('.pagination').html(htmlArray.join(''));
		}
	})
};
DynamicCompany.prototype.getArticleById = function(id){
	$.ajax({
		url:'/cms/ws/0.1/content/item?id='+id,
		dataType:'json',
		success:function(data){
			$('h3').html(data.title);
			$('time').html(data.publishdate);
			var content = data.content;
			content += '<h4 class="pull-right"><small>'+ data.publishdate +' 　来源:车网互联</small></h4>';
			$('.news-zw').html(content);

			
		}
	})
}
DynamicCompany.prototype.getTitle = function(){
	var type = this.type;
	var typeHref = this.typeHref[type];
	$.ajax({
		url:'/cms/ws/0.1/content/news/list?start=0&count=5&type='+ type +'&_order=publishdate',
		dataType:'json',
		success:function(data){
			var htmlArray = [];
			$.each(data.items,function(index, value){
				var href = typeHref + "?id="+value._id;
				htmlArray.push('<li><a href="'+ href +'" target="_blank">'+ value.title +'</a></li>')
			});
			
			$('.'+type).html(htmlArray.join(''));
		}
	})
}
DynamicCompany.prototype.getBiddingTitle = function(){
	$('.list-unstyled ').html('');
	var type = this.type;
	var typeHref = this.typeHref[type];
	$.ajax({
		url:'/cms/ws/0.1/content/news/list?start=0&count=5&type='+ type +'&_order=publishdate',
		dataType:'json',
		success:function(data){
			var htmlArray = [];
			$.each(data.items,function(index, value){
				var href = typeHref + "?id="+value._id;
				htmlArray.push('<li><span>'+ value.publishdate +'</span><s>中标公告</s><a href="'+ href +'" target="_blank">'+ value.title +'</a></li>')
			});
			
			$('.list-unstyled ').append(htmlArray.join(''));
		}
	})
}
DynamicCompany.prototype.getBiddedTitle = function(){
	var type = this.type;
	var typeHref = this.typeHref[type];
	$.ajax({
		url:'/cms/ws/0.1/content/news/list?start=0&count=5&type='+ type +'&_order=publishdate',
		dataType:'json',
		success:function(data){
			var htmlArray = [];
			$.each(data.items,function(index, value){
				var href = typeHref + "?id="+value._id;
				htmlArray.push('<li><span>'+ value.publishdate +'</span><u>公告通知</u><a href="'+ href +'" target="_blank">'+ value.title +'</a></li>')
			});
			
			$('.list-unstyled ').append(htmlArray.join(''));
		}
	})
}
function getQueryString(name) {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = decodeURI(window.location.href).split("?")[1].match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    } catch (e) {
        return null;
    }

}