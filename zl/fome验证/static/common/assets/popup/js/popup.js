   (function($) {
       // fade
       var html = '<div id="[Id]" class="modal fade " role="dialog" aria-labelledby="modalLabel">' +
           '<div class="modal-dialog modal-sm">' +
           '<div class="modal-content">' +
           '<div class="modal-header">' +
           '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
           '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
           '</div>' +
           '<div class="modal-body clearfix">' +
           '<p class="modal-contP"><i class="fa [status]" aria-hidden="true"></i>[Message]</p>' +
           '</div>' +
           '<div class="modal-footer">' +
           '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
           '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
           '</div>' +
           '</div>' +
           '</div>' +
           '</div>';
       var dialogdHtml = '<div id="[Id]" class="modal fade modal_wrapper" role="dialog" aria-labelledby="modalLabel">' +
           '<div class="modal-dialog">' +
           '<div class="modal-content">' +
           '<div class="modal-header">' +
           '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
           '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
           '</div>' +
           '<div class="modal-body clearfix">' +
           '</div>' +
           '<div class="modal-footer">' +
           '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
           '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
           '</div>' +
           '</div>' +
           '</div>' +
           '</div>';
       var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
       // window.myFrame = function () {  
       var popup = {
           init: function(options) {
               var _this = this;
               options = $.extend({}, {
                   title: "操作提示",
                   message: "提示内容",
                   btnok: "确定",
                   btncl: "取消",
                   width: 200,
                   auto: false,
                   mask: true // 是否显示遮罩
                   // status: "fa-exclamation" // 提示图标
               }, options || {});
               var modalId = _this.generateId();
               // options.status ||  // fa-check 成功 、fa-close 失败、fa-exclamation 默认感叹号  


               if (options.status == "error") {
                  options.status = 'fa-close';
               } else if (options.status == "success") {
                  options.status = 'fa-check';
               } else {
                  options.status = 'fa-exclamation'; 
               }

               //
               var content = html.replace(reg, function(node, key) {
                   return {
                       Id: modalId,
                       Title: options.title,
                       Message: options.message,
                       BtnOk: options.btnok,
                       BtnCancel: options.btncl,
                       status: options.status
                   }[key];
               });
               $('body').append(content);
               var target = $('#' + modalId);
               // bootStrap 自带模态框js 显示隐藏方法
               target.modal({
                   width: options.width,
                   // backdrop: 'static'
                   backdrop: options.mask ? false : 'static'
               });
               
               // hidden.bs.modal的意思就是当弹出的模态框消失的时候，接下来回调的函数
               target.on('hide.bs.modal', function(e) {
                   $('body').find('#' + modalId).next(".modal-backdrop").remove(); // 清楚已关闭的弹出框HTML
                   $('body').find('#' + modalId).remove(); // 清楚已关闭的弹出框HTML

               });
               target.on('hidden.bs.modal', function(e) {
                   $('body').find('#' + modalId).next(".modal-backdrop").remove(); // 清楚已关闭的弹出框HTML
                   $('body').find('#' + modalId).remove();
               });
               // 当模态框对用户可见时触发（将等待 CSS 过渡效果完成）。初始化时的回调函数
               target.on('shown.bs.modal', function(e) {
                  _this.center($(this));
               });
               return modalId;
           },
           // 生成不同时间id
           generateId: function() {
               var date = new Date();
               return 'mdl' + date.valueOf();
           },
           // 可是区域改变大小 居中自适应
           size: function() {
               var _this = this;
               // $(window).resize(function(event) {
               //      /* Act on the event */
               //      var dom = $('body').find(".modal");
               //      for(var i=0;i<dom.length;i++){
               //          _this.center(dom,true);
               //      }
               //  });


           },
           // 模态框垂直居中
           center: function(dom, state) {
               /*    // 是弹出框居中。。。  
                   var $modal_dialog = dom.find('.modal-dialog');  
                   //获取可视窗口的高度  
                   var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;  
                   var clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth: document.documentElement.clientWidth;  
                   //得到dialog的高度  
                   // var dialogHeight = $modal_dialog.height();  
                   var dialogHeight = $modal_dialog.outerHeight(true);  
                   var dialogWidth = $modal_dialog.outerWidth(true);  
                   // var contWidth = dom.find(".modal-content").outerWidth(true);  
                   //计算出距离顶部的高度  
                   // var m_top = (clientHeight - dialogHeight)/2;  
                   var m_left = (clientWidth - dialogWidth)/2;  
                    var m_top = (dialogHeight)/2;
                   // var m_left = (dialogWidth)/2;  
       
                   console.log("clientHeight : " + clientHeight);  
                   console.log("dialogHeight : " + dialogHeight);  
                   console.log("m_top : " + m_top);
                   if(state){ 
                       dom.stop(true,false).animate({
                           'left': m_left+"px "
                       },500);  
                   }else {
                       // setTimeout(function(){
                           dom.stop(true,false).css({
                               'left':  m_left+"px "
                           },1000);  
                       // },10); 
                   } */
               //dom.css({"min-height":dom.find('.modal-dialog').height()+"px"});
           },
           // 错误与成功提示框
           alert: function(options) {
               var _this = this;
               if (typeof options == 'object') {
                   options = $.extend({}, {
                       mask: options.mask,
                       message: options.message
                   }, options || {});
               }
               var id = _this.init(options);
               var modal = $('#' + id);
               modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
               modal.find('.cancel').hide();

               return {
                   id: id,
                   on: function(callback) {
                       if (callback && callback instanceof Function) {
                           modal.find('.ok').click(function() {
                               callback(true);
                           });
                       }
                   },
                   closeCLick: function(callback) {
                       if (callback && callback instanceof Function) {
                           modal.find('.close').click(function() {
                               callback(true);
                           });
                       }
                   },
                   hide: function(callback) {
                       if (callback && callback instanceof Function) {
                           modal.on('hide.bs.modal', function(e) {
                               callback(e);
                           });
                       }
                   }
               };
           },
           // 再次确认提示框
           confirm: function(options) {
               var _this = this;
               var id = _this.init(options);
               var modal = $('#' + id);
               modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
               modal.find('.cancel').show();
               return {
                   id: id,
                   onSure: function(callback) {
                       if (callback && callback instanceof Function) {
                           // 确定
                           modal.find('.ok').click(function() {
                               var hide = callback(true);
                               if (hide) {
                                   modal.modal('hide');
                               } else {
                                   modal.modal('show');
                               }
                           });
                       }
                   },
                   onClose: function(callback) {
                       if (callback && callback instanceof Function) {
                           // 取消
                           modal.find('.cancel').click(function() {

                               var hide = callback(false);
                               if (hide) {
                                   modal.modal('hide');
                               } else {
                                   modal.modal('show');
                               }
                           });
                       }
                   },
                   hide: function(callback) {
                       if (callback && callback instanceof Function) {
                           modal.on('hide.bs.modal', function(e) {
                               callback(e);
                           });
                       }
                   }
               };
           },
           // 弹出框 (操作页面)
           dialog: function(options) {
               var _this = this;
               options = $.extend({}, {
                   title: 'title',
                   url: '',
                   width: 800,
                   height: 550,
                   btnok: "确定",
                   btncl: "取消",
                   btn: false,
                   data: options.data
               }, options || {});
               var modalId = _this.generateId();
               var content = dialogdHtml.replace(reg, function(node, key) {
                   return {
                       Id: modalId,
                       Title: options.title,
                       BtnOk: options.btnok,
                       BtnCancel: options.btncl
                   }[key];
               });

               $('body').append(content);
               var target = $('#' + modalId);


               // 是否使用默认按钮
               if (!options.btn) {
                   target.find('.modal-footer').remove();
               }
               // 加载页面碎片地址
               myFrame.loadingShow(options.maskShow, options.loadingBox, options.loadingCallback); 
               target.find('.modal-body').load(options.url, function(response, status, xhr) { // response - 包含来自请求的结果数据、status - 包含请求的状态 、xhr - 包含 XMLHttpRequest 对象
                   target.find('.modal-body').data(options.data); // 传值到页面
                   myFrame.pageCallBack(target.find('.modal-body')); // 传回 当前 弹出框 dom节点
               }).css({
                   height: options.height // 改变弹出框内容高度  
               });

               target.modal('show').find(".modal-dialog").css({
                   "width": options.width // 改变弹出框内容宽度 
               });

               target.on('hidden.bs.modal', function(e) {
                   $('body').find('#' + modalId).next(".modal-backdrop").remove(); // 清楚已关闭的弹出框HTML
                   $('body').find(target).remove();
                   layer.closeAll('tips');
               });

               // if (options.onReady()) options.onReady.call(target);
               // hidden.bs.modal的意思就是当弹出的模态框消失的时候，接下来回调的函数
               target.on('hide.bs.modal', function(e) {
                   $('body').find(target).remove();
               });

               // if (options.closeClick()) options.closeClick.call(target);


               return {
                   onReady: function(callback) { // 弹出框初始化 之后操作回调
                       if (callback && callback instanceof Function) {
                           // 当模态框对用户可见时触发（shown.bs.modal将等待 CSS 过渡效果完成）。初始化时的回调函数
                           target.on('shown.bs.modal ', function(e) {
                               _this.center($(this));
                               setTimeout(myFrame.loadingHide(options.loadingBox),300);
                               if (options.onReady(e)) options.onReady.call(target, e);
                           });
                       }
                   },
                   onSure: function(callback) { // 默认 确认按钮
                       if (callback && callback instanceof Function) {
                           //当调用 hide 实例方法时触发。
                           target.find('.ok').on('click', function(e) {
                               $('body').find(target).remove();
                               callback(target, e);
                           });
                       }
                   },
                   onCancel: function(callback) { // 默认 取消按钮
                       if (callback && callback instanceof Function) {
                           //当调用 hide 实例方法时触发。
                           target.find('.cancel').on('click', function(e) {
                               layer.closeAll('tips'); // 关闭验证提示框
                               $('body').find(target).remove();
                               callback(target, e);
                           });
                       }
                   },
                   onClose: function(callback) { // 右上角叉叉关闭回调函数
                       if (callback && callback instanceof Function) {
                           target.find('.close').click(function() {
                               layer.closeAll('tips'); // 关闭验证提示框
                               $('body').find('#' + modalId).next(".modal-backdrop").remove(); // 清楚已关闭的弹出框HTML
                               $('body').find(target).remove();
                               callback(true);
                           });
                       }
                   }
               };
           }
       };

       // return popup;
       window.myPopup = popup;
   })(jQuery);