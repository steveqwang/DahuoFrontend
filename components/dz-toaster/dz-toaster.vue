<template>
	<view class="toaster" v-if="show" @click="close">
		<view class="t-content">
			<view class="icon">
				<image src="../../static/image/tips.png" mode=""></image>
			</view>
			<text>{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "dz-toaster",
		props: ['show','title'],
		data() {
			return {

			};
		},
		methods:{
			close(){
				this.show=false
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	.toaster {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 98;
		display: flex;
		align-items: center;
		justify-content: center;

		.t-content {
			width: 660rpx;
			height: 112rpx;
			border-radius: 67rpx;
			background: #fff;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			
			text{
				font-family: Microsoft YaHei UI;
				font-size: 24Rpx;
				font-weight: 400;
			}
			
			.icon{
				width: 80rpx;
				height: 80rpx;
				position: absolute;
				left: 20rpx;
				top: 50%;
				transform: translateY(-50%);
			}
			
			
			.icon image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>