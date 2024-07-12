<template>
	<view class="empty" :class="type" :style="{'--padding-top': pTop,'--padding-bottom':pBottom}">
		<image src="@/static/img/empty01.png" mode="aspectFit"></image>
		<view class="text">{{text}}</view>
	</view>
</template>

<script>
	export default{
		props: {
			text:{
				type: String,
				default: '暂无数据'
			},
			type:{
				type: String,
				default: ''
			},
			pTop:{
				type: String,
				default: '108rpx'
			},
			pBottom:{
				type: String,
				default: '108rpx'
			}
			
		},
		data(){
			return{
				
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.empty{
		--padding-top: 108rpx;
		--padding-bottom: 108rpx;
		padding: var(--padding-top) 24rpx var(--padding-bottom);
		width: 100%;
		box-sizing: border-box;
		color: #4E5969;
		line-height: 34rpx;
		text-align: center;
		display: flex;	
		flex-direction: column;
		align-items: center;
		image{
			width: 274rpx;
			height: 274rpx;
			margin-bottom: 12rpx;
		}
	}
	.pFixed{
		position: fixed;
		padding: 24rpx;
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