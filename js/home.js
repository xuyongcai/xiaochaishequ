$(function(){
//--------------- 导航栏input聚焦失焦点改变背景颜色     ------------
	$("#topSearchInput").focus(function(){
		$(this).css("background-color","#fff")
	})
	$("#topSearchInput").blur(function(){
		$(this).css("background-color","rgba(255,255,255,0.2)")
	})
	
//-------------  audience点击显示隐藏  ----------------
	$(".p_audience_box").click(function(){
		var state = $(this).children(".audience_hidden").css("display");
		if(state == "none"){
			$(this).children(".audience_hidden").show();		
		}else if(state == "block"){
			$(this).children(".audience_hidden").hide();
		}
	})
})
