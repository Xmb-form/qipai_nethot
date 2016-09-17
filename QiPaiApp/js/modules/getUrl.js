//进行跳转到用户的详细信息

//require('js/plug/vue.js');
//require('js/plug/sea.js');
//require('js/plug/vue.router.js');
//require('js/jquery.min.js');
//var test_value = 0;
function GoMore(UserID,UserName,UserHeader,seeCount,seePassword) {
	document.getElementById('body').setAttribute('data-seeID',UserID);//ID
	document.getElementById('body').setAttribute('data-seeName',UserName);//昵称
	document.getElementById('body').setAttribute('data-seeImg',UserHeader);//头像
	document.getElementById('body').setAttribute('data-seeCount',seeCount);//账户
	document.getElementById('body').setAttribute('data-seePass',seePassword);//密码
	
	tempthis.loadData();
}
//进行跳转到编辑页面的与IOS的交互
function UserAccount(UserAccount,PassWord){
	document.getElementById('body').setAttribute('data-UserAccount',UserAccount);//UserAccount
	document.getElementById('body').setAttribute('data-PassWord',PassWord);//密码
}

//打开摄像头
function OpenCamera(url){
		document.getElementById('body').setAttribute('data-uploadImg',url);
		document.getElementById('cameraUrl').setAttribute('src',url);
//		document.getElementById('uploadHeader').setAttribute('src',url);
}
function headerImg(url){
	document.getElementById('uploadHeader').setAttribute('src',url);
	
}

function uploadPhotos(url){
	document.getElementById('body').setAttribute('data-uploadPhotos',url);
	vtmp.add();
	
	
}

