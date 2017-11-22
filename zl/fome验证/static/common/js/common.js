//get form data 获取form input等数据
// define(["pagination"], function(pagination) {
(function(window, undefined) {
    //framework library
    var myFrame = {
        version: "V1.0",
        config: (window.myFrame && window.myFrame.config) || {},
        module: (window.myFrame && window.myFrame.module) || {},
        temp: {}
    };
    var _this;
    // myFrame = {
    myFrame.init = function() {
        _this = this;
        // myFrame.alert(555);
        // _this.pluginPath();
    };
    //   文字省略
    /**
     * @param e dom节点
     * @param i 限制字数
     * @param suffix 可选参数 后缀样式 默认...
     */
    myFrame.slight = function(e, i, suffix) {
        var textSuffix = suffix || "...";
        $(e).each(function() {
            //获取td当前对象的文本,如果长度大于i;
            console.log($(this).text().length);
            if ($(this).text().length >= i) {
                //给td设置title属性,并且设置td的完整值.给title属性.
                // $(this).attr("title", $(this).text());
                //获取td的值,进行截取。赋值给text变量保存.
                var text = $(this).text().substring(0, i) + textSuffix;
                //重新为td赋值;
                $(this).text(text);
            }
        });
    };
    // 请求页面碎片
    /**
     * @param href 请求页面地址
     * @param type 区别类型 用于 追加于还是覆盖容器
     * @param cont 追加容器
     * @param data 请求接口参数
     * @param dataVal 传递参数
     */
    myFrame.loadTab = function(options) {
        var _this = this,
            pageUrl;
        //先加载 css文件  后渲染  html 模块  保障用户体验
        if (options.href.indexOf(".html") > 0) {
            pageUrl = options.href.split(".html")[0] + ".css";
            // var pageUrl =options.href.split(".html")[0] + ".css";
            myFrame.loadCSS(filePath + pageUrl);
        }
        // 加载请求 jsp文件路径 css
        if (options.hrefType && options.hrefType != "") {
            myFrame.loadCSS($$(options.hrefType + ".css"));
        }

        // _this.loadingShow(true, $("body"));
        return _this.request({
            url: $$(options.href),
            async: false,
            type: "GET",
            dataType: "html",
            data: options.data || "",
            markShow: true,
            loading: false,
            loadingBox: $("body"),
            success: function(d) {
                if (options.type == "html") {
                    options.cont.html(d);
                    if (typeof options.callBack == "function") options.callBack(options.cont, $(d));
                } else if (options.type == "append") {
                    options.cont.append(d);
                    if (typeof options.callBack == "function") options.callBack(options.cont, $(d));
                }

                options.cont.find(".myFrame_container").last().data(options.dataVal); // 传值到页面
                myFrame.pageCallBack(options.cont.find(".myFrame_container").last()); // 传回 当前 弹出框 dom节点

                // _this.loadingHide();
            }
        });
    };

    //
    /**
     * [laodPage description]
     * @param  {[type]} option   [description]
     * @param  {[type]} callBack [description]
     * @return {[type]}          [description]
     */
    myFrame.laodPage = function(option, callBack) {
        var defaultOption = {
                el: $("#contentRight"),
                cacheData: {},
                type: "GET"
            },
            _this = this;
        var option = $.extend({}, defaultOption, option);
        var state = false;
        // _this.loadingShow(true, $("body"));
        //先加载 css文件  后渲染  html 模块  保障用户体验
        if (option.url.indexOf(".html") > 0) {
            var pageUrl = option.url.split(".html")[0] + ".css";
            state = myFrame.loadCSS(pageUrl);
        }
        if (state) {
            $.ajax({
                type: "GET",
                async: false,
                url: filePath + option.url,
                success: function(d) {
                    window.tabC = [];
                    option.el.data({
                        'getPageData': function() {
                            return option.cacheData;
                        }
                    });
                    option.el.append(d);
                    _this.loadingHide();
                    if (typeof callBack == "function") callBack(option.el, $(d));
                }
            });
        }
    };
    //依赖加载请求HTML对应 css 文件
    /**
     * [loadCSS description]
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    myFrame.loadCSS = function(url) {
        var _this = this;
        // var cssUrl = require.toUrl(url);
        var cssUrl = url;
        var isRepeat = false;
        //遍历控制  防止重复加载
        for (var i = 0; i < $("link").length; i++) {
            if ($("link")[i].getAttribute("href").split("?bust=")[0].indexOf(url) != -1) {
                isRepeat = true;
                break;
            }
        }

        if (!isRepeat) {
            //判断文件是否存在
            //存在的情况下  在推送 dom  防止IE浏览器承载 css文件过多
            myFrame.fileIsExist(cssUrl, function(isExist) {
                if (isExist) {
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.type = "text/css";
                    link.href = cssUrl; // document.getElementsByTagName("head")[0].appendChild(link);
                    var likDom = $("head").find('link'); // 获取所有link节点
                    return _this.insertAfter(link, likDom[likDom.length - 1]);
                }
            });

        }
    };
    // 通过接口下载 方法
    /**
     * @param api [string]：下载接口url地址。
     * @param params [object]：传给后台api接口的参数。
     */
    myFrame.downLoad = function(api, params) {
        var form = $("<form target=\"_blank\" method=\"post\" action=\"" + api + "\" name=\"downLoad\"></form>");
        for (key in params) {
            form.append("<input type=\"hidden\" name=\"" + key + "\" value=\"" + params[key] + "\"/>");
        }
        $("body").append(form);
        form.submit();
        form.remove();
    };



    // javascript  在指定节点之前插入新节点 
    /**
     * @param newElement 新插入的节点
     * @param targetElement 在节点之后插入
     */
    myFrame.insertAfter = function(newElement, targetElement) {
        var parent = targetElement.parentNode,
            state = false;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
            state = true;
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
            state = true;
        }
        return state;
    };
    //根据路径，判断 文件是否在 本机存在
    /**
     * [fileIsExist description]
     * @param  {[type]}   filepath [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    myFrame.fileIsExist = function(filepath, callback) {
        return this.request({
            url: filepath,
            async: false,
            type: "GET",
            dataType: "html",
            markShow: true,
            loading: false,
            loadingBox: $("body"),
            error: function() {
                if (typeof callback == "function") callback(false);
            },
            success: function() {
                if (typeof callback == "function") callback(true);
            }
        });
    };
    // ajax 请求封装
    /**
     * [request description]
     * @param  {[type]} option [description]
     * @return {[type]}        [description]
     */
    myFrame.request = function(option) {
        var _this = this,
            ajaxTimeoutTest, result = "",
            async = (option.async === false ? false : true);
        if (!option.loading) myFrame.loadingShow();

        ajaxTimeoutTest = $.ajax({
            type: option.type || 'POST',
            data: option.data || {},
            url: _this.setNoCacheUrl(option.url) || '',
            async: async,
            timeout: 60000,
            dataType: option.dataType || 'JSON',
            beforeSend: function() {
                if (typeof option.beforeSend == "function") option.beforeSend();
            },
            success: function(data) {
                result = data;
                if (typeof option.success == 'function') option.success(data);
                if (!option.loading) setTimeout(myFrame.loadingHide, 300);
            },
            error: function(ex) {
                myFrame.loadingHide();
                switch (ex.status) {
                    case 0:
                        var msg = "服务器已经停止运行，请通知系统管理员检查并解决。";

                        if ($(".alert-alert").last().text().indexOf(msg) < 0) {
                            myFrame.alert("error", msg, function() { //如果有菜单遮罩 移除
                                // myFrame.loadingHide(option.loadingBox);
                            });
                        }
                        break;
                    case 401:
                        window.location.reload();
                        break;
                    case 403: // 登录过期 重新登陆
                        window.location.reload();
                        break;
                    case 404:
                        _this.alert(option.url + "，请求服务器的接口不存在。");
                        break;
                    case 500:
                        var msg = decodeURIComponent(ex.getResponseHeader("Error-Message"));
                        if ($(".alert-alert").last().text() != msg) myFrame.alert(msg, ex.responseText);
                        break;
                }
                if (typeof option.error == 'function') option.error(ex);
            },
            complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    ajaxTimeoutTest.abort();
                    myFrame.alert("超时");
                    myFrame.loadingHide();
                }
            }
        });
        if (async == false) return result;
    };
    // 接口数据 返回
    /**
     * @param url 请求地址
     * @param type 请求类型
     * @param data 请求后台参数
     * @param loading 是否有加载loading效果
     * @param loadingBox loading效果展示容器
     * @param markShow loading效果 遮罩
     */
    myFrame.getJson = function(url, type, data, dataType, loading, loadingBox, markShow) {
        return this.request({
            url: url,
            data: data || {},
            async: false,
            type: type || "get",
            dataType: dataType || "json",
            markShow: markShow || true,
            loading: loading || false,
            loadingBox: loadingBox || $("body")
        });
    };
    // 解析清地址或接口地址
    /**
     * [setNoCacheUrl description]
     * @param {[type]} url [description]
     */
    myFrame.setNoCacheUrl = function(url) {
        if (url.indexOf("?") >= 0) url += "&rd=" + Math.random();
        else url += "?rd=" + Math.random();
        url = url.replace(/\/{2}/, '/');
        return url;
    };
    // 模态框关闭方法
    /**
     * [closeBox ]
     * @param  {[type]} dom  弹出框加载页面dom节点
     * @return {[type]}     [description]
     */
    myFrame.closeBox = function(dom) {
        var box = dom.parents(".modal");
        layer.closeAll('tips'); // 关闭验证提示框
        box.next(".modal-backdrop").remove(); // 清楚已关闭的弹出框HTML
        box.remove(); // 清楚已关闭的弹出框HTML
        // debugger
        // $("#edui_fixedlayer").remove();
    };
    // load加载、弹出页面加载回调对象
    /**
     * [pageCallBack description]
     * @param  {[type]} container [ 容器对象节点]
     * @return {[type]}           [description]
     */
    myFrame.pageCallBack = function(container) {

    };

    // 弹出框
    /**
     * @param title 弹出框标题
     * @param url 请求加载碎片地址
     * @param onReady 弹出框显示时回调函数
     * @param onShown  
     * @param closeClick 
     * @param data   // 向弹出框页面传递参数
     */
    myFrame.dialog = function(options) {
        var _this = this;

        options = $.extend({}, {
            title: 'title',
            url: '',
            width: 600,
            height: 500,
            btnok: "确定",
            btncl: "取消",
            btn: false,
            data: "",
            onReady: function(e) {},
            onShown: function(e) {},
            closeClick: function(e) {

            }
        }, options || {});

        var myAlert = myPopup.dialog(options);


        // 弹出框初始化 之后操作回调
        myAlert.onReady(function(target) {
            if (typeof options.onReady == "function") return options.onReady(target);
        });
        // 默认 确认按钮
        myAlert.onSure(function(target) {
            if (typeof options.onSure == "function") return options.onSure(target);
        });
        // 默认 取消按钮
        myAlert.onCancel(function(target) {
            if (typeof options.onCancel == "function") return options.onCancel(target);
        });
        // 红叉关闭按钮
        myAlert.onClose(function(target) {
            if (typeof options.onClose == "function") return options.onClose(target);
        });
    };
    // 错误与成功提示框
    /**
     * @param status 提示图标
     * @param message 提示内容
     * @param sure 点击确定按钮回调函数
     * @param mask loading效果 遮罩
     * @param title  标题信息 默认系统提示
     * @param btnok  确定 文字
     * @param btncl  取消 文字
     * @param width  宽度
     * @param height 高度
     */
    myFrame.alert = function(status, message, sure, mask, title, btnok, btncl, width, height) {

        if (arguments[0] == "success" || arguments[0] == "error") {
            status = arguments[0];
        } else {
            message = status;
            status = undefined;
        }
        var _this = this;
        var myAlert = myPopup.alert({
            title: title || "系统提示",
            message: message || "提示内容",
            mask: mask,
            btnok: btnok || "确定",
            btncl: btncl || "取消",
            width: width || 800,
            height: height || 550,
            auto: false,
            status: status,
        });
        // 点击确定时触发
        myAlert.on(function() {
            if (typeof sure == "function") {
                sure();
            }
        });
        // 关闭按钮
        myAlert.closeCLick(function() {

        });
    };
    // 再次确认提示框
    /**
     * @param status 提示图标
     * @param message 提示内容
     * @param sure 点击确定按钮回调函数
     * @param close 点击取消按钮回调函数
     * @param mask loading效果 遮罩
     * @param title  标题信息 默认系统提示
     * @param btnok  确定 文字
     * @param btncl  取消 文字
     * @param width  宽度
     * @param height 高度 
     */
    myFrame.confirm = function(status, message, sure, notSure, title, mask, btnok, btncl, width, height) {
        var _this = this;
        var close = close || function() {};
        var myAlert = myPopup.confirm({
            title: title || "系统提示",
            message: message || "提示内容",
            mask: mask,
            btnok: btnok || "确定",
            btncl: btncl || "取消",
            width: width || 800,
            height: height || 550,
            auto: false,
            // status: undefined,
            status: undefined,
            onReady: function(dom, e) {

            },
            onShown: function(e) {

            }
        });

        // 点击确定时触发
        myAlert.onSure(function(target) {
            if (typeof sure == "function") return sure(target);
        });
        // 点击关闭时触发
        myAlert.onClose(function(target) {
            if (typeof sure == "function") {
                if (typeof notSure == "function") return notSure(target);
            }
        });
        // 关闭按钮
        myAlert.hide(function() {

        });
    };
    // 文字公告轮播特效 
    /**
     * [ScrollImgLeft description]
     * @param {[type]} beginDiv [description]
     * @param {[type]} endDiv   [description]
     * @param {[type]} contDiv  [description]
     * @param {[type]} speed    [description]
     */
    myFrame.ScrollImgLeft = function(beginDiv, endDiv, contDiv, speed) {
        var speed = speed;
        var scroll_begin = document.getElementById(beginDiv);
        var scroll_end = document.getElementById(endDiv);
        var scroll_div = document.getElementById(contDiv);
        scroll_end.innerHTML = scroll_begin.innerHTML;

        function Marquee() {
            if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
                scroll_div.scrollLeft -= scroll_begin.offsetWidth;
            else
                scroll_div.scrollLeft++;
        }
        var MyMar = setInterval(Marquee, speed);
        scroll_div.onmouseover = function() {
            clearInterval(MyMar);
        };
        scroll_div.onmouseout = function() {
            MyMar = setInterval(Marquee, speed);
        };
    };
    // 回填数据 input、 select、textarea 的name value 值
    /**
     * [buildFormValue description]
     * @param  {[type]} target         [description]
     * @param  {[type]} data           [description]
     * @param  {[type]} dataObjectName [description]
     * @return {[type]}                [description]
     */
    myFrame.buildFormValue = function(target, data, dataObjectName) {
        if (typeof data != "object") return;
        var obj,
            type,
            value;
        target.find("input,textarea,select").each(function() {
            if ($(this).attr("noreturn")) return;
            var name = $(this).attr("name");
            if (name && data[name.replace(dataObjectName, "")] != undefined) {
                obj = $(this);
                type = (obj[0].tagName).toLowerCase();
                value = data[name.replace(dataObjectName, "")];
                switch (type) {
                    case "select":
                        var selected = obj.find("option[value=\"" + value + "\"]"),
                            selectList = obj.next(".controls-select");
                        selected.attr("selected", true);
                        if (typeof obj.refreshSelect == "function") {
                            obj.refreshSelect();
                        }
                        if (selectList.size() > 0) {
                            selectList.find(".value").text(selected.text());
                            $(window).resize();
                        }
                        break;
                    case "input":
                        if (obj.attr("type") == "text" || obj.attr("type") == "password" || obj.attr("type") == "hidden") {
                            obj.val(value);
                        } else if (obj.attr("type") == "radio") {
                            var temp = target.find("[name=\"" + name + "\"][value=\"" + value + "\"]");
                            if (temp.attr("init")) return;
                            if (temp.size() == 1) {
                                if (temp.hasClass("read-only")) {
                                    target.find("[name=\"" + name + "\"]").removeAttr("checked").parent().removeClass("checked");
                                    temp.parent().addClass("checked");
                                    temp.attr("checked", true);
                                } else {
                                    temp.parent().click();
                                }
                                temp.attr("init", true);
                            }
                        } else if (obj.attr("type") == "checkbox") {
                            var tempAttr = value + "";
                            if (tempAttr) tempAttr = tempAttr.split(",");
                            else return;

                            if (target.find("[name=\"" + name + "\"]").eq(0).hasClass("checked")) {
                                target.find("[name=\"" + name + "\"]").removeAttr("checked").parent().removeClass("checked");
                            }
                            for (var i = 0; i < tempAttr.length; i++) {
                                var temp = target.find("[name=\"" + name + "\"][value=\"" + tempAttr[i] + "\"]");
                                if (temp.attr("init")) return;
                                if (temp.size() > 0) {
                                    if (temp.hasClass("read-only")) {
                                        temp.parent().addClass("checked");
                                        temp.attr("checked", true);
                                    } else temp.parent().click();
                                    temp.attr("init", true);
                                }
                            }
                        }
                        break;
                    case "textarea":
                        obj.val(value);
                        break;
                }
            }
        });
    };


    // 显示加载提示框
    /**
     * [loadingShow description]
     * @param  {[type]}   maskShow   [ 遮罩层是否显示]
     * @param  {[type]}   loadingBox [加载显示容器]
     * @param  {Function} callback   [加载后回调函数]
     * @return {[type]}              [description]
     */
    myFrame.loadingShow = function(maskShow, loadingBox, callback) {
        loadingBox = loadingBox || $("body");
        var w = loadingBox.width(),
            h = loadingBox.height(),
            loadingDom = loadingBox.children('.page-loading');
        if (loadingDom.length > 0) {
            loadingDom.show();
        } else {
            loadingBox.append($("<div  class=\"page-loading\"><span class=\"text-hide\">加载中，请稍后...</span></div>"));
        }
        if (!maskShow) myFrame.maskShow(loadingBox);
        if (typeof callback == "function") callback();
    };

    // 隐藏加载提示框
    /**
     * [loadingHide description]
     * @param  {[type]} loadingBox [需要隐藏的加载层容器]
     * @return {[type]}            [description]
     */
    myFrame.loadingHide = function(loadingBox) {
        myFrame.maskHide();
        loadingBox ? loadingBox.find(".page-loading").fadeOut("fast") : $("body").children(".page-loading").fadeOut("fast");
    };

    // 遮罩层 显示
    myFrame.maskShow = function(maskDOm) {
        var mask = $(".mask");
        if (mask.size() > 0) {
            mask.eq(0).show();
        } else {
            $("body").append("<div class=\"mask\"></div>");
        }
    };
    // 遮罩层 隐藏
    myFrame.maskHide = function() {
        $(".mask").css("filter", "alpha(opacity=15)");
        $(".mask").fadeOut("fast");
    };


    //解析url参数
    /**
     * [getUrlString description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    myFrame.getUrlString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    };
    // 获取url地址栏参数
    /**
     * [getRequest description]
     * @param  {[type]} urlDat [description]
     * @return {[type]}        [description]
     */
    myFrame.getRequest = function(urlDat) {
        var url = urlDat || location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    // 监听浏览器 前进 后退 按钮 刷新页面
    myFrame.initialize = function() {
        //监听hashchange事件
        window.addEventListener('hashchange', function() {

            //为当前导航页附加一个tag
            this.history.replaceState('hasHash', '', '');

        }, false);

        window.addEventListener('popstate', function(e) {

            if (e.state) {
                //侦测是用户触发的后退操作, dosomething
                //这里刷新当前url
                this.location.reload();
            }
        }, false);
    };
    // 判断数组是否有重复值 true为有重复值 false没有重复值
    /**
     * [isRepeat description]
     * @param  {[type]}  arr [description]
     * @return {Boolean}     [description]
     */
    myFrame.isRepeat = function(arr) {
        var hash = {};
        for (var i in arr) {
            if (hash[arr[i]]) {
                return true;
            }
            hash[arr[i]] = true;
        }
        return false;
    };
    // 判断是否为null
    /**
     * [isNull description]
     * @param  {[type]}  name [description]
     * @return {Boolean}      [description]
     */
    myFrame.isNull = function(name) {
        var stie = false;
        if (!name && typeof(name) != "undefined" && name != 0) {
            stie = true;
        }

        // return !name && name!==0 && typeof name!=="boolean"?true:false;
        return stie;
    };
    // 时间相加减方法
    /**
     * [dateOperator description]
     * @param  {[2014-01-01]} date     [description]
     * @param  {[1]} days     [description]
     * @param  {[+/-]} operator [description]
     * myFrame.dateOperator("2014-01-01",1,"-")
     */
    myFrame.dateOperator = function(date, days, operator) {
        date = date.replace(/-/g, "/"); //更改日期格式  
        var nd = new Date(date);
        nd = nd.valueOf();
        if (operator == "+") {
            nd = nd + days * 24 * 60 * 60 * 1000;
        } else if (operator == "-") {
            nd = nd - days * 24 * 60 * 60 * 1000;
        } else {
            return false;
        }
        nd = new Date(nd);

        var y = nd.getFullYear();
        var m = nd.getMonth() + 1;
        var d = nd.getDate();
        if (m <= 9) m = "0" + m;
        if (d <= 9) d = "0" + d;
        var cdate = y + "-" + m + "-" + d;
        return cdate;
    };

    //  layerDate 时间插件
    /**
     * [laydate description]
     * @param  {[type]} option [description]
     * @return {[type]}        [description]
     */
    myFrame.laydate = function(option) {
        laydate.render({
            theme: option.theme || "defaults", // 主题  default（默认简约）、molv（墨绿背景）、#颜色值（自定义颜色背景）、grid（格子主题）
            elem: option.elem, // 绑定元素
            dateState: option.dateState || false, // 时间范围 默认 false 开始时间 startState \ 结束时间 endState
            sectionId: option.sectionId || false, // 比较区间 对象ID 默认 false 
            format: option.format || 'YYYY-MM-DD hh:mm:ss', //自定义格式
            type: option.type || "date", // year 年、month年月、date 日期、time 时间、 datetime 日期时间选择器
            range: option.range || false, //开启左右面板范围选择
            value: option.value || new Date(), // 初始值  
            min: option.min || '1900-1-1', // 最小日期范围      
            max: option.max || '2099-12-31', // 最大日期范围 
            trigger: option.trigger || "focus", // 自定义弹出控件的事件
            show: option.show || false, // 是否默认弹出显示
            position: option.position || "absolute", // 定位方式
            zIndex: option.zIndex || 66666666, //层叠顺序
            showBottom: option.showBottom || true, // 是否显示底部栏
            btns: option.btns || ['clear', 'now', 'confirm'], // 工具按钮 顺序
            lang: option.lang || 'cn', // 默认中文 en国际英文版
            calendar: option.calendar || false, // 是否显示公历节日
            mark: option.mark || {}, // '2017-8-21': '发布' 公历标注重要日子 年变成0 则是每年显示
            ready: option.ready, // 插件初始化回调  fixed 固定定位 、 static 静态定位
            change: option.change, //改变日期回调  value 得到日期生成的值, date 得到日期时间对象, endDate 得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上
            done: option.done, //  选择日期后回调 
        });
        // var date = laydate.render({}); date.hint() 当前实例对象。其中包含一些成员属性和方法
        // laydate.getEndDate(month, year) 获取指定年月的最后一天
    };
    // 时间日期区间选择 限制 插件
    /**
     * [datetimeLimit object]
     * @param  {[type]} startDom [substring] 开始时间 dom节点
     * @param  {[type]} startSet [object] myFrame.laydate() 开始时间插件配置
     * @param  {[type]} endDom   [object] 结束时间 dom节点
     * @param  {[type]} endSet   [substring] myFrame.laydate() 结束时间插件配置
     */
    myFrame.datetimeLimit = function(startDom, startSet, endDom, endSet) {
        startSet = $.extend({}, {
            elem: startDom,
            format: 'yyyy-MM-dd',
            theme: "#1756af",
            max: $(endDom).val(),
            show: true, //直,接显示
            closeStop: startDom, //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
            btns: ['now', 'confirm'],
            done: function(value, date, endDate) { //改变日期触发事件

            }
        }, startSet || {});

        endSet = $.extend({}, {
            elem: endDom,
            format: 'yyyy-MM-dd',
            theme: "#1756af",
            min: $(startDom).val(),
            btns: ['now', 'confirm'],
            show: true, //直接显示
            closeStop: endDom, //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
            done: function(value, date, endDate) {

            }
        }, startSet || {});

        //外部事件调用
        $(startDom).on('click', function(e) { //假设 test1 是一个按钮
            startSet.max = $(endDom).val();
            myFrame.laydate(startSet);
        });
        $(endDom).on('click', function(e) { //假设 test1 是一个按钮
            endSet.min = $(startDom).val();
            myFrame.laydate(endSet);
        });
    };
    // 加载插件方法 引入js 、css文件
    myFrame.pluginPath = function() {
        var config = myFrame.config,
            assetsPath = config.assetsPath,
            link = "",
            scripts = "",
            // aryJs = [],aryCss = [],
            head = document.getElementsByTagName("head").item(0),
            linkDom = head.getElementsByTagName("link").item(0),
            body = document.getElementsByTagName("body").item(0),
            scriptDom = body.getElementsByTagName("script").item(0);
        config.assets.map(function(data, index) {
            // js
            if (data.js && data.js != "") {
                scripts = document.createElement("script");
                scripts.type = "text/javascript";
                scripts.src = assetsPath + data.js;
                body.appendChild(scripts);
            }
            // css
            if (data.css && data.css != "") {
                link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = assetsPath + data.css;
                head.insertBefore(link, linkDom);
            }

        });
    };

    // 滚动条插件
    /**
     * [jScrollPane description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     * 滚动条 初始化成功必须要有内容或高度
     */
    myFrame.jScrollPane = function(options) {


        // 初始化
        var jspApi = options.elem.jScrollPane({
            showArrows: options.showArrows || false, // boolean (default false)//显示滑杆两边的箭头
            maintainPosition: options.maintainPosition || true, // boolean (default true)//保持原位置
            stickToBottom: options.stickToBottom || false, // boolean (default false)//滑到底部
            stickToRight: options.stickToRight || false, // boolean (default false)//滑到最右边
            autoReinitialise: options.autoReinitialise || false, // boolean (default false)// 滚动元素内容动态增加及时更新滚动条 自动加载出现滑杆  
            autoReinitialiseDelay: options.autoReinitialiseDelay || 500, // int (default 500)//自动加载的时间延迟
            verticalDragMinHeight: options.verticalDragMinHeight || 0, // int (default 0)//垂直拖拽的最小高度
            verticalDragMaxHeight: options.verticalDragMaxHeight || 99999, // int (default 99999)//处置拖拽的最大高度
            horizontalDragMinWidth: options.horizontalDragMinWidth || 0, // int (default 0)//水平拖拽的长度
            horizontalDragMaxWidth: options.horizontalDragMaxWidth || 99999, // int (default 99999)//水平拖拽的最大长度
            contentWidth: options.contentWidth || undefined, // int (default undefined)//内幕内用的宽度
            animateScroll: options.animateScroll || false, // boolean (default false)//滚动动画
            animateDuration: options.animateDuration || 300, // int (default 300)//动画延迟
            animateEase: options.animateEase || 'linear', // string (default 'linear')//动画轨迹
            hijackInternalLinks: options.hijackInternalLinks || false, // boolean (default false)//截获内部链接
            verticalGutter: options.verticalGutter || 4, // int (default 4)//处置不掉长度
            horizontalGutter: options.horizontalGutter || 4, // int (default 4)//水平不掉长度
            mouseWheelSpeed: options.mouseWheelSpeed || 10, // int (default 10)//鼠标疼速度
            arrowButtonSpeed: options.arrowButtonSpeed || 10, // int (default 10)//方向键按钮的速度
            arrowRepeatFreq: options.arrowRepeatFreq || 100, // int (default 100)//按钮事件重复频率
            arrowScrollOnHover: options.arrowScrollOnHover || false, // boolean (default false)//接手鼠标在方向键上滑过的动作
            verticalArrowPositions: options.verticalArrowPositions || "split", // string [split|before|after|os] (default split)//垂直方向上按钮的位置
            horizontalArrowPositions: options.horizontalArrowPositions || "split", // string [split|before|after|os] (default split)//水平方向上按钮的位置
            enableKeyboardNavigation: options.enableKeyboardNavigation || true, // boolean (default true)//是否接受键盘操作 
            hideFocus: options.hideFocus || false, // boolean (default false)//隐藏焦点
            clickOnTrack: options.clickOnTrack || true, // boolean (default true)//路径上点击操作
            trackClickSpeed: options.trackClickSpeed || 30, // int (default 30)//互动轨迹上的点击速度
            trackClickRepeatFreq: options.trackClickRepeatFreq || 100, // int (default 100)//滑动轨迹上的重复频率 
            showCallback: options.showCallback // 滚动条出现时 的回调函数
        });

        //获取滚动条  
        var refreshApi = jspApi.data("jsp");
        //重新加载刷新滚动条  
        refreshApi.reinitialise(options);
    };

    // 日期格式转换
    /*
     *    date 日期时间
     *    fmt 需转换的格式
     */
    myFrame.DateFormat = function(date, fmt) {
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
        // 例子： 
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
        // Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
        // };
    };

    // 判断 板块是否处于 浏览器可是区域内
    /**
     * [butArea description]
     * @param  {[type]} dom [description]
     * @return {[type]}     [description]
     */
    myFrame.butArea = function(dom) {
        if (dom.offset().top >= $(window).scrollTop() && dom.offset().top < ($(window).scrollTop() + $(window).height())) {
            return true; // 在可视区域
        }
        return false; // 不在可视区域
    };

    // 表单检验方法
    /**
     * [validator description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    myFrame.validator = function(options) {
        $(options.elem).validator({
            submitBtnId: options.submitBtnId || "", // 提交按钮 ID 
            scrollDom: options.scrollDom, // 提交验证时定位
            backColor: options.backColor || [3, '#78BA32'], // 提示框 方向 颜色
            sure: function(that) { // 验证成功后的回调函数 that 当前提交按钮
                if (typeof options.sure == "function") options.sure(that);
            }
        });
    };


    //检测密码强度
    //checkPwd('12asdASAD')
    //3(强度等级为3)
    myFrame.checkPwd = function(str) {
        var nowLv = 0;
        if (str.length < 6) {
            return nowLv;
        }
        if (/[0-9]/.test(str)) {
            nowLv++;
        }
        if (/[a-z]/.test(str)) {
            nowLv++;
        }
        if (/[A-Z]/.test(str)) {
            nowLv++;
        }
        if (/[\.|-|_]/.test(str)) {
            nowLv++;
        }
        return nowLv;
    };

    // [特殊性] 表单提交，jsp返回页面方法
    /**
     * [submit description]
     * @param  {[type]} url      [请求地址]
     * @param  {[type]} formDom  [form表单dom节点]
     * @param  {[type]} contDom  [页面容器节点]
     * @param  {[type]} dataType [数据返回类型]
     * @return {[type]}          [description]
     */
    myFrame.submit = function(formDom, url, urlData, contDom, dataType) {
        // var data = myFrame.getJson($$(url), "GET", $(formDom).getFormData(), dataType);
        url = url ? $$(url) : $(formDom).attr("action");
        if (urlData) {
            url = url + urlData;
        }
        if (!url) return;
        var data = myFrame.getJson(url, "GET", $(formDom).getFormData(), dataType);
        $(contDom).html(data);
        console.log(data);
    };

    // [特殊性] jsp页面 分页封装 + 请求数据回调
    /**
     * [pages description]
     * @param  {[type]} options [description]
     * @return {[type]}  options.htmlPage      [分页显示容器]
     * @return {[type]}  options.conditionPage      [分页参数集合]
     * @return {[type]}  options.conditionSubmit      [form提交参数集合]
     * @return {[type]}  options.callback      [回调函数]
     */
    myFrame.pages = function(options) {
        var conditionPage = options.conditionPage, // 分页参数集合
            conditionSubmit = options.conditionSubmit, // form提交参数集合
            pageHtml = '<div id="" class="col-md-12 page3  center-block clearfix"></div>';
        $(options.htmlPage).append(pageHtml);
        $('.page3').pagination({
            pagesSize: conditionPage.pagesSize, // 分页总数默认10页 *必填
            current: conditionPage.current, //当前第几页,默认为第1页 *必填
            count: 3, //当前页前后分页个数 可填
            jump: true,
            position: true,
            prevContent: '上一页',
            nextContent: '下一页',
            isCallback: false,
            callback: function(dat) {
                var now = this.getCurrent();
                var common = this.getTotalPage();
                // 表单提交，jsp返回页面方法
                myFrame.submit(conditionSubmit.formDom, conditionSubmit.url, conditionSubmit.urlData + now, conditionSubmit.contDom, conditionSubmit.dataType);
                if (typeof options.callback == "function") options.callback(now, common);
            }
        });
    };



    // iframe 循环查找相应dom
    myFrame.sizeDom = ""; // 用于记录 找到的iframe节点对象 
    myFrame.iframeCont = function(state, childIframe) {
        var iframe = childIframe || $("iframe"),
            name;
        for (var i = 0; i < iframe.length; i++) {
            name = iframe.eq(i).attr("id");
            if (name == state) {
                _this.sizeDom = iframe.eq(i);
                break;
            }
            if (iframe.eq(i).contents().find("iframe").length > 0) {
                _this.iframeCont(state, iframe.eq(i).contents().find("iframe"));
            }
        }
        return _this.sizeDom;
    };


    // };



    // 访问地址路径封装
    // var contextPath = window.location.origin;
    // window.$$ = function(uri) {
    //     return (contextPath+ uri).replace(/\/{2}/, '/');
    // }; 
    // window.filePath=window.uir = contextPath+"/static/bigScreen";
    window.myFrame = myFrame;
    myFrame.init();
    // });


    $.fn.paging = function() {

    };

    // 扩展方法
    ;
    (function($, window, document, undefined) {

        $.fn.extend({
            // 分页
            /**
             * [description]
             * @param  {[type]}   parameter [description]
             * @param  {Function} callback  [description]
             * @return {[type]}             [description]
             */
            "pagination": function(parameter, callback) {

                //配置参数
                var defaults = {
                    url: "javascript:;", // 跳转a标签地址
                    pagesSize: 10, // 分页总数默认10页
                    current: 1, //当前第几页,默认为第1页
                    prevCls: 'page_prev', //上一页class
                    nextCls: 'page_next', //下一页class
                    prevContent: '<', //上一页按钮内容，可更改
                    nextContent: '>', //下一页按钮内容，可更改
                    activeCls: 'active', //当前页选中状态
                    coping: false, //首页和尾页
                    little: false, //点点省略
                    homePage: '首页', //首页节点内容
                    endPage: '末页', //尾页节点内容
                    count: 3, //当前页前后分页个数
                    position: false, //显示当前页数/总页数
                    jump: false, //跳转到指定页数
                    jumpIptCls: 'jump-ipt', //文本框内容
                    jumpBtnCls: 'jump-btn', //跳转按钮
                    // jumpBtn: '跳转', //跳转按钮文本
                    jumpBtn: '确定', //跳转按钮文本
                    isCallback: true, // 是否初始化时进行回调
                    callback: function() {} //回调
                };
                var Pagination = function(element, options) {
                    //全局变量
                    var opts = options, //配置
                        current = opts.current, //当前页
                        $document = $(document),
                        $obj = $(element); //容器
                    /**
                     * 获取总页数
                     * @return int pages 总页数
                     */
                    this.getTotalPage = function() {
                        // var pages = $obj.siblings('input[type="hidden"]').val();
                        var pages = opts.pagesSize;
                        return pages;
                    };
                    //获取当前页
                    this.getCurrent = function() {
                        return current;
                    };

                    /**
                     * 动态填充分页页码
                     * @param int index 页码
                     */
                    this.filling = function(index) {
                        var _self = this;
                        var html = [];
                        var home;
                        var ellipsis = opts.little ? '<li><span>...</span></li>' : '';
                        var pageCount = this.getTotalPage();

                        current = index || opts.current; //当前页码
                        // 首页
                        // if(current >= opts.count * 2 && current != 1 && pageCount != opts.count){
                        if (current != 1 && pageCount != opts.count) {
                            home = opts.coping && opts.homePage ? opts.homePage : '1';
                            html.push(opts.coping ? '<li><a href="javascript:;" data-page="1">' + home + '</a></li>' : '');
                        }

                        if (current > 1) { //上一页
                            html.push('<li><a href="javascript:;" class="' + opts.prevCls + '">' + opts.prevContent + '</a></li>' + ellipsis);
                        } else {
                            $obj.find('.' + opts.prevCls) && $obj.find('.' + opts.prevCls).remove();
                        }

                        var start = current - opts.count,
                            end = current + opts.count;
                        ((start > 1 && current < opts.count) || current == 1) && end++;
                        (current > pageCount - opts.count && current >= pageCount) && start++;
                        // 循环页数处理
                        for (; start <= end; start++) {
                            if (start <= pageCount && start >= 1) {
                                if (start != current) {
                                    html.push('<li><a href="javascript:;" data-page="' + start + '">' + start + '</a></li>');
                                } else {
                                    html.push('<li><span class="' + opts.activeCls + '">' + start + '</span></li>');
                                }
                            }
                        }
                        if (current < pageCount) { //下一页
                            html.push(ellipsis + '<li><a href="javascript:;" class="' + opts.nextCls + '">' + opts.nextContent + '</a></li>');
                        } else {
                            $obj.find('.' + opts.nextCls) && $obj.find('.' + opts.nextCls).remove();
                        }

                        // 末页
                        // if(current + opts.count < pageCount && current >= 1 && pageCount > opts.count){
                        if (current < opts.pagesSize && current >= 1 && pageCount > opts.count) {
                            end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                            html.push(opts.coping ? '<li><a href="javascript:;" data-page="' + pageCount + '">' + end + '</a></li>' : '');
                        }

                        // 显示当前页数/总页数
                        html.push(opts.position ? '<li><p class="paging-position">当前第<span class="now">1</span> /共 <span class="common"></span>页</p></li>' : "");

                        // 添加输入框
                        html.push(opts.jump ? '<li>到<input type="text" class="form-control ' + opts.jumpIptCls + '" placeholder="" aria-describedby="sizing-addon1">页</li><li><a href="javascript:;" class="' + opts.jumpBtnCls + '">' + opts.jumpBtn + '</a></li>' : '');


                        $obj.empty().html('<nav aria-label="Page navigation"><ul class="pagination pagination-sm">' + html.join(" ") + '</ul></nav>');
                        // 是否初始化时进行回调
                        if (opts.isCallback) {
                            typeof opts.callback === 'function' && opts.callback.call(_self);
                        } else {
                            $('.now').text(current);
                            $('.common').text(pageCount);
                        }
                    };

                    //绑定点击事件
                    this.eventBind = function() {
                        var _self = this;
                        var index;
                        var pageCount = this.getTotalPage(); //总页数
                        // 点击事件
                        $obj.off().on('click', 'a', function() {
                            if ($(this).hasClass(opts.nextCls)) {
                                index = parseInt($obj.find('.' + opts.activeCls).text()) + 1;
                            } else if ($(this).hasClass(opts.prevCls)) {
                                index = parseInt($obj.find('.' + opts.activeCls).text()) - 1;
                            } else if ($(this).hasClass(opts.jumpBtnCls)) {
                                if ($obj.find('.' + opts.jumpIptCls).val() !== '') {
                                    index = parseInt($obj.find('.' + opts.jumpIptCls).val());
                                } else {
                                    return;
                                }
                            } else {
                                index = parseInt($(this).data('page'));
                            }
                            _self.filling(index);

                            typeof opts.callback === 'function' && opts.callback.call(_self);
                        });
                        //输入跳转的页码
                        $obj.on('input propertychange', '.' + opts.jumpIptCls, function() {
                            var $this = $(this);
                            var val = $this.val();
                            var reg = /[^\d]/g;
                            if (reg.test(val)) {
                                $this.val(val.replace(reg, ''));
                            }
                            (parseInt(val) > pageCount) && $this.val(pageCount);
                            if (parseInt(val) === 0) { //最小值为1
                                $this.val(1);
                            }
                        });
                        //回车跳转指定页码
                        $document.keydown(function(e) {
                            if (e.keyCode == 13 && $obj.find('.' + opts.jumpIptCls).val()) {
                                index = parseInt($obj.find('.' + opts.jumpIptCls).val());
                                _self.filling(index);

                                typeof opts.callback === 'function' && opts.callback.call(_self);
                            }
                        });
                    };

                    //初始化
                    this.init = function() {
                        this.filling(opts.current);
                        this.eventBind();
                    };
                    this.init();
                };



                if (typeof parameter == 'function') { //重载
                    callback = parameter;
                    parameter = {};
                } else {
                    parameter = parameter || {};
                    callback = callback || function() {};
                }
                var options = $.extend({}, defaults, parameter);
                return this.each(function() {
                    var pagination = new Pagination(this, options);
                    callback(pagination);
                });
            },
            // 获取对应 input、 select、textarea 的name value 值
            /**
             * [description]
             * @return {[type]} [description]
             */
            "getFormData": function() {
                var result = {},
                    $this = $(this);
                $(this).find("input,select,textarea").each(function() {

                    var name = $(this).attr("name"),
                        type = $(this).attr("type"),
                        value = "",
                        size = 0;

                    if (((type == "checkbox" || type == "radio") && result[name] != undefined) || $(this).attr("noreturn") != undefined) size = $this.find("[name=\"" + name + "\"]").size();

                    switch (($(this)[0].tagName).toLowerCase()) {
                        case "input":
                            if (type == "text" || type == "hidden" || type == "password") value = $(this).val();
                            else if (type == "radio") {
                                var temp = $this.find("input[type=radio][name=" + name + "]:checked");
                                if ($(this).attr("onlyvalue") == undefined || $(this).attr("onlyvalue") == "true")
                                    value = temp.val();
                                else value = temp.val() + J.config.valueSeparated + $.trim(temp.parent().text());
                            } else if (type == "checkbox") {
                                if ($(this).attr("onlyvalue") == undefined || $(this).attr("onlyvalue") == "true") {
                                    value = $this.find("input[type=checkbox][name=" + name + "]:checked").map(function() {
                                        return $(this).val();
                                    }).get().join(",");
                                } else {
                                    value = $this.find("input[type=checkbox][name=" + name + "]:checked").map(function() {
                                        return $(this).val() + J.config.valueSeparated + $.trim($(this).parent().text());
                                    }).get().join(J.config.valueItemSeparated);
                                }

                            }
                            break;
                        case "select":
                            if ($(this).attr("onlyvalue") == undefined || $(this).attr("onlyvalue") == "true")
                                value = $(this).val();
                            else value = $(this).val() + J.config.valueSeparated + $(this).find("option:selected").text();
                            break;
                        case "textarea":
                            value = $(this).val();
                            break;
                    }

                    if (name) {
                        // wwb 2017-11-3 当name属性名字重复时，传递值以数组形式传递
                        var ary = [];
                        for (var i in result) {
                            if (name === i) {
                                ary.push(result[i]);
                                result[i] = ary;
                            }
                        }

                        if (size > 1 && type != "checkbox" && type != "radio") {
                            // 判断是否已存在key值，存在就以数组形式存储
                            if (result[name]) {
                                result[name].push((result[name] ? result[name] : []));
                                result[name][result[name].length].push($.trim(value));
                            } else {
                                result[name] = (result[name] ? result[name] : []);
                                result[name][result[name].length] = $.trim(value);
                            }
                        } else {
                            // 判断是否已存在key值，存在就以数组形式存储
                            if (result[name]) {
                                result[name].push($.trim(value));
                            } else {
                                result[name] = $.trim(value);
                            }
                        }
                    }

                });
                return result;
            },
            // 表格合并单元格
            /**
             * [description]
             * @param  {[type]} colIdx  要合并的列序号，从0开始
             * @return {[type]} idNmae  需合并行区别标识符
             * @return {[type]} state  标识状态 
             */
            "rowspan": function(colIdx, idNmae, state) {
                return this.each(function() {
                    var that;
                    var id;
                    $('tr', this).each(function(row) {
                        $('td:eq(' + colIdx + ')', this).filter(':visible').each(function(col) {
                            if (state) {
                                id = $(this).find(idNmae).attr(state) ? $(this).find(idNmae).attr(state) == $(that).find(idNmae).attr(state) : false;
                            } else {
                                id = idNmae ? $(this).attr(idNmae) == $(that).attr(idNmae) : $(this).html() == $(that).html();
                            }
                            if (that != null && id) {
                                //console.log($(this).html()+' =='+ $(that).html())
                                rowspan = $(that).attr("rowSpan");
                                // 默认添加
                                if (rowspan == undefined) {
                                    $(that).attr("rowSpan", 1);
                                    rowspan = $(that).attr("rowSpan");
                                }
                                rowspan = Number(rowspan) + 1;
                                $(that).attr("rowSpan", rowspan);
                                $(that).css({"verticalAlign":'middle'});  //td上下合并和居中

                                $(this).hide().remove();  //移除合并后下列的td
                            } else {
                                that = this;
                            }

                        });
                    });
                });
            },
            // form表单submit 提交方法封装扩展
            /**
             * [description]
             * @param  {[type]} options [description]
             * @return {[type]}         [description]
                $("#pageForm").formSubmit({
                     success:function(that,data){ //提交成功的回调函数  
                        if(data){//操作成功
                            myFrame.alert("success","操作成功",function(){
                                myFrame.closeBox(that);
                            });
                          
                        }else{
                            myFrame.alert("error","操作失败",function(){
                                myFrame.closeBox(that);
                            });
                        }
                    },
                    error:function(that,info){
                        myFrame.alert("error","操作失败",function(){
                            myFrame.closeBox(that);
                        });
                    }
                });
             */
            "formSubmit": function(options) {
                var _this = this,
                    url = _this.attr("action");
                myFrame.request({
                    // url: $$(url),
                    url: url,
                    async: false,
                    type: "GET",
                    data: _this.getFormData(),
                    markShow: true,
                    loading: false,
                    loadingBox: $("body"),
                    success: function(d) {
                        if (typeof options.success == "function") options.success(_this, d);
                    },
                    error: function(d) {
                        if (typeof options.error == "function") options.error(_this, d);
                    }
                });
            }
        });

    })(jQuery, window, document);
    // });
})(window);