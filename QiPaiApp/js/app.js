define(function (require,exports,module) {

    // 路由器需要一个根组件。
    var App = Vue.extend({
        data:function(){
            return {
                siteTitle:"首页"
                ,seeID :""//用户的ID值
                ,userName:""//用户的名称
                ,userListId:""//点击社区用户的id
                ,userListHeader:""//社区用户的头像
                ,userName:""//社区用户名
                ,clickAlbumID:""//点击的相册的ID值
                
                //修改后的信息储存
                ,edit_Height:""//修改后的身高
                ,edit_Weight:""//修改后的体重
                ,edit_Bust:""//修改后的胸围
                ,edit_Waistline:""//修改后的腰围
                ,edit_Hips:""//修改后的臀围
                ,edit_city:""//修改后的城市
                ,tagAll:""//修改后的标签
                ,clickPhotoPath:""//点击的相片的路径
                
                //订单：
//              ,bookId:
            }
        },
        
        methods:{}
        	
        	
        
    });

    // 创建一个路由器实例
    var router = new VueRouter();

    // 定义路由规则
    router.map({
       //首页
        '/': {
            component: function (resolve) {
                require.async(['js/modules/index.js'],resolve);
            }
        },
        //编辑页面
        '/editor':{
        	component: function (resolve) {
                require.async(['js/modules/editor.js'],resolve);
            }
        },
        //相册浏览页面
        '/photos':{
        	component: function (resolve) {
                require.async(['js/modules/photos.js'],resolve);
            }
        },
        //相片编辑页面
        '/photos_editor':{
        	component: function (resolve) {
                require.async(['js/modules/photos_editor.js'],resolve);
            }
        },
         //相片编辑页面
        '/photos_editor_show':{
        	component: function (resolve) {
                require.async(['js/modules/photos_editor_show.js'],resolve);
            }
        },
        //所有相册
        '/album':{
        	component: function (resolve) {
                require.async(['js/modules/album.js'],resolve);
            }
        },
        //相册编辑
        '/album_editor':{
        	component: function (resolve) {
                require.async(['js/modules/album_editor.js'],resolve);
            }
        },
        //基本信息
        '/information':{
        	component: function (resolve) {
                require.async(['js/modules/information.js'],resolve);
            }
        },
        //认证页面
        '/certification':{
        	component: function (resolve) {
                require.async(['js/modules/certification.js'],resolve);
            }
        },
        //我的认证页面
        '/myCertification':{
        	component: function (resolve) {
                require.async(['js/modules/myCertification.js'],resolve);
            }
        },
        //用户列表
        '/userList':{
        	component: function (resolve) {
                require.async(['js/modules/userList.js'],resolve);
            }
        },
        //我的人才库
        '/talent':{
        	component: function (resolve) {
                require.async(['js/modules/talent.js'],resolve);
            }
        },
        //订单页
        '/book':{
        	component: function (resolve) {
                require.async(['js/modules/book.js'],resolve);
            }
        }
    });

    // 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
    router.start(App, 'html');

});