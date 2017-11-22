;(function($,window,document,undefined){
    //配置参数
    var defaults = {
        url:"javascript:;",     // 跳转a标签地址
        pagesSize:10,           // 分页总数默认10页
        current:1,              //当前第几页,默认为第1页
        prevCls:'page_prev',    //上一页class
        nextCls:'page_next',    //下一页class
        prevContent:'<',        //上一页按钮内容，可更改
        nextContent:'>',        //下一页按钮内容，可更改
        activeCls:'active',     //当前页选中状态
        coping:false,           //首页和尾页
        little:false,           //点点省略
        homePage:'',            //首页节点内容
        endPage:'',             //尾页节点内容
        count:3,                //当前页前后分页个数
        position:false,         //显示当前页数/总页数
        jump:false,             //跳转到指定页数
        jumpIptCls:'jump-ipt',  //文本框内容
        jumpBtnCls:'jump-btn',  //跳转按钮
        jumpBtn:'跳转',           //跳转按钮文本
        callback:function(){}   //回调
    };

    var Pagination = function(element,options){
        //全局变量
        var opts = options,//配置
            current = opts.current,//当前页
            $document = $(document),
            $obj = $(element);//容器
        /**
         * 获取总页数
         * @return int pages 总页数
         */
        this.getTotalPage = function(){
            // var pages = $obj.siblings('input[type="hidden"]').val();
            var pages = opts.pagesSize;
            return pages;
        };
        //获取当前页
        this.getCurrent = function(){
            return current;
        };

        /**
         * 动态填充分页页码
         * @param int index 页码
         */
        this.filling = function(index){
            var _self = this;
            var html = [];
            var home;
            var ellipsis = opts.little ? '<li><span>...</span></li>' : '';
            var pageCount = this.getTotalPage();
           
            current = index || opts.current;//当前页码
            // 首页
            // if(current >= opts.count * 2 && current != 1 && pageCount != opts.count){
            if( current != 1 && pageCount != opts.count){
                home = opts.coping && opts.homePage ? opts.homePage : '1';
                html.push(opts.coping ? '<li><a href="javascript:;" data-page="1">'+home+'</a></li>':'');
            }

            if(current > 1){//上一页
                html.push('<li><a href="javascript:;" class="'+opts.prevCls+'">'+opts.prevContent+'</a></li>'+ellipsis);
            }else{
                $obj.find('.'+opts.prevCls) && $obj.find('.'+opts.prevCls).remove();
            }

            var start = current - opts.count,
                end = current + opts.count;
            ((start > 1 && current < opts.count) || current == 1) && end++;
            (current > pageCount - opts.count && current >= pageCount) && start++;
            // 循环页数处理
            for (;start <= end; start++) {
                if(start <= pageCount && start >= 1){
                    if(start != current){
                        html.push('<li><a href="javascript:;" data-page="'+start+'">'+ start +'</a></li>');
                    }else{
                        html.push('<li><span class="'+opts.activeCls+'">'+ start +'</span></li>');
                    }
                }
            }
            if(current < pageCount){//下一页
                html.push(ellipsis+'<li><a href="javascript:;" class="'+opts.nextCls+'">'+opts.nextContent+'</a></li>');
            }else{
                $obj.find('.'+opts.nextCls) && $obj.find('.'+opts.nextCls).remove();
            }

            // 末页
            // if(current + opts.count < pageCount && current >= 1 && pageCount > opts.count){
            if( current < opts.pagesSize && current >= 1 && pageCount > opts.count){
                end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                html.push(opts.coping ? '<li><a href="javascript:;" data-page="'+pageCount+'">'+end+'</a></li>' : '');
            }
            

            // 显示当前页数/总页数
            html.push(opts.position ? '<li><p class="paging-position">当前第<span class="now">1</span> /共 <span class="common"></span>页</p><li>':"");
            
            // 添加输入框
            html.push(opts.jump ? '<li><input type="text" class="form-control '+opts.jumpIptCls+'" placeholder="跳转页" aria-describedby="sizing-addon1"></li><li><a href="javascript:;" class="'+opts.jumpBtnCls+'">'+opts.jumpBtn+'</a></li>' : '');

            
            $obj.empty().html('<nav aria-label="Page navigation"><ul class="pagination pagination-sm">'+html.join(" ")+'</ul></nav>');
            typeof opts.callback === 'function' && opts.callback.call(_self);
        };

        //绑定点击事件
        this.eventBind = function(){
            var _self = this;
            var index ;
            var pageCount = this.getTotalPage();//总页数
            // 点击事件
            $obj.off().on('click','a',function(){
                if($(this).hasClass(opts.nextCls)){
                    index = parseInt($obj.find('.'+opts.activeCls).text()) + 1;
                }else if($(this).hasClass(opts.prevCls)){
                    index = parseInt($obj.find('.'+opts.activeCls).text()) - 1;
                }else if($(this).hasClass(opts.jumpBtnCls)){
                    if($obj.find('.'+opts.jumpIptCls).val() !== ''){
                        index = parseInt($obj.find('.'+opts.jumpIptCls).val());
                    }else{
                        return;
                    }
                }else{
                    index = parseInt($(this).data('page'));
                }
                _self.filling(index);
                typeof opts.callback === 'function' && opts.callback.call(_self);
            });
            //输入跳转的页码
            $obj.on('input propertychange','.'+opts.jumpIptCls,function(){
                var $this = $(this);
                var val = $this.val();
                var reg = /[^\d]/g;
                if (reg.test(val)) {
                    $this.val(val.replace(reg, ''));
                }
                (parseInt(val) > pageCount) && $this.val(pageCount);
                if(parseInt(val) === 0){//最小值为1
                    $this.val(1);
                }
            });
            //回车跳转指定页码
            $document.keydown(function(e){
                if(e.keyCode == 13 && $obj.find('.'+opts.jumpIptCls).val()){
                    index = parseInt($obj.find('.'+opts.jumpIptCls).val());
                    _self.filling(index);
                    typeof opts.callback === 'function' && opts.callback.call(_self);
                }
            });
        };

        //初始化
        this.init = function(){
            this.filling(opts.current);
            this.eventBind();
        };
        this.init();
    };

    $.fn.pagination = function(parameter,callback){
        if(typeof parameter == 'function'){//重载
            callback = parameter;
            parameter = {};
        }else{
            parameter = parameter || {};
            callback = callback || function(){};
        }
        var options = $.extend({},defaults,parameter);
        return this.each(function(){
            var pagination = new Pagination(this, options);
            callback(pagination);
        });
    };

})(jQuery,window,document);