// 定义组件
define(function(require, exports, module) {
	var sTpl = require("templates/photos.html");
	require('css/photos.css');

	 //swiper
	require('js/plug/swiper/swiper-3.3.1.min.css');
	require('js/plug/swiper/swiper-3.3.1.min.js');
	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				photos:[],
				photosList_num:"",//当前相册排位
				photosList_numAll:"",//相册总数
				photosList_txt:""
			}
		},
		methods:{
			goback:function(){
				var v =this;
				v.$router.go('/album');//回到展示页面
			},
			//加载相片数据
			ajax:function(){
				var v=this;
				$.ajax({
					type:"POST",
					url:gMain.basePath+"ws/query_photo",
					async:true,
					data:JSON.stringify({
						"AlbumsID":document.getElementById('body').getAttribute('data-seePho')//ID值
					}),
					success:function(e){
						
						var result_photos=JSON.parse(e);
//						console.info(result_photos);
						// v.photos=result_photos.Photos;
						var aHtml= [];//设立一个空数组
						for(var i=0;i<result_photos.Photos.length;i++){
							var ImgPath= result_photos.Photos[i].PhotoPath;//图片路径
							var PhotoDesc=result_photos.Photos[i].PhotoDesc;//图片的介绍
							$('#PhotoDesc p').html(PhotoDesc);
							var oHtml='<div class="swiper-slide"><img src="'+ImgPath+'"/></div>';
							aHtml.push(oHtml);//每次装进数组
						}
						console.info(aHtml);
						v.swiper().appendSlide(aHtml);
						v.photosList_numAll=$('#xiangce .swiper-slide').length;//总相片数
						
						

					}
				});

			},
			swiper:function(){
				var v=this;
				var swiper = new Swiper('.swiper-container', {
			        onSlideChangeEnd:function(swiper){
			        	v.photosList_num=swiper.activeIndex+1;//重新赋值

			        }
			    });

			    // v.photosList_num=swiper.activeIndex+1;//交换变量
				return swiper;

			}

		},
		created:function(){
			var v=this;

		},
		init:function(){
			var v=this;
			v.$parent.$data.siteTitle = "相片浏览";
		},
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;
			v.ajax();//数据加载

		}
	});

	module.exports = VueComponent;
});
