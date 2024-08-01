<template>
	<view class="">
		<view class="bar_box" :class="{bgc:bgc || isScroll}" :style="{'--height':barHeight+'px','--padding-top': barTop+'px','--cachet-height':menuButtonInfo.height+'px','--cachet-width':menuButtonInfo.width +'px','--left':menuButtonInfo.screenWidth - menuButtonInfo.right + 'px','--cachet-radio': menuButtonInfo.height / 2 + 'px'}">
			<view class="cachet" @click="handleJump('back')">
				<view class="">
					<image src="../static/icon/left01.png" mode=""></image>
				</view>
				<view class="home" @click="handleJump('home')">
					<image src="../static/icon/home01.png" mode=""></image>
				</view>
			</view>
			<view class="title">
				{{title}}
			</view>
		</view>
		<view  :style="{'height': barHeight + barTop + 'px'}"></view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		props:{
			title:{
				type: String,
				default: ''
			},
			bgc: {
				type: [Boolean],
				default: true
			},
			isScroll:{
				type:Boolean,
				default: false,
			}
		},
		data(){
			return{
				barTop: 24,
				barHeight: 32,
				menuButtonInfo:{
					height: 32,
					width: 87
				},
			}
		},
		computed: {
			...mapGetters(['USER_INFO',"SYSTEMP_INFO"])
		},
		methods:{
			// 跳转
			handleJump(page){
				var pages = getCurrentPages();
				if(page == 'home' || pages && pages.length == 1){
					wx.switchTab({
					  url: '/pages/home/index'
					});
				}else{
					uni.navigateBack({
						delta:1,
					});
				}
			}
		},
		onReady(){
			this.barTop  = this.SYSTEMP_INFO.statusBarHeight;
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.menuButtonInfo.screenWidth =  this.SYSTEMP_INFO.screenWidth;
			this.barHeight = this.menuButtonInfo.height + (this.menuButtonInfo.top - this.barTop) * 2;
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.bar_box{
		--height: 32px;
		--padding-top: 24px;
		--cachet-height: 32px;
		--cachet-width: 87px;
		--left: 7px;
		--cachet-radio: 16px;
		position: fixed;
		top:0;
		left:0;
		padding-top: var(--padding-top);
		height: var(--height);
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.cachet{
			position: absolute;
			left: var(--left);
			height: var(--cachet-height);
			width: var(--cachet-width);
			border-radius: var(--cachet-radio);
			background: rgba(255,255,255,0.15);
			border: 1px solid #ecedee;
			box-sizing: border-box;
			display: flex;
			>view{
				flex:1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 32rpx;
					height: 32rpx;
				}
			}
			.home{
				position: relative;
				&::before{
					position: absolute;
					content:'';
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 1px;
					height: 18px;
					background: #ecedee;
				}
			}
		}
		.title{
			max-width: 300rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: $theme;
			@include ellispsis1();
		}
	}
	.bgc{
		background-color: #fff;
	}
</style>