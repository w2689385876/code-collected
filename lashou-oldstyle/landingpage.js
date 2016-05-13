$(function(){   
    $(document).ready(function() {
        //初始化选中
        $('.lp_joblist table').each(function(){
            if($(this).attr('data')=='hover'){
                $(this).show().siblings().hide();
            }
        });
    }); 
  //根据浏览器大小，适配样式
  var height = $(window).height();
  if(height < 670){
    $(".footer").css("height","55px");
    $(".footer").css("padding-top","11px");
    $(".footer").css("position","static");
    $(".middle .bg").css("position","absolute");
  } 
  //二维码
  $(".show_ma").mouseenter(function(){
      $(".ma").show();
  });
  $(".show_ma").mouseleave(function(){
      $(".ma").hide();
  })
    
   $(".show_qiyeban").click(function(){
        window.location.href="http://hr.lagou.com/";
    });
  //关闭卡片
  $(".job_box,.comp_box").on("click",".close",function(event){
      event.stopPropagation();
      $(this).closest("div").hide();
    });
    $('#lp_email').focus(function(){
        $('#lp_beError').hide();
    });
  /*出现萌版*/
  $(".left").on("click",".comp_box,.job_box,.yipai",function(e){
    e.stopPropagation();
    $(".comp_box").hide();
    $(".job_box").hide();
    $(".shade").show();
    $(".close2").show();
  });
  $(".left").on("click",".yipai,.model",function(){
    $(".yipai-shade").show();
    $(".close2").show();
    $(".comp_box").hide();
    $(".job_box").hide();
  });
  //萌版消失

  $(".close2").click(function(){
    $(".yipai-shade").hide();
    $(".shade").hide();
    $(".close2").hide();
  });
 
  //人才拍卖
  $(".show_yipai").click(function(){
    var htmlStr = '<img class="close2 aleft" src="../images/close2.png"><img class="yipai-shade" src="../images/shade.png"><img src="../images/yipai.png" class="yipai">';      
    $(".left").html(htmlStr);
    $(".close2").click(function(){
    $(".yipai-shade").hide();
    $(".shade").hide();
    $(".close2").hide();
  });
  });

    /**复选框**/
    $('.lp_agreeNotice').click(function(){
        if($('#lp_agreeNotice').prop('checked')){
            $('.lp_agreeNotice em').css('backgroundPosition','0px 0px');
            $('#lp_agreeNotice').prop('checked',false);
            $('.lp_agreeNotice').next('span').show();
        }else{
            $('#lp_agreeNotice').prop('checked',true);
            $('.lp_agreeNotice').next('span').hide();
            $('.lp_agreeNotice em').css('backgroundPosition','0px -12px');
            
        }
    });
    /*var timer = null;
    $('.joblist_nav li').mouseover(function(){
        var index = $(this).index(); 
        var _this = $(this);
        timer = setInterval(function(){
            _this.addClass('hover').siblings().removeClass('hover');
            $('.lp_joblist table').eq(index).show().siblings().hide();
        },200);

        $.ajax({
            url:  'positionComp.json',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
                alert(data.length);
            },
            error: function() {
                alert(url);
            }
        });
    }).mouseout(function(){
        clearInterval(timer);
    });*/
    function mouseover(company){
        if(company.find('i').length>0){
           company.find('i').show();
        }else{
            company.addClass('hover');
        }    
     }
     function mouseout(company){
        if(company.find('i').length>0){
           company.find('i').hide();
        } else{
          company.removeClass('hover');
        }
     }
     /**companylist**/
     $('.companylist li').css('opacity','0.5');
     $('.companylist li').hover(function(){  
         $(this).css({'opacity':'1','color':'#fff'});
     },function(){
          $(this).css('opacity','0.5');  
     });
     $('.lp_footer_qr').hover(function(){
       mouseover($(this));
     },function(){
       mouseout($(this));
     });
     $('.lp_c1 tr:not(".borderbottom")').hover(function(){
       mouseover($(this));
     },function(){
       mouseout($(this));
     });
     $('#lp_email').focus(function(){
         $('#beError').hide();
       });
     /**注册表单验证**/
       $('#lp_loginform').validate({
         rules: {
             email: {
               required: true,
               email: true,
               maxlength:100
             },
             password: {
               required: true,
               rangelength: [6,16]
             },
             checkbox:{required:true}
         },
         messages: {
           email: {
               required: "请输入常用邮箱地址",
               email: "请输入有效的邮箱地址，如：vivi@lagou.com",
               maxlength:"请输入100字以内的邮箱地址"
             },
             password: {
               required: "请输入密码",
               rangelength: "请输入6-16位密码，字母区分大小写"
             },
             checkbox: {
               required: "请接受拉勾用户协议"
             }
         },
         errorPlacement:function(label, element){
           if(element.attr("type") == "radio"){
             label.insertAfter($(element).parents('ul')).css('marginTop','-20px');
           }else if(element.attr("type") == "checkbox"){          
               label.insertAfter($(element).parent()).css('clear','left');
             label.css('margin','-6px 0 5px 0');
           }else{
             label.insertAfter(element);
             label.css('margin','-10px 0 5px 0');
           };  
         },
         
         submitHandler:function(form){
           var email =$.trim($('#lp_email').val());
           var password =$('#lp_password').val();
           var vcode = $('#lp_vcode').val();
           var ctx = 'http://passport.lagou.com';
           $(form).find(":submit").attr("disabled", true);
           //type=1默认为企业用户
               $.ajax({
                 type:'POST',
                 data: {email:email,password:password,type:0,verifyCode:vcode},
                 url:ctx+'/register/register.json',
                 dataType:'json'
               }).done(function(e) {
                  if(1==e.state){
                       window.location.href="/grantServiceTicket/grant.html";                      
                   }else{
                       var msg = '';
                       if(240==e.state){
                           msg = "请输入常用邮箱地址";
                       }else if(210==e.state){
                           msg = "请输入100字以内的邮箱地址";
                       }else if(220==e.state){
                           msg = "请输入有效的邮箱地址，如：vivi@lagou.com";
                       }else if(241==e.state){
                           msg = "请输入密码";
                       }else if(211==e.state){
                           msg = "请输入6-16位密码，字母区分大小写";
                       }else if(243==e.state){
                           msg = "请选择使用拉勾的目的";
                       }else if(400==e.state){
                           msg = "该邮箱已被注册，请重新输入或直接登录";
                       }else if(299==e.state){
                           msg = "你的操作太过频繁，请稍后再试";
                       }else if(244==e.state){
                           if($("#vcode_div").is(":visible")){
                               $('#lp_vcodeError').text("验证码错误").show();
                           }
                           $("#vcode_div").show();
                           $(form).find(":submit").attr("disabled", false);
                           return;
                       }else if(402==e.state){
                       msg = "验证超时异常，请稍后再试";
                     }else if(403==e.state){
                       msg = "注册失败，未知的注册类型(暂时只支持邮箱和手机号注册)";
                     }else if(498==e.state){
                       msg = " 注册失败，请联系管理员，错误码498";
                     }else if(499==e.state){
                       msg = " 注册失败，请联系管理员，错误码499";
                     }else if(502==e.state){
                       msg = "注册失败，系统内部错误";
                     }else if(10011==e.state){
                       msg = "操作太频繁，请稍后再试";
                     }else if(10012==e.state){
                       msg = "永久封禁";
                     }else{
                           msg = "网络异常，请刷新重试";
                       }
                     $("#lp_email").next().text(msg).show();
                   }
                   $(form).find(":submit").attr("disabled", false);                    
               });
           }  

       })
})
