<template>
	<view>
		<view class="bar-box" :style="{' padding-top': menuOccupyStyle.top}">
			<view class="" :style="{'height': menuOccupyStyle.height}">
				<image src="@/static/icon/left01.png" mode="scaleToFill" @click="handleBack()"></image>
			</view>
		</view>
		<image class="img" src="../static/img/invite01.png" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		name: 'enterPlatform',
		title: '入驻平台',
		data() {
			return {
				menuOccupyStyle: {
					'height': '38px',
					'top': '20px',
				},
			}
		},
		methods: {
			// 返回
			handleBack(type) {
				uni.navigateBack({
					delta: 1
				});
			},
		},
		onReady() {
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.menuOccupyStyle['height'] = this.menuButtonInfo.height + 6 + 'px';
			this.menuOccupyStyle['top'] = this.menuButtonInfo.top + 'px';
		},
	}
</script>

<style lang="scss" scoped>
	.img {
		width: 100%;
		height: auto;
	}

	.bar-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;

		>view {
			width: 100%;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 24rpx;
				width: 40rpx;
				height: 40rpx;
			}

		}
	}
</style>