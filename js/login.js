$(function(){
//	账号登陆,手机登陆切换
	$("#phoneLoginBtn").bind("click",function(){
		$("#nTips").hide();
		$("#normalLogin").hide();
		$("#phoneLogin").show();
	})
	$("#normalLoginBtn").bind("click",function(){
		$("#phoneLogin").hide();
		$("#normalLogin").show();
	})
//	input聚焦失焦border切换
	$(".input").bind("focus",function(){
		$(this).parent().css("border","1px solid #459ae9");
	})
	$(".input").bind("blur",function(){
		$(this).parent().css("border","1px solid #ccc");
	})
	$(".phone_pwd").bind("focus",function(){
		$(this).css("border","1px solid #459ae9");
	})
	$(".phone_pwd").bind("blur",function(){
		$(this).css("border","1px solid #ccc");
	})
	//用户名blur
	$("#nLoginUername").blur(function(){
		if($.trim($(this).val()) == ""){
			msg = "用户名不能为空";  
			$("#nTips").text(msg).show();
		}else if(!/^\w{5,25}$/.test($.trim($(this).val()))){
			msg = "请输入正确的用户名!"
			$("#nTips").text(msg).show();
		}else{
			$("#nTips").hide();
		}
	})
//	普通登陆提交
	$("#nSub").on("click",function(){
		var $nLoginUername = $("#nLoginUername");
		var $nLoginPwd = $("#nLoginPwd");
		var msg = "";
		if($.trim($nLoginUername.val()) == ""){
			msg = "用户名不能为空!"
			$("#nTips").text(msg).show();
			return false;
		}else if(!/^\w{5,25}$/.test($.trim($nLoginUername.val()))){
			msg = "请输入正确的用户名!"
			$("#nTips").text(msg).show();
			return false;
		}
		if($.trim($nLoginPwd.val()) == ""){
			msg = "密码不能为空!"
			$("#nTips").text(msg).show();
			return false;
		}
		
		if(($.trim($nLoginUername.val())!="webdesign")||($.trim($nLoginPwd.val())!="123456")){
			msg = "账号密码错误!";
			$("#nTips").text(msg).show();
		}
		if(msg!=""){
			alert("登陆失败")
			return false;
		}
		alert("登陆成功");
		window.open("../html/home.html");
	})
	
})