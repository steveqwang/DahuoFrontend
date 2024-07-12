<template>
	<view class="seek" :class="{'seek-last': swiperActive == total && !loading}">
		<u-mask :z-index="90" :show="dislikeManage.visible" @click="onChangeDislike(null)"></u-mask>
		<view class="menu-occupy-box" :style="{'height':  menuOccupyStyle.height,
						'--top': menuOccupyStyle.top}">
			<view class="menu-box" :style="{'--height': menuButtonInfo.height + 'px'}" @click="handleBack()">
				<image src="@/static/icon/left02.png" mode="aspectFill" v-if="swiperActive == total"></image>
				<image src="@/static/icon/left01.png" mode="aspectFill" v-else></image>
			</view>
		</view>
		<view :style="{'height': menuOccupyStyle.height}"></view>
		<template v-if="!loading">
			<swiper class="list-box" id="listBox" :current="swiperActive" @change="changeSwiper" :duration="400"
				:swipe-threshold="30">
				<block v-for="(item,index) in list " :key="index">
					<swiper-item class="swiper-item" @click="handleDetails(item)">
						<view class="info-row" >
							<image :src="item.image" mode="aspectFill"></image>
							<view class="centent">
								<view class="title">{{item.title}}</view>
								<view class="info">
									<view class="">
										<image class="icon" src="@/static/icon/location02.png" mode="aspectFit"></image>
										<view class="text">{{item.location}}</view>
									</view>
									<view class="">
										<image class="icon" src="@/static/icon/time02.png" mode="aspectFit"></image>
										<view class="text">{{item.time}}</view>
									</view>
									<view class="info-last" style="letter-spacing: 2px;">
										<view class="left">
											<image class="icon" src="@/static/icon/user01.png" mode="aspectFit"></image>
											<view class="text">人数：<text
													class="active">{{item.numberExists}}</text>/{{item.numberTotle}}
											</view>
										</view>
										<view class="right">
											<image class="icon" src="@/static/icon/location02.png" mode="scaleToFill"></image>
											<text>距我 {{item.distance}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</block>
				<swiper-item class="swiper-item">
					<view class="info-row-last">
						<text>快来发起活动吧</text>
					</view>
				</swiper-item>
			</swiper>
			<template v-if="swiperActive < total">
				<view class="bottom-box">
					<button class="row" v-for="(item, index) in buttonList" :key="index" :open-type="item.openType"
						:class="{'row-active': list[swiperActive][item.key]}" @click="handleStatus(item,index)">
						<image :src="item.icon" mode="scaleToFill"></image>
					</button>
				</view>
				<view class="dislike-box" :class="{'dislike-box-mask': dislikeManage.visible}">
					<view class="dislike-row"  v-for="(item, index) in dislikeManage.list" :key="index"  @click.stop="onChangeDislike(item)"
						:style="{'--margin-right': 60 * (index + 1) + 'rpx'}"
						:class="{'dislike-row-active': item.id == dislikeManage.active}" >
						{{item.title}}
					</view>
				</view>
			</template>
			<template v-else>
				<view class="bottom-box-last">
					<button >发布活动</button>
					<button @click="handleHome()">返回首页推荐</button>
				</view>
			</template>
		  <view class="bottom-occupy"></view>
		</template>
		<view class="" v-else>
			<loading-box type='pFixed'/>
		</view>
		
	</view>
</template>

<script>
	import uMask from '@/components/u-mask.vue';
	import loadingBox from '@/components/loading-box.vue'
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	import * as api from '@/api/user.js';
	export default {
		name: 'findPartner-seek',
		title: '立即找搭子',
		components: {
			uMask,
			loadingBox,
		},
		data() {
			return {
				menuOccupyStyle: {
					'height': '62px',
					'top': '20px',
				},
				params: {},
				loading: true,
				formInfo: {
					gender: '1',
					birthday: '',
					type: [],
					preference: [],
					avatar: '',
					name: '',

				},
				menuButtonInfo: {},
				swiperActive: 0,
				total: 0,
				list: [],
				buttonList: [],
				dislikeManage: {
					visible: false,
					active: '',
					list: []
				},
			}
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		methods: {
			// 详情
			handleDetails(row) {
				uni.navigateTo({
					url: `/pagesActivity/activityDetails/index?id=${row.id}`
				})
			},
			// 回退
			handleBack(){
				uni.navigateBack({
					delta: 1,
				})
			},
			handleHome(){
				uni.switchTab({
					url:'/pages/home/index'
				});
			},
			// 更改 Swiper
			changeSwiper(event) {
				this.swiperActive = event.detail.current;
			},
			// 状态-更改
			handleStatus(row) {
				switch (row.key){
					case 'relay':
						break;
					case 'collect':
						this.list[this.swiperActive].collect =  !this.list[this.swiperActive].collect;
						break;
					case 'like':
						this.list[this.swiperActive].like =  !this.list[this.swiperActive].like;
						break;
					case 'dislike':
					this.dislikeManage.active = '';
					this.dislikeManage.visible = true;
						break;
				}
				// item,index,item2,index2
			},
			// 不喜欢
			onChangeDislike(row) {
				if(!row) return this.dislikeManage.visible = false;
				this.dislikeManage.active = row.id;
				setTimeout(()=>{
					this.dislikeManage.visible = false;
					this.swiperActive++;
				},600)
				
			},
			async getList() {
				try {
					this.loading = true;
					// var res = await api.getList();
					let res = {
						code: 0,
						data: {
							total: 3,
							list: [{
									distance: '100m',
									relay: false,
									collect: false,
									like: false,
									dislike: false,
									id: '1',
									title: '1标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '1搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									image: 'https://5b0988e595225.cdn.sohucs.com/images/20171024/9252f22f2bb94115ac633e93daf3a572.jpeg',
								},
								{
									relay: false,
									collect: true,
									like: false,
									dislike: false,
									distance: '100km',
									id: '2',
									status: '已结束',
									userName: '发起人姓名2',
									title: '2标题标题标题标题标题标题标题标题标题标题标题标题',
									location: '2搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									like: 500,
									isLike: true,
									image: 'https://img0.baidu.com/it/u=4040762979,4114507495&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
									userIcon: 'https://img1.baidu.com/it/u=4014992589,2495811998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083'
								},
								{
									distance: '50km',
									id: '3',
									status: '已结束',
									userName: '发起人姓名3发起人姓名3姓名3发起人姓姓名3发起人姓姓名3发起人姓姓名3发起人姓3',
									title: '3标题标题标题标题标题标题标',
									location: '搭火北京基地俱乐部',
									time: '周日 05.12 12:00',
									numberTotle: 12,
									numberExists: 9,
									like: 500,
									image: 'https://img2.baidu.com/it/u=4188325752,2221979913&fm=253&fmt=auto&app=138&f=JPEG?w=820&h=500',
									userIcon: 'https://img1.baidu.com/it/u=4014992589,2495811998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083'
								},
							],
						}
					}

					setTimeout(() => {
						if (res.code == 0) {
							this.total = res.data.total;
							this.list = res.data.list;
						}
						this.loading = false;
					}, 1000)
				} catch {
					this.loading = false;
				}
			},

			async handleSave() {
				if (this.loading) return
				// if(!this.userInfo.avatar) return uni.showToast({title:"请上传头像",icon:'none'});
				// if(!this.userInfo.name) return uni.showToast({title:"请输入昵称",icon:'none'});
				// this.loading = true;
				// this.SET_USER({
				// 	avatar: this.userInfo.avatar,
				// 	name: this.userInfo.name
				// }).then(()=>{
				// 	this.loading = false;
				uni.showToast({
					title: '修改成功',
					icon: 'none',
				});
				this.onSuccess();
				// }).catch((err)=>{
				// 	this.loading = false;
				// })
			},
			onSuccess(code) {
				var pages = getCurrentPages();
				setTimeout(() => {
					if (pages && pages.length > 1) {
						uni.navigateBack({
							delta: 1,
						});
					} else {
						wx.switchTab({
							url: '/pages/my/index'
						});
					}
				}, 600)
			},
			// 初始化
			init() {
				this.buttonList = [{
						icon: require('../static/icon/seek01.png'),
						key: 'relay',
						openType: 'share',
					},
					{
						icon: require('../static/icon/seek02.png'),
						key: 'collect',
					},
					{
						icon: require('../static/icon/seek03.png'),
						key: 'like',
					},
					{
						icon: require('../static/icon/seek04.png'),
						key: 'dislike',
					}
				];
				this.dislikeManage.list = [
					{ title: '价格太高', id: '01',},
					{ title: '活动距离过远距', id: '02',},
					{ title: '活动时间过长', id: '03',},
					{ title: '直接下一个', id: '04',},
				]
			},


		},
		onShow() {},
		onReady() {
			this.barTop = this.SYSTEMP_INFO.statusBarHeight;
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.menuOccupyStyle['height'] = this.menuButtonInfo.top + this.menuButtonInfo.height + 6 + 'px';
			this.menuOccupyStyle['top'] = this.menuButtonInfo.top + 'px';
		},
		onLoad(params) {
			this.params = params;
			this.init();
			this.getList();
		},
		onShareAppMessage(res) {
			// api.setShare({id: this.id});
			setTimeout(()=>{
				this.list[this.swiperActive].relay = true;
			},1000);
			
			return {
				title: '搭火',
				imageUrl: this.list[this.swiperActive].image ,
				desc: this.list[this.swiperActive].title,
				path:`/pagesActivity/activityDetails/index?id=${this.list[this.swiperActive].id}`
			}
		},
		onShareTimeline(res) {
			setTimeout(()=>{
				this.list[this.swiperActive].relay = true;
			},1000)
			return {
				title: '搭火',
				imageUrl: this.list[this.swiperActive].image ,
				desc: this.list[this.swiperActive].title,
				path:`/pagesActivity/activityDetails/index?id=${this.list[this.swiperActive].id}`
			}
		},

	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.seek {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(1deg, #323279 1%, #723a74 99%);
		position: relative;
		transition: background 0.4s;
	}
	.seek-last {
		background: #fff;
		.info-row-last {
			width: 100%;
			height: 100%;
			overflow: hidden;
			border-radius: 30rpx;
			position: relative;
			background: url('../static/img/bg01.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				font-size: 50rpx;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
			}
			
		}
		.bottom-box-last {
			padding: 40rpx 24rpx;
			box-sizing: border-box;
			>button {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				background-color: #fff;
				color: #333333;
				border-radius: 30rpx;
				font-size: 30rpx;
			}
			>button:nth-child(1){
				background: $uni-button-bg;
				color: #fff;
				margin-bottom: 10rpx;
			}
		}
	}
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
		padding-left: 34rpx;
		box-sizing: border-box;
	
		.menu-box {
			--height: 32px;
			height: var(--height);
			line-height: var(--height);
			width: 100%;
	
			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	
	
	
	}
	.list-box {
		flex: 1;
		width: 100%;
		.swiper-item {
			width: 100%;
			height: 100%;
			box-shadow: 0px 6px 30px 0px rgba(0,0,0,0.31); 
			padding: 20rpx 24rpx;
			box-sizing: border-box;
			position: relative;
		}

	}
	.info-row {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 30rpx;
		position: relative;
		>image {
			width: 100%;
			height: 100%;
			vertical-align: top;
		}

		.centent {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.3);
			border-radius: 0rpx 0rpx 30rpx 30rpx;
			padding: 20rpx 24rpx;
			box-sizing: border-box;

			text {
				font-size: 24rpx;
				line-height: 34rpx;
			}

			color: #fff;

			.user {
				display: flex;
				align-items: center;

				>image {
					width: 40rpx;
					height: 40rpx;
					border-radius: 20rpx;
					margin-right: 12rpx;
				}

				text {
					@include ellispsis1();
				}
			}

			.title {
				margin-top: 16rpx;
				font-size: 38rpx;
				line-height: 48rpx;
				@include ellispsis1();
				margin-bottom: 16rpx;
			}

			.info {
				border-top: 1rpx solid #fff;
				padding-top: 16rpx;
				>view {
					margin-top: 12rpx;
					display: flex;
					align-items: center;

					&:first-child {
						margin-top: 0;
					}

					.icon {
						width: 24rpx;
						height: 24rpx;
						margin-right: 12rpx;
					}

					.text {
						flex: 1;
						font-size: 24rpx;
						line-height: 34rpx;
						display: inline-block;
						@include ellispsis1();

					}

					.active {
						letter-spacing: 1px;
						font-size: 30rpx;
						color: $theme;
					}
				}

				.info-last {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.right {

						display: flex;
						align-items: center;
						line-height: 36rpx;
						font-size: 26rpx;
						color: #ffffff;

						>image {
							width: 34rpx;
							height: 34rpx;
							margin-right: 12rpx;
						}
					}
				}


			}
		}
	}
	.bottom-box {
		padding: 20rpx 0 40rpx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		.row {
			transition: all 0.3s;
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgba(255, 255, 255, 0.2);
			margin: 0 46rpx 0 0;
			position: relative;
			&:last-child {
				margin-right: 0;
			}

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}
		.row-active {
			background: linear-gradient(180deg,#f96131, #f9475c);
		}
	}
	.dislike-box {
		position: absolute;
		z-index: 91;
		padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		right: 0;
		bottom: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		transform: translate(200%, 200%) scale(0);
		transition: all 0.5s;
		.dislike-row {
			display: inline-block;
			padding: 0 24rpx;
			min-width: 260rpx;
			height: 84rpx;
			text-align: center;
			background: #ffffff;
			border-radius: 16rpx;
			line-height: 84rpx;
			font-size: 26rpx;
			@include ellispsis1();
			--margin-right: 60rpx;
			margin-right: var(--margin-right);
			margin-bottom: 24rpx;
		}
		.dislike-row-active {
			background-color: $theme;
			color: #fff;
		}
	}
	.dislike-box-mask {
		transform: translate(0, 0) scale(1);
	}
	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}
</style>