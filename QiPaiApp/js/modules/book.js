 // 定义组件
define(function(require, exports, module) {
	var sTpl = require("templates/book.html");
	require('css/book.css');
	//swiper
	require('js/plug/swiper/swiper-3.3.1.min.css');
	require('js/plug/swiper/swiper-3.3.1.min.js');
	//jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min2.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');

	//全局变量
	var VueComponent = Vue.extend({
		template: sTpl,
		data: function() {
			return {
				userID: "",//用户ID
				userName: "",//用户名
				userHeader: "",//用户头像
				Level: "",//级别
				IdentityTag: [],//身份标签
				Height: "",//身高
				Household: "",//居住地
				Weight: "",//体重
				Bust: "",//胸围
				Waistline: "",//腰围
				Hips: "",//臀围
				Lastprices: "",//直播单价
				start_time:"",//开始时间
				end_time:"",//结束时间
				start_year:"",//开始年
				end_year:"",//结束年
				totalHours: "",//直播的总时间
				totalMoney: "",//直播的总价钱计算

				beginstamp:"",//开始时间戳
				endstamp:""//结束时间戳
			};
		},
		methods:{
			GoIndex:function(){
				var v = this;
				v.$router.go('/');
			},
			//选择开始时间
			choose_beginTime:function(){
	      		var v = this;
			    $("#begintime").datetimePicker({
			    	title: "请选择结束时间:年-月-日-时",
			        times: function () {
			          return [
			            {
			              values: (function () {
			                var hours = [];
			                for (var i=0; i<24; i++) hours.push(i > 9 ? i : '0'+i);
			                return hours;
			              })()
			            },
			            {
			              divider: true,  // 这是一个分隔符
			              content: '时'
			            }
			          ];
			        },
			        onChange: function (picker, values, displayValues) {
			        	//change时的回调函数
				    },
				    onClose:function(){

				    }


			    });
			},
			//选择结束时间
			choose_endTime:function(){
				var v = this;
			    $("#datetime-end").datetimePicker({
			    	title: "请选择结束时间:年-月-日-时",
			        times: function () {
			          return [
			            {
			              values: (function () {
			                var hours = [];
			                for (var i=0; i<24; i++) hours.push(i > 9 ? i : '0'+i);
			                return hours;
			              })()
			            },
			            {
			              divider: true,  // 这是一个分隔符
			              content: '时'
			            }
			          ];
			        },
			        onClose: function(){


				    	var begintime = v.split('#begintime');//提交的开始时间
						var endtime = v.split('#datetime-end');//提交的结束时间
						// console.log(begintime);
						// console.log(endtime);
						var starttime = begintime.replace(new RegExp("-","gm"),"/");
   						v.beginstamp = (new Date(starttime)).getTime();//提交的开始时间戳
						var lasttime = endtime.replace(new RegExp("-","gm"),"/");
   						v.endstamp = (new Date(lasttime)).getTime();//提交的结束时间戳

						// console.log(v.beginstamp);
						// console.log(v.endstamp);

						if(v.beginstamp > v.endstamp){
							$.toast("开始时间不应大于结束时间", "cancel");
						}else{
							var showHours = parseInt(v.endstamp) - parseInt(v.beginstamp);//直播的总时间
							v.totalHours = showHours/3600/1000;
							console.info(v.endstamp);
							console.log(v.totalHours);
							v.totalMoney = v.Lastprices * v.totalHours;
						}
				    },
			    });
			},
			choose_player:function(e){
				if(e.target.getAttribute('class')=="border_box"){
					e.target.setAttribute('class','border_box active');
				}else{
					e.target.setAttribute('class','border_box');
				}

			},
			//返回
        	GoUserList:function(){

            	 this.$router.go("");
        	},
        	select_yes:function(e){
    			target=e.target;
    			target.parentNode.getElementsByTagName('i')[1].setAttribute('class','weui_icon_circle');
    			target.setAttribute('class','weui_icon_success_circle');
    			document.getElementById('address').removeAttribute('disabled','disabled');
    			$('#address').attr('placeholder','请输入指定的地址');
        	},
        	select_no:function(e){
    			target=e.target;
    			document.getElementById('address').setAttribute('disabled','disabled');
    			target.parentNode.getElementsByTagName('i')[0].setAttribute('class','weui_icon_circle');
    			target.setAttribute('class','weui_icon_success_circle');
    			$('#address').attr('placeholder','');
        	},
        	splitArry: function(arr) {
        		var v = this;
        		var newArr = arr.split(",");
        		v.IdentityTag = newArr;
        	},
        	loadData: function() {
        		var v = this;
        		v.userID = document.getElementById("body").getAttribute("data-seeID");//获取用户ID
        		v.userHeader = document.getElementById('body').getAttribute('data-seeImg');//获取用户头像
        		v.userName = document.getElementById('body').getAttribute('data-seeName');//获取用户名


        		v.userAccount = document.getElementById('body').getAttribute('data-seeCount');//获取用户账户名
        		v.userPassword = document.getElementById('body').getAttribute('data-seePass');//获取用户密码
        		//用户信息查询、身高、体重等
        		$.ajax({
        			type: "post",
        			url: gMain.basePath+"ws/query_nruser_info",//查询用户接口
        			async: true,
        			data: JSON.stringify({
        				UserID: v.userID//获取缓存的id值
        			}),
        			beforeSend: function() {

        			},
        			success: function(data) {
        				var result = JSON.parse(data);
        				v.Level = result.Level;//用户级别
        				v.LevelCode = result.LevelCode;//级别代码
        				v.IdentityTag= result.IdentityTag.split(',');//身份标签
                        // v.IdentityTag="test".split(',');

        				v.Household=result.Household;//居住地
        				v.Height=result.Height;//身高
        				v.Weight=result.Weight;//体重
        				v.Bust=result.Bust;//胸围
        				v.Waistline=result.Waistline;//腰围
        				v.Hips=result.Waistline;//臀围


        				$.ajax({
		        			url: gMain.basePath+"ws/query_nrprice",
		        			async: true,
		        			type: 'POST',
		        			data: JSON.stringify({
		        				"Level": v.Level,
		        				"LevelCode": v.LevelCode
		        			}),
		        			success: function(data) {
	        					var price = JSON.parse(data).Price;
	        					v.Lastprices = parseInt(price)*115/100;
		        			}
        				});



        			}


        		});




        		//网红订单平台单信息
        		$.ajax({
        			url: gMain.basePath+"ws/query_nrorder",
        			async: true,
        			type: "POST",
        			data: JSON.stringify({
        				"UserAccount": v.userAccount,
        				"UserPassword": v.userPassword
        			}),
        			beforeSend: function() {

        			},
        			success: function(data) {
        				var orderInfo = JSON.parse(data);
        				var PlatformNameArr = [];
        				var orderInfoArr = orderInfo.NROrders;
        				if(orderInfoArr.length==0){
        					return false;

        				}else{
        					for(var i=0; i<orderInfoArr.length; i++) {
	        					var PlatformName = orderInfoArr[i].PlatformName;
	        					var pHtml = '<div class="swiper-slide"><i class="weui_icon_circle"></i>'+PlatformName+'</div>';
	        					PlatformNameArr.push(pHtml);
        					};
//	        				v.swiper_platefrom_title().appendSlide(PlatformNameArr);

//	        				//初始化默认显示第一个平台的开始时间
//	        				var beginTime = orderInfoArr[0].BeginTime.split(' ');
//	        				$('#beginyear').html(beginTime[0]);
//	        				$('#begintime').html(beginTime[1]);
//
//	        				//初始化默认显示第一个平台的结束时间
//	        				var endTime = orderInfoArr[0].EndTime.split(' ');
//	        				$('#endyear').html(endTime[0]);
//	        				$('#endtime').html(endTime[1]);

        				}


        				// $('#plateformAll-swiper >div').on('click',function() {
        				// 	var index = $(this).index();
        				// 	//点击平台名称时，显示相应的开始时间
        				// 	var BeginTime = orderInfoArr[index].BeginTime;
        				// 	var begintime = BeginTime.split(' ');
        				// 	$('#beginyear').html(begintime[0]);
        				// 	$('#begintime').html(begintime[1]);

        				// 	//点击平台名称时，显示相应的结束时间
        				// 	var endtime = orderInfoArr[index].EndTime.split(' ');
        				// 	$('#endyear').html(endTime[0]);
        				// 	$('#endtime').html(endTime[1]);
        				// });
        			}
        		});
        	},
        	swiper_platefrom_title:function(){
	            var v =this;
	    		var swiperH = new Swiper('#plateform_title_left', {
					slidesPerView: 5,
					onTap:function(e){
						var tapPoint=e.clickedSlide.getElementsByTagName('i')[0].getAttribute ('class');
						if(tapPoint=='weui_icon_circle'){

							e.clickedSlide.getElementsByTagName('i')[0].setAttribute ('class','weui_icon_success_circle');
						}else{
							e.clickedSlide.getElementsByTagName('i')[0].setAttribute ('class','weui_icon_circle');
						}

					}

				});

	    		return swiperH;
	       },
	       split:function(obj){
	       		var v = this;
	       		var start_timer = $(obj).val();
	       		var Begin = start_timer.split(/\s/);
	       		var beginStr = Begin[1];
	       	    var dataday = beginStr.substring(0,2);
	       	    var dataday_begin = Begin[0]+" "+dataday+':00:00';
	       	    return dataday_begin;

	       },
	       //最终提交
	       besue_last:function(){
	       	var v = this;
	       		var start_timer = $('#begintime').val();//开始时间
	       		var end_timer = $('#datetime-end').val();//结束时间

	       		if(!start_timer){
	       			$.toast("请选择开始时间", "cancel");
					return;
	       		};
	       		if(!end_timer){
	       			$.toast("请选择结束时间", "cancel");
					return;
	       		};
	       		if(v.beginstamp > v.endstamp){
	       			$.toast("开始时间不应大于结束时间", "cancel");
	       			return;
	       		};
	       		var yearTem_shart=start_timer.split('-')[0];

	        	var yearTem_end=end_timer.split('-')[0];


	        	var monthTem_start=start_timer.split('-')[1];

	        	var myDate = new Date();
	        	var years=myDate.getFullYear();//获取现在年

	       		var beginTime = v.split('#begintime');//提交的开始时间
				var endTime = v.split('#datetime-end');//提交的结束时间

	        	var PlatformName=$('#playerId .active');

	        	var sum="";
	        	for(var i =0;i<PlatformName.length;i++){
	        		sum+=PlatformName[i].innerHTML+',';
	        	}

	        	sum=sum.substring(0,sum.length-1);

	        	if((parseInt(yearTem_shart) <= years)&&(parseInt(yearTem_end) <= years)){
	        		$.ajax({
		        		type:"post",
		        		url:gMain.basePath+"ws/add_nrorder",
		        		async:true,
		        		data:JSON.stringify({
		        			"UserAccount":v.userAccount,
		        			"UserPassword":v.userPassword,
		        			"NRUserID":v.userID,
		        			"PlatformName":sum,
		        			"BeginTime":beginTime,
		        			"EndTime":endTime,
		        			"Location":$('#address').val(),
		        			"Demo":$('#beizhu').val()

		        		}),
		        		success:function(e){
		        			var res=JSON.parse(e);
		        			if(res.result==0){
		        				$.toast("提交成功");
		        			}
		        		}
	        		});
	        	}else{
	        		$.toast("请正确填写时间", "cancel");
					return;
	        	}
	       	}
		},
		created:function(){
			var v=this;

		},
		init:function(){
			var v=this;
			v.$parent.$data.siteTitle = "网红订单";
		},
		// 在 vm.$el 插入 DOM 时调用。
		attached: function() {
			var v = this;
			v.loadData();
			v.choose_beginTime();
			v.choose_endTime();//结束时间
//			v.choose_player();

			var date1=new Date();
		}
	});

	module.exports = VueComponent;
});
