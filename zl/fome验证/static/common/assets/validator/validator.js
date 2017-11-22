/*******************************************************************************
 * validator.js -  validator
 * Copyright (C) 2013 
 *
 * @Author Skiny
 * @Email Skiny@iwebdever.com
 * @UpdateTime (2013-10-05)
 *******************************************************************************/

(function(window, undefined) {
	var validator = function(option) {
		var o = this;
		o.version = "1.0";
		o.author = "skiny";
		o.contact = "qq:408889769";
		o.setting = {
			target: "",
			submitBtn: "",
			targetId: "",
			submitBtnId: "",
			msgDirection: "right",
			backColor: [], // 方向 颜色
			scrollDom: false, // 提交验证时定位
			keyup: function() {},
			sure: function() {}, // 确认回调
			msgShow: true,
			always: false,
			fields: []
		};
		o.rules = {};
		o.messages = {};
		o.tips = {};
		o.passed = {};
		o.validateElement = {};
		o.extend(option);
		o.init();
	};
	validator.prototype = {
		extend: function(option) {
			if (option == null || typeof option != "object") return;
			for (key in option) {
				if (this.get(key) != undefined) this.set(key, option[key]);
			}
		},
		get: function(name) {
			return this.setting[name];
		},
		set: function(name, value) {
			this.setting[name] = value;
		},
		getDefaults: function() {
			if (!validator.defaults) {
				validator.defaults = {
					"rules": {},
					"messages": {}
				};
			}
			return validator.defaults;
		},
		addRules: function(rules) {
			if (typeof rules != "object") return;

			var name = "",
				rule = "",
				message = "";

			for (var i = 0; i < rules.length; i++) {
				name = rules[i].name;
				rule = rules[i].rule;
				message = rules[i].message;

				if (rule && this.getDefaults().rules[name] == undefined) this.getDefaults().rules[name] = rule;
				if (message && this.getDefaults().messages[name] == undefined) this.getDefaults().messages[name] = message;
			}
		},
		updateRule: function(rule, value) {
			if (this.getDefaults().rules[rule] != undefined) this.getDefaults().rules[rule] = value;
		},
		updateMessage: function(rule, value) {
			if (this.getDefaults().messages[rule] != undefined) this.getDefaults().messages[rule] = value;
		},
		result: function() {
			var o = this,
				result = true;

			for (var key in o.passed) {
				result = result && o.passed[key];
			}
			o.validateElement.each(function() {
				var label = ($(this)[0].tagName).toLowerCase();
				if (((label == "input") && ($(this).attr("type") == "text" || $(this).attr("type") == "password" || $(this).attr("type") == "hidden" || $(this).attr("type") == "file")) || (label == "textarea")) {
					$(this).blur();
				} else o.controlValidate($(this), label);
				if (o.get("target").find(".validator-" + label + "-error").length > 0) result = false;
			});


			return result;
		},
		getRule: function(name) {
			/*var o=this,
				result=null;
			return result;*/
		},
		getMessage: function(name) {
			var o = this,
				result = "";
			if (o.messages[name] != undefined) {
				result = o.messages[name];
			} else if (this.getDefaults().messages[name] != undefined) {
				result = this.getDefaults().messages[name];
			}
			return result;
		},
		guid: function() {
			var result = "";
			for (var i = 1; i <= 32; i++) {
				var n = Math.floor(Math.random() * 16.0).toString(16);
				result += n;
				if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
					result += "-";
			}
			return result;
		},
		hide: function(target) {

			var msg = $(".validator-msg[mark=" + target.attr("mark") + "]");
			if (msg.length == 1) msg.hide();
		},
		show: function(target, type) {
			var minLength = target.attr("minlength"),
				maxLength = target.attr("maxlength"),
				inputLength = target.val().length,
				message = target.attr("validator-msg");

			minLength = (minLength == undefined ? "" : minLength);
			maxLength = (maxLength == undefined ? "" : maxLength);
			inputLength = (inputLength == undefined ? "" : inputLength);

			message = message.replace(/{minlength}/gi, minLength);
			message = message.replace(/{maxlength}/gi, maxLength);
			message = message.replace(/{inputlength}/gi, inputLength);

			var o = this,
				mark = target.attr("mark"),
				obj = $(".validator-msg[mark=" + mark + "]"),
				offset = target.offset(),
				x = offset.left,
				y = offset.top,
				msgDirection = target.attr("msgDirection") ? target.attr("msgDirection") : o.get("msgDirection");
			// if(obj.length==0)
			// {
			// 	mark=o.guid();
			// 	target.attr("mark",mark);
			// 	obj=$("<div class=\"validator-msg"+((msgDirection!="left")?" msg-"+msgDirection:"")+"\" mark=\""+mark+"\">"+
			// 			"<div class=\"msg-content\"></div>"+
			// 			"<div class=\"msg-arrow-outer\"></div>"+
			// 			"<div class=\"msg-arrow\"></div>"+
			// 		  "</div>");
			// 	// $("body").append(obj);
			// 	target.parent().append(obj);
			// }
			// // 错误提示自动关闭
			// setTimeout(function(){
			// 	obj.hide();
			// },3500);
			// //msg
			// obj.find(".msg-content").text(message);

			// 提示信息框	layer

			if (o.get("scrollDom") && !myFrame.butArea(target)) {
				$(o.get("scrollDom")).stop(true, false).animate({
					scrollTop: target.offset().top
				}, 500);
			}


			layer.tips(message, target, { //1.错误信息，2提示位置，3同时提示多个错误
				tips: o.get("backColor") || [4, '#78BA32'], // 方向 颜色
				tipsMore: false //错误信息可以同时提示多个，...
			});

			var xSize, ySize;
			//msg direction
			switch (msgDirection) {
				case "right":
					x += target.outerWidth() + parseInt(target.css("margin-left").replace("px")) + parseInt(target.css("margin-right").replace("px")) + 4;
					y -= (obj.outerHeight() - target.outerHeight()) / 2;
					xSize = target.position().left + target.outerWidth() + parseInt(target.css("margin-left").replace("px")) + parseInt(target.css("margin-right").replace("px")) + 6;
					ySize = (obj.outerHeight() - target.outerHeight()) / 2;
					break;
				case "left":
					break;
				case "top":
					break;
				case "bottom":
					y += target.outerHeight() + 7;
					// ySize=target.outerHeight()+7;
					ySize = (obj.outerHeight() - target.outerHeight()) / 2;
					break;

			}

			// 显示位置 修改绝对定位		
			target.parent().css({
				"position": "relative"
			});
			obj.css({
				"top": ySize + "px",
				"left": xSize + "px"
			});
			//position
			// obj.css({"top":y+"px","left":x+"px"});
			obj.addClass("validator-error");
			var textLen = obj.find(".msg-content").eq(0).text().length * 20; // 根据字数计算相应错误提示
			obj.css({
				"visibility": "visible",
				"z-index": 99,
				"width": textLen + "px",
				"max-width": "300px"
			});

			//show
			$(".validator-msg[mark=" + mark + "]").show();
		},
		error: function(target, message) {
			target.attr("validator-msg", message).addClass("validator-input-error");
			if (this.get("msgShow") == true) this.show(target, "error");
			else target.attr("validator-msg", message);
		},
		success: function(target) { // 验证正确后的 默认操作
			target.removeClass("validator-input-error");
			$(".validator-msg[mark=" + target.attr("mark") + "]").remove();
			target.removeAttr("mark").removeAttr("validator-msg");
		},
		setFields: function() {
			var o = this,
				field = "";
			if (typeof o.get("fields") != "object") return;

			//label config
			o.get("target").find("[tips],[message]").each(function() {
				var name = $(this).attr("name"),
					tips = $(this).attr("tips"),
					message = $(this).attr("message");

				if (tips && o.tips[name] == undefined) o.tips[name] = $(this).attr("tips");
				if (message && o.messages[name] == undefined) o.messages[name] = $(this).attr("message");

				$(this).removeAttr("tips");
				$(this).removeAttr("message");
			});

			//json config
			$(o.get("fields")).each(function(i, v) {
				field = o.get("target").find("[name=" + v.field + "]");
				if (field.size() > 0 && v.field != undefined) {
					o.passed[v.field] = false;
					if (v.required != undefined) field.attr("required", v.required);
					if (v.rule != undefined) {
						field.attr("rule", v.rule);
						if (typeof v.rule == "object") o.rules[v.field] = v.rule;
					}
					if (v.message != undefined) o.messages[v.field] = v.message;
					if (v.tips != undefined) o.tips[v.field] = v.tips;
					if (v.minLength != undefined) field.attr("minlength", v.minLength);
					if (v.maxLength != undefined) field.attr("maxlength", v.maxLength);
					if (v.authFunc != undefined && typeof v.authFunc == "function") {
						var auth = v.authFunc.toString(),
							valueName = auth.substring(0, auth.indexOf("{")),
							functionStr = $.trim(auth.substring(auth.indexOf("{") + 1, auth.lastIndexOf("}")));
						valueName = $.trim(valueName.substring(valueName.indexOf("(") + 1, valueName.lastIndexOf(")")));
						if (valueName != "") field.attr("valuename", valueName);
						if (functionStr != "") field.attr("authfunc", functionStr);
					}
				}
			});
		},
		showControlMsg: function() {

		},
		controlValidate: function(target, label) {
			var o = this,
				msg = target.attr("validator-msg"),
				name = "";
			msg = (msg ? msg : "");

			if (label == "div") {
				//checkbox
				if (target.find(".controls-checkbox").length > 0) {
					name = target.find(".controls-checkbox").last().find("[type=checkbox]").attr("name");
					if (target.is(":hidden"))
						o.passed[name] = true;
					else if (target.find("[name][type=checkbox]:checked").length == 0) {
						o.passed[name] = false;
						myFrame.alert(msg);
					} else o.passed[name] = true;
					return;
				}

				//radio
				if (target.find(".controls-radio").length > 0) {
					name = target.find(".controls-radio").last().find("[type=radio]").attr("name");
					if (target.is(":hidden"))
						o.passed[name] = true;
					else if (target.find("[name][type=radio]:checked").length == 0) {
						o.passed[name] = false;
						myFrame.alert(msg);
					} else o.passed[name] = true;
					return;
				}
			} else if (label == "select") {
				msg = (msg ? msg : o.getMessage("required"));
				name = target.attr("name");
				debugger
				// if(target.next(".controls-select").is("hidden")){
				// 	o.passed[name]=true;
				// }
				// else if(target.val()==""){
				// 	o.passed[name]=false;
				// 	target.next(".controls-select").addClass("validator-input-error");
				// }
				// else{
				// 	o.passed[name]=true;
				// 	target.next(".controls-select").removeClass("validator-input-error");
				// }
			}
		},
		validate: function(target) {
			var o = this,
				name = target.attr("name"),
				messageName = "",
				message = "",
				valueName = target.attr("valuename"),
				value = ($.trim(target.val()) ? target.val() : ""),
				required = target.attr("required"),
				rule = target.attr("rule"),
				minLength = target.attr("minlength"),
				maxLength = target.attr("maxlength"),
				authFunc = target.attr("authfunc"),
				goOn = true,
				requiredFlag = true,
				ruleFlag = true,
				minLengthFlag = true,
				maxLengthFlag = true,
				authFuncFlag = true;

			//remove the spaces
			target.val(value);

			if (target.is(":hidden") && o.get("always") == false) {
				this.success(target);
				this.passed[name] = true;
				return;
			}

			//required
			if (required) {
				if (value == "") {
					requiredFlag = false;
					messageName = "required";
				} else requiredFlag = true;
			} else if (value != "") goOn = true;
			else goOn = false;

			//rule
			if (goOn && rule && (requiredFlag)) {
				var temp = name;
				if (typeof rule == "string") {
					if (o.messages[name] == undefined) temp = rule;
					rule = o.getDefaults().rules[rule];
				}

				if (rule) {
					if (!rule.test(value)) {
						ruleFlag = false;
						messageName = temp;
					} else ruleFlag = true;
				}
			}

			//minLength
			if (goOn && minLength && (requiredFlag && ruleFlag)) {
				if (value.length < parseInt(minLength)) {
					minLengthFlag = false;
					messageName = "minLength";
				} else minLengthFlag = true;
			}

			//maxLength
			if (goOn && maxLength && (requiredFlag && ruleFlag && minLengthFlag)) {
				if (value.length > parseInt(maxLength)) {
					maxLengthFlag = false;
					messageName = "maxLength";
				} else maxLengthFlag = true;
			}

			//auth funciton exec
			function authFuncExec() {
				valueName = valueName == "" ? "value" : valueName;
				var authFunctionResult = "";
				if (authFunc.indexOf("B.") >= 0) {
					authFunctionResult = window["B"][authFunc.replace("B.", "")](value, target);
				} else {
					try {
						authFunctionResult = new Function(valueName, authFunc)(value);
					} catch (ex) {

					}
				}

				if (typeof authFunctionResult == "object") {
					if (authFunctionResult.result) {
						authFuncFlag = true;
						o.get("target").find("[authfunc=\"" + authFunc + "\"]").each(function() {
							$(this).removeAttr("validator-msg").removeClass("validator-input-error");
						});
					} else {
						authFuncFlag = false;
						message = ((authFunctionResult.message == undefined) ? "" : authFunctionResult.message);
					}
				} else {
					authFuncFlag = false;
					messageName = "authFunc";
				}
			}

			//authFunc
			if (goOn && authFunc && (requiredFlag && ruleFlag && minLengthFlag && maxLengthFlag)) {
				if (target.attr("authfunc")) authFuncExec();
			}

			//message and result handle
			if (goOn == true && !(requiredFlag && ruleFlag && minLengthFlag && maxLengthFlag && authFuncFlag)) {
				if (messageName != "" && message == "") message = o.getMessage(messageName);
				o.error(target, message);
				o.passed[name] = false;
			} else {
				o.success(target);
				o.passed[name] = true;
			}

		},
		bindEvent: function() {
			var o = this,
				label = "";

			o.validateElement.each(function() {
				label = ($(this)[0].tagName).toLowerCase();
				if (((label == "input") &&
						($(this).attr("type") == "text" || $(this).attr("type") == "password" || $(this).attr("type") == "hidden" || $(this).attr("type") == "file")) ||
					(label == "textarea")
				) {
					//click event
					$(this).unbind("click.validator").bind("click.validator", function() {
						if ($(this).attr("validator-msg") != undefined) o.show($(this));
					});

					//keydown
					$(this).unbind("keyup.validator").bind("keyup.validator", function() {
						if ($(this).attr("maxlength") != undefined) {
							var length = parseInt($(this).attr("maxlength"));
							if ($(this).val().length >= length) {
								$(this).attr("validator-msg", o.getMessage("maxLength"));
								o.show($(this));
							} else {
								$(this).removeAttr("validator-msg");
								o.hide($(this));
							}

						}
					});

					//focus event
					$(this).unbind("focus.validator").bind("focus.validator", function() {
						if ($(this).attr("validator-msg") != undefined) o.show($(this));
					});

					//blur event
					$(this).unbind("blur.validator").bind("blur.validator", function() {
						o.validate($(this));
						if (o.get("msgShow") == false && $(this).attr("validator-msg") != undefined) o.hide($(this));

					});

					//change event
					$(this).off("change.validator").on("change.validator", function() {
						o.validate($(this));
						if (o.get("msgShow") == false && $(this).attr("validator-msg") != undefined) o.hide($(this));

					});

				}
			});
		},
		init: function() {
			var o = this;

			//get html object
			if (o.get("targetId") != "") o.set("target", $("#" + o.get("targetId") + ""));
			if (o.get("submitBtnId") != "") o.set("submitBtn", $("#" + o.get("submitBtnId") + ""));
			if (o.get("target") == "") o.set("target", $("body"));

			//form onsubmit
			if (typeof o.get("submitBtn") != "object") {
				o.get("target").find("form").unbind("submit").bind("submit", function() {
					return o.result();
				});
			} else o.get("submitBtn").unbind("click").bind("click", function() {
				// 检验成功时的回调方法 ，处理后续方法
				if (o.result()) {
					var succ = o.get("sure");
					succ.call($(this));
				}
				return o.result();
			});

			//set element
			o.validateElement = o.get("target").find("[rule],[required],[minlength],[maxlength],[authfunc]");

			//set fileds
			o.setFields();

			//update element
			o.validateElement = o.get("target").find("[rule],[required],[minlength],[maxlength],[authfunc]");

			//bind event
			o.bindEvent();
		}
	};

	$.fn.validator = function(option) {
		if (option == undefined) option = {};
		option.target = $(this);
		$(this).data(new validator(option));
	};

	$.fn.validatorUpdate = function(option) {
		var obj = $(this).data();
		if (obj && typeof obj.result == "function") {
			obj.passed = {};
			return obj.init();
		}
	};

	$.fn.validatorResult = function() {
		var obj = $(this).data();
		if (obj && typeof obj.result == "function") {
			return obj.result();
		} else return true;
	};

	//window
	window.validator = validator;
})(window);