<template>
	<view class="dz-alert" v-if="show" @click="close">
		<view class="t-content">
			<view class="title">
				删除链接
			</view>
			<view class="content">
				您的链接将被删除，确认删除
			</view>
			<view class="btn-box">
				<view class="btn cance"  @click="close">
					取消
				</view>
				<view class="btn confirm"  @click="confirm">
					确认
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "dz-alert",
		props: ['show', 'title'],
		data() {
			return {

			};
		},
		methods: {
			close() {
				this.show = false
				this.$emit('close')
			},
			confirm(){
				this.show = false
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss">
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	.dz-alert {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 98;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0,0,0,.6);
		
		.t-content {
			border-radius: 30rpx;
			background: #fff;
			position: relative;
			display: flex;
			align-items: center;
			justify-content:  space-between;
			flex-flow: column;
			width: 690rpx;
			height: 354rpx;
			padding: 60rpx 30rpx;
			
			.title{
				font-family: Microsoft YaHei UI;
				font-size: 34rpx;
				font-weight: 700;
				line-height: 44.88rpx;
				letter-spacing: -0.4rpx;
				text-align: center;

			}
			.content{
				font-family: Microsoft YaHei UI;
				font-size: 28rpx;
				font-weight: 400;
				line-height: 36.96rpx;
				letter-spacing:1.0620000052452087rpx;
				text-align: center;
			}

			.btn-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				
				.btn{
					width: 300rpx;
					height: 82rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #F6F7F9;
					font-family: Microsoft YaHei UI;
					font-size: 30rpx;
					font-weight: 400;
					line-height: 39.6rpx;
					text-align: center;
					border-radius: 20rpx;
					color: #404040;
				}
				.confirm{
					background: #F9475C;
					color: #fff;
				}
			}
		}
	}
</style>