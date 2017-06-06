/**
 * Created by Administrator on 2017/5/17 0017.
 */
$(function ($) {
//点击事件


    $(window).scroll(function(){
        // console.log($(window).scrollTop());
        if($(window).scrollTop()>430){
            $(".jrfw_topnav").show();

        }else{
            $(".jrfw_topnav").hide();
        }
        var jrfw_fwfw=$("#jrfw_fwfw").offset().top-50;  //475
        var jrfw_fwlc=$("#jrfw_fwlc").offset().top-50;   //720
        var jrfw_sqcl=$("#jrfw_sqcl").offset().top-50;  //1337
        var jrfw_fwzxdh=$("#jrfw_fwzxdh").offset().top-50; //1692
        var jrfw_fwxy=$("#jrfw_fwxy").offset().top;
        var jrfw_fwxy_h=jrfw_fwxy+$('.jrfw_xyBox').height()+$('#jrfw_fwxy').height();
        // console.log(jrfw_fwzxdh);
        //滚动移动到相应的位置区间，添加li菜单样式
         if(($(window).scrollTop()>jrfw_fwfw)&&($(window).scrollTop()<jrfw_fwlc)){
             //console.log($(document).height() - $(window).height());  //滚动条底部位置
            // console.log($(document).scrollTop());  //滚动条距离上面的位置
             if ($(document).scrollTop() <$(document).height() - $(window).height()) {
                 $(".jrfw_mainbav  .jrfw_fwfw").addClass("lis").siblings().removeClass("lis");
             }
        }
         else if(($(window).scrollTop()>jrfw_fwlc)&&($(window).scrollTop()<jrfw_sqcl)){
             if ($(document).scrollTop() < $(document).height() - $(window).height()) {
                 $(".jrfw_mainbav  .jrfw_fwlc").addClass("lis").siblings().removeClass("lis");
             }
         }
         else if(($(window).scrollTop()>jrfw_sqcl)&&($(window).scrollTop()<jrfw_fwzxdh)){
             if ($(document).scrollTop() < $(document).height() - $(window).height()) {
                 $(".jrfw_mainbav  .jrfw_sqcl").addClass("lis").siblings().removeClass("lis");
             }

         }
         else if(($(window).scrollTop()>jrfw_fwzxdh)&&($(window).scrollTop()<jrfw_fwxy)){
             if ($(document).scrollTop() < $(document).height() - $(window).height()) {
                 $(".jrfw_mainbav  .jrfw_fwzxdh").addClass("lis").siblings().removeClass("lis");
             }

        }
         else if(($(window).scrollTop()>jrfw_fwxy)&&($(window).scrollTop()<jrfw_fwxy_h)){
             if ($(document).scrollTop() < $(document).height() - $(window).height()) {
                 $(".jrfw_mainbav  .jrfw_fwxy").addClass("lis").siblings().removeClass("lis");
             }
         }
    });
//点击菜单，滚动到指定位置
    $('.jrfw_mainbav  li,.jrfw_topnav .jrfw_mainbav li').each(function() {
        $(this).click(function() {
            // $(".jrfw_mainbav li").removeClass("lis");
            var href1=$(this).attr('class');
            $("."+href1).addClass("lis").siblings().removeClass("lis");
            // // console.log(href1);
            var scrollT=$("#"+href1).offset().top-30;
            // // console.log(scrollT);
            $("body").scrollTop(scrollT);
        })
    });
    //默认回到底部
    var scrollTo=$("#jrfw_fwxy").offset().top-30;
    $(".jrfw_fwxy").addClass("lis").siblings().removeClass("lis");
    $("body").scrollTop(scrollTo);
    //回到顶部
    var offset = 100,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('cd-fade-out');
        }
    });
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0
            }, scroll_top_duration
        );
    });
});
