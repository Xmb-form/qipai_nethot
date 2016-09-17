// 定义组件
define(function(require, exports, module) {
	var sTpl = require("templates/editor.html");
	require('css/editor.css');
	//swiper
	require('js/plug/swiper/swiper-3.3.1.min.css');
	require('js/plug/swiper/swiper-3.3.1.min.js');
	//jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min2.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');
	// require('js/modules/getPassWord.js');
	require('js/modules/getUrl.js');
	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				oNum_User_Main: "" //个人简介数字
				,oTxt_User_Main: "" //个人简介内容
				,oNewTxt: "" //新数据内容
				,oNum_Hobby_main: "" //技能特长数字
				,oTxt_Hobby_main: "" //技能特长内容
				,oNewTxt_Hobby_main: "" //新技能特长内容
				,oNum_Honor_Main: "" //荣誉经历数字
				,oTxt_Honor_Main: "" //荣誉经历内容
				,oNewTxt_Honor_main: "" //新荣誉经历内容
				,oNum_Work_Main: "" //工作经验数字
				,oTxt_Work_Main: "" //工作经验内容
				,oNewTxt_Work_Main: "" //新工作经验内容

				// 基础信息查询
				,oUserName: "" //用户名
				,oUserImg: "" //用户头像
				,oUserId: "" //用户ID
				,oHeight: "" //身高
				,oWeight: "" //体重
				,oWorkExperience: "" //工作经验
				,ww:[]
				,Honor: "" //荣誉经历
				,Specialty: "" //技能特长
				,Introduction: "" //个人简介
				,IdentityTag: [] //身份标签
				,Level: "" //等级
				,Household: "" //居住地
				,Bust: "" //胸围
				,Waistline: "" //腰围
				,Hips: "" //臀围
				,albumArry:[] //相册数组
				
				,videoArry:[]//视频数组
				,AlbumsID:""//相册的ID
				,AlbumsName:""//相册名
			}
		},
		watch: {
			'oTxt_User_Main': function(NewVal, OldVal) {
				var v = this;
				v.oNewTxt = NewVal; //赋予新数据内容
				v.oNum_User_Main = NewVal.length;
				if(NewVal.length > 2000) {
					$.toptip('字数不得超过2000', 'warning');
				}

			},
			'oTxt_Hobby_main': function(NewVal, OldVal) {
				var v = this;
				v.oNewTxt_Hobby_main = NewVal; //赋予新数据内容
				v.oNum_Hobby_main = NewVal.length;
				if(NewVal.length > 2000) {
					$.toptip('字数不得超过2000', 'warning');
				}

			},
			'oTxt_Honor_Main': function(NewVal, OldVal) {
				var v = this;
				v.oNewTxt_Honor_main = NewVal; //赋予新数据内容
				v.oNum_Honor_Main = NewVal.length;
				if(NewVal.length > 2000) {
					$.toptip('字数不得超过2000', 'warning');
				}

			},
			'oTxt_Work_Main': function(NewVal, OldVal) {
				var v = this;
				v.oNewTxt_Work_Main = NewVal; //赋予新数据内容
				v.oNum_Work_Main = NewVal.length;
				if(NewVal.length > 2000) {
					$.toptip('字数不得超过2000', 'warning');
				}

			}

		},
		created: function() {
			window.location.href="js:call//UserAccount";

		},
		methods: {
			loadData:function(){
				var v = this;
				var UserAccount=document.getElementById('body').getAttribute('data-UserAccount');
			//-------------------------------------------------------请求基本数据
			$.ajax({
				url: gMain.basePath + "ws/query_userinfo_ex",
				data: JSON.stringify({
					"UserAccount": document.getElementById('body').getAttribute('data-UserAccount')   
//					"UserAccount":'18888888888'
				}),
				async: true,
				type: "POST",
				success: function(e) {
					var res = JSON.parse(e);
					console.info(res);
					v.oUserName = res.Nickname; //用户昵称
					v.$parent.$data.userName=res.Nickname;//嫁接到父组件
					v.oUserImg = res.PortraitPath; //用户头像
					v.oUserId = res.UserID; //用户ID
					$('#body').attr('data-userId',v.oUserId);//嫁接到body上去
					v.oSex = res.UserSex; //性别 0为男性   1为女性

					//---------------------------------------------------------------请求三围等
					$.ajax({
						url: gMain.basePath + "ws/query_nruser_info",
						data: JSON.stringify({
							"UserID": v.oUserId
						}),
						async: true,
						type: "POST",
						success: function(e) {
							var res = JSON.parse(e);
							console.info('详细信息');
							console.info(res);
							v.oHeight = res.Height; //身高
							v.oWorkExperience = res.WorkExperience; //工作经验
							v.ww=res.WorkExperience.split('\n');
							v.oWeight = res.Weight; //体重
							v.IdentityTag = res.IdentityTag.split(','); //身份标签
							v.Honor = res.Honor; //荣誉
							v.Specialty = res.Specialty; //技能特长
							v.Introduction = res.Introduction; //个人简介
							console.info(v.Introduction);
							v.Level = res.Level; //等级
							v.Household = res.Household; //居住地
							v.Bust = res.Bust; //胸围
							v.Waistline = res.Waistline; //腰围
							v.Hips = res.Waistline; //臀围
						}

					});
					//---------------------------------------------------请求视频
					$.ajax({
						url: gMain.basePath + "ws/query_video",
						data: JSON.stringify({
							"UserID": v.oUserId
						}),
						async: true,
						type: "POST",
						success: function(e) {
							var res = JSON.parse(e);
							console.info(res);
							v.videoArry=res.Videos;//数组

						}

					});
					//请求相册
					$.ajax({
						url: gMain.basePath + "ws/query_albums",
						data: JSON.stringify({
							"UserID": v.oUserId
						}),
						async: true,
						type: "POST",
						success: function(e) {
							var res = JSON.parse(e);
							console.info(res);
							v.albumArry=res.Albums;
							

						}

					});



				}

			});

			},
			// --------------------------------
			Go_information: function() {
				var v = this;
				$.showLoading("正在加载...");
				setTimeout(function() {
					$.hideLoading();
					v.$router.go('/information');
				}, 300); //延迟做用户体验效果

			},
			GoBack: function() {
				window.location.href="js:call//GoBack";

			},
			//确定荣誉经历
			Besure_honor_main: function() {
				console.info(this.oNewTxt_Honor_main);
				$.closePopup();
				$.ajax({
					url:gMain.basePath+"ws/update_nruser",
					type:"POST",
					data:JSON.stringify({
						"Specialty":$('#Txt_honor_main').val(),
						"UserAccount": document.getElementById('body').getAttribute('data-UserAccount'),
						"UserPassword":document.getElementById('body').getAttribute('data-PassWord') 
					}),
					async:true,
					success:function(e){
						var res=JSON.parse(e);
						if(res.result==0){
							console.info('技能特长修改成功');
							
						}
						
						v.loadData();
						$.toast("操作成功");
						
					}
					
				})
				
				
				
				
				
			},
			//确定个人工作经验
			Besure_work_main: function() {
				var v = this;
				console.info(this.oNewTxt_Work_Main);
				$.closePopup();
				var aWorkExperience=$('#Txt_Work_main').val();
				console.info(aWorkExperience);
				$.ajax({
					url:gMain.basePath+"ws/update_nruser",
					type:"POST",
					data:JSON.stringify({
						"WorkExperience":aWorkExperience,
						"UserAccount": document.getElementById('body').getAttribute('data-UserAccount'),
						"UserPassword":document.getElementById('body').getAttribute('data-PassWord') 
					}),
					async:true,
					success:function(e){
						var res=JSON.parse(e);
						if(res.result==0){
							console.info('技能特长修改成功');
							v.loadData();
							$.toast("操作成功");
						}
						
						
						
					}
					
				})
			},
			//保存
			editor_submit: function() {
				$.ajax({
					url:gMain.basePath+"ws/update_nruser",
					type:"POST",
					data:JSON.stringify({
//						"WorkExperience":aWorkExperience,
						"UserAccount": document.getElementById('body').getAttribute('data-UserAccount'),
						"UserPassword":document.getElementById('body').getAttribute('data-PassWord') 
					}),
					async:true,
					success:function(e){
						var res=JSON.parse(e);
						if(res.result==0){
							console.info('技能特长修改成功');
							v.loadData();
							$.toast("操作成功");
						}
						
						
						
					}
					
				})
				$.toast("保存成功");
				
				

			},
			//关闭技能特长页面
			Close_hobby_main: function() {
				$.closePopup();
			},
			//确定技能特长
			Besure_hobby_main: function() {
//				console.info(this.oNewTxt_Hobby_main);
				$.closePopup();
				
				var v = this;
				$.toast("操作成功");
				$.closePopup();
//				console.info($('#Txt_user_main').text());
				$.ajax({
					url:gMain.basePath+"ws/update_nruser",
					type:"POST",
					data:JSON.stringify({
						"Specialty":$('#Txt_hobby_main').val(),
						"UserAccount": document.getElementById('body').getAttribute('data-UserAccount'),
						"UserPassword":document.getElementById('body').getAttribute('data-PassWord') 
					}),
					async:true,
					success:function(e){
						var res=JSON.parse(e);
						if(res.result==0){
							console.info('技能特长修改成功');
						}
						
						v.loadData();
						
					}
					
				})
//				console.info(this.oTxt_User_Main);
			
				
				
				
				

			},
			//个人代表作
			choose_img: function() {
				var v = this;
				v.$router.go('/album_editor');

			},
			//打开个人简介页面
			open_user_main: function() {
				$('#user_main').popup();
			},
			//关闭个人简介
			Close_user_main: function() {
				$.closePopup();
			},
			//------------------------------------------------确定个人简介
			Besure_user_main: function() {
				var v = this;
				$.toast("操作成功");
				$.closePopup();
				console.info('==='+$('#Txt_user_main').val());
				$.ajax({
					url:gMain.basePath+"ws/update_nruser",
					type:"POST",
					data:JSON.stringify({
						"Introduction":$('#Txt_user_main').val(),
						"UserAccount": document.getElementById('body').getAttribute('data-UserAccount'),
						"UserPassword":document.getElementById('body').getAttribute('data-PassWord') 
					}),
					async:true,
					success:function(e){
						var res=JSON.parse(e);
						if(res.result==0){
							console.info('个人简介修改成功');
							v.loadData();
							console.info($('#Txt_user_main').val());
							
						}
					}
					
				})
//				console.info(this.oTxt_User_Main);
			},
			//打开技能特长
			open_hobby_main: function() {
				$('#hobby_main').popup();

			},
			//打开荣誉经历
			open_honor_main: function() {
				$('#honor_main').popup();

			},
			//打开工作经验
			open_work_main: function() {
				$('#work_main').popup();
			},
			//个人视频
			open_video_main: function() {
				$("#video_main").popup();
			},
			//关闭个人视频
			Close_video_main:function(){
				$.closePopup();
			},
			//打开个人相册
			open_album_main:function(){
				$("#album_main").popup();
			},
			//关闭个人相册
			Close_album_main:function(){
				$.closePopup();
			},
			//点击进入相片编辑页面
			go_photos_editor:function(e){
				var v = this;
//				
				var ClickAlbumId=e.target.parentNode.getAttribute('data-AlbumsID');
				v.$parent.$data.clickAlbumID=ClickAlbumId;
				v.$router.go('/photos_editor');
			},
			//新增相册
			newAlbum:function(){
				var v=this;
				$.prompt({
				  title: '请输入新增相册的名字',
				  text: '相册名不得超过六个字符',
				  input: '新相册',
				  empty: false, // 是否允许为空
				  onOK: function (input) {
				    //点击确认
				    $.ajax({
				    	type:"POST",
				    	url:gMain.basePath+"ws/add_albums",
				    	async:true,
				    	data:JSON.stringify({
//				    		"UserAccount":'18888888888',
							"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
//				    		"UserPassword":'Bide2U82kZu1sd',
							"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
				    		"AlbumsName":input
				    	}),
				    	success:function(e){
				    		var res=JSON.parse(e);
				    		v.AlbumsID=res.AlbumsID;//返回相册id
				    		$.confirm({
							  title: '你还没有上传相片',
							  text: '是否立即上传',
							  onOK: function () {
							    //立即上传相片
//							    window.location.href="js:call//OpenCamera";
								v.$router.go('photos_editor');
								v.$parent.$data.clickAlbumID=v.AlbumsID;
							    
							    
							    
							    
							  },
							  onCancel: function () {
//							  		var oHtml='<li data-AlbumsID="'+v.AlbumsID+'">'+
//					   					'<img v-bind:src="pic.PhotoPath" />'+
//					   					'<p class="border_box flexBox">'+
//					   						'<span class="flex">'+input+'</span>'+
//					   						'<span class="icon iconfont flex editor_album " v-on:click="editor_album">&#xe60a;</span>'+
//					   						'<span class="icon iconfont flex delete_album" v-on:click="delete_album">&#xe608;</span>'+
//					   					'</p>'+
//					   				'</li>';
//					   				$('#album_main_ul').append(oHtml);
					   				v.loadData();//再次请求刷新
							  	
							  }
							});
				    		
				    		
				    	}
				    });
				    
				    
				    
				  },
				  onCancel: function () {
				    //点击取消
				  }
				});
			},
			//修改相册名字
			editor_album:function(e){
				var v = this;
				var editor_albumID=e.target.parentNode.parentNode.getAttribute('data-AlbumsID');
				var oSpanHtml=e.target.parentNode.getElementsByTagName('span')[0].innerHTML;
				$.prompt({
				  title: '请修改相册的名字',
				  text: '相册名不得超过六个字符',
				  input: '企拍生活照',
				  empty: false, // 是否允许为空
				  onOK: function (input) {
				  	$.ajax({
				  		url:gMain.basePath+"ws/update_albums",
				  		type:"POST",
				  		async:true,
				  		data:JSON.stringify({
//				  			"UserAccount":'18888888888',
//				    		"UserPassword":'Bide2U82kZu1sd',
							"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
							"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
				  			"AlbumsID":editor_albumID,
				  			"AlbumsName":input
				  		}),
				  		success:function(event){
				  			//成功后执行 
				  			e.target.parentNode.getElementsByTagName('span')[0].innerHTML=input;
							console.info(e.target.parentNode.getElementsByTagName('span')[0].innerHTML)	;
				  		}
				  	});
				  },
				  onCancel:function(){}
			})

			},
			//删除相册
			delete_album:function(e){
				dataAlbumsID=e.target.parentNode.parentNode.getAttribute('data-AlbumsID');
				$(e.target.parentNode.parentNode);
				var oLi=e.target.parentNode.parentNode;
				
				$.confirm({
					  title: '你确定要删除这个相册吗',
					  text: '删除后列表中将不再出现',
					  onOK: function () {
					    //点击确认
					    	$.ajax({
								url:gMain.basePath+"ws/delete_albums",
								type:"POST",
								data:JSON.stringify({
//									"UserAccount":'18888888888',
//									"UserPassword":'Bide2U82kZu1sd',
									"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
									"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
									"AlbumsID":dataAlbumsID
								}),
								async:true,
								success:function(e){
									var res=JSON.parse(e);
									console.info(res);
									$(oLi).remove();//删除相册
									
								}
							});
					  },
					  onCancel: function () {
					  }
				});
			}
		},
		init: function() {
			var v = this;
			v.$parent.$data.siteTitle = "网红资料"
		},
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;
			setTimeout(function(){
				v.loadData();
			},0)

		}
	});

	module.exports = VueComponent;
});
