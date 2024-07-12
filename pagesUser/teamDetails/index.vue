<template>
	<view class="team-details">
		<view class="list-box">
			<view class="list-row">
				<view class="left">
					<image :src="USER_INFO.avatar" mode="aspectFill"></image>
					<text>{{USER_INFO.name}}</text>
				</view>
				<view class="right">
					{{USER_INFO.grade}}团长
				</view>
			</view>
		</view>
		<template v-if="list && list.length">
			<view class="list-box">
				<view class="title">
					我的下级（{{total}}）
				</view>
				<view class="list-row" v-for="(item, index) in list" :key="index">
					<view class="left">
						<image :src="item.avatar" mode="aspectFill"></image>
						<text>{{item.name}}</text>
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
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'teamDetails',
		title: '团队明细',
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
					limit: 20,
				},
				total: 0,
				list: [],
				loading: true,
				saveLoading: false,
				saveCur: '',
			}
		},
		computed: {
			...mapGetters(['SYSTEMP_INFO', 'USER_INFO'])
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
		onLoad() {
			this.getList();
		},
		methods: {
			// 关注
			async handleSave(row, index){
				this.saveLoading = true;
				this.saveCur = index;
				setTimeout(()=>{
					this.list[index].isFollow = !row.isFollow;
					this.saveLoading = false;
				},600)
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
							list: [
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 1,
								},
								{
									name: '牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆1牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 0,
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 5,
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
								},
								{
									name: '牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆牛大胆1牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 0,
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 5,
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
	.team-details{
		box-sizing: border-box;
		.list-box {
			padding: 0 24rpx;
			background-color: #fff;
			.title {
				margin-top: 24rpx;
				padding: 40rpx 0 10rpx;
				line-height: 40px;
				font-size: 28rpx;
				font-family: PingFang HK, PingFang HK-Medium;
				font-weight: 500;
				text-align: left;
				color: #121212;
			}
		}
		.list-row {
			width: 100%;
			box-sizing: border-box;
			padding: 32rpx  0;
			border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
			display: flex;
			&:last-child{
				border-bottom: none;
			}
			.left {
				flex: 1;
				display: flex;
				image {
					width: 92rpx;
					height: 92rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				text {
					align-self: center;
					flex: 1;
					line-height: 40rpx;
					font-size: 28rpx;
					font-family: PingFang HK, PingFang HK-Medium;
					font-weight: 500;
				}
			}
			.right {
				margin-left: 10rpx;
				padding: 0 12rpx;
				box-sizing: border-box;
				background: #3e3d3c;
				border-radius: 4rpx;
				height: 36rpx;
				font-size: 20rpx;
				font-family: PingFang HK, PingFang HK-Medium;
				font-weight: 500;
				color: #fff2e8;
				line-height: 36rpx;
			}
			
		}
	}
	
	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}
</style>