<template>
	<view class="release-activity">
		<view class="info-box">
			<image src="../static/img/success01.png" mode="scaleToFill"></image>
			<view class="h2">您创建的活动已提交后台审核</view>
			<view class="h3">工作人员将在30分钟内审核成功～</view>
		</view>
		<view class="bottom-box">
			<button  @click="handleHome()">返回首页</button>
			<view class="bottom-occupy"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'success',
		title: '发布成功',
		components: {
		},
		filters: {},
		data() {
			return {
				
			}
		},
		computed: {},
		onLoad(params) {
		},
		methods: {
			handleHome(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.info-box {
		padding: 72rpx 0;
		width: 100%;
		min-height: 100vh;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		image {
			width: 476rpx;
			height: 476rpx;
			margin-bottom: 14rpx;
		}
		.h2{
			display: inline-block;
			line-height: 56rpx;
			font-size: 38rpx;
			font-family: PingFangSC-Medium;
			font-weight: normal;
			text-align: center;
			color: #333333;
		}
		.h3 {
			display: inline-block;
			margin-top: 22rpx;
			line-height: 34rpx;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
		}
	}
	.bottom-box {
		position: fixed;
		z-index: 1;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;

		>button {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background-color: #fff;
			color: #333333;
			border-radius: 30rpx;
			font-size: 30rpx;
		}

		>button:nth-child(1) {
			background: $uni-button-bg;
			color: #fff;
		}
		.bottom-occupy {
			height: calc(constant(safe-area-inset-bottom) / 2);
			height: calc(env(safe-area-inset-bottom) / 2);
			width: 100%;
		}
	}

	
</style>