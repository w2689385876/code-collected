 var _escape = function(string) {
        return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
    };
    var templateSettings = {
        evaluate    : /<%([\s\S]+?)%>/g,
        interpolate : /<%=([\s\S]+?)%>/g,
        escape      : /<%-([\s\S]+?)%>/g
    };
    var noMatch = /.^/;

    var template = function(str, data) {
        var c  = templateSettings;
        var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
            'with(obj||{}){__p.push(\'' +
            str.replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(c.escape || noMatch, function(match, code) {
                return "',_escape(" + unescape(code) + "),'";
            })
            .replace(c.interpolate || noMatch, function(match, code) {
                return "'," + unescape(code) + ",'";
            })
            .replace(c.evaluate || noMatch, function(match, code) {
                return "');" + unescape(code).replace(/[\r\n\t]/g, ' ') + ";__p.push('";
            })
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n')
            .replace(/\t/g, '\\t')
            + "');}return __p.join('');";
        var func = new Function('obj', '_escape', tmpl);
        if (data) return func(data, _escape);
        return function(data, _escape) {
            return func.call(this, data, _escape);
        };
    };
    
    (function () {
        var scr;
        $(function(){
            autoScrool();
            loginFn();
            
            /*
            //显示适配列表
            $.ajax({
                url: 'http://3gimg.qq.com/tencentMapTouch/lubao/hezi/cms/carStyle.js?ts=' + (new Date).getTime(),
                dataType: 'jsonp',
                jsonpCallback: 'cb',
                success: function (cars) {
                   $('#clsList').html(template($('#clsTpl').html(), {list: cars}));
                   $('#carList').html(template($('#carTpl').html(), {list: cars}));
                }
            });
            */
            function getClsList(brands){
                var list = [];
                for(var i=0; i< brands.length; i++){
                    var letter = brands[i].firstLetter.toUpperCase();
                    if($.inArray(letter, list)==-1){
                        list.push(letter);
                    }
                }
                return list.sort();
            }
            function getCarStyle(carStyle2){
                var output = {};
                var brands = carStyle2.brand;
                var serials = carStyle2.serial;
                for(var i=0; i< brands.length; i++){
                    var b = brands[i]; //品牌
                    var L = b.firstLetter.toUpperCase();
                    !output[L] && (output[L] = []); // {'A': []}
                    output[L].push(b);
                }
                for(var j=0; j< serials.length; j++){
                    var c = serials[j]; //车系
                    c.year = String(c.modelYears).replace(/,/g, '、');
                    var b = getBrandById(output, c.manufacturerID);
                    !b['serial'] && (b['serial'] = []);
                    b['serial'].push(c);
                }
                return output;
            }
            function getBrandById(output, bid){
                for(var i in output){
                    var arr = output[i];
                    for(var k=0; k<arr.length; k++){
                        var b = arr[k];
                        if(bid == b.id){
                            return b;
                        }
                    }
                }
            }
            //显示适配列表
            $.ajax({
                url: 'http://3gimg.qq.com/tencentMapTouch/lubao/hezi/cms/carStyle2.js?ts=' + (new Date).getTime(),
                dataType: 'jsonp',
                jsonpCallback: 'cb',
                success: function (carStyle2) {
                    var clsList = getClsList(carStyle2.brand);
                    $('#clsList').html(template($('#clsTpl').html(), {list: clsList}));
                    var cars = getCarStyle(carStyle2);
                    $('#carList').html(template($('#carTpl').html(), {list: cars}));
                }
            });
            
            
            $("#check-list").on("click", "a", function () {

                $("#check-list a").removeClass("click_active")
                $(this).addClass("click_active");
                var thisName = $(this).text();

                $(".th").find("a").each(function () {
                    if ($(this).text().indexOf($.trim(thisName)) != -1) {
                        var scroolT = $(this).offset().top - scr - 100;
                        if (scroolT === scr)  return;

                        $('body, html').animate({scrollTop: scroolT });
                    }

                })
            });

            var header_left = $('#page_header').offset().left;
            $('#page_header').css('margin-left', '-' + header_left);
            
            var $curBox;
            $('#carList').on('click', '.car', function(){
                $curBox && $curBox.hide();
                $curBox = $(this).next();
                $curBox.show();
                return false;
            });
            
            $('#carList').on('click', '.icon-beizhu', function(){
                $curBox && $curBox.hide();
                
                return false;
            });
            
            $(document).on('click', function(){
                $('.cord-box').hide();
            })
        })
        
        $(window).resize(function () {
            autoScrool();
        })

        function autoScrool() {
            scr = $("#check-list").height();
            $("body").css({
                "padding-top": scr + 100
            })
        }

        function getCookie(Name) {
            var search = Name + "="
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(search)
                if (offset != -1) {
                    offset += search.length
                    end = document.cookie.indexOf(";", offset)
                    if (end == -1) end = document.cookie.length
                    return unescape(document.cookie.substring(offset, end))
                }
                else return ""
            }
        };
        
        function loginFn() {
            $(".login-link").click(function () {
                if (getCookie("user_id") != null) {
                    window.qq_login && window.qq_login.login();
                    return false;
                }
            })
        }
        
        //显示通知消息
         $.ajax({
            url: 'http://3gimg.qq.com/tencentMapTouch/lubao/hezi/cms/msg.js?ts=' + (new Date).getTime(),
            dataType: 'jsonp',
            jsonpCallback: 'cb2',
            success: function (resp) {
                if(resp && resp.isShow){
                    $('#msgList').html(template($('#msgTpl').html(), {list: resp.msgs})).show();
                }
            }
        });
    })()