import global from './global.js';
import store from '../store/index.js';
/*
	请求方法
	url '' 路径
	data {} 请求参数
	loadIs  是否有加载中的框
	errorMsgIs  是否提示错误信息
*/
const request = ({
	url = "",
	method = "GET",
	data = {},
	loadIs = false,
	errorMsgIs = true
} = {}) => {

	// 检查网络状况
	uni.getNetworkType({
		success: (res) => {
			if (res.networkType == "none") {
				toastMessage({
					message: '请检查网络连接！',
				});
				return;
			}
		}
	});
	
	// 加载动画
	if (loadIs) {
		// uni.showLoading({
		// 	title: "加载中...",
		// 	mask: true
		// })
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: global.baseUrl + url,
			data: {...data},
			method: method,
			header: {
				"content-type": "application/x-www-form-urlencoded",
				"Authorization": 'bearer' + store.state.TOKEN 
			},
			success: function(res) {
				// 关闭加载动画
				if (loadIs) {
					uni.hideLoading()
				}
				if ( res.statusCode == 401) {
					uni.showToast({
						title: res.data.msg || "请先登陆",
						icon: 'none',
					});
					setTimeout(()=>{
						// 解决重复跳入登录页面
						let isJump = true;
						var pages = getCurrentPages();
						if(pages && pages.length > 1 && pages[pages.length -1 ].route == 'pagesUser/login/index'){
							isJump = false;
						}
						if(isJump){
							uni.navigateTo({
								url:'/pagesUser/login/index'
							});
						}
						store.commit('SET_TOKEN',null);
					},1000)
				}else if(res.statusCode != 200){
					showError(res);
				}else if (res.data.code != 0  && errorMsgIs) { //&& res.data.code != 6 res.data.code != 6为了支付提示
					uni.showToast({
						title:   res.data.msg,
						icon: 'none',
					});
				}
				resolve(res.data);
			},
			fail: function(err) {
				// uni.hideLoading();
				uni.showToast({
					title: '请求超时，请稍后再试！',
					icon:'none'
				})
				reject()
			}
		});
	})
}


const showError = error => {
	let errorMsg = ''
	switch (error.statusCode) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 301:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = '请求地址不存在'
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = "请求失败"
			break
	}
	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 2000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 2000);
		}
	});
}



export default request
