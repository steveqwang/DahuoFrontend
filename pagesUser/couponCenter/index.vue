<template>
	<view class="coupon-center">
		<view class="tab-box" :style="{'--left': tabList[tabsActive].left}">
			<view class="tab-box-row" v-for="(item,index) in tabList" :key="index" @click="changeTab(item)"
				:class="{'tab-box-row-active': tabsActive ==  item.index}">
				<view class="tab-box-row-title">
					{{item.title}}
				</view>

			</view>
		</view>
		<swiper class="list-box" id="listBox" :current="tabsActive" @change="changeSwiper" :swipe-threshold="50">
			<block v-for="(item,index) in tabList " :key="index">
				<swiper-item>
					<scroll-view scroll-y refresher-enabled scroll-with-animation class="scroll-view"
						lower-threshold="100" :refresher-triggered="triggered" @refresherrefresh='handlePull'
						@scrolltolower="handleLoadMore">
						<template v-if="item.list &&  item.list.length">
							<view class="info-row" v-for="(item2,index2) in item.list " :key="index2"
								:class="{'info-row-active': tabsActive === 0}" @click="handleUse(item2)">
								<view class="left">
									{{item2.type}}
								</view>
								<view class="right">
									<view class="title">
										{{item2.title}}
									</view>
									<view class="time">
										{{item2.time}}
									</view>

									<template>
										<button>
											{{item.btn}}
										</button>
									</template>
								</view>
							</view>
							<loading-tip :status=" item.loading || item.page* item.limit < item.total" />
						</template>

						<template v-else-if="item.loading">
							<loading-box />
						</template>
						<template v-else>
							<empty text="暂无消息" />
						</template>
					</scroll-view>
				</swiper-item>
			</block>
		</swiper>


	</view>
</template>

<script>
	import {
		parseTime
	} from '@/utils/global.js'
	import {
		empty
	} from '@/components/empty.vue';
	import {
		loadingBox
	} from '@/components/loading-box.vue';
	import {
		loadingTip
	} from '@/components/loading-tip.vue';

	export default {
		name: 'coupon-center',
		title: '卡券中心',
		components: {
			empty,
			loadingBox,
			loadingTip
		},
		filters: {
			parseTime(date, format) {
				return date ? parseTime(date, format) : '';
			},
		},
		data() {
			return {
				tabList: [{
						index: 0,
						id: 1,
						title: '未使用',
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
						btn: '立即使用',
						left: '16.6%'
					},
					{
						index: 1,
						id: 2,
						title: '已使用',
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
						btn: '已使用',
						left: '50%'
					},
					{
						index: 2,
						id: 3,
						title: '已过期',
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
						btn: '已过期',
						left: '83.3%'
					}
				],
				tabsActive: 0,
				loading: false,
				triggered: false,
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			// 更改tab
			changeTab(e) {
				this.tabsActive = e.index;
			},
			// 更改tab
			changeSwiper(event) {
				this.tabsActive = event.detail.current;
				this.getList();
			},
			// // 下拉刷新
			handlePull() {
				this.triggered = true;
				for (let i = 0; i < this.tabList.length; i++) {
					this.tabList[i].page = 1;
				}
				this.getList();
			},
			// 上拉加载更多
			handleLoadMore() {
				if (this.tabList[this.tabsActive].page * this.tabList[this.tabsActive].limit >= this.tabList[this
						.tabsActive].total || this.tabList[this.tabsActive].loading) return;
				this.tabList[this.tabsActive].page++
				this.getList();
			},
			// 使用
			handleUse(type, id) {

			},
			// 获取数据
			async getList() {
				try {
					this.tabList[this.tabsActive].loading = true;
					// var res = await api.getList();
					let res = {
						code: 0,
						data: {
							total: 23,
							list: [{
									type: '活动卡',
									id: '1',
									title: '单次活动卡',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-12-12 12:31',
								},
								{
									id: '2',
									type: '活动卡',
									title: '单次活动卡',
									text: '明天下午有时间吗，故宫约拍明天下午有时间吗，故宫约拍明天下午有时间吗，故宫约拍',
									time: '2024-12-12 12:31',
								},
								{
									type: '活动卡',
									id: '3',
									title: '单次活动卡',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-12-12 12:31',
								}, {
									type: '活动卡',
									id: '4',
									title: '单次活动卡',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-12-12 12:31',
								},
								{
									type: '活动卡',
									id: '5',
									title: '单次活动卡',
									text: '明天下午有时间吗，故宫约拍明天下午有时间吗',
									time: '2024-12-12 12:31',
								},
								{
									type: '活动卡',
									id: '6',
									title: '单次活动卡单次活动卡单次活动卡单次活动卡单次活动卡单次活动卡单次活动卡',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-06-08 18:44',
								},

							],
						}
					}

					setTimeout(() => {
						if (res.code == 0) {
							for (let i = 0; i < res.data.list.length; i++) {
								res.data.list[i]['index'] = (this.tabList[this.tabsActive].page - 1) * this
									.tabList[this.tabsActive].limit + i;
							}
							this.tabList[this.tabsActive].list = this.tabList[this.tabsActive].page == 1 ? res
								.data.list : [...this.tabList[this.tabsActive].list, ...res.data.list];
							this.tabList[this.tabsActive].total = res.data.total;
						}
						this.triggered = false;
						this.tabList[this.tabsActive].loading = false;
						console.log(this.tabList[this.tabsActive])
					}, 1000)
				} catch {
					this.triggered = false;
					this.tabList[this.tabsActive].loading = false;
				}
			},
			// 获取元素信息

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.coupon-center {
		--top: 80px;
		height: 100vh;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.tab-box {
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			position: relative;
			--left: 16.6%;

			&::after {
				position: absolute;
				content: '';
				bottom: 16rpx;
				left: var(--left);
				transition: left 0.2s;
				transform: translateX(-50%);
				width: 30rpx;
				height: 14rpx;
				background-image: url(../static/img/couponCenter01.png);
				box-sizing: border-box;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}

			.tab-box-row {
				flex: 1;
				line-height: 40rpx;
				font-size: 28rpx;
				text-align: center;
				position: relative;

				.tab-box-row-title {
					display: inline-block;
					position: relative;
				}
			}

			.tab-box-row-active {
				color: $theme;
			}
		}

		.info-row {
			width: 100%;
			width: 100%;
			background: #ffffff;
			border-radius: 30px;
			box-shadow: 0px 0px 12rpx 0px rgba(217, 217, 217, 0.28);
			margin-bottom: 24rpx;
			overflow: hidden;
			display: flex;

			.left {
				padding: 24rpx;
				box-sizing: border-box;
				width: 226rpx;
				background: #4e5969;
				box-shadow: 0px 0px 12rpx 0px rgba(217, 217, 217, 0.16);
				color: #fff;
				font-size: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.right {
				flex: 1;
				padding: 24rpx;
				box-sizing: border-box;

				.title {
					font-size: 30rpx;
					line-height: 42rpx;
					margin-bottom: 16rpx;
				}

				.time {
					color: #999;
					font-size: 26rpx;
					line-height: 34rpx;
					padding-bottom: 18rpx;
					border-bottom: 2rpx dashed #ebebeb;
				}

				button {
					margin: 22rpx 0 0 0;
					width: 130rpx;
					text-align: center;
					height: 40rpx;
					line-height: 40rpx;
					color: #a5abb3;
					font-size: 24rpx;
					background-color: #f6f7f8;
					border-radius: 20rpx;
				}
			}
		}

		.info-row-active {
			.left {
				background: linear-gradient(117deg, #b454f7 0%, #c950cf 29%, #e0568a 52%, #ef5a5b 77%, #f96131 88%);
			}

			.right {
				button {
					background: $theme;
					color: #fff;
				}
			}
		}

		.list-box {
			flex: 1;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 24rpx 0;

			.scroll-view,
			.swiper,
			.swiper-item {
				width: 100%;
				height: 100%;
				position: relative;
			}

			.scroll-view {}

			.scroll-view ::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
				display: none;
			}

		}

	}
</style>