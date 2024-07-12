<template>
	<view class="find-partner">
		<view class="info-box">
			<form-box :formManage="formManage" :formInfo="formInfo" ref="formBox">
				<view class="info-box-module">
					<view v-for="(item, index) in formManage.slice(0,3)" :key="index" class="info-row">
						<form-row :info="item" :options="item.options" v-model="formInfo[item.key]"
							:verification="isVerification" />
					</view>
				</view>
				<view class="info-box-module">
					<view v-for="(item, index) in formManage.slice(3)" :key="index" class="info-row">
						<form-row :info="item" :options="item.options" v-model="formInfo[item.key]"
							:verification="isVerification" />
					</view>
				</view>
			</form-box>
		</view>
		<view class="bottom-box">
			<button :loading="loading" @click="handleSave()">开始搭火（剩余{{frequency}}次）</button>
			<view class="bottom-occupy"></view>
		</view>
	</view>
</template>

<script>
	import formRow from '../components/form-row.vue';
	import formBox from '../components/form-box.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'findPartner',
		title: '立即找搭子',
		components: {
			formRow,
			formBox
		},
		filters: {},
		data() {
			return {
				formInfo: {
					activity: '',
					time: '',
					price: '',
					region: '',
					regionRange: '',
					gender: '',
					scale: '',
				},
				formManage: [],
				frequency: 5,
				isVerification: false,
				params: {},
				loading: false,
			}
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		onLoad(params) {
			if (params.formInfo) {
				let paramsInfo = JSON.parse(decodeURIComponent(params.formInfo))
				for (let key in paramsInfo) {
					this.formInfo[key] = paramsInfo[key]
				}
			}
			this.init();
			this.getInfo();
		},
		methods: {
			// 获取信息
			async getInfo() {
				// 性别
				let gender = [{
						title: '男',
						id: '1'
					},
					{
						title: '女',
						id: '2'
					},
					{
						title: '都可',
						id: '3'
					},
				]
				let curI = this.formManage.findIndex(c => c.key == 'gender');
				if (curI != -1) {
					this.formManage[curI]['options'] = gender;
					this.formManage[curI]['optionsLabel'] = 'title';
					this.formManage[curI]['optionsValue'] = 'id';
				}

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
				// 价格
				var res1 = {
					code: 0,
					data: [{
							title: '免费',
							id: '01'
						},
						{
							title: '0-20',
							id: '02'
						},
						{
							title: '21-50',
							id: '03'
						},
						{
							title: '51-100',
							id: '04'
						},
						{
							title: '101-300',
							id: '05'
						},
						{
							title: '线下交易',
							id: '06'
						},
					]
				}
				if (res1.code == 0) {
					let curI = this.formManage.findIndex(c => c.key == 'price');
					if (curI != -1) {
						this.formManage[curI]['options'] = res1.data;
						this.formManage[curI]['optionsLabel'] = 'title';
						this.formManage[curI]['optionsValue'] = 'id';
					}
				}

				// 规模
				var res2 = {
					code: 0,
					data: [{
							title: '2-4人',
							id: '01'
						},
						{
							title: '5-10人',
							id: '02'
						},
						{
							title: '11-20人',
							id: '03'
						}
					]
				}
				if (res2.code == 0) {
					let curI = this.formManage.findIndex(c => c.key == 'scale');
					if (curI != -1) {
						this.formManage[curI]['options'] = res2.data;
						this.formManage[curI]['optionsLabel'] = 'title';
						this.formManage[curI]['optionsValue'] = 'id';
					}
				}
				// 距离范围
				var res3 = {
					code: 0,
					data: [{
							title: '0-20km',
							id: '01'
						},
						{
							title: '10-20km',
							id: '02'
						},
						{
							title: '20km-全市',
							id: '03'
						}
					]
				}
				if (res2.code == 0) {
					let curI = this.formManage.findIndex(c => c.key == 'regionRange');
					if (curI != -1) {
						this.formManage[curI]['options'] = res3.data;
						this.formManage[curI]['optionsLabel'] = 'title';
						this.formManage[curI]['optionsValue'] = 'id';
					}
				}
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
							url: `/pagesInfo/findPartner/seek?id=9`
						})
					}, 600);
				}, 500)
			},
			// 初始化
			init() {
				this.formManage = [{
					 icon: require('../static/icon/findPartner01.png'),
						label: '活动类型',
						key: 'activity',
						type: 'select',
						require: true
					},
					{
						icon: require('../static/icon/findPartner02.png'),
						label: '活动时间',
						key: 'time',
						type: 'date',
						require: true
					},
					{
						icon: require('../static/icon/findPartner03.png'),
						label: '活动价格',
						key: 'price',
						type: 'select-lump'
					},
					{
						icon: require('../static/icon/findPartner04.png'),
						label: '位置范围距离',
						key: 'region',
						type: 'region'
					},
					{
						key: 'regionRange',
						type: 'select-lump'
					},
					{
						icon: require('../static/icon/findPartner05.png'),
						label: '同游人性别',
						key: 'gender',
						type: 'select-lump'
					},
					{
						icon: require('../static/icon/findPartner06.png'),
						label: '请选择活动规模',
						key: 'scale',
						type: 'select-lump'
					},
				]
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.find-partner {
		width: 100%;
		padding: 30rpx 24rpx 180rpx;
		box-sizing: border-box;
	}

	.info-box {
	}
	.info-box-module {
		width: 100%;
		background: #fff;
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		border-radius: 30rpx;
		margin-bottom: 24rpx;
	}

	.bottom-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0px 0px 12px 0px rgba(238, 239, 241, 0.50);

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