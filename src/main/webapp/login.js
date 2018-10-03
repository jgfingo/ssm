/*
 * 系统登录
 * 龙坚
 * 2018-09-30
 */
var htmlObj = {};
//登录
htmlObj.login = function(){
    var username = $("#txtuser").val();
    var uerp = $("#txtuserp").val();
    if (username == '') {
        htmlObj.showMsg("txtuser", "请输入用户名！", 81, -29, 1);
        return;
    }
    if (uerp == '') {
        htmlObj.showMsg("txtuserp", "请输入密码！", 151, -17, 1);
        return;
    }
    
    var password = $.md5(uerp);
    $.ajax({
        type: "post",
        url: "/ssm/userLogin",
        data : {
			username : username,
			password : password,
		},
        dataType: "json",
        success: function (data) {
        	if (data.msg == 'account_error') {
        		 htmlObj.showMsg("txtuser", "用户不存在！", 175, -162, 1);
                 return;
			} else if (data.msg == 'password_error') {
				 htmlObj.showMsg("txtuserp", "密码错误！", 243, -95, 1);
	             return;
			}  else if (data.msg == 'authentication_error') {
				htmlObj.showMsg("txtuser", "您没有授权！", 175, -162, 1);
                return;
			} else {
				 window.location.href = "main.html";
			}
            if (data.msg === 0) {
               
            }
            if (data.msg == 2) {
               
            }
            if (data.msg == 1) {

               
            }
        },
		error : function(e) {
			// view("异常！");  
			alert("异常！");
		}
    });
        
}

// 展示消息
htmlObj.showMsg = function(domid, msg, top, right, timeout){
    $("#lgMess").css("display", "block");
    if (timeout != 0) {
        $("#lgMess").fadeOut(3000);
    }
    $("#spanMessge").html(msg);
    $("#lgMess").css("top", top + "px");
    $("#lgMess").css("right", right + "px");
    $(domid).addClass("loginLine");
    $(domid).focus();
    return false;
}
//初始方法
htmlObj.init = function(){
    $("#txtuser").focus();
    $("#btnLogin").click(function(){
        htmlObj.login();
    });
    // 键盘回车
    $(".input").keyup(function (e) {
        var code;
        if (!e) {
            var e = window.event;
        }
        if (e.keyCode) {
            code = e.keyCode;
        }
        else 
            if (e.which) {
                code = e.which;
            }
        if (code == 13) {
            htmlObj.login();
        }
    });
}
//页面加载
$(document).ready(function(){
    htmlObj.init();
});


