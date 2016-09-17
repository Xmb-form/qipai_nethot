// 定义组件

alert('1');
define(function(require, exports, module) {
	var sTpl = require("templates/userList.html");
	require('css/userList.css');
	//jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');
	require('js/modules/getUrl.js');

	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				items: [] //数据

			}
		},
		methods: {
			loadData: function() {
				var v = this;
				$.ajax({
					type: "POST",
					url: gMain.basePath + "ws/query_nruser", //查询网红用户接口
					async: true,
					data: JSON.stringify({
						"CheckState": 1 // 0-等待审核,1-审核通过,2-审核不通过
					}),
					beforeSend:function () {
						$.showLoading("正在加载...");

                    },
                    complete:function () {

                    },
					success: function(res) {
						var data = JSON.parse(res);
						if(data.result==0){
							v.items = data.Users;
							setTimeout(function(){
							v.getImg();
							$.hideLoading();
						},0)
						}
						console.info(data);





					},
				})
			},
			scroll_begin:function(){
				$(document.body).pullToRefresh();
				this.scroll_on();
			},
			scroll_on:function(){
				var v = this;
				$(document.body).on("pull-to-refresh", function() {
  					//do something
  					v.loadData();
  					//setTimeout(function(){
  						v.scroll_end();
  					//},0);

				});
			},
			scroll_end:function(){
				$(document.body).pullToRefreshDone();
			},
			getwh: function($obj){
				var v = this;
				var tempImg = new Image();
				tempImg.src = $obj.attr("src");
				return {width:tempImg.width,height:tempImg.height};
			},
			getImg: function() {
				var v = this;
				var li_height = ($(body).height()*240)/667;
				$('#userList_photo li').css({height: li_height});
				$("#userList_photo img").each(function(){
					var oSize = v.getwh($(this));
					var $li = $("#userList_photo li:first");
					if(oSize.width / oSize.height > $li.width() / li_height){
						$(this).css({height:$li.height() + "px"});
					}else{
						$(this).css({width:$li.width() + "px"});
					}

				});
			},
			// radio: function() {
			// 	var li_height = ($(body).height()*240)/667;
			// 	$('#userList_photo li').css({height: li_height});

			// },

			//点击跳转到详细展示页面
			GoIndex: function(e) {
				var v = this;
				var UserID = e.target.parentNode.getAttribute('data-UserID');
				var UserName = e.target.parentNode.getElementsByTagName('p')[0].innerHTML;
				var UserHeader = e.target.getAttribute('src');

				window.location.href = "js:call//GoMore&"+UserID+"&"+UserName+"&"+UserHeader+"&http://it13.cn/QiPaiApp/index.html#!/";//IOS交互
				// v.$router.go('/');
			}
		},
		compiled: function() {
			var v = this;
			v.$parent.$data.siteTitle = "所有用户列表"
		},
		beforeCompile:function(){
			var v = this;
			v.loadData();//加载网红列表数据

		},
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;

			// v.scroll_begin();
		}

	});

	module.exports = VueComponent;
});
