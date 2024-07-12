<template>
	<view class="release-activity">
		<view class="info-box">
			<form-box :formManage="formManage" :formInfo="formInfo" ref="formBox">
				<view class="info-box-module" v-for="(itemM, indexM) in formManageModule" :key="indexM">
					<view v-for="(item, index) in formManage.slice(itemM.start, itemM.end)" :key="index"
						class="info-row">
						<form-row :info="item" :options="item.options" v-model="formInfo[item.key]"
							:verification="isVerification">
							<template slot="time">
								<view class="form-row-box">
									<view class="label">
										<image :src="item.icon" mode="aspectFit" v-if="item.icon"></image>
										<text v-if="item.require" class="require">*</text>
										{{item.label}}
									</view>
									<view class="time-box">
										<view class="row" :class="{'row-active': itemT.id == formInfo.time}" v-for="(itemT, indexT) in item.options" :key="indexT" @click="onChangeTime(itemT)">
											<text class="text">{{itemT.title}}</text>
										</view>
									</view>
								</view>
							</template>
							<template slot="priceRange">
								<view class="form-row-box">
									<view class="label">
										<image :src="item.icon" mode="aspectFit" v-if="item.icon"></image>
										<text v-if="item.require" class="require">*</text>
										{{item.label}}
									</view>
									<view class="priceRange-box">
										<slider-box
										    :min="0"
										    :max="3000"
										    :range="true"
										    v-model="formInfo.priceRange" />
										    <!-- @change="onChange" -->
									</view>
								</view>
							</template>
						
						</form-row>
						</block>
					</view>
				</view>
			</form-box>
		</view>
		<uni-calendar :date="formInfo.time" ref="calendar" :insert="false"
			@confirm="onChangeDate" />
		<view class="bottom-box">
			<button :loading="saveLoading" @click="handleSave()">筛选结果</button>
			<view class="bottom-occupy"></view>
		</view>
	</view>
</template>

<script>
	import formRow from '../components/form-row.vue';
	import formBox from '../components/form-box.vue';
	import sliderBox from '../components/slider-box.vue';
	import {
		parseTime
	} from '@/utils/global.js'
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
			sliderBox,
		},
		filters: {},
		data() {
			return {
				formInfo: {
					priceRange: [0, 1500],
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
		},
		methods: {
			// 更改
			onChangeTime(row) {
				if(row.id == -1){
					this.$refs.calendar.open();
				}else {
					this.formInfo.time = row.id;
				}
				
			},
			// 更改时间
			onChangeDate(e) {
				let curI = this.formManage.findIndex(c => c.key == 'time');
				if (curI != -1) {
					this.formManage[curI]['options'].splice(this.formManage[curI]['options'].length-1, 0, {
						id: e.fulldate,
						title: e.fulldate
					})
				}
				this.formInfo.time = e.fulldate;
			},
			// 获取信息
			async getInfo() {

				// var res = await api.getList();
				// 类型
				var res = {
					code: 0,
					data: [{
							title: '人气首选1',
							id: '01'
						},
						{
							title: '人气首选2',
							id: '02'
						},
						{
							title: '人气首选3',
							id: '03'
						},
						{
							title: '人气首选4',
							id: '04'
						},
						{
							title: '人气首选5',
							id: '05'
						},
						{
							title: '人气首选6',
							id: '06'
						},
						{
							title: '人气首选7',
							id: '07'
						},
						{
							title: '人气首选8',
							id: '08'
						},
					]
				}
				if (res.code == 0) {
					let curI = this.formManage.findIndex(c => c.key == 'type');
					if (curI != -1) {
						this.formManage[curI]['options'] = res.data;
						this.formManage[curI]['optionsLabel'] = 'title';
						this.formManage[curI]['optionsValue'] = 'id';
					}
				}
				
				// 活动时间
				let timeRange = [
					{
						title: '0-3小时',
						id: '0-3',
					},
					{
						title: '3-5小时',
						id: '3-5',
					},
					{
						title: '5-7小时',
						id: '5-7',
					},
					{
						title: '一天',
						id: '24',
					}
				];
				
				let curI = this.formManage.findIndex(c => c.key == 'timeRange');
				if (curI != -1) {
					this.formManage[curI]['options'] = timeRange;
					this.formManage[curI]['optionsLabel'] = 'title';
					this.formManage[curI]['optionsValue'] = 'id';
				}
				// 参加日期
				var tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate()+ 1);
				let time = [
					{
						title: '今日',
						id: parseTime(new Date(), '{y}-{m}-{d}'),
					},
					{
						title: '明日',
						id: `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`,
					},
					{
						title: '更多日期',
						id: '-1',
					},
				];
				curI = this.formManage.findIndex(c => c.key == 'time');
				if (curI != -1) {
					this.formManage[curI]['options'] = time;
					this.formManage[curI]['optionsLabel'] = 'title';
					this.formManage[curI]['optionsValue'] = 'id';
				}
				console.log(time,'time')
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
					// setTimeout(() => {
					// 	uni.navigateBack({
					// 		delta: 1
					// 	})
					// }, 600);
				}, 500)
			},
			// 初始化
			init() {
				this.formManage = [{
						icon: require('../static/icon/findPartner02.png'),
						label: '参加日期',
						key: 'time',
						type: 'slot',
						module: '1',
					}, {
						icon: require('../static/icon/findPartner03.png'),
						label: '价格范围',
						key: 'priceRange',
						type: 'slot',
						module: '1',
					},
					{
						icon: require('../static/icon/findPartner14.png'),
						label: '人气首选',
						key: 'type',
						type: 'select-lump',
						module: '1',
					},
					{
						icon: require('../static/icon/findPartner02.png'),
						label: '活动时间',
						key: 'timeRange',
						type: 'select-lump',
						module: '2',
					},
					{
						icon: require('../static/icon/findPartner04.png'),
						label: '活动地址',
						key: 'location',
						type: 'region',
						module: 'region',
					},
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
		padding: 30rpx 24rpx 180rpx;
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
			.priceRange-box { 
				width: 100%;
				height: 100rpx;
			}
			.time-box {
				display: flex;
				flex-wrap: wrap;
				margin-right: -24rpx;
				margin-bottom: -30rpx;
				.row {
					display: inline-block;
					min-width: calc((100% -  72rpx) / 3);
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 24rpx 10rpx;
					box-sizing: border-box;
					border: 2rpx solid #d8d8d8;
					border-radius: 16rpx;
					margin-right: 24rpx;
					margin-bottom: 30rpx;
					text-align: center;
				}
				.row-active {
					background-color: $theme;
					border: 2rpx solid $theme;
					color: #ffffff;
				}
			}
		}

		// .form-row-number {
		// 	height: 60rpx;
		// 	display: flex;
		// 	justify-content: space-between;
		// 	align-items: center;
		// 	overflow: hidden;

		// 	.label {
		// 		flex: 1;
		// 		margin: 0;
		// 	}
		// 	.number-box {
		// 		display: flex;
		// 		align-items: center;
				
		// 	}
			
			
			
		// }
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
		}
		.bottom-occupy {
			height: calc(constant(safe-area-inset-bottom) / 2);
			height: calc(env(safe-area-inset-bottom) / 2);
			width: 100%;
		}
	}

	
</style>