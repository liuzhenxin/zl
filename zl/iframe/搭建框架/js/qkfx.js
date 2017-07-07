/**
 * Created by yhsl on 2017/5/12.
 */

var left=document.getElementById('qkfx_left');
var right=document.getElementById('qkfx_right');
var qkfx_pent=document.getElementById('qkfx_pent');
var qkfx_next=document.getElementById('qkfx_next');
var data=['2002','2004','2005','2006','2007','2008','2009','2010','2011','2012','2014','2015','2016','2017','2018'];
//左边
$(left).bind('click',function(){
    if((qkfx_pent.innerText)>data[1]){
        qkfx_pent.innerText=qkfx_pent.innerText-1;
        qkfx_next.innerText=qkfx_next.innerText-1;
        $('.list_right #qkfx_right images').attr('src','images/qkfx_right.png');
        $('#qkfx_next').css({"background":"white)",color:'#50adef','border':'1px solid #50adef'});
        // $('#qkfx_next').css({"background-image":"url(images/qkfx_4.png)",color:'white'});
    }else if((qkfx_pent.innerText)>data[0]){
        qkfx_pent.innerText=qkfx_pent.innerText-1;
        qkfx_next.innerText=qkfx_next.innerText-1;
        $('.list_left #qkfx_left images').attr('src','images/qkfx_left1.png');
        $('#qkfx_pent').css({"background":"white)",color:'#b7b7b7','border':'1px solid #b7b7b7'});

        // $('#qkfx_pent').css({"background-image":"url(images/qkfx_right_4.png)",color:'#b7b7b7'});
    }
});
//右边
$(right).bind('click',function(){
    if( (qkfx_next.innerText)<data[data.length-2]){
        qkfx_pent.innerText=parseInt(qkfx_pent.innerText)+1;
        qkfx_next.innerText=parseInt(qkfx_next.innerText)+1;
        $('.list_left #qkfx_left images').attr('src','images/qkfx_left.png');
        $('#qkfx_pent').css({"background":"white)",color:'#50adef','border':'1px solid #50adef'});
        // $('#qkfx_pent').css({"background-image":"url(images/qkfx_4.png)",color:'white'});
    }else if((qkfx_next.innerText)<data[data.length-1]){
        qkfx_pent.innerText=parseInt(qkfx_pent.innerText)+1;
        qkfx_next.innerText=parseInt(qkfx_next.innerText)+1;
        $('.list_right #qkfx_right images').attr('src','images/qkfx_right1.png');
        // $('#qkfx_next').css({"background-image":"url(images/qkfx_right_4.png)",color:'#b7b7b7'});
        $('#qkfx_next').css({"background":"white)",color:'#b7b7b7','border':'1px solid #b7b7b7'});
    }
});


var hover = $('.yue .list .hover');
var ysc=$('.yue .list li .ysc');

//添加下载
var str="<div class='yidong_box'><div class='yidong_bg'><images src='images/yidong_xz.png' alt=''> <span>下载</span></div></div>";
for(var i=0,len=hover.length;i<=len;i++){
    hover.eq(i).prepend($(str));
}

var index;
hover.mouseover(function(){
    index =hover.index(this);
    console.log(index);
    $('.qkfxBox_top .yue .list .hover').eq(index).css({paddingTop:'0'});
    $('.yidong_bg').click(function () {  //点击下载
        var aa='images/qkfx_yxz.png';  //下载完成后图片
        ysc.eq(index).attr('src',aa);
    });
    $(".yidong_box").eq(index).css({display:"block"});
});

hover.mouseout(function(){
    index=hover.index(this);
    $(".yidong_box").eq(index).css({display:"none"});
    $('.qkfxBox_top .yue .list li').css({paddingTop:'4%'});
});

//下标圆点
var myMonth = new Date().getMonth();  //获取当前月份 0代表1月
var marginLeft=myMonth*8.3333+'%';
$(".ydong_box").css({marginLeft:marginLeft});
    


/*


var zyid="null";   //服务资源id
$(document).ready(function() { //动态生成li
    var a=[0,0,0,0,0,0,0,0,0,0,0,0];  //状态数组
    var isthisyear=true;
    var date=new Date;
    var month=date.getMonth()+1;
    if(isthisyear){
        $('.list_right #qkfx_right img').attr('src','images/qkfx_right1.png');
        $('#qkfx_next').css({"background-image":"url(images/qkfx_right_4.png)",color:'#b7b7b7'});
        for(var i=0;i<12;i++){
            if(i<month){
                if(a[i] == '1'){
                    $("#zhuangtai").append(" <li class='hover '><img class='ysc' src='images/qkfx_1.png'  ></li>");
                    $("#yuefen").append(" <li  class='yuefen'>"+(i+1)+"月</li>");
                }else if(a[i] == '0'){
                    $("#zhuangtai").append(" <li ><img src='images/qkfx_wsc.png'  ></li>");
                    $("#yuefen").append(" <li class='list1_red '>"+(i+1)+"月</li>");
                }
            }else{
                $("#zhuangtai").append(" <li ><img src='images/qkfx_5.png'  ></li>");
                $("#yuefen").append(" <li >"+(i+1)+"月</li>");
            }
        }
    }else{
        $('.list_right #qkfx_right img').attr('src','images/qkfx_right.png');
        $('#qkfx_next').css({"background-image":"url(images/qkfx_4.png)",color:'white'});
        for(var i=0;i<12;i++){
            if(a[i] == '1'){
                $("#zhuangtai").append(" <li class='hover '><img class='ysc' src='images/qkfx_1.png'  ></li>");
                $("#yuefen").append(" <li  class='yuefen'>"+(i+1)+"月</li>");
            }else if(a[i] == '0'){
                $("#zhuangtai").append(" <li ><img src='images/qkfx_wsc.png'  ></li>");
                $("#yuefen").append(" <li class='list1_red '>"+(i+1)+"月</li>");
            }else{

            }
        }
    }
});

var left=document.getElementById('qkfx_left');
var right=document.getElementById('qkfx_right');
var qkfx_pent=document.getElementById('qkfx_pent');
var qkfx_next=document.getElementById('qkfx_next');
var data=['2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
//左边
$(left).bind('click',function(){
    var year=qkfx_pent.innerText;
    if((qkfx_pent.innerText)>data[1]){
        $('.list_right #qkfx_right img').attr('src','images/qkfx_right.png');
        $('#qkfx_next').css({"background-image":"url(images/qkfx_4.png)",color:'#b7b7b7'});
        reloaddiv(zyid,year);
    }else if((qkfx_pent.innerText)==data[1]){
        $('.list_left #qkfx_left img').attr('src','images/qkfx_left1.png');
        $('#qkfx_pent').css({"background-image":"url(images/qkfx_right_4.png)",color:'#b7b7b7'});
    }
});
//右边
$(right).bind('click',function(){
    var year=parseInt(qkfx_pent.innerText)+2;
    console.log(year);
    if( (qkfx_next.innerText)==data[data.length-2]){
        qkfx_pent.innerText=parseInt(qkfx_pent.innerText)+1;
        qkfx_next.innerText=parseInt(qkfx_next.innerText)+1;
        $('.list_left #qkfx_left img').attr('src','images/qkfx_left.png');
        $('#qkfx_next').css({"background-image":"url(images/qkfx_4.png)",color:'white'});
        reloaddiv(zyid,year);
    }else if((qkfx_next.innerText)<data[data.length-1]){
        qkfx_pent.innerText=parseInt(qkfx_pent.innerText)+1;
        qkfx_next.innerText=parseInt(qkfx_next.innerText)+1;
        $('.list_right #qkfx_right img').attr('src','images/qkfx_right.png');
        $('#qkfx_pent').css({"background-image":"url(images/qkfx_right_4.png)",color:'#b7b7b7'});
        reloaddiv(zyid,year);
    }

});


var hover = $('.yue .list .hover');
var ysc=$('.yue .list li .ysc');

//添加下载
var str="<div class='yidong_box'><div class='yidong_bg'><img src='images/yidong_xz.png' alt=''> <span>下载</span></div></div>";
for(var i=0,len=hover.length;i<=len;i++){
    hover.eq(i).prepend($(str));
}

var index;
var index2;
hover.mouseover(function(){
    index =hover.index(this);
    var intext=$('.qkfxBox_top  .list1 .yuefen').eq(index).text();
    index2=intext.substring(0,intext.length-1);
    $('.qkfxBox_top .yue .list .hover').eq(index).css({paddingTop:'0px'});
    $('.yidong_bg').click(function () {  //点击下载
        fileload(index2,parseInt(qkfx_pent.innerText));
    });
    $(".yidong_box").eq(index).css({display:"block"});
});

hover.mouseout(function(){
    index=hover.index(this);
    $(".yidong_box").eq(index).css({display:"none"});
    $('.qkfxBox_top .yue .list li').css({paddingTop:'49px'});
});
function fileload(month,year){   //文件下载
    window.location.href="/newdzzwpt/monthreport/fileLoad?month="+month+"&year="+year+"&zyid="+zyid;

}
function reloaddiv(zyid,year){  //重新加载
    $("#filelist").load("/newdzzwpt/monthreport/getFileList",
        {"zyid":zyid,"year":year},
        function(){
        });
}
*/

