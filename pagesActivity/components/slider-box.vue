<template>
	<view class="slider-box" ref="slider">
		<view class="slider-line">
			<view class="slider-line-o" @click="onClickPoint"></view>
			<view class="slider-line-a " :style="{'left': left + 'px','--width': right - left + 'px'}">
			</view>
			<view class="slider-line-handle" tabindex="0" ref="left" @touchmove.stop='onTouchmoveL'
				:style="{'left': left + 'px'}"></view>
			<view class="slider-line-handle" tabindex="0" ref="right" @touchmove.stop='onTouchmoveR'
				@mousedown="onRightMouseDown" :style="{'left': right + 'px'}"></view>

		</view>
		<view class="slider-text">
			<text>{{value[0]}}</text>
			<text>{{value[1]}}</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'slider-box',
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
			min: { // 滑动输入条最小值
				type: Number,
				default: 0
			},
			max: { // 滑动输入条最大值
				type: Number,
				default: 100
			},
			initialValue: {
				type: Array,
				default: () => {
					return [0, 100]
				}
			},
			disabled: {
				type: Boolean,
				default: false
			},
			value: {
				type: [Number, Array],
				default: () => [0, 0]
			}
		},
		data() {
			return {
				width: 0,
				lLeft: 0,
				lRight: 0,
				left: 0, // 左滑块距离滑动条左端的距离
				right: 0 // 右滑动距离滑动条左端的距离

			}
		},
		computed: {
			scale() {
				return this.width / (this.max - this.min)
			},
			sliderValue() {
				const high = Math.round(this.right / this.scale + this.min)
				const low = Math.round(this.left / this.scale + this.min)
				return [low, high]
			}
		},
		watch: {
			sliderValue(val) {
				this.$emit('input', val)
			}
		},
		mounted() {
			this.getDomInfo();
		},
		created() {

		},
		methods: {
			getDomInfo() {
				var query = uni.createSelectorQuery().in(this);
				query.select('.slider-box').boundingClientRect(data => {
					if (data) {
						this.width = data.width;
						this.lLeft = data.left;
						this.lRight = data.lRight;
						let leftVal = (this.value && (this.value[0] === 0 || this.value[0])) ? this.value[0] : this
							.initialValue[0]
						this.left = (leftVal - this.min) * this.scale
						let rightVal = (this.value && (this.value[1] === 0 || this.value[1])) ? this.value[1] :
							this.initialValue[1]
						this.right = (rightVal - this.min) * this.scale
					}
				}).exec();
			},
			onTouchmoveL(e) {
				let leftVal = Math.min(Math.max(e.changedTouches[0].clientX - this.lLeft, 0), this.right)
				this.left = leftVal;
			},
			onTouchmoveR(e) {
				let rightVal = Math.max(Math.min(e.changedTouches[0].clientX - this.lLeft, this.width), this.left)
				this.right = rightVal;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.slider-box {
		margin: 0 15rpx;
		width: calc(100% - 30rpx);
		padding: 40rpx 0;
		.slider-text {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text {
				line-height: 36rpx;
				font-size: 26rpx;
				color: #121212;
			}
		}
		.slider-line {
			position: relative;
		}

		.slider-line-o {
			width: 100%;
			height: 8rpx;
			background: #f6f7f8;
			border-radius: 4rpx;
		}

		.slider-line-a {
			--width: 0;
			position: absolute;
			z-index: 90;
			top: 0;
			left: 0;
			background: rgba(249, 71, 92, 0.4);
			border-radius: 4rpx;
			height: 8rpx;
			width: var(--width);
		}

		.slider-line-handle {
			// 滑块
			position: absolute;
			z-index: 91;
			width: 30rpx;
			height: 30rpx;
			top: 4rpx;
			left: 0;
			transform: translate(-50%, -50%);
			background: $theme;
			border-radius: 50%;
		}

		.handleTransition {
			transition: left .2s, border-color .3s, box-shadow .6s, transform .3s cubic-bezier(.18, .89, .32, 1.28);
		}

	}
</style>