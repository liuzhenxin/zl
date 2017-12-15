(function(window, undefined) {
    var myFrame = {
        version: "V1.0",
        config: (window.myFrame && window.myFrame.config) || {},
        module: (window.myFrame && window.myFrame.module) || {},
        temp: {}
    };
    /*
        去除空格
        str--->  字符串
       type---> 1-所有空格  2-前后空格  3-前空格 4-后空格
       myFrame.trim(' xx x x',1);
    */
   myFrame.trim=function (str, type) {
       switch (type) {
           case 1:
               return str.replace(/\s+/g, "");
           case 2:
               return str.replace(/(^\s*)|(\s*$)/g, "");
           case 3:
               return str.replace(/(^\s*)/g, "");
           case 4:
               return str.replace(/(\s*$)/g, "");
           default:
               return str;
       }
   };
   /*
        大小写转换
       str--->  字符串
       type---> 1:首字母大写 2：首页母小写 3：大小写转换 4：全部大写 5：全部小写
       使用：myFrame.changeCase(str, type)

   */
    myFrame.changeCase=function (str, type) {
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
    }

});