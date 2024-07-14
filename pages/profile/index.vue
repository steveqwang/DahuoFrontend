
<template>
	<view class="page">
		<view class="top-box" :style="{backgroundImage: `url(${imageUrl})`}">
			<view class="middle-container">
				<image class="avatar" :style="{backgroundImage: `url(${avatarUrl})`}"></image>
				<view class="name">@Roger</view>
				<view class="sign">享受生活</view>
				<view class="buttons">
					<button v-for="(item, index) in buttonList" :key="index" class="button">
						{{ item.content }}
					</button>
				</view>
				<view class="icons">
					<button v-for="(item, index) in iconList" :key="index" class="icon-button">
						<!-- {{ item.icon }} -->
						<view class="icon" :style="{backgroundImage: `url(${item.icon})`}" />
					</button>
				</view>
				<button class="create-button">创建超级名片</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { urlToBase64 }  from '@/utils/toBase64.js'
	export default {
		name: 'profile',
		title: '个人页面',
		data() {
			return {
				imageUrl: "../../static/img/bg.png",
				avatarUrl: "../../static/img/avatar.png",
				buttonList: [
					{
						id: 1,
						content: "Roger的小红书"
					},
					{
						id: 2,
						content: "搭火APP元老用户群"
					},
					{
						id: 3,
						content: "北京骑行搭子2群"
					},
					{
						id: 4,
						content: "小助理@233 的小红书"
					}
				],
				iconList: [
					{
						id: 1,
						icon: "../../static/icon/logos/ICON_TIKTOK.svg"
					},
					{
						id: 2,
						icon: "../../static/icon/logos/ICON_XHS.svg"
					},
					{
						id: 3,
						icon: "../../static/icon/logos/ICON_WEIBO.svg"
					},
					{
						id: 4,
						icon: "../../static/icon/logos/ICON_DIANPING.svg"
					}

				]
			}
		},
		methods: {
			urlToBase64(folder, file) {
				return urlToBase64(folder, file)
			},
			
		}
	}
</script>

<style lang="scss">


	.top-box {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		overflow: scroll;

		.middle-container {
		}

		.avatar{
			width: 160rpx;
			height: 160rpx;
			margin-top: 206rpx;
			margin-left: 295rpx;
			background-color: white;
			border-radius: 100%;
		}

		.name {
			margin-top: 28rpx;
			color: #fff;
			font-size: 15px;
			font-weight: 700;
			line-height: 20px;
			text-align: center;

		}

		.sign {
			margin-top: 6rpx;
			color: #fff;
			font-size: 12px;
			font-weight: 290;
			line-height: 16px;
			text-align: center;
		}

		.buttons {
			margin-top: 30rpx;
		}

		.button {
			width: 680rpx;
			height: 100rpx;
			margin-bottom: 40rpx;
			border-radius: 50rpx;
			box-shadow: 0px 3px 15px 0px rgba(178, 161, 161, 0.2);
			background: rgb(255, 255, 255);
			color: rgb(64, 64, 64);
			font-size: 15px;
			font-weight: 700;
			line-height: 20px;
			letter-spacing: 0px;
			text-align: center;
			align-items: center;
		}

		.icons {
			display: flex;
		}

		.icon-button {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			vertical-align: middle;
			align-items: center;
			padding: 25rpx;
		}

		.icon {
			width: 50rpx;
			height: 50rpx;
			background-repeat: no-repeat;
		}

		.create-button {
			width: 244rpx;
			height: 94rpx;
			margin-top: 84rpx;
			margin-bottom: 80rpx;
			border-radius: 47rpx;
			box-shadow: 0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.16);
			background: rgb(249, 71, 92);
			color: rgb(255, 255, 255);
			font-size: 15px;
			font-weight: 700;
			line-height: 20px;
			letter-spacing: 0px;
			text-align: left;
			align-items: center;
		}

	}

</style>
