<template>
	<view class="invite">
		<view class="bar-box" :style="{' padding-top': menuOccupyStyle.top}">
			<view class="" :style="{'height': menuOccupyStyle.height}">
				<image src="@/static/icon/left01.png" mode="scaleToFill" @click="handleBack()"></image>
			</view>
		</view>
		<view class="info">
			<image class="img" src="../static/img/invite01.png" mode="widthFix"></image>
			<view class="img-box">
				<image src="../static/img/invite02.png" mode="scaleToFilla" @click="handlePromotionRules()"></image>
				<image src="../static/img/invite03.png" mode="scaleToFilla" @click="handleTeamDetails()"></image>
			</view>
		</view>
		<view class="bottom-box" >
			<button :loading="loading" open-type="share">邀请好友</button>
		</view>
		<view class="bottom-occupy"></view>
	</view>
</template>

<script>
	export default {
		name: 'invite',
		title: '邀请中心',
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
			// 晋升规则
			handlePromotionRules(){
				uni.navigateTo({
					url: '/pagesUser/invite/promotionRules'
				})
			},
			// 团队
			handleTeamDetails(){
				uni.navigateTo({
					url: '/pagesUser/teamDetails/index'
				})
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
	.invite {
		padding-bottom: 140rpx;
	}
	.img {
		width: 100%;
		height: auto;
	}
	.info {
		position: relative;
	}
	
	.img-box {
		position: absolute;
		right: 32rpx;
		top: 35%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		image {
			width: 108rpx;
			height: 114rpx;
			&:nth-child(2){
				margin-top: 60rpx;
			}
		}
		
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
	.bottom-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0px 0px 12px 0px rgba(238,239,241,0.50); 
		button {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: $uni-button-bg;
			border-radius: 30rpx;
			font-size: 30rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			font-weight: 500;
			color: #ffffff;
		}
		
	}
	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}
</style>