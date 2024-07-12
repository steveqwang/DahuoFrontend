<template>
	<view class="comment">
		<u-popup v-model="visible" mode='center' width="94%" height="60%" borderRadius="30" :maskCloseAble="false" :mask="true">
			<view class="comment-box">
				<view class="title">{{title}}</view>
				<textarea placeholder-class="placeholder" v-model="content" :placeholder="`请输入${title}内容`"/>
				<view class="btn-box">
					<button @click="handleSave()">发布{{title}}</button>
					<button @click="handleCancel()">取消</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
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
				type: null,
				title: '',
				content: '',
				visible: false,
				loading: false,
			}
		},
		methods: {
			// 取消
			handleCancel() {
				this.visible = false;
			},
			// 发布
			async handleSave (row) {
				try{
					// let res = await ({...this.params, this.content,})
					// if(res.code == 0){
						this.visible = false;
						this.$emit('change', this.params);
					// }else {
					// 	uni.showToast({
					// 		title:res.msg,
					// 		icon:'none'
					// 	})
					// }
					
				}catch {
					this.loading  = false;
				}
				
				
			},
			// 初始化
			init(params) {
				this.title = params.type == 'question' ? '回复' : '提问';
				this.content = '';
				this.params = params;
				this.visible = true;
			}
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.comment-box {
		width: 100%;
		height: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #ffffff;
		.title { 
			padding: 6rpx 0 30rpx 0;
			width: 100%;
			line-height: 48rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Medium;
			text-align: center;
			color: #333333;
		}
		textarea {
			width: 100%;
			flex: 1;
			background: #f8f8f8;
			border-radius: 30rpx;
			font-size: 28rpx;
			line-height: 40rpx;
			padding: 30rpx;
			box-sizing: border-box;
		}
		.btn-box {
			margin-top: 30rpx;
			
			font-family: PingFang HK, PingFang HK-Medium;
			>button:nth-child(1) {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				background: linear-gradient(90deg,#fc2b74, #fc5a3f);
				border-radius: 30rpx;
				box-shadow: 4rpx 6rpx 16rpx 0px rgba(249,71,92,0.26); 
				font-weight: 500;
				font-size: 30rpx;
				color: #ffffff;
			}
			>button:nth-child(2){
				border-radius: 30rpx;
				font-size: 30rpx;
				margin-top: 10rpx;
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				color: #333333;
				background-color: #fff;
			}
			
		}
	}
</style>
