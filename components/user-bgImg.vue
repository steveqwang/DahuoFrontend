<template>
	<view class="user-bgImg">
		<u-popup v-model="visible" mode='center' width="100%" height="100vh" :maskCloseAble="false" :mask="true">
			<view class="info" @click="handleCancel()">
				<view v-if="type == 'img'" class="img">
					<image :src="USER_INFO.img" mode="aspectFill" v-if="USER_INFO.img"></image>
					<view class="" v-else></view>
				</view>
				<view v-else class="avatar">
					<image :src="USER_INFO.avatar" mode="aspectFill" v-if="USER_INFO.avatar"></image>
					<image src="@/static/img/avatar01.png" mode="aspectFill" v-else></image>
				</view>
				<button @click.stop="handleImgUpload()" :loading="loading">更换{{type == 'avatar' ? '头像': '背景图'}}</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uPopup from '@/components/u-popup.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		props: {
		},
		components: {
			uPopup
		},
		name: "user-bgImg",
		data() {
			return {
				visible: false,
				loading: false,
				type: 'img', // img背景图 、avatar 头像
			};
		},
		computed: {
			...mapGetters(['SYSTEMP_INFO', 'USER_INFO'])
		},
		methods: {
			init(type) {
				if(type) this.type = type;
				wx.hideTabBar();
				this.visible = true;
			},
			handleCancel() {
				wx.showTabBar()
				this.loading = false;
				this.visible = false;
			},
			// 图片 - 上传
			handleImgUpload(index) {
				
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.loading = true;
						if(this.type == 'avatar'){
							this.$set(this.USER_INFO, 'avatar', res.tempFilePaths[0])
						}else {
							this.$set(this.USER_INFO, 'img', res.tempFilePaths[0])
						}
						setTimeout(()=>{
							this.$emit('change', this.type)
							this.handleCancel()
						},2000)
						// this.$upload(res.tempFilePaths[0]).then(result => {
						// 		if (result.code == 0) {
						// 			// 更改用户信息
						// 			this.handleCancel()
						// 		}
						// 	}

						// }
					}
				});
			},

		},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
	.info {
		width: 100%;
		height: 100vh;
		background: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		position: relative;
		.img {
			width: 750rpx;
			height: 750rpx;
			image {
				width: 750rpx;
				height: 750rpx;
			}
			view {
				width: 750rpx;
				height: 750rpx;
				background-image: url($base64-image-bg02);
				box-sizing: border-box;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
		}
		.avatar {
			width: 400rpx;
			height: 400rpx;
			image {
				width: 400rpx;
				height: 400rpx;
				border-radius: 50%;
			}
		}

		button {
			margin: 0;
			position: absolute;
			left: 50%;
			bottom: 60rpx;
			transform: translateX(-50%);
			width: 422rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #181818;
			border-radius: 40rpx;
			font-size: 26rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
		}
	}
</style>