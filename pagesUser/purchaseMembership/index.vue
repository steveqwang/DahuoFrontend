<template>
	<view class="purchase-membership">
		<view class="list-box">
			<scroll-view class="scroll-view" scroll-with-animation scroll-x="true">
				<view class="row-box">
					<view class="row" :class="{'row-active': index == active}" v-for="(item, index) in list"
						:key="index" @click="onChange(item, index)">
						<view class="title">
							{{item.title}}
						</view>
						<view class="price">
							¥<text>{{item.price}}</text>
						</view>
						<view class="original-price">
							<text>{{item.originalPrice}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="info-box">
			<view class="title">
				{{info.title}}
			</view>
			<parse :html="info.content" class="content" />
		</view>
		<view class="bottom-box">
			<view class="agreement" :class='{shaking:isShaking }' @click="isCheckbox = !isCheckbox">
				<image src="@/static/icon/radio01.png" mode="aspectFit" v-if="isCheckbox"></image>
				<text v-else class="icon"></text>
				<text>开通即代表同意并阅读 </text>
				<text class="file" @click.stop="handleDetails(fileList[0])">{{fileList[0].lable}}</text>
			</view>
			<button :loading="saveLoading" @click="handleSave()">支付</button>
			<view class="bottom-occupy"></view>
		</view>
		<view class="bottom-occupy"></view>
	</view>
</template>

<script>
	import parse from '@/components/u-parse/u-parse.vue';
	export default {
		name: 'purchaseMembership',
		title: '购买会员',
		components: {
			parse
		},
		data() {
			return {
				active: 0,
				list: [],
				info: {
					title: '会员介绍与权益',
					content: '',
				},
				fileList: [{
					lable: '《平台支付协》',
					id: 'ptzfxy'
				}, ],
				saveLoading: false,
				isShaking: false,
				isCheckbox: false,
			}
		},
		methods: {
			// 更改
			onChange(item, index) {
				this.active = index;
			},
			// 详情
			handleDetails(row) {
				uni.navigateTo({
					url: `/pagesActivity/fileDetails/index?id=${row.id}&type=agreement&title=${row.lable}`
				})
			},
			// 抖动
			onShaking() {
				this.isShaking = true
				setTimeout(() => {
					this.isShaking = false
				}, 2000)
				return
			},
			// 提交
			handleSave() {
				if (!this.isCheckbox) return this.onShaking();
				this.saveLoading = true;
				console.log(this.active)
				setTimeout(() => {
					this.onPay()
				}, 500)
			},
			async onPay(order_id) {
				// var result = await api.setPay({
				// 	order_id
				// })
				// if (result.code == 0) {
				// 	uni.requestPayment({
				// 		'provider': 'wxpay',
				// 		...result.data,
				// 		success: (res1) => {
							setTimeout(()=>{
								uni.showToast({
									title: `支付成功`,
									icon:'none'
								})
								uni.switchTab({
									url: '/pages/my/index'
								});
							},600)
						// },
						// complete: () => {
							this.saveLoading = false;
					// 	},
					// 	fail: (err) => {
					// 		uni.showToast({
					// 			title: '支付失败',
					// 			icon: 'none'
					// 		});
					// 	}
					// });
				// }
			},
			// 获取数据
			async getList() {
				try {
					this.loading = true;
					// var res = await api.getList();
					let res = {
						code: 0,
						data: [{
								title: '1个月vip',
								price: '99.99',
								originalPrice: '149.99',
								id: 1
							},
							{
								title: '6个月vip',
								price: '599.99',
								originalPrice: '799',
								id: 2,
							},
							{
								title: '一年vip',
								price: '1000',
								originalPrice: '1299.99',
								id: 3,
							},
							{
									title: '1个月vip',
									price: '99.99',
									originalPrice: '149.99',
									id: 1
								},
								{
									title: '6个月vip',
									price: '599.99',
									originalPrice: '799',
									id: 2,
								},
								{
									title: '一年vip',
									price: '1000',
									originalPrice: '1299.99',
									id: 3,
								},
							
						]
					}

					setTimeout(() => {
						if (res.code == 0) {
							this.list = res.data;
						}
					}, 1000)

				} catch {
					this.loading = false;
				}
			},
			getInfo() {
				let content =
					'<div>工会，或称劳工总会、工人联合会。工会原意是指基于共同利益而自发组织的社会团体。这个共同利益团体诸如为同一雇主工作的员工，在某一产业领域的个人。工会组织成立的主要意图，可以与雇主谈判工资薪水、工作时限和工作条件等等。</div><div>工会，或称劳工总会、工人联合会。工会原意是指基于共同利益而自发组织的社会团体。这个共同利益团体诸如为同一雇主工作的员工，在某一产业领域的个人。工会组织成立的主要意图，可以与雇主谈判工资薪水、工作时限和工作条件等等。</div>'
				this.info.content = content;
			},

		},
		onLoad() {
			this.getList();
			this.getInfo();
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.purchase-membership {
		width: 100%;
		padding-bottom: 260rpx;
		box-sizing: border-box;
	}

	.list-box {
		margin: 24rpx 0 ;
		min-width: 100%;
		background: #ffffff;
		height: 248rpx;
		.row-box {
			display: flex;
			padding: 24rpx;
			box-sizing: border-box;
		}

		.row-active {
			transform: scale(1.1);
		}

		.row {
			flex-shrink: 0;
			width: 218rpx;
			height: 200rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			margin-right: 24rpx;
			&:last-child {
				margin-right: 0;
			}

			.title {
				padding-top: 30rpx;
				line-height: 42rpx;
				font-size: 30rpx;
				font-family: PingFang HK, PingFang HK-Regular;
				font-weight: 400;
				text-align: center;
			}

			.price {
				margin-top: 20rpx;
				line-height: 48rpx;
				font-family: DIN Alternate, DIN Alternate-Bold;
				font-weight: 700;
				font-size: 24rpx;
				text-align: center;

				text {
					margin-left: 10rpx;
					font-size: 40rpx;
				}
			}

			.original-price {
				margin-top: 12rpx;
				line-height: 34rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-decoration: line-through;
				text-align: center;
			}
		}

		.row:nth-child(1) {
			background-image: url(../static/img/member01.png);
			color: #DD8A4E;
		}

		.row:nth-child(2) {
			background-image: url(../static/img/member02.png);
			color: #ededed;

		}

		.row:nth-child(3) {
			background-image: url(../static/img/member03.png);
			color: #FFD7BC
		}
		.row:nth-child(n+4){
			background-color: rgba(0, 0, 0, 0.1);
			border-radius: 10rpx;
		}

		.scroll-view ::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
			display: none;
		}
	}

	.info-box {
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		width: 100%;
		background-color: #fff;

		.title {
			line-height: 42rpx;
			font-size: 30rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			font-weight: 500;
			text-align: left;
			color: #1d2129;
			padding-left: 18rpx;
			position: relative;
			margin-bottom: 24rpx;

			&::before {
				position: absolute;
				z-index: 1;
				content: '';
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 6rpx;
				height: 36rpx;
				background: $theme;
				border-radius: 4rpx;
			}
		}

		.content {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			color: #000000;
			line-height: 46rpx;
			word-break: break-all;
			height: auto;
			overflow: hidden;
		}
	}

	.agreement {
		padding-bottom: 24rpx;
		border-bottom: 2rpx solid #f7f7f8;

		image {
			width: 32rpx;
			height: 32rpx;
			vertical-align: middle;
			margin-right: 14rpx;
		}

		.icon {
			vertical-align: middle;
			display: inline-block;
			width: 32rpx;
			height: 32rpx;
			background: #ffffff;
			border: 2rpx solid #999;
			box-sizing: border-box;
			margin-right: 14rpx;
			border-radius: 8rpx;
		}

		text {
			vertical-align: middle;
			line-height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
		}

		.file {
			display: inline;
			color: $theme;
		}
	}

	button {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background: $uni-button-bg;
		border-radius: 30rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #ffffff;
	}

	.bottom-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0px 0px 12px 0px rgba(238, 239, 241, 0.50);

		.bottom-occupy {
			height: calc(constant(safe-area-inset-bottom) / 2);
			height: calc(env(safe-area-inset-bottom) / 2);
			width: 100%;
		}
	}

	.shaking {
		animation: shakeX 0.6s;
	}
</style>