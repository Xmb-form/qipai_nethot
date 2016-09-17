var tempthis;

define(function (require,exports,module) {

    var sTpl = require("templates/index.html");
    require('js/modules/getUrl.js');
    require('css/index.css');
    //swiper
	require('js/plug/swiper/swiper-3.3.1.min.css');
	require('js/plug/swiper/swiper-3.3.1.min.js');
	//jquery_weui
	require('js/plug/jquery_weui/weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min.css');
	require('js/plug/jquery_weui/jquery-weui.min.js');


    var VueComponent = Vue.extend({
        template: sTpl,
        data:function () {
            return {
                userID:""//用户ID
            	,userName:""//用户名
            	,userHeader:""//用户头像
            	,Level:""//级别
            	,IdentityTag:[]//身份标签
            	,Height:""//身高
            	,Household:""//居住地
            	,Weight:""//体重
            	,Bust:""//胸围
            	,Waistline:""//腰围
            	,Hips:""//臀围
                ,albums:[]//所有相册
                ,photos:[]//所有相片
                ,Introduction:""//个人简介
                ,Specialty:""//技能特长
                ,Honor:""//荣誉经历
                ,WorkExperience:""//工作经验
                ,newWorkExperience:[]//工作经验数组
                ,Thumbnail:""//视频缩略图地址
                ,VideoUrl:""//视频地址
            }
        },
		init:function(){
                var v =this;
                tempthis=this;
                v.$parent.$data.siteTitle = "个人信息";
        },
        created:function(){
        	 window.location.href = "js:call//GoMore";
        },
        methods:{
            splitArry:function(arr){
                    var v =this;
                    var newArr = arr.split(",");
                    v.IdentityTag=newArr;
            },
            getwh: function($obj){
                var tempImg = new Image();
                tempImg.src = $obj.attr("src");
                return {width:tempImg.width,height:tempImg.height};
            },
            getImg: function() {
                var v = tempthis;
                    $("#photos_list .swiper-wrapper .swiper-slide img").each(function(){
                       //console.log(getwh($(this)))
                        var oSize = v.getwh($(this));
                        var $li = $("#photos_list .swiper-wrapper .swiper-slide:first");
                        if(oSize.width / oSize.height > $li.width() / $li.height()){
                            $(this).css({height:$li.height() + "px"});
                        }else{
                            $(this).css({width:$li.width() + "px"});
                        }

                    });
            },

            GoBook:function(e){
            		var v = this;
            		v.$router.go('/book');

            },
            //返回
            GoUserList:function(){
                 window.location.href = "js:call//GoBack&http://192.168.0.233:8020/QiPaiApp/index.html#!/userList";
                //  this.$router.go('/userList');

            },
        	loadData:function(){
        		var v =tempthis;
        		
				v.userID=document.getElementById('body').getAttribute('data-seeID');
        		v.userHeader=document.getElementById('body').getAttribute('data-seeImg');//获取用户头像
        		v.userName=document.getElementById('body').getAttribute('data-seeName');//获取用户名
        		v.userCount=document.getElementById("body").getAttribute('data-seeCount');//获取账户
        		v.userPassWord=document.getElementById("body").getAttribute('data-seePass');//获取到的密码


        		//查询视频
        		$.ajax({
        			type:"POST",
        			url:gMain.basePath+"ws/query_video",
        			async:true,
        			data:JSON.stringify({
        				UserID:v.userID //获取缓存的id值
        			}),
        			success:function(e){
        				var res= JSON.parse(e);
        				console.info(res.Videos);
        				var videoNum=res.Videos;//一个数组
        				var videoSum=[];//定义一个空数组
        				if(videoNum.length==0){
        					$('#video_swiper div').html('暂无视频')
        				}else{
        					for(var i =0;i<videoNum.length;i++){

	        					var oHtml='<div class="swiper-slide">'+
												'<video src="'+videoNum[i].VideoUrl+'" autoplay poster="'+videoNum[i].Thumbnail+'">'+
												'</video>'+
											'</div>';

								videoSum.push(oHtml);
        					}
        					v.swiper_video_list().appendSlide(videoSum);
        				}



        			}

        		})
                //用户信息查询，身高，体重等
        		$.ajax({
        			type:"POST",
        			url:gMain.basePath+"ws/query_nruser_info",//查询用户接口
        			async:true,
        			data:JSON.stringify({
        				UserID:v.userID //获取缓存的id值
        			}),
        			beforeSend:function(){

        			},
        			complete:function(){
        			},
        			success:function(e){

        				var result=JSON.parse(e);
        				console.info(result);
        				v.Level=result.Level;//用户级别
        				v.IdentityTag= result.IdentityTag.split(',');//身份标签
                        // v.IdentityTag="test".split(',');

        				v.Household=result.Household;//居住地
        				v.Height=result.Height;//身高
        				v.Weight=result.Weight;//体重
        				v.Bust=result.Bust;//胸围
        				v.Waistline=result.Waistline;//腰围
        				v.Hips=result.Waistline;//臀围
                        v.Introduction=result.Introduction ;//个人简介
                        v.Specialty=result.Specialty;//技能特长
                        v.Honor=result.Honor;//荣誉经历
                        v.WorkExperience=result.WorkExperience;//工作经验
//                      console.info( v.WorkExperience);
                        v.newWorkExperience=v.WorkExperience.split('\n');
                        console.info(v.newWorkExperience);




        			}
        		});
                //所有相册标题
                $.ajax({
                    url:gMain.basePath+"ws/query_albums",
                    asyns:true,
                    type:"POST",
                    data:JSON.stringify({
                        "UserID":v.userID
                    }),
                    beforeSend:function(){

        			},
        			complete:function(){
        			},
                    success:function(e){
                        var album_result=JSON.parse(e);
                        console.info(album_result);

                        var photos_titles=[];//定义一个空数组装标题
                        for(var i =0;i<album_result.Albums.length;i++){

                                var AlbumsID= album_result.Albums[i].AlbumsID;//相册ID值
                                var photos_title=album_result.Albums[i].AlbumsName;
                                var oHtml='<div class="swiper-slide" data-AlbumsID="'+AlbumsID+'">'+photos_title+'</div>';
                                photos_titles.push(oHtml);
                        }
                        // v.albums=album_result.Albums;
                        v.swiper_photos_title().appendSlide(photos_titles);//插入swiper相册标题中去





                         //相片展示
						var AlbumFirst=album_result.Albums[0].AlbumsID;//第一个相册的ID
		                $.ajax({
		                    url:gMain.basePath+"ws/query_photo",
		                    asyns:true,
		                    type:"POST",
		                    data:JSON.stringify({
		                        "AlbumsID":AlbumFirst
		                    }),
		                    beforeSend:function(){

		        			},
		        			complete:function(){

		        			},
		                    success:function(e){
		                        var photos_result=JSON.parse(e);
		                        v.photos=photos_result.Photos;
		                        var allPhotos=[];//定义一个数组装相片
		                        for(var i =0;i<photos_result.Photos.length;i++){
		                            var ImgPath= photos_result.Photos[i].PhotoPath;//图片路径
		                            var oHtml='<div class="swiper-slide"><img src="'+ImgPath+'"/></div>';
		                            allPhotos.push(oHtml);
		                        }
		                        v.swiper_photos_list().appendSlide(allPhotos);//插入到swiper中

                                setTimeout(function(){
                                    v.getImg();
                                },300)

		                    }
		                });







                    }
                })






        	},
        	MorePhotos:function(){
        		var v=this;
        		//更多相册
        		v.$router.go('/album');

        	},
        	swiper_photos_title:function(){
                var v =this;
        		var swiperH1 = new Swiper('#photos_title_left', {
								slidesPerView: 3,
                                // slidesPerView: 'auto',//自动分组
                                // centeredSlides: true,
                                onTap:function(event){
                                    var changeID=event.clickedSlide.getAttribute('data-AlbumsID');
                                    $.ajax({
                                        url:gMain.basePath+"ws/query_photo",
                                        asyns:true,
                                        type:"POST",
                                        data:JSON.stringify({
                                            "AlbumsID":changeID
                                        }),
                                        success:function(e){
                                            var photos_result=JSON.parse(e);
                                            // console.info(photos_result);
                                            v.photos=photos_result.Photos;
                                            $('#swiper-wrapper-xiangce').empty();//让原来的内容清空
                                            var allPhotos=[];//定义一个数组装相片

                                            for(var i =0;i<photos_result.Photos.length;i++){
                                                var ImgPath= photos_result.Photos[i].PhotoPath;//图片路径
                                                var oHtml='<div class="swiper-slide"><img src="'+ImgPath+'"/></div>';
                                                allPhotos.push(oHtml);
                                            }
                                            v.swiper_photos_list().appendSlide(allPhotos);//插入到swiper中

                                            setTimeout(function(){
                                                v.getImg();
                                            },100);

                                        }
                                    });


                                }//事件结束

                });
                return swiperH1;
        	},
            //相片展示
        	swiper_photos_list:function(){
        		var swiperH2 = new Swiper('#photos_list', {
								slidesPerView: 2
								//spaceBetween: 5
				});

                return swiperH2;
        	},
        	//视频展示
        	swiper_video_list:function(){
        		var swiperH3 = new Swiper('#video_swiper', {
								slidesPerView: 2,
								spaceBetween: 5
				});

                return swiperH3;
        	},
        	onload_last:function(){
        		$('#iscroll_start').infinite(100);//启动加载
        		var loading = false;  //状态标记
				$('#iscroll_start').infinite().on("infinite", function() {
				  if(loading) return;
				  loading = true;
				  setTimeout(function() {
					$('#onload_index').html('没有更多内容了');
					$('#iscroll_start').destroyInfinite();//销毁
				    loading = false;
				    return;

                }, 1000);   //模拟延迟
				});
        	}

        },

       // 在 vm.$el 插入 DOM 时调用。
        attached:function () {
            var v = this;



            	//v.loadData();


            // v.swiper_photos_list();//相册展示
			v.onload_last();//刷新更多
        }
    });

    module.exports = VueComponent;
});
