/**
 * Created by Administrator on 2015/10/24.
 */
//var region=document.getElementById("region");
//var li=document.getElementById("li");
//region.onclick=function(){
//    li.style.display="block";
//};
//region.onblur=function(){
//    li.style.display="none";
//};


//元素对象定义
var containerEle = document.getElementsByClassName("container")[0];
var innerEle = document.getElementsByClassName("inner")[0];
var mainImgEle = document.getElementsByClassName("main-img")[0];
var backEle = document.getElementById("back");
var forwardEle = document.getElementById("forward");
var pointIndexEle = document.getElementsByClassName("point-index")[0];
var imgsArr = ["./images/1.jpg", "./images/2.jpg", "./images/1.jpg"];
var count = 1;

//定义方法
function initPointIndexEle() {
    //创建圆点
    for (var i = 0; i < imgsArr.length; i++) {
        pointIndexEle.innerHTML += "<li>" + (i + 1) + "</li>";
    }
    //鼠标移动到圆点换图片
    for (var j = 0; j < imgsArr.length; j++) {
        var liEle = pointIndexEle.childNodes[j];
        liEle.onmouseover = function() {
            this.style.backgroundColor = "red";
            count = parseInt(this.innerHTML) - 1;
            mainImgEle.setAttribute("src", imgsArr[count]);
        };
        liEle.onmouseout = function() {
            this.style.backgroundColor = "black";
        }
    }
    //动态居中
    var len = pointIndexEle.childNodes.length;
    var ulWidth = undefined;
    var mainImgWidth = undefined;
    for (var k = 0; k < len; k++) {
        if (pointIndexEle.childNodes[k].currentStyle) {
            ulWidth = pointIndexEle.childNodes[k].currentStyle.width;
        } else if (document.defaultView) {
            ulWidth = document.defaultView.getComputedStyle(pointIndexEle.childNodes[k], null).width;
        }
    }
    if (mainImgEle.currentStyle) {
        mainImgWidth = document.getElementsByClassName("inner")[0].currentStyle.width;
    } else if (document.defaultView) {
        mainImgWidth = document.defaultView.getComputedStyle(document.getElementsByClassName("inner")[0], null).width;
    }
    pointIndexEle.style.left = (parseInt(mainImgWidth) - (parseInt(ulWidth) * len) - (3 * 2 * len)) / 2 + "px";
}
function autoMove() {
    if (count === 3) count = 0;
    mainImgEle.setAttribute("src", imgsArr[count++]);
}

//调用
initPointIndexEle();
var timer = setInterval("autoMove()", 1000);

//绑定时间
innerEle.onmouseover = function() {
    clearInterval(timer);
};
innerEle.onmouseout = function() {
    timer = setInterval("autoMove()", 1000);
};
forwardEle.onclick = function() {
    if (count === 1) count = -1;
    mainImgEle.setAttribute("src", imgsArr[++count]);
};
backEle.onclick = function() {
    if (count === 0) count = 2;
    mainImgEle.setAttribute("src", imgsArr[--count]);
};