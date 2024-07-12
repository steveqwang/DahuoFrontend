<template>
	<view class="evaluate">
		<u-popup v-model="visible" mode='bottom' width="100%" height="auto" :maskCloseAble="false" :mask="true">
			<view class="evaluate-box">
				<view class="title">
					活动评价
				</view>
				<image class="icon" src="@/static/icon/close01.png" mode="scaleToFill" @click="handleCancel()"></image>
				<view class="info-row" @click="handleDetails()" v-if="row.title">
					<info-row :info="row" :key="index2" status="evaluate" />
				</view>
				<view class="title2">
					评分
				</view>
				<view class="score">
					<view v-for="item in max" :key="item" @click="changeScore(item+1)">
						<image src="@/static/icon/collect02.png" v-if="item + 1 <= formInfo.score" mode="scaleToFill">
						</image>
						<image src="@/static/icon/collect01.png" mode="scaleToFill" v-else></image>
					</view>
				</view>
				<view class="title2">
					评价内容
				</view>
				<textarea class="textarea" :maxlength="-1" :style="{'--border': inputBorder}" v-model="formInfo.content"
					placeholder="请输入评价内容" @focus="onFocus" @blur="onBlur" />
				<view class="bottom-box">
					<button :loading="loading" @click="handleSave()">提交评论</button>
					<view class="bottom-occupy"></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uPopup from '@/components/u-popup.vue';
	import {
		infoRow
	} from '@/components/info-row2.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		props: {},
		components: {
			uPopup,
			infoRow
		},
		data() {
			return {
				visible: false,
				min: 0,
				max: 5,
				row: {},
				loading: false,
				inputBorder: '',
				formInfo: {
					score: 0,
					content: '',

				},
			};
		},
		computed: {
			...mapGetters(['SYSTEMP_INFO', 'USER_INFO'])
		},
		methods: {
			// 聚焦
			onFocus() {
				this.inputBorder = '2rpx solid #010101';
			},
			// 失焦
			onBlur() {
				this.inputBorder = '2rpx solid #d8d8d8';
			},
			// 初始化
			init(row) {
				this.row = row;
				wx.hideTabBar();
				this.visible = true;
			},
			// 评分
			changeScore(num) {
				this.formInfo.score = num;
			},
			// 提交
			async handleSave() {
				this.loading = true;
				setTimeout(() => {
					uni.showToast({
						title: '提交成功',
						icon: 'none'
					});
					this.$emit('change', this.row.index)
					this.handleCancel();
				}, 1000)
			},
			// 关闭
			handleCancel() {
				wx.showTabBar()
				this.loading = false;
				this.visible = false;
				this.formInfo.score = 0;
				this.formInfo.content = '';
				this.row = {};
			},
		},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
	.evaluate-box {
		width: 100%;
		background-color: #fff;
		padding: 60rpx 24rpx;
		box-sizing: border-box;
		position: relative;
		max-height: 99vh;
		overflow-y: scroll;
	}

	.title {
		text-align: center;
		line-height: 48rpx;
		font-size: 34rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: center;
		color: #070707;
	}

	.icon {
		width: 44rpx;
		height: 44rpx;
		position: absolute;
		right: 24rpx;
		top: 24rpx;
	}

	.info-row {
		padding: 40rpx 0;
		border-bottom: 2rpx solid #e6e6e6;
		margin-bottom: 40rpx;
	}

	.title2 {
		line-height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang HK, PingFang HK-Medium;
		text-align: left;
		color: #464748;
	}

	.textarea {
		margin-bottom: 54rpx;
		margin-top: 12rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		height: 204rpx;
		--border: 2rpx solid #d8d8d8;
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		border: var(--border);
		border-radius: 16rpx;
		min-height: 100rpx;
	}

	.score {
		margin-top: 40rpx;
		margin-bottom: 60rpx;
		display: flex;
		align-items: center;

		>view {
			width: 24rpx;
			height: 24rpx;

			&:not(:first-child) {
				margin-left: 5rpx;
			}
		}

		image {
			width: 24rpx;
			height: 24rpx;
		}
	}

	.bottom-box {
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