//get form data 获取form input等数据
// define(["pagination"], function(pagination) {
(function (window, undefined) {
    //framework library
    var myFrame = {
        version: "V1.0",
        config: (window.myFrame && window.myFrame.config) || {},
        module: (window.myFrame && window.myFrame.module) || {},
        temp: {}
    };
    var _this;
    myFrame.init = function () {
        _this = this;
        // myFrame.alert(555);
        // _this.pluginPath();
    };
    /*------------------------------字符类-----------------------------------*/
    //   文字省略
    /**
     * @param e dom节点
     * @param i 限制字数
     * @param suffix 可选参数 后缀样式 默认...
     *使用方法:myFrame.slight(元素,字数,后缀样式)
     */
    myFrame.slight = function (e, i, suffix) {
        var textSuffix = suffix || "...";
        $(e).each(function () {  //循环元素
            //获取元素当前对象的文本,如果长度大于i;
            console.log($(this).text().length);
            if ($(this).text().length >= i) {
                //给元素设置title属性,并且设置元素的完整值.给title属性.
                // $(this).attr("title", $(this).text());
                //获取元素的值,进行截取。赋值给text变量保存.
                var text = $(this).text().substring(0, i) + textSuffix;
                //重新为元素赋值;
                $(this).text(text);
            }
        });
    };
    /**
     * @param textArea dom节点输入框
     *
     * @param numItem  dom节点限制字数显示
     *
     *使用方法:myFrame.statInputNum(节点输入框, 节点限制字数显示);
     */
    myFrame.statInputNum=function (textArea, numItem){
        var max = numItem.text(),//限制最大字数,如:50
            curLength;
        textArea[0].setAttribute("maxlength", max);
        curLength = textArea.val().length;
        numItem.text(max - curLength);
        textArea.on('input propertychange', function () {
            var _value = $(this).val().replace(/\n/gi, "");
            numItem.text(max - _value.length);
        });
    };
    /*
    * 大小写转换
    *  type 1:首字母大写 2：首页母小写 3：大小写转换 4：全部大写 5：全部小写
    *  使用：myFrame.changeCase('asdasd',1)  Asdasd
    * */
    myFrame.changeCase = function (str, type) {
        function ToggleCase(str) {
            var itemText = "";
            str.split("").forEach(
                function (item) {
                    console.log(item);
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    }
                    else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    }
                    else {
                        itemText += item;
                    }
                });
            return itemText;
        }

        switch (type) {
            case 1:
                return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                    return v1.toUpperCase() + v2.toLowerCase();
                });
            case 2:
                return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                    return v1.toLowerCase() + v2.toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    };
    /*
    * 字符串替换
    *  str  字符串
    *  AFindText  要替换的字符
    * ARepText  替换成的字符
    *
    * 使用： 如 myFrame.replaceAll('afdsfsda','a','89');
    * 89fdsfsd89
    * */
    myFrame.replaceAll = function (str, AFindText, ARepText) {
        raRegExp = new RegExp(AFindText, "g");
        return str.replace(raRegExp, ARepText);
    };
    /*
    * 字符串循环复制
    * str  字符串
    * count   循环的次数
    *
    *使用 如：myFrame.repeatStr('123',3)   结果:123123123
    *
    * */
    myFrame.repeatStr = function (str, count) {
        var text = '';
        for (var i = 0; i < count; i++) {
            text += str;
        }
        return text;
    };
    /*
    *字符替换
    * str   字符串
    * regArr 字符格式[]
    * type  类型
    * ARepText
    *
    * 使用 myFrame.replaceStr(字符串,字符格式[], 类型,替换的字符（默认*）)
    * */
    myFrame.replaceStr = function (str, regArr, type, ARepText) {
        console.log(str);
        console.log(regArr);
        console.log(type);
        console.log(ARepText);
        var regtext = '', Reg = null, replaceText = ARepText || '*';
        //myFrame.replaceStr('18819322663',[3,5,3],0)
        //188*****663
        //myFrame.repeatStr是在上面定义过的（字符串循环复制），大家注意哦
        if (regArr.length === 3 && type === 0) {
            regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})';
            Reg = new RegExp(regtext);
            var replaceCount = myFrame.repeatStr(replaceText, regArr[1]);
            return str.replace(Reg, '$1' + replaceCount + '$2')
        }
        //myFrame.replaceStr('asdasdasdaa',[3,5,3],1)
        //***asdas***
        else if (regArr.length === 3 && type === 1) {
            regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}';
            Reg = new RegExp(regtext);
            var replaceCount1 = myFrame.repeatStr(replaceText, regArr[0]);
            var replaceCount2 = myFrame.repeatStr(replaceText, regArr[2]);
            return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
        }
        //myFrame.replaceStr('1asd88465asdwqe3',[5],0)
        //*****8465asdwqe3
        else if (regArr.length === 1 && type == 0) {
            regtext = '(^\\w{' + regArr[0] + '})';
            Reg = new RegExp(regtext);
            var replaceCount = myFrame.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
        //myFrame.replaceStr('1asd88465asdwqe3',[5],1,'+')
        //"1asd88465as+++++"
        else if (regArr.length === 1 && type == 1) {
            regtext = '(\\w{' + regArr[0] + '}$)';
            Reg = new RegExp(regtext);
            var replaceCount = myFrame.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
    };
    /*
    *  搜索相关字高亮显示
    * @dom  元素
    * @str  字符
    *  使用:myFrame.textSearch('p','千万');
    * */
    myFrame.textSearch=function (dom,str) {
        $(dom).each(function () {
            var reg = new RegExp("("+str +")","ig");
            //高亮要查找的字符串
            var repStr = $(this).text().replace(reg, "<span class='color-search'>" + str + "</span>");
           return $(this).html(repStr);
        });
    };
    /*-----------------------jquery----------------------------------*/
    /*
    * 计算元素总宽度
    * elements  dom元素
    *
    * 使用: myFrame.calSumWidth(元素)
    *
    * */
    myFrame.calSumWidth=function (elements) {
        var width = 0;
        $(elements).each(function () {
            width += $(this).outerWidth(true);
        });
        return width;
    };
    /*----------------------------------表单类--------------------------------------------------------------------*/
    /*
    * 移除input不为（button，submit，reset，hidden）的值，选中
    *
    * 使用: myFrame.resetf()
    *
    * */
    myFrame.resetf=function (){
        $(':input')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
    };
    /*
    * 检测字符串
    * str 字符串
    * type 类型
    *
    * 使用  myFrame.checkType('165226226326','phone')
    *
    * 返回 false或true
    *
    * */
    myFrame.checkType = function (str, type) {
        switch (type) {
            case 'email': //邮箱
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
                //return  /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            case 'phone':  //手机
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel': //座机
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'number': //纯数字
                return /^[0-9]$/.test(str);
            case 'NumAndLetter':  //数字和字母
                return /^[0-9a-zA-Z]+$/.test(str);
            case 'english': //英文
                return /^[a-zA-Z]+$/.test(str);
            case 'lower': //小写
                return /^[a-z]+$/.test(str);
            case 'upper':  //大写
                return /^[A-Z]+$/.test(str);
            case 'chinese':  //中文
                return /^[\u4E00-\u9FA5]+$/.test(str);
            default :
                return true;
        }
    };
    // 表单检验方法
    /**
     * [validator description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    myFrame.validator = function (options) {
        $(options.elem).validator({
            submitBtnId: options.submitBtnId || "", // 提交按钮 ID
            scrollDom: options.scrollDom, // 提交验证时定位
            backColor: options.backColor || [3, '#78BA32'], // 提示框 方向 颜色
            sure: function (that) { // 验证成功后的回调函数 that 当前提交按钮
                if (typeof options.sure == "function") options.sure(that);
            }
        });
    };
//表单检验
    /*
    * 表单检验
    * myFrame.vali({
            formid:'formTable'  //form---id
        })

        判断表单检验
        if($('form').valid()){
            alert('通过')；
        }
    *
    * */
    myFrame.vali = function (options) {
        var messages = options.messages || {};
        var rules = options.rules || {};
        var formid = options.formid || "formTable";
        var successFun = options.successFun || function () {
        }; // 成功后的方法
        $("#" + formid).validate({
            rules: rules,
            messages: messages,
            //
            errorElement: 'span',
            errorClass: 'false',
            validClass: 'right',
            onfocusout: function (element) {
                $(element).valid();
            },
            errorPlacement: function (error, element) {
                element.parent().next().append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).removeClass('right').addClass('false');
                $(element).parent().next().removeClass('right').addClass('false').find('i').removeClass('icon-tongguo').addClass('icon-tishi1');
            },
            success: function (span) {
                span.parent().removeClass('false').addClass('right');
                span.prev('.iconfont').removeClass('icon-tishi1').addClass('icon-tongguo');
                span.append('验证信息通过');
            }
            /*------*/
            /*--------------------气泡提示------------------------------*/
            /*onfocusout: function(element) { $(element).valid();},
            errorPlacement: function(error, element) {
                layer.tips(error[0].innerText, element, {
                    tipsMore: true,
                    time: 1000, //2秒后自动关闭
                    tips: [3, '#78BA32']
                });
            }*/
            /*--------------------气泡提示end------------------------------*/
        });
    };

    /*
    * 检测密码强度
    *
    * $('#live').on("keyup", function () {  //密码输入框
        strong($(this));
    });
    function strong($that) {
        var size = myFrame.checkPwd($that.val()),  //调用检测密码强度
                dom = $(".Password_strength span");  //获取密码强度span
        dom.removeClass('active');  //移除样式颜色
        console.log(size);
        if (size <= 0) {  //size为密码强度等级
            dom.eq(0).addClass('active').prevAll().removeClass("active");
        }
        if (size > 0) {
            dom.eq(size - 1).addClass('active').prevAll().removeClass("active");
        }
    }
    * */
    myFrame.checkPwd = function (str) {
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
    /*
    * 获取表单值
    * formId  form元素id
    * return  返回json数据
    * 使用: myFrame.fromValue();
    *
    * */
    myFrame.fromValue=function(formId) {
        var array = {};
        //var t = $('#'+formId).serializeArray();
        var t = $('"'+formId+'"').serializeArray();
        $.each(t, function() {
            array[this.name] = this.value;
        });
        return array;
    };
    /*
    *   表单security.js RSA 加密
    *
    *   ***需导入security.js文件
    *
    *   @param  {[type]} data   --->  {modulus: "86f07785f0e5465614b0c1accc218ecec6dddd033d12fb0e67…790ff875292dbb4ca54e1c304dd3f4ac4f1947a8c7a62946d", exponent: "10001"}
    *
    *    @param  {[type]} el 元素
    *
    *   多个输入框用逗号隔开
    *    使用:myFrame.security(ajax成功返回的值,[input元素,input元素,input元素])
    *
    *
    *     $.getJSON("getRsa",function(data) {
    *
    *           myFrame.security(ajax成功返回的值,[input元素,input元素,input元素];
    *
    *           $("#loginForm").submit();
    *       });
    *
    * */
    myFrame.security=function (data,el) {
        var modulus = data.modulus,
            exponent = data.exponent;
        var publicKey = RSAUtils.getKeyPair(exponent, '', modulus);
        for(var i=0;i<el.length;i++){
            $(el[i]).val(RSAUtils.encryptedString(publicKey, $(el[i]).val().split("").reverse().join("")));//进行反序
        }
    };
    /**
     * 获取单选或者多选的值
     *
     * @param  {[type]} elements     元素
     *
     * return  返回json数据
     */
    myFrame.checkAll=function(elements){
        var arr = [];
        var num = elements.length;
        for(var i = 0; i < num; i++){
            if(elements.eq(i).is(":checked")){
                arr.push(elements.eq(i).val());
            }
        }
        return arr;
    };
    /**
     * 回填数据 input、 select、textarea 的name value 值
     * [buildFormValue description]
     * @param  {[type]} target         [description]
     * @param  {[type]} data           [description]
     * @param  {[type]} dataObjectName [description]
     * @return {[type]}                [description]
     *
     * var json={FirstName: "第三方第三方", LastName: "12313"};
     * 使用:myFrame.buildFormValue($('#forma'),json);
     *
     *json数据的属性要与回填的表单的name对应
     *
     * 如:<form action="" id="forma">
     *       First name: <input type="text" name="FirstName" value="" /><br />
     *       Last name: <input type="text" name="LastName" value="" /><br />
     *       <button type="button" id="btn">dsf</button>
     *   </form>
     */
    myFrame.buildFormValue = function (target, data, dataObjectName) {
        if (typeof data != "object") return;
        var obj,
            type,
            value;
        target.find("input,textarea,select").each(function () {
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
    /*--------------------随机--------------------------------*/
    myFrame.randomNumber = function (n1, n2) {
        //randomNumber(5,10)
        //返回5-10的随机整数，包括5，10
        if (arguments.length === 2) {
            return Math.round(n1 + Math.random() * (n2 - n1));
        }
        //randomNumber(10)
        //返回0-10的随机整数，包括0，10
        else if (arguments.length === 1) {
            return Math.round(Math.random() * n1)
        }
        //randomNumber()
        //返回0-255的随机整数，包括0，255
        else {
            return Math.round(Math.random() * 255)
        }
    };
    /*
    * 随机颜色
    * type 1 十六进制颜色 2 rgb颜色
    *使用: myFrame.randomColor(1);
    *
    * */
    myFrame.randomColor = function (type) {
        switch (type) {
            case 1:
                return '#' + Math.random().toString(16).substring(2).substr(0, 6);
            case 2:
                return 'rgb(' + myFrame.randomNumber(255) + ',' + myFrame.randomNumber(255) + ',' + myFrame.randomNumber(255) + ')';
            case 3:
                var color = '#';
                var cArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
                for (var i = 0; i < 6; i++) {
                    var cIndex = Math.round(Math.random() * 15);
                    color += cArray[cIndex];
                }
                return color;
            default :
                return true;
        }
    };
    /*
    * 随机颜色指定个数
    * len  生成颜色个数
    *
    * 使用:myFrame.randomLColor(3)
    *
    * */
    myFrame.randomLColor = function (len) {
        var colors = [];
        while (colors.length < len) {
            var color = "#";
            for (var i = 0; i < len; i++) {
                var n = Math.round((Math.random() * 255));
                if (n <= 16) {
                    color += "0";
                    color += n.toString(16);
                } else {
                    color += Math.round((Math.random() * 255)).toString(16);
                }
            }
            colors.push(color);
        }
        return colors;
    };

    /*
    * 随机生成指定长度的字符串
    * n  生成字符的长度
    * type  类型 1数字  2小写 3大写 4小写和数字 5大写和数字 6大小写 7大小写和数字
    *使用：myFrame.randomString(5,7);
    *
    * */
    //随机生成指定长度的字符串
    myFrame.randomString = function (n, type) {
        var str = '';
        if (type === 1) {
            str = '9876543210';
        } else if (type === 2) {
            str = 'abcdefghijklmnopqrstuvwxyz';
        } else if (type === 3) {
            str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (type === 4) {
            str = 'abcdefghijklmnopqrstuvwxyz9876543210';
        } else if (type === 5) {
            str = '9876543210ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (type === 6) {
            str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (type === 7) {
            str = 'abcdefghijklmnopqrstuvwxyz9876543210ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        var tmp = '',
            i = '',
            l = str.length;
        for (i = 0; i < n; i++) {
            tmp += str.charAt(Math.floor(Math.random() * l));
        }
        return tmp;
    };
    /*
    * 检查字符串的个数
    * str  字符串
    * strSplit 要检测的字符
    *
    * 使用：myFrame(strTest121aaTest,'Test')    //2
    * */
    myFrame.countStr = function (str, strSplit) {
        return str.split(strSplit).length - 1
    };
    /*-----------------数组-----------------------------------*/
    /*
    *数组去重
    * arr  数组
    *
    * 使用:myFrame.deDuplication([1,13,24,11,11,14,1,2]);
    * myFrame.deDuplication([{name:'qqq',name:'aqqq',name:'qqq'}]);
    * */
    myFrame.deDuplication = function (arr) {  //使用:console.log(ecDo.unique([1,13,24,11,11,14,1,2]));
        var hashTable = {};
        var data = [];
        for (var i = 0, l = arr.length; i < l; i++) {
            if (!hashTable[arr[i]]) {
                hashTable[arr[i]] = true;
                data.push(arr[i]);
            }
        }
        return data

    };
    /*
    * 数组去重
    * text  过滤name属性相同的值
    *
    * 使用 var str=[{name:'aa'},{name:'bb'},{name:'aa'}].filter('name');  //过滤name属性相同的值
    *
    * */
    Array.prototype.filter = function (text) {
        //myFrame.filter = function(text){
        for (var i = 0, temp = {}, result = [], ci; ci = this[i++];) {
            var ordid = ci[text];
            if (temp[ordid]) {
                continue;
            }
            temp[ordid] = true;
            result.push(ci);
        }
        return result;
    };
    /*
    * 清除对象中值为空的属性
    *
    * obj  数组
    *
    * 使用：  myFrame.filterParams({a:"",b:null,c:"010",d:123})  // {c: "010", d: 123}
    * myFrame.filterParams({a:"",b:null,c:"010",d:123,e:[{f:"1223",g:'234',i:''}]});  //{c: "010", d: 123, e:[{f: "1223", g: "234", i: ""}]}
    *
    * 缺点:不能去掉子集为空的对象
    * */
    //清除对象中值为空的属性
    //filterParams({a:"",b:null,c:"010",d:123})
    //Object {c: "010", d: 123}
    myFrame.filterParams = function (obj) {
        var _newPar = {};
        for (var key in obj) {
            if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    };
    //
    /**
     * 判断数组是否有重复值 true为有重复值 false没有重复值
     * [isRepeat description]
     * @param  {[type]}  arr [description]
     * @return {Boolean}     [description]
     */
    myFrame.isRepeat = function (arr) {
        var hash = {};
        for (var i in arr) {
            if (hash[arr[i]]) {
                return true;
            }
            hash[arr[i]] = true;
        }
        return false;
    };
    /**
     * 判断是否为null
     * [isNull description]
     * @param  {[type]}  name [description]
     * @return {Boolean}      [description]
     */
    myFrame.isNull = function (name) {
        var stie = false;
        if (!name && typeof(name) != "undefined" && name != 0) {
            stie = true;
        }

        // return !name && name!==0 && typeof name!=="boolean"?true:false;
        return stie;
    };
    /**
     *
     * @desc   判断`obj`是否为空
     * @param  {Object} obj
     * @return {Boolean}
     */
    myFrame.isEmptyObject=function (obj) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))

            return false;

        return ! Object.keys(obj).length;
    };
    /**
     *
     * @desc 判断两个数组是否相等
     * @param {Array} arr1
     * @param {Array} arr2
     * @return {Boolean}
     */
    myFrame.arrayEqual=function(arr1, arr2){

        if (arr1 === arr2) return true;

        if (arr1.length != arr2.length) return  false;

        for (var i = 0; i < arr1.length; ++i) {

            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    };
    /*------------------------------加载js-----------------------------*/
    /**
     *
     * @desc 动态加载js
     * @param  id  dom元素id
     * @param newJS  js文件路径
     *
     * var src='${pageContext.request.contextPath}/static/gateway/js/gufen/expectScore.js';
     * 使用:myFrame.reloadAbleJSFn('javascript',src);
     */
    myFrame.reloadAbleJSFn=function(id,newJS)
    {
        var oldjs = null;
        var t = null;
        var oldjs = document.getElementById(id);
        if(oldjs) oldjs.parentNode.removeChild(oldjs);
        var scriptObj = document.createElement("script");
        scriptObj.src = newJS;
        scriptObj.type = "text/javascript";
        scriptObj.id   = id;
        document.getElementsByTagName("head")[0].appendChild(scriptObj);
    };
    /*--------------------对象序列化--------------------------------*/
    /**
     *
     * @desc   对象序列化
     * @param  {Object} obj
     * @return {String}
     */
    myFrame.stringfyQueryString=function (obj) {

        if (!obj) return '';

        var pairs = [];

        for (var key in obj) {

            var value = obj[key];

            if (value instanceof Array) {

                for (var i = 0; i < value.length; ++i) {
                    pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                }

                continue;
            }
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }

        return pairs.join('&');
    };
    /*--------------------css--------------------------------*/
    /*
    * 检测对象是否有哪个类名
    * obj  dom元素
    * classStr   dom元素class
    *
    * 使用:myFrame.hasClass(元素，class)
    *
    * */
    myFrame.hasClass = function (obj, classStr) {
        var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
        return (arr.indexOf(classStr) == -1) ? false : true;
    };
    /**
     *
     * @desc 判断元素是否有某个class
     * @param {HTMLElement} ele
     * @param {String} cls
     * @return {Boolean}
     */
    myFrame.has_Class = function(ele, cls) {
        return ( new RegExp ( '(\\s|^)' + cls + '(\\s|$)' )).test(ele.className);
    };
     /*
    * 替换类名
    * obj  dom元素
    * newName   dom元素新增class
    * oldName   dom元素已有class
    *
    * 使用:myFrame.replaceClass(元素,newName,oldName)
    *
    * */
    myFrame.replaceClass = function (ele, newName, oldName) {
        myFrame.removeClass(ele, oldName);
        myFrame.addClass(ele, newName);
    };
    /*
  * 设置样式
  * @obj  dom元素
  * @json
  *
  * 使用:myFrame.css(元素,json)
  *
  * */
    myFrame.css = function (ele, json) {
        for (var attr in json) {
            ele.style[attr] = json[attr];
        }
    };


    //添加类名
    /**
     *
     * @desc   为元素添加class
     * @param  {HTMLElement} ele
     * @param  {String} classStr
     */
    myFrame.addClass = function (ele, classStr) {
        if (!myFrame.hasClass(ele, classStr)) {
            ele.className += " " + classStr;
        }
    };

    //删除类名
    myFrame.removeClass = function (ele, classStr) {
        if (myFrame.hasClass(ele, classStr)) {
            var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
            ele.className = ele.className.replace(reg, '');
        }
    };

    //获取兄弟节点
    myFrame.siblings = function (ele) {
        var a = [];//定义一个数组，用来存o的兄弟元素
        var p = ele.previousSibling;
        while (p) {//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
            if (p.nodeType === 1) {
                a.push(p);
            }
            p = p.previousSibling//最后把上一个节点赋给p
        }
        a.reverse();//把顺序反转一下 这样元素的顺序就是按先后的了
        var n = ele.nextSibling;//再取o的弟弟
        while (n) {//判断有没有下一个弟弟结点 n是nextSibling的意思
            if (n.nodeType === 1) {
                a.push(n);
            }
            n = n.nextSibling;
        }
        return a;
    };
    /**
     * javascript  在指定节点之前插入新节点
     *
     * @param newElement 新插入的节点
     * @param targetElement 在节点之后插入
     */
    myFrame.insertAfter = function (newElement, targetElement) {
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
    /*--------------------URL地址--------------------------------*/
    /**
     * 通过接口下载 方法
     * @param api [string]：下载接口url地址。
     * @param params [object]：传给后台api接口的参数。
     */
    myFrame.downLoad = function (api, params) {
        var form = $("<form target=\"_blank\" method=\"post\" action=\"" + api + "\" name=\"downLoad\"></form>");
        for (key in params) {
            form.append("<input type=\"hidden\" name=\"" + key + "\" value=\"" + params[key] + "\"/>");
        }
        $("body").append(form);
        form.submit();
        form.remove();
    };

    /**
     * 解析清地址或接口地址
     * [setNoCacheUrl description]
     * @param {[type]} url [description]
     */
    myFrame.setNoCacheUrl = function (url) {
        if (url.indexOf("?") >= 0) url += "&rd=" + Math.random();
        else url += "?rd=" + Math.random();
        url = url.replace(/\/{2}/, '/');
        return url;
    };
    /**
     *  获取url地址栏参数
     * [getRequest description]
     * @param  {[type]} urlDat [description]
     * @return {[type]}        [description]
     */
    myFrame.getRequest = function (urlDat) {
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
    /**
     *
     * @desc   判断是否为URL地址
     * @param  {String} str
     * @return {Boolean}
     */
    myFrame.isUrl=function (str) {
        return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
    };
    /**
     *
     * @desc   url参数转对象
     * @param  {String} url  default: window.location.href
     * @return {Object}
     */
    myFrame.UrlString=function (url) {
        url = url == null ? window.location.href: url;

        var search = url.substring(url.lastIndexOf('?') + 1);

        if (!search) {

            return {}
        }

        return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    };
    /*--------------------日期--------------------------------*/

    //  layerDate 时间插件
    /**
     * [laydate description]
     * @param  {[type]} option [description]
     * @return {[type]}        [description]
     *
     *  // 时间插件设置
     * var startDate = {
     *        theme: '#25A9FE',
     *        elem: '#startDate',
     *        btns: ['now', 'confirm'],
     *        format: 'yyyy',
     *        type: "year",
     *        min: '2005-1-1',
     *        max: myFrame.DateFormat(new Date(),'yyyy-M-d'),
     *        value: new Date().getFullYear() - 2,
     *  };
     * var endDate = {
     *        theme: '#25A9FE',
     *        elem: '#endDate',
     *        btns: ['now', 'confirm'],
     *        format: 'yyyy',
     *        type: "year",
     *        min: '2005-1-1',
     *        max: myFrame.DateFormat(new Date(),'yyyy-M-d'),
     *        value: new Date().getFullYear()
     *  };
     * myFrame.laydate(startDate);
     * myFrame.laydate(endDate);
     *
     */
    myFrame.laydate = function (option) {
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
            done: option.done//  选择日期后回调
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
    myFrame.datetimeLimit = function (startDom, startSet, endDom, endSet) {
        startSet = $.extend({}, {
            elem: startDom,
            format: 'yyyy-MM-dd',
            theme: "#1756af",
            max: $(endDom).val(),
            show: true, //直,接显示
            closeStop: startDom, //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
            btns: ['now', 'confirm'],
            done: function (value, date, endDate) { //改变日期触发事件

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
            done: function (value, date, endDate) {

            }
        }, startSet || {});

        //外部事件调用
        $(startDom).on('click', function (e) { //假设 test1 是一个按钮
            startSet.max = $(endDom).val();
            myFrame.laydate(startSet);
        });
        $(endDom).on('click', function (e) { //假设 test1 是一个按钮
            endSet.min = $(startDom).val();
            myFrame.laydate(endSet);
        });
    };


    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * eg:
     * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2017-11-29 08:09:04.423
     * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2017-11-29 二 20:09:04
     * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2017-11-29 周二 08:09:04
     * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2017-11-29 星期二 08:09:04
     * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2017-11-29 8:9:4.18
     */

    Date.prototype.pattern = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
    /*
     *    date 日期时间
     *    fmt 需转换的格式
     */
    myFrame.DateFormat = function (date, fmt) {
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
    };
    /*
    * 倒计时
    * @endTime  结束时间
    * @desc   格式化现在距${endTime}的剩余时间
    * @param  {Date} endTime
    * @return {String}
    * 使用: myFrame.formatRemainTime('2018/7/22 16:0:0')  //"剩余时间6天 2小时 28 分钟20 秒"
    *
    *  setInterval(myFrame.formatRemainTime('2018/7/22 16:0:0'),0);  //实时刷新
    *
    * */
    myFrame.formatRemainTime = function (endTime) {
        var startDate = new Date();  //开始时间，当前时间
        var endDate = new Date(endTime); //结束时间，需传入时间参数
        var t = endDate.getTime() - startDate.getTime();  //时间差的毫秒数
        var d = 0, h = 0, m = 0, s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
    };
    /*
    * 解决ie8
    *
    * *
        function GetRTime(){
        var time_txt2='2016-09-10 12:10:30';//从阅卷查看页面传过来的
        var aa=time_txt2.replace("-","/");
        var EndTime=  new Date(aa);
        var NowTime = new Date();
        var EndTime1= EndTime.getTime();
        var NowTime1 = NowTime.getTime();
        var t =parseFloat(EndTime1) - parseFloat(NowTime1);
        var d=0;
        var h=0;
        var m=0;
        var s=0;
        if(t>=0){
            d=Math.floor(t/1000/60/60/24);
            h=Math.floor(t/1000/60/60%24);
            m=Math.floor(t/1000/60%60);
            s=Math.floor(t/1000%60);
            document.getElementById("time").innerHTML="&nbsp;"+d +"天"+h + "时"+m + "分"+s + "秒";
        }else{
            document.getElementById("time").innerHTML="剩余阅卷时间已过期";
        }

    }
    setInterval(GetRTime,1000);

    */
    /**
     * @desc   格式化${startTime}距现在的已过时间
     * @param  {Date} startTime
     * @return {String}
     */
    myFrame.formatPassTime= function (startTime) {

        var currentTime = Date.parse(new Date()),
            time = currentTime - startTime,
            day = parseInt(time / (1000 * 60 * 60 * 24)),
            hour = parseInt(time / (1000 * 60 * 60)),
            min = parseInt(time / (1000 * 60)),
            month = parseInt(day / 30),
            year = parseInt(month / 12);

        if (year) return year + "年前";

        if (month) return month + "个月前";

        if (day) return day + "天前";

        if (hour) return hour + "小时前";

        if (min) return min + "分钟前";

        else return '刚刚';
    };
    /*
    * Unix时间戳转换成日期格式
    * @param UnixTime Unix时间戳
    *
    * 使用:myFrame.FormatDateTime("1497232433000")
    *     myFrame.FormatDateTime("/Date(1497232433000)/")
    *     FormatDateTime("/Date(1497232433000+0800)/")
    * @return yyyy-MM-dd HH:mm:ss
    */
    myFrame.FormatDateTime = function (UnixTime) {
        var a = UnixTime.replace("/Date(", "").replace(")/", "");
        var date = new Date(parseInt(a));
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };
    /*
    *  日期转时间戳
    *  @DateTime  时间日期
    *
    *  使用: myFrame.getDateTime(1404958872)
    *  return  yyy--MM--dd  hh:mm:ss
    *
    * */

    myFrame.stringTime = function (DateTime) {
        date = DateTime.substring(0, 19);
        date = date.replace(/-/g, '/');
        var timestamp = new Date(date).getTime();
        return timestamp;
    };

    /**
     * 时间相加减方法
     * [dateOperator description]
     * @param date  {[2014-01-01]}  年月日
     * @param days  {[1]}  天数
     * @param operator  {[+/-]}  加减
     *
     * 使用:myFrame.dateOperator("2014-01-01",1,"-")
     */
    myFrame.dateOperator = function (date, days, operator) {
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

    /*--------------------滚动条--------------------------------*/
    /**
     *
     * @desc 获取滚动条距顶部的距离
     *
     * 使用:myFrame.getScrollTop();
     */
    myFrame.getScrollTop= function() {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    };
    /**
     *
     * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
     * @param {HTMLElement} ele
     * @returns { {left: number, top: number} }
     *
     * 使用：myFrame.offset(元素);
     */
    myFrame.offset=function (ele) {

        var pos = {
            left: 0,
            top: 0
        };

        while (ele) {
            pos.left += ele.offsetLeft;
            pos.top += ele.offsetTop;
            ele = ele.offsetParent;
        };

        return pos;
    };
    /**
     *
     * @desc 设置滚动条距顶部的距离
     *
     * 使用：myFrame.setScrollTop(距离值);
     */
    myFrame.setScrollTop=function (value) {
        window.scrollTo(0, value);
        return value;
    };

    /**/
    //var requestAnimFrame = (function () {
    myFrame.requestAnimFrame=function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||

            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    };

    //})();

    /**
     *
     * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
     * @param {Number} to  --->value值
     * @param {Number} duration  --->时间
     */
    myFrame.scrollTo=function (to, duration){

        if (duration < 0) {
            myFrame.setScrollTop(to);

            return
        }
        var diff = to - myFrame.getScrollTop();

        if (diff === 0) return ;

        var step = diff / duration * 10;
        myFrame.requestAnimationFrame(
            function () {

                if (Math.abs(step) > Math.abs(diff)) {
                    myFrame.setScrollTop(myFrame.getScrollTop() + diff);

                    return;
                }
                myFrame.setScrollTop(myFrame.getScrollTop() + step);

                if (diff > 0 && myFrame.getScrollTop() >= to || diff < 0 && myFrame.getScrollTop() <= to) {

                    return;
                }
                scrollTo(to, duration - 16);
            });
    };
    /*--------------------滚动条jScrollPane插件--------------------------------*/
    /**
     * jScrollPane 滚动条插件
     * 网址:http://www.jq22.com/jquery-info14307
     * [jScrollPane description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     * 滚动条 初始化成功必须要有内容或高度
     */
    myFrame.jScrollPane = function (options) {


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
    /*------------------------iframe--------------------------------*/
    /*
    * iframe 循环查找相应dom
    *
    * */
    myFrame.sizeDom = ""; // 用于记录 找到的iframe节点对象
    myFrame.iframeCont = function (state, childIframe) {
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

    /*--------------------现金--------------------------------*/
    /*
    * n 代表金额
    * 使用:myFrame.digitUppercase(168752632);   "人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    *     myFrame.digitUppercase(-1693);   "欠人民币壹仟陆佰玖拾叁元整"
    * */
    myFrame.digitUppercase = function (n) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
        var head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s;
            s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    };
    /*-------------------判断浏览器是否支持-----------------------------------*/
        /**
         *
         * @desc 判断浏览器是否支持webP格式图片
         * @return {Boolean}
         */
        myFrame.isSupportWebP= function () {
            return !! [].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
        };

// 设置自适应 字体大小 用于rem 单位移动端
    /**
     * [remSize description]
     * @param  {[type]} size [设计图大小]
     * @return {[type]}      [description]
     */
    myFrame.remSize = function(size){
        var whdef = 100 / size; // 表示1920的设计图,使用100PX的默认值
        var wH = window.innerHeight; // 当前窗口的高度
        var wW = window.innerWidth; // 当前窗口的宽度
        var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
        $('html').css('font-size', rem + "px");
    };


    // 判断pc浏览器是否缩放，若返回100则为默认无缩放，如果大于100则是放大，否则缩小
    myFrame.detectZoom =function (){
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();

        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }
        else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        }
        else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }

        if (ratio){
            ratio = Math.round(ratio * 100);
        }

        return ratio;
    };

    //  处理win10浏览器放大
    myFrame.win10zoom = function(options){
        var option = $.extend({}, {
            //interval : 1000,// 每隔1s检测一次
        }, options || {});

        WebpageZoomDetect.start(option);
    };
    /*-------------------Cookie---------------------------------------------*/
    /**
     *
     * @desc  设置Cookie
     * @param {String} name
     * @param {String} value
     * @param {Number} days
     */
    myFrame.setCookie=function (name, value, days){
        var date = new Date();
        date.setDate(date.getDate() + days);
        document.cookie = name + '=' + value + ';expires=' + date;
    };
    /**
     *
     * @desc 根据name读取cookie
     * @param  {String} name
     * @return {String}
     */
    myFrame.getCookie=function (name) {

        var arr = document.cookie.replace(/\s/g, "").split(';');

        for (var i = 0; i < arr.length; i++) {

            var tempArr = arr[i].split('=');

            if (tempArr[0] == name) {

                return decodeURIComponent(tempArr[1]);
            }
        }

        return '';
    };
    /**
     *
     * @desc 根据name删除cookie
     * @param  {String} name
     */
    myFrame.removeCookie=function (name) {

        // 设置已过期，系统会立刻删除cookie
        myFrame.setCookie(name, '1', -1);
    };
    /*-------------------获取浏览器类型和版本-----------------------------------*/

    /**
     *
     * @desc 获取浏览器类型和版本
     * @return {String}
     */
    myFrame.getExplore=function () {

        var sys = {},
            ua = navigator.userAgent.toLowerCase(),
            s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
            (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
                (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
                    (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
                        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
                            (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
                                (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;

// 根据关系进行判断

        if (sys.ie) return ('IE: ' + sys.ie);

        if (sys.edge) return ('EDGE: ' + sys.edge);

        if (sys.firefox) return ('Firefox: ' + sys.firefox);

        if (sys.chrome) return ('Chrome: ' + sys.chrome);

        if (sys.opera) return ('Opera: ' + sys.opera);

        if (sys.safari) return ('Safari: ' + sys.safari);

        return 'Unkonwn';
    };
    /*-------------------判断手机、pc、iPad-----------------------------------*/
    /*
    *
    *
    * @return object
    *
    * 使用:myFrame.versions();
    * 使用:myFrame.versions().versions.webKit);
    * 使用:myFrame.versions().language);  //获取语言
    * */
    myFrame.versions=function () {
        return {
            versions:function(){
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf("Trident") > -1, //IE内核
                    presto: u.indexOf("Presto") > -1, //opera内核
                    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
                    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf("iPhone") > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf("iPad") > -1, //是否iPad
                    webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
        };
    };
    /*--------------------获取操作系统类型----------------------------------*/
    /**
     *
     * @desc 获取操作系统类型
     * @return {String}
     */
    myFrame.getOS=function () {

        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';

        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';

        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

        if (/mac/i.test(appVersion)) return 'MacOSX';

        if (/win/i.test(appVersion)) return 'windows';

        if (/linux/i.test(appVersion)) return 'linux';

        if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent))return 'ios';

        if (/android/i.test(userAgent)) return 'android';

        if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
    };
    /*------------------------判断用户的浏览设备是移动设备还是PC--------------------------------------*/
    /**
     *
     * @desc 判断设备
     * @return {String}
     *
     */
        myFrame.browserRedirect=function(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return 'phone';
        } else {
            return 'pc';
        }
    };
    /*----------------------获取键名--------------------------------*/

    var keyCodeMap = {

        8 : 'Backspace',

        9 : 'Tab',

        13 : 'Enter',

        16 : 'Shift',

        17 : 'Ctrl',

        18 : 'Alt',

        19 : 'Pause',

        20 : 'Caps Lock',

        27 : 'Escape',

        32 : 'Space',

        33 : 'Page Up',

        34 : 'Page Down',

        35 : 'End',

        36 : 'Home',

        37 : 'Left',

        38 : 'Up',

        39 : 'Right',

        40 : 'Down',

        42 : 'Print Screen',

        45 : 'Insert',

        46 : 'Delete',

        48 : '0',

        49 : '1',

        50 : '2',

        51 : '3',

        52 : '4',

        53 : '5',

        54 : '6',

        55 : '7',

        56 : '8',

        57 : '9',

        65 : 'A',

        66 : 'B',

        67 : 'C',

        68 : 'D',

        69 : 'E',

        70 : 'F',

        71 : 'G',

        72 : 'H',

        73 : 'I',

        74 : 'J',

        75 : 'K',

        76 : 'L',

        77 : 'M',

        78 : 'N',

        79 : 'O',

        80 : 'P',

        81 : 'Q',

        82 : 'R',

        83 : 'S',

        84 : 'T',

        85 : 'U',

        86 : 'V',

        87 : 'W',

        88 : 'X',

        89 : 'Y',

        90 : 'Z',

        91 : 'Windows',

        93 : 'Right Click',

        96 : 'Numpad 0',

        97 : 'Numpad 1',

        98 : 'Numpad 2',

        99 : 'Numpad 3',

        100 : 'Numpad 4',

        101 : 'Numpad 5',

        102 : 'Numpad 6',

        103 : 'Numpad 7',

        104 : 'Numpad 8',

        105 : 'Numpad 9',

        106 : 'Numpad *',

        107 : 'Numpad +',

        109 : 'Numpad -',

        110 : 'Numpad .',

        111 : 'Numpad /',

        112 : 'F1',

        113 : 'F2',

        114 : 'F3',

        115 : 'F4',

        116 : 'F5',

        117 : 'F6',

        118 : 'F7',

        119 : 'F8',

        120 : 'F9',

        121 : 'F10',

        122 : 'F11',

        123 : 'F12',

        144 : 'Num Lock',

        145 : 'Scroll Lock',

        182 : 'My Computer',

        183 : 'My Calculator',

        186 : ';',

        187 : '=',

        188 : ',',

        189 : '-',

        190 : '.',

        191 : '/',

        192 : '`',

        219 : '[',

        220 : '\\',

        221 : ']',

        222 : '\''
    };
    /**
     * @desc 根据keycode获得键名
     * @param  {Number} keycode
     * @return {String}
     */
    myFrame.getKeyName=function (keycode) {
        if (keyCodeMap[keycode]) {
            return keyCodeMap[keycode];
        } else {
            console.log('Unknow Key(Key Code:' + keycode + ')');
            return '';
        }
    };
    /*----------------------轮播--------------------------------*/
    /**
     * 轮播图移动方法
     * /
     * @param  {[type]} contDom   [description] 轮播大容器节点
     * @param  {[type]} scrollDom [description] 内部ul容器节点
     * @param  {[type]} leftDom   [description] 向左按钮
     * @param  {[type]} rightDom  [description] 向右按钮
     * @param  {[type]} automatic [description] 是否启动无缝滚动效果
     * @param  {[type]} time      [description] 动画时间
     * @param  {[type]} speed     [description] 每次动画移动距离
     * @param  {[type]} number    [description] 显示个数
     * @return {[type]}           [description]
     *
     * 使用:myFrame.slideMove({
				contDom:".home_cont .banner_cont",  //轮播大容器节点
				scrollDom:".banner_list",  //内部ul容器节点
				leftDom:" .icon_left",  //left按钮
				rightDom:" .icon_right",  //right按钮
				seamless:true,
				automatic:true
			});
     */
    myFrame.slideMove = function(options){
        var options =  $.extend({}, {
            number : false, //显示个数
            seamless : false, //是否启动无缝滚动效果
            automatic : false,       //是否启动 自动播放
            time : 2000  ,     //动画时间
            speed : false       //每次动画移动距离
        }, options || {});
        var oDiv= $(options.contDom),
            contDom = oDiv.find(options.scrollDom),   //最外层div
            oUl= contDom.find('ul'),                 //中间层ul
            oLi= oUl.find('li'),                //每一个板块li
            speed,oli,Length,oUlwidth;
        // 是否计算显示区域,均等分布li宽度
        if(options.number){
            oLi.css({"width":contDom.outerWidth(true)/options.number-30+"px"});
        }

        // 复制两份ul里面的内容到ul中，为的是实现无缝
        if(options.seamless){
            oLi.clone(true).appendTo(oUl);
        }

        speed=  options.speed || -oLi.outerWidth(true);  // 每次动画移动距离
        oli = oUl.children("li");                     // 单个li节点
        Length = oli.length ;                         // li标签个数
        oUlwidth = oli.eq(0).outerWidth(true)*Length;     // ul的总宽aaaa度
        oUl.css("width",oUlwidth+"px");  // 计算新的ul的长度

        //----------动画移动方法集合 -------------
        var animation = {
            // 无缝滚动情况下 向左移动
            move:function (){
                if(oUl[0].offsetLeft<=-oUl[0].offsetWidth/2){
                    oUl[0].style.left='0';
                }
                //设置ul的left值
                oUl[0].style.left=oUl[0].offsetLeft+speed+'px';      //每次增加移动距离
            },
            //向左移动
            moveLeft:function (){
                // 开启无缝滚动式 点击切换也是无缝效果
                if(options.seamless){
                    if(oUl[0].offsetLeft<=-oUl[0].offsetWidth/2){
                        oUl[0].style.left='0';
                    }
                }
                // ul总宽度 - ul已经移动的left长度 > 显示板块容器宽度
                if(oUlwidth-Math.abs(oUl[0].offsetLeft)>contDom.outerWidth(true)){
                    //设置ul的left值
                    oUl[0].style.left=oUl[0].offsetLeft+speed+'px';      //每次增加移动距离
                }
            },
            //向右移动
            moveRight:function (){
                // 开启无缝滚动式 点击切换也是无缝效果
                if(options.seamless){
                    if(oUl[0].offsetLeft ==0){
                        oUl[0].style.left= -oUl[0].offsetWidth/2+'px';
                    }
                }
                //  ul已经移动的left长度 >= li自身宽度
                if(Math.abs(oUl[0].offsetLeft)>=oLi.outerWidth(true) ){
                    //设置ul的left值
                    oUl[0].style.left = oUl[0].offsetLeft-speed+'px';      //每次增加移动距离
                }
            }
        };

        // 向右移动点击事件
        oDiv.find(options.leftDom).on("click",function(){
            animation.moveLeft();
        });

        // 向左移动点击事件
        oDiv.find(options.rightDom).on("click",function(){
            animation.moveRight();
        });

        // 是否 自动移动
        if(options.automatic){
            var timer=setInterval(animation.move,options.time);
            //阻止动画效果
            oDiv.hover(function(){
                clearInterval(timer); // 清除动画
            },function(){
                clearInterval(timer); // 清除动画
                timer=setInterval(animation.move,options.time); // 再次启动动画
            });
        }
    };

    /*----------------------查询关键字高亮显示--------------------------------*/
    /**
     * @desc   查询关键字高亮显示
     * @param  {Number}    idVal  -->元素id
     * @param  {Boolean}   keyword  查询关键字
     *
     * 使用 myFrame.SearchHighlight("result","部门界");
     */
    myFrame.SearchHighlight=function(idVal,keyword){
        /*若关键字为数字*/
        if(!isNaN(keyword)){
            var areaHtml = $('#'+idVal).html();
            var x = areaHtml.replace(new RegExp(keyword,"gm"),"<font color='red' >"+keyword+"</font>");
            $('#'+idVal).html(x);
            return;
        }
        var pucl = document.getElementById(idVal);
        if("" == keyword) return;
        var temp=pucl.innerHTML;
        var htmlReg = new RegExp("\<.*?\>","i");
        var arrA = new Array();
        //替换HTML标签
        for(var i=0;true;i++)
        {
            var m=htmlReg.exec(temp);
            if(m)
            {
                arrA[i]=m;
            }
            else
            {
                break;
            }
            temp=temp.replace(m,"{"+i+"}");
        }
        words = unescape(keyword.replace(/\+/g,' ')).split(/\s+/);
        //替换关键字
        for (w=0;w<words.length;w++)
        {
            var r = new RegExp("("+words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&")+")","ig");
            temp = temp.replace(r,"<b style='color:Red;'>$1</b>");
        }
        //恢复HTML标签
        for(var i=0;i<arrA.length;i++)
        {
            temp=temp.replace("{"+i+"}",arrA[i]);
        }
        pucl.innerHTML=temp;
    };
    //方法二:
    // var str = '成都';
    // $(".wrap_red ").each(function () {
    //     var repStr = $(this).text().replace(str, "<span class='color-search'>" + str + "</span>");
    //     $(this).html(repStr);
    // });
    /*----------------------禁止频率调用--------------------------------*/
    /**
     * @desc   函数节流。
     * 适用于限制`resize`和`scroll`等函数的调用频率
     *
     * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}   noTrailing     可选，默认为false。
     *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
     *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
     *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
     * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                    执行去节流功能时，调用`callback`。
     * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
     *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
     *
     * @return {Function}  新的节流函数
     */
    myFrame.throttle=function (delay, noTrailing, callback, debounceMode) {

        // After wrapper has stopped being called, this timeout ensures that
        // `callback` is executed at the proper times in `throttle` and `end`
        // debounce modes.
        var timeoutID;

        // Keep track of the last time `callback` was executed.
        var lastExec = 0;

        // `noTrailing` defaults to falsy.
        if (typeof noTrailing !== 'boolean') {
            debounceMode = callback;
            callback = noTrailing;
            noTrailing = undefined;
        }

        // The `wrapper` function encapsulates all of the throttling / debouncing
        // functionality and when executed will limit the rate at which `callback`
        // is executed.
        function wrapper() {

            var self = this;

            var elapsed = Number(new Date()) - lastExec;

            var args = arguments;

            // Execute `callback` and update the `lastExec` timestamp.
            function

            exec() {
                lastExec = Number(new Date());
                callback.apply(self, args);
            }

            // If `debounceMode` is true (at begin) this is used to clear the flag
            // to allow future `callback` executions.
            function clear() {
                timeoutID = undefined;
            }

            if (debounceMode && !timeoutID) {

                // Since `wrapper` is being called for the first time and
                // `debounceMode` is true (at begin), execute `callback`.
                exec();
            }

            // Clear any existing timeout.
            if (timeoutID) {
                clearTimeout(timeoutID);
            }

            if (debounceMode === undefined && elapsed > delay) {

                // In throttle mode, if `delay` time has been exceeded, execute
                // `callback`.
                exec();
            } else

            if (noTrailing !== true) {

                // In trailing throttle mode, since `delay` time has not been
                // exceeded, schedule `callback` to execute `delay` ms after most
                // recent execution.
                //
                // If `debounceMode` is true (at begin), schedule `clear` to execute
                // after `delay` ms.
                //
                // If `debounceMode` is false (at end), schedule `callback` to
                // execute after `delay` ms.
                timeoutID = setTimeout(debounceMode ? clear: exec, debounceMode === undefined ? delay - elapsed: delay);
            }
        }

        // Return the wrapper function.
        return wrapper;
    };
    /**
     * @desc 函数防抖
     * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
     * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
     * @example 适用场景：如在线编辑的自动存储防抖。
     * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}  atBegin       可选，默认为false。
     *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
     如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
     * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                  执行去抖动功能时，，调用`callback`。
     *
     * @return {Function} 新的防抖函数。
     */
    myFrame.debounce=function (delay, atBegin, callback) {
        return callback === undefined ? myFrame.throttle(delay, atBegin, false) : myFrame.throttle(delay, callback, atBegin !== false);
    };
/*--------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------初始化--------------------------------------------------------------------------------------------*/
    window.myFrame = myFrame;
    myFrame.init();
/***************************************************************************************************************************/
/***************************************************************************************************************************/
/***************************************************************************************************************************/
/******************************************扩展方法*************************************************************************/
    ;
    (function ($, window, document, undefined) {
        $.fn.extend({
            //
            /**
             * 表格合并单元格
             * [description]
             * @param  {[type]} colIdx  要合并的列序号，从0开始
             * @return {[type]} idNmae  需合并行区别标识符
             * @return {[type]} state  标识状态
             * 使用:$('.table').rowspan(0,'.td');
             */
            "rowspan": function (colIdx, idNmae, state) {
                return this.each(function () {
                    var that;
                    var id;
                    $('tr', this).each(function (row) {
                        $('td:eq(' + colIdx + ')', this).filter(':visible').each(function (col) {
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
                                $(that).css({"verticalAlign": 'middle'});  //td上下合并和居中

                                $(this).hide().remove();  //移除合并后下列的td
                            } else {
                                that = this;
                            }

                        });
                    });
                });
            },
            /*
            * 表单加载json(回填)对象数据
            *
            * @param jsonValue  -->var data={FirstName: "第三方第三方", LastName: "12313"};
            *
            * json数据的属性要与回填的表单的name对应
            *
            * 如:<form action="" id="forma">
            *       First name: <input type="text" name="FirstName" value="" /><br />
            *       Last name: <input type="text" name="LastName" value="" /><br />
            *       <button type="button" id="btn">dsf</button>
            *   </form>
            *
            *使用:$("formID").setForm(JSON.parse(data));
            *
            * */
            setForm: function (jsonValue) {
                var obj = this;
                $.each(jsonValue, function (name, ival) {
                    var $oinput = obj.find("input[name=" + name + "]");
                    if ($oinput.attr("type") == "checkbox") {
                        if (ival !== null) {
                            var checkboxObj = $("[name=" + name + "]");
                            var checkArray = ival.split(";");
                            for (var i = 0; i < checkboxObj.length; i++) {
                                for (var j = 0; j < checkArray.length; j++) {
                                    if (checkboxObj[i].value == checkArray[j]) {
                                        checkboxObj[i].click();
                                    }
                                }
                            }
                        }
                    }
                    else if ($oinput.attr("type") == "radio") {
                        $oinput.each(function () {
                            var radioObj = $("[name=" + name + "]");
                            for (var i = 0; i < radioObj.length; i++) {
                                if (radioObj[i].value == ival) {
                                    radioObj[i].click();
                                }
                            }
                        });
                    }
                    else if ($oinput.attr("type") == "textarea") {
                        obj.find("[name=" + name + "]").html(ival);
                    }
                    else {
                        obj.find("[name=" + name + "]").val(ival);
                    }
                })

            },
            // 获取对应 input、 select、textarea 的name value 值
            /**
             * [description]
             * @return {[type]} [description]
             */
            "getFormData": function () {
                var result = {},
                    $this = $(this);
                $(this).find("input,select,textarea").each(function () {

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
                                    value = $this.find("input[type=checkbox][name=" + name + "]:checked").map(function () {
                                        return $(this).val();
                                    }).get().join(",");
                                } else {
                                    value = $this.find("input[type=checkbox][name=" + name + "]:checked").map(function () {
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
            }


        })

    })(jQuery, window, document);
    /**************扩展方法end*******************/


})(window);