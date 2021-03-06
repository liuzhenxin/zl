/*!
* @Author: 李燕南 9411477276@qq.com
* @Date: 2017-08-15 16:59:16
* @Last Modified by: 李燕南-941477276@QQ.com
* @Last Modified time: 2018-03-24 17:38:01
* @git: https://github.com/941477276/UploadPreview.git
*/
; (function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        window.UploadPreview = factory(jQuery);
        try {
            if (typeof define === "function") {
                define(function(require) {
                    return factory(require("jquery"));
                });
            }
        } catch(e) {
            console.log(e);
        }
    }
})(function($) {
    function UploadPreview(options) {
        this.builder = {
            buildTool: function(onlyDel, datas) {
                var htmlArr = [],
                    datasArr = [],
                    datasStr = '';
                if (datas && $.isPlainObject(datas)) {
                    $.each(datas,
                        function(attr, val) {
                            datasArr.push("data-" + attr + "=" + val);
                        });
                    datasStr = datasArr.join(" ");
                }
                htmlArr.push('<div class="file-panel">');
               // htmlArr.push('<div class="item_right cancel"' + datasStr + '><span>X</span></div>');
               // htmlArr.push('<span class="cancel"' + datasStr + '>删除</span>');
                /*if (!onlyDel) {
                    htmlArr.push('    <span class="rotateRight" ' + datasStr + '>向右旋转</span>');
                    htmlArr.push('    <span class="rotateLeft" ' + datasStr + '>向左旋转</span>');
                }*/
                htmlArr.push('</div>');
                return htmlArr.join("");
            },
            buildUploadErrorMsg: function(errorMsg, delBtn, retryBtn) {
                var del = '',
                    retry = '';
                if (delBtn && delBtn != -1) {
                    del = '<a href="javascript: void(0);" class="retry-this">重试</a>&nbsp;';
                    if (retryBtn && retryBtn != -1) {
                        del += '|&nbsp;';
                    }
                }
                if (retryBtn && retryBtn != -1) {
                    retry = '<a href="javascript: void(0);" class="del-this">删除</a>';
                }
                return (!errorMsg && !delBtn && !retryBtn) ? '': ('<p class="error">' + errorMsg + del + retry + '</p>');
            },
            buildPreviewBox: function(options, toolBar) {
                var htmlArr = [],
                    previewElement = "div",
                    previewClass = "";
                if (options && $.isPlainObject(options)) {
                    previewElement = options.previewElement || "div";
                    previewClass = options.previewClass || "";
                }
                htmlArr.push('<' + previewElement + ' class="preview-box ' + previewClass + '">');
                htmlArr.push('<div class="imgWrap"></div>');
               // htmlArr.push('<div class="not-support-preview">文件: <b>' + (WuFile.name) + '</b></div>');
                htmlArr.push('    <p class="progress"><span></span></p>');
                if (toolBar && typeof toolBar === "string") {
                    htmlArr.push(toolBar);
                }
                htmlArr.push('</' + previewElement + '>');
                return htmlArr.join("");
            }
        }
        this.Version = "1.1.0";
        this._init(options);
    }
    UploadPreview.prototype._init = function(options) {
        this.options = {
            previewInfo: {
                width: -1,
                height: -1,
                viewImgHorizontal: true,
                previewClass: "",
                previewElement: "div",
                showToolBtn: true,
                toolBtnShowOnUpload: false,
                onlyDel: false,
                previewWrap: null,
                errorTipShow: true,
                errorMsg: "上传失败, ",
                delBtn: "删除",
                retryBtn: "重试",
                changeUploadBtnText: true,
                pauseText: "暂停上传",
                continueText: "继续上传"
            },
            drag: {
                dnd: null,
                disableGlobalDnd: false,
                paste: null
            },
            btns: {
                uploadBtn: null,
                retryBtn: null,
                chooseBtn: null,
                chooseBtnText: "选择图片",
                chooseBtnCanUseOnFinish: true,
                uploadBtnCanUsOnFinish: true
            },
            ignore: {
                extensions: '',
                mimeTypes: ''
            },
            accept: {
                extensions: '',
                mimeTypes: ''
            },
            auto: false,
            fileVal: "file",
            method: "POST",
            sendAsBlob: false,
            pictureOnly: true,
            multiple: true,
            swf: "Uploader.swf",
            url: "upload.php",
            datas: null,
            header: {},
            iosOnlyCamera: false,
            resize: false,
            duplicate: false,
            threads: 3,
            compress: false,
            maxFileNum: 50,
            // maxFileTotalSize: 524288000,
            // maxFileSize: 5242880,
            maxFileTotalSize: 999999999999999999,
            maxFileSize: 9999999999999,
            beforeFileQueued: function() {},
            fileQueued: function() {},
            fileDequeued: function() {},
            uploadStart: function() {},
            uploadComplete: function() {},
            uploadError: function() {},
            notSupport: function() {},
            uploadSuccess: function() {},
            uploadFinish: function() {},
            error: function() {},
            onDel: function() {},
            onDelUploaded: function() {}
        }
        if (!options || !$.isPlainObject(options)) {
            throw "必须传递一个包含上传文件必要参数的对象！";
        }
        $.extend(true, this.options, options);
        var that = this;
        var accept = {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/png,image/gif,image/jpeg,image/jpg,image/bmp'
            },
            optionAccept = this.options.accept;
        if (optionAccept && $.isPlainObject(optionAccept)) {
            var extensions = optionAccept.extensions || "",
                mimeTypes = optionAccept.mimeTypes || "";
            accept.extensions = accept.extensions += "," + (extensions.replace(".", ""));
            accept.mimeTypes = accept.mimeTypes += "," + mimeTypes;
            if (!this.options.iosOnlyCamera && WebUploader.Base.os.ios) {
                accept.mimeTypes += 'text/plain,application/msword,application/octet-stream,application/vnd.ms-excel,application/x-shockwave-flash,application/gzip';
            }
        }
        if (!this.options.pictureOnly) {
            accept = null;
        }
        this.options.accept = accept;
        this.fileLen = 0;
        this.faildLen = 0;
        this.retryBtn = this.options.btns.retryBtn ? $(this.options.btns.retryBtn) : null;
        this.uploader = WebUploader.create({
            pick: {
                id: $(this.options.btns.chooseBtn)[0],
                label: this.options.btns.chooseBtnText || "选择文件",
                multiple: this.options.multiple
            },
            accept: accept,
            auto: this.options.auto,
            swf: this.options.swf,
            server: this.options.url,
            fileVal: this.options.fileVal,
            chunked: true,
            dnd: this.options.drag.dnd,
            disableGlobalDnd: this.options.drag.disableGlobalDnd,
            paste: this.options.drag.paste,
            method: this.options.method.toUpperCase() || "POST",
            threads: this.options.threads || 3,
            resize: this.options.resize,
            duplicate: this.options.duplicate,
            compress: this.options.compress,
            sendAsBlob: this.options.sendAsBlob,
            fileNumLimit: this.options.maxFileNum,
            fileSizeLimit: this.options.maxFileTotalSize,
            fileSingleSizeLimit: this.options.maxFileSize
        });
        this._beforeFileQueued();
        this._fileQueued();
        this._fileDequeued();
        this._error();
        this._uploadBeforeSend();
        this._startUpload();
        this._uploadProgress();
        this._stopUpload();
        this._uploadComplete();
        this._uploadFinished();
        this._uploadAccept();
        this._uploadError();
        this.supportTransition = (function() {
            var s = document.createElement('p').style,
                r = 'transition' in s || 'WebkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s;
            s = null;
            return r;
        })();
        this.percentages = {
            total: {
                len: 0,
                percentages: 0
            }
        };
        this.uploadBtn = $(this.options.btns.uploadBtn).addClass('upload-ready');
        this.uploadBtn.attr("data-originText", this.uploadBtn.html());
        this._uploadBtnBindEvent();
        this.isProgress = false;
        this.files = {};
        if (this.options.previewInfo.previewWrap) {
            $(this.options.previewInfo.previewWrap).addClass('_filelist');
        }
        if (!this.options.iosOnlyCamera && WebUploader.Base.os.ios) {
            var $btn = $(this.options.btns.chooseBtn),
                $input = null;
            setTimeout(function() {
                    $input = $btn.find("input");
                    if ($input.attr("capture") == "camera") {
                        $input.removeAttr("capture");
                    }
                },
                1800);
        }
    }
    UploadPreview.prototype._beforeFileQueued = function() {
        var that = this,
            uploader = this.uploader,
            ignore = this.options.ignore,
            ignoreExtensions = "",
            ignoreMimeType = "";
        if (ignore) {
            ignoreExtensions = ignore.extensions;
            ignoreMimeType = ignore.mimeTypes;
        }
        if (ignoreExtensions.length > 0) {
            ignoreExtensions = ignoreExtensions.replace(".", "");
        }
        uploader.on("beforeFileQueued",
            function(WuFile) {
                var errorInfo = {};
                if (ignoreExtensions.length > 0) {
                    if (new RegExp(WuFile.source.ext).test(ignoreExtensions)) {
                        errorInfo.code = "Q_TYPE_DENIED";
                        errorInfo.size = WuFile.size;
                        errorInfo.type = WuFile.type;
                        errorInfo.ext = WuFile.source.ext;
                        errorInfo.msg = "文件类型不正确！";
                        that.options.error(errorInfo, WuFile);
                        return false;
                    }
                }
                if (ignoreMimeType.length > 0) {
                    if (new RegExp(WuFile.type).test(ignoreMimeType)) {
                        errorInfo.code = "Q_TYPE_DENIED";
                        errorInfo.size = WuFile.size;
                        errorInfo.type = WuFile.type;
                        errorInfo.ext = WuFile.source.ext;
                        errorInfo.msg = "文件类型不正确！";
                        that.options.error(errorInfo, WuFile);
                        return false;
                    }
                }
                if ((that.getFileLength() + 1) > that.uploader.options.fileNumLimit) {
                    errorInfo.code = "Q_EXCEED_NUM_LIMIT";
                    errorInfo.size = that.uploader.options.fileNumLimit;
                    errorInfo.type = WuFile.type;
                    errorInfo.ext = WuFile.source.ext;
                    errorInfo.msg = "文件总数量超出！";
                    that.options.error(errorInfo, WuFile);
                    return false;
                }
                if (! (WuFile.id in that.files)) {
                    that.files[WuFile.id] = WuFile;
                    that.fileLen++;
                }
                if (!that.chooseBtnInput) {
                    that.chooseBtnInput = $(that.options.btns.chooseBtn).find("input");
                    if (that.chooseBtnInput.length == 0) {
                        that.chooseBtnInput = $(that.options.btns.chooseBtn).find("object");
                    }
                    that.chooseBtnCanUse = true;
                }
                var flag = that.options.beforeFileQueued.call(this, WuFile);
                if (flag === false) {
                    return false;
                }
                return true;
            });
    }
    UploadPreview.prototype._fileQueued = function() {
        var that = this,
            imgWrap,
        state= false,
            uploader = this.uploader;
        uploader.on("fileQueued",
            function(WuFile) {
                var previewBox= that.render(WuFile, (!/image\//.test(WuFile.type)));
                $('._filelist').find(".imgWrap").each(function(index, el) {
                    var name = $(el).find("b").text();
                    if (name == WuFile.name) {
                        // uploader.removeFile(file, true);
                        state = true;
                    }else{
                        imgWrap= previewBox.find(".imgWrap");
                    }
                });
                if (state) {
                    alert("附件已存在！");
                    return;
                }
                // if (/image\//.test(WuFile.type)) {
                //     var width = that.options.previewInfo.width,
                //         height = that.options.previewInfo.height,
                //         imgWrapWh = {
                //             width: imgWrap.width(),
                //             height: imgWrap.height()
                //         },
                //         wh = {};
                //     if (width > 0 && height > 0) {
                //         wh.width = width;
                //         wh.height = height;
                //     }
                //     if (wh.width) {
                //         that.createPreviewImg(WuFile, wh.width, wh.height,
                //             function(file, img, src) {
                //                 imgWrap.find(".previewing").remove();
                //                 imgWrap.prepend(img);
                //                 that.options.fileQueued.call(this, file, img, src);
                //             });
                //     } else {
                //         uploader.makeThumb(WuFile,
                //             function(error, src) {
                //                 wh = UploadPreview.calculateWh(imgWrapWh.width, imgWrapWh.height, WuFile._info.width, WuFile._info.height);
                //                 that.createPreviewImg(WuFile, wh.width, wh.height,
                //                     function(file, img, src) {
                //                         imgWrap.find(".previewing").remove();
                //                         imgWrap.prepend(img);
                //                         that.options.fileQueued.call(this, file, img, src);
                //                     });
                //             });
                //     }
                // } else {
                function getSize(size){
                    // debugger;
                    var sizelong;
                    if(size>1024 && size<1024*1024){
                        sizelong = Math.floor(size/1024)+"KB"
                    }else if(size>1024*1024 && size<1024*1024*1024){
                        sizelong = Math.floor(size/(1024*1024))+"MB"
                    }else if(size>1024*1024*1024){
                        sizelong = Math.floor(size/(1024*1024*1024))+"GB"
                    }else if(size<1024){
                        sizelong = Math.floor(size)+"字节"
                    }
                    return sizelong
                }
                    var notSupportHtml= '<div class="not-support-preview item" id="' + WuFile.id + '">'+
                                            '<div class="item_left">'+checkFileType(WuFile.name)+'</div>'+
                                            '<div class="item_left">' +
                                                '<p class="up_size"><span class="up_name">' + WuFile.name + '</span><span class="fileSize">('+getSize(WuFile.size)+')</span></p>' +
                                                '<div class="progress_box"></div>' +
                                                '<div class="state"></div>' +
                                            '</div>' +
                                            '<div class="item_right cancel"  id="' + WuFile.id + '"><span>X</span></div>' +
                                        '</div>';
                       // '<b>' + (WuFile.name) + ' </b>' +
                   imgWrap.find(".previewing").hide();
                    imgWrap.prepend(notSupportHtml);
                    that.options.fileQueued.call(this, WuFile);
                // }
                that._uploadPercentage("add", WuFile.id, 0);
                if (!that.WUFile) {
                    that.WUFile = WuFile.constructor;
                }
                that._WuFileBindStatusChangeEvent(WuFile);
            });
    }
    UploadPreview.prototype._fileDequeued = function() {
        var that = this;
        that.uploader.on("fileDequeued",
            function(WuFile) {
                var previewBox = $("#" + WuFile.id);
                if (previewBox.length > 0) {
                    $("#" + WuFile.id).remove();
                }
                if (WuFile.id in that.files) {
                    delete that.files[WuFile.id];
                    that.fileLen--;
                }
                that._uploadPercentage("delete", WuFile.id);
                that.options.fileDequeued.apply(this, arguments);
            });
    }
    UploadPreview.prototype._WuFileBindStatusChangeEvent = function(WuFile) {
        WuFile.on("statuschange",
            function(currentState, prev) {
                switch (currentState) {
                    case "inited":
                        break;
                    case "queued":
                        break;
                    case "progress":
                        break;
                    case "complete":
                        break;
                    case "error":
                        break;
                    case "interrupt":
                        break;
                    case "invalid":
                        break;
                    default:
                        break;
                }
            });
    }
    UploadPreview.prototype._uploadBeforeSend = function() {
        var that = this;
        this.uploader.on('uploadBeforeSend',
            function(block, data, header) {
                var globalDatas = that.options.datas,
                    _fn = function(attr, val) {
                        data[attr] = val;
                    };
                if (globalDatas && $.isPlainObject(globalDatas)) {
                    $.each(globalDatas, _fn);
                }
                var fileDatas = block.file.datas;
                if (fileDatas && $.isPlainObject(fileDatas)) {
                    $.each(fileDatas, _fn);
                }
                if (that.options.header && $.isPlainObject(that.options.header)) {
                    $.extend(true, header, that.options.header);
                }
                data.rotation = block.file.rotation;
            });
    }
    UploadPreview.prototype._startUpload = function() {
        var that = this;
        that.uploader.on("startUpload",
            function() {
            
                if (that.chooseBtnCanUse && that.chooseBtnInput && that.chooseBtnInput[0]) {
                    that.disable();
                    that.chooseBtnCanUse = false;
                }
                if (that.options.previewInfo.changeUploadBtnText) {
                    var uploadBtn = that.uploadBtn;
                    if (uploadBtn && uploadBtn.length > 0) {
                        uploadBtn.addClass('upload-pause').removeClass('upload-ready upload-continue').html(that.options.previewInfo.pauseText);
                        uploadBtn[0].unabled = false;
                        uploadBtn[0].isProgress = true;
                    }
                }
                if (that.retryBtn && that.retryBtn.length > 0 && !that.retryBtnBindedEvent) {
                    that.retryBtn.on("click",
                        function() {
                            if (this.unable) {
                                return;
                            }
                            that.retry();
                            this.unable = true;
                        });
                    that.retryBtnBindedEvent = true;
                }
                that.options.uploadStart.call(this);
            });
    }
    UploadPreview.prototype._uploadProgress = function() {
        var that = this;
        that.uploader.on("uploadProgress",
            function(WuFile, percentage) {
                UploadPreview.setProgressWidth(WuFile.id, (percentage * 100 + "%"));
                that._uploadPercentage("update", WuFile.id, percentage);
            });
    }
    UploadPreview.prototype._stopUpload = function() {
        var that = this;
        that.uploader.on("stopUpload",
            function(WuFile, percentage) {
                if (that.options.previewInfo.changeUploadBtnText) {
                    var uploadBtn = that.uploadBtn;
                    if (uploadBtn && uploadBtn.length > 0) {
                        uploadBtn.addClass('upload-continue').removeClass('upload-ready upload-pause').html(that.options.previewInfo.continueText);
                        uploadBtn[0].unabled = false;
                        uploadBtn[0].isProgress = false;
                    }
                    if (that.chooseBtnInput && that.chooseBtnInput[0] && that.options.previewInfo.toolBtnShowOnUpload) {
                        that.enable();
                        that.chooseBtnCanUse = true;
                    }
                }
            });
    }
    UploadPreview.prototype._uploadComplete = function() {
        var that = this;
        that.uploader.on("uploadComplete",
            function(WuFile) {
                if (that.chooseBtnInput && that.chooseBtnInput[0] && that.options.previewInfo.toolBtnShowOnUpload) {
                    that.enable();
                    that.chooseBtnCanUse = true;
                }
                var previewBox = $("#" + WuFile.id);
                if (previewBox.find(".progress").length > 0) {
                    previewBox.find(".progress").hide();
                }
                that.options.uploadComplete.call(this, WuFile);
            });
    }
    UploadPreview.prototype._uploadFinished = function() {
        var that = this;
        that.uploader.on("uploadFinished",
            function() {
            
                if (!that.chooseBtnCanUse && that.chooseBtnInput && that.chooseBtnInput[0]) {
                    if (that.options.btns.chooseBtnCanUseOnFinish) {
                        that.enable();
                        that.chooseBtnCanUse = true;
                    } else{
                        that.enable();
                        that.chooseBtnCanUse = false;
                        alert('附件相同');
                    }
                    // else {
                    //     that.disable();
                    //     that.chooseBtnCanUse = false;
                    // }
                }
                if (that.options.previewInfo.changeUploadBtnText) {
                    var uploadBtn = that.uploadBtn;
                    if (!uploadBtn || uploadBtn.length == 0) {
                        return;
                    }
                    if (that.options.btns.uploadBtnCanUsOnFinish) {
                        uploadBtn.removeClass('upload-continue upload-pause').addClass('upload-ready').html(uploadBtn.data("origintext"));
                        uploadBtn[0].unabled = false;
                        uploadBtn[0].isProgress = false;
                    } else {
                        uploadBtn.removeClass('upload-continue upload-pause').addClass('upload-ready unable-btn').html(uploadBtn.data("origintext"));
                        uploadBtn[0].unabled = true;
                        uploadBtn[0].isProgress = false;
                    }
                }
                if (that.retryBtn && that.retryBtn.length > 0 && that.retryBtnBindedEvent) {
                    that.retryBtn.each(function() {
                        this.unable = false;
                    });
                }
                that.options.uploadFinish.call(this);
            });
    }
    UploadPreview.prototype._uploadError = function() {
        var that = this;
        this.uploader.on('uploadError',
            function(WuFile, reason) {
                that.faildLen++;
                that._uploadPercentage("update", WuFile.id, 0);
                var previewBox = $("#" + WuFile.id);
                if (previewBox.find(".error").length > 0) {
                    previewBox.find(".error").show();
                } else {
                    if (that.options.previewInfo.errorTipShow) {
                        that.renderUploadError(previewBox, WuFile);
                    }
                }
                if (!that.options.previewInfo.toolBtnShowOnUpload) {
                    if (!previewBox.showToolEventRemoved) {
                        previewBox.off("mouseenter.showTool").off("mouseleave.showTool");
                        previewBox.showToolEventRemoved = true;
                    }
                } else {
                    if (that.chooseBtnInput && that.chooseBtnInput[0]) {
                        that.enable();
                        that.chooseBtnCanUse = true;
                    }
                }
                UploadPreview.setProgressWidth(WuFile.id, 0);
                that.options.uploadError.apply(this, arguments);
            });
    }
    UploadPreview.prototype._uploadAccept = function() {
        var that = this;
        this.uploader.on('uploadAccept',
            function(file, response) {
                that.options.uploadSuccess.apply(this, arguments);
            });
    }
    UploadPreview.prototype._error = function() {
        var that = this;
        this.uploader.on("error",
            function(code, size, WuFile) {
                var errorInfo = {};
                errorInfo.code = code;
                errorInfo.size = size;
                if (WuFile) {
                    errorInfo.type = WuFile.type;
                    errorInfo.ext = WuFile.source.ext;
                }
                switch (code) {
                    case "Q_TYPE_DENIED":
                        errorInfo.msg = "文件类型不正确！";
                        break;
                    case "Q_EXCEED_NUM_LIMIT":
                        errorInfo.msg = "文件总数量超出！";
                        break;
                    case "Q_EXCEED_SIZE_LIMIT":
                        errorInfo.msg = "文件总体积超出！";
                        break;
                    case "F_EXCEED_SIZE":
                        errorInfo.msg = "单个文件体积超出！";
                        break;
                    default:
                        errorInfo.msg = "";
                        break;
                }
                that.options.error(errorInfo, WuFile);
            });
    }
    UploadPreview.prototype._uploadPercentage = function(type, id, percentage) {
        var that = this;
        if (type == "add") {
            that.percentages[id] = percentage;
            that.percentages.total.len += 1;
            that.percentages.total.percentages += percentage;
        } else if (type == "update") {
            that.percentages[id] = percentage;
            var percentages = that.percentages;
            that.percentages.total.percentages = 0;
            $.each(percentages,
                function(attr, val) {
                    if (attr != "total") {
                        that.percentages.total.percentages += val;
                    }
                });
        } else if (type == "delete") {
            that.percentages.total.len -= 1;
            delete that.percentages[id];
            var percentages = that.percentages;
            that.percentages.total.percentages = 0;
            $.each(percentages,
                function(attr, val) {
                    if (attr != "total") {
                        that.percentages.total.percentages += val;
                    }
                });
        }
    }
    UploadPreview.prototype.upload = function() {
        this.uploader.upload();
        return this;
    }
    UploadPreview.prototype.retry = function(file) {
        if (file && typeof file === "object") {
            this.uploader.retry(file);
        } else {
            this.uploader.retry();
        }
        return this;
    }
    UploadPreview.prototype.stop = function() {
        this.uploader.stop();
        return this;
    }
    UploadPreview.prototype.getFileLength = function(status) {
        return this.uploader.getFiles(status || "queued").length;
    }
    UploadPreview.prototype.getStats = function() {
        return this.uploader.getStats();
    }
    UploadPreview.prototype.getFiles = function() {
        return this.files;
    }
    UploadPreview.prototype.destroy = function() {
        this.uploader.destroy();
    }
    UploadPreview.prototype.setData = function(WuFile, data) {
        var uploader = this.uploader,
            argsLen = arguments.length,
            that = this;
        if (argsLen == 1) {
            data = WuFile;
        } else if (argsLen == 2) {
            if (!$.isPlainObject(data)) {
                return;
            }
            if (!this.WUFile && WuFile.constructor !== this.WUFile) {} else if (typeof WuFile === "string") {
                var files = uploader.getFiles();
                $.each(files,
                    function(index, file) {
                        if (file.id === WuFile) {
                            $.each(data,
                                function(attr, val) {
                                    if (file.datas == undefined) {
                                        file.datas = {};
                                    }
                                    file.datas[attr] = val;
                                });
                        }
                    });
                return;
            } else {
                $.each(data,
                    function(attr, val) {
                        if (WuFile.datas == undefined) {
                            WuFile.datas = {};
                        }
                        WuFile.datas[attr] = val;
                    });
                return;
            }
        }
        if (!$.isPlainObject(data)) {
            return;
        }
        if (!$.isPlainObject(that.options.datas)) {
            that.options.datas = {};
        }
        $.each(data,
            function(attr, val) {
                that.options.datas[attr] = val;
            });
        return this;
    }
    UploadPreview.prototype.setHeader = function(header) {
        var that = this;
        if (!header || !$.isPlainObject(header)) {
            return;
        }
        $.extend(true, that.options.header, header);
        return this;
    }
    UploadPreview.prototype["delete"] = function(WuFile) {
        if (!WuFile) {
            return;
        }
        this.uploader.removeFile(WuFile);
        return this;
    }
    UploadPreview.prototype.refresh = function(btns) {
        this.uploader.refresh();
        return this;
    }
    UploadPreview.prototype.disable = function(btns) {
        this.uploader.disable();
        return this;
    }
    UploadPreview.prototype.enable = function(btns) {
        this.uploader.enable();
        return this;
    }
    UploadPreview.prototype.render = function(WuFile, onlyDel) {
        var that = this,
            toolBar = '',
            previewBox = '',
            builder = this.builder;
        if (this.options.previewInfo.showToolBtn) {
            toolBar = builder.buildTool(onlyDel || this.options.previewInfo.onlyDel, {
                ruid: WuFile.source.ruid || "",
                id: WuFile.id
            });
        }
        previewBox = builder.buildPreviewBox({
                previewElement: this.options.previewInfo.previewElement,
                previewClass: this.options.previewInfo.previewClass
            },
            toolBar);
        previewBox = $(previewBox).attr("data-ruid", WuFile.source.ruid);
        previewBox[0].id = WuFile.id;
        WuFile.rotation = 0;
        // var panel = previewBox.find(".file-panel");
        // if (panel.length > 0) {
        //     var $imgWrap = previewBox.find(".imgWrap"),
        //         rotation = WuFile.source.rotation,
        //         deg = '';
        //     previewBox.on("mouseenter.showTool",
        //         function() {
        //             if (WuFile.getStatus() === "complete" && that.options.previewInfo.toolBtnShowOnUpload) {
        //                 panel.find('.rotateRight,.rotateLeft').hide();
        //             }
        //             panel.stop().animate({
        //                 height: 30
        //             });
        //         }).on("mouseleave.showTool",
        //         function() {
        //             panel.stop().animate({
        //                 height: 0
        //             });
        //         });
        //     panel.children('span').on("click",
        //         function() {
        //             var $this = $(this);
        //             if ($this.hasClass('cancel')) {
        //                 var id = $this.data("id");
        //                 if (WuFile.getStatus() === "complete") {
        //                     if (that.options.onDelUploaded && $.isFunction(that.options.onDelUploaded)) {
        //                         that.options.onDelUploaded(id,
        //                             function() {
        //                                 if (that.options.previewInfo.toolBtnShowOnUpload) {
        //                                     that.uploader.removeFile(id, true);
        //                                 }
        //                                 that._uploadPercentage("delete", $this.data("id"));
        //                             });
        //                         return;
        //                     }
        //                 } else {
        //                     if (that.options.onDel && $.isFunction(that.options.onDel)) {
        //                         var flag = that.options.onDel(id);
        //                         if (flag === false) {
        //                             return;
        //                         }
        //                     }
        //                 }
        //                 that.uploader.removeFile(id);
        //                 that._uploadPercentage("delete", $this.data("id"));
        //             } else if ($this.hasClass('rotateRight') || $this.hasClass('rotateLeft')) {
        //                 if ($this.hasClass('rotateRight')) {
        //                     WuFile.rotation += 90;
        //                     if (WuFile.rotation > 360) {
        //                         WuFile.rotation = 360;
        //                     }
        //                 } else if ($this.hasClass('rotateLeft')) {
        //                     WuFile.rotation -= 90;
        //                     if (WuFile.rotation < -270) {
        //                         WuFile.rotation = -270;
        //                     }
        //                 }
        //                 rotation = WuFile.rotation;
        //                 if (that.supportTransition) {
        //                     deg = 'rotate(' + rotation + 'deg)';
        //                     $imgWrap.css({
        //                         '-webkit-transform': deg,
        //                         '-mos-transform': deg,
        //                         '-o-transform': deg,
        //                         'transform': deg
        //                     });
        //                 } else {
        //                     $imgWrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~ ((rotation / 90) % 4 + 4) % 4) + ')');
        //                 }
        //             }
        //         });
        // }
        if (this.options.previewInfo.previewWrap) {
            $(this.options.previewInfo.previewWrap).append(previewBox);
        }
        return previewBox;
    }
    UploadPreview.prototype.renderUploadError = function(appendTo, WuFile) {
        if (!appendTo || appendTo.length == 0) {
            return;
        }
        if (!WuFile) {
            return;
        }
        var that = this,
            previewInfo = that.options.previewInfo,
            html = $(that.builder.buildUploadErrorMsg(previewInfo.errorMsg, previewInfo.delBtn, previewInfo.retryBtn)),
            spanBtn = html.find("a");
        if (html.length == 0) {
            return;
        }
        if (spanBtn.length > 0) {
            if (WuFile) {
                spanBtn.on("click",
                    function() {
                        var $this = $(this);
                        if ($this.hasClass('retry-this')) {
                            that.uploader.retry(WuFile);
                        } else if ($this.hasClass('del-this')) {
                            that.uploader.removeFile(WuFile);
                        }
                    });
            }
        }
        html.appendTo(appendTo);
    }
    UploadPreview.prototype.createPreviewImg = function(file, width, height, fn) {
        var that = this,
            uploader = this.uploader;
        uploader.makeThumb(file,
            function(error, src) {
                if (error) {
                    fn.call(this, error, src);
                    return;
                }
                var img = document.createElement("img");
                /*$(img).one("load",
                    function() {
                        if (that.options.previewInfo.viewImgHorizontal) {
                            $(this).css({
                                "position": "absolute",
                                "left": "50%",
                                "top": "50%",
                                "margin-left": -this.width / 2,
                                "margin-top": -this.height / 2
                            });
                        }
                        fn.call(this, file, img, src);
                    });
                img.src = src;*/
            },
            width > 0 ? width: 110, height > 0 ? height: 110);
    }
    UploadPreview.prototype._uploadBtnBindEvent = function() {
        var that = this;
        this.uploadBtn.on("click",
            function() {
                var $this = $(this);
                if ($this.hasClass('unable-btn') || $this[0].unabled) {
                    return;
                }
                if ($this.hasClass('upload-ready')) {
                    that.uploader.upload();
                } else if ($this.hasClass('upload-pause')) {
                    that.uploader.stop();
                } else if ($this.hasClass('upload-continue')) {
                    that.uploader.upload();
                }
            });
    }
    UploadPreview.calculateWh = function(viewW, viewH, imgW, imgH) {
        if (!viewW && !viewH) {
            return;
        }
        var width = 0,
            height = 0;
        if (viewW <= 0) {
            width = viewH * imgW / imgH;
            height = viewH;
        } else if (viewH <= 0) {
            height = viewW * imgH / imgW;
            width = viewW;
        } else {
            if (imgW < viewW && imgH < viewH) {
                height = imgH;
                width = imgW;
            } else if (imgW < viewW) {
                height = viewW * imgH / imgW;
                width = imgW;
            } else {
                height = viewW * imgH / imgW;
                width = viewW;
            }
        }
        return {
            width: width,
            height: height
        };
    }
    UploadPreview.setProgressWidth = function(ele, width) {
        if (typeof ele === "string") {
            ele = $("#" + ele).find(".progress span");
        }
        ele.width(width);
        return ele;
    }
    return UploadPreview;
});