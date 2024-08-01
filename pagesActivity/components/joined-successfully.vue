<template>
	<view class="joined-successfully">
		<u-popup v-model="visible" mode='center' width="94%" borderRadius="30" :maskCloseAble="true" :mask="true" @close="handleCancel('close')">
			<view class="joined-successfully-box">
				<image src="../static/img/join01.png" mode="scaleToFill"></image>
				<image src="../static/img/join02.png" mode="scaleToFill"></image>
				<view class="">已成功报名该活动</view>
				<view class="btn">
					<button open-type="share">分享</button>
					<button @click="handleCancel('groupChat')">进入群聊</button>
				</view>
			</view>
		</u-popup>
		
		
	</view>
</template>

<script>
	import * as api from '@/api/basics.js'
	import uPopup from '@/components/u-popup.vue';
	export default {
		props:{
		},
		components: {
			uPopup
		},
		data() {
			return {
				params: {},
				visible: false,
				loading: false,
			}
		},
		methods: {
			// 取消
			handleCancel(type) {
				this.$emit('change', type);
				this.visible = false;
			},
			// 初始化
			init(params) {
				this.params = params;
				this.visible = true;
			}
		},
		onReady() {
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.joined-successfully-box {
		width: 100%;
		height: 100%;
		padding: 68rpx 30rpx 50rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #ffffff;
		image:nth-child(1) {
			width: 660rpx;
			height: 252rpx;
		}
		image:nth-child(2) {
			margin-top: 64rpx;
			width: 298rpx;
			height: 60rpx;
		}
		view {
			margin-top: 24rpx;
			line-height: 40rpx;
			font-size: 28rpx;
		}
		.btn {
			width: 100%;
			margin-top: 84rpx;
			display: flex;
			justify-content: space-between;
			button {
				width: 300rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				border: 2rpx solid $theme;
				border-radius: 30rpx;
				color: $theme;
				font-size: 30rpx;
				background-color: #fff;
				box-sizing: border-box;
				&:last-child {
					background-color: $theme;
					color: #fff;
				}
			}
		}
		
	}
	
	
</style>
