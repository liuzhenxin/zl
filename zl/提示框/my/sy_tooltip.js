/**
 * Created by yhsl on 2017/7/13.
 */
$(function () {
    $("[data-tip='tooltip']").css({
        position:'relative'
    });
    $("[data-tip='tooltip']").mouseover(function () {
        var titles='';
        var title=$(this).attr("data-title");
        titles+="<div class='Tooltip' style='position: absolute;z-index: 19999;'>";
        titles+='<div class="Tooltip_arrow" style="position: absolute;width: 0;height: 0;"></div>' +
            '<div class="Tooltip_inner" style="max-width: 200px;padding: 3px 8px;color: #fff;margin-left: 5px;text-align: center;background-color: #000;border-radius: 4px;">'+title+'</div>';
        titles+="</div>";
        $(this).after(titles);

    });
    $("[data-tip='tooltip']").mouseout(function () {
        $(this).next('.Tooltip').remove();
    });
    $("[data-tip='tooltip']").mouseover(function () {
        $(this).css({
            cursor:'pointer'
        });
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
            case 'left':
                var divH_leftH= (Tooltip_H-btn_Tool_H)/2;//（按钮高度-气泡高度）除以2
                var divH_leftLeft=x.left-btn_Tool_W-10;  //200
                var divH_leftTop=x.top+divH_leftH;
                $(this).next('.Tooltip').css({
                    top:divH_leftTop,
                    left:divH_leftLeft
                });
                $(this).next('.Tooltip').find('.Tooltip_arrow').css({
                    top:'50%',
                    'marginTop':'-5px',
                    right:'-5px',
                    'borderTop': '5px solid transparent',
                    'borderLeft': '5px solid '+data_background+'',
                    'borderBottom': '5px solid transparent'
                });
                $(this).next('.Tooltip').find('.Tooltip_inner').css({
                    'backgroundColor': ''+data_background+''
                });
                break;

            case 'bottom':
                var divH_bottomTop=x.top+Tooltip_H+7;
                var divH_bottomLeft=x.left+((Tooltip_w-btn_Tool_W)/2);  //200
                $(this).next('.Tooltip').css({
                    top:divH_bottomTop+"px",
                    left:divH_bottomLeft+'px'
                });
                $(this).next('.Tooltip').find('.Tooltip_arrow').css({
                    top:'-5px',
                    left:'50%',
                    'borderLeft': '5px solid transparent',
                    'borderRight': '5px solid transparent',
                    'borderBottom': '5px solid '+data_background+''
                });
                $(this).next('.Tooltip').find('.Tooltip_inner').css({
                    'backgroundColor': ''+data_background+''
                });
                break;
            case 'right':
                var divH_rightH= (Tooltip_H-btn_Tool_H)/2;//（按钮高度-气泡高度）除以2

                var divH_rightLeft=x.left+Tooltip_w;  //200
                var divH_rightTop=x.top+divH_rightH;
                $(this).next('.Tooltip').css({
                    top:divH_rightTop,
                    left:divH_rightLeft
                });
                $(this).next('.Tooltip').find('.Tooltip_arrow').css({
                    top:'50%',
                    'marginTop':'-2.5px',
                    'borderTop': '5px solid transparent',
                    'borderRight': '5px solid '+data_background+'',
                    'borderBottom': '5px solid transparent'
                });
                $(this).next('.Tooltip').find('.Tooltip_inner').css({
                    'backgroundColor': ''+data_background+''
                });
                break;

            default:
                var divH_undefined= x.top-btn_Tool_H-7;
                var divH_undefinedLeft=x.left+((Tooltip_w-btn_Tool_W)/2);  //200
                $(this).next('.Tooltip').css({
                    top:divH_undefined+'px',
                    left:divH_undefinedLeft+'px'
                });
                $(this).next('.Tooltip').find('.Tooltip_arrow').css({
                    top:btn_Tool_H+'px',
                    left:'50%',
                    'borderLeft': '5px solid transparent',
                    'borderRight': '5px solid transparent',
                    'borderTop': '5px solid '+data_background+''
                });
                $(this).next('.Tooltip').find('.Tooltip_inner').css({
                    'backgroundColor': ''+data_background+''
                });
                break;
        }

    });

});