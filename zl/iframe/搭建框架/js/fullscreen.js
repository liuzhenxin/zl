/**
 * Created by yhsl on 2017/6/2.
 */
$(function () {
    var html='';
    html+="<div id='fullscreen' style='position: fixed;top: 50px;right: 30px;z-index: 2147483647;cursor: default;'><img src='images/fullscreen.png'></div>";
    $("body").before(html);

    $('#fullscreen').click(function () {
        if(!$('.left-main .left-full').is(':hidden')){  //缩小
            location.reload();//重新加载界面
            $('.left-main').hide();  //左边框隐藏
            $('.navbar-default').hide(); //头部隐藏
            $('.right-full').css({left:'0'});   //右边内容
            $('.down-main').css({top:'0'});  //容器回到顶部
            $('#fullscreen').css({
                top:'5px'
            });
        }else{
            location.reload();//重新加载界面
            $('.down-main').css({top:'50px'});//容器距离顶部
            $('.right-full').css({left:'181px'});   //右边内容
            $('.left-main').show();  //左边框显示
            $('.navbar-default').show(); //头部显示
            $('#fullscreen').css({
                top:'55px'
            });
        }


        if(!$('.left-main .left-off').is(':hidden')){  //缩小
            location.reload();//重新加载界面
            $('.left-main').hide();  //左边框隐藏
            $('.navbar-default').hide(); //头部隐藏
            $('.right-off').css({left:'0'});   //右边内容
            $('.down-main').css({top:'0'});  //容器回到顶部
            $('#fullscreen').css({
                top:'5px'
            });
        }else{
            location.reload();//重新加载界面
            $('.down-main').css({top:'50px'});//容器距离顶部
            $('.right-off').css({left:'48px'});   //右边内容
            $('.left-main').show();  //左边框显示
            $('.navbar-default').show(); //头部显示
            $('#fullscreen').css({
                top:'55px'
            });
        }
    });
    $('#fullscreen').hover(function(){
        $('#fullscreen').css("cursor","pointer");
    },function(){
        $('#fullscreen').css("cursor","default");
    });

});


if($('.left-main').hasClass('left-full')){
    location.reload();//重新加载界面
    if($('.left-main').css('display')== 'block'){  //缩小
        $('.left-main').hide();  //左边框隐藏
        $('.navbar-default').hide(); //头部隐藏
        $('.right-full').css({left:'0'});   //右边内容
        $('.down-main').css({top:'0'});  //容器回到顶部
        $('#fullscreen').css({
            top:'5px'
        });
    }else if($('.left-main').css('display')== 'none'){
        $('.down-main').css({top:'50px'});//容器距离顶部
        $('.right-full').css({left:'181px'});   //右边内容
        $('.left-main').show();  //左边框显示
        $('.navbar-default').show(); //头部显示
        $('#fullscreen').css({
            top:'55px'
        });
    }
}else{
    console.log(222);
    if($('.left-main').css('display')== 'block'){  //缩小
        alert(333);
    }else if($('.left-main').css('display')== 'none'){
        alert(444);
    }
}


setTimeout(function () {
    document.getElementById('iframe0').contentWindow.location.reload(true);
},1000);

