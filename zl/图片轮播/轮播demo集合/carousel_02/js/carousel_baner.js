/**
 * Created by jiucheng on 2016/4/30 0030.
 *  blog:jiuchengcoding.github.io
 *   
 */
var json='['+
    '{"i":1,"images":"baner01.jpg"},'+
    '{"i":2,"images":"baner02.jpg"},'+
    '{"i":3,"images":"baner03.jpg"},'+
    '{"i":4,"images":"baner04.jpg"},'+
    ']';
var imgs=eval("("+json+")");//用eval将数据解析为数组
//封装￥符号类似jquery的$
window.$=HTMLElement.prototype.$=function(selector){
    return (this==window?document:this).querySelectorAll(selector);
}//1window$的结束
var adv={//........广告轮播对象
    ulImgs:null,//轮播的ul元素
    ulIdxs:null,//序号按钮的ul元素
    INTERVAL:10,//每步时间间隔10毫秒
    STEP:33,//每步的移动距离为40px
    WAIT:3000,//自动轮播时候的等待时间3秒一换3000
    timer:null,//当前定时器的序号！
    //****同一时刻，只有一个定时器实例在运行！！！！！！！！！！！！
    curri:1,//当前img的li的序号，又指序号按钮的内容
    LIWIDTH:800,//每个图片li的宽度
    init:function(){
        this.ulImgs=$("#imgs")[0];
        this.ulIdxs=$("#indexs")[0];
        this.initUlImgs();
        this.initUlIdxs();
        this.automove();
    },
    //2、初始化ulImgs中的广告图片
    initUlImgs:function(){/*	<li data-i="图片的i属性"><images src="images/index/图片的img属性"></li>		*/
        //遍历imgs数组中每个img对象
        //将每个对象替换为规定li格式的字符串
        //再放回数组原位置
        for(var i=0;i<imgs.length;i++){
            imgs[i]='<li data-i="'+imgs[i].i+'">'+'<images src="images/'+imgs[i].img+'"></li>';
        }
        this.ulImgs.innerHTML=imgs.join("");
        this.ulImgs.style.width=this.LIWIDTH*imgs.length+"px";
    },
    //2、初始化序号按钮
    initUlIdxs:function(){
        //遍历imgs中每个元素，声明临时数组idxs=[];
        //每遍历一个，就在idxs中追加一个i+1
        for(var i=0,idxs=[];i<imgs.length;idxs[i]=i++ +1);
        //idxs=[1,2,3,4,5];
        //将数组拼接为<li>1</li><li>2</li>...
        //一次性放入ulIdxs的内容
        this.ulIdxs.innerHTML="<li>"+idxs.join("</li><li>")+"</li>";
        this.ulIdxs.$("li")[0].className="hover";//4第一个默认选中
        //5
        this.ulIdxs.onmouseover=function(){
            var e=window.event||arguments[0];
            adv.move(e);
        }
    },
    //5响应idxs li的mouseover事件
    move:function(e){
        var nextLi=e.srcElement||e.target;
        if(nextLi.nodeName=="LI"){
            var nexti=nextLi.innerHTML;//5、目标位置
            //5、找到当前hover的按钮li，移除样式
            this.ulIdxs.$(".hover")[0].className="";
            //5、将hover设置到curri对应的序号按钮li上
            adv.ulIdxs.$("li")[nexti-1].className="hover";
            if(nexti>this.curri){//5、左移
                //5、要先停止自动轮播
                clearTimeout(this.timer);
                this.timer=null;
                this.moveStep(nexti-this.curri);
            }else if(nexti<this.curri){//6、右移
                clearTimeout(this.timer);
                this.timer=null;
                this.moveLi(nexti-this.curri);
                this.moveStep(nexti-this.curri);
            }
        }
    },
    //3、自动轮播广告
    automove:function(){
        this.timer=setTimeout(function(){
            //4、找到当前hover的li,移除样式
            adv.ulIdxs.$(".hover")[0].className="";
            //4将hover设置到curri对应的li上
            adv.ulIdxs.$("li")[adv.curri==imgs.length?0:adv.curri].className="hover";
            adv.moveStep(1);
        },this.WAIT);
    },
    //3、每次移动一步
    moveStep:function(n){
        //什么条件下
        var left=parseFloat(getComputedStyle(this.ulImgs).left);
        if((n>0&&left>-this.LIWIDTH*n)||(n<0&&left<0)){
            //3、根据n的正负，让ulImgs左/右移动一步
            this.ulImgs.style.left=left-(n>0?this.STEP:-this.STEP)+"px";
            //3注册定时器，反复移动下一步
            this.timer=setTimeout(function(){
                adv.moveStep(n);
            },this.INTERVAL);
        }else{//停止移动后，注册下一次移动
            this.curri+=n;//4、crri当前li的序号
            this.curri>imgs.length&&(this.curri=1);//4
            n>0&&this.moveLi(n);
            this.automove();
        }
    },
    //4、每移动一次要把左侧li迁移到li的结尾,并修改ul的left位置为0
    moveLi:function(n){
        if(n>0){//左移
            //this.ulImgs.firstChild;
            //this.ulImgs.removeChild(this.ulImgs.firstChild);
            while(this.ulImgs.firstChild.dataset.i!=this.curri){
                this.ulImgs.appendChild(this.ulImgs.removeChild(this.ulImgs.firstChild));
            }
            //4、
            this.ulImgs.style.left=0;
        }else{//6、右移
            //6、从结尾取出最后一个元素，插入到第一个元素之前
            while(this.ulImgs.$("li")[-n].dataset.i!=this.curri){
                this.ulImgs.insertBefore(this.ulImgs.removeChild(this.ulImgs.lastChild),this.ulImgs.firstChild);
            }
            //6、右移前将ulImgs的
            this.ulImgs.style.left=n*this.LIWIDTH+"px";
        }
    }
}//adv的结束
window.onload=function(){
    adv.init();
}