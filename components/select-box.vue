<template>
	<view class="select">
		<scroll-view :style="{height: visible ? '' : '0px'}"  class="list" scroll-y="true" :scroll-into-view="activeCId">
			<view class="row" :class="{'row-active': item[value] == active}" v-for="(item, index) in list" :key="index" @click="onChange(item)">
				<text>{{item[label]}}</text>
				<view class="line"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
			    default: () => [],
			},
			defaultActive: {
				type: [Number,String],
				default: '',
			},
			defaultVisible: {
				type: Boolean,
				default: false,
			},
			value: {
				type: String,
				default: 'value',
			},
			label: {
				type: String,
				default: 'label',
			}
		},
		data() {
			return {
				active: '',
				activeCId: '',
				visible: false,
			}
		},
		methods: {
			// 更改
			onChange(row) {
				this.active = row[this.value];
				this.$emit('change', row);
				this.visible = false;
			}
		},
		watch: {
			defaultActive: {
				handler(val){
					this.active = val;
					this.activeCId = `c${val}`;
				},
				immediate: true,
			},
			defaultVisible:  {
				handler(val){
					this.visible = val;
				},
				immediate: true,
			},
		}
	}
</script>

<style lang="scss" scoped>
@import "@/static/css/mixin.scss";
.select {
	position: relative;
	width: 100%;
	.list {
		position: absolute;
		z-index: 92;
		left: 0;
		top: 0;
		width: 100%;
		height: 426rpx;
		transition: all 0.2s;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 0px 0px 30rpx 30rpx;
		backdrop-filter: blur(30rpx);
		-webkit-backdrop-filter: blur(30rpx);
		padding: 0 20rpx;
		box-sizing: border-box;
		.row {
			
			text {
				display: block;
				padding: 30rpx 0;
				box-sizing: border-box;
				line-height: 42rpx;
				font-size: 30rpx;
				text-align: center;
			}
			.line {
				width: 100%;
				height: 2rpx;
				opacity: 0.6;
				background: #f2f2f2;
				border-radius: 2rpx;
			}
			&:last-child {
				.line {
					display: none;
				}
			}
		}
		.row-active {
			color: $theme;
		}
	}
}
</style>
