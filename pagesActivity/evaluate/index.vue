<template>
	<view class="evaluate">
		<template v-if="list && list.length">
			<view class="list-box">
				<view class="list-row" v-for="(item, index) in list" :key="index">
					<evaluate :row="item"/>
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
		<!-- 只有参与者 未评价的 -->
		<view class="bottom-box" @click="handleEvaluate()">
			<button>我也要评价</button>
			<view class="bottom-occupy"></view>
		</view>
		<evaluate-box ref="evaluateBox" @change="onChangeEvaluate"/>
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
		evaluateBox
	} from '@/components/evaluate.vue';
	import {
		evaluate
	} from '../components/evaluate.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'evaluate',
		title: '评价列表',
		components: {
			empty,
			loadingBox,
			loadingTip,
			evaluateBox,
			evaluate,
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
			// 收缩
			handleShrink(row){
				row.shrink = !row.shrink;
				if(row.shrink){
					row.listCur = row.list.slice(0,2);
				}else {
					row.listCur = row.list;
				}
			},
			// 评论
			handleEvaluate(){
				this.$refs.evaluateBox.init({id: this.params.id});
			},
			// 评论 完成
			onChangeEvaluate(params) {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				 });
				this.params.page = 1;
				this.getList();
				
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
									score: 4,
									text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 4,
									text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 4,
									text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 4,
									text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 1,
									text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 0,
									text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 5,
									text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
								},
								{
									name: '牛大胆',
									avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
									score: 4,
									text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
								}
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
	.evaluate{
		padding-bottom: 180rpx;
		.list-box {
			padding: 30rpx 0;
			width: 100%;
			box-sizing: border-box;
		}
		.list-row {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 24rpx;
			background: #ffffff;
			margin-bottom: 16rpx;
			transition: all 0.2s;
			&:last-child {
				margin-bottom: 0;
			}
			::v-deep .evaluate{
				.name {
					color: #1d2129;
				}
				.text {
					color: #4e5969;
				}
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