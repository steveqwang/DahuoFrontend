<template>
	<view class="" >
		<!-- cirleBottom -->
		<view class="wx_cirle_style"  
			 @click.stop="onAdd()"
			:style="{bottom:`${cirleBottom}px`,right: `${cirleRight}px`}" open-type="contact" 
		     @touchend.stop="onTouchend"
			 @touchmove.stop='onTouchmove'>
			<image src="@/static/icon/add01.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name:"contact",
		props:{
			bottom:{
				type: [String, Number],
				default: '16'
			},
			top:{
				type: [String, Number],
				default: '120'
			}
		},
		data(){
			return{
				windowWidth:0,
				windowHeight:0,
				cirleRight: '22',
				cirleBottom:'16',
				buttonWidth: '54',
				buttonHeight:0,
				leftP: '22',
			}
		},
		computed:{
			...mapGetters(["SYSTEMP_INFO"]),
		},
		methods:{
			onAdd(){
				uni.navigateTo({
					url: '/pagesActivity/releaseActivity/index'
				})
			},
			onTouchmove(e){
				this.cirleRight =  e.changedTouches[0].clientX < this.leftP ? this.SYSTEMP_INFO.windowWidth - this.leftP - this.buttonWidth :  
					e.changedTouches[0].clientX > this.SYSTEMP_INFO.windowWidth - this.leftP ? this.leftP :  this.SYSTEMP_INFO.windowWidth - e.changedTouches[0].clientX;
				this.cirleBottom = 
					this.SYSTEMP_INFO.windowHeight - e.changedTouches[0].clientY  < this.bottom ?  this.bottom  : 
					( e.changedTouches[0].clientY < this.top  ?  this.SYSTEMP_INFO.windowHeight - this.top  :  
					this.SYSTEMP_INFO.windowHeight - e.changedTouches[0].clientY);
			},
			onTouchend(e){
				 this.cirleRight = this.cirleRight <= this.SYSTEMP_INFO.windowWidth / 2 ?  this.leftP : this.SYSTEMP_INFO.windowWidth - this.leftP - this.buttonWidth;
			},
			
		},
		created(){
			this.leftP = 375 / this.SYSTEMP_INFO.windowWidth * 16;
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss" scoped>
.wx_cirle_style {
	position: fixed;
	z-index: 99;
	/* right: 30rpx; */
	bottom: 50px;
	width: 108rpx;
	height: 108rpx;
	border-radius: 50%;
	overflow: hidden;
	padding: 0;
	-webkit-overflow-scrolling: touch;
}
.wx_cirle_style image{
	width: 100%;
	height: 100%;
}
</style>
