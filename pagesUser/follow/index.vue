<template>
	<view class="follow">
		<template v-if="list && list.length">
			<view class="list-box">
				<view class="list-row" v-for="(item, index) in list" :key="index">
					<view class="left">
						<image :src="item.avatar" mode="aspectFill" @click="handleNeighbour(params.userId)"></image>
						<text>{{item.name}}</text>
					</view>
					<button v-if="!params.userId || params.userId == USER_INFO.id" :loading="saveLoading && saveCur == index" :class="{'active': item.noFollow}" @click="handleSave(item, index)">
						{{item.noFollow ? '关注' : '取消关注'}}
					</button>
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
		name: 'follow',
		title: '关注列表',
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
			this.params.userId = params.userId;
			this.getList();
		},
		methods: {
			// 他人主页
			   handleNeighbour(id){
			    uni.navigateTo({
			     url: `/pagesActivity/neighbour/index?userId=${id}`
			    })
			   },
			// 关注
			async handleSave(row, index){
				this.saveLoading = true;
				this.saveCur = index;
				setTimeout(()=>{
					this.list[index].noFollow = !row.noFollow;
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
	.follow{
		min-height: 100vh;
		background: #ffffff;
		.list-box {
			padding: 0 24rpx;
			width: 100%;
			box-sizing: border-box;
			
		}
		.list-row {
			width: 100%;
			box-sizing: border-box;
			padding: 32rpx  0;
			border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
			display: flex;
			
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
			button {
				margin-left: 10rpx;
				align-self: center;
				width: 172rpx;
				height: 68rpx;
				line-height: 68rpx;
				border: 2rpx solid #dddddd;
				border-radius: 18rpx;
				text-align: center;
				font-size: 28rpx;
				color: #999;
				background-color: #fff;
			}
			.active {
				border: 2rpx solid $theme;
				color: $theme;
			}
			
		}
	}
	
	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}
</style>