<template>
	<view class="info-row"  @click="handleDetails(row.id)">
		<image :src="row.image" mode="aspectFill" ></image>
		<view class="centent">
			<view class="status">
				<view class="left">{{row.status}}</view>
				<view class="right"  @click.stop="handleCollect()" >
					<image src="@/static/icon/fire03.png" mode="scaleToFill" v-if="row.isCollect"></image>
					<image src="@/static/icon/fire02.png" mode="scaleToFill" v-else></image>
					<text>{{row.collect}}</text>
				</view>
			</view>
			<view class="user">
				<image :src="row.userIcon" mode="aspectFill" @click.stop="handleNeighbour(row.userId)"></image>
				<text>{{row.userName}}</text>
			</view>
			<view class="title">{{row.title}}</view>
			<view class="info">
				<view class="">
					<image src="@/static/icon/location02.png" mode="aspectFit"></image>
					<view>{{row.location}}</view>
				</view>
				<view class="">
					<image src="@/static/icon/time02.png" mode="aspectFit"></image>
					<view>{{row.time}}</view>
				</view>
			</view>
			<view class="other">
				<view v-if="row.status == '已结束' && row.isEvaluate != 1 && status != 'evaluate'" @click.stop="handleEvaluate()">
					立即评价
				</view>
				<view v-else>
					人数：<text class="active">{{row.numberExists}}</text>/{{row.numberTotle}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"info-row2",
		props:{
			info:{
				type: Object,
				default: ()=>{},
			},
			height:{
				type: String,
				default: '',
			},
			status: {
				type: String,
				default: 'normal', // evaluate 
			}
		},
		data() {
			return {
				row: {},
			};
		},
		watch: {
			info: {
				handler(val){
					this.row = val
				},
				immediate: true,
				deep: true,
			},
		},
		methods: {
			// 他人主页
			handleNeighbour(id) {
				uni.navigateTo({
					url: `/pagesActivity/neighbour/index?userId=${id}`
				})
			},
			// 详情
			handleDetails(id) {
				uni.navigateTo({
					url: `/pagesActivity/activityDetails/index?id=${id}`
				})
			},
			// 收藏
			async handleCollect() {
				// var res = await setcollect();
				// if(res.code == 0) {
					
					this.$emit('changeCollect', {
						id: this.row.id,
						index: this.row.index,
						isCollect: !this.row.isCollect,
						collect: this.row.isCollect ? Number(this.row.collect) -1 :  Number(this.row.collect) + 1,
					})
					
				// }
			},
			//立即评价
			handleEvaluate(){
				if(this.row.isEvaluate != 1) this.$emit('evaluate', this.row)
				
			},
		},
	}
</script>

<style lang="scss" scoped>
@import "@/static/css/mixin.scss";
.info-row{
	width: 100%;
	overflow: hidden;
	border-radius: 30rpx;
	box-shadow: 0rpx 6rpx 30rpx 0rpx rgba(196,196,196,0.29); 
	position: relative;
	height: 340rpx;
	>image {
		width: 100%;
		height: 100%;
	}
	.centent {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 30rpx;
		padding: 20rpx 24rpx;
		box-sizing: border-box;
		text {
			font-size: 24rpx;
			line-height: 34rpx;
		}
		color: #fff;
		.status {
			display: flex;
			align-items: center;
			justify-content: space-between;
			>view:nth-child(1){
				width: 126rpx;
				height: 52rpx;
				line-height: 52rpx;
				text-align: center;
				background: rgba(0, 0, 0, 0.68);
				border-radius: 10rpx;
				font-style: 26rpx;
			}
			>view:nth-child(2){ 
				display: flex;
				align-items: center;
				image {
					width: 34rpx;
					height: 34rpx;
					margin-right: 12rpx;
				}
				font-size: 24rpx;
			}
		}
		.user {
			margin-top: 38rpx;
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
			width: calc(100% - 256rpx);
			overflow: hidden;
			>view {
				margin-top: 12rpx;
				display: flex;
				align-items: center;
				&:first-child {
					margin-top: 0;
				}
				>image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 12rpx;
				}
				>view {
					flex: 1;
					font-size: 24rpx;
					line-height: 34rpx;
					display: inline-block;
					@include ellispsis1();
				}
			}
		}
		.other {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 236rpx;
			height: 78rpx;
			>view {
				width: 100%;
				height: 100%;
				background: rgba(255,255,255, 0.2);
				border-radius: 30rpx 0px 30rpx 0rpx;
				backdrop-filter: blur(60rpx);
				font-size: 28rpx;
				display: flex;
				align-items: center;
				text-align: center;
				justify-content: center;
				letter-spacing: 2px;
				.active {
					letter-spacing: 1px;
					font-size: 34rpx;
					color: $theme;
				}
			}
		}
	}
	
}
</style>