<template>
	<view class="participants">
		<template v-if="list && list.length">
			<view class="list-box">
				<view class="list-row" v-for="(item, index) in list" :key="index">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<text>{{item.name}}</text>
					<image class="gender" src="../static/icon/gender01.png" mode="scaleToFill" v-if="item.gender == 1"></image>
					<image class="gender" src="../static/icon/gender02.png" mode="scaleToFill" v-else-if="item.gender == 2"></image>
					<view class="icon" v-if="item.isPromoter">
						发起人
					</view>
				</view>
			</view>
			<loading-tip :status=" loading || params.page *  params.limit < total" />
		</template>
		<template v-else-if="loading">
			<loadingBox type='pFixed'/>
		</template>
		<template v-else>
			<empty type='pFixed'/>
		</template>
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
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'participants',
		title: '评价列表',
		components: {
			empty,
			loadingBox,
			loadingTip,
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
				loading: true,
			}
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		onReachBottom() {
			if(this.total <= this.params.page * this.params.limit || this.loading) return;
			 this.params.page++;
			this.getList();
		},
		onPullDownRefresh() {
			this.params.page = 1;
			this.getList();
		},
		onLoad(params) {
			this.params.id = params.id;
			this.getList();
		},
		methods: {
			// 获取数据
			async getList() {
				try {
					this.loading = true;
					// var res = await api.getList();
					let res = {
						code: 0,
						data: {
							total: 24,
							
							list: [
								{
									isPromoter: true,
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									gender: 1
								},
								{
									name: '牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆1',
									avatar: 'https://img1.baidu.com/it/u=1750447120,4148538829&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=331',
									gender: 1
								},
								{
									name: '牛大胆2',
									avatar: 'https://img2.baidu.com/it/u=523006743,3482462414&fm=253&fmt=auto&app=120&f=JPEG?w=888&h=500',
									gender: 2
								},
								{
									name: '牛大胆3',
									avatar: 'https://img2.baidu.com/it/u=523006743,3482462414&fm=253&fmt=auto&app=120&f=JPEG?w=888&h=500',
									gender: 2
								},
								{
									name: '牛大胆4',
									avatar: 'https://img2.baidu.com/it/u=443161650,959310912&fm=253&fmt=auto&app=138&f=JPEG?w=888&h=500',
									gender: 2
								},
								{
									name: '牛大胆5',
									avatar: 'https://img2.baidu.com/it/u=443161650,959310912&fm=253&fmt=auto&app=138&f=JPEG?w=888&h=500',
									gender: 1
								},
								{
									name: '牛大胆6',
									avatar: 'https://img2.baidu.com/it/u=443161650,959310912&fm=253&fmt=auto&app=138&f=JPEG?w=888&h=500',
									gender: 2
								},
								{
									name: '牛大胆7',
									avatar: 'https://img0.baidu.com/it/u=722763052,2630651305&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
									gender: 1
								},
							],
						}
					}
					
					setTimeout(() => {
						if (res.code == 0) {
							this.list = this.params.page == 1 ?  res.data.list : [...this.list, ...res.data.list];
							this.total = res.data.total;
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
	.participants{
		min-height: 100vh;
		background: #ffffff;
		.list-box {
			padding: 30rpx 24rpx 0;
			width: 100%;
			box-sizing: border-box;
		}
		.list-row {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 24rpx;
			background: #ffffff;
			margin-bottom: 24rpx;
			transition: all 0.2s;
			border-radius: 30rpx;
			box-shadow: 0px 2rpx 30rpx 0px rgba(195,195,195,0.29); 
			display: flex;
			align-items: center;
			overflow: hidden;
			position: relative;
			&:last-child {
				margin-bottom: 0;
			}
			.avatar{
				flex-shrink: 0;
				width: 92rpx;
				height: 92rpx;
				border-radius: 46rpx;
			}
			>text {
				margin-left: 26rpx;
				align-self: center;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 40rpx;
			}
			.gender{
				flex-shrink: 0;
				margin-left: 30rpx;
				width: 40rpx;
				height: 40rpx;
			}
			.icon {
				position: absolute;
				right: 0;
				top: 0;
				width: 150rpx;
				height: 60rpx;
				background: #f9475c;
				border-radius: 0px 20px 0px 20px;;
				font-size: 24rpx;
				color: #ffffff;
				line-height: 60rpx;
				text-align: center;
			}
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
		box-shadow: 0px 0px 12px 0px rgba(238,239,241,0.50); 
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