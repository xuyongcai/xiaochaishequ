$(function(){
//	聚焦失焦点提示
	$(".f_input").focus(function(){
		$(this).parent().siblings(".tips").show().siblings(".error_tips").hide();
		$(this).css("border","1px solid #459ae9");
		//置顶
		$(".form_item").css("z-index","0"),
		$(this).parent().parent().css("z-index","99");
	})
	$(".f_input").blur(function(){
		$(this).css("border","1px solid #999").parent().siblings(".tips").hide();;	
	})
	$("#userName").blur(function(){
		if ($.trim($(this).val()) == ""){  
            msg = "用户名不能为空";  
            $(this).siblings(".cpt_icon").hide();
            $(this).css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else if (!/^\w{5,25}$/.test($.trim($(this).val()))){  
            msg = "用户名格式不正确";  
            $(this).siblings(".cpt_icon").hide();
            $(this).css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else{
			//确认无误后,显示cpt_icon图标
        	$(this).siblings(".cpt_icon").show();
        }
	})
	$("#password").blur(function(){
		if ($.trim($(this).val()) == ""){  
            msg = "密码不能为空";  
            $(this).siblings(".cpt_icon").hide();
            $(this).css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else if (!/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test($.trim($(this).val()))){  
            msg = "密码格式不正确";  
            $(this).siblings(".cpt_icon").hide();
            $(this).css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else{
        	$(this).siblings(".cpt_icon").show();
        }
	})
	$("#c_password").blur(function(){
		var $psw = $("#password");
		if ($.trim($(this).val()) == ""){  
            msg = "确认密码不能为空";  
            $(this).siblings(".cpt_icon").hide();
            $(this).css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else if ($.trim($(this).val())!=$.trim($psw.val())){  
            msg = "密码不一致";  
            $(this).siblings(".cpt_icon").hide();
            $(this).css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else{
        	$(this).siblings(".cpt_icon").show();
        }
	})
	$("#phone").blur(function(){
		if($.trim($(this).val()) == ""){
			msg = "手机号码不能为空"; 
			$(this).siblings(".cpt_icon").hide();
			$(this).css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
		}else if(!(/^1[3|4|5|8]\d{9}$/.test($(this).val()))){
			msg = "手机格式不正确"
			$(this).siblings(".cpt_icon").hide();
			$(this).css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
		}else{
        	$(this).siblings(".cpt_icon").show();
        }
	})
	//服务条款点击修改check属性
	$("#readChecked").click(function(){
		var off = !$(this).attr("checked");
		if(off){
			$(this).attr("checked",true).parent().siblings(".error_tips").hide();			
		}else{
			$(this).attr("checked",false);
		}
		//console.log(off)
	})
	
//	提交验证
	$("#sbm").bind("click",function(){
		$(".f_input").parent().siblings(".tips").hide();
		var $userName = $("#userName");  
        var $psw = $("#password");  
        var $cPsw = $("#c_password"); 
        var $phone = $("#phone");  
        var $rc = $("#readChecked");
        var msg = ""; 
		//用户名验证
        if ($.trim($userName.val()) == ""){  
            msg = "用户名不能为空";  
            $userName.css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else if (!/^\w{5,25}$/.test($.trim($userName.val()))){  
            msg = "用户名格式不正确";  
            $userName.css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }
		//密码验证
        if ($.trim($psw.val()) == ""){  
            msg = "密码不能为空";  
            $psw.css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else if (!/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test($.trim($psw.val()))){  
            msg = "密码格式不正确";  
            $psw.css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }
		//确认密码验证
        if ($.trim($cPsw.val()) == ""){  
            msg = "确认密码不能为空";  
            $cPsw.css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }else if ($.trim($cPsw.val())!=$.trim($psw.val())){  
            msg = "密码不一致";  
            $cPsw.css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
        }
		//验证手机号码
		if($.trim($phone.val()) == ""){
			msg = "手机号码不能为空";  
			$phone.css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
		}else if(!(/^1[3|4|5|8]\d{9}$/.test($phone.val()))){
			msg = "手机格式不正确"
			$phone.css({border:"1px solid #ff5b5b"}).parent().siblings(".error_tips").text(msg).show();
		}
		console.log($("#readChecked").attr("checked"));
		//验证是否同意服务条款
		if(!$rc.attr("checked")){
			msg = "请先同意服务条款"
			$rc.parent().siblings(".error_tips").text(msg).show();
		}
		//最后判断,当msg为空就不提交
        if(msg!=""){
        	return false;
        }
	})
	
})
