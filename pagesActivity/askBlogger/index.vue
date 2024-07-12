<template>
	<view class="ask-blogger">
		<template v-if="list && list.length">
			<view class="list-box">
				<view class="list-row-box" v-for="(item,index) in list" :key="index">
					<view class="" v-for="(item2,index2) in item.listCur" :key="index2">
						<!-- answer -->
						<view class="row-box">
							<view class="left">
								<image :src="item.avatar" mode="aspectFill" @click="handleNeighbour(item.id)"></image>
								<image src="../static/img/issue01.png" mode="aspectFit"></image>
							</view>
							<view class="middle">
								{{item2.answer}}
							</view>
							<template v-if="item2.status == 1">
								<view class="right">
									已回复
								</view>
							</template>
							<template v-if="item2.status != 1">
								<view class="right right-active" @click="handleComment('question', item)">
									回复
								</view>
							</template>
						</view>
						<!-- question -->
						<view class="row-box" v-if="item2.question">
							<view class="left">
								<image :src="blogger.avatar" mode="aspectFill" @click="handleNeighbour(blogger.id)"></image>
								<image src="../static/img/issue03.png" mode="aspectFit"></image>
							</view>
							<view class="middle">
								{{item2.question}}
							</view>
						</view>
					</view>
					<view class="shrink" @click="handleShrink(item)" v-if='item.list.length > 2'>
						<template v-if="item.shrink">
							<text>展开更多问答</text>
							<image src="@/static/icon/down02.png" mode="scaleToFill"></image>
						</template>
						<template v-else>
							<text>收起</text>
							<image src="@/static/icon/top01.png" mode="scaleToFill"></image>
						</template>
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
		<view class="bottom-box" @click="handleComment('answer')">
			<button>我也要提问</button>
			<view class="bottom-occupy"></view>
		</view>
		<comment ref='comment' @change='changeComment' />
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
		comment
	} from '../components/comment.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'askBlogger',
		title: '问博主',
		components: {
			empty,
			loadingBox,
			loadingTip,
			comment,
		},
		filters: {},
		data() {
			return {
				params: {
					page: 1,
					limit: 10,
				},
				total: 0,
				list: [],
				blogger: {},
				loading: true,
			}
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		onReachBottom() {
			if (this.total <= this.params.page * this.params.limit || this.loading) return;
			this.params.page++;
			this.getList();
		},
		onPullDownRefresh() {
			this.params.page = 1;
			this.getList();
		},
		onLoad() {
			this.getList();
		},
		methods: {
			// 他人主页
			handleNeighbour(id) {
				uni.navigateTo({
					url: `/pagesActivity/neighbour/index?userId=${id}`
				})
			},
			// 收缩
			handleShrink(row) {
				row.shrink = !row.shrink;
				if (row.shrink) {
					row.listCur = row.list.slice(0, 2);
				} else {
					row.listCur = row.list;
				}
			},
			// 评论
			handleComment(type, row) {
				row = row ? row : {};
				this.$refs.comment.init({
					type,
					...row
				})
			},
			// 评论 更改
			changeComment(params) {
				console.log('changeComment', params.type)
				if (params.type == 'answer') {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
					this.params.page = 1;
					this.getList();
				} else {
					// 直接加入数组
				}

			},
			// 获取数据
			async getList() {
				try {
					this.loading = true;
					// var res = await api.getList();
					let res = {
						code: 0,
						data: {
							total: 24,
							blogger: {
								isSelf: false,
								avatar: 'https://img1.baidu.com/it/u=2572795898,2432467619&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=427'
							},
							list: [{
									id: '0', // 用户
									avatar: 'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399',
									list: [{
											answer: '晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗',
											question: '不可以的，好多小伙伴半夜会饿醒醒来之后就去吃饭，吃饭回来',
											status: 1,
										},
										{
											answer: '晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗',
											question: '不可以的，好多小伙伴半夜会饿醒醒来之后就去吃饭，吃饭回来',
											status: 0,
										},
									]
								},
								{
									id: '1',
									avatar: 'https://img1.baidu.com/it/u=1759277111,278348405&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=841',
									list: [{
										answer: '晚上可以晚一点过去吗晚上可',
										question: '不可以的，好多小伙伴半夜会饿醒醒来之后就去吃饭，吃饭回来',
										status: 1,
									}, ]
								},
								{
									id: '2',
									avatar: 'https://img1.baidu.com/it/u=1759277111,278348405&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=841',
									list: [{
										answer: '晚上可以晚一点过去吗晚上可',
										status: 0,
									}, ]
								},
								{
									id: '4',
									avatar: 'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399',
									list: [{
											answer: '晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗',
											question: '不可以的，好多小伙伴半夜会饿醒醒来之后就去吃饭，吃饭回来',
											status: 1,
										},
										{
											answer: '晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗',
											question: '不可以的，好多小伙伴半夜会饿醒醒来之后就去吃饭，吃饭回来',
											status: 0,
										},
										{
											answer: '晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗',
											question: '不可以的，好多小伙伴半夜会饿醒醒来之后就去吃饭，吃饭回来',
											status: 1,
										},
										{
											answer: '晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗',
											question: '不可以的，好多小伙伴半夜会饿醒醒来之后就去吃饭，吃饭回来',
											status: 0,
										},
									]
								},

							],
						}
					}

					setTimeout(() => {
						if (res.code == 0) {
							for (let i = 0; i < res.data.list.length; i++) {
								res.data.list[i].listCur = res.data.list[i].list.slice(0, 2);
								res.data.list[i].shrink = true;
							}
							this.list = this.params.page == 1 ? res.data.list : [...this.list, ...res.data
								.list];
							this.total = res.data.total;
							this.blogger = res.data.blogger;
							this.loading = false;
						}
						uni.stopPullDownRefresh()
					}, 1000)
				} catch {
					this.loading = false;
					uni.stopPullDownRefresh()
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.ask-blogger {
		padding-bottom: 180rpx;

		.list-box {
			padding: 30rpx 24rpx 0;
			width: 100%;
			box-sizing: border-box;
		}

		.list-row-box {
			width: 100%;
			box-sizing: border-box;
			padding: 0 24rpx;
			background: #ffffff;
			border-radius: 30rpx;
			margin-bottom: 24rpx;
			transition: all 0.2s;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.row-box {
			padding: 30rpx 0;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			overflow: hidden;
			border-bottom: 2rpx solid #f9f9f9;

			.left {
				position: relative;
				margin-right: 20rpx;
				width: 72rpx;
				height: 72rpx;

				>image:nth-child(1) {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}

				>image:nth-child(2) {
					position: absolute;
					right: 0;
					bottom: 0;
					height: 40rpx;
					width: 40rpx;
				}
			}

			.middle {
				flex: 1;
				font-size: 26rpx;
				color: #121212;
				line-height: 36rpx;
				align-self: center;
			}

			.right {
				margin-left: 20rpx;
				width: 94rpx;
				height: 44rpx;
				line-height: 44rpx;
				text-align: center;
				background: #e2e2e2;
				border-radius: 12rpx;
				color: #707070;
				font-size: 20rpx;
				align-self: center;

			}

			.right-active {
				background: $theme;
				box-shadow: 0px 6px 12px 0px rgba(249, 71, 92, 0.26);
				color: #fff;
			}


		}
	}

	.shrink {
		padding: 22rpx 0 40rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			font-size: 28rpx;
			color: #707070;
			line-height: 40rpx;
			letter-spacing: 0.11px;
		}

		image {
			width: 40rpx;
			height: 40rpx;
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
		box-shadow: 0px 0px 12px 0px rgba(238, 239, 241, 0.50);

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

		.bottom-occupy {
			height: calc(constant(safe-area-inset-bottom) / 2);
			height: calc(env(safe-area-inset-bottom) / 2);
			width: 100%;
		}
	}
</style>