// 定义组件
define(function(require, exports, module) {
	var sTpl = require("templates/album_editor.html");

	//jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');

	require('css/album_editor.css');
	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				items: [] //数据
			}
		},
		created: function() {
			var v = this;
			$.ajax({
				type: "POST",
				url: gMain.basePath + "ws/query_albums",
				async: true,
				beforeSend: function() {
					$.showLoading("加载中...");
				},
				complete: function() {
					$.hideLoading();
				},
				data: JSON.stringify({
					"UserID": $('#body').attr('data-userId')
				}),
				success: function(e) {
					var res = JSON.parse(e);
					v.items = res.Albums;
					console.info(res);
				}
			});
		},
		methods: {
			editorAlbum: function() {
				
					
			},
			GoIndex: function() {
				this.$router.go('/');
			},
			addAlbum: function() {
				var v = this;
				$.prompt({
					title: '请输入你的相册名',
					text: '给自己起个高大上的相册名字吧',
					input: '',
					empty: true, // 是否允许为空
					onOK: function(input) {
						//点击确认
						$.confirm({
						  title: '温馨提示',
						  text: '相册尚未上传相片，是否立即上传？',
						  onOK: function () {
						    //点击确认
						    
						  },
						  onCancel: function () {
						  	$.toast("你取消了操作", "cancel");
						  }
						});

					},
					onCancel: function() {
						//点击取消
					}
				});
			}
		},
		compiled: function() {
			var v = this;
			v.$parent.$data.siteTitle = "所有相册列表"
		},
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;
			
		}
	});

	module.exports = VueComponent;
});