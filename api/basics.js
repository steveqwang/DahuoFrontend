import request from '@/utils/request.js'

// 种草分类
export const getType = (data) => request({
	url: "zcao/classify",
	method: "GET",
	data 
});

// 种草列表
export const getList = (data) => request({
	url: "zcao/list",
	method: "GET",
	data 
});

// 种草详情
export const getDetsils = (data) => request({
	url: "zcao/info",
	method: "GET",
	data 
});

// 生成文案
export const setCreate = (data) => request({
	url: "zcao/gpt",
	method: "POST",
	data,
	errorMsgIs: false,
});

// 分享
export const setShare = (data) => request({
	url: "home/image/share",
	method: "POST",
	data 
});

// 获取商品列表
export const getGoods = (data) => request({
	url: "home/goods/list",
	method: "GET",
	data 
});



// 获取规则
export const getRule = (field) => request({
	url: "common/rule",
	method: "GET",
	data: {field}
});

// 获取配置
export const getConfig = (field) => request({
	url: "common/config",
	method: "GET",
	data: {field}
});

// 获取图片
export const getImage = (field) => request({
	url: "common/image",
	method: "GET",
	data: {field}
});

 
