<template>
	<view class="income">
		<block v-if="!loading">
			<view class="info-box">
				<view class="top">
					<view class="">
						可提现金额
					</view>
					<view class="">
						¥ <text>{{info.price}}</text>
					</view>
					<button @click="handleCashOut()">立即提现</button>
				</view>
				<view class="bottom">
					<view class="row">
						<view class="">
							今日收益
						</view>
						<view class="">
							{{info.priceDay}}
						</view>
					</view>
					<view class="row">
						<view class="">
							本月收益
						</view>
						<view class="">
							{{info.priceMonth}}
						</view>
					</view>
				</view>
			</view>

			<view class="list-box">
				<view class="title">
					资金明细
				</view>
				<template v-if="list && list.length">
					<view class="list">
						<view class="row" v-for="(item, index) in list" :key="index" @click="handleDetails(item)">
							<view class="">
								<text>{{item.title}}</text>
								<text :class="{'increase': Number(item.price) > 0}">{{item.price}}</text>
							</view>
							<view class="">
								<text>{{item.time}}</text>
								<text :class="{'text1': item.status == '审核中','text2': item.status == '已驳回' }">{{item.status}}</text>
							</view>
						</view>
					</view>
					<loading-tip :status=" listLoading || params.page *  params.limit < total" />
				</template>
				<template v-else>
					<empty />
				</template>
			</view>

		</block>
		<loadingBox type='pFixed' v-else />
		<view class="bottom-occupy"></view>
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
		name: 'income',
		title: '我的收益',
		components: {
			empty,
			loadingBox,
			loadingTip
		},
		data() {
			return {
				params: {
					page: 1,
					limit: 20,
				},
				total: 0,
				list: [],
				loading: true,
				info: {},
				listLoading: false,
				// status : 审核中、已驳回、已到账
			}
		},
		onReachBottom() {
			if (this.total <= this.params.page * this.params.limit || this.listLoading) return;
			this.params.page++;
			this.getList();
		},
		onPullDownRefresh() {
			this.getInfo();
			this.params.page = 1;
			this.getList();
		},
		onLoad() {
			this.getInfo();
			this.getList();
		},
		methods: {
			// 详情
			handleDetails(row){
				uni.navigateTo({
					url: `/pagesUser/income/details?id=${row.id}`
				})
			},
			// 提现
			handleCashOut(){
				uni.navigateTo({
					url: `/pagesUser/income/cashOut?price=${this.info.price}`
				})
			},
			
			// 获取数据
			async getList() {
				try {
					this.listLoading = true;
					// var res = await api.getList();
					let res = {
						code: 0,
						data: {
							total: 24,
							list: [
								{
									title: '提现',
									price: '-1',
									time: '2022-07-13 10:34:55',
									status: '审核中'
								},
								{
									title: '提现',
									price: '1',
									time: '2022-07-13 10:34:55',
									status: '审核中'
								},
								{
									title: 'XxxXxx商品收入Xxx商品收入Xxx商品收入Xxx商品收入',
									price: '2221.88',
									time: '2022-07-13 10:34:55',
									status: '审核中'
								},
								{
									title: '提现',
									price: '222.222',
									time: '2022-07-13 10:34:55',
									status: '已驳回'
								},
								{
									title: '提现',
									price: '2121',
									time: '2022-07-13 10:34:55',
									status: '已驳回'
								},
								{
									title: '提现',
									price: '2212',
									time: '2022-07-13 10:34:55',
									status: '已到账'
								}
							],
						}
					}

					setTimeout(() => {
						if (res.code == 0) {
							this.list = this.params.page == 1 ? res.data.list : [...this.list, ...res.data
								.list];
							this.total = res.data.total;
							this.listLoading = false;
						}
						uni.stopPullDownRefresh()
					}, 1000)
				} catch {
					this.listLoading = false;
					uni.stopPullDownRefresh()
				}
			},

			// 信息
			getInfo() {
				this.loading = true;
				setTimeout(() => {
					this.info = {
							title: '会员介绍与权益',
							price: '13245.00',
							priceDay: '2123.11',
							priceMonth: '12332.00'
						},
						this.loading = false;
				}, 1000)
			},

		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.income {
		width: 100%;
		box-sizing: border-box;
	}
	.info-box {
		padding: 30rpx 24rpx 40rpx;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		.top {
			box-sizing: border-box;
			padding: 0 24rpx;
			width: 100%;
			height: 220rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url(../static/img/income01.png);
			display: flex;
			flex-direction: column;
			justify-content: center;
			position: relative;
			color: #fff4f0;
			>view:nth-child(1) {
				line-height: 36rpx;
				font-size: 26rpx;
				font-family: PingFang HK, PingFang HK-Regular;
			}
			>view:nth-child(2) {
				margin-top: 30rpx;
				height: 50rpx;
				font-size: 28rpx;
				font-family: DIN Alternate, DIN Alternate-Bold;
				text {
					font-weight: 700;
					margin-left: 4rpx;
					font-size: 50rpx;
				}
				
			}
			button {
				position: absolute;
				right: 24rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 180rpx;
				text-align: center;
				height: 60rpx;
				line-height: 60rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 30rpx;
				font-size: 26rpx;
				color: #fff;
				backdrop-filter: blur(60rpx);
			}
		}
		.bottom {
			margin-top: 30rpx;
			display: flex;
			.row {
				flex: 1;
				height: 182rpx;
				background: #f6f7f8;
				border-radius: 30rpx;
				padding: 0 36rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;
				&:last-child{
					margin-left: 30rpx;
				}
				>view:nth-child(1){
					line-height: 36rpx;
					font-size: 26rpx;
					font-family: PingFang HK, PingFang HK-Regular;
					color: #4e5969;
				}
				>view:nth-child(2){
					margin-top: 16rpx;
					line-height: 50rpx;
					font-size: 42rpx;
					font-family: DIN Alternate, DIN Alternate-Bold;
					font-weight: 700;
					color: #121212;
				}
				
			}
		}
	}
	.list-box {
		margin-top: 24rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		background: #fff;
		.title {
			padding: 40rpx 0 10rpx;
			line-height:40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			color: #4e5968;
		}
		.row {
			padding: 30rpx 0;
			border-bottom: 2rpx solid #f2f2f2;
			>view {
				display: flex;
				align-items: center;
			}
			>view:nth-child(1){
				line-height: 42rpx;
				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				>text:nth-child(1){
					flex: 1;
					color: #1d2129;
				}
				>text:nth-child(1){
					margin-left: 10rpx;
					color: #333333;
				}
				.increase {
					color: #FC6245;
				}
			}
			>view:nth-child(2){
				margin-top: 16rpx;
				line-height: 36rpx;
				font-size: 26rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				>text:nth-child(1){
					flex: 1;
					color: #86909b;
				}
				>text:nth-child(1){
					color: #4e5969;
				}
				// 审核中
				.text1 {
					color: #20A862;
				}
				// 已驳回
				.text2 {
					color: #F9475C;
				}
			}
		}
	}

	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}
</style>