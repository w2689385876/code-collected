(function () {
    window.qqNumber = "";
    document.domain = "qq.com";
    /* 坐标获取 */
    var position = {
        getScroll: function (o) {
            if (o) {
                var scrTop = o.scrollTop();
            } else {
                var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
            }
            return scrTop;
        },
        getObj: function (o) {
            if (o) {
                return {width: o.outerWidth(), height: o.outerHeight()};
            }
            return {width: document.body.clientWidth, height: document.body.clientHeight};
        },
        getView: function () {
            return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
        },
        centerPosition: function (o) {
            var left = (position.getView().width - position.getObj(o).width) / 2,
                top = (position.getView().height - position.getObj(o).height) / 3 + position.getScroll();
            return {x: left, y: top};
        },
        getBg: function () {
            if (document.documentElement.clientHeight > document.body.clientHeight) {
                return position.getView()
            } else {
                return position.getObj();
            }
        }
    };
    window.positionApi = position;
    /* 获取数据 */
    window.getJson = function (url, cb) {
        var s = document.createElement("script");
        s.src = url;
        s.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(s);
        /* IE JS加载判断 */
        if (s.readyState) {
            s.onreadystatechange = function () {
                if (s.readyState == 'loaded') {
                    cb && cb(s);
                    setTimeout(function () {
                        document.getElementsByTagName("head")[0].removeChild(s);
                    }, 100);
                }
            }
        } else {
            /* 标准浏览器JS加载判断 */
            s.onload = function () {
                cb && cb(s);
                setTimeout(function () {
                    document.getElementsByTagName("head")[0].removeChild(s);
                }, 100);
            }
        }
    };
    /* 显示遮盖层 */
    window.showDeck = function () {
        var p = position.getBg();
        $("#J_showDeck").remove();
        $("body").append('<div class="showDeck" id="J_showDeck"></div>');
        $("#J_showDeck").show().css({width: p.width, height: p.height});

    }
    /* 隐藏浮层 */
    window.hidePopup = function () {
        $("#J_editkey_popup").hide();
        $("#J_showDeck").hide();
    }
    /* 检测登录 */
    window.checkAuth = function (doc, cb) {
        doc = doc || document;
        var node = doc.createElement('script');
        var head = doc.getElementsByTagName("head")[0];
        cb = cb || 'chk';
        node.setAttribute('type', 'text/javascript');
        node.setAttribute('charset', 'gbk');
        node.src = "http://user.map.qq.com/?action=login&cb=" + cb + "&sk=" + window.getSK();
        head.insertBefore(node, head.firstChild);
    };
    window.chk = function (data) {
        if (typeof data == 'object' && data.info && data.info.type == "2" && data.detail && data.detail.qq) {
            qqNumber = data.detail.qq;
            qq_login.closeLoginPopup();
            chk.cb && chk.cb();
            /* 我的KEY页面添加登陆后回调 */
//            console.log(data)
            document.cookie = "qqNum" + "="+ escape (data.detail.qq);
            $("#J_loginstatus").html('<a href="javascript:void(0);">您好，' + data.detail.nick + '</a><a href="javascript:void(0);" onclick="qq_login&&qq_login.logout();return false;">[退出]</a>');
        }
    }
    window.getSK = function () {
        var c = document.cookie;
        var s = c.match(new RegExp("(^| )skey=([^;]*)(;|$$)"));
        var l = c.match(new RegExp("(^| )lskey=([^;]*)(;|$$)"));
        var sk = (s && s[2] && s[2] != 'null') ? s[2] : ((l && l[2] && l[2] != 'null') ? l[2] : "");
        return sk;
    };
    /* 登录 */
    window.qq_login = {
        login: function () {
            var loginContent = [
                '<div id="login_mengban" style="background: url(img/mengban.png);z-index: 101;position: fixed;top: 0;left: 0;width: 100%;height: 100%;">',
                '<div id="login_div" align="center" style="position:absolute;z-index:102;width:490px;height:328px">',
                '<iframe id="login_frame" name="login_frame" frameborder="0" scrolling="no" width="100%" height="100%" src="http://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=678012301&s_url=http%3A%2F%2Fmap.qq.com%2Flubao%2Fhezi%2F&style=&proxy_url=http%3A%2F%2Fplatform.server.com%2Fproxy.html">',
                '</iframe></div></div>'
            ].join('');
            $("body").append(loginContent);
            var p = position.centerPosition($("#login_div"));
            $("#login_div").show().css({left: p.x, top: p.y});
            showDeck();
            /* iframe加载完成后绑定事件 */
            $("#login_frame").load(function () {
                /*$(window.frames["login_frame"].document).find("#close").click(function () {
                    qq_login.closeLoginPopup();

                });*/
            });
        },
        /* 登出 */
        logout: function () {
            getJson('http://user.map.qq.com/?action=logout&cb=chk&sk=' + window.getSK(), function (s) {
                window.location.reload();
            });
        },
        /* 关闭登录浮层 */
        closeLoginPopup: function () {
            $("#login_div").hide();
            $("#login_mengban").hide();

            $("#J_showDeck").hide();
            /* fix IE7,8提示关闭网页BUG */
            setTimeout(function () {
                $("#login_div").remove();
                $("#login_mengban").remove();
            }, 20)

        }
    };
    
        function ptlogin2_onResize(width, height) {
        //获得浮动Div对象
        login_wnd = document.getElementById("login_div");
        if (login_wnd)	{
            //重新设置大小注意，一定要加px，否则firefox下有问题
            login_wnd.style.width = width + "px";
            login_wnd.style.height = height + "px";
        //最好重新调整登录框的位置， 这儿略....
            //先隐藏，在显示，这样可以避免滚动条的出现
            login_wnd.style.visibility = "hidden"
            login_wnd.style.visibility = "visible"
        }
    }
    function ptlogin2_onClose(){
        //弹出Iframe方式的范例
        login_wnd = document.getElementById("login_div");	
        login_wnd.style.display="none"
       $("#login_div").hide();
        $("#login_mengban").hide();

        $("#J_showDeck").hide();
        /* fix IE7,8提示关闭网页BUG */
        setTimeout(function () {
            $("#login_div").remove();
            $("#login_mengban").remove();
        }, 20)
    }
               
                   
    if (typeof window.postMessage !== 'undefined') {
        window.onmessage = function(event) {
            var msg = event || window.event; // 兼容IE8
            var data;
            if (typeof  JSON !== 'undefined') // IE7兼容模式不存在JSON对象
                data = JSON.parse(msg.data);
            else
                data = str2JSON(msg.data);

            switch (data.action) {
                case 'close':
                ptlogin2_onClose();
                break;

                case 'resize':
                ptlogin2_onResize(data.width, data.height);
                break;

                default: //什么也不做，便于我们扩展接口
                break;
            }
            // 考虑到ptlogin接口的扩展性，希望业务在对于data.action的条件处理也要保持一定的可扩展性
            // 如不要采用：data.action == 'resize' ? ptlogin2_onResize(data.width, data.height) : ptlogin2_onClose()
            // 一旦ptlogin支持了新的接口，那么该代码将会无法正常工作，影响业务正常使用
        }
    } else { //不支持postMessage的IE6，7 hack方法
        navigator.ptlogin_callback = function(msg) {
            var data = str2JSON(msg);
            switch (data.action) {
                case 'close':
                    ptlogin2_onClose();
                    break;
                case 'resize':
                    ptlogin2_onResize(data.width, data.height);
                    break;

                default: //什么也不做，便于我们扩展接口
                    break;
            }
        }
    }
    /**
     * [str2JSON 降字符串转换成json对象（供业务参考）]
     * @param  {String} str [json字符串]
     * @return {Object}
     */
    function str2JSON(str) {
        return eval(str);
    }


    /* 检测登录 */
    checkAuth();
})();
