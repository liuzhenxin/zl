/**
 * Created by Administrator on 2015/10/6.
 */
//var box=document.getElementById("box");
var imgs=[{"src":"../img/1.jpg"},{"src":"../img/3.jpg"},{"src":"../img/2.jpg"}];
var texts=[{"innerHTML":"耀客电视剧幻城"},{"innerHTML":"郭德纲"},{"innerHTML":"治愈心理学"}];
var words=[{"innerHTML":"#电视剧幻城#下雪了"},
    {"innerHTML":"有个词叫鹤立鸡群，其实鹤挺可怜的，群体压力太大了，你知道这群鸡多厉害啊......"},
    {"innerHTML":"据说，两个人的旅游很多都是这样的：“通常是一个人负责订来回车票酒店民宿景点门票计划好目的地路线行程衔接整体开销查看好天气情况帖子攻略网友好差评想好怎么看怎么玩怎么吃问路带路，另一个负责当弱智"}];
var images=[{"src":"../img/0060OImajw1ewrf7ctm47j31kw2dce81.jpg"},{"src":"../img/6e861f51jw1ewrftkgagtj20xc18ggzj.jpg"},{"src":"../img/0060OImajw1ewrf7gx1dnj31kw2mt7wh.jpg"}];
createbox();

var flag = true;
document.onscroll=function(){
    var box=document.getElementsByClassName("box");
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var documentH=document.documentElement.clientHeight;
    if(documentH+scrollTop>box[box.length-1].offsetTop+box[box.length-1].offsetHeight && flag){
        flag = false;
        createimg();
        setTimeout(function(){
            createbox();
            var outer=document.getElementById("outer");
            var loadDiv = document.getElementById("load");
            outer.removeChild(loadDiv);
            flag = true;
        },1000);

    }
};

function createbox(){
    for(var i=0;i<3;i++){
        var outer=document.getElementById("outer");
        var box=document.createElement("div");
        box.className="box";
        outer.appendChild(box);
        var box_left=document.createElement("div");
        box_left.className="box_left";
        var img=document.createElement("img");
        img.src=imgs[i].src;
        box_left.appendChild(img);
        var input=document.createElement("input");
        input.type="button";
        input.value="+关注";
        box_left.appendChild(input);
        box.appendChild(box_left);
        var box_right=document.createElement("div");
        box_right.className="box_right";
        box.appendChild(box_right);
        var span=document.createElement("a");
        span.href="";
        span.innerHTML=texts[i].innerHTML;
        span.id="box_right_title";
        box_right.appendChild(span);
        var p=document.createElement("p");
        p.innerHTML=words[i].innerHTML;
        box_right.appendChild(p);
        var img2=document.createElement("img");
        img2.src=images[i].src;
        box_right.appendChild(img2);
        var p2=document.createElement("p");
        p2.innerHTML="今天 15:16来自 iPhone 6 Plus";
        box_right.appendChild(p2);
        var a=document.createElement("a");
        a.innerHTML="收藏";
        a.href="";
        box_right.appendChild(a);
        var a1=document.createElement("a");
        a1.href="";
        a1.innerHTML="转发XX";
        box_right.appendChild(a1);
        var a2=document.createElement("a");
        a2.innerHTML="评论XX";
        a2.href="";
        box_right.appendChild(a2);
        var a3=document.createElement("a");
        a3.innerHTML="&nbsp; XX";
        a3.href="";
        a3.className="clickimg";
        box_right.appendChild(a3);
//        box.offsetTop=box.offsetTop+box.offsetHeight;
        //alert(box.offsetTop);
    }
}


function createimg(){
    var outdiv=document.createElement("div");
    outdiv.className="box";
    outdiv.setAttribute("id", "load");
    outdiv.style.textAlign="center";
    outer.appendChild(outdiv);
    var img=document.createElement("img");
    outdiv.appendChild(img);
    var text=document.createElement("p");
    text.innerHTML="加载中...";
    outdiv.appendChild(text);
    img.src="../img/QQ图片20151007162722.png";
    img.className="trans";
    setTimeout(function(){
        img.style.transform = "rotate(1440deg)";
    },1);
}









