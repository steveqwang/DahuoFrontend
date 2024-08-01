<template>
	<view>
		<u-popup v-model="show" mode='bottom' width="100%" height="auto" :maskCloseAble="true" :mask="true" @close="close">
			<view class="popup-content">
				<view class="line">
		
				</view>
				<view class="input-box">
					<input type="text" placeholder-class="placeholder" placeholder="粘贴站外社交媒体链接，在超级名片中添加该平台账号" />
				</view>
		
				<view class="btn-box">
					<view class="btn" @click="submit">
						<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7.40691 9.88143C8.39828 8.89006 10.1273 8.89006 11.1187 9.88143L11.7373 10.5001L12.9745 9.26281L12.3559 8.64418C11.5308 7.81818 10.4318 7.3623 9.26279 7.3623C8.09379 7.3623 6.99479 7.81818 6.16966 8.64418L4.31291 10.5001C3.49417 11.3214 3.03442 12.4339 3.03442 13.5936C3.03442 14.7534 3.49417 15.8658 4.31291 16.6872C4.7188 17.0936 5.20101 17.4159 5.73183 17.6354C6.26264 17.855 6.83161 17.9675 7.40603 17.9664C7.98061 17.9676 8.54976 17.8552 9.08074 17.6357C9.61173 17.4161 10.0941 17.0938 10.5 16.6872L11.1187 16.0686L9.88141 14.8313L9.26279 15.4499C8.7697 15.9408 8.10225 16.2164 7.40647 16.2164C6.7107 16.2164 6.04325 15.9408 5.55016 15.4499C5.05885 14.9571 4.78297 14.2895 4.78297 13.5936C4.78297 12.8977 5.05885 12.2302 5.55016 11.7373L7.40691 9.88143Z"
								fill="white" />
							<path
								d="M10.4999 4.3129L9.88127 4.93152L11.1185 6.16877L11.7371 5.55015C12.2302 5.05927 12.8977 4.78368 13.5935 4.78368C14.2892 4.78368 14.9567 5.05927 15.4498 5.55015C15.9411 6.04301 16.217 6.71055 16.217 7.40646C16.217 8.10238 15.9411 8.76991 15.4498 9.26277L13.593 11.1186C12.6016 12.11 10.8726 12.11 9.88127 11.1186L9.26264 10.5L8.02539 11.7373L8.64402 12.3559C9.46914 13.1819 10.5681 13.6378 11.7371 13.6378C12.9061 13.6378 14.0051 13.1819 14.8303 12.3559L16.687 10.5C17.5058 9.67865 17.9655 8.5662 17.9655 7.40646C17.9655 6.24672 17.5058 5.13428 16.687 4.3129C15.8659 3.49373 14.7533 3.03369 13.5935 3.03369C12.4336 3.03369 11.321 3.49373 10.4999 4.3129Z"
								fill="white" />
						</svg>
						
						<text>粘贴并识别</text>
		
					</view>
				</view>
			</view>
		</u-popup>
		
		
		<dz-toaster :show="showToaster" @close="showToaster=false" title="您输入的链接信息有误，请重新输入"></dz-toaster>
	</view>

</template>

<script>
	import uPopup from '@/components/u-popup.vue';
	export default {
		name: "dz-popup",
		components: {
			uPopup
		},
		props: {
			show: false
		},
		data() {
			return {
				showToaster:false
			};
		},
		methods: {
			submit(){
				this.showToaster = true
			},
			close() {
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-drawer-content,
	.u-drawer-bottom {
		background: transparent !important;
		/* 这里可以是任何合法的CSS颜色值 */
	}


	.popup-content {
		width: 100%;
		height: 260rpx;
		background: #fff;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		overflow: hidden;

		.line {
			width: 60rpx;
			height: 6rpx;
			background: #D9D9D9;
			margin: 0 auto;
			margin-top: 20rpx;
		}

		.input-box {
			margin-top: 20rpx;
			padding: 0 90rpx;

			input,
			.placeholder {
				font-family: Microsoft YaHei UI;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 26.6rpx;
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;

			}
		}

		.btn-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0 30rpx;
			margin-top: 30rpx;

			.btn {
				width: 222rpx;
				height: 70rpx;
				background: #F9475C;
				border-radius: 35rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				user-select: none;
				cursor: pointer;
				text{
					color: #fff;
					font-family: Microsoft YaHei;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 39.6rpx;
					text-align: center;
					margin-left: 10rpx;

				}
			}
		}
	}
</style>