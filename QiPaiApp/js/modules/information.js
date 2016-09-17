

// 定义组件
define(function(require, exports, module) {
	var sTpl = require("templates/information.html");
	require('js/modules/getUrl.js');
	//jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min2.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');
	require('js/plug/jquery_weui/city-picker.js');


	require('css/information.css');
	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				items:[]//数据
				,aChecked:[]//已选中的标签
				,tagNA:""//提交的标签数据
				,userName:""//用户名
				,userWeight:""//用户体重
				,oldName:""//原来的用户名
				,imgUrl:""//图片地址
				,userId:""//用户的id
				,IdentityTag:[]//标签
				,oheight:""//身高
				,oBust:""//胸围
				,oWaistline:""//腰围
				,oHips:""//臀围
				,oldCity:""//地址
				,uploadCity:""//提交的城市地址
			}
		},
		watch:{

		},

		methods:{
			loadInformation:function(){},
			//昵称
			choose_name:function(){
				var v =this;
				$.prompt({
				  title: '',
				  text: '请输入您的昵称',
				  input: '',
				  empty: true, // 是否允许为空
				  onOK: function (input) {
				  	console.info(input.length);
				  	if(input.length>=63||input.length<=0){
				  		$.toast("昵称为空或超过字数", "cancel");
				  		return false;
				  	}
				    v.userName=input;

				    $('#userName_txt').html(v.userName);


				  },
				  onCancel: function () {
				    //点击取消
				  }
				});

			},
			//头像
			choose_img:function(){

				window.location.href="js:call//headerImg";

			},

			//身高
			choose_height:function(){
				var v = this;
				 $("#user_offheight").picker({
			        title: "请选择你的身高",
			        cols: [
					          {
					            textAlign: 'center',
					            values: [ '1', '2']
					          },
					          {
					            textAlign: 'center',
					            values: ['0', '1', '2', '3', '4', '5', '6','7','8','9']
					          },
					          {
					            textAlign: 'center',
					            values: ['0', '1', '2', '3', '4', '5', '6','7','8','9']
					          }
			        ],

			        onClose:function(e){
			        	var Aarry=e.value;//数值，是一个数组
			        	var height_num="";//定义一个空变量存
//			        	console.info(Aarry);
			        	height_num=Aarry[0]+Aarry[1]+Aarry[2];

//			        	console.info(height_num);//num为程序过滤后的值
						$('#user_offheight').val(height_num+'cm');
						v.$parent.$data.edit_Height=height_num;//修改后的身高


						$.ajax({
								type:"POST",
								url:gMain.basePath+"ws/update_nruser",
								async:true,
								data:JSON.stringify({
								"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
								"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
								"Height":v.$parent.$data.edit_Height

								}),
							success:function(e){
								var res=JSON.parse(e);
								console.info(res);
							}
						});

			        },
			        onOpen:function(){
			        	$('.oldData_height').hide();
			        }
			    });

			},
			//体重
			choose_weight:function(){
				var v =this;
				 $("#user_offweight").picker({
			        title: "请选择您的体重",
			        cols: [

			          {
			            textAlign: 'center',
			            values: ['0', '1', '2']
			          },
			          {
			            textAlign: 'center',
			            values: ['0', '1', '2', '3', '4', '5', '6','7','8','9']
			          },
			          {
			            textAlign: 'center',
			            values: ['0', '1', '2', '3', '4', '5', '6','7','8','9']
			          }
			        ],

			        onClose:function(e){
			        	var Aarry=e.value;//数值，是一个数组
			        	var num="";//定义一个空变量存
			        	console.info(Aarry);
			        	if(Aarry[0]==0){
			        		num=Aarry[1]+Aarry[2];
			        		v.$parent.$data.edit_Weight=num;
			        	}else{
			        		num=Aarry[0]+Aarry[1]+Aarry[2];
			        		v.$parent.$data.edit_Weight=num;
			        	}

			        	v.userWeight=num;//num为程序过滤后的体重值

						$('#user_offweight').val(num+'kg');

						$.ajax({
								type:"POST",
								url:gMain.basePath+"ws/update_nruser",
								async:true,
								data:JSON.stringify({
								"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
								"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
								"Weight":v.$parent.$data.edit_Weight

								}),
							success:function(e){
								var res=JSON.parse(e);
								console.info(res);
							}
						});

			        },
			        onOpen:function(){
			        	$('.oldData_weight').hide();
			        }
			    }

				 );



			},
			//居住地
			choose_city:function(){
				var v = this;
				 $("#user_city").cityPicker({
			        title: "请选择您的居住地",
			        onChange: function (picker, values, displayValues) {
//       				console.log(values, displayValues);

        			},
        			onOpen:function(){
        				$('.oldData_city').hide();
        			},
        			onClose:function(e){
        				v.uploadCity=e.cols[0].displayValue+e.cols[1].displayValue;
        				v.$parent.$data.edit_city=v.uploadCity;
        				$.ajax({
								type:"POST",
								url:gMain.basePath+"ws/update_nruser",
								async:true,
								data:JSON.stringify({
								"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
								"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
								"Household":v.$parent.$data.edit_city

								}),
							success:function(e){
								var res=JSON.parse(e);
								console.info(res);
							}
						});


        			}

			    });

			},
			//三围
			choose_sanwei:function(){
				var v = this;
				$("#user_offsanwei").picker({
			        title: "请选择您的胸围-腰围-臀围",
			        cols: [

			          {
			            textAlign: 'center',
						values:	['50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120']

			          },
			          {
			            textAlign: 'center',
						values:	['40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']

			          },
			          {
			            textAlign: 'center',
						values: ['50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120','121','122','123','124','125','126','127','128','129','130','131','132','133','134','135','136','137','138','139','140']

			          }
			        ],

			        onClose:function(e){
			        	var Aarry=e.value;//数值，是一个数组
			        	var sanwei_num="";//定义一个空变量存
			        	console.info(Aarry);


			        	sanwei_num=Aarry[0]+'-'+Aarry[1]+'-'+Aarry[2];

			        	console.info(sanwei_num);//num为程序过滤后的值

						$('#user_offsanwei').val(sanwei_num);
						v.$parent.$data.edit_Bust=Aarry[0];//胸围
						v.$parent.$data.edit_Waistline=Aarry[1];//腰围
						v.$parent.$data.edit_Hips=Aarry[2];//臀围

						$.ajax({
								type:"POST",
								url:gMain.basePath+"ws/update_nruser",
								async:true,
								data:JSON.stringify({
								"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
								"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
								"Bust":v.$parent.$data.edit_Bust,
								"Waistline":v.$parent.$data.edit_Waistline,
								"Hips":v.$parent.$data.edit_Hips

								}),
							success:function(e){
								var res=JSON.parse(e);
								console.info(res);
							}
						});


			        },
			        onOpen:function(){
			        	$('.oldData_sanwei').hide();
			        }
			    });
			},
			//返回
			NotSure:function(){
				 $.closePopup();
			},

			Go_editor:function(){
				var v=this;
				$.confirm({
				  title: '你确定要放弃编辑吗',
				  text: '放弃编辑内容将不做改变',
				  onOK: function () {
				    //点击确认
				    	v.$router.go('/editor');
				  },
				  onCancel: function () {

				  }
				});

			},
			information_sure:function(){
					var v=this;

//					console.info('---'+tagName);
					console.info('修改后的身高'+v.$parent.$data.edit_Height);
					console.info('修改后的体重'+v.$parent.$data.edit_Weight);
					console.info('修改后的胸围'+v.$parent.$data.edit_Bust);
					console.info('修改后的腰围'+v.$parent.$data.edit_Waistline);
					console.info('修改后的臀围'+v.$parent.$data.edit_Hips);
					console.info('修改后的居住地'+v.$parent.$data.edit_city);
					console.info('修改后的标签'+v.$parent.$data.tagAll);


					$.ajax({
						type:"POST",
						url:gMain.basePath+"ws/update_userinfo",
						async:true,
						data:JSON.stringify({
							"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
							"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
							"Nickname":v.userName,
							"PortraitPath":$('#uploadHeader').attr('src')
						}),

						success:function(e){
							var res=JSON.parse(e);
							console.info(res);
							if(res.result==0){
								$.toast("修改成功");
								v.$router.go('/editor');
							}
							if(res.result==-4){
								$.toast("用户名已存在", "forbidden");
								return false;
							};




						}
					});

			},
			addActive:function(){
				$('#biaoqian .biaoqian_content section span').click(function(){
					$(this).toggleClass('active');
				})
			},
			//判断选中标签有多少个,确定提交验证
			BeSure_BiaoQian:function(){
				var v=this;
				$('#oldBiaoQian').hide();
				var select_biaoqian=$('.biaoqian_content section .active');//已选中的标签

				var num_active=select_biaoqian.length;
				if(num_active==0){
					$.toast("你尚未选择", "cancel");
					return false;
				}
				if(num_active>4){
					$.toast("最多选择四个", "cancel");
					return false;
				}
				if(0<num_active<=4){

						    //点击确认
						    $.toast("操作成功");
						    var aCheckedSpan=[];//定义一个容器装选择好的标签
							var tagNA='';
						    for(var i=0;i<num_active;i++){
						    	aCheckedSpan.push(select_biaoqian[i].innerHTML);
						    	tagNA=tagNA+select_biaoqian[i].innerHTML+',';

						    }
						    v.aChecked=aCheckedSpan;//交换数据
						    $.closePopup();
						    v.$parent.$data.tagAll=tagNA.substring(0,tagNA.length-1);//提交的标签



						    $.ajax({
								type:"POST",
								url:gMain.basePath+"ws/update_nruser",
								async:true,
								data:JSON.stringify({
									"UserAccount":document.getElementById('body').getAttribute('data-UserAccount'),
									"UserPassword":document.getElementById('body').getAttribute('data-PassWord'),
									"IdentityTag": v.$parent.$data.tagAll

								}),
								success:function(e){
									var res=JSON.parse(e);
									console.info(res);
								}
							});
				}
			},

	        //选择标签
	        choose_biaoqian:function(){

	        	$('#biaoqian').popup();//打开选择标签页面
	        }


		},
		compiled:function () {
            var v =this;
            v.$parent.$data.siteTitle = "编辑页面"
       },
       created:function(){


       		var v = this;
       		v.userId=$('body').attr('data-userId');
       		var UserAccount=document.getElementById('body').getAttribute('data-UserAccount');
       		var UserPassWord=document.getElementById('body').getAttribute('data-PassWord');
//     		v.oldName=document.getElementById("body").getAttribute('');
//     		alert('密码是'+UserPassWord);
//
//     		alert('用户id'+v.userId);
//     		alert('用户账户'+UserAccount);
       		//基本信息
       		//
       		$.ajax({
       			type:"POST",
       			url:gMain.basePath +"ws/query_userinfo_ex",
       			async:true,
       			data:JSON.stringify({
       				"UserAccount":UserAccount
       			}),
       			success:function(e){
       				var res =JSON.parse(e);
       				v.userName=res.Nickname;
       				v.imgUrl=res.PortraitPath;
       			}
       		});
       		//详细信息
       		$.ajax({
       			type:"POST",
       			url:gMain.basePath +"ws/query_nruser_info",
       			async:true,
       			data:JSON.stringify({
       				"UserID":v.userId
//					"UserID":1
       			}),
       			success:function(e){
       				var res =JSON.parse(e);
       				console.info(res)
       				v.userWeight=res.Weight;//体重
       				v.oheight=res.Height;//身高
//     				alert('体重是'+v.oheight);
       				v.IdentityTag=res.IdentityTag.split(',');//标签

       				console.info(v.IdentityTag);
					v.oBust=res.Bust;//胸围
					v.oWaistline=res.Waistline;//腰围
					v.oHips=res.Hips;//臀围
					v.oldCity=res.Household;//地址


       			}
       		});





       },
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;
			v.userName=v.$parent.$data.userName;
//			alert(v.oldName);
			v.addActive();//增加红色
			v.choose_sanwei();//三围
			v.choose_weight();//体重
			v.choose_height();//身高
			v.choose_city();//城市

//			setTimeout(function(){
//				v.loadInformation();
//			},0);

		}
	});

	module.exports = VueComponent;
});
