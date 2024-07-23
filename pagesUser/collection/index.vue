<template>
	<view class="collection">
		<template v-if="list && list.length">
			<view class="info-row" v-for="(item,index) in list " :key="index" @click="handleDetails(item.id)" >
				<info-row :info="item" :key="index" @evaluate="onOpenEvaluate" @changeCollect="changeCollect"/>
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
		<evaluate ref="evaluate" @change="onChangeEvaluate"/>
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
		infoRow
	} from '@/components/info-row2.vue';
	import {
		evaluate
	} from '@/components/evaluate.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'collection',
		title: '我的收藏',
		components: {
			empty,
			loadingBox,
			loadingTip,
			infoRow,
			evaluate
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
		onLoad() {
			this.getList();
		},
		methods: {
			// 详情
			handleDetails(id) {
				uni.navigateTo({
					url: `/pagesActivity/activityDetails/index?id=${id}`
				})
			},
			// 收藏
			changeCollect(row) {
				this.list[row.index]['isCollect'] = row.isCollect;
				this.list[row.index]['collect'] = row.collect;
			},
			// 评价 - 打开
			onOpenEvaluate(row){
				this.$refs.evaluate.init(row);
			},
			// 评价 - 完成
			onChangeEvaluate(index){
				this.list[index].isEvaluate = 1;
				this.$forceUpdate()
			},
			// 获取数据
			async getList() {
				try {
					this.loading = true;
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
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
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
								res.data.list[i]['index'] = (this.params.page - 1) * this
									.params.limit + i;
							}
							this.list = this.params.page == 1 ? res.data.list : [...this.list, ...res.data.list];
							this.total = res.data.total;
						}
						this.loading = false;
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
	.collection{
		width: 100%;
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		background: #ffffff;
		.info-row {
			margin-bottom: 24rpx;
		}
	}
	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}
</style>