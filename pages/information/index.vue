<template>
	<view class="information">
		<view class="tab-box" :style="{'--left': tabList[tabsActive].left}">
			<view class="tab-box-row" v-for="(item,index) in tabList" :key="index" @click="changeTab(item)"
				:class="{'tab-box-row-active': tabsActive ==  item.index}">
				<view class="tab-box-row-title">
					{{item.title}}
					<text class="news" v-if="item.news"></text>
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
							<view class="info-row" v-for="(item2,index2) in item.list " :key="index2">
								<template v-if="item.id == 1">
									<view class="group-chat"  @click="handleDetail(item.id, item2.id)">
										<view class="left">
											<image :src="item2.image" mode=""aspectFill></image>
											<text class="news" v-if="item2.isNew"></text>
										</view>
										<view class="right">
											<view class="title-box">
												<text class="title">{{item2.title}}</text>
												<text class="time">{{item2.time | parseTime('{h}:{i}')}}</text>
											</view>
											<view class="text">{{item2.text}}</view>
										</view>
									</view>
								</template>
								<template v-else>
									<view class="platform" @click="handleDetail(item.id, item2.id)">
										<view class="title">{{item2.title}}</view>
										<view class="text">{{item2.text}}</view>
										<view class="time">{{item2.time | parseTime('{y}-{m}-{d} {h}:{i}')}}</view>
									</view>
								</template>
							</view>
							<loading-tip :status=" item.loading || item.list.length < item.total" />
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
		name: 'information',
		title: '消息中心',
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
						title: '消息开始通知',
						news: false,
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
						left:'25%'
					},
					{
						index: 1,
						id: 2,
						title: '平台消息',
						news: true,
						list: [],
						page: 1,
						limit: 10,
						total: 0,
						loading: false,
						left:'75%'
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
			// 打开 TUIKit 会话列表
			  openConversation() {
			    uni.navigateTo({
				  url: "/TUIKit/components/TUIConversation/index",
				});
			  },
			  // 打开 TUIKit 联系人
			  openContact() {
			    uni.navigateTo({
			  	  url: "/TUIKit/components/TUIContact/index",
			  	});
			  },

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
			// 详情
			handleDetail(type, id) {
				if(type == 1) {
					uni.navigateTo({
						url: `/pagesInfo/chat/index?id=${id}`
					})
				}else {
					uni.navigateTo({
						url: `/pagesInfo/messageDetails/index?id=${id}`
					});
				}
				
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
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '12:31',
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
									isNew: true,
								},
								{
									id: '2',
									title: '双桥轰趴馆双桥轰趴馆双桥轰趴馆双桥轰趴馆双桥轰趴馆双桥轰趴馆',
									text: '明天下午有时间吗，故宫约拍明天下午有时间吗，故宫约拍明天下午有时间吗，故宫约拍',
									time: '12:31',
									image: 'https://img0.baidu.com/it/u=3531745644,2685943648&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
								},
								{
									id: '3',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '2024-06-08 12:44',
									image: 'https://img2.baidu.com/it/u=2974118977,2851983147&fm=253&fmt=auto&app=120&f=JPEG?w=960&h=600',
								},{
							
									id: '4',
									title: '活动标题活动标题活动标题',
									text: '明天下午有时间吗，故宫约拍',
									time: '12:31',
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
								},
								{
									id: '5',
									title: '双桥轰趴馆',
									text: '明天下午有时间吗，故宫约拍明天下午有时间吗',
									time: '12:31',
									image: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%9B%BE%E7%89%87%E9%A3%8E%E6%99%AF&step_word=&lid=10488868440805246424&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2806553786,955724467&os=497912636,2516086351&simid=4275161262,766734785&pn=18&rn=1&di=7360350738658099201&ln=1861&fr=&fmq=1717651571902_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-10-21%2F5dad420b80bd2.jpg&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDIsMSw2LDUsNCw4LDcsOQ%3D%3D',
								},
								{
									id: '6',
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
									},{
								
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

	.information {
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
			--left: 25%;
			&::after {
				position: absolute;
				content: '';
				bottom: 0;
				left: var(--left);
				transition: left 0.2s;
				transform: translateX(-50%);
				width: 112rpx;
				height: 4rpx;
				background: $theme;
			}
			.tab-box-row {
				width: 50%;
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
			.news {
				width: 16rpx;
				height: 16rpx;
				right: -14rpx;
				top: 0;
			}
		}
		.news {
			position: absolute;
			right: -6rpx;
			top: -6rpx;
			width: 24rpx;
			height: 24rpx;
			border-radius: 50%;
			background-color: #ED1414;
		}
		.info-row {
			width: 100%;
			.group-chat {
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				margin-bottom: 2rpx;
				background-color: #fff;
				display: flex;
				align-items: stretch;
				.left {
					position: relative;
					width: 100rpx;
					height: 100rpx;
					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 20rpx;
					}
				}
				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;
					overflow: hidden;
					.title-box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						>text:nth-child(1) {
							@include ellispsis1();
						}
						>text:nth-child(2) {
							margin-top: 0;
						}
					}
					.text {
						margin-top: 0;
						@include ellispsis1();
					}
				}
			}
			.platform {
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				margin-bottom: 2rpx;
				background-color: #fff;
				.title {
					width: 100%;
					line-height: 48rpx;
				}
			}
			.title {
				width: 100%;
				line-height: 42rpx;
				font-size: 34rpx;
			}
			.text {
				margin-top: 34rpx;
				font-size: 28rpx;
				font-family: PingFang HK, PingFang HK-Regular;
				font-weight: 400;
				text-align: left;
				color: #4e5969;
				line-height: 40rpx;
			}
			.time {
				margin-top: 20rpx;
				line-height: 34rpx;
				font-size: 24rpx;
				font-family: PingFang HK, PingFang HK-Regular;
				color: #666666;
			}
		}
		
		.list-box {
			flex: 1;
			width: 100%;
			box-sizing: border-box;
			padding-top: 30rpx;
			.scroll-view,
			.swiper,
			.swiper-item {
				width: 100%;
				height: 100%;
				position: relative;
			}

			.scroll-view {
				
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