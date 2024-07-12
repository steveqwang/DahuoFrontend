<template>
	<view class="evaluate">
		<view class="user">
			<image :src="row.avatar" mode="aspectFill" @click.stop="handleNeighbour(row.id)"></image>
			<text class="name">{{row.name}}</text>
			<view class="">
				<block v-for="(item, index) in (Math.min(row.score, 5))" :key="index">
					<image src="@/static/icon/collect02.png" mode="scaleToFill"></image>
				</block>
				<block v-for="(item, index) in Math.max(5 - row.score, 0)" :key="index">
					<image src="@/static/icon/collect01.png" mode="scaleToFill"></image>
				</block>
			</view>
		</view>
		<view class="text">
			{{row.text}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			row: {
				type: Object,
				default: () => {}
			}
		},
		components: {},
		data() {
			return {}
		},
		methods: {
			// 他人主页
			handleNeighbour(id) {
				uni.navigateTo({
					url: `/pagesActivity/neighbour/index?userId=${id}`
				})
			},
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.user {
		display: flex;
		align-items: center;
		overflow: hidden;

		>image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
		}

		>text {
			flex: 1;
			padding: 0 12rpx;
			font-size: 28rpx;
			box-sizing: border-box;
			@include ellispsis1();
		}

		>view {
			display: flex;
			align-items: center;

			>image {
				width: 24rpx;
				height: 24rpx;

				&:not(:first-child) {
					margin-left: 5rpx;
				}
			}
		}
	}

	.text {
		margin-top: 24rpx;
		font-size: 26rpx;
		font-family: PingFang HK, PingFang HK-Regular;
		font-weight: 400;
		color: #ffffff;
		line-height: 44rpx;
	}
</style>