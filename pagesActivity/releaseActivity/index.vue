<template>
	<view class="release-activity">
		<template v-if="!loading">
			<view class="info-box">
				<form-box :formManage="formManage" :formInfo="formInfo" ref="formBox">
					<view class="info-box-module" v-for="(itemM, indexM) in formManageModule" :key="indexM">
						<view v-for="(item, index) in formManage.slice(itemM.start, itemM.end)" :key="index"
							class="info-row">
							<!-- <block v-if="item.type !='slot'"> -->
							<form-row :info="item" :options="item.options" v-model="formInfo[item.key]"
								:verification="isVerification">
								<template slot="timeRange">
									<view class="form-row-box">
										<view class="label">
											<image :src="item.icon" mode="aspectFit" v-if="item.icon"></image>
											<text v-if="item.require" class="require">*</text>
											{{item.label}}
										</view>
										<view class="select-box" @click="onOpenDatetime()">
											<datetime :value="[formInfo.startTime,formInfo.endTime]"
												@change="changeDatetime" @cancel="changeDatetime(null)">
												<view class="select-input border-box date-time"
													:style="{'--border': otherMange.key == 'timeRange' ? otherMange.inputBorder : ''}">
													<view class="">
														<text class="text" :class="{'placeholder': !formInfo.startTime}">
															{{formInfo.startTime ? formInfo.startTime : '开始时间'}}
														</text>
														至
														<text class="text" :class="{'placeholder': !formInfo.endTime}">
															{{formInfo.endTime ? formInfo.endTime : '结束时间'}}
														</text>
													</view>
													<image src="@/static/icon/down03.png" mode="scaleToFill"
														:class=" selectManage.visible ? 'image-top' : ''"></image>
												</view>
											</datetime>
										</view>
									</view>
								</template>
								<template slot="number">
									<view class="form-row-box form-row-number">
										<view class="label">
											<image :src="item.icon" mode="aspectFit" v-if="item.icon"></image>
											<text v-if="item.require" class="require">*</text>
											{{item.label}}
										</view>
										<view class="number-box">
											<view class="icon" @click="changeNumberTotle('oncrease')">+</view>
											<input class="text input" type="number" :value="formInfo.numberTotle"
												@input="changeNumberTotle"
												:style="'width:'+String(formInfo.numberTotle).length*28+'rpx;'" />
											<view class="icon" @click="changeNumberTotle('decrease')">-</view>
										</view>
									</view>
								</template>
								<template slot="price">
									<view class="form-row-box form-row-number">
										<view class="label">
											<image :src="item.icon" mode="aspectFit" v-if="item.icon"></image>
											<text v-if="item.require" class="require">*</text>
											{{item.label}}
										</view>
										<view class="number-box price-box">
											¥<input class="text input" type="digit" :value="formInfo.price"
												@input="changePrice"
												:style="'width:'+String(formInfo.price).length*28+'rpx;'" />/人
										</view>
									</view>
								</template>
								<template slot="prohibitTemplates">
									<view class="form-row-box form-row-number">
										<view class="label">
											<image :src="item.icon" mode="aspectFit" v-if="item.icon"></image>
											<text v-if="item.require" class="require">*</text>
											{{item.label}}
										</view>
										<view class="switch-box" :class="{'switch-active': formInfo.prohibitTemplates}"
											@click="changeSwitch('prohibitTemplates')"></view>
									</view>
								</template>
								<template slot="privacyActivity">
									<view class="form-row-box form-row-number">
										<view class="label">
											<image :src="item.icon" mode="aspectFit" v-if="item.icon"></image>
											<text v-if="item.require" class="require">*</text>
											{{item.label}}
										</view>
										<view class="switch-box" :class="{'switch-active': formInfo.privacyActivity}"
											@click="changeSwitch('privacyActivity')"></view>
									</view>
								</template>
							</form-row>
							</block>
						</view>
					</view>
				</form-box>
			</view>
			<view class="bottom-box">
				<button :loading="saveLoading" @click="handleSave()">发布活动</button>
				<button @click="handlePreview()">预览</button>
			</view>
			<view class="bottom-occupy"></view>
		</template>
		<template v-else>
			<loading-box type='pFixed' />
		</template>
	</view>
</template>

<script>
	import formRow from '../components/form-row.vue';
	import formBox from '../components/form-box.vue';
	import datetime from '../components/datetime.vue';
	import loadingBox from '@/components/loading-box.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'releaseActivity',
		title: '发布活动',
		components: {
			formRow,
			formBox,
			datetime,
			loadingBox
		},
		filters: {},
		data() {
			return {
				formInfo: {
					startTime: '',
					endTime: '',
					images: [],
					numberTotle: 0,
					price: 0,
				},
				formManage: [],
				formManageModule: [],
				isVerification: false,
				params: {},
				loading: false,
				saveLoading: false,
				otherMange: {
					inputBorder: '',
					key: '',
				}

			}
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		onLoad(params) {
			this.params = params;
			this.init();
			this.getInfo();
			if(this.params.id) this.getActivityInfo();
		},
		methods: {
			// 更改时间段
			changeDatetime(e) {
				if (e) {
					this.formInfo.startTime = e[0];
					this.formInfo.endTime = e[1];
				}
				this.onBlur();
			},
			onOpenDatetime() {
				this.onFocus('timeRange')
			},
			changeNumberTotle(e) {
				let max = '999999';
				let min = '0';
				if (e == 'oncrease') {
					this.formInfo.numberTotle = this.formInfo.numberTotle < max ? Number(this.formInfo.numberTotle) + 1 :
						max;
				} else if (e == 'decrease') {
					this.formInfo.numberTotle = this.formInfo.numberTotle > min ? Number(this.formInfo.numberTotle) - 1 :
						min;
				} else {
					this.formInfo.numberTotle = e.detail.value <= max ? e.detail.value : max;
					if (!this.formInfo.numberTotle && this.formInfo.numberTotle !== 0) this.formInfo.numberTotle = min;
				}
			},
			changePrice(e) {
				let max = '999999';
				let min = '0';
				this.formInfo.price = e.detail.value <= max ? e.detail.value : max;
				if (!this.formInfo.price && this.formInfo.price !== '0') this.formInfo.price = min;
			},
			// 开关
			changeSwitch(key) {
				this.formInfo[key] = !this.formInfo[key];
			},
			// 聚焦
			onFocus(key) {
				this.otherMange.key = key;
				this.otherMange.inputBorder = '2rpx solid #010101';
			},
			// 失焦
			onBlur() {
				this.otherMange.inputBorder = '2rpx solid #d8d8d8';
			},
			// 获取信息
			async getInfo() {

				// var res = await api.getList();
				// 类型
				var res = {
					code: 0,
					data: [{
							title: '飞盘游戏',
							id: '01'
						},
						{
							title: '骑车上山',
							id: '02'
						},
						{
							title: '下海游泳去玩',
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
					let curI = this.formManage.findIndex(c => c.key == 'activity');
					if (curI != -1) {
						this.formManage[curI]['options'] = res.data;
						this.formManage[curI]['optionsLabel'] = 'title';
						this.formManage[curI]['optionsValue'] = 'id';
					}
				}
				// 付费类型

				var res1 = {
					code: 0,
					data: [{
							title: '付费001',
							id: '01'
						},
						{
							title: '付费002',
							id: '02'
						},
						{
							title: '付费003',
							id: '03'
						},
					]
				}
				if (res1.code == 0) {
					let curI = this.formManage.findIndex(c => c.key == 'payType');
					if (curI != -1) {
						this.formManage[curI]['options'] = res1.data;
						this.formManage[curI]['optionsLabel'] = 'title';
						this.formManage[curI]['optionsValue'] = 'id';
					}
				}
				// 报名截止时间
				let dateEnd = [];
				for (let i = 0; i <= 12; i++) {
					dateEnd.push({
						title: `活动开始前${i}小时`,
						id: i + ''
					})
				}
				dateEnd.push({
					title: `活动开始前24小时`,
					id: '24'
				});
				dateEnd.push({
					title: `活动开始前48小时`,
					id: '48'
				});
				let curI = this.formManage.findIndex(c => c.key == 'dateEnd');
				if (curI != -1) {
					this.formManage[curI]['options'] = dateEnd;
					this.formManage[curI]['optionsLabel'] = 'title';
					this.formManage[curI]['optionsValue'] = 'id';
				}
			},
			// 获取信息
			async getActivityInfo() {
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
						describe: '活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介   活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简999999介',
						template: '这是模板1',
						activity: '01',

					}
				}
				setTimeout(() => {
					if (res.code == 0) {
						this.formInfo.template = res.data.template;
						this.formInfo.price = res.data.price;
						this.formInfo.images = res.data.images;	
						this.formInfo.title = res.data.title;
						this.formInfo.describe = res.data.describe;
						this.formInfo.numberTotle = res.data.numberTotle;
						this.formInfo.location = res.data.location;
						this.formInfo.locationDesc = res.data.locationDesc;
						this.formInfo.activity = res.data.activity
						
					}
					this.loading = false;
				}, 600);


			},

			// 预览
			async handlePreview() {
				this.isVerification = true;
				let flag = await this.$refs.formBox.validate();
				if (!flag) return uni.showToast({
					title: '请检查填写信息！',
					icon: 'none'
				});
				// 当前用户信息 作为发起人带入
				uni.navigateTo({
					url: `/pagesActivity/activityDetails/index?status=preview&info=${encodeURIComponent(JSON.stringify(this.formInfo))}`
				})
			},
			// 提交
			async handleSave() {
				this.isVerification = true;
				let flag = await this.$refs.formBox.validate();
				if (!flag) return uni.showToast({
					title: '请检查填写信息！',
					icon: 'none'
				});
				this.loading = true;
				setTimeout(() => {
					console.log(this.formInfo)
					uni.showToast({
						title: '提交成功',
						icon: 'none'
					});
					this.loading = false;
					setTimeout(() => {
						uni.redirectTo({
							url: '/pagesActivity/releaseActivity/success'
						})
					}, 600);
				}, 500)
			},
			// 初始化
			init() {
				this.formManage = [{
						icon: require('../static/icon/findPartner01.png'),
						label: '活动模版',
						key: 'template',
						type: 'select',
						// require: true,
						module: 'basis',
					}, {
						icon: require('../static/icon/findPartner01.png'),
						label: '活动类型',
						key: 'activity',
						type: 'select',
						require: true,
						module: 'basis',
					},
					{
						icon: require('../static/icon/findPartner07.png'),
						label: '活动名称',
						key: 'title',
						type: 'input',
						require: true,
						module: 'basis',
					},
					{
						icon: require('../static/icon/findPartner08.png'),
						label: '活动封面',
						key: 'images',
						type: 'images',
						maxNum: '9',
						require: true,
						module: 'basis',
					},
					{
						icon: require('../static/icon/findPartner02.png'),
						label: '活动时间',
						key: 'time',
						type: 'date',
						module: 'basis',
					},
					{
						icon: require('../static/icon/findPartner02.png'),
						label: '报名时间范围',
						key: 'timeRange',
						type: 'slot',
						module: 'basis',
					},
					{
						icon: require('../static/icon/findPartner03.png'),
						label: '报名截止时间',
						key: 'dateEnd',
						type: 'select',
						module: 'basis',
					},
					{
						icon: require('../static/icon/findPartner04.png'),
						label: '活动地址',
						key: 'location',
						type: 'region',
						module: 'region',
					},
					{
						icon: require('../static/icon/findPartner09.png'),
						label: '详细地址',
						key: 'locationDesc',
						type: 'input',
						module: 'region',
					},
					{
						icon: require('../static/icon/findPartner10.png'),
						label: '活动人数',
						key: 'number',
						type: 'slot',
						module: 'number',
					},
					{
						icon: require('../static/icon/findPartner11.png'),
						label: '活动介绍',
						key: 'describe',
						type: 'textarea',
						module: 'describe',
						textareaH: '370rpx'

					},
					{
						icon: require('../static/icon/findPartner01.png'),
						label: '付费类型',
						key: 'payType',
						type: 'select',
						module: 'payType',
					},
					{
						icon: require('../static/icon/findPartner04.png'),
						label: '活动费用',
						key: 'price',
						type: 'slot',
						require: true,
						module: 'other',
					},
					{
						icon: require('../static/icon/findPartner12.png'),
						label: '禁止他人使用此模版',
						key: 'prohibitTemplates',
						type: 'slot',
						module: 'other',
					},
					{
						icon: require('../static/icon/findPartner13.png'),
						label: '设为私密活动',
						key: 'privacyActivity',
						type: 'slot',
						module: 'other',
					}
				];
				let arr = [];
				for (let i = 0; i < this.formManage.length; i++) {
					if (i === 0) {
						arr.push({
							module: this.formManage[i].module,
							start: 0,
						});
						continue;
					}
					if (this.formManage[i].module != this.formManage[i - 1].module) {
						arr[arr.length - 1].end = i;
						arr.push({
							module: this.formManage[i].module,
							start: i
						});

					}
				}
				this.formManageModule = arr;
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.release-activity {
		width: 100%;
		padding: 30rpx 24rpx 320rpx;
		box-sizing: border-box;
	}

	.info-box-module {
		width: 100%;
		background: #fff;
		padding: 30rpx 24rpx 0;
		box-sizing: border-box;
		border-radius: 30rpx;
		margin-bottom: 24rpx;

		.form-row-box {
			position: relative;
		}

		.form-row-number {
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;

			.label {
				flex: 1;
				margin: 0;
			}

			.number-box {
				display: flex;
				align-items: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 2rpx solid #707070;
					border-radius: 8rpx;
					font-size: 24rpx;
					color: #999999;
				}

				.input {
					margin: 0 10rpx;
					padding: 0;
					min-width: 70rpx;
					max-width: 300rpx;
					text-align: center;
					box-sizing: border-box;
				}
			}

			.price-box {
				letter-spacing: 1.5px;
				font-size: 24rpx;
				color: $theme;

				.input {
					font-size: 38rpx;
					letter-spacing: 1px;
					margin: 0rpx;
				}
			}

			.switch-box {
				transition: all 0.2s;
				width: 64rpx;
				height: 36rpx;
				background-color: #eaeaea;
				position: relative;
				border-radius: 18rpx;

				&::before {
					position: absolute;
					content: '';
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					height: 28rpx;
					width: 28rpx;
					border-radius: 14rpx;
					background-color: #fff;
				}
			}

			.switch-active {
				background-color: $theme;

				&::before {
					right: 6rpx;
				}
			}

		}

		.form-error {
			position: absolute;
			content: '';
			left: 0;
			bottom: 10rpx;
			font-size: 20rpx;
			line-height: 20rpx;
			color: $theme;
		}

		.label {
			width: 100%;
			line-height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			// font-weight: 500;
			text-align: left;
			color: #464748;
			margin-bottom: 24rpx;
			display: flex;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 6rpx;
			}
		}

		.require {
			font-family: PingFang HK, PingFang HK-Medium;
			font-weight: 500;
			text-align: left;
			color: $theme;
			letter-spacing: 3px;
		}

		.text {
			line-height: 40rpx;
			font-size: 28rpx;
		}

		.border-box {
			--border: 2rpx solid #d8d8d8;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			border: var(--border);
			border-radius: 16rpx;
			min-height: 100rpx;
		}

		.date-time {
			display: flex;
			align-items: center;
			font-size: 28rpx;

			>view {
				flex: 1;
				display: flex;

				>text {
					flex: 1;
					text-align: center;
				}
			}
		}

		.select-box {
			width: 100%;

			.select-input {
				display: flex;
				align-items: center;
				overflow: hidden;

				>text {
					flex: 1;
					@include ellispsis1();
				}

				.image-top {
					transform: rotate(180deg);
				}

				image {
					transition: all 0.3s;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}


	.bottom-box {
		position: fixed;
		z-index: 1;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 24rpx 30rpx;
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

		>button:nth-child(1) {
			background: $uni-button-bg;
			color: #fff;
			margin-bottom: 10rpx;
		}
	}

	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}
</style>