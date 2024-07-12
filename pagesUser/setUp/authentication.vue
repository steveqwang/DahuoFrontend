<template>
	<view class="page">
		<view class="list-box">
			<view class="list-row" v-for="(item, index) in formManage" :key="index">
				<view class="error" v-if="item.require && isVerification && !getRegular(item)">
					{{ item.regularText || item.placeholder}}
				</view>
				<view class="label">
					{{item.label}}
				</view>
				<block v-if="item.key == 'name'">
					<input class="input" :maxlength="10" v-model="formInfo[item.key]" :placeholder="item.placeholder"
						placeholder-class="placeholder" />
				</block>
				<block v-if="item.key == 'idCard'">
					<input class="input" type="number" v-model="formInfo[item.key]" :placeholder="item.placeholder"
						placeholder-class="placeholder" />
				</block>
			</view>
		</view>

		<view class="bottom-box">
			<button :loading="loading" @click="handleSave()">提交信息</button>
			<view class="bottom-occupy"></view>
		</view>
	</view>
</template>

<script>
	import regularObj from "@/utils/validate";
	import {
		mapState,
		mapMutations,
		mapActions,
	} from 'vuex';
	export default {
		name: 'setUp',
		title: '设置',
		components: {},
		data() {
			return {
				isVerification: false,
				formInfo: {

				},
				formManage: [],
			}
		},

		computed: {
			...mapState(['USER_INFO', 'TEMPORARY_USER'])
		},
		methods: {
			...mapActions(['SET_LEAVE']),
			...mapMutations(['SET_USER_INFO', 'SET_TEMPORARY_USER']),
			// 正则
			getRegular(row) {
				let flag = true;
				if (row.regularFun) {
					row.regularText = regularObj[row.regularFun](row, this.formInfo[row.key]);
					flag = !row.regularText;
				}
				if(row.regularText) return flag;
				if (!this.formInfo[row.key] && this.formInfo[row.key] !== 0) flag = false;
				return flag;

			},
			// 校验
			validate() {
				let flag = true;
				for (let i = 0; i < this.formManage.length; i++) {
					flag = this.getRegular(this.formManage[i])
					if (!flag) break;

				}
				return flag;
			},
			// 提交
			async handleSave() {
				this.isVerification = true;
				let flag = await this.validate();
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
						uni.navigateBack({
							delta: 1
						});
					}, 600);
				}, 500)
			},
			// 初始化
			init() {
				this.formManage = [{
						label: '姓名',
						key: 'name',
						require: true,
						placeholder: '请输入真实姓名',
					},
					{
						label: '身份证号',
						key: 'idCard',
						require: true,
						placeholder: '请输入身份证号',
						regularFun: 'validatorIdentityCardNo',
					},

				]
			},
		},
		onShow() {},
		onReady() {},
		onLoad() {
			this.init();
		}

	}
</script>

<style lang="scss" scoped>
	.list-box {
		.list-row {
			position: relative;
			margin-top: 30rpx;
			padding: 30rpx;
			width: 100%;
			box-sizing: border-box;
			background-color: #fff;
			.error {
				position: absolute;
				content: '';
				left: 30rpx;
				bottom: 10rpx;
				font-size: 20rpx;
				line-height: 20rpx;
				color: $theme;
			}
			.label {
				line-height: 36rpx;
				font-size: 26rpx;
				color: #333333;
			}

			.placeholder {
				font-size: 30rpx;
				color: #999999;
				line-height: 42px;
			}

			.input {
				margin-top: 30rpx;
				line-height: 36rpx;
				font-size: 26rpx;
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