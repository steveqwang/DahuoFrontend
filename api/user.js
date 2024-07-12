import request from '@/utils/request.js'

// 登录获取TOKEN
export const setLogin = (data) => request({
	url: "user/miniLogin",
	method: "POST",
	data,
	errorMsgIs: false
});

// 绑定手机号
export const setBindPhone = (data) => request({
	url: "user/bindPhone",
	method: "POST",
	data 
});

// 获取用户信息
export const getUser = (data) => request({
	url: "user/userInfo",
	method: "GET",
	data 
});

//  修改用户信息
export const setUser = (data) => request({
	url: "user/update",
	method: "POST",
	data 
});

// 支付
export const setPay = (data) => request({
	url: "order/create",
	method: "POST",
	data 
});

// 签到
export const setSignIn = (data) => request({
	url: "setting/signIn",
	method: "POST",
	data 
});

// 退出登陆
export const setLogout = (data) => request({
	url: "user/logout",
	method: "POST",
	data 
});











