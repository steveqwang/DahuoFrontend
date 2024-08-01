<template>
	<view class="page">
		<template v-if="loading">
			<loadingBox  type="pFixed"/>
		</template>
		<template v-else>
			<view class="title" v-if="info.title">
				{{info.title}}
			</view>
			<view class="time" v-if="info.created_at">
				{{info.created_at}}
			</view>
			<parse :html="info.content" class="content" />
		</template>
		
	</view>
</template>

<script>
	import * as api from '@/api/basics.js'
	import { loadingBox } from '@/components/loading-box.vue';
	import parse from '@/components/u-parse/u-parse.vue';
	import { parseTime } from '@/utils/global.js'
	export default {
		name: "fileDetails",
		title:"详情",
		components: { parse, loadingBox },
		data(){
			return {
				loading: false,
				type: "swiper",
				id: null,
				info:{}
			}
		},
		methods:{
			async getInfo(){
				this.loading = true;
				this.info.content = '1这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容';
				// var res = await api.getRule(this.id);
				// if(res.code == 0){
				// 	this.info.content = res.data;
				// }
				this.loading = false;
			},
		},
		onLoad(options){
			// this.id = options.id;
			// this.type = options.type; //agreement
			if(options.title) wx.setNavigationBarTitle({
			  title: options.title
			})
			this.getInfo();
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background-color: #fff;
		padding: 24rpx 30rpx;
		width: 100%;
		box-sizing: border-box;
		.title {
			line-height: 46rpx;
			color: #000000;
			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			margin-bottom: 24rpx;
		}
		.time {
			font-size: 26rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;
			line-height: 36rpx;
			padding-bottom: 24rpx;
			border-bottom: 2rpx solid #f6f7f8;
			margin-bottom: 24rpx;
		}
		.content {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #000000;
			line-height: 46rpx;
			word-break: break-all;
			height: auto;
			overflow: hidden;
		}
	}
</style>