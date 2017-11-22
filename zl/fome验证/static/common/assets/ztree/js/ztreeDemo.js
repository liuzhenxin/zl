function zTreeDemoUtil(params){

/**
 * 树控件ID
 * @type 
 */	
var zTreeWidgetId = params.zTreeWidgetId;	
/**
 * 树被选中的节点ID值
 * @type 
 */
var zTreeWidgetInputValue = params.zTreeWidgetInputValue;
/**
 * 树被选中的节点ID
 * @type 
 */
var zTreeWidgetInputId = params.zTreeWidgetInputId;
/**
 * 节点ID值
 * @type 
 */
var zTreeNodeIdValue = params.zTreeNodeIdValue; 
/**
 * 后台url链接
 * @type 
 */
var zTreeUrl = params.zTreeUrl;
/**
 * initList
 * @type 
 */
var searchInputId = params.searchInputId;
/**
 * 节点点击事件
 * @type 
 */	
var onClick = params.onClick;	

/**
 * 异步加载失败时调用
 * @param {} event
 * @param {} treeId
 * @param {} treeNode
 * @param {} XMLHttpRequest
 * @param {} textStatus
 * @param {} errorThrown
 */
var onAsyncError = function(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {  
         alert("数据加载失败！");  
} 

/**
 * 节点被展开后的事件回调函数      
 * @param {} event
 * @param {} treeId
 * @param {} treeNode
 */
var zTreeOnExpand = function(event, treeId, treeNode) {  
     //节点展开事件
	setTimeout(function(){
		var treeObj = $.fn.zTree.getZTreeObj(zTreeWidgetId);
        var node = treeObj.getNodeByParam("id", zTreeWidgetInputValue);
        treeObj.selectNode(node);	
        $("#"+zTreeWidgetId).scrollTop(document.getElementById(treeNode.tId).offsetTop - 24);	
		if($("#"+zTreeWidgetId).height() == 250){
            $("#"+zTreeWidgetId).css("overflow-y","scroll");
         }else{
         	$("#"+zTreeWidgetId).css("overflow-y","auto");
             }
		},400);
	
		
 };
 
 /**
  * 节点被收缩后的事件回调函数   
  * @param {} event
  * @param {} treeId
  * @param {} treeNode
  */
 var zTreeOnClose = function(event, treeId, treeNode) {  
    //节点收缩事件
	setTimeout(function(){
		if($("#"+zTreeWidgetId).height() == 250){
            $("#"+zTreeWidgetId).css("overflow-y","scroll");
         }else{
         	$("#"+zTreeWidgetId).css("overflow-y","auto");
                 }
			},400);
};  

/**
 * 父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作 ，false不代开    
 * @param {} treeId
 * @param {} treeNode
 * @return {Boolean}
 */
var zTreeBeforeExpand = function(treeId, treeNode) {  
	  //根据节点id值设置节点选中
	  setTimeout(function(){
	     var treeObj = $.fn.zTree.getZTreeObj(zTreeWidgetId);
         var node = treeObj.getNodeByParam("id", zTreeWidgetInputValue);
         treeObj.selectNode(node);	
        $("#"+zTreeWidgetId).scrollTop(document.getElementById(treeNode.tId).offsetTop - 25);	
	  },600);
	  
       var zTree = $.fn.zTree.getZTreeObj(treeId);  
       if (treeNode.isParent&&treeNode.id!=zTreeNodeIdValue) {  
	         zTree.reAsyncChildNodes(treeNode, "refresh");//异步刷新，清空后加载，加载后打开,需要不打开加参数true  
	         return false;//使用了异步强行加载，如果用true,节点展开将不会按照expandSpeed属性展开，false将按照设定速度展开  
	   }else {  
             return true;  
       } 
}

/**
 * 数据过滤方法，如后台数据已确认无误可直接返回数据，不需注册此回调函数  
 * @param {} treeId
 * @param {} parentNode
 * @param {} childNodes
 * @return {}
 */
var filter  = function(treeId, parentNode, childNodes) {  
         if (!childNodes) return null;  
         return childNodes;  
}   

/**
 * 搜索文本框获取焦点事件
 * @param {} e
 */
var focusKey = function(e){
   if ($('#'+zTreeWidgetInputId).hasClass("empty")) {
		$('#'+zTreeWidgetInputId).removeClass("empty");
	}
}

/**
 * 失去焦点事件
 * @param {} e
 */
var blurKey = function(e) {
	if ($('#'+zTreeWidgetInputId).val() === "") {
		$('#'+zTreeWidgetInputId).addClass("empty");
	}
}
var lastValue = "", nodeList = [], fontCss = {};

/**
 * 查询树节点
 * @param {} e
 */
var searchNode  = function(e) {
	var zTree = $.fn.zTree.getZTreeObj(zTreeWidgetId);
	
	var value = $.trim($('#'+searchInputId).val());
	var keyType = "name";
	
	if (lastValue === value) return;
	lastValue = value;
	if (value === "") return;
	updateNodes(false);
	nodeList = zTree.getNodesByParamFuzzy(keyType, value);
    updateNodes(true);

}

/**
 * 跟新节点
 * @param {} highlight
 */
var updateNodes = function(highlight) {
	var zTree = $.fn.zTree.getZTreeObj(zTreeWidgetId);
	for( var i=0, l=nodeList.length; i<l; i++) {
		nodeList[i].highlight = highlight;
		zTree.updateNode(nodeList[i]);
	 }
}

/**
 * 查询后的样式
 * @param {} treeId
 * @param {} treeNode
 * @return {}
 */
var getFontCss = function(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}

/**
 * 查询文本框绑定事件
 */
$('#'+searchInputId).bind("blur",blurKey).bind("change", searchNode).bind("focus", focusKey);

/**
 * 点击树区域事件
 */
$("#zTreeDemoBackgroundDiv").click(function(event){
	var e=window.event || event;
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
});


/**
 * 页面中文档点击事件
 *//*
document.onclick = params.onCloseTree;
*/


/**
  * 树属性设置
  * @type 
  */ 
var ztTreeSetting = {  
         view: {  
             dblClickExpand: false,//双击节点时，是否自动展开父节点的标识  
             showLine: true,//显示下划线  
             fontCss: getFontCss,
             nameIsHTML: true,
             showTitle : true,
             selectedMulti: false,//设置是否允许同时选中多个节点。  
             expandSpeed: 400//"slow"//节点展开速度  
         },  
         data: {  
             simpleData: {//是否为简单数据类型JSON  
                 enable:true,  
                 idKey: "id",//使用简单必须标明的的节点对应字段  
                 pIdKey: "pId",//使用简单必须标明的的父节点对应字段  
                 rootPId:null//根  
             },
              key: {
                     title:"title"// json中要有一个key是 title就可以了
                    }
         },  
         async: {  
                 enable: true,//异步加载  
                 //请求地址，可用function动态获取  
                 url:zTreeUrl,  
                 contentType:"application/x-www-form-urlencoded",//按照标准的 Form 格式提交参数  
                 autoParam:["id=nid"],//提交的节点参数，可用“id=xx”取请求提交时的别名  
                 //otherParam:{"otherParam":"zTreeAsyncTest"},//提交的其他参数,json的形式  
                 dataType:"json",//返回数据类型  
                 type:"post",//请求方式  
                 dataFilter: null//数据过滤  
                 },  
         callback: {  
             onClick:onClick,//节点被点击时调用的函数  
             onAsyncError: onAsyncError,//异步加载失败调用的函数      
             onExpand: zTreeOnExpand,//用于捕获节点被展开的事件回调函数  
             onMouseUp: onMouseUp,
             onCollapse: zTreeOnClose,//用于捕获节点被收缩的事件回调函数  
             beforeExpand: zTreeBeforeExpand//用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作  
           }  
      };  

   
	/**
	 * 从后台获取tree数据
	 */
    $.ajax({
    		url:zTreeUrl,
    		data:{nid:zTreeNodeIdValue },
    		cache:false,
    	    async :false,
    	    type:'POST',
	        dataType:'json',
	        success : function(data){
	    	  var dataTree = data;
	    	  $.fn.zTree.init($("#"+zTreeWidgetId), ztTreeSetting, dataTree);
    	    }
	});
	    
	
};