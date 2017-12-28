$(function(){
//	------------------------左边菜单栏-------------------
	var $leftMenu = $('#leftMenu');
	var	lmTop =$leftMenu.offset().top;
	var	lmLift =$leftMenu.offset().left;
	$(document).on('scroll',function(){
		var	scrollTop = $(document).scrollTop();
		if(lmTop<=scrollTop){
			$leftMenu.css({
				position:'fixed',
				top:0,
				left:lmLift
			})
		}else{
			$leftMenu.css({
				position:'absolute',
				top:0,
				left:0
			})
		}
	})
//	-----------搜索类型点击显示隐藏---------------------
	$("#searchType").on('click',function(){
		if($("#searchExtend").css("display") == "block"){
			$("#searchExtend").hide();
		}else{
			$("#searchExtend").show();
		}
		return false   //阻止冒泡事件
	})
	$(document).click(function(){
		if($("#searchExtend").css("display") == "block"){
			$("#searchExtend").hide();
		}
	})
	
//	------------------------轮播-------------------------
	var $bContainer = $("#bannerContainer");
	var $bInner = $("#bannerInner");
	var bTimer = null,bufTimer = null;
	var $ol = null;
	var bKey = 0;
	$("#prevBtn").click(prev);
	$("#nextBtn").click(next);
	init()
	//初始化,生成小圆点
	function init(){
		$bContainer.append("<ol class='banner_dot'></ol>")
		$ol = $bContainer.find(".banner_dot")
		$bInner.find("li").each(function(index,e){ //创建圆点
			if(index == 0){
				$ol.append("<li class='cur'></li>")
			}else{
				$ol.append("<li></li>")
			}
		})
		$ol.css("margin-left",-($ol.width()/2));  //圆点居中
		
		var firstLi=$bInner.find("li").first().clone(); 	//复制第一张图片
		$bInner.append(firstLi);							//把第一张图片放到最后
		$bInner.width($bInner.find("li").length*$bContainer.width());   //设置ul的宽度为图片张数*图片宽度
		autoPlay();
	}
	//自动轮播
	function autoPlay(){
		clearInterval(bTimer);
		bTimer = setInterval(function(){
			bKey++;
			if (bKey>=$bInner.find("li").length) {
		  		bKey=1; 	//这里不是bKey=0
		  		$bInner.css({left:0}); //保证无缝轮播，设置left值
			}
			if (bKey==$bInner.find("li").length-1) { //设置小圆点指示
			  	$ol.find("li").eq(0).addClass("cur").siblings().removeClass("cur");
			}else{
		  		$ol.find("li").eq(bKey).addClass("cur").siblings().removeClass("cur");
		  	}
			var iTarget = -$bContainer.width()*bKey;
			buf(iTarget);
		},3000)
	}
	//缓冲运动
	function buf(iTarget){
		var speed = 0;		//速度
		clearInterval(bufTimer);
		bufTimer = setInterval(function(){
			speed = (iTarget - $bInner.position().left) / 10
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);	//向下向上取整，确保speed一定为0
			$bInner.css({
				left:$bInner.position().left + speed
			}) 
			if(speed == 0){
				clearInterval(bufTimer);
			}		
		},30)	
	}
	//上一张
	function prev() {
		clearInterval(bTimer);
		bKey--;
		if (bKey<0) {
		  	bKey=$bInner.find("li").length-2;
		  	$bInner.css({left:-(bKey+1)*$bContainer.width()}); //保证无缝轮播，设置left值
		}
		
		$ol.find("li").eq(bKey).addClass("cur").siblings().removeClass("cur");	//设置小圆点指示	
		var iTarget = - $bContainer.width() * bKey;
		buf(iTarget);
		setTimeout(autoPlay, 3000);
	}
	
	//下一张
	function next() {
		clearInterval(bTimer);
		bKey++;
		if (bKey>=$bInner.find("li").length) {
		  	bKey=1; 	//这里不是bKey=0
		  	$bInner.css({left:0}); //保证无缝轮播，设置left值
		}	
	 	if (bKey==$bInner.find("li").length-1) { //设置小圆点指示
		  	$ol.find("li").eq(0).addClass("cur").siblings().removeClass("cur");
		}else{
	  		$ol.find("li").eq(bKey).addClass("cur").siblings().removeClass("cur");
	  	}
		var iTarget = -bKey*$bContainer.width();
		buf(iTarget);
		setTimeout(autoPlay, 3000);	
	}
	
	 //鼠标移入，暂停自动播放，移出，开始自动播放
	$("#bannerContainer").mouseover(function(){
	 	clearInterval(bTimer);
	 	$("#bannerContainer").mouseout(function(){
	 		autoPlay();
	 	})
	})
	
	//鼠标划入圆点
	$(".banner_dot li").mouseover(function(){
	  	bKey=$(this).index();
	  	$ol.find("li").eq(bKey).addClass('cur').siblings().removeClass('cur');
	  	var iTarget = -bKey*$bContainer.width();
		buf(iTarget);
	})
	
//	禁止文字选择
	$("#searchType").bind("selectstart",function(){return false;});
	$(".checkbox_label").bind("selectstart",function(){return false;});
	
//	固定小方块
	$("#toTopBtn").bind("click",function(){
		$(window).scrollTop(0)
	})
	

	
//	-------------------------登陆框--------------------------
//	账号登陆,手机登陆切换
	$("#phoneLoginBtn").bind("click",function(){
		$("#nTips").hide();
		$("#fNormalLogin").hide();
		$("#fPhoneLogin").show();
	})
	$("#normalLoginBtn").bind("click",function(){
		$("#fPhoneLogin").hide();
		$("#fNormalLogin").show();
	})
	//	input聚焦失焦border切换
	$(".input").bind("focus",function(){
		$(this).parent().css({
			border:"1px solid #459ae9",
			zIndex: 9,
		}).siblings(".login_input").css({
			zIndex: 0
		})
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
		alert("登陆成功")
	})
	// 监听是否按了回车键  
    $(document).keydown(function(event){  
        if (event.keyCode === 13){ // 按了回车键  
            $("#nSub").trigger("click");  
        }  
    }); 
})



