/**
 * Created by Administrator on 2016/5/4.
 */
function AjaxMethod() {
    //this.init.apply(this, arguments);
}
AjaxMethod.prototype = {

    init: function() {
        debugger;
    },
    GetJson: function() {
        jQuery.getJSON(
            "Json.ashx",
            { name: 'test', age: 32 },
            function(data) {
                debugger;
                var txt = eval(data);
                //var obj = data.toJSONString(); //由JSON字符串转换为JSON对象
                var objs = JSON.stringify(data); //由JSON字符串转换为JSON对象
                alert(txt);
            })
    },
    GetAjax: function() {
        jQuery.ajax({
            url: "Json.ashx",
            type: "get",
            dataType: "json",
            contextType: "application/json; charset=utf-8",
            data: { name: 'test', age: 32 },
            success: function(data) {
                debugger;
                jQuery.each(data, function(i) {

                });

            },
            error: function() {
                //请求出错处理
                alert(1);
            }
        })
    },
    PostAjax: function() {
        jQuery.post(
            "Json.ashx",
            {
                name: userName,
                age: 12
                // ajaxMethod: "Login"
            },
            function(data) {
                var d = data;
            },
            "json"
        );
    }


};
var method=new AjaxMethod();