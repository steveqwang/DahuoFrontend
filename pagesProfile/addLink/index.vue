<template>
	<view class="main">
		<view class="form-box">
			<view class="title">
				选择链接类型
			</view>

			<view class="type-link">
				<view class="item flex center-y " :class="type==1?'checked':''" @click="type=1">
					<view class="radio flex center">
						<view class="red-checked">

						</view>
					</view>
					<view class="info">
						<view class="name">
							URL或网址
						</view>
						<view class="tips">
							复制地址链接跳转
						</view>
					</view>
				</view>

				<view class="info-body" v-if="type == 1">
					<view class="info-title">
						链接标题
					</view>
					<view class="info-remark">
						<input type="text" placeholder="点击输入连接的标题或描述"
							placeholder-style="color:#707070;font-size:20rpx;" />
						<view class="len">
							0/30
						</view>
					</view>

					<view class="info-title">
						链接填写
					</view>

					<view class="info-link" @click="show=!show">
						输入并识别自己的链接地址
					</view>
				</view>

			</view>


			<view class="type-link">
				<view class="item flex center-y" :class="type==2?'checked':''" @click="type=2">
					<view class="radio flex center">
						<view class="red-checked">

						</view>
					</view>
					<view class="info">
						<view class="name">
							图文信息
						</view>
						<view class="tips">
							上传图片或者文本描述
						</view>
					</view>
				</view>


				<view class="info-body" v-if="type == 2">
					<view class="info-title">
						链接标题
					</view>
					<view class="info-remark">
						<input type="text" placeholder="点击输入文本或图片的描述"
							placeholder-style="color:#707070;font-size:20rpx;" />
						<view class="len">
							0/30
						</view>
					</view>

					<view class="info-title">
						上传图片
					</view>

					<view class="info-upload flex center ">
						<view class="upload flex center column" @click="upload">
							<image src="../../static/img/upload_plus.png"></image>
							<text>上传图片</text>
						</view>
					</view>
				</view>
			</view>





		</view>
		<view class="btn flex center">
			保存
		</view>

		
		<dz-popup :show="show" @close="show=false"></dz-popup>

	</view>

</template>

<script>

	export default {

		data() {
			return {
				type: 1,
				show: false,
			};
		},
		methods: {
			upload() {
				uni.chooseFile({
					count: 1,
					success: (res) => {
						console.log(res)
						// uni.uploadFile({
						// 	url: '/api/',
						// 	filePath: res.tempFilePaths[0],
						// 	name: 'file',
						// 	formData: {
						// 		'token': uni.getStorageSync('token') || '',
						// 	},
						// 	success: res => {
						// 		res = JSON.parse(res.data);
						// 		if (res.code === 1) {
						// 			console.log('上传成功啦！~')
						// 		} else {
						// 			uni.showToast({
						// 				icon: 'none',
						// 				mask: true,
						// 				title: '上传失败',
						// 			});
						// 		}
						// 	}
						// });
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		color: #404040;
		font-size: 24rpx;
	}

	.flex {
		display: flex;
	}

	.center-y {
		align-items: center;
	}

	.center-x {
		justify-content: center;
	}

	.column {
		flex-flow: column;
	}

	.center {
		align-items: center;
		justify-content: center;
	}

	.main {
		width: 100%;
		padding: 24rpx;
		background: #F6F7F8;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center; /* 水平居中 */

		.btn {
			width: 244rpx;
			height: 94rpx;
			background: #F9475C;
			margin: 0 auto;
			margin-top: 60rpx;
			box-shadow: 0px 3px 6px 0px #00000029;
			border-radius: 60rpx;
			font-family: Microsoft YaHei UI;
			font-size: 30rpx;
			font-weight: 700;
			line-height: 39.8px;
			text-align: left;
			color: #fff;
			user-select: none;
			cursor: pointer;
		}


		.btn:active {
			background: #f04b4e;
		}

		.form-box {
			background: #fff;
			width: 100%;
			border-radius: 30rpx;
			padding: 30rpx;
			position: relative;
			box-sizing: border-box;

			.title {
				font-family: Microsoft YaHei UI;
				font-size: 30rpx;
				font-weight: 700;
				line-height: 39.8rpx;
				text-align: left;
				margin-bottom: 20rpx;
				margin-top: 20rpx;
				margin-left: 10rpx;
			}

			.type-link {
				width: 100%;
				border: 1px solid #D8D8D8;
				border-radius: 30rpx;
				padding: 24rpx;
				margin-top: 20rpx;
				box-sizing: border-box;

				.info-body {
					.info-title {
						margin-top: 46rpx;
						width: 96rpx;
						height: 32rpx;
						color: #404040;
						font-family: Microsoft YaHei UI;
						font-size: 24rpx;
						font-weight: 700;
						text-align: left;
					}

					.info-remark {
						display: flex;
						align-items: center;
						position: relative;

						input {
							width: 100%;
							height: 100%;
							border-bottom: 1rpx solid #D8D8D8;
							height: 60rpx;
							line-height: 60rpx;
							margin-top: 20rpx;
						}

						.len {
							position: absolute;
							right: 0;
							top: 50%;
							transform: translateY(-50%);
							color: #707070;
						}
					}

					.info-link {
						height: 120rpx;
						border: 1rpx solid #D8D8D8;
						border-radius: 30rpx;
						padding: 20rpx;
						margin-top: 20rpx;
						color: #707070;
					}

					.info-upload {
						margin-top: 30rpx;

						.upload {
							width: 180rpx;
							height: 180rpx;
							border: 2rpx dashed #010101;
							border-radius: 15rpx;

							image {
								width: 48rpx;
								height: 48rpx;
							}

							text {
								margin-top: 20rpx;
								color: #999999;
								font-size: 20rpx;
							}
						}
					}

				}

				.item {
					display: flex;

					.info {
						margin-left: 30rpx;

						.name {
							color: #707070;
							font-weight: 700;
						}

						.tips {
							margin-top: 10rpx;
							color: #707070;
						}
					}

					.radio {
						border: 2px solid #D8D8D8;
						border-radius: 50%;
						width: 36rpx;
						height: 36rpx;

						.red-checked {
							display: none;
						}
					}


				}


				.checked {
					.radio {
						.red-checked {
							display: block;
							width: 24rpx;
							height: 24rpx;
							background: #F9475C;
							border-radius: 50%;
						}
					}

					.info {
						.name {
							color: #F9475C;
						}
					}
				}
			}
		}
	}
</style>