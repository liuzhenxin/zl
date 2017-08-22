/**
 * Created by yhsl on 2017/7/14.
 */
;(function($, window, document,undefined) {
    $.fn.myPlugin = function(options) {
        var defaults = {  //默认值
            'color': 'red',
            'fontSize': '12px'
        };
        var settings = $.extend({},defaults, options);//将一个空对象做为第一个参数
        return this.css({   //自定义
            'color': settings.color,
            'fontSize': settings.fontSize
        });
    };
    $.fn.sy_tooltip = function(options) {
        $(this).mouseover(function () {
            var titles='';
            var title=$(this).attr("data-title");
            titles+="<div class='Tooltip' style='position: absolute;z-index: 19999;'>";
            titles+='<div class="Tooltip_arrow" style="position: absolute;width: 0;height: 0;"></div>' +
                '<div class="Tooltip_inner" style="max-width: 200px;padding: 3px 8px;color: #fff;margin-left: 5px;text-align: center;background-color: #000;border-radius: 4px;">'+title+'</div>';
            titles+="</div>";
            $(this).css({
                cursor:'pointer'
            }).after(titles);
            var type=$(this).attr("data-direction");//获取气泡框的位置
            var data_background;
            var background=$(this).attr("data-background");//获取气泡框的背景色
            console.log(background);
            if(typeof(background)!="undefined"){
                data_background=background;
            }else{
                data_background='#000';
            }
            var x=$(this).position(); //获取该元素对应父容器的上边距
            console.log(x.top);//获取该元素对应父容器的上边距
//            console.log(x.left);//获取该元素对应父容器的左边距
            var Tooltip_w=$(this).innerWidth();  //按钮的宽度
            var Tooltip_H=$(this).innerHeight();  //按钮的高度
            var btn_Tool_H=$(this).next('.Tooltip').innerHeight();  //气泡的高度
            var btn_Tool_W=$(this).next('.Tooltip').innerWidth();  //气泡的宽度
            switch (type)
            {
                case 'top':
                    var divH_top= x.top-btn_Tool_H-7;
                    var divH_topLeft=x.left+((Tooltip_w-btn_Tool_W)/2);  //200
                    $(this).next('.Tooltip').css({
                        top:divH_top+'px',
                        left:divH_topLeft
                    });
                    console.log(data_background);
                    $(this).next('.Tooltip').find('.Tooltip_arrow').css({
                        top:btn_Tool_H+'px',
                        left:'50%',
                        'borderLeft': '5px solid transparent',
                        'borderRight': '5px solid transparent',
                        'borderTop':'5px solid '+data_background+''
                    });
                    $(this).next('.Tooltip').find('.Tooltip_inner').css({
                        'backgroundColor': ''+data_background+''
                    });
                    break;
            }

        });
        $(this).mouseout(function () {
            $(this).next('.Tooltip').remove();
        });
    };
})(jQuery, window, document);