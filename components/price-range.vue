<template>
	<view class="price-range">
		<u-popup v-model="visible" mode='center' width="100%" height="auto" borderRadius="40" :maskCloseAble="false" :mask="true">
			<view class="price-range-center">
				<view class="title">{{title}}</view>
				<scroll-view class="scroll-view" scroll-with-animation scroll-y="true" >
					<view class="row" :class="{'row-active': item[value] == active}" v-for="(item, index) in list" :key="index" @click="onChange(item)">
						<text>{{item[label]}}</text>
					</view>
				</scroll-view>
				<view class="btn">
					<button @click="handleSave()" :loading="loading">完成</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	import * as api from '@/api/basics.js';
	import parse from '@/components/u-parse/u-parse.vue';
	import uPopup from '@/components/u-popup.vue';
	export default{
		name: 'price-range',
		title: '价格区间',
		components: { uPopup, parse }, 
		props: {
			title:{
				type: String,
				default: '价格区间'
			},
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
		data(){
			return{
				visible: false,
				active: '',
			}
		},
		computed:{ },
		watch: {
			defaultActive: {
				handler(val){
					this.active = val;
				},
				immediate: true,
			},
			defaultVisible:  {
				handler(val){
					this.visible = val;
				},
				immediate: true,
			},
		},
		methods:{
			// 更改
			onChange(row) {
				this.active = row[this.value];
			},
			// 提示
			// async getTip(i){
			// 	this.index = i;
			// 	this.loading = true;
			// 	var res = await api.getRule(this.TIP_STATE[i].tip)
			// 	if(res.code == 0){
			// 		this.content = res.data;
			// 		this.visible = true;
			// 	}
			// 	this.loading = false;
			// },
			handleSave(){
				this.$emit('change', this.active ? this.list.find(c=> c[this.value] == this.active) : {});
				this.visible = false;
			},
			// initMember(flag){
			// 	this.isInitiative = flag;
			// 	let i = this.TIP_STATE.findIndex(c => c.key == this.page);
			// 	if(i != -1) {
			// 		this.getTip(i);
			// 	}
				
			// },
		},
		onReady(){
			
		}
		
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.price-range-center{
		margin: 0 auto;
		width: 100%;
		padding: 60rpx 0 40rpx;
		box-sizing: border-box;
		max-height: 60vh;
		min-height: 30vh;
		width: 93%;
		background: #ffffff;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		font-family: PingFangSC-Medium;
		.scroll-view{
			margin-top: 40rpx;
			flex: 1;
			width: 100%;
			padding: 0 6rpx 0 30rpx;
			box-sizing: border-box;
			box-sizing: border-box;
			display: flex;
			margin-right: -24rpx;
			.row {
				display: inline-block;
				min-width: calc((100% -  72rpx) / 3);
				font-size: 30rpx;
				line-height: 42rpx;
				padding: 40rpx 20rpx;
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
		.title{
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			line-height: 42rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Medium;
			text-align: center;
			color: #333333;
			// font-weight: 700;
		}
		.btn{
			margin-top: 68rpx;
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			button{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				font-size: 30rpx;
				color: $uni-button-color;
				background: $uni-button-bg;
				border-radius: 30rpx;
				box-shadow: 4rpx 6rpx 16rpx 0rpx rgba(215, 83, 163, 0.18);
			}
		}
	}
</style>