//公共的功能函数及配置
//基于jquery开发的，需要先引入jquery
(function(){
    //placeholder兼容
    if(!("placeholder" in $("input"))){
        $("input[placeholder]").each(function(){
            var that=$(this);
            that.val(that.attr("placeholder")).on({
                focus:function(){
                    if(that.val()===that.attr("placeholder")){
                        that.val("");
                    }
                },
                blur:function(){
                    if($.trim(that.val())==""){
                        that.val(that.attr("placeholder"));
                    }
                }
            })
        })
    }

    //忽略空链接
    $('a[href="#"],a[href=""]').click(function(e) {
        e.preventDefault();
    });

	//判断对象
	if(typeof window.ZGTX==="undefined"){
		window.ZGTX={};
	}
	if(typeof ZGTX.utils==="undefined"){
		ZGTX.utils={}
	}

    if(typeof window.ZGTX.tools==="undefined"){
        ZGTX.tools={};
    }
    /**
     * 判断类型函数
     * @param obj
     * @returns  string number array object boolean function undefined null
     */
    ZGTX.tools.typeOf=function(obj){
        return Object.prototype.toString.call(obj).match(/\s(\w+)/)[1].toLowerCase();
    }
    //8种基本的js类型
    // var t1=1;
    // var t2='1';
    // var t3={};
    // var t4=[1,2];
    // var t5=true;
    // var t6;
    // var t7=null;
    // var t8=function(){

    // }
    // console.log(ZGTX.tools.typeOf(t1));
    // console.log(ZGTX.tools.typeOf(t2));
    // console.log(ZGTX.tools.typeOf(t3));
    // console.log(ZGTX.tools.typeOf(t4));
    // console.log(ZGTX.tools.typeOf(t5));
    // console.log(ZGTX.tools.typeOf(t6));
    // console.log(ZGTX.tools.typeOf(t7));
    // console.log(ZGTX.tools.typeOf(t8));

     /**功能组件 与ui相关*/
    ZGTX.Widget=function(){
        this.boudingBox = null; //属性：最外层容器
    }
    ZGTX.Widget.prototype={
        on:function(type,handler){
            if (typeof this.handlers[type]=='undefined') {
                this.handlers[type]=[];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire:function(type,data){
            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for(var i=0,len=handlers.length;i<len;i++){
                    handlers[i](data);
                }
            };
        },
        render:function(container){     //方法：渲染组件
            this.renderUI();
            this.handlers={};
            this.syncUI(container);

            this.bindUI();

        },
        destroyInternal:function(){
            this.boudingBox.off();
            this.boudingBox.remove();
        },
        destroy:function(){      //方法：销毁
            this.destructor();
            this.boudingBox.off();
            this.boudingBox.remove();
        },
        renderUI:function(){},  //接口：添加dom节点
        bindUI:function(){},    //接口：监听事件
        syncUI:function(container){},   //接口：初始化组件属性
        destructor:function(){
            if(this._mask)
                this._mask.remove();
		} //接口：销毁前的处理函数 外部的东西
    }
    ZGTX.utils.newpop=function(options){
        this.cfg = {
            width:558,
            height:245,
            title:'',
            titleSure:'',
            titleCancel:'',
            content:"",
            type:0,
            displeartime:3000,
            handler4Displear:"",
            hasCloseBtn:true,
            hasMask:true,
            hasScroll:true,
            dragHandle:".window_top",
            skinClassName:null,
            handler4CloseBtn:null,
            handler4CancleBtn:null,
            handler4SureBtn:null,
            eventHandler:null   //事件句柄 content内容之间的事件绑定
        };
    }
    ZGTX.utils.newpop.prototype= $.extend({},new ZGTX.Widget(),{
        renderUI:function(){
            var html='';
            switch(this.cfg.winType){
                case "delete":
                    var title=this.cfg.title||"确认删除";
                    var titleSure=this.cfg.titleSure||"确定";
                    var titleCancel=this.cfg.titleCancel||"取消";
                    html= '<div class="dialogTop"><span class="dialogTitle">'+title+'</span><a class="dialogClose oppcloseBtn fixiepng" title="关闭"></a></div>';
                    var contenttext=this.cfg.content||"确定要删除吗?";
                    this.cfg.content=
                        '<div class="dialogCon">'+
                        '<div class="windowText">'+contenttext+'</div>'+
                        '<div class="dialogBtnArea clearfix">'+
                        '<input type="button" class="mainSearchBtn J_sureBtn " value="'+titleSure+'"><input type="button" class="mainResetBtn btnLeft J_cancelBtn"   value="'+titleCancel+'">'+
                        '</div>'+
                        '</div>';
                    break;
                case "alert":
                    var title=this.cfg.title||"提示";
                    html= '<div class="dialogTop"><span class="dialogTitle">'+title+'</span><a class="dialogClose oppcloseBtn fixiepng" title="关闭"></a></div>';
                    var contenttext=this.cfg.content||"";
                    this.cfg.content=
                      '<div class="dialogCon">'+
                      '<div class="windowText">'+contenttext+'</div>'+
                      '<div class="dialogBtnArea clearfix">'+
                      '<input type="button" class=" mainSearchBtn J_cancelBtn"   value="关闭">'+
                      '</div>'+
                      '</div>';
                    break;
                default :
                    html='';
                    break;
            }
            this.boudingBox=$(
                    '<div class="windowWrap">'+
                    '<div class="window_top">'+html+'</div>'+
                    '<div class="window_body">'+this.cfg.content+'</div>'+
                    '</div>'
            )

            /*处理模态*/
            if (this.cfg.hasMask) {
                var window_height=$(document).height();
                this._mask = $('<div class="windowMask"></div>').css("height",window_height);
                this._mask.appendTo("body");
            }

        },
        bindUI:function(){
            var that = this;
            this.boudingBox.delegate(".oppcloseBtn","click",function(){
                that.fire('close');
                that.destroy();
            });
            if(this.boudingBox.find(".J_cancelBtn")[0]){
                this.boudingBox.delegate(".J_cancelBtn","click",function(){
                    that.fire('cancel');
                    that.destroy();
                })
            }
            if(this.boudingBox.find(".J_sureBtn")[0]){
                this.boudingBox.delegate(".J_sureBtn","click",function(){
                    that.fire('sure');
                    that.destroy();
                })
            }


            if (this.cfg.handler4CloseBtn) {
                this.on('close',this.cfg.handler4CloseBtn);
            };
            if(this.cfg.handler4Displear){
                this.on("displear",this.cfg.handler4Displear);
            }
            if(this.cfg.handler4CancleBtn){
                this.on("cancel",this.cfg.handler4CancleBtn);
            }
            if(this.cfg.handler4SureBtn){
                this.on("sure",this.cfg.handler4SureBtn);
            }
            this.on("height",function(){
                var scrollTop=$(window).scrollTop();
                var newtop=  (that.cfg.windowHeight-that.boudingBox.height())/2+scrollTop+(that.cfg.yfloat||0);
                that.boudingBox.css("top",newtop);
            })
            this.on("scroll",function(){
                $(window).on("scroll",function(){
                    that.fire("height");
                })
            })
            this.on("resize",function(){
                $(window).on("resize",function(){
                    that.fire("height");
                })
            })
            if(this.cfg.hasScroll){
                this.fire("scroll");
            }
            if(this.cfg.eventHandler){
                this.cfg.eventHandler.call(this);
            }
        },
        syncUI:function(container){
            this.cfg.windowScrollTop=$(document).scrollTop();
            this.cfg.windowHeight=$(window).height();
            //this.cfg.windowHeight=document.body.clientHeight;
            var float=this.cfg.yfloat||0;
            $(container||document.body).append(this.boudingBox);
            var y=(this.cfg.windowHeight-this.boudingBox.height())/2+this.cfg.windowScrollTop+float; // 相对于浏览器视图高度居中
            this.cfg.newy=y;
            //left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2) + 'px',height:this.cfg.height, 在这里为什么要设置高度呢?
            this.boudingBox.css({
                width:this.cfg.width + 'px',
                marginLeft:-(this.cfg.width/2),
                top:(this.cfg.y||y )+ 'px'
            });
            if (this.cfg.skinClassName) {
                this.boudingBox.addClass(this.cfg.skinClassName);
            };
        },

        displear:function(cfg,container){
            $.extend(this.cfg,cfg,{winType:"displear",skinClassName:"displear",isDraggable:false,hasMask:false});
            this.render(container);
            return this;
        },
        delcfm:function(cfg,container){
            $.extend(this.cfg,cfg,{winType:"delete",isDraggable:false});
            this.render(container);
            return this;
        },
        alert:function(cfg,container){
            $.extend(this.cfg,cfg,{winType:"alert",isDraggable:false});
            this.render(container);
            return this;
        }
    });
    // 弹窗组件 displear 对外的接口
    ZGTX.utils.displear=function(option,container){
        var options=$.extend({height:50,width:200},option);
        var newpop=new ZGTX.utils.newpop().displear(options,container);
        console.log(options);
        console.log(container);
        return newpop;
    }
    ZGTX.utils.delcfm=function(option,container){
        var options=$.extend({height:130,width:300},option);
        var newpop=new ZGTX.utils.newpop().delcfm(options,container);
        return newpop;
    }

    ZGTX.utils.alert=function(option,container){
        var options=$.extend({height:130,width:300},option);
        var newpop=new ZGTX.utils.newpop().alert(options,container);
        return newpop;
    }






    //toFixed的精度问题
    ZGTX.utils.Math={
        newtoFixed:function(num,s){
            var s=s||2;
            if(!num){
                return null;
            }
            var num=parseFloat(num);
            var s=s||2;
            var  changenum=(parseInt(num * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
            var   index=changenum.indexOf(".");
            if(index<0&&s>0){
                changenum=changenum+".";
                for(i=0;i<s;i++){
                    changenum=changenum+"0";
                }
            }else {
                index=changenum.length-index;
                for(i=0;i<(s-index)+1;i++){
                    changenum=changenum+"0";
                }
            }
            return changenum;
        }
    }


})(jQuery);

