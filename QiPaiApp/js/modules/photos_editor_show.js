// 定义组件
define(function(require, exports, module) {
	var sTpl = require("templates/photos_editor.html");
	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				clickPhotoPath:""//点击的相片路径
			}
		},
		detached:function(){
			var v = this;
			
		},
		methods:{
			GoEditor:function(){
				this.$router.go('/editor');
			}
		},
		compiled:function () {
            var v =this;
            v.$parent.$data.siteTitle = "相片编辑预览"//对应相册名称
       },
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;
			v.clickPhotoPath=v.$parent.$data.clickPhotoPath;
		}
	});

	module.exports = VueComponent;
});