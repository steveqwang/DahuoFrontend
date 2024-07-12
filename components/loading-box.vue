
<template>
	<view class="loading-box" :class="type">
		<image src="../static/img/fire02.png" mode="aspectFit"></image>
		<text>{{text}}</text>
		<view class="progress" :style="{'--width': progress * 100 + '%'}"></view>
	</view>
</template>

<script>
export default{
	props:{
		type:{
			type: String,
			default: ''
		},
		text:{
			type: String,
			default: '搭火'
		},
		progress: {
			type: String,
			default: '0.3'
		}
	},
	data(){
		return{
			
		}
	},
	methods:{
		
	},
}
</script>

<style lang="scss" scoped>
	.loading-box{
		padding: 200rpx 40rpx;
		width: 100%;
		box-sizing: border-box;
		color: $theme;
		font-family: PingFangSC-Medium;
		color: $theme;
		font-size: 30rpx;
		line-height: 42rpx;
		text-align: center;
		display: flex;	
		flex-direction: column;
		align-items: center;
		image{
			width: 160rpx;
			height: 160rpx;
			// animation: rotate 1s infinite;
			margin-bottom: 26rpx;
		}
		.progress {
			margin-top: 88rpx;
			width: 404rpx;
			height: 8rpx;
			background: rgba(249,71,92,0.1);
			border-radius: 4rpx;
			--width: 30%;
			position: relative;
			&::after {
				
				position: absolute;
				left: 0;
				top: 0;
				content: '';
				width: var(--width);
				height: 8rpx;
				background: $theme;
				border-radius: 4rpx;
			}
		}
	}
	@keyframes rotate{
	  0%{transform:rotate(0);}
	  100%{transform:rotate(360deg)}
	}
	.pFixed{
		position: fixed;
		padding: 24rpx;
		box-sizing: border-box;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.pAbsolute{
		position: absolute;
		padding: 24rpx;
		box-sizing: border-box;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
</style>
