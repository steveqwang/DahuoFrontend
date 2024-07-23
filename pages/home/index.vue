<template>
	<view class="page">
		<view class="top-box">
			<view class="search-occupy-box" :style="{'height':  searchOccupyStyle.height, 
						'--top': searchOccupyStyle.top, 
						'background': searchOccupyStyle.background,
						'backdrop-filter': searchOccupyStyle.backdropFilter,
						'-webkit-backdrop-filter': searchOccupyStyle.backdropFilter}">
				<view class="search-box" :style="{'--height': menuButtonInfo.height + 'px'}">
					<image src="@/static/icon/search01.png" mode="aspectFill"></image>
					<text>搜索</text>
				</view>
			</view>
			<!-- 占位 -->
			<view :style="{'height': searchOccupyStyle.height}">
			</view>
			<view class="title">HI，欢迎来到搭火</view>
			<view class="title2">从虚拟到现实 从屏幕到生活</view>
			<view class="formInfo-box">
				<view class="location-box">
					<image src="@/static/icon/location01.png" mode="aspectFill"></image>
					<city-options :defaultRegion="formInfo.region" @getRegion="handleGetRegion">
						<text class="text">{{formInfo.region ? formInfoManage.regionName : '选择区域'}}</text>
					</city-options>
				</view>
				<view class="formInfo-title">活动类型</view>
				<view class="select-box" @click="formInfoManage.activityVisible = true">
					<view>
						<text
							class="text">{{!formInfo.activity ? '活动类型' : formInfoManage.activity.find(c=> c.id == formInfo.activity).title}}</text>
						<image class="image" src="@/static/icon/down01.png" mode="aspectFill"></image>
					</view>
					<image src="@/static/icon/fire01.png" mode="aspectFill"></image>
				</view>
				<view class="select-Activity">
					<select-box :list="formInfoManage.activity" label="title" :defaultActivity="formInfo.activity"
						:defaultVisible="formInfoManage.activityVisible" value="id" @change="changeFormInfoActivity" />
				</view>
				<view class="formInfo-title" style="margin-top: 30rpx;">活动时间</view>
				<view class="time-price-box">
					<view class="time-box" @click="handleFormInfoManageTimeVisible()">
						<view class="text">{{formInfo.time | parseTime}}</view>
						<image class="image" src="@/static/icon/time01.png" mode="aspectFill"></image>
					</view>
					<view class="select-time">
						<uni-calendar :date="formInfo.time" ref="calendar" :insert="false"
							@confirm="changeFormInfoTime" />
					</view>
					<view class="price-box" @click="formInfoManage.priceRangeVisible = true">
						<view class="text">{{formInfo.price ? formInfoManage.priceRangeName : '价格区间'}}</view>
						<image class="image" src="@/static/icon/price01.png" mode="aspectFill"></image>
					</view>
					<price-range :list="formInfoManage.priceRange" label="title" :defaultActivity="formInfo.price"
						:defaultVisible="formInfoManage.priceRangeVisible" value="id"
						@change="changeFormInfoPriceRange" />
				</view>
				<button class="formInfo-save" :loading="formInfoManage.loading" @click="onSaveformInfo()">开始搭火</button>
				<view class="more-box" @click="handleFindPartner()">
					<text>更多选项</text>
					<image class="image" src="@/static/icon/right03.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="info-box" :style="{'--top': searchOccupyStyle.height}">
			<view class="tabs-box" :style="{'--top': searchOccupyStyle.height}">
				<tabs :tabList="tabList" :defaultActive="tabsActive" @change="changeTab" />
			</view>
			<swiper class="list-box" id="listBox" :current="tabsActive" @change="changeSwiper" :swipe-threshold="50">
				<block v-for="(item,index) in tabList " :key="index">
					<swiper-item>
						<!-- refresher-enabled   isScrollView-->
						<scroll-view scroll-y scroll-with-animation class="scroll-view" lower-threshold="100"
							:refresher-triggered="triggered" @refresherrefresh='handlePull'
							@scrolltolower="handleLoadMore">
							<!-- <view class="list-box1" id="listBox">
								<block v-for="(item,index) in tabList " :key="index" v-if="item.index == tabsActive">
									<template> -->
							<template v-if="item.list &&  item.list.length">
								<view class="info-row" v-for="(item2,index2) in item.list " :key="index2">
									<info-row :info="item2" :key="index2" 
										@changeCollect="changeCollect" />
								</view>
								<loading-tip :status=" item.loading || item.list.length < item.total" />
							</template>

							<template v-else-if="item.loading">
								<loading-box />
							</template>
							<template v-else>
								<empty :text="item.empty" />
							</template>
								<!-- </template>
								</block>
							</view> -->
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>

		</view>
		<floatAdd />
	</view>
</template>

<script>
	import * as api from '@/api/basics.js';
	import {
		tabs
	} from '@/components/tabs.vue';
	import {
		loadingTip
	} from '@/components/loading-tip.vue';
	import {
		empty
	} from '@/components/empty.vue';
	import {
		loadingBox
	} from '@/components/loading-box.vue';
	import {
		infoRow
	} from '@/components/info-row.vue';
	import {
		floatAdd
	} from '@/components/float-add.vue';

	import {
		selectBox
	} from '@/components/select-box.vue';
	import {
		cityOptions
	} from '@/components/city-options/index.vue';
	import {
		priceRange
	} from '@/components/price-range.vue';
	import {
		uniCalendar
	} from '@/components/uni-calendar/uni-calendar.vue';
	import {
		parseTime
	} from '@/utils/global.js'
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'home',
		title: '首页',
		components: {
			tabs,
			infoRow,
			loadingTip,
			floatAdd,
			empty,
			selectBox,
			cityOptions,
			priceRange,
			uniCalendar,
			loadingBox
		},
		data() {
			return {
				searchOccupyStyle: {
					'height': '62px',
					'top': '20px',
					'background': 'transparent',
					'backdrop-filter': 'blur(0px)',
				},
				menuButtonInfo: {},
				isScrollView: false,
				listBoxDomTop: 400,
				loading: false,
				formInfo: {
					activity: '',
					time: '',
					price: '',
					region: '',
				},
				formInfoManage: {
					loading: false,
					activity: [],
					activityVisible: false,
					regionName: '',
					priceRange: [],
					priceRangeVisible: false,
					priceRangeName: '',
					timeVisible: false,
				},
				tabList: [{
						id: 0,
						index: 0,
						name: '热门推荐',
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
						empty: '暂无数据',
					},
					{
						id: 1,
						index: 1,
						name: '折扣活动',
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
						empty: "平台筹备中，敬请期待",
					},
					{
						id: 2,
						index: 2,
						name: '我的关注',
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
						empty: '暂无数据',
					},
				],
				tabsActive: 0,
				loading: false,
				triggered: false,

			}
		},
		filters: {
			parseTime(date) {
				return date ? parseTime(date, '{y}.{m}.{d}') : '选择时间';
			},
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		// onReachBottom() {
		// 	this.handleLoadMore();
		// },
		// onPullDownRefresh() {
		// 	this.handlePull();
		// },
		methods: {
			// 更改tab
			changeTab(e) {
				this.tabsActive = e;
				// this.getList();
			},
			// 更改tab
			changeSwiper(event) {
				this.tabsActive = event.detail.current;
				this.getList();
			},
			// // 下拉刷新
			handlePull() {
				if (this.tabsActive == 1) return;
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
			// 收藏
			changeCollect(row) {
				this.tabList[this.tabsActive].list[row.index]['isCollect'] = row.isCollect;
				this.tabList[this.tabsActive].list[row.index]['collect'] = row.collect;
			},
			// 更改活动类型
			changeFormInfoActivity(row) {
				this.formInfo.activity = row.id;
				this.formInfoManage.activityVisible = false;
			},
			// 更改价格区间
			changeFormInfoPriceRange(row) {
				this.formInfo.price = row.id;
				this.formInfoManage.priceRangeName = row.title;
				this.formInfoManage.priceRangeVisible = false;
			},
			// 更改区域
			handleGetRegion(row) {
				this.formInfo.region = row.code.join(',');
				this.formInfoManage.regionName = row.name.join('');
			},
			// 打开的时间选择
			handleFormInfoManageTimeVisible() {
				this.$refs.calendar.open();
			},
			// 更改时间
			changeFormInfoTime(e) {
				this.formInfo.time = e.fulldate;
			},
			// 开始搭火
			async onSaveformInfo() {
				this.formInfoManage.loading = true;
					setTimeout(() => {
						this.formInfoManage.loading = false;
						uni.navigateTo({
							url: `/pagesActivity/findPartner/seek?id=9`
						})
					}, 600);
			},
			// 搭火-更多选项
			handleFindPartner(){
				uni.navigateTo({
					url: `/pagesActivity/findPartner/index?formInfo=${encodeURIComponent(JSON.stringify(this.formInfo))}`
				})
			},
			// 获取数据
			async getList() {
				try {
					if (this.tabsActive == 1) return;
					this.tabList[this.tabsActive].loading = true;
					// var res = await api.getList();
					let res = {
						code: 0,
						data: {
							total: 23,
							list: [{
									id: '1',
									userName: '发起人姓名1',
									title: '1标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
									userIcon: 'https://img1.baidu.com/it/u=4014992589,2495811998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083'
								},
								{
									id: '2',
									userName: '发起人姓名2',
									title: '2标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									isCollect: true,
									image: 'https://img0.baidu.com/it/u=4040762979,4114507495&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
									userIcon: 'https://img1.baidu.com/it/u=4014992589,2495811998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083'
								},
								{
									id: '3',
									userName: '发起人姓名3发起人姓名3姓名3发起人姓姓名3发起人姓姓名3发起人姓姓名3发起人姓3',
									title: '3标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://img2.baidu.com/it/u=4188325752,2221979913&fm=253&fmt=auto&app=138&f=JPEG?w=820&h=500',
									userIcon: 'https://img1.baidu.com/it/u=4014992589,2495811998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083'
								},
								{
									id: '4',
									userName: '发起人姓名4',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
								},
								{
									id: '5',
									userName: '发起人姓名5',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
								},
								{
									id: '6',
									userName: '发起人姓名6',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://img2.baidu.com/it/u=3285814951,2469384044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=452',
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
								},
								{
									id: '7',
									userName: '发起人姓名7',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://img1.baidu.com/it/u=2120704200,1419420839&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
								},
								{
									id: '8',
									userName: '发起人姓名8',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F31%2F20200331144851_bidlq.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1720150886&t=a3886dccd975d3e709875cea06be00bd',
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
								},
								{
									id: '9',
									userName: '发起人姓名9',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://img1.baidu.com/it/u=1965096606,2845983004&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=353',
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
								},
								{
									id: '10',
									userName: '发起人姓名10',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171018/d5a7336999c84c3c8fe317c295526f99.jpeg',
									userIcon: 'https://img1.baidu.com/it/u=4014992589,2495811998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083'
								},


							],
						}
					}

					setTimeout(() => {
						console.log(this.tabsActive, this.tabList[this.tabsActive])
						if (this.tabsActive == 1) return;
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
					}, 1000)
				} catch {
					this.triggered = false;
					this.tabList[this.tabsActive].loading = false;
				}
			},
			// 获取元素信息
			getDomInfo() {
				uni.createSelectorQuery().in(this).select('#listBox').boundingClientRect().exec(res => {
					this.listBoxDomTop = res[0].top;
				})
			},
			// 获取信息
			async getInfo() {
				// var res = await api.getList();
				// 类型
				var res = {
					code: 0,
					data: [{
							title: '飞盘游戏',
							id: '01'
						},
						{
							title: '骑车上山',
							id: '02'
						},
						{
							title: '下海游泳去玩',
							id: '03'
						},
						{
							title: '网吧通宵',
							id: '04'
						},
						{
							title: '飞盘游戏1',
							id: '05'
						},
						{
							title: '骑车上山2',
							id: '06'
						},
						{
							title: '下海游泳去玩3',
							id: '07'
						},
						{
							title: '网吧通宵4',
							id: '08'
						},
						{
							title: '飞盘游戏5',
							id: '09'
						},
						{
							title: '骑车上山骑车上山骑车上山骑车上山骑车上山骑车上山6',
							id: '10'
						},
						{
							title: '下海游泳去玩7',
							id: '11'
						},
						{
							title: '网吧通宵8',
							id: '12'
						},
					]
				}
				if (res.code == 0) {
					this.formInfoManage.activity = res.data;
				}
				// 价格
				var res1 = {
					code: 0,
					data: [{
							title: '免费',
							id: '01'
						},
						{
							title: '0-20',
							id: '02'
						},
						{
							title: '21-50',
							id: '03'
						},
						{
							title: '51-100',
							id: '04'
						},
						{
							title: '101-300',
							id: '05'
						},
						{
							title: '线下交易',
							id: '06'
						},
					]
				}
				if (res1.code == 0) {
					this.formInfoManage.priceRange = res1.data;
				}

			},


		},
		onLoad() {
			this.getList();
			this.getInfo();
		},
		onReady() {
			this.barTop = this.SYSTEMP_INFO.statusBarHeight;
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.searchOccupyStyle['height'] = this.menuButtonInfo.top + this.menuButtonInfo.height + 6 + 'px';
			this.searchOccupyStyle['top'] = this.menuButtonInfo.top + 'px';
			this.getDomInfo();
		},

		onShow() {},
		onPageScroll(e) {
			this.searchOccupyStyle['background'] =
				`rgba(255, 255, 255, ${80 - e.scrollTop > 0 ? e.scrollTop * 0.01 : 0.8})`;
			this.searchOccupyStyle['backdrop-filter'] = `blur(${80 - e.scrollTop > 0 ? e.scrollTop * 0.05 : 4}px)`;
			this.isScrollView = e.scrollTop > this.listBoxDomTop - (this.menuButtonInfo.top + this.menuButtonInfo.height +
				8) - 50 - 100;
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.top-box {
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		background-image: url($base64-image-bg01);
		box-sizing: border-box;
		// background-position: bottom left;
		background-repeat: no-repeat;
		background-size: 100% 100%;

		.search-occupy-box {
			--top: 20px;
			background: transparent;
			// background: rgba(255, 255, 255, 0.4);
			// backdrop-filter: blur(4px);
			// -webkit-backdrop-filter: blur(4px);
			transition: all 0.5s;
			position: fixed;
			z-index: 99;
			width: 100%;
			top: 0;
			left: 0;
			right: 0;
			padding-top: var(--top);
			padding-left: 24rpx;
			box-sizing: border-box;

			.search-box {
				--height: 32px;
				height: var(--height);
				width: 100%;
				width: 172rpx;
				opacity: 0.5;
				background: #ffffff;
				border-radius: 32rpx;
				padding: 0 24rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;

				image {
					width: 34rpx;
					height: 34rpx;
					margin-right: 16rpx;
				}

				text {
					font-size: 24rpx;
				}
			}



		}

		.title {
			margin-top: 52rpx;
			line-height: 56rpx;
			font-size: 40rpx;
			font-weight: 600;
			letter-spacing: 2.4rpx;
		}

		.title2 {
			margin-top: 16rpx;
			line-height: 34rpx;
			font-size: 24rpx;
			color: $uni-text-color2;
			letter-spacing: 0.72rpx;
		}

		.formInfo-box {
			margin-top: 72rpx;
			width: 100%;
			box-sizing: border-box;
			background-color: rgba(255, 255, 255, 0.55);
			box-shadow: 0px 6rpx 30rpx 0px rgba(196, 196, 196, 0.29);
			// backdrop-filter: blur(20.02px);
			padding: 40rpx 30rpx 30rpx;
			position: relative;
			border-radius: 30rpx;

			.location-box {
				position: absolute;
				right: 30rpx;
				top: 40rpx;
				display: flex;
				align-items: center;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 6rpx;
					vertical-align: middle;
				}

				.text {
					max-width: 30vw;
					@include ellispsis1();
					display: inline-block;
					line-height: 36rpx;
					font-size: 26rpx;
					font-weight: 400;
				}

				city-options {
					height: 36rpx;
				}
			}

			.formInfo-title {
				line-height: 28rpx;
				font-size: 20rpx;
				color: #4e5969;
			}

			.text {
				line-height: 44rpx;
				font-size: 32rpx;
				font-weight: 500;
			}

			.image {
				width: 44rpx;
				height: 44rpx;
				margin-left: 10rpx;
			}

			.select-box {
				margin-top: 12rpx;
				display: flex;
				align-items: center;

				>view {
					max-width: calc(100% - 98rpx);
					display: flex;
					justify-content: space-between;
					align-items: center;

					>text {
						@include ellispsis1();
					}
				}

				>image {
					margin-left: 54rpx;
					width: 44rpx;
					height: 44rpx;
				}

			}

			.select-Activity {
				margin-top: 16rpx;
			}

			.time-price-box {
				margin-top: 12rpx;
				display: flex;
				justify-content: space-between;
			}

			.time-box {
				margin-right: 70rpx;
			}

			.time-box,
			.price-box {
				width: 50%;
				// flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.text {
					max-width: calc(100% - 54rpx);
					@include ellispsis1();
				}
			}

		}

		.formInfo-save {
			margin-top: 62rpx;
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 30rpx;
			color: $uni-button-color;
			background: $uni-button-bg;
			border-radius: 30rpx;
			box-shadow: 4rpx 6rpx 16rpx 0rpx rgba(215, 83, 163, 0.18);
		}

		.more-box {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;
			line-height: 36rpx;
			font-size: 26rpx;

			image {
				width: 26rpx;
				height: 26rpx;
			}
		}

	}

	.info-box {
		--top: 80px;
		// margin-top: 50rpx;
		height: calc(100vh - var(--top));
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.tabs-box {
			--top: 80px;
			position: -webkit-sticky;
			position: sticky;
			top: var(--top);
			z-index: 90;
			background-color: $uni-bg-color;
		}

		.info-row {
			margin-bottom: 30rpx;
			box-shadow: 0rpx 6rpx 30rpx 0rpx rgba(196,196,196,0.29); 
			&:last-child {
				margin-bottom: 0rpx;
			}
		}

		// .list-box1 {
		// 	width: 100%;
		// 	padding: 0 24rpx;
		// 	box-sizing: border-box;
		// 	background-color: $uni-bg-color;
		// }

		.list-box {
			flex: 1;
			height: 1px;
			width: 100%;
			box-sizing: border-box;
			background-color: $uni-bg-color;

			.scroll-view,
			.swiper,
			.swiper-item {
				width: 100%;
				height: 100%;
				position: relative;
			}

			.scroll-view {
				padding: 0 24rpx;
				box-sizing: border-box;
			}

			.scroll-view ::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
				display: none;
			}

		}

	}
</style>