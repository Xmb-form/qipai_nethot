// 定义组件
define(function (require,exports,module) {
    var sTpl = require("templates/certification.html");
    require('css/certification.css');
    //jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min2.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');
	require('js/modules/getUrl.js');
	
    var VueComponent = Vue.extend({
        template: sTpl,
        data:function () {
            return {
            	oSex:""//性别
            	,oTapChange:""//同意状态   0表示同意 ，1表示不同意
            	,cameraUrl:""//图像路径
            }
        },
        watch:{
        
        },
        methods:{
        	
        	//关闭协议
        	close_agreement:function(){
        		$.closePopup();
        	},
        	//打开摄像头
        	OpenCamera:function(){
        		window.location.href="js:call//OpenCamera";
//				window.location.href="js:call//headerImg";
        	},
        	GoBack:function(){
        		window.location.href="js:call//GoBack";
        	},
        	//点击出现协议内容
        	agreement:function(){
        		$('#agreement').popup();
        	},
        	//是否同意
        	changeSex:function(e){
        		var v = this;
        		if(e.target.getAttribute('class')=='weui_icon_circle'){
        			e.target.setAttribute('class','weui_icon_success');
        			v.oTapChange=0;//表示同意
        		}else{
        			e.target.setAttribute('class','weui_icon_circle');
        			v.oTapChange=1;
        		}
        		
        		
        	},
        	//性别打钩
        	select_sex:function(e){
        		$('#data_sex p i').attr('class','weui_icon_circle');
        		e.target.setAttribute('class','weui_icon_success');
        	},
        	//选择性别
        	choose_sex:function(){
        		$("#choose_yoursex").popup();
        	},
       		sex_close:function(){
       			var v = this;
       			if($('#data_sex p .weui_icon_success')){
       				v.oSex=$('#data_sex p .weui_icon_success').parent().find('span').html();
       				
       			}else{
       				return false;
       			}
       			
       			$.closePopup();
       		},
        	GoNext:function(){
        		var v = this;
        		var UserAccount=document.getElementById("body").getAttribute('data-UserAccount');//账户
        		var UserPassword=document.getElementById("body").getAttribute('data-PassWord');//密码
        		var RealName=$('#RealName').html();//真实姓名
        		var UserSex=$('#UserSex').html();//性别
        		if(UserSex=="男"){
        			UserSex=0;
        		}else{
        			UserSex=1;
        		}
        		var Identity=$('#Identity').val();//身份证
        		var IdentityImage=$('#cameraUrl').attr('src');
        		var Company=$('#Company').val();//公司
        		var Telephone=$('#UserPhone').val();//手机号码

				var regId=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;//身份证验证
				var regTel=/^1\d{10}$/;//手机号码正则验证
				if($('#RealName').html()==''){
					$.toast("真实姓名不能为空", "cancel");
					return false;
				}else{
					if($('#RealName').html()=='xxx'){
						$.toast("你还没输入真实姓名", "cancel");
						return false;
					}else{
										if(regId.test($("#Identity").val())){
					
					if(regTel.test($('#UserPhone').val())){
						if($('#checkOn').attr('class')=='weui_icon_circle'){
							$.toast("你还没同意企拍人才建档协议", "cancel");
							return false;
						}else{
							
								if($('#Company').val()==''){
									$.toast("签约公司不能为空", "cancel");
									return false;
								}else{
									//只有当身份证，手机号码和同意之后才请求，否则提示用户不通过
									$.ajax({
					        			url:gMain.basePath+'ws/update_realinfo',
					//      			url:"http://192.168.0.233/ws/update_realinfo",
					        			type:'POST',
					        			async:true,
					        			data:JSON.stringify({
					        				"UserAccount":UserAccount,
					//      				"UserAccount":'18888888888',
					        				"UserPassword":UserPassword,
					//						"UserPassword":"Bide2U82kZu1sd",
					        				"RealName":RealName,
					//						"RealName":"钱进",
					        				"UserSex":UserSex,
					//						"UserSex":1,
					        				"Identity":Identity,
					//						"Identity":"1232",
					        				"Company":Company,
					//						"Company":"企拍",
					        				"Telephone":Telephone,
					//						"Telephone":"15270704913",
					        				"IdentityImage":IdentityImage
					//						"IdentityImage":"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1889789971,2360758735&fm=58"
					        				
					        			}),
					        			success:function(e){
					        				var res=JSON.parse(e);
					        				if(res.result==0){
					      						$.toast("认证提交");
					        					v.$router.go('/editor');
					        				}
					        				
					        			}
					        			
					        		});
								}
								
									
							
							
						}
							
					}else{
						$.toast("经纪人手机号码为空或格式不对", "cancel");
						return false;
					}
					
				}else{
					$.toast("身份证格式不对", "cancel");
					return false;
				}
						
						
						
					}
					
				}
				
				
				


        		
        		
        	},
        	ChooseYourName:function(){
        		$.prompt({
				  title: '请输入您的真实姓名',
				  text: '字数不得超过六个',
				  input: '企拍小小兔',
				  empty: true, // 是否允许为空
				  onOK: function (input) {
//				  	console.info(input);
				    if(input.length>=6||input.length<=0){
				    	$.toast("姓名为空或者超出字符", "cancel");
				    	return false;
				    }else{
				    	 $('#RealName').html(input);
				   
				    }
				   
				    
				  },
				  onCancel: function () {
				    //点击取消
				  }
				});
        	},
        },
        init:function () {
            var v =this;
            v.$parent.$data.siteTitle = "实名认证"
       },
       created:function(){
       		window.location.href="js:call//UserAccount";
       },
       // 在 vm.$el 插入 DOM 时调用。
        attached:function () {
            var v = this;
           
        }
    });

    module.exports = VueComponent;
});
