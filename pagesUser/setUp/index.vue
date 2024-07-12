<template>
	<view class="page">
		<view class="list-box">
			<block v-for="(item, index) in formManage" :key="index">
				<view class="list-row" @click="handleDetails(item)">
					<view class="left">
						<text v-if="item.require" class="require">*</text>
						{{item.label}}
					</view>
					<view class="right">
						<view class="right-text ">
							<template
								v-if="item.key == 'authentication'">{{USER_INFO.isAuthentication ? '已实名':  '未实名' }}</template>
						</view>
						<image class="icon" src="@/static/icon/right02.png" mode="aspectFit"></image>
					</view>
				</view>
			</block>
		</view>
		<!-- 删除 -->
		<u-popup v-model="logoutManage.visible" mode='center' width="94%" borderRadius="30" :maskCloseAble="false"
			:mask="true">
			<view class="logout-box">
				<view class="title">{{logoutManage.title}}</view>
				<text>{{logoutManage.content}}</text>
				<view class="btn">
					<button @click="logoutManage.visible = false">取消</button>
					<button @click="SET_LEAVE()" :loading="logoutManage.loading">确认</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uPopup from '@/components/u-popup.vue';
	import {
		mapState,
		mapMutations,
		mapActions,
	} from 'vuex';
	export default {
		name: 'setUp',
		title: '设置',
		components: {
			uPopup
		},
		data() {
			return {
				formManage: [],
				logoutManage: {
					visible: false,
					title: '退出登录',
					content: '当前账户将会退出，是否确认继续',
					loading: false,
				},
			}
		},

		computed: {
			...mapState(['USER_INFO', ])
		},
		methods: {
			...mapActions(['SET_LEAVE']),
			...mapMutations(['SET_USER_INFO']),

			// 编辑
			handleDetails(row) {
				switch (row.key) {
					case 'authentication':
						if (this.USER_INFO.isAuthentication) return uni.showToast({
							title: '已实名',
							icon: 'none'
						});
						uni.navigateTo({
							url: '/pagesUser/setUp/authentication'
						})
						break;
					case 'logout':
						this.logoutManage.visible = true;
						break;
					default:
						uni.navigateTo({
							url: `/pagesInfo/fileDetails/index?id=${row.key}&title=${row.label}`
						})
						break;
				}
			},
			// 初始化
			init() {
				this.formManage = [{
						label: '实名认证',
						key: 'authentication',
					},
					{
						label: '用户协议',
						key: 'yhxy',
					},
					{
						label: '隐私政策',
						key: 'ysxy',
					},
					{
						label: '支付协议',
						key: 'zfxy',
					},
					{
						label: '退出登录',
						key: 'logout',
					},

				]
			},
		},
		onShow() {},
		onReady() {
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.menuOccupyStyle['height'] = this.menuButtonInfo.height + 6 + 'px';
			this.menuOccupyStyle['top'] = this.menuButtonInfo.top + 'px';
		},
		onLoad() {
			this.init();
			this.getU();
		}

	}
</script>

<style lang="scss" scoped>
	.list-box {
		width: 100%;
		padding: 0 20rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;

		.list-row {
			padding: 38rpx 0;
			border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
			line-height: 42rpx;
			font-size: 30rpx;
			font-family: PingFang HK, PingFang HK-Regular;
			color: #333333;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.right {

				flex: 1;
				display: flex;
				align-items: center;

				.right-text {
					min-height: 42rpx;
					;
					flex: 1;
					text-align: right;
				}

				.icon {
					margin-left: 6rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
		}

	}

	.logout-box {
		margin: 0 auto;
		width: 690rpx;
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 30rpx;
		padding: 30rpx 40rpx;

		.title {
			padding: 20rpx 0 36rpx;
			line-height: 48rpx;
			font-size: 34rpx;
			text-align: center;
			color: #1d2129;
			letter-spacing: -0.44px;
		}

		>text {
			display: block;
			text-align: center;
			line-height: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
			margin-bottom: 46rpx;
		}

		.btn {
			width: 100%;
			display: flex;
			justify-content: space-around;

			>button {
				flex: 1;
				height: 82rpx;
				text-align: center;
				line-height: 82rpx;
				background: #f6f7f9;
				border-radius: 30rpx;
				font-size: 30rpx;
				color: #666;
			}

			>button:nth-child(2) {
				color: #fff;
				background: $theme;
				margin-left: 30rpx;
			}
		}
	}
</style>