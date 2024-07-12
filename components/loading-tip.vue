
<template>
	<view class="tip" v-if="visible">
		<image src="../static/icon/loading01.png" mode="aspectFit" v-if="status"></image>
		<text>{{status ? '加载中' :'没有更多了～'}}</text>
	</view>
</template>

<script>
export default{
	props:{
		status: {
			type:Boolean,
			default:false,
		},
		delay:{
			type: Number,
			default: 1000,
		}
	},
	data(){
		return{
			visible: false
		}
	},
	methods:{
		
	},
	mounted(){
		setTimeout(()=>{ this.visible = true},this.delay)
	},
}
</script>

<style lang="scss" scoped>
	.tip{
		padding: 40rpx 0;
		width: 100%;
		box-sizing: border-box;
		color:$uni-text-color-grey;
		line-height: 40rpx;
		text-align: center;
		display: flex;	
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		image{
			width: 24rpx;
			height: 24rpx;
			margin-right: 10rpx;
			animation: rotate 1s infinite;
		}
	}
	@keyframes rotate{
	  0%{transform:rotate(0);}
	  100%{transform:rotate(360deg)}
	}
</style>
