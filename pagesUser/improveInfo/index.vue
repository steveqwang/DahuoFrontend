<template>
	<view class="improve-info">
		<view class="progress" :style="{'--width': (tabsActive + 1) * 20 + '%'}"></view>
		<swiper class="list-box" id="listBox" :current="tabsActive" @change="changeSwiper" :duration="400"
			:swipe-threshold="30">
			<block v-for="(item,index) in list " :key="index">
				<swiper-item>
					<scroll-view scroll-y scroll-with-animation class="scroll-view">
						<view class="info-row">
							<view class="title">{{item.title}}</view>
							<template v-if="item.key == 'gender'">
								<view class="gender">
									<view class="" v-for="(item2, index2) in item.info" :key="index2"
										@click="changeFormInfo(item.key, item2.id, item.multipleChoice)">
										<view :class="{'active': formInfo.gender == item2.id}">
											<image class='icon'v-if="formInfo.gender == item2.id"  src="@/static/icon/radio01.png"
												mode="scaleToFill"></image>
											<image class="img" :src="item2.icon"  mode="scaleToFill"></image>
										</view>
										<text>{{item2.title}}</text>
									</view>
								</view>
							</template>
							<template v-if="item.key == 'birthday'">
								<view class="birthday">
									<picker-date @change="changeBirthday"/>
								</view>
							</template>
							<template v-if="item.key == 'type' || item.key == 'preference'">
								<view class="type preference">
									<view class="row" :class="{'row-active': formInfo[item.key].indexOf(item2.id) != -1}" v-for="(item2, index2) in item.info" :key="index2" @click="changeFormInfo(item.key, item2.id, item.multipleChoice)">
										<text>{{item2.title}}</text>
									</view>
								</view>
							</template>
							<template v-if="item.key == 'basis'">
								<view class="basis">
									<view class="image" @click="onUploadImg()">
										<image class="img" :src="formInfo.avatar" mode="aspectFill" v-if="formInfo.avatar"></image>
										<image class="img" src="@/static/img/avatar01.png" mode="aspectFill" v-else></image>
										<image class="icon" src="@/static/img/camera01.png" mode="aspectFill"></image>
									</view>
									<input :style="{'--border': inputBorder}" type="text" v-model="formInfo.name" maxlength="10" @focus="onFocus" @blur="onBlur" placeholder="请输入昵称" placeholder-class="placeholder">
								</view>
							</template>

						</view>
					</scroll-view>
				</swiper-item>
			</block>
		</swiper>
		<button class="next-btn" :loading="loading" @click="handleNext()">{{list[tabsActive].nextTxt}}</button>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions,
		mapMutations,
	} from 'vuex';
	import * as api from '@/api/user.js';
	import {
		pickerDate
	} from '../components/picker-date.vue';
	export default {
		name: 'improveInfo',
		title: '完善信息',
		components: {
			pickerDate,
		},
		data() {
			return {
				loading: false,
				formInfo: {
					gender: '1',
					birthday: '',
					type: [],
					preference: [],
					avatar: '',
					name: '',

				},
				tabsActive: 0,
				loading: false,
				list: [],
				inputBorder: '',
			}
		},
		computed: {
			...mapGetters(['USER_INFO'])
		},
		methods: {
			...mapMutations(['SET_USER_INFO']),
			...mapActions(['SET_USER']),
			// 更改 Swiper
			changeSwiper(event) {
				this.tabsActive = event.detail.current;
			},
			// 更改信息
			changeFormInfo(key, value, multipleChoice) {
				if (multipleChoice) {
					let curI = this.formInfo[key].findIndex(c => c.id == key);
					curI == -1 ? this.formInfo[key].push(value) : this.formInfo[key].splice(curI, 1);
				} else {
					this.formInfo[key] = value;
				}
			},
			// 生日
			changeBirthday(e){
				formInfo.birthday = e;
			},
			// 下一步
			handleNext() {
				if (this.tabsActive == 4) return this.handleSave();
				this.tabsActive = this.tabsActive + 1;
			},
			// 聚焦
			onFocus() {
				this.inputBorder = '2rpx solid #010101';
			},
			// 失焦
			onBlur(){
				this.inputBorder = '2rpx solid #d8d8d8';
			},
			async handleSave() {
				if (this.loading) return
				// if(!this.userInfo.avatar) return uni.showToast({title:"请上传头像",icon:'none'});
				if(!this.formInfo.name) return uni.showToast({title:"请输入昵称",icon:'none'});
				this.loading = true;
				this.SET_USER_INFO({ // 要删掉
					name: this.formInfo.name,
					member: '月会员',
					avatar: 'https://img0.baidu.com/it/u=2946347808,804236954&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
					follow: '1009',
					fans: '273',
					grade: 'v1',
					id: 1,
					invitation_code: '888'
				})
				// this.SET_USER({
				// 	avatar: this.userInfo.avatar,
				// 	name: this.userInfo.name
				// }).then(()=>{
					this.loading = false;
				uni.showToast({
					title: '提交成功',
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
			// 上传图片
			onUploadImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.formInfo.avatar = res.tempFilePaths[0]
						// this.$upload(res.tempFilePaths[0]).then(result => {
						// 	if (result.code == 0) this.formInfo.avatar = result.data
						// })
					}
				})
			},
			// 初始化
			init() {
				this.list = [{
						title: '您的性别（1/5）',
						key: 'gender',
						multipleChoice: false,
						nextTxt: '下一步',
						info: [{
								icon: require('../static/img/user01.png'),
								title: '男',
								id: '1'
							},
							{
								icon: require('../static/img/user02.png'),
								title: '女',
								id: '2'
							}
						]
					},
					{
						title: '您的生日（2/5）',
						key: 'birthday',
						multipleChoice: false,
						nextTxt: '下一步',
						info: [],
					},
					{
						title: '您的搭子类型（3/5）',
						key: 'type',
						multipleChoice: true,
						nextTxt: '跳过',
						info: [],
					},
					{
						title: '使用搭火您更偏向（4/5）',
						key: 'preference',
						multipleChoice: true,
						nextTxt: '跳过',
						info: [],
					},
					{
						title: '上传您的头像和昵称（5/5）',
						key: 'basis',
						multipleChoice: false,
						nextTxt: '体验找搭子之旅',
						info: {
							avatar: require('@/static/img/avatar01.png'),
							name: '',
						},
					},

				]
			},
			// 获取数据
			async getInfo() {
				// var res = await api.getList();
				// 类型
				var res = {
					code: 0,
					data: [{
							title: '选项1',
							id: '01'
						},
						{
							title: '选项2',
							id: '02'
						},
						{
							title: '选项3',
							id: '03'
						},
						{
							title: '网吧通宵',
							id: '04'
						},
						{
							title: '飞盘游戏1',
							id: '05'
						},
						{
							title: '骑车上山2',
							id: '06'
						},
						{
							title: '下海游泳去玩3',
							id: '07'
						},
						{
							title: '网吧通宵4',
							id: '08'
						},
						{
							title: '飞盘游戏5',
							id: '09'
						},
						{
							title: '骑车上山骑车上山骑车上山骑车上山骑车上山骑车上山6',
							id: '10'
						},
						{
							title: '下海游泳去玩7',
							id: '11'
						},
						{
							title: '网吧通宵8',
							id: '12'
						},
					]
				}
				if (res.code == 0) {
					this.list[2].info = res.data;
				}
				// preference
				var res1 = {
					code: 0,
					data: [{
							title: '偏好1',
							id: '01'
						},
						{
							title: '偏好2',
							id: '02'
						},
						{
							title: '偏好3',
							id: '03'
						},
						{
							title: '偏好偏好偏好偏好偏好偏好偏好偏好偏好偏好偏好4',
							id: '04'
						},
						{
							title: '偏好5',
							id: '05'
						},
						{
							title: '偏好6',
							id: '06'
						},
					]
				}
				if (res1.code == 0) {
					this.list[3].info = res1.data;
				}
			},
		},
		onShow() {},
		onLoad() {
			this.init();
			this.getInfo();
		},

	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.improve-info {
		height: 100vh;
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		background-color: $uni-bg-color3;
		display: flex;
		flex-direction: column;
	}

	.progress {
		transition: all 0.3s;
		margin-top: 40rpx;
		width: 100%;
		height: 8rpx;
		background: rgba(249, 71, 92, 0.1);
		border-radius: 4rpx;
		--width: 20%;
		position: relative;

		&::after {
			position: absolute;
			left: 0;
			top: 0;
			content: '';
			width: var(--width);
			height: 8rpx;
			background: $theme;
			border-radius: 4rpx;
		}
	}

	.list-box {
		flex: 1;
		height: 1px;
		width: 100%;
		.scroll-view,
		.swiper,
		.swiper-item {
			width: 100%;
			height: 100%;
			position: relative;
		}

		.scroll-view {}

		.scroll-view ::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
			display: none;
		}

	}

	.next-btn {
		margin-bottom: 140rpx;
		width: 100%;
		height: 110rpx;
		line-height: 110rpx;
		border-radius: 30rpx;
		background: $uni-button-bg;
		font-size: 30rpx;
		color: #fff;
	}

	.info-row {
		box-sizing: border-box;
		padding: 82rpx 0 22rpx;
		.title {
			text-align: center;
			line-height: 44rpx;
			font-size: 32rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			text-align: center;
		}
	}

	.gender {
		margin-top: 110rpx;
		display: flex;
		flex-wrap: wrap;

		>view {
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			text {
				margin-top: 26rpx;
				line-height: 44rpx;
				font-size: 32rpx;
				color: #4e5969;
			}

			>view {
				width: 172rpx;
				height: 172rpx;
				border-radius: 50%;
				border: 2rpx solid transparent;
				position: relative;
			}
			.active {
				border: 2rpx solid $theme;
			}

			.img {
				width: 100%;
				height: 100%;
			}

			.icon {
				position: absolute;
				right: 8rpx;
				bottom: 0;
				width: 32rpx;
				height: 32rpx;
			}

		}

	}
	.type, .preference{
		margin-top: 80rpx;
		display: flex;
		flex-wrap: wrap;
		margin-right: -24rpx;
		.row {
			display: inline-block;
			min-width: calc((100% -  72rpx) / 3);
			font-size: 30rpx;
			line-height: 42rpx;
			padding: 40rpx 20rpx;
			box-sizing: border-box;
			border: 2rpx solid #d8d8d8;
			border-radius: 30rpx;
			margin-right: 24rpx;
			margin-bottom: 30rpx;
			text-align: center;
			color: $uni-text-color;
		}
		.row-active {
			background-color: $theme;
			border: 2rpx solid $theme;
			color: #ffffff;
		}
	}
	.basis {
		margin-top: 126rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 32rpx;
		box-sizing: border-box;
		.image {
			width: 200rpx;
			height: 200rpx;
			padding: 16rpx;
			box-sizing: border-box;
			border: 2rpx solid #d0d0d0;
			border-radius: 50%;
			margin-bottom: 80rpx;
			position: relative;
			.img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			.icon {
				position: absolute;
				right: 10rpx;
				bottom: 0;
				width: 52rpx;
				height: 52rpx;
			}
		}
		input {
			--border: 2rpx solid #d8d8d8;
			width: 100%;
			height: 122rpx;
			border: var(--border);
			border-radius: 30rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
			transition: border 0.05s;
		}
		.placeholder {
			line-height: 122rpx;
		}
	}
</style>