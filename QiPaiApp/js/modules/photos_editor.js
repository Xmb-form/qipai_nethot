// 定义组件

var  vtmp;
var count;
define(function(require, exports, module) {
	var sTpl = require("templates/photos_editor.html");
	//jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');
	
	require('css/photos_editor.css');
	require('js/modules/getUrl.js');
	

	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				items:[]//数据
				,PhotoPath:""//相片的路径
				,ClickAlbumID:""//点击进来时候的相册ID值
			}
		},
		detached:function(){
			var v = this;
			
		},
		methods:{
			GoAlbumEditor:function(){
				this.$router.go('/editor');
			},
			loadData:function(){
				var v = this;
//				alert('取id'+v.$parent.$data.clickAlbumID);
				$.ajax({
					type:"POST",
					url:gMain.basePath+"ws/query_photo",
					async:true,
					data:JSON.stringify({
						"AlbumsID":v.$parent.$data.clickAlbumID
					}),
					success:function(e){
						var res=JSON.parse(e);
						console.info(res);
						v.items=res.Photos;
					}
				});
			},
			//增加相片
        	addphotos:function(){
        		vtmp = this;

				window.location.href="js:call//uploadPhotos";

				vtmp.loadData();
						
					
        		
        		
        	},
        	add:function(){
//      		document.getElementById('body').setAttribute('data-uploadPhotos','');
//      		vtmp = this;
					$.ajax({
					url:gMain.basePath+"ws/upload_photo",
					type:"POST",
					async:true,
					data:JSON.stringify({
					"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
					"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
					"AlbumsID": vtmp.ClickAlbumID,
					"PhotoPath":document.getElementById('body').getAttribute('data-uploadPhotos')
//					"PhotoPath":url
				}),
				success:function(e){
					var res=JSON.parse(e);
					if(res.result==0){
			//									alert('成功');
//						vtmp.loadData();
			//									document.getElementById('body').setAttribute('data-uploadPhotos','');
					}
					}
				});
						vtmp.loadData();
        		
        	},
        	delete_photos:function(e){
        		var v = this;
//      		var clickAlbumID=v.$parent.$data.clickAlbumID;
				console.info(e.target);
				var photosId=e.target.parentNode.parentNode.getAttribute('data-photosID');//点击的那个照片ID
				var panentTarget=e.target.parentNode.parentNode;
//      		alert(photosId);
        		$.confirm({
				  title: '你确定要删除这张照片吗',
				  text: '删除后列表中将不再出现',
				  onOK: function () {
				    //点击确认
						$.ajax({
							url:gMain.basePath+"ws/delete_photo",
							type:"POST",
							data:JSON.stringify({
								"PhotoID":photosId,
								"UserAccount":$('#body').attr('data-UserAccount'),
								"UserPassword":$('#body').attr('data-PassWord')
								
							}),
							async:true,
							success:function(e){
								console.info(e);
								panentTarget.style.display='none';
								v.loadData();
								
							}
							
							
						})
				  },
				  onCancel: function () {
				  }
				});
        		
        		
        	}

		},
		created:function(){
			var v = this;
//				alert('取id'+v.$parent.$data.clickAlbumID);
				$.ajax({
					type:"POST",
					url:gMain.basePath+"ws/query_photo",
					async:true,
					data:JSON.stringify({
						"AlbumsID":v.$parent.$data.clickAlbumID
					}),
					success:function(e){
						var res=JSON.parse(e);
						console.info(res);
						v.items=res.Photos;
					}
			});
		},
		compiled:function () {
            var v =this;
            v.$parent.$data.siteTitle = "个人代表作"//对应相册名称
       },
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;
			v.ClickAlbumID=v.$parent.$data.clickAlbumID;
//			alert(v.ClickAlbumID);
//			v.loadData();
//			v.add();
			
		}
	});

	module.exports = VueComponent;
});