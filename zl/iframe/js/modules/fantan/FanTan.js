/**
 * Created by admin on 2016/1/27.
 */
//    反贪业务
var FanTanYeWuModule = angular.module("FanTanYeWuModule",[]);
FanTanYeWuModule.controller("FanTanYeWuController", function ($scope,$location) {
        //查询点击事件
            document.getElementById("c").onclick=function(){
                var rq1=$("#rq1").datebox("getValue");//获取日期的值
                var rq2=$("#rq2").datebox("getValue");
                console.log(rq1);
                if((rq1 != "")&&(rq2!="")){
                    console.log("不为空");
                    var p1=$("<p><iframe width='100%' frameborder='0' height='400px'  name='i' allowTransparency='true'" +
                    " src='http://10.1.1.119:8075/WebReport/ReportServer?reportlet=TestGroupTable.cpt&op=view'></iframe></p>");
                    var p2=$("<p><iframe width='100%' frameborder='0' height='2700px'  name='i' allowTransparency='true'" +
                    " src='http://10.1.1.119:8075/WebReport/ReportServer?reportlet=TestGroupChart.cpt&op=view'></iframe></p>");
                    $("#fantan").append(p1,p2);
                }else{
                    console.log("不为空");
                }


            }

});
//反贪综合业务
var FanTanZongHeModule = angular.module("FanTanZongHeModule",[]);
FanTanZongHeModule.controller("FanTanZongHeController", function ($scope,$location) {
//查询点击事件
    document.getElementById("c").onclick=function(){
        var rq1=$("#rq1").datebox("getValue");//获取日期的值
        var rq2=$("#rq2").datebox("getValue");
        console.log(rq1);
        if((rq1 != "")&&(rq2!="")){
            console.log("不为空");
            var p1=$("<p><iframe width='100%' frameborder='0' height='400px'  name='i' allowTransparency='true'" +
            " src='http://10.1.1.119:8075/WebReport/ReportServer?reportlet=TestGroupTable.cpt&op=view'></iframe></p>");
            var p2=$("<p><iframe width='100%' frameborder='0' height='2700px'  name='i' allowTransparency='true'" +
            " src='http://10.1.1.119:8075/WebReport/ReportServer?reportlet=TestGroupChart.cpt&op=view'></iframe></p>");
            $("#fantan").append(p1,p2);
        }else{
            console.log("不为空");
        }


    }
});