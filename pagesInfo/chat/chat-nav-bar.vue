<template>
	<view >
		<view  class="bg-light fixed-top">
			<view :style="'height:'+statusBarHeight+'px'"></view>
			<view class="nav_box" style="height: 90rpx;">
				<!-- 左边 -->
				<view class="" @click="onBack()">
					<n-icon name="back" size="38" color="#000"></n-icon>
				</view>
				<view v-if="title" class="nav_text">{{getTitle}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			showBack:{
				type:Boolean,
				default:false
			},
			title: {
				type: [String,Boolean],
				default:false 
			},
			bgColor:{
				type:String,
				default:"bg-light"
			}
		},
		data() {
			return {
				statusBarHeight:0,
			}
		},
		mounted() {
			this.statusBarHeight = this.$store.state.statusBarHeight
			// #ifdef APP-PLUS-NVUE
			this.statusBarHeight = plus.navigator.getStatusbarHeight()
			// #endif
		},
		computed: {
			getTitle(){
				let noreadnum = this.noreadnum > 0 ? '('+this.noreadnum+')' : ''
				return this.title + noreadnum
			}
		},
		created(){
		},
		methods: {
			openExtend() {
				this.$refs.extend.show(uni.upx2px(415),uni.upx2px(150))
			},
			// 返回
			onBack(){
				return uni.navigateBack({
					delta: 1
				});
			},
			
		},
	}
</script>

<style  lang="scss" scoped>
	.bg-light{
		background-color: #f8f9fa;
	}
	.fixed-top {
	  position: fixed;
	  top: 0;
	  right: 0;
	  left: 0;
	  z-index: 1030;
	}
	.nav_box{
		width: 750rpx;
		/* #ifndef APP-PLUS-NVUE */
		display:flex;
		/* #endif */
		flex-direction:row;
		align-items: center;
		justify-content: justify-between;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.nav_text{
		width: calc(100% - 60rpx);
		/*  #ifndef  APP-PLUS  */
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		word-break: break-all;
		/*  #endif  */
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 700;
		color: #121212;
		/*  #ifdef  APP-PLUS  */
		lines: 1;
		text-overflow: ellipsis;
		/*  #endif  */
	}
	
</style>
