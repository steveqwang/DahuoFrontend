<template>
	<view class="">
		<block v-if="!loading">
			<view class="details">
				<view class="title">
					{{info.title}}
				</view>
				<view class="price">
					{{info.sign}}<text>¥{{info.price}}</text>
				</view>
				<view class="row">
					<text>当前状态：</text>
					<text>{{info.state}}</text>
				</view>
				<view class="row">
					<text>时间：</text>
					<text>{{info.time}}</text>
				</view>
				<view class="row">
					<text>内容：</text>
					<text>{{info.desc}}</text>
				</view>
				<view class="row">
					<text>交易单号：</text>
					<text>{{info.code}}</text>
				</view>
			</view>
		</block>
		<loadingBox type='pFixed' v-else />
	</view>
</template>

<script>
	import {
		parseTime
	} from '@/utils/global.js'
	import {
		loadingBox
	} from '@/components/loading-box.vue';
	export default {
		name: 'details',
		title: '收益详情',
		components: {
			loadingBox
		},
		data() {
			return {
				info: {},
				loading: false,
			}
		},
		onLoad(params) {
			this.getInfo(params.id);
		},
		methods: {
			// 信息
			getInfo() {
				this.loading = true;
				setTimeout(() => {
					this.info = {
							title: '分销收益',
							price: '13245.00',
							state: '支付成功',
							time: '2024年4月30日 12:00:00',
							code: '1234567890-',
							sign: '+',
							desc: '通过xx消费100元获得通过xx消费100元获得通过xx消费100元获得通过xx消费100元获得',
						},
						wx.setTopBarText({
						  text: this.info.title
						});
						this.loading = false;
				}, 1000)
			},

		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.details{
		margin: 32rpx 24rpx 0;
		width: 702rpx;
		background: #ffffff;
		border-radius: 30rpx;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		.title {
			line-height: 42rpx;
			font-size: 30rpx;
			font-family: PingFang HK, PingFang HK-Regular;
			color: #4e5969;
			text-align: center;
		}
		.price {
			margin-top: 28rpx;
			padding-bottom: 58rpx;
			border-bottom: 2rpx solid #f2f2f2;
			line-height: 50rpx;
			font-size: 36rpx;
			font-family: DIN Alternate, DIN Alternate-Bold;
			text-align: center;
			color: #121212;
			text {
				font-weight: 700;
				margin-left: 4rpx;
				font-size: 42rpx;
			}
		}
		.row {
			margin-top: 40rpx;
			display: flex;
			line-height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			>text:nth-child(1) {
				width: 210rpx;
				color: #86909b;
			}
			>text:nth-child(2) {
				flex: 1;
				color: #1D2129;
			}
		}
	}
</style>