// 定义组件
define(function(require, exports, module) {
	var sTpl = require("templates/album.html");
	require('css/album.css');

	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				albums:[]//数据
			}
		},

		methods:{
			loadData:function(){
				var v =this;
				$.ajax({
					url:gMain.basePath+"ws/query_albums",
					async:true,
					type:"POST",
					data:JSON.stringify({
						 "UserID":document.getElementById('body').getAttribute('data-seeID')
					}),
                    success:function(e){
                        var album_result=JSON.parse(e);
                        console.info(album_result);
						v.albums=album_result.Albums;
                    }
				});
			},
			//跳转到相片
			GoPhotos:function(e){
				var v = this;
				var photosID;//相册ID
				photosID=e.target.parentNode.getAttribute('data-AlbumsID');
				document.getElementById('body').setAttribute('data-seePho',photosID);//嫁接到body上去
				v.$router.go('/photos');//跳转到相册浏览页

			},
			GoIndex:function(){
				this.$router.go('/');
			}


		},
		compiled:function () {
            var v =this;
            v.$parent.$data.siteTitle = "所有相册列表"
       },
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;
			$('#album_List li').css({height:$('#album_List li').width()});
			v.loadData();//加载数据

		}
	});

	module.exports = VueComponent;
});
