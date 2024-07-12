<template>
	<view class="cash-out">
		<view class="title">
			可提金额：¥{{info.price}}
		</view>
		<view class="info">
			<view class="input">
				<text>¥</text>
				<input type="digit"  @input="changeInput"	 v-model="value" placeholder="请输入提现金额" placeholder-class="placeholder"/>
			</view>
			<view class="title2">
				提现规则：
			</view>
			<view class="row">
				1.提现将有10%手续费，可选择通过app银行卡提现
			</view>
			<view class="row">
				2.提现申请后将有1～3个工作日的审核时间，节假日顺延
			</view>
		</view>
		<view class="bottom-box">
			<button :loading="loading" @click="handleSave()">立即提现</button>
			<view class="bottom-occupy"></view>
		</view>
	</view>
</template>

<script>
	import {
		parseTime
	} from '@/utils/global.js'
	export default {
		name: 'cashOut',
		title: '提现',
		components: {
		},
		data() {
			return {
				info: {},
				value: '',
				loading: false,
			}
		},
		onLoad(params) {
			this.info = params;
		},
		methods: {
			// 更改
			changeInput(e){
				if(Number(e.detail.value) > Number(this.info.price)) this.value = this.info.price;
			},
			// 提现
			handleSave(){
				if(!Number(this.value)) return uni.showToast({
					title: '请输入提现金额',
					icon: 'none'
				}) 
				this.loading = true;
				setTimeout(()=>{
					uni.redirectTo({
						url: '/pagesUser/income/success'
					})
					this.loading = false;
				},1000)
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.cash-out {
		width: 100%;
		padding: 48rpx 24rpx;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100vh;
		.title {
			line-height: 42rpx;
			font-size: 30rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			font-weight: 500;
			color: #1d2129;
			padding-bottom: 24rpx;
			border-bottom: 24rpx solid #f6f7f8;
		}
		.info {
			padding-top: 24rpx;
			.input {
				display: flex;
				align-items: center;
				padding-bottom: 22rpx;
				border-bottom: 2rpx solid #f2f2f2;
				text {
					line-height: 84rpx;
					font-size: 60rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #1d2129;
				}
				input {
					height: 84rpx;
					margin-left: 24rpx;
					flex: 1;
					line-height:42px;
					font-size: 30rpx;
					color: #1d2129;
				}
				.placeholder {
					line-height: 42px;
					font-size: 30rpx;
					text-align: left;
					color: #86909b;
				}
			}
			.title2 {
				margin-top: 20rpx;
				line-height: 42px;
				font-size: 30rpx;
			}
			.row {
				margin-top: 16rpx;
				line-height: 40rpx;
				font-size: 26rpx;
				color: #4e5968;
			}
		}
	}
	.bottom-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0px 0px 12px 0px rgba(238, 239, 241, 0.50);
		button {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: $uni-button-bg;
			border-radius: 30rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #ffffff;
		}
		.bottom-occupy {
			height: calc(constant(safe-area-inset-bottom) / 2);
			height: calc(env(safe-area-inset-bottom) / 2);
			width: 100%;
		}
	}
	
</style>