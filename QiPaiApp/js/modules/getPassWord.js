define(function(require, exports, module) {

	var getPassWord;
	getPassWord = function(userCount,passWord) {
		alert('我要开始弹了哦' + userCount + passWord);
		document.getElementById('body').setAttribute('data-role', userCount); //账号
		document.getElementById('body').setAttribute('data-icon', passWord); //密码
		
		setTimeout(function() {
			var userCount = document.getElementById("body").getAttribute('data-role');
			var passWord = document.getElementById("body").getAttribute('data-icon');
			alert('第2次' + userCount + passWord);
		}, 100)
	}

	module.exports = getPassWord;
});