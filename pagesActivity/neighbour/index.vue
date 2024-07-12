<template>
	<view class="page">
		<view class="top-box" :style="{'background-image': userInfo && userInfo.img ? `url(${userInfo.img})` : ''}">
			<view class="">
				<view class="menu-occupy-box" :style="{'height':  menuOccupyStyle.height,
								'--top': menuOccupyStyle.top, 
								'background': menuOccupyStyle.background,
								'backdrop-filter': menuOccupyStyle.backdropFilter,
								'-webkit-backdrop-filter': menuOccupyStyle.backdropFilter}">
					<view class="menu-box" :style="{'--height': menuButtonInfo.height + 'px'}" @click="handleBack()">
						<image src="@/static/icon/left02.png" mode="aspectFill" v-if="menuOccupyStyle.scrollTop > 50">
						</image>
						<image src="@/static/icon/left01.png" mode="aspectFill" v-else></image>

					</view>
				</view>
				<!-- 占位 -->
				<view :style="{'height': menuOccupyStyle.height}"></view>
				<view class="user-box-occupy">
				</view>
				<view class="user-box">
					<view class="left">
						<image :src="userInfo.avatar" mode="aspectFill"></image>
						<view class="member" v-if="userInfo.member">{{userInfo.member}}</view>
					</view>
					<view class="right">
						<view class="name">
							<text>{{userInfo.name}}</text>
							<button @click="changeFollow()" :class="{'button-active': userInfo.isFollow}">{{userInfo.isFollow ? '已关注' :'关注'}}</button>
						</view>
						<view class="other">
							<text @click.stop="handleFollow()">关注：{{userInfo.follow | parseNume}}</text>
							<text style="padding: 0 10rpx;">｜</text>
							<text  @click.stop="handleFans()">粉丝：{{userInfo.fans | parseNume}}</text>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="info-box" 
			:style="{'--top': menuOccupyStyle.height, '--radius': menuOccupyStyle.scrollTop >= listBoxDomTop - 70 - menuOccupyStyle.heightPure  ? '0rpx' : '30rpx'}">
			<view class="tabs-box" :style="{'--top': menuOccupyStyle.height}">
				<tabs :tabList="tabList" :defaultActive="tabsActive" @change="changeTab" :type="2"/>
			</view>
			<swiper class="list-box" id="listBox" :current="tabsActive" @change="changeSwiper" :swipe-threshold="50">
				<block v-for="(item,index) in tabList " :key="index">
					<swiper-item>
						<!-- refresher-enabled   isScrollView-->
						<scroll-view scroll-y scroll-with-animation class="scroll-view" lower-threshold="100"
							:refresher-triggered="triggered" @refresherrefresh='handlePull'
							@scrolltolower="handleLoadMore">
							<template v-if="item.list &&  item.list.length">
								<view class="info-row" v-for="(item2,index2) in item.list " :key="index2" @click="handleDetails(item2.id)">
									<info-row :info="item2" :key="index2"  @changeCollect="changeCollect"/>
								</view>
								<loading-tip :status=" item.loading || item.list.length < item.total" />
							</template>

							<template v-else-if="item.loading">
								<loading-box />
							</template>
							<template v-else>
								<empty />
							</template>
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>

		</view>
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
	} from '@/components/info-row2.vue';
	import {
		parseTime
	} from '@/utils/global.js';
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		name: 'neighbour',
		title: '他人主页',
		components: {
			tabs,
			infoRow,
			loadingTip,
			empty,
			loadingBox,
		},
		data() {
			return {
				menuOccupyStyle: {
					'height': '62px',
					'top': '20px',
					'background': 'transparent',
					'backdrop-filter': 'blur(0px)',
					'scrollTop': 0,
					'heightPure': '62',
				},
				menuButtonInfo: {},
				isScrollView: false,
				listBoxDomTop: 400,
				loading: false,
				tabList: [{
						id: 0,
						index: 0,
						name: '他参与的',
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
					},
					{
						id: 1,
						index: 1,
						name: '他发布的',
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
					}
				],
				tabsActive: 0,
				loading: false,
				triggered: false,
				userInfo: {},
			}
		},
		filters: {
			parseTime(date) {
				return date ? parseTime(date, '{y}.{m}.{d}') : '选择时间';
			},
			parseNume(num) {
				return num > 999 ? '999+' : num;
			},
		},
		watch: {
		},
		computed: {
			...mapGetters(['SYSTEMP_INFO', 'USER_INFO'])
		},
		// onReachBottom() {
		// 	this.handleLoadMore();
		// },
		onPullDownRefresh() {
			this.handlePull();
		},
		methods: {
			...mapActions(['GET_USER']),
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
			// 返回
			handleBack(){
				uni.navigateBack({
					delta: 1,
				})
			},
			// 下拉刷新
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
			// 详情
			handleDetails(id) {
				uni.navigateTo({
					url: `/pagesActivity/activityDetails/index?id=${id}`
				})
			},
			// 收藏
			changeCollect(row) {
				this.tabList[this.tabsActive].list[row.index]['isCollect'] = row.isCollect;
				this.tabList[this.tabsActive].list[row.index]['collect'] = row.collect;
			},
			// 关注
			changeFollow(){
				this.userInfo.isFollow = !this.userInfo.isFollow
			},
			
			// 关注列表
			handleFollow(){
				uni.navigateTo({
					url: `/pagesUser/follow/index?userId=${this.userInfo.id}`
				})
			},
			 // 粉丝列表
			 handleFans(){
				 uni.navigateTo({
				 	url: `/pagesUser/fans/index?userId=${this.userInfo.id}`
				 })
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
									id: '1',
									status: '进行中',
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
									status: '已结束',
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
									isEvaluate: 2,
									id: '3',
									status: '已结束',
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
									status: '进行中',
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
									status: '进行中',
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
									isEvaluate: 1,
									id: '6',
									status: '已结束',
									userName: '1发起人姓名6',
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
									status: '进行中',
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
									status: '进行中',
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
									status: '进行中',
									userName: '发起人姓名9',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://img1.baidu.com/it/u=1965096606,2845983004&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=353',
									userIcon: 'https:https://img0.baidu.com/it/u=2198516285,3363021639&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=702'
								},
								{
									id: '10',
									status: '进行中',
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
						uni.stopPullDownRefresh()
					}, 1000)
				} catch {
					this.triggered = false;
					this.tabList[this.tabsActive].loading = false;
					uni.stopPullDownRefresh()
				}
			},
			// 获取元素信息
			getDomInfo() {
				uni.createSelectorQuery().in(this).select('#listBox').boundingClientRect().exec(res => {
					this.listBoxDomTop = res[0].top;
				})
			},
			// 获取用户信息
			getUser(userId){
				this.userInfo = {
					avatar: 'https://img1.baidu.com/it/u=932845147,3978428647&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					name: '他人用户主页',
					id: 99,
					follow: '99',
					fans: '88',
					member: '年会员',
					isFollow: false,

				}
			}
		},
		onLoad(params) {
			this.getList();
			this.getUser(params.userId)
		},
		onReady() {
			this.barTop = this.SYSTEMP_INFO.statusBarHeight;
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.menuOccupyStyle['height'] = this.menuButtonInfo.top + this.menuButtonInfo.height + 6 + 'px';
			this.menuOccupyStyle['heightPure'] = this.menuButtonInfo.top + this.menuButtonInfo.height + 6;
			this.menuOccupyStyle['top'] = this.menuButtonInfo.top + 'px';
			this.getDomInfo();
		},

		onShow() {
		},
		onPageScroll(e) {
			this.menuOccupyStyle['background'] =
				`rgba(246,246,246, ${160 - e.scrollTop > 0 ? e.scrollTop * 0.016 : 1})`;
			this.menuOccupyStyle['backdrop-filter'] = `blur(${80 - e.scrollTop > 0 ? e.scrollTop * 0.05 : 4}px)`;
			this.menuOccupyStyle['scrollTop'] = e.scrollTop;
			// this.isScrollView = e.scrollTop > this.listBoxDomTop - (this.menuButtonInfo.top + this.menuButtonInfo.height +
			// 	8) - 50 - 100;
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.top-box {
		width: 100%;
		background-image: url($base64-image-bg02);
		box-sizing: border-box;
		// background-position: bottom left;
		background-repeat: no-repeat;
		background-size: 100% 100%;


		>view {
			width: 100%;
			height: 100%;
			padding: 0 24rpx 72rpx;
			box-sizing: border-box;
			background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
		}

		.menu-occupy-box {
			--top: 24px;
			background: transparent;
			// background: rgba(255, 255, 255, 0.4);
			// backdrop-filter: blur(4px);
			// -webkit-backdrop-filter: blur(4px);
			transition: all 0.5s;
			position: fixed;
			z-index: 93;
			width: 100%;
			top: 0;
			left: 0;
			right: 0;
			padding-top: var(--top);
			padding-left: 24rpx;
			box-sizing: border-box;

			.menu-box {
				--height: 32px;
				height: var(--height);
				line-height: var(--height);
				width: 100%;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}



		}
		.user-box-occupy {
			height: 400rpx;
		}
		.user-box {
			display: flex;
			align-items: center;
			// overflow: hidden;
			color: #fff;

			.left {
				position: relative;
				>image {
					width: 138rpx;
					height: 138rpx;
					border: 2rpx solid #ffffff;
					border-radius: 50%;
				}

				.member {
					display: inline-block;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: -18rpx;
					font-size: 20rpx;
					// padding: 0 16rpx;
					box-sizing: border-box;
					height: 36rpx;
					line-height: 36rpx;
					width: 86rpx;
					text-align: center;
					background: linear-gradient(71deg, #202038 9%, #543a55 81%);
					border-radius: 6rpx;
				}
			}

			.right {
				margin-left: 42rpx;
				flex: 1;

				.name {
					display: flex;
					align-items: center;
					text {
						flex: 1;
						line-height: 50rpx;
						font-size: 38rpx;
						// @include ellispsis1();
					}

					button {
						margin-left: 10rpx;
						width: 128rpx;
						height: 50rpx;
						border: 2rpx solid #ffffff;
						border-radius: 28rpx;
						margin-left: 8rpx;
						color: #fff;
						font-size: 24rpx;
						text-align: center;
						line-height: 50rpx;
						background-color: transparent;
						
					}
					.button-active {
						background: rgba(255,25, 255,0.3);
					}
				}

				.other {
					margin-top: 28rpx;
					font-size: 24rpx;
					line-height: 34rpx;
					@include ellispsis1();
				}
			}
		}

		.user-box-empty {
			.right {
				font-size: 36rpx;
				padding: 0 16rpx;
				box-sizing: border-box;
			}
		}

	}

	.info-box {
		--top: 80px;
		--radius: 30rpx;
		// margin-top: 50rpx;
		height: calc(100vh - var(--top));
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		margin-top: -36rpx;
		border-top-left-radius: var(--radius);
		border-top-right-radius: var(--radius);

		.tabs-box {
			padding: 0 26rpx;
			box-sizing: border-box;
			--top: 80px;
			position: -webkit-sticky;
			position: sticky;
			top: var(--top);
			z-index: 90;
			background-color: $uni-bg-color;
			border-top-left-radius: var(--radius);
			border-top-right-radius: var(--radius);
		}

		.info-row {
			margin-bottom: 30rpx;

			&:last-child {
				margin-bottom: 0rpx;
			}
		}

		.list-box {
			flex: 1;
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