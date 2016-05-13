$.fn.imgtransition = function(o){

	var defaults = {

		speed : 5000,

		animate : 1000

	};

	o = $.extend(defaults, o);



	return this.each(function(){

		var arr_e = $("ul", this);
		var arr_div = $(".disc-ban", this);
		arr_e.each(function(){
			arr_div.append("<a href='javascript:;'></a>");
		});
		arr_div.find("a").mouseover(shownow);

		arr_e.css({position: "absolute"});

		arr_e.parent().css({margin: "0 auto", padding: "0", "list-style": "none", overflow: "hidden"});



		function shownext(){

			var active = arr_e.filter(".active").length ? arr_e.filter(".active") : arr_e.first();

			var next =  active.next("ul").length ? active.next() : arr_e.first();

			active.css({"z-index": 8});

			next.css({opacity: 0.0, "z-index": 9}).addClass('active').animate({opacity: 1.0}, o.animate, function(){

				active.removeClass('active').css({"z-index": 7});

			});
			arr_div.find("a").eq(next.index()).addClass("activeSlide").siblings().removeClass("activeSlide");

		}
		function showprev(){

			var active = arr_e.filter(".active").length ? arr_e.filter(".active") : arr_e.first();

			var next =  active.prev("ul").length ? active.prev() : arr_e.last();

			active.css({"z-index": 8});

			next.css({opacity: 0.0, "z-index": 9}).addClass('active').animate({opacity: 1.0}, o.animate, function(){

				active.removeClass('active').css({"z-index": 7});

			});
			arr_div.find("a").eq(next.index()).addClass("activeSlide").siblings().removeClass("activeSlide");

		}
		function shownow(){
			
			var active = arr_e.filter(".active").length ? arr_e.filter(".active") : arr_e.first();

			var next =  arr_e.eq($(this).index());

			active.css({"z-index": 8});

			next.css({opacity: 0.0, "z-index": 9}).addClass('active').animate({opacity: 1.0}, o.animate, function(){

				active.removeClass('active').css({"z-index": 7});

			});
			arr_div.find("a").eq(next.index()).addClass("activeSlide").siblings().removeClass("activeSlide");
		}



		arr_e.first().css({"z-index": 8});
		arr_div.find("a").first().addClass("activeSlide").siblings().removeClass("activeSlide");

		var newInterval = setInterval(function(){

			shownext();

		},o.speed);          
		$(this).hover(function(){
			clearInterval(newInterval);
		},function(){
			newInterval = setInterval(function(){
				shownext();
			},o.speed);
		});

		$(this).find(".next_pic").click(function(){
			shownext();
		});
		$(this).find(".prev_pic").click(function(){
			showprev();
		});
		

	});

};