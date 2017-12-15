/*表单验证*/

//电话号码验证
$.validator.addMethod("phone", function(value, element,param) {
    var tel = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    var tel2 = /^1[34578]\d{9}$/;
    return this.optional(element) || (tel.test(value)) || (tel2.test(value));
}, $.validator.format("电话号码格式错误"));
//电话验证（电话唯一验证）
$.validator.addMethod("phoneCheck", function (value, element, param) {
        var status = false;
        if (value != null && value != "") {
            $.ajax({
                url: '${pageContext.request.contextPath }/personal/phoneCheck',
                type: 'post',
                data: 'phone=' + $("#new_Phone").val(),
                dataType: 'json',
                async: false,
                success: function (d) {
                    status = d;
                }
            });
        }
        return status;
    }, $.validator.format("手机号已被注册")
);
//[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5}
//中文验证
$.validator.addMethod("zw", function(value, element,param) {
    var tel =/[\u4e00-\u9fa5]{2,}/;
    //var tel =/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})/;  //少数民族的人名，或者外国人的中译名，例如：阿沛·阿旺晋美
    return this.optional(element) || (tel.test(value));
}, $.validator.format("请正确输入姓名"));
//邮箱验证
$.validator.addMethod("mail", function(value, element,param) {
    var mail =  /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return this.optional(element) || (mail.test(value));
}, $.validator.format("邮箱格式错误"));

//旧密码
$.validator.addMethod("oldPassword", function(value, element,param) {
    var pwd =$("#NewPassword").val();
    var pwd2 =$("#oldPassword").val();
    if(pwd==pwd2){
        var flag=true;
    }else{
        var flag=false;
    }
    return this.optional(element) || (flag) ;
}, $.validator.format("请输入正确的旧密码"));
//微信验证
$.validator.addMethod("wxreg", function(value, element,param) {
    var wxreg = /^([a-zA-Z]{1}[-_a-zA-Z0-9]{5,19})+$/;
    return this.optional(element) || (wxreg.test(value));
}, $.validator.format("邮箱格式错误"));
//确认密码验证
$.validator.addMethod("twoPassword", function(value, element,param) {
    var pwd =$("#password").val();
    var pwd2 =$("#twoPassword").val();
    if(pwd==pwd2){
        var flag=true;
    }else{
        var flag=false;
    }
    return this.optional(element) || (flag) ;
}, $.validator.format("请确认密码"));
//数字验证
$.validator.addMethod("number", function(value, element, param){
    var number =  /^([1-9]\d*|[0]{1,1})$/;
    return this.optional(element) || (number.test(value));
}, $.validator.format("请输入有效的数字"));

//数字和字母验证
$.validator.addMethod("NumAndLetter", function(value, element) {
    var reg = /^[0-9a-zA-Z]+$/;
    return this.optional(element) || (reg.test(value));
}, $.validator.format("只能输入数字和字母"));
//身份证验证
$.validator.addMethod("IDCard", function(value, element) {
    var status = false;
    var card = $.trim(value);
    if(card.length > 0){
        var regx = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
        status = !card.match(regx);
    }
    return !status;
}, $.validator.format("身份证格式错误"));
//身份证唯一
$.validator.addMethod("idCardCheck", function (value, element, param) {
        var status = false;
        if (value != null && value != "") {
            $.ajax({
                url: '${pageContext.request.contextPath }/personal/idCheck',
                type: 'post',
                data: 'idCard=' + $("#ID").val(),
                dataType: 'json',
                async: false,
                success: function (d) {
                    status = d;
                }
            });
        }
        return status;
    }, $.validator.format("身份证已被注册")
);
//ip验证
$.validator.addMethod("ipCheck", function(value, element) {
    var ip =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ ;
    return this.optional(element) || (ip.test(value));
}, $.validator.format("ip地址格式错误"));
//端口验证
$.validator.addMethod("portCheck", function(value, element) {
    var port =  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/ ;
    return this.optional(element) || (port.test(value));
}, $.validator.format("端口格式错误"));

//json提交
window.jsonSubmit = function(options){
    var messages = options.messages || {};
    var rules = options.rules || {};
    var formid = options.formid || "formTable";
    var successFun = options.successFun || function(){}
    var submitHandler = options.submitHandler || function(form){
        var index = layer.load(1, {
            shade: [0.7,'#848484'] //0.7透明度的灰色背景
        });
        $(form).ajaxSubmit({
            type:"post",  //提交方式
            dataType:"json", //数据类型
            success:function(data){ //提交成功的回调函数
                layer.close(index);
                if(data){//操作成功
                    layer.alert('操作成功',{
                        title:'信息提示',
                        icon: 1,
                        yes: function(index){
                            layer.close(index);
                            successFun();
                            //window.location.reload();
                        }
                    });
                }else{
                    layer.alert('操作失败',{title:'信息提示', icon: 2});
                }
            } ,
            error:function(info){
                console.log(info)
                layer.close(index);
                layer.alert(''+info+'',{title:'信息提示', icon: 3});
            }
        });
    };
    console.log(formid);
    $("#"+formid).validate({
        rules:rules,
        messages:messages,
        submitHandler:submitHandler

        //设置在表单后提示并搭配矢量图
        ,
        errorElement: 'span',
        errorClass: 'false',
        validClass: 'right',
        onfocusout: function(element){
            $(element).valid();
        },
        errorPlacement: function(error,element){
            element.parent().next().append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).removeClass('right').addClass('false');
            $(element).parent().next().removeClass('right').addClass('false').find('i').removeClass('icon-tongguo').addClass('icon-tishi1');
        },
        success: function(span){
            span.parent().removeClass('false').addClass('right');
            span.prev('.iconfont').removeClass('icon-tishi1').addClass('icon-tongguo');
            span.append('验证信息通过');
        }
        //设置在表单后提示end
    });
};