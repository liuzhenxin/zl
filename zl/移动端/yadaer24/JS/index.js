function swpe(){
	//设置默认页数为1
	var pageNum =1;
	//
	//Hammer js的垂直方向滑动默认是关闭的，需要手动打开
	var container=document.getElementById("container");
	var hammer = new Hammer(container);
	hammer.get("swipe").set({direction:Hammer.DIRECTION_VERTICAL});//获取垂直滑动
	//
	var animateArr = ["animation","OAnimation","MsAnimation","WebkitAnimation"]; //定义兼容性
	/****上滑****/
	hammer.on("swipeup",function(){
		if(pageNum==5) return;
		/*$("#page"+pageNum).animate({top:'-1700px'},500);*/
		var dom2 = document.getElementById("page"+pageNum);
		for(var i=0,len=animateArr.length;i<len;i++){
			dom2.style[animateArr[i]] = "topMove 1s forwards";
		}
		// document.getElementById("page"+pageNum).style.animation = "topMove 1s forwards";
		// document.getElementById("page"+pageNum).style.OAnimation = "topMove 1s forwards";
		// document.getElementById("page"+pageNum).style.MsAnimation = "topMove 1s forwards";
		// document.getElementById("page"+pageNum).style.MozAnimation = "topMove 1s forwards";
		// document.getElementById("page"+pageNum).style.WebkitAnimation = "topMove 1s forwards";
		//alert(pageNum);
		if(pageNum==1){
			removeClasses("#page1Text","pageText");
			addClasses("#issueBox","issAnimate");
			addClasses("#carImage","carImageAnimate");
		}else if(pageNum==3){
			addClasses("#talk1","page4TalkAinmate");
			addClasses("#talk2","page4TalkAinmate");
			addClasses("#talk3","page4TalkAinmate");
			addClasses("#talk4","page4TalkAinmate");
		}else if(pageNum==4){
			addClasses("#scanCode","scanCodeAni");
			removeClasses("#talk1","page4TalkAinmate");
			removeClasses("#talk2","page4TalkAinmate");
			removeClasses("#talk3","page4TalkAinmate");
			removeClasses("#talk4","page4TalkAinmate");
		}else{
			removeClasses("#issueBox","issAnimate");
			removeClasses("#carImage","carImageAnimate");
			removeClasses("#talk1","page4TalkAinmate");
			removeClasses("#talk2","page4TalkAinmate");
			removeClasses("#talk3","page4TalkAinmate");
			removeClasses("#talk4","page4TalkAinmate");
		}
		pageNum ++;
	}).on("swipedown",function(){/*下滑**/
		if(pageNum<=1) return;

		//$("#page1Text").css("animation","scalingTextIamge 3s 3");
		var dom = document.getElementById("page"+(pageNum-1));
		for(var i=0;i<animateArr.length;i++){
			dom.style[animateArr[i]] = "downMove 1s forwards";
		}
		// document.getElementById("page"+(pageNum-1)).style.animation = 
		// "downMove 1s forwards";
		// document.getElementById("page"+(pageNum-1)).style.OAnimation = 
		// "downMove 1s forwards";
		// document.getElementById("page"+(pageNum-1)).style.MsAnimation = 
		// "downMove 1s forwards";
		// document.getElementById("page"+(pageNum-1)).style.MozAnimation = 
		// "downMove 1s forwards";
		// document.getElementById("page"+(pageNum-1)).style.WebkitAnimation =
		// "downMove 1s forwards";
		//alert(pageNum);
		if(pageNum==2){
			removeClasses("#issueBox","issAnimate");
			addClasses("#page1Text","pageText");
		}else if(pageNum==3){
			addClasses("#issueBox","issAnimate");
			addClasses("#carImage","carImageAnimate");
		}else if(pageNum==5){
			addClasses("#talk1","page4TalkAinmate");
			addClasses("#talk2","page4TalkAinmate");
			addClasses("#talk3","page4TalkAinmate");
			addClasses("#talk4","page4TalkAinmate");
			removeClasses("#scanCode","scanCodeAni");
		}else{
			removeClasses("#page1Text","pageText");
			removeClasses("#issueBox","issAnimate");
			removeClasses("#talk1","page4TalkAinmate");
			removeClasses("#talk2","page4TalkAinmate");
			removeClasses("#talk3","page4TalkAinmate");
			removeClasses("#talk4","page4TalkAinmate");
		}
		pageNum --;
	});


	//音乐播放
	var musicKeyBtn = document.getElementById("musicKey");
	//alert(musicKeyBtn);
	var musicKey = new Hammer(musicKeyBtn);
	musicKey.on("tap",function(){
		if(!audioMusic.paused)//判断是否在播放
		{

			audioMusic.pause();// 暂停播放
			/*alert(musicKey.style.oAnimationPlayState);*/
			musicKeyBtn.style.animationPlayState="paused";
			musicKeyBtn.style.webkitAnimationPlayState="paused";
			musicKeyBtn.style.oAnimationPlayState="paused";
			musicKeyBtn.style.mozAnimationPlayState="paused";
		}else{
			audioMusic.play();// 播放
			musicKeyBtn.style.animationPlayState="running";
			musicKeyBtn.style.webkitAnimationPlayState="running";
			musicKeyBtn.style.oAnimationPlayState="running";
			musicKeyBtn.style.mozAnimationPlayState="running";
		}
	});
}

/*******添加类样式ʽ********/
function addClasses(id,classes){
	$(id).addClass(classes);
}

/*******删除类样式********/
function removeClasses(id,classes){
	$(id).removeClass(classes);
}

/******js选择body宽度和高度*******/



/******调用上下滑动方法********/
window.onload=function(){
	//获取手机屏幕的宽高
	//alert(document.body.clientWidth +"  "+document.body.clientHeight);
	swpe();

	//alert(document.body.clientHeight);

};



