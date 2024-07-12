<template>
	<view class="user-menu">
		<view class="user-menu-mask" @click="handleMask"
			:style="{'--left': left, 'width': left == '0px' ? '100vw' : '70vw',}">
			<!-- <u-popup v-model="visible" class="u-popup"  mode='left' width="68%" :maskCloseAble="true" zIndex="94" :mask="false" > -->
			<view class="content" @click.stop="">
				<view :style="{'height': menuOccupyStyle.height}"></view>
				<scroll-view scroll-y scroll-with-animation class="scroll-view">
					<view class="list-box">
						<view class="" v-for="(item, index) in list" :key="index">
							<view class="list-box-row" v-for="(item2, index2) in item" :key="index2" @click="handleJump(item2)">
								<image :src="item2.icon" mode="scaleToFill"></image>
								<text>{{item2.title}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- </u-popup> -->
		</view>
	</view>
</template>

<script>
	import uPopup from '@/components/u-popup.vue';
	import {
		mapGetters,
	} from 'vuex';
	export default {
		props: {
			menuOccupyStyle: {
				type: Object,
				default: () => {},
			},
			defaultLeft: {
				type: [Number, String],
				default: '-70%',
			},
			touchRight: {
				type: [Number, String],
				default: 0,
			},
		},
		name: "user-menu",
		components: {
			uPopup
		},
		data() {
			return {
				visible: false,
				list: [],
				left: '',
				menuTouch: {
					startX: 0, // 触摸开始的X坐标
					endX: 0, // 触摸结束的X坐标
					startY: 0, // 触摸开始的X坐标
					endY: 0, // 触摸结束的X坐标
					threshold: 50, // 设置触发侧滑的最小距离
					touchRight: 0,
				},
			};
		},
		computed: {
			...mapGetters(['SYSTEMP_INFO', 'USER_INFO'])
		},
		watch: {
			defaultLeft: {
				handler(val) {
					this.left = val;
				},
				immediate: true,
			},
			touchRight: {
				handler(val) {

				},
				immediate: true,
			}
		},
		methods: {
			// 遮罩被点击
			handleMask() {
				this.left = '-70%';
			},
			// 跳转
			handleJump(row){
				uni.navigateTo({
					url: row.url
				});
				this.handleMask();
			},
			// 展开
			onUnfold() {
				if(!this.USER_INFO) return;
				this.left = '0px';
			},
			touchStart(e) {
				if(!this.USER_INFO) return;
				this.menuTouch.startX = e.clientX;
				this.menuTouch.startY = e.clientY;
			},
			touchMove(e) {
				if(!this.USER_INFO) return;
				this.menuTouch.endX = e.clientX;
				this.menuTouch.endY = e.clientY;
				let width = this.menuTouch.endX - this.menuTouch.startX;
				let height = Math.abs(this.menuTouch.endY - this.menuTouch.startY);
				if(width > this.menuTouch.threshold && this.menuTouch.startX < 150 && height < 30) {
					this.left = width >= this.SYSTEMP_INFO.screenWidth * 0.7  ?  '0px' : width - this.SYSTEMP_INFO.screenWidth * 0.7 + 'px';
				}
			},
			touchEnd() {
				if(!this.USER_INFO) return;
				if (Math.abs(this.menuTouch.endX - this.menuTouch.startX) > this.menuTouch.threshold && Math.abs(this.menuTouch.endY - this.menuTouch.startY) < 30) {
					if (this.menuTouch.endX > this.menuTouch.startX) {
						// 右侧滑
						this.left = this.menuTouch.endX - this.menuTouch.startX >= this.SYSTEMP_INFO.screenWidth * 0.7 / 2 ? '0px' : '-70%';
					} else {
						// 左侧滑
						this.left = this.menuTouch.startX - this.menuTouch.endX  >= this.SYSTEMP_INFO.screenWidth * 0.7 / 2 ? '-70%' : '0px';
					}
				}
			},
			// 初始化
			init() {
				this.visible = true;
				this.list = [
					[{
							title: '邀请中心',
							icon: require('@/static/icon/userSet01.png'),
							url: '/pagesUser/invite/index'
						},
						{
							title: '我的收藏',
							icon: require('@/static/icon/userSet02.png'),
							url: '/pagesUser/collection/index'
						},
						{
							title: '我的收益',
							icon: require('@/static/icon/userSet03.png'),
							url: '/pagesUser/income/index'
						},
					],
					[{
							title: '团队明细',
							icon: require('@/static/icon/userSet04.png'),
							url: '/pagesUser/teamDetails/index'
						},
						{
							title: '卡券中心',
							icon: require('@/static/icon/userSet05.png'),
							url: '/pagesUser/couponCenter/index'
						},
						{
							title: '关于我们',
							icon: require('@/static/icon/userSet06.png'),
							url: '/pagesInfo/fileDetails/index?id=gywm&title=关于我们'
						},
						{
							title: '设置',
							icon: require('@/static/icon/userSet07.png'),
							url: '/pagesUser/setUp/index'
						},
					],
					[{
							title: '联系我们',
							icon: require('@/static/icon/userSet08.png'),
							url: '/pagesInfo/fileDetails/index?id=lxwm&title=联系我们'
						},
						{
							title: '入驻平台',
							icon: require('@/static/icon/userSet09.png'),
							url: '/pagesUser/enterPlatform/index'
						},
					]
				];
			},
			
		},
		onReady() {
			this.init();
		},
	}
</script>

<style lang="scss" scoped>
	.user-menu {}

	.user-menu-mask {
		--left: -70%;
		position: fixed;
		left: var(--left);
		top: 0;
		bottom: 0;
		z-index: 94;
		// right: 0;
		width: 70vw;
		transition: all 0.3s;
	}

	.content {
		width: 70vw;
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #fff;
		overflow: hidden;
	}

	.scroll-view {
		flex: 1;
		height: 1px;

		.list-box {
			padding: 58rpx;
			box-sizing: border-box;

			>view {
				border-bottom: 2rpx solid #f2f2f2;
				margin-bottom: 50rpx;
			}

			.list-box-row {
				margin-bottom: 50rpx;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 22rpx;
				}

				text {
					line-height: 40rpx;
					font-size: 28rpx;
				}
			}
		}
	}

	.scroll-view ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}
</style>