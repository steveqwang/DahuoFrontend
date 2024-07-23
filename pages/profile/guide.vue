<template>
	<view class="page">
		<view class="top-box" :style="{backgroundImage: `url(${imageUrl})`}">
			<view class="middle-container">
				<view class="avatar-container">
				  <view class="avatar" :style="{backgroundImage: `url(${avatarUrl})`}"></view>
				</view>
				<view class="name">@Roger</view>
				<view class="sign">享受生活</view>
				<view class="links">
					<button v-for="(item, index) in linkList" :key="index" class="link">
						{{ item.content }}
					</button>
				</view>
				<view class="social-media">
					<button v-for="(item, index) in smList" :key="index" class="sm-button">
						<!-- {{ item.icon }} -->
						<view class="sm" :style="{backgroundImage: `url(${item.icon})`}"></view>
					</button>
				</view>
        <button class="create-button" @click="openSettings">创建超级名片</button>
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
				imageUrl: "../../static/img/bg1.png",
				avatarUrl: "../../static/icon/avatar.png",
				linkList: [
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
				smList: [
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
			openSettings() {
				uni.navigateTo({
					url: '/pagesProfile/settings/index'
				});
			}
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

		.avatar-container {
		    width: 170rpx; /* 增加20rpx用于白色圈 */
		    height: 170rpx;
		    margin-top: 196rpx; /* 调整位置以适应新的尺寸 */
		    margin-left: 285rpx;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    background-color: white;
		    border-radius: 50%;
		}
		
		.avatar {
		    width: 160rpx;
		    height: 160rpx;
		    border-radius: 50%;
		    background-size: cover;
		    background-position: center;
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
		  overflow: hidden;
		  display: -webkit-box;
		  -webkit-line-clamp: 2;
		  -webkit-box-orient: vertical;
		  white-space: normal;
		}

		.links {
			margin-top: 30rpx;
		}

		.link {
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

		.social-media {
			display: flex;
			justify-content: center;
			margin-top: 80rpx;
		}

		.sm-button {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			display: flex;
			vertical-align: middle;
			align-items: center;
			margin: 0 10rpx;
		}

		.sm {
			width: 50rpx;
			height: 50rpx;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
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
