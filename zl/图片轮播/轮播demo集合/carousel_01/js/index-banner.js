/**
 * Created by jiucheng on 2016/4/30 0030.
 *  blog:jiuchengcoding.github.io
 *   不支持IE
 */
window.onload=function(){
    var arrFR = ['images/ferrari01.jpg','images/ferrari02.jpg','images/ferrari03.jpg','images/ferrari04.jpg'];
    var arrBC = ['images/benchi01.jpg','images/benchi02.jpg','images/benchi03.jpg','images/benchi04.jpg'];
    var arrBM = ['images/baoma01.jpg','images/baoma02.jpg','images/baoma03.jpg','images/baoma04.jpg'];
    var arrAD = ['images/aodi01.jpg','images/aodi02.jpg','images/aodi03.jpg','images/aodi04.jpg'];
    var array = [arrFR,arrBC,arrBM,arrAD];
    var btns=document.getElementsByClassName('js_btn');
    var divList=document.getElementsByClassName('banner_lists');
    // 品牌切换
    for(var i=0;i<btns.length;i++){
    	btns[i].index=i;
    	btns[i].onclick=showItems;
    }
    //ClassName切换,是否含有指定class
    function hasClass(elem,cls){
    	return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    }
    // 没有就追加指定class
    function addClass(elem,cls){
    	if(!hasClass(elem,cls)){
    		elem.className+=" "+cls;
    	}
    }
    // 有就移除指定class
    function removeClass(elem,cls){
    	if(hasClass(elem,cls)){
    		var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)');
    		elem.className=elem.className.replace(reg,"");
    	}
    }
    //ClassName切换,移除所有
    function removeAll(obj){
    	for (var i = 0; i < obj.length; i++) {
    		removeClass(obj[i],"selected");
    	}
    }
    // DIV显示切换
	 function showItems(){
	 	removeAll(btns);
	 	addClass(this,"selected");
	 	for (var s = 0; s< divList.length; s++) {
    		divList[s].style.display="none";
    		divList[this.index].style.display="block";		
    	}
    	willHover(this.index);
	}
	// 右边切换按钮效果
	function willHover(sum){
		var hoverbtns=divList[sum].getElementsByClassName('btn');
		var img=divList[sum].getElementsByTagName('img')[0];
    	for (var i = 0; i < hoverbtns.length; i++) {
    		hoverbtns[i].index=i;
    		hoverbtns[i].onmouseover=function(){
    			removeAll(hoverbtns);
	 			addClass(this,"selected");
    			var imgSrc=array[sum][this.index];
    			img.src=array[sum][this.index];
    		}
    	}
	}
	// 默认第一次可以切换
	willHover(0);
};
