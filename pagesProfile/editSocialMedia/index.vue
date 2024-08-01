<template>
	<view class="editSocialMedia">
		<view class="content">
			<view class="logo">
				<image src="../../static/image/dazhong.png" mode="" width="100%" height="100%"></image>
			</view>

			<view class="title">
				大众点评
			</view>

			<div class="input-area">
				点击填写复制URL或网址，添加链接
			</div>
		</view>
		
		<view class="btn flex center">
			保存
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'editSocialMedia',
		data() {
			return {

			}
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	};
</script>

<style scoped lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	uni-page-body,
	html,
	body,
	uni-page-body {
		width: 100% !important;
		height: 100% !important;
		/* overflow: hidden; */
		overflow-y: auto !important;
	}

	.editSocialMedia {
		padding: 24rpx;
	}

	
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
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	
	.btn:active {
		background: #f04b4e;
	}
	

	.content {
		width: 702rpx;

		background: #FFF;
		border-radius: 30rpx;
		display: flex;
		flex-flow: column;
		align-items: center;
		
		padding-bottom: 100rpx;
		
		.logo {
			width: 160rpx;
			height: 160rpx;
			margin: 0 auto;
			margin-top: 72rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			font-family: Microsoft YaHei UI;
			font-size: 36rpx;
			font-weight: 700;
			line-height: 47.52rpx;
			text-align: left;
			margin-top: 50rpx;
		}

		.input-area {
			width: 654rpx;
			height: 200rpx;
			border-radius: 20rpx;
			border: 1px solid #D8D8D8;
			margin-top: 60rpx;
			padding: 20rpx;
			
			font-family: Microsoft YaHei UI;
			font-size: 20rpx;
			font-weight: 400;
			line-height: 26.6rpx;
			text-align: left;
			color: #707070;
;
		}
	}
</style>