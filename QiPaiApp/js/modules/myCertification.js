// 定义组件
define(function (require,exports,module) {
    var sTpl = require("templates/myCertification.html");
    require('css/myCertification.css');
    //jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min2.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');
	require('js/modules/getUrl.js');
	
    var VueComponent = Vue.extend({
        template: sTpl,
        data:function () {
            return {
            	oSex:""//性别，
            	,Company:""//公司
            	,Identity:""//身份证号
            	,Telephone:""//手机号码
            	,ImgSrc:""//图片路径
            	,oTapChange:""//同意状态   0表示同意 ，1表示不同意
            	,cameraUrl:""//图像路径
            	,RealName:""//真实姓名
            }
        },
        methods:{
        	loadData:function(){
        		var  v = this;
        		$.ajax({
        			type:"POST",
        			url:gMain.basePath+"ws/query_realinfo",
        			async:true,
        			data:JSON.stringify({
//      				"UserAccount":'18888888888',
//      				"UserPassword":'Bide2U82kZu1sd'
						"UserAccount":document.getElementById("body").getAttribute('data-UserAccount'),//账户
        				"UserPassword":document.getElementById("body").getAttribute('data-PassWord')//密码
        			}),
        			success:function(e){
        				var res=JSON.parse(e);
        				v.Company=res.Company;//公司
        				v.Identity=res.Identity;//身份证
        				v.RealName=res.RealName;//真名
        				
        				if(res.UserSex==1){
        					v.oSex='女';//性别
        				}else{
        					v.oSex='男';//性别
        				}
        				v.ImgSrc=res.IdentityImage;//认证照片
        				v.Telephone=res.Telephone;//手机号码
        			}
        		});
        		
        		
        		
        		
        	},
        	
        	//关闭协议
        	close_agreement:function(){
        		$.closePopup();
        	},
        	//打开摄像头
        	OpenCamera:function(){
        		window.location.href="js:call//OpenCamera";
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
        	GoNext:function(){},
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
            v.$parent.$data.siteTitle = "我的实名认证"
       },
       created:function(){
       		window.location.href="js:call//UserAccount";
       },
       // 在 vm.$el 插入 DOM 时调用。
        attached:function () {
            var v = this;
            setTimeout(function(){
				v.loadData();
			},0);
           
        }
    });

    module.exports = VueComponent;
});
