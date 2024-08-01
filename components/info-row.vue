<template>
	<view class="info-row" :style="{height: height}" @click="handleDetails(row.id)">
		<image :src="row.image" mode="widthFix" v-if="height == 'auto'"></image>
		<image :src="row.image" mode="aspectFill" v-else :style="{height: height}"></image>
		<view class="centent">
			<view class="user">
				<image :src="row.userIcon" mode="aspectFill" @click.stop="handleNeighbour(row.userId)"></image>
				<text>{{row.userName}}</text>
			</view>
			<view class="title">{{row.title}}</view>
			<view class="info">
				<view class="left">
					<view class="">
						<image src="@/static/icon/location02.png" mode="aspectFit"></image>
						<view>{{row.location}}</view>
					</view>
					<view class="">
						<image src="@/static/icon/time02.png" mode="aspectFit"></image>
						<view>{{row.time}}</view>
					</view>
					<view class="" style="letter-spacing: 2px;">
						<image src="@/static/icon/user01.png" mode="aspectFit"></image>
						<view>人数：<text class="active">{{row.numberExists}}</text>/{{row.numberTotle}}</view>
					</view>
				</view>
				<view class="right" @click.stop="handleCollect()" :class="{ 'right-active': row.isCollect}">
					<image src="@/static/icon/fire03.png" mode="scaleToFill" v-if="row.isCollect"></image>
					<image src="@/static/icon/fire02.png" mode="scaleToFill" v-else></image>
					<text>{{row.collect}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"info-row",
		props:{
			info:{
				type: Object,
				default: ()=>{},
			},
			height:{
				type: String,
				default: 'auto',
			},
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
		},
	}
</script>

<style lang="scss" scoped>
@import "@/static/css/mixin.scss";
.info-row{
	width: 100%;
	overflow: hidden;
	border-radius: 30rpx;
	position: relative;
	>image {
		width: 100%;
		min-height: 340rpx;
		vertical-align:top;
	}
	.centent {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 0rpx 0rpx 30rpx 30rpx;
		padding: 20rpx 24rpx;
		box-sizing: border-box;
		text {
			font-size: 24rpx;
			line-height: 34rpx;
		}
		color: #fff;
		.user {
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
			border-top: 1rpx solid #fff;
			padding-top: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				flex: 1;
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
					.active {
						letter-spacing: 1px;
						font-size: 30rpx;
						color: $theme;
					}
				}
			}
			.right {
				transition: all 0.1s;
				display: flex;
				align-items: center;
				mix-width: 174rpx;
				height: 64rpx;
				padding: 0 20rpx;
				border: 2rpx solid #ffffff;
				border-radius: 34rpx;
				box-sizing: border-box;
				>image {
					width: 34rpx;
					height: 34rpx;
					margin-right: 8rpx;
					flex: 1;
				}
			}
			.right-active {
				border: 2rpx solid $theme;
				color: $theme;
			}
			
		}
	}
}
</style>