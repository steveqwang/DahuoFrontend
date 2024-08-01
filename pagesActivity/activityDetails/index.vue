<template>
	<view class="page">
		<template v-if='!loading'>
			<view class="top-box" :style="{'background-image': USER_INFO ? USER_INFO.img : ''}">
				<view class="menu-occupy-box" :style="{'height':  menuOccupyStyle.height,
										'--top': menuOccupyStyle.top, 
										'background': menuOccupyStyle.background,
										'backdrop-filter': menuOccupyStyle.backdropFilter,
										'-webkit-backdrop-filter': menuOccupyStyle.backdropFilter}">
					<view class="menu-box" :style="{'--height': menuButtonInfo.height + 'px'}" @click="handleBack()">
						<image src="@/static/icon/left02.png" mode="aspectFill" v-if="menuOccupyStyle.scrollTop > 50">
						</image>
						<image src="@/static/icon/left01.png" mode="aspectFill" v-else></image>

					</view>
				</view>
				<!-- 占位 -->
				<view class="swiper-box">
					<swiper :current="infoManage.imageActive" @change="changeImage" :swipe-threshold="50">
						<block v-for="(item,index) in info.images " :key="index">
							<swiper-item>
								<image :src="item" mode="aspectFill"></image>
							</swiper-item>
						</block>
					</swiper>
					<view class="indicator-dots">
						<text v-for="(item,index) in info.images " :key="index"
							:class="{active: index == infoManage.imageActive}"></text>
					</view>
					<view class="basis-info">
						<view class="title">
							{{info.title}}
						</view>
						<view class="other">
							<view class="left">
								¥
								<text>{{info.price}}</text>
								/人
							</view>
							<view class="right">
								<view class="">
									<image src="@/static/icon/fire02.png" mode="scaleToFill"></image>
									<text>{{info.collect || 0}}</text>
								</view>
								<view class="">
									浏览量：{{info.browse || 0}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="time-location-box">
				<view class="time-box">
					<image class="icon" src="@/static/icon/time03.png" mode="scaleToFill"></image>
					<text class="text">{{info.time}}</text>
				</view>
				<view class="location-box">
					<view>
						<image class="icon" src="@/static/icon/location03.png" mode="scaleToFill"></image>
						<view class="">
							<text class="text">{{info.location}}</text>
							<text>{{info.locationDesc}}</text>
						</view>
					</view>
					<image src="@/static/img/location01.png" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="time-location-occupy-box">
				<view class="">
					<view class="personnel-box">
						<view class="top">
							<image :src="info.avatar" mode="aspectFill" @click="handleNeighbour(info.id)"></image>
							<view class="">
								<text>发起人</text>
								<text>{{info.userName}}</text>
							</view>
						</view>
						<view class="bottom">
							<view class="">参与人</view>
							<view class="">
								<view class="" :style="{'--left': info.numberExists > 10 ? '-46rpx' : '-28rpx'  }">
									<block v-for="(item,index) in info.participants" :key="index"
										v-if="info.participants && info.participants.length">
										<image :src="item.avatar" mode="aspectFill" @click="handleNeighbour(item.id)"></image>
									</block>
								</view>
								<view class="" @click="handleJump(`/pagesActivity/participants/index?id=${info.id}`)">
									<view class="">
										已报名 <text
											class="active">{{info.numberExists}}/</text><text>{{info.numberTotle}}</text>
									</view>
									<image src="../../static/icon/right01.png" mode="scaleToFill"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="particulars-all-box">
				<view class="particulars-box">
					<view class="title">
						<view class="title-left">
							<image src="../../static/img/title01.png" mode="scaleToFill"></image>
							<text>活动简介</text>
						</view>
					</view>
					<view class="text introduction" :style="!infoManage.introductionShrink ? 'max-height:inherit;' :''">
						1{{info.introduction}}
					</view>
					<view class="shrink" @click="infoManage.introductionShrink = !infoManage.introductionShrink">
						<template v-if="infoManage.introductionShrink">
							<text>展开</text>
							<image src="@/static/icon/down02.png" mode="scaleToFill"></image>
						</template>
						<template v-else>
							<text>收起</text>
							<image src="@/static/icon/top01.png" mode="scaleToFill"></image>
						</template>
					</view>
				</view>
				<view class="particulars-box" v-if="info.issue && info.issue.length">
					<view class="title">
						<view class="title-left">
							<image src="../../static/img/title01.png" mode="scaleToFill"></image>
							<text>问博主</text>
						</view>
						<view class="title-right" @click="handleJump('/pagesActivity/askBlogger/index')">
							<text>全部</text>
							<image src="@/static/icon/right02.png" mode="scaleToFill"></image>
						</view>
					</view>
					<view class="issue">
						<view class="" v-for="(item, index) in info.issue.slice(0,2)" :key="index">
							<image src="../static/img/issue01.png" mode="scaleToFill"></image>
							<text class="text">{{item.title}}</text>
							<text class="status" v-if="item.status == 1">已回复</text>
						</view>
					</view>
				</view>
				<view class="particulars-box" v-if="info.evaluate && info.evaluate.length">
					<view class="title">
						<view class="title-left">
							<image src="../../static/img/title01.png" mode="scaleToFill"></image>
							<text>活动评价</text>
						</view>
						<view class="title-right" @click="handleJump('/pagesActivity/evaluate/index')">
							<text>全部</text> 
							<image src="@/static/icon/right02.png" mode="scaleToFill"></image>
						</view>
					</view>
					<template v-if="info.evaluate && info.evaluate.length">
						<evaluate :row='info.evaluate[0]' class="evaluate"/>
					</template>
				</view>
			</view>
			<view class="recommend" v-if="params.status != 'preview'">
				<view class="title">
					<image src="../../static/image/title01.png" mode="scaleToFill"></image>
					<text>推荐活动</text>
				</view>
				<template v-if="recommend && recommend.length">
					<swiper :current="infoManage.recommendActive" @change="changerRecommend" :duration="400"
						previous-margin="60rpx" next-margin="60rpx">
						<swiper-item v-for="(item,index) in recommend" :key="index">
							<view class="info-row-box" 
								:class="infoManage.recommendActive == index ? 'info-row-active' : '' ">
								<info-row :info="item" :key="item.id" height="824rpx" @changeCollect="changeCollect"/>
							</view>
						</swiper-item>
					</swiper>
				</template>
				<empty class="empty" v-else />
			</view>
			<template v-if="params.status != 'preview'">
				<view class="tip-box tip-box1">
					<image src="../static/icon/tip01.png" mode="scaleToFill"></image>
					Tips：<text>{{info.timeEnd}} </text> 前可取消报名
				</view>
				<!-- 浮动 -->
				<view class="tip-box" :class="infoManage.tip ? 'tip-box-active': ''">
					<image src="../static/icon/tip01.png" mode="scaleToFill"></image>
					Tips：<text>{{info.timeEnd}} </text> 前可取消报名
				</view>
				<view class="bottom-box" >
					<view class="">
						<view class="left">
							<view class="row" @click="handleShare()">
								<image src="../static/icon/share01.png" mode="scaleToFill"></image>
								<text>分享</text>
							</view>
							<view class="row">
								<image src="../static/icon/chat01.png" mode="scaleToFill"></image>
								<text>进群</text>
							</view>
						</view>
						<view class="right">
							<view class="row" @click="handleMoreFeatures()">
								<image src="../static/icon/menu03.png" mode="scaleToFill" ></image>
								<text>更多</text>
							</view>
							<button :loading="saveLoading" @click="handleJump(`/pagesActivity/activityRegistration/index?id=${info.id}`)">立即报名</button>
						</view>
					</view>
					<view class="bottom-occupy"></view>
				</view>
				
			</template>
		</template>
		<template v-else>
			<loading-box type='pFixed' />
		</template>
		<more-features ref="moreFeatures" @chang="changeMoreFeatures"/>
		<share-box ref="shareBox"/>
	</view>
</template>

<script>
	import * as api from '@/api/basics.js';
	import {
		infoRow
	} from '@/components/info-row.vue';
	import {
		evaluate
	} from '../components/evaluate.vue';
	import {
		moreFeatures
	} from '../components/more-features.vue';
	import {
		shareBox
	} from '../components/share-box.vue';
	import {
		loadingBox
	} from '@/components/loading-box.vue';
	import {
		empty
	} from '@/components/empty.vue';
	import {
		parseTime
	} from '@/utils/global.js'
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'activityDetails',
		title: '活动详情',
		components: {
			loadingBox,
			empty,
			infoRow,
			evaluate,
			moreFeatures,
			shareBox
		},
		data() {
			return {
				menuOccupyStyle: {
					'height': '62px',
					'top': '20px',
					'background': 'transparent',
					'backdrop-filter': 'blur(0px)',
					'scrollTop': 0,
					'heightPure': '62',
				},
				menuButtonInfo: {},
				params: {
					status: 'common', // common 、preview
				},
				loading: true,
				info: {
					images: [],
				},
				recommend: [],
				infoManage: {
					imageActive: 0,
					introductionShrink: true,
					tip: false,
					recommendActive: 1,
				},
				saveLoading: false,
				

			}
		},
		filters: {
			parseTime(date) {
				return date ? parseTime(date, '{y}.{m}.{d}') : '选择时间';
			},
			parseNume(num) {
				return num > 999 ? '999+' : num;
			},
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		methods: {
			changeImage(event) {
				this.infoManage.imageActive = event.detail.current;
			},
			// 他人主页
			handleNeighbour(id){
				uni.navigateTo({
					url: `/pagesActivity/neighbour/index?userId=${id}`
				})
			},
			// 收藏
			changeCollect(row) {
				this.$set(this.recommend[row.index], 'isCollect',row.isCollect);
				this.$set(this.recommend[row.index], 'collect',row.collect);
			},
			// 询问
			changerRecommend(event) {
				this.infoManage.recommendActive = event.detail.current;
			},
			// 更多
			changeMoreFeatures() {
				this.getInfo();
			},
			// 更多-展示
			handleMoreFeatures() {
				// isSelf  isParticipants prohibitTemplates 
				this.$refs.moreFeatures.init(this.info );
			},
			// 分享
			handleShare() {
				this.$refs.shareBox.init({isSelf: true});
			},
			// 回退
			handleBack() {
				uni.navigateBack({
					delta: 1,
				});
			},
			// 跳转
			handleJump(url) {
				uni.navigateTo({
					url
				});
			},
			// 获取信息
			async getInfo() {
				// var res = await api.getList();
				// 类型
				this.loading = true;
				var res = {
					code: 0,
					data: {
						isParticipants: 1,
						publicActivities: 1,
						prohibitTemplates: 1,
						id: '01',
						title: '活动标题活活动标题动标题标题动标题标动标题标活动标题活活动标题动标题活动标题活活动标题动标题标题动标题标动标题标活动标题活活动标题动标题1',
						price: '29.9',
						timeEnd: '2024-12-1212:99',
						collect: 500,
						browse: 1342,
						numberTotle: 12,
						numberExists: 4,
						images: [
							'http://img1.baidu.com/it/u=3203226843,2454860967&fm=253&app=138&f=JPEG?w=800&h=1200',
							'https://img0.baidu.com/it/u=1023074003,1080090203&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200',
							'https://img2.baidu.com/it/u=2206415878,3547010889&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500',
							'http://img1.baidu.com/it/u=4238889741,932490986&fm=253&app=138&f=JPEG?w=800&h=1200',
							'https://img1.baidu.com/it/u=3854066936,1097844278&fm=253&fmt=auto&app=120&f=JPEG?w=738&h=475',
							'https://img0.baidu.com/it/u=2511813939,661783897&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
							'https://img0.baidu.com/it/u=219156021,2695706187&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=260',
						],
						time: '周日 5.12 12:00',
						location: '搭火俱乐部',
						locationDesc: '北京市朝阳区朝阳北路朝阳镇北京市朝阳区朝阳北路朝阳镇北京市朝阳区朝阳北路朝阳镇',
						avatar: 'https://img2.baidu.com/it/u=1558538035,2795382626&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
						userName: '江湖人',
						introduction: '活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介   活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简999999介',
						issue: [{
								title: '晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗晚上可以晚一点过去吗',
								status: 1,
							},
							{
								title: '晚上可以晚一点过去吗',
							},
							{
								title: '晚上可以晚一点过去吗',
							}
						],
						evaluate: [{
							name: '牛大胆',
							avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
							score: 4,
							text: '您的评价：野茶的香气很浓郁，很醇厚，味道回甘很快汤色红橙金黄，艳而不俗，清澈明亮；品啜之，鲜醇甘活爽口，齿颊留香；再观叶底',
						}],
						participants: [{
								avatar: 'https://img1.baidu.com/it/u=3166680280,4055130875&fm=253&fmt=auto&app=120&f=JPEG?w=549&h=500'
							},
							{
								avatar: 'https://img2.baidu.com/it/u=4288881837,4089529706&fm=253&fmt=auto&app=120&f=JPEG?w=380&h=380'
							},
							{
								avatar: 'https://img1.baidu.com/it/u=3961734406,2765061918&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=500'
							},
							{
								avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300'
							},
							{
								avatar: 'https://img2.baidu.com/it/u=3907531714,2221945917&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
							},
							{
								avatar: 'https://img1.baidu.com/it/u=3166680280,4055130875&fm=253&fmt=auto&app=120&f=JPEG?w=549&h=500'
							},
							{
								avatar: 'https://img2.baidu.com/it/u=4288881837,4089529706&fm=253&fmt=auto&app=120&f=JPEG?w=380&h=380'
							},
							{
								avatar: 'https://img1.baidu.com/it/u=3961734406,2765061918&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=500'
							},
							{
								avatar: 'https://img0.baidu.com/it/u=4099860652,1710363109&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300'
							},
						],


					}
				}
				setTimeout(() => {
					if (res.code == 0) {
						this.info = res.data;
					}
					this.loading = false;
					this.infoManage.tip = true;
				}, 1000);


			},
			// 推荐
			async getRecommend() {
				try {
					// var res = await api.getList();
					let res = {
						code: 0,
						data: {
							list: [{
									isParticipants: true,
									prohibitTemplates: true,
									id: '1',
									userName: '发起人姓名1',
									title: '1标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://img2.baidu.com/it/u=3907531714,2221945917&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
									userIcon: 'https://img1.baidu.com/it/u=4014992589,2495811998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083'
								},
								{
									id: '2',
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
									id: '3',
									userName: '发起人姓名3发起人姓名3姓名3发起人姓姓名3发起人姓姓名3发起人姓姓名3发起人姓3',
									title: '3标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'http://img1.baidu.com/it/u=3203226843,2454860967&fm=253&app=138&f=JPEG?w=800&h=1200',
									userIcon: 'https://img1.baidu.com/it/u=4014992589,2495811998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083'
								},
								{
									id: '4',
									userName: '发起人姓名4',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'http://img1.baidu.com/it/u=3203226843,2454860967&fm=253&app=138&f=JPEG?w=800&h=1200',
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
								},
								{
									id: '5',
									userName: '发起人姓名5',
									title: '标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									collect: 500,
									image: 'https://img2.baidu.com/it/u=3907531714,2221945917&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
									userIcon: 'https://img0.baidu.com/it/u=2258179878,552872101&fm=253&fmt=auto&app=138&f=JPEG?w=236&h=334'
								},
								{
									id: '6',
									userName: '发起人姓名6',
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
					if (res.code == 0) {
						for(let i = 0; i < res.data.list.length; i++){
							res.data.list[i]['index'] = i
						}
						this.recommend = res.data.list;
						conspole.log(this.recommend, 'this.recommend')
					}
				} catch {}
			},

		},
		onLoad(params) {
			if(params.status == 'preview'){
				this.info = JSON.parse(decodeURIComponent(params.info));
				this.loading = false;
			}else {
				this.params = params;
				this.getInfo();
				this.getRecommend();
			}
		},
		onReady() {
			this.barTop = this.SYSTEMP_INFO.statusBarHeight;
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.menuOccupyStyle['height'] = this.menuButtonInfo.top + this.menuButtonInfo.height + 6 + 'px';
			this.menuOccupyStyle['heightPure'] = this.menuButtonInfo.top + this.menuButtonInfo.height + 6;
			this.menuOccupyStyle['top'] = this.menuButtonInfo.top + 'px';
		},

		onShow() {},
		onPageScroll(e) {
			this.menuOccupyStyle['background'] =
				`rgba(246,246,246, ${300 - e.scrollTop > 0 ? e.scrollTop * 0.003 : 1})`;
			this.menuOccupyStyle['backdrop-filter'] = `blur(${80 - e.scrollTop > 0 ? e.scrollTop * 0.05 : 4}px)`;
			this.menuOccupyStyle['scrollTop'] = e.scrollTop;
		},
		onShareAppMessage(res) {
			// api.setShare({id: this.id});
			setTimeout(()=>{
				this.$refs.shareBox.handleCancel();
				// this.info.share ++ ;
			},500);
			
			return {
				title: '搭火',
				imageUrl: this.info.images[0] ,
				desc: this.info.title,
				path:`/pagesActivity/activityDetails/index?id=${this.info.id}`
			}
		},
		onShareTimeline(res) {
			setTimeout(()=>{
				// this.info.share ++ ;
				this.$refs.shareBox.handleCancel();
			},500)
			return {
				title: '搭火',
				imageUrl: this.info.images[0] ,
				desc: this.info.title,
				path:`/pagesActivity/eventDetails/index?id=${this.info.id}`
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.page {
		color: #ffffff;
		background-color: rgba(29, 29, 38, 1);
		overflow: hidden;
	}

	.top-box {
		width: 100%;
		box-sizing: border-box;

		.menu-occupy-box {
			--top: 24px;
			background: transparent;
			// background: rgba(255, 255, 255, 0.4);
			// backdrop-filter: blur(4px);
			// -webkit-backdrop-filter: blur(4px);
			transition: all 0.5s;
			position: fixed;
			z-index: 93;
			width: 100%;
			top: 0;
			left: 0;
			right: 0;
			padding-top: var(--top);
			padding-left: 24rpx;
			box-sizing: border-box;

			.menu-box {
				--height: 32px;
				height: var(--height);
				line-height: var(--height);
				width: 100%;

				image {
					width: 48rpx;
					height: 48rpx;
					vertical-align: middle;
				}
			}



		}
	}

	.swiper-box {
		width: 100%;
		height: 1000rpx;
		position: relative;

		swiper,
		swiper-item {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.indicator-dots {
			position: absolute;
			bottom: 266rpx;
			left: 0;
			padding: 18rpx;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;

			>text {
				width: 6rpx;
				height: 6rpx;
				background: #ffffff;
				border-radius: 50%;
				margin-right: 14rpx;
				transition: all 0.1s;
			}

			.active {
				width: 10rpx;
				height: 10rpx;
			}
		}

		.basis-info {
			position: absolute;
			bottom: 0;
			left: 0;
			height: 266rpx;
			background: rgba(0, 0, 0, 0.3);
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;

			.title {
				font-size: 40rpx;
				font-family: PingFang HK, PingFang HK-Medium;
				color: #ffffff;
				line-height: 58rpx;
				height: 116rpx;
				letter-spacing: 1px;
				@include ellispsis(2);
			}

			.other {
				width: 100%;
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				overflow: hidden;

				.left {
					font-size: 36rpx;
					line-height: 54rpx;
					letter-spacing: 1.5px;

					text {
						font-family: DIN Alternate, DIN Alternate-Bold;
						font-size: 58rpx;
						letter-spacing: 1px;
					}
				}

				.right {
					>view {
						font-size: 24rpx;
						line-height: 34rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						image {
							width: 30rpx;
							height: 30rpx;
							margin-right: 10rpx;
						}
					}

					>view:nth-child(1) {
						margin-bottom: 10rpx;
					}
				}
			}
		}
	}

	.time-location-box {
		width: 100%;
		background: linear-gradient(86deg, #4d4daa 5%, #ad57b1 96%);
		padding: 42rpx 24rpx;
		box-sizing: border-box;
		.icon {
			width: 44rpx;
			height: 44rpx;
			margin-right: 8rpx;
		}

		.text {
			font-size: 32rpx;
			font-family: PingFang HK, PingFang HK-Semibold;
			line-height: 44rpx;
		}

		.time-box {
			display: flex;
			flex-wrap: wrap;

			.text {
				flex: 1;
			}
		}

		.location-box {
			margin-top: 28rpx;
			border-top: 2px dashed rgba(232, 232, 232, 0.68);
			padding-top: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			>view {
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;

				>view {
					flex: 1;

					text {
						display: block;
					}

					text:nth-child(2) {
						margin-top: 10rpx;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}
			}

			>image {
				flex-shrink: 0;
				margin-left: 10rpx;
				width: 68rpx;
				height: 72rpx;
			}
		}
	}

	.time-location-occupy-box {
		padding-top: 40rpx;
		width: 100%;
		background: linear-gradient(86deg, #4d4daa 5%, #ad57b1 96%);
		position: relative;

		>view {
			width: 100%;
			height: 100%;
			background: linear-gradient(180deg, rgba(29, 29, 38, 0.00), rgba(29, 29, 38, 0.52) 35%, #1d1d26 65%, #1d1d26);
			padding: 0 24rpx;
			box-sizing: border-box;
		}

	}

	.personnel-box {
		width: 100%;
		background: #42424a;
		border-radius: 30rpx;
		padding: 28rpx 24rpx;
		box-sizing: border-box;

		.top {
			display: flex;

			>image {
				flex-shrink: 0;
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				margin-right: 16rpx;
			}

			>view {
				>text:nth-child(1) {
					display: block;
					font-size: 24rpx;
					line-height: 34rpx;
				}

				>text:nth-child(2) {
					display: block;
					margin-top: 8rpx;
					font-size: 36rpx;
					font-weight: 500;
					line-height: 50rpx;
				}
			}
		}

		.bottom {
			margin-top: 18rpx;
			width: 100%;
			border-top: 2rpx solid #555;
			padding-top: 22rpx;

			>view:nth-child(1) {
				font-size: 24rpx;
				line-height: 34rpx;

			}

			>view:nth-child(2) {

				margin-top: 12rpx;
				display: flex;
				align-items: center;

				>view:nth-child(1) {

					flex: 1;
					display: flex;
					overflow: hidden;
					--left: -28rpx;
					position: relative;

					image {
						flex-shrink: 0;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						border: 8rpx solid #fff;

						&:not(:first-child) {
							margin-left: var(--left);
						}
					}

					&::after {
						position: absolute;
						content: '';
						right: 0;
						width: 40%;
						height: 100%;
						// background-color:red;
						background: linear-gradient(to right, transparent, rgba(66, 66, 74, 0.5) 50%, rgba(66, 66, 74, 1));
					}
				}

				>view:nth-child(2) {
					margin-left: 12rpx;
					flex-shrink: 0;
					display: flex;
					align-items: center;

					>view {
						font-size: 24rpx;
						line-height: 40rpx;

						text {
							font-size: 36rpx;
							letter-spacing: 2px;
							line-height: 40rpx;
						}

						.active {
							font-size: 40rpx;
							line-height: 40rpx;
							color: $theme;
							margin-left: 4rpx;
						}
					}

					image {
						width: 34rpx;
						height: 34rpx;
					}
				}

			}
		}
	}

	.particulars-all-box {
		padding: 0 24rpx;
		box-sizing: border-box;
		width: 100%;
	}

	.particulars-box {
		margin-top: 64rpx;
		width: 100%;
		padding: 0 24rpx 30rpx 24rpx;
		box-sizing: border-box;
		background: #42424a;
		border-radius: 30rpx;

		.title {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 32rpx;

			.title-left {
				flex-shrink: 0;
				width: 238rpx;
				height: 82rpx;
				position: relative;
				margin-top: -16rpx;
				margin-left: -24rpx;

				image {
					width: 100%;
					height: 100%;
				}

				text {
					position: absolute;
					left: -8rpx;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
					text-align: center;
					font-family: PingFang HK, PingFang HK-Semibold;
					font-weight: 600;
					text-align: center;
					color: #f9fafa;
					font-size: 36rpx;
					letter-spacing: 2.16px;
				}
			}

			.title-right {
				padding-top: 24rpx;
				height: 40rpx;
				font-size: 28rpx;
				color: #b5b5b5;
				line-height: 40rpx;
				letter-spacing: 0.11px;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;

				}
			}
		}

		.text {
			font-size: 26rpx;
			font-family: PingFang HK, PingFang HK-Regular;
			font-weight: 400;
			color: #ffffff;
			line-height: 44rpx;
		}

		.introduction {
			max-height: 352rpx;
			overflow: hidden;
			transition: all 0.5s;
		}

		.shrink {
			margin-top: 22rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			height: 40rpx;
			font-size: 28rpx;
			color: #b5b5b5;
			line-height: 40rpx;
			letter-spacing: 0.11px;
			display: flex;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;

			}
		}

		.issue {
			>view {
				width: 100%;
				padding-top: 24rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				overflow: hidden;

				&:not(:first-child) {
					margin-top: 24rpx;
					border-top: 2rpx solid #555;
				}

				image {
					width: 48rpx;
					height: 48rpx;
				}

				.text {
					flex: 1;
					padding: 0 18rpx;
					box-sizing: border-box;
					@include ellispsis1();
				}

				.status {
					font-size: 20rpx;
					width: 92rpx;
					height: 44rpx;
					background: rgba(249, 71, 92, 0.85);
					border-radius: 4rpx;
					text-align: center;
					line-height: 44rpx;
				}
			}

		}

		.evaluate {
			margin-top: 52rpx;
		}
	}

	.recommend {
		margin-top: 48rpx;
		margin-bottom: 50rpx;

		.title {
			padding: 0 24rpx;
			box-sizing: border-box;
			margin-bottom: 28rpx;
			display: flex;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 12rpx;
			}

			text {
				font-size: 36rpx;
				font-family: PingFang HK, PingFang HK-Medium;
				font-weight: 500;
				text-align: left;
				color: #ffffff;
				line-height: 50rpx;
				letter-spacing: 0.14px;
			}
		}

		swiper {
			width: 100%;
			height: 824rpx;
		}

		swiper-item {
			width: 100%;
			height: 100%;
		}

		.info-row-box {
			transform: scale(0.9);
			// padding: 0 20rpx;
			box-sizing: border-box;
			width: 100%;
			transition: all 0.3s;
			height: 824rpx;
		}

		.info-row-active {
			transform: scale(1);
		}

	}

	.tip-box {
		position: fixed;
		bottom: -80rpx;
		z-index: 90;
		left: 24rpx;
		width: 702rpx;
		height: 68rpx;
		background: #474b54;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		transition: all 0.6s;

		image {
			width: 36rpx;
			height: 36rpx;
			margin-right: 10rpx;
		}

		text {
			color: $theme;
			padding-right: 8rpx;
		}

	}

	.tip-box1 {
		position: inherit;
		margin: 0 auto;
		margin-bottom: 220rpx;
	}

	.tip-box-active {
		animation: tipActive 2s;
	}

	@keyframes tipActive {
		0% {
			bottom: -80rpx;
		}

		20% {
			bottom: 240rpx;
		}

		80% {
			bottom: 240rpx;
		}

		100% {
			bottom: -80rpx;
		}
	}

	.empty {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}

	.bottom-box {
		position: fixed;
		bottom: 30rpx;
		left: 24rpx;
		right: 24rpx;
		z-index: 90;

		>view {
			display: flex;
		}

		.left,
		.right {
			height: 126rpx;
			background: #ffffff;
			border-radius: 30rpx;
			backdrop-filter: blur(68.62rpx);
			display: flex;
			align-items: center;
		}

		.row {
			padding: 0 40rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			image {
				width: 46rpx;
				height: 46rpx;
				margin-bottom: 5rpx;
			}

			text {
				font-size: 16rpx;
				color: #4e5969;
				line-height: 22rpx;
				letter-spacing: 0.06px;
			}
		}

		.left {
			padding: 0 10rpx;
			box-sizing: border-box;

			.row {
				&:not(:first-child) {
					position: relative;

					&::after {
						position: absolute;
						content: '';
						top: 50%;
						transform: translateY(-50%);
						left: 0;
						height: 34rpx;
						width: 2rpx;
						background-color: #d5d5d5;
					}

				}
			}
		}

		.right {
			margin-left: 22rpx;
			flex: 1;
			display: flex;
			align-items: center;

			button {
				margin-left: 10rpx;
				margin-right: 30rpx;
				flex: 1;
				height: 86rpx;
				background: $theme;
				border-radius: 16rpx;
				font-size: 30rpx;
				color: #ffffff;
				font-weight: 500;
				letter-spacing: 0.12px;
				line-height: 86rpx;
				text-align: center;

			}
		}
	}
</style>