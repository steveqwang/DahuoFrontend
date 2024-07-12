<template>
	<view class="select-template">
		<view class="tabs-box">
			<tabs type='2' :tabList="tabList" :defaultActive="tabsActive" @change="changeTab" defaultLabel="title"
				:multiple="true" />
		</view>
		<view class="condition-box">
			<view class="left">
				<view class="row" v-for="(item, index) in conditionList" :key="index"
					:class="{'row-active': condition[item.key]}" @click="onChangeCondition(item)">
					{{item.title}}
				</view>
			</view>
			<image src="@/static/icon/filter01.png" mode="scaleToFill" @click="handleFilter()"></image>
		</view>
		<scroll-view scroll-y refresher-enabled scroll-with-animation class="scroll-view" lower-threshold="100"
			:refresher-triggered="triggered" @refresherrefresh='handlePull' @scrolltolower="handleLoadMore">
			<template v-if="list && list.length">
				<view class="list-box">
					<view class="list-row" v-for="(item, index) in list" :key="index">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="content">
							<view class="price">
								¥<text>{{item.price}}</text>/人
							</view>

							<view class="title">{{item.title}}</view>
							<view class="info">
								<view class="other">
									<image class="icon" src="@/static/icon/location04.png" mode="aspectFit"></image>
									<view class="text">{{item.location}}</view>
								</view>
								<view class="other">
									<image class="icon" src="../static/icon/edit02.png" mode="aspectFit"></image>
									<view class="text">使用次数：{{item.frequency}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<loading-tip :status=" loading || params.page *  params.limit < total" />
			</template>
			<template v-else-if="loading">
				<loadingBox type='pFixed' />
			</template>
			<template v-else>
				<empty type='pFixed' />
			</template>
		</scroll-view>
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
	import {
		tabs
	} from '@/components/tabs.vue';
	export default {
		name: 'select-template',
		title: '消息中心',
		components: {
			empty,
			loadingBox,
			loadingTip,
			tabs,
		},
		filters: {
			parseTime(date, format) {
				return date ? parseTime(date, format) : '';
			},
		},
		data() {
			return {
				tabList: [],
				tabsActive: [],
				conditionList: [],
				condition: {},
				params: {
					page: 1,
					limit: 10,
				},
				loading: false,
				triggered: false,
				list: [],
				total: 0,
			}
		},
		onLoad() {
			this.init();
			this.getList();
		},
		methods: {
			// 删选
			handleFilter(){
				uni.navigateTo({
					url: '/pagesActivity/findPartner/filter'
				})
			},
			// 更改tab
			changeTab(e) {
				this.tabsActive = e;
				this.getList();
			},
			// 更改条件
			onChangeCondition(row) {
				this.$set(this.condition, row.key, !this.condition[row.key]);
				this.getList();
				// this.condition[row.key] = !this.condition[row.key];
			},
			// // 下拉刷新
			handlePull() {
				this.triggered = true;
				this.params.page = 1;
				this.getList();
			},
			// 上拉加载更多
			handleLoadMore() {
				if (this.total <= this.params.page * this.params.limit || this.loading) return;
				this.params.page++;
				this.getList();
			},
			// 初始化
			async init() {
				// 关键词
				this.tabList = [{
						id: 1,
						title: '关键词01',
					},
					{
						id: 2,
						title: '关键词02',
					},
					{
						id: 3,
						title: '关键词03',
					},
					{
						id: 4,
						title: '关键词04',
					},
					{
						id: 5,
						title: '关键词05',
					},
					{
						id: 6,
						title: '关键词06',
					},
					{
						id: 7,
						title: '关键词07',
					},
				];
				this.conditionList = [{
						id: '10',
						title: '低价优先',
						key: 'priceD',
					},
					{
						id: 12,
						title: '高价优先',
						key: 'priceT'
					},
					{
						id: 13,
						title: '距离优先',
						key: 'distance'
					}
				]




			},
			// 获取数据
			async getList() {
				try {
					this.loading = true;
					// var res = await api.getList();
					let res = {
						code: 0,
						data: {
							total: 23,
							list: [{
									id: '1',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '12:31',
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
									frequency: 19921,
									location: '搭火北京基地俱乐部',
									price: 29.9
								},
								{
									id: '2',
									title: '双桥轰趴馆双桥轰趴馆双桥轰趴馆双桥轰趴馆双桥轰趴馆双桥轰趴馆',
									text: '明天下午有时间吗，故宫约拍明天下午有时间吗，故宫约拍明天下午有时间吗，故宫约拍',
									time: '12:31',
									image: 'https://img0.baidu.com/it/u=3531745644,2685943648&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
									frequency: 191,
									location: '搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部',
									price: 29.9
								},
								{
									id: '3',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-06-08 12:44',
									image: 'https://img2.baidu.com/it/u=2974118977,2851983147&fm=253&fmt=auto&app=120&f=JPEG?w=960&h=600',
									frequency: 0,
									price: 2129.9
								}, {

									id: '4',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '12:31',
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
									frequency: 1,
									price: 2129.9
								},
								{
									id: '5',
									title: '双桥轰趴馆',
									text: '明天下午有时间吗，故宫约拍明天下午有时间吗',
									time: '12:31',
									image: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%9B%BE%E7%89%87%E9%A3%8E%E6%99%AF&step_word=&lid=10488868440805246424&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2806553786,955724467&os=497912636,2516086351&simid=4275161262,766734785&pn=18&rn=1&di=7360350738658099201&ln=1861&fr=&fmq=1717651571902_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-10-21%2F5dad420b80bd2.jpg&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDIsMSw2LDUsNCw4LDcsOQ%3D%3D',
									frequency: 12,
									price: 2129.9,
								},
								{
									id: '6',
									price: 29.9,
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-06-08 18:44',
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
								},
								{
									id: '1',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-06-08 12:44',
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
								},
								{
									id: '2',
									title: '双桥轰趴馆',
									text: '明天下午有时间吗，故宫约拍明天下午有时间吗，故宫约拍明天下午有时间吗，故宫约拍',
									time: '2024-06-08 12:44',
									image: 'https://img2.baidu.com/it/u=2974118977,2851983147&fm=253&fmt=auto&app=120&f=JPEG?w=960&h=600',
								},
								{
									id: '3',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-06-08 12:44',
									image: 'https://img2.baidu.com/it/u=2974118977,2851983147&fm=253&fmt=auto&app=120&f=JPEG?w=960&h=600',
								}, {

									id: '4',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-06-08 12:44',
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
								},
								{
									id: '5',
									title: '双桥轰趴馆',
									text: '明天下午有时间吗，故宫约拍明天下午有时间吗',
									time: '2024-06-08 12:44',
									image: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%9B%BE%E7%89%87%E9%A3%8E%E6%99%AF&step_word=&lid=10488868440805246424&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2806553786,955724467&os=497912636,2516086351&simid=4275161262,766734785&pn=18&rn=1&di=7360350738658099201&ln=1861&fr=&fmq=1717651571902_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-10-21%2F5dad420b80bd2.jpg&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDIsMSw2LDUsNCw4LDcsOQ%3D%3D',
								},
								{
									id: '6',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-06-08 18:44',
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
								}


							],
						}
					}

					setTimeout(() => {
						if (res.code == 0) {
							this.list = this.page == 1 ? res.data.list : [...this.list, ...res.data.list];
							this.total = res.data.total;
						}
						this.loading = false;
						this.triggered = false;
					}, 1000)
				} catch {
					this.loading = false;
					this.triggered = false;
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.select-template {
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.tabs-box {
		padding-left: 30rpx;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;

		::v-deep .uni-tab-row {
			.uni-tab-item {
				background: #f6f7f8;
			}

			.uni-tab-item-active {
				background: linear-gradient(88deg, #fc2b74 6%, #fc5a3f 100%);
				box-shadow: 0px 6rpx 12rpx 0px rgba(252, 68, 87, 0.20);
			}
		}

	}

	.condition-box {
		border-top: 2rpx solid #F6F7F8;
		background-color: #fff;
		display: flex;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		align-items: center;
		overflow: hidden;

		.left {
			flex: 1;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 30rpx 0;
			box-sizing: border-box;
			white-space: nowrap;
			overflow-x: auto;

			&::-webkit-scrollbar {
				display: none !important;
				width: 0;
				height: 0;
				color: transparent;
			}

			.row {
				line-height: 40rpx;
				font-size: 28rpx;
				margin-right: 90rpx;

				&:last-child {
					margin-right: 0rpx;
				}
			}

			.row-active {
				color: $theme;
			}
		}

		image {
			flex-shrink: 1;
			margin-left: 30rpx;
			width: 40rpx;
			height: 40rpx;
		}

		::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		}
	}

	.scroll-view {
		flex: 1;
		height: 1px;
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		width: 100%;
		box-sizing: border-box;
	}

	.scroll-view ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}

	.list-box {
		width: 100%;

		.list-row {
			width: 100%;
			height: 100%;
			overflow: hidden;
			border-radius: 30rpx;
			position: relative;
			margin-bottom: 30rpx;
			background: #fff;

			>image {
				width: 100%;
				height: 320rpx;
				border-radius: 30rpx 30rpx 0px 0px;
				box-shadow: 0px 6rpx 30rpx 0px rgba(196, 196, 196, 0.29);
			}

			.content {
				color: #4E5969;
				padding: 24rpx;
				box-sizing: border-box;

				text {
					font-size: 24rpx;
					line-height: 34rpx;
				}


				.title {
					margin-top: 16rpx;
					font-size: 38rpx;
					line-height: 48rpx;
					@include ellispsis1();
					margin-bottom: 16rpx;
					color: #333;
				}

				.price {
					margin-top: 24rpx;
					display: inline;
					letter-spacing: 1.5px;
					font-size: 24rpx;
					color: $theme;
				
					text {
						font-family: DIN Alternate, DIN Alternate-Bold;
						font-size: 38rpx;
						letter-spacing: 1px;
					}
				}

				.info {
					border-top: 2rpx solid #F6F7F8;
					padding-top: 16rpx;

					>view {
						margin-top: 12rpx;
						display: flex;
						align-items: center;

						&:first-child {
							margin-top: 0;
						}

						.icon {
							width: 24rpx;
							height: 24rpx;
							margin-right: 12rpx;
						}

						.text {
							flex: 1;
							font-size: 24rpx;
							line-height: 34rpx;
							display: inline-block;
							@include ellispsis1();

						}

						.active {
							letter-spacing: 1px;
							font-size: 30rpx;
							color: $theme;
						}
					}




				}
			}

		}
	}
</style>