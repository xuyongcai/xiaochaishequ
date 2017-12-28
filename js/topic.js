$(function(){
//	导航栏input聚焦失焦点改变背景颜色
	$("#topSearchInput").focus(function(){
		$(this).css("background-color","#fff")
	})
	$("#topSearchInput").blur(function(){
		$(this).css("background-color","rgba(255,255,255,0.2)")
	})
})
