/*!
 * jQuery Print Previw Plugin v1.0.1
 *
 * Copyright 2011, Tim Connell
 * Licensed under the GPL Version 2 license
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Date: Wed Jan 25 00:00:00 2012 -000
 */

(function($) {
   var mask, size, print_modal, print_controls;
    // Initialization
    $.fn.printPreview = function(opstion) {
        this.each(function() {
            $(this).bind('click', function(e) {
                 mask ="";size =""; print_modal =""; print_controls ="";
                if (opstion) {
                    e.preventDefault(opstion);
                    if (!$('#print-modal').length) {
                        $.printPreview.loadPrintPreview(opstion);
                    }
                }
            });
        });
        return this;
    };

    // Private functions
    $.printPreview = {
        // 检测打印机控件是否存在
        CheckIsInstall:function (){
            //
            var sate = false;
            try{
                var LODOP=getLodop();
                if (LODOP.VERSION) {
                    if (LODOP.CVERSION)
                    myFrame.alert("当前有C-Lodop云打印可用!\n C-Lodop版本:"+LODOP.CVERSION+"(内含Lodop"+LODOP.VERSION+")"); 
                     else
                    myFrame.alert("本机已成功安装了Lodop控件！\n 版本号:"+LODOP.VERSION); 

                };
             }catch(err){
                myFrame.confirm("本机未安装打印控件,请下载解压并安装!",function(){
                    // http://www.lodop.net/CLodopPrint_Setup_for_Win32NT.zip
                });
             }
        },
        loadPrintPreview: function(opstion) {
            // Declare DOM objects
            print_modal = $('<div id="print-modal"></div>');
            print_controls = $('<div id="print-modal-controls">' +
                '<a href="#" class="print" title="Print page">Print page</a>' +
                '<a href="#" class="close" title="Close print preview">Close</a>').hide();
            // var print_frame = $('<iframe id="print-modal-content" scrolling="no" border="0" frameborder="0" name="print-frame" />');
            var print_frame = document.createElement('IFRAME');
            $(print_frame).attr({
                // style: iframeStyle,
                'scrolling': "no",
                'border': "0",
                'frameborder': "0",
                'name': "print-frame",
                'id': "print-modal-content"
            });

            // Raise print preview window from the dead, zooooooombies
            print_modal
                .hide()
                .append(print_controls)
                .append(print_frame)
                .appendTo('body');

            // The frame lives
            // for (var i = 0; i < window.frames.length; i++) {
            // debugger
            // if (window.frames[i].name == "print-frame") {
            // var print_frame_ref = window.frames[i].document;
            var print_frame_ref = print_frame.contentWindow.document;
            // break;
            // }
            // }

            print_frame_ref.open();
            print_frame_ref.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' +
                '<head><title>' + document.title + '</title></head>' +
                '<body></body>' +
                '</html>');
            print_frame_ref.close();

            // Grab contents and apply stylesheet
            var $iframe_head;
            // var $iframe_head = $('head link[media*=print], head link[media=all]').clone(),
            // $iframe_body = $('body > *:not(#print-modal):not(script)').clone();
            $iframe_body = '<object id="printWB" style="dispaly:none" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"></object>'+opstion.ifDom.html();
            // var $iframe_head = $("head").html(),

            $(document).find("link").each(function(index, ele) {
                $('head', print_frame_ref).append('<link type="text/css" rel="stylesheet" href=' + $(ele).attr("href") + ' >');
            });

            // $(document).find("script").filter(function() {
            //     return $(this).attr("src");
            // }).each(function(index, ele) {
            //     print_frame_ref.write('<script type="text/javascript" add-src="add" src=' + $(ele).attr("src") + '></script>');
            // });
            // var $iframe_body = '<object id="printWB" style="dispaly:none" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"></object>'+opstion.ifDom.html();
            // $iframe_head.each(function() {
            //     $(this).attr('media', 'all');
            // });
            // print_frame_ref.write($iframe_body);
            if (!$.browser.msie && !($.browser.version < 7)) {
                $('head', print_frame_ref).append($iframe_head);
                $('body', print_frame_ref).append($iframe_body);
            } else {
                // $('body > *:not(#print-modal):not(script)').clone().each(function() {
                //     $('body', print_frame_ref).append(this.outerHTML);
                // });
                $('body', print_frame_ref).append($iframe_body);
                $('head link[media*=print], head link[media=all]').each(function() {
                    $('head', print_frame_ref).append($(this).clone().attr('media', 'all')[0].outerHTML);
                });
            }

            // Disable all links
            $('a', print_frame_ref).bind('click.printPreview', function(e) {
                e.preventDefault();
            });

            // Introduce print styles
            $('head').append('<style type="text/css">' +
                '@media print {' +
                '/* -- Print Preview --*/' +
                '#print-modal-mask,' +
                '#print-modal {' +
                'display: none !important;' +
                '}' +
                '}' +
                '</style>'
            );

            // Load mask
            $.printPreview.loadMask();

            // Disable scrolling
            $('body').css({ overflowY: 'hidden', height: '100%' });
            $('img', print_frame_ref).load(function() {
                $(print_frame).height($('body', $(print_frame).contents())[0].scrollHeight);
            });

            // Position modal
            starting_position = $(window).height() + $(window).scrollTop();
            var css = {
                top: starting_position,
                height: '100%',
                overflowY: 'auto',
                zIndex: 10000,
                display: 'block'
            };
            print_modal
                .css(css)
                .animate({ top: $(window).scrollTop() }, 400, 'linear', function() {
                    print_controls.fadeIn('slow').focus();
                });
            // $(print_frame).height($('body', $(print_frame).contents())[0].scrollHeight);
            setTimeout(function() {
                if (typeof opstion.callBack == "function") {
                    opstion.callBack($(print_frame));
                    $(print_frame).contents().find("body").children().each(function(index, el) {
                        var hSize = $(el).outerHeight(true) + parseInt($(print_frame).height());
                        $(print_frame).css({ "height": hSize + "px" });
                    });
                }
            }, 10);
            // Bind closure
            $('a', print_controls).off().on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('print')) {
                    // $.printPreview.CheckIsInstall();
                    var dd = $(print_frame)[0].contentWindow;
                    dd.focus();
                    //debugger
                    // dd.print();
                    // if(print_frame.contentWindow.document.getElementById('printWB').ExecWB){
                        // print_frame.contentWindow.document.getElementById('printWB').ExecWB(7, 1);
                    // }else {
                        // dd.print();
                    // }
                    // document.getElementById('printWB').ExecWB(7, 1);
                    // if (navigator.userAgent.indexOf("MSIE") > 0) {
                        // document.body.removeChild(iframe);
                    // }
                    // setTimeout(function() {
                    // 显示需要打印的模块
                    // $(print_frame).contents().find("#"+$(ele).attr("id")).css({"display":"block"});
                    // if (typeof opstion.callBack == "function") {
                    //     opstion.callBack($(print_frame).contents());
                    // }
                   if (typeof opstion.clickPrint == "function") {
                        opstion.clickPrint ();
                    }
                    // if(navigator.userAgent.indexOf("MSIE") > -1 ){
                    // $(print_frame).contents().find("#printWB").execWB(7,1);
                    // }else{
                    // dd.print();
                    // }
                    // }, 500);
                } else {
                    $("#print-modal").remove();
                    $.printPreview.distroyPrintPreview();
                }
            });
        },

        distroyPrintPreview: function() {
            print_controls.fadeOut(100);
            print_modal.animate({ top: $(window).scrollTop() - $(window).height(), opacity: 1 }, 400, 'linear', function() {
                print_modal.remove();
                $('body').css({ overflowY: 'auto', height: 'auto' });
            });
            mask.fadeOut('slow', function() {
                mask.remove();
            });

            $(document).unbind("keydown.printPreview.mask");
            mask.unbind("click.printPreview.mask");
            $(window).unbind("resize.printPreview.mask");
        },

        /* -- Mask Functions --*/
        loadMask: function() {
            size = $.printPreview.sizeUpMask();
            mask = $('<div id="print-modal-mask" />').appendTo($('body'));
            mask.css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: size[0],
                height: size[1],
                display: 'none',
                opacity: 0,
                zIndex: 9999,
                backgroundColor: '#000'
            });

            mask.css({ display: 'block' }).fadeTo('400', 0.75);

            $(window).bind("resize..printPreview.mask", function() {
                $.printPreview.updateMaskSize();
            });

            mask.bind("click.printPreview.mask", function(e) {
                $.printPreview.distroyPrintPreview();
            });

            $(document).bind("keydown.printPreview.mask", function(e) {
                if (e.keyCode == 27) { $.printPreview.distroyPrintPreview(); }
            });
        },

        sizeUpMask: function() {
            if ($.browser.msie) {
                // if there are no scrollbars then use window.height
                var d = $(document).height(),
                    w = $(window).height();
                return [
                    window.innerWidth || // ie7+
                    document.documentElement.clientWidth || // ie6  
                    document.body.clientWidth, // ie6 quirks mode
                    d - w < 20 ? w : d
                ];
            } else { return [$(document).width(), $(document).height()]; }
        },

        updateMaskSize: function() {
            var size = $.printPreview.sizeUpMask();
            mask.css({ width: size[0], height: size[1] });
        }
    };
})(jQuery);